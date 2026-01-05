说明文档已经为你整理并写入到右侧 Canvas，标题为 **《Router History & Page Recover 设计说明》**。

这份文档的特点是：

- **从问题出发**：先对比 Vue Router 与 TanStack Router 的行为差异，明确“为什么要做这套机制”
    
- **抽象层次清晰**：
    
    - Router History（全局、基础设施）
        
    - Page Recover Module（页面级状态容器）
        
    - Page Composables（页面接入与生命周期）
        
- **完整覆盖真实代码逻辑**：
    
    - `history.state.routorHistoryUuid` 的设计动机
        
    - push / back / refresh 三种路径的处理差异
        
    - 为什么要清理 stack 之后的 recover data
        
- **把“为什么这样写”讲清楚**，而不是只描述“代码在做什么”
    
- **明确扩展规范**，方便后续新增页面时不破坏整体一致性
    

如果你希望下一步进一步优化，我可以帮你做例如：

- 将该文档拆分为「设计说明 + 接入规范 + FAQ」
    
- 补一张 **逻辑流程图 / 时序图**（便于新人快速理解）
    
- 帮你抽象一个 **recover module 模板**，减少新页面接入成本
    
- 帮你评估这套方案在 **keep-alive / 多 tab / iframe** 场景下的边界
    

你可以直接告诉我你打算把这份文档用在什么场景（README、架构文档、团队 Wiki），我可以按目标再精修一版。

# Router History & Page Recover 设计说明

## 背景与问题

在当前项目中，我们使用 **Vue Router** 作为路由方案。其默认行为具有以下特点：

- 每次进入页面都会重新挂载组件
    
- 本地状态丢失
    
- 滚动位置丢失（除非手动处理）
    
- 数据需要重新请求（除非自行缓存）
    
- 表单状态丢失（除非自行保存）
    

这在“列表 → 详情 → 返回列表”等高频场景下，会显著影响用户体验。

相比之下，TanStack Router 提供了更接近“页面实例持久化”的体验（路由节点持久、UI 状态与滚动缓存、返回时完全恢复）。但 **TanStack Router 对 Vue 生态尚不成熟**，因此本项目选择：

> **在 Vue Router 基础上，手动实现一套“路由历史 + 页面状态恢复”机制。**

本文档用于说明该机制的整体设计、核心概念、模块划分以及页面接入方式，便于团队成员理解和扩展。

---

## 总体设计思路

核心目标：

> **在不替换 Vue Router 的前提下，实现“路由返回时页面状态与滚动位置的完整恢复”。**

为此，引入两层能力：

1. **自建路由历史栈（Router History Stack）**
    
2. **基于路由历史 UUID 的页面恢复数据（Page Recover Data）**
    

整体关系如下：

```
浏览器 history.state
        ↓
router-history store
  - stack (uuid + route info)
  - currentUuid
        ↓
各页面 recover module
  - 按 uuid 存储页面状态
        ↓
页面 composables
  - 初始化（恢复）
  - 离开时收集（保存）
```

---

## 一、Router History Store（核心）

### 文件位置

```
src/stores/router-history/router-history.ts
```

### 职责

Router History Store 负责：

1. **维护一份可控的路由历史栈**（而不是直接依赖浏览器历史）
    
2. **为每一次路由实例分配唯一 UUID**
    
3. **判断当前路由变更是 push 还是 back/forward**
    
4. **为页面恢复模块提供“当前路由 UUID”上下文**
    

### 关键数据结构

#### RouterHistoryEntryType

```ts
{
  uuid: string
  name: Route['name']
  path: Route['path']
  fullPath: Route['fullPath']
}
```

- `uuid`：该“路由实例”的唯一标识
    
- 一个 path 被多次 push，会对应多个不同 uuid
    

#### 核心状态

- `stack: RouterHistoryEntryType[]`
    
    - 自建的路由历史栈
        
- `currentUuid: string | null`
    
    - 当前所在路由实例的 uuid
        

#### 派生状态

- `currentRouterHistoryEntry`
    
- `currentPreviousRouterHistoryEntry`
    
    - 用于判断“是否可以返回到站内上一页”
        

---

### router.afterEach 接入点

```ts
router.afterEach(() => {
  const routerHistoryStore = useRouterHistoryStore()
  routerHistoryStore.routerAfterEachCheckHistoryStateAndControlRouterHistoryStack()
})
```

**所有路由行为统一在 afterEach 中收敛处理**。

---

### 核心算法说明

#### 1. 利用 `history.state.routorHistoryUuid`

- 每次 **push**：
    
    - 生成新的 uuid
        
    - `history.replaceState` 写入 `routorHistoryUuid`
        
- 每次 **back / forward**：
    
    - 浏览器会自动恢复此前的 `history.state`
        

因此可以通过：

```ts
history.state?.routorHistoryUuid
```

判断当前路由变更来源。

---

#### 2. Push 行为处理

当 `history.state.routorHistoryUuid` 不存在时：

- 生成新 uuid
    
- 清理 stack 中 `currentUuid` 之后的所有记录（不可再访问）
    
- 将当前路由信息 push 进 stack
    
- 设置 `currentUuid`
    
- 同步清理 **页面恢复数据**（仅保留仍在 stack 中的 uuid）
    

---

#### 3. Back / Forward 行为处理

当 `history.state.routorHistoryUuid` 存在时：

- 若 stack 中存在该 uuid：
    
    - 直接切换 `currentUuid`
        
- 若不存在（常见于页面刷新）：
    
    - 视为一次 push，重新纳入管理
        

---

## 二、Page Recover Modules（页面恢复模块）

### 设计原则

- **每个页面一个模块**
    
- **按 router-history 的 uuid 存储数据**
    
- **模块只负责数据结构与 CRUD，不关心页面细节**
    

---

### 示例：ImageSelectPage

#### 文件位置

```
src/stores/router-history/modules/recover-image-select-page.ts
```

#### 数据结构

```ts
{
  uuid: string
  data: {
    imageQueryMode
    imageQuerySearch
    imageQueryPage
    imageSelectList
    appMainElScrollbarScrollTop
  }
}
```

- 一个 uuid 对应一次页面访问实例
    
- 支持同一路由多次进入的独立恢复
    

---

### 提供的接口语义

- `pageRecoverDataForImageSelectPage`
    
    - 原始数据数组（一般不在页面直接使用）
        
- `currentSetPageRecoverDataForImageSelectPageItem(data)`
    
    - 为 **当前路由 uuid** 保存页面状态
        
- `currentGetPageRecoverDataForImageSelectPageItem()`
    
    - 获取 **当前路由 uuid** 对应的恢复数据
        

> 页面层 **永远不需要手动关心 uuid**。

---

## 三、页面侧接入方式（以 ImageSelectPage 为例）

### 1. 获取页面恢复数据

```ts
const imageSelectPagePageRecoverDataDesuwa =
  useImageSelectPagePageRecoverDataDesuwa()
```

- 本质：
    
    - 从 router-history 中读取 currentUuid
        
    - 再读取对应的 recover data
        

---

### 2. 初始化页面状态（恢复）

各子模块（如 query-mode、select-list）：

- 在初始化时检查是否存在页面恢复数据
    
- 若存在，则使用其值初始化 ref
    

示例逻辑：

```ts
if (pageRecoverData != null) {
  imageSelectList.value = pageRecoverData.data.imageSelectList
}
```

---

### 3. 滚动位置恢复（特殊处理）

滚动恢复特点：

- 依赖子组件内容高度
    
- 需要等待：
    
    - 子组件数据初始化
        
    - DOM 渲染完成
        
    - 过渡动画结束
        

因此流程为：

1. 等待内容高度可用
    
2. `nextTick`
    
3. 额外 `setTimeout(300)`（匹配 transition）
    
4. 执行 `scrollTo`
    

该逻辑被集中封装在：

```
useImageSelectPagePageRecoverScrollTop
```

---

### 4. 页面离开时收集数据

```ts
useImageSelectPagePageRecoverDataSetOnLeave({ ... })
```

内部会：

- 读取当前页面的响应式状态
    
- 读取当前滚动位置
    
- 调用 `currentSetPageRecoverDataForImageSelectPageItem`
    

---

## 四、useOnComponentLeave 的设计动机

### 问题背景

- `onBeforeUnmount`
    
    - 有时会 **晚于 router.afterEach** 执行
        
- `onBeforeRouteLeave`
    
    - 只在路由离开时触发
        
    - 不覆盖 v-if 等非路由卸载
        

### 解决方案

```ts
onBeforeUnmount + onBeforeRouteLeave
```

并通过 `hasRun` 保证 **只执行一次**。

### 使用场景

- 页面恢复数据收集
    
- 离开页面前保存状态
    
- 清理与页面强绑定的资源
    

---

## 五、扩展新页面的标准流程

1. 在 `router-history/modules` 下新增 recover 模块
    
2. 定义该页面所需的最小恢复数据结构
    
3. 在 `router-history.ts` 中注册该模块
    
4. 页面中：
    
    - 提供 `PageRecoverDataDesuwa`
        
    - 初始化时读取恢复数据
        
    - 离开时统一收集
        

> 不需要修改 Router History 核心逻辑。

---

## 总结

该方案本质是：

- **在 Vue Router 之上实现“路由实例级别”的状态管理**
    
- 用 uuid 将“一次页面访问”与“页面状态”绑定
    
- 以 Pinia 作为统一的状态承载层
    

最终效果：

- 返回页面 ≈ TanStack Router 体验
    
- 不引入不成熟依赖
    
- 页面恢复逻辑高度可控、可扩展、可维护
    

如需新增页面或调整策略，请优先遵循本文档中的分层与职责划分。