# project-tools-node

该目录用于存放 **基于 Node.js 的项目管理工具脚本**，主要负责打包、构建、版本管理等操作，确保 `pocket-chat` 项目的跨平台可维护性。

---

## 📂 目录结构

```
project-tools-node/
  ├── project-package.js   # 项目打包脚本
  ├── package.json         # Node 项目配置文件
  ├── node_modules/        # 第三方依赖（如 archiver）
  └── README.md            # 本说明文档
```

---

## 🛠️ 功能说明

### `project-package.js`
- **版本号参数化**：通过命令行参数指定版本号，如 `0.0.1`
- **项目名变量**：可配置项目名，用于生成输出目录和压缩包名称
- **平台数组**：可配置需要打包的平台，如 `['windows_amd64', 'linux_amd64', 'linux_arm64']`
- **PocketBase 版本变量**：用于定位 `pocketbase-release-file/` 中的可执行文件
- **打包输出**：
  - 在 `out/<version>/dist/` 中生成各平台目录
  - 在 `out/<version>/release/` 中生成对应 zip 压缩包

### 前置检查
在打包前会自动检查：
- `vue3/dist/` 是否存在（前端是否已构建）
- `pocketbase-release-file/` 中各平台可执行文件是否完整
- `CHANGELOG.md` 是否包含当前版本号
- `LICENSE.md` 是否存在

---

## 🚀 使用方法

1. 安装依赖：
   ```bash
   cd project-tools-node
   npm install
   ```

2. 执行打包：
   ```bash
   node project-package.js 0.0.1
   ```

3. 输出结果：
   - `out/0.0.1/dist/pocket_chat_0.0.1_<platform>/`
   - `out/0.0.1/release/pocket_chat_0.0.1_<platform>.zip`

---

## 🔧 推荐工作流

1. **前端构建**  
   在 `vue3/` 中执行：
   ```bash
   npm run build
   ```

2. **更新版本信息**  
   在根目录更新 `CHANGELOG.md`，确保包含新版本号。

3. **执行打包脚本**  
   在 `project-tools-node/` 中运行：
   ```bash
   node project-package.js <version>
   ```

---

## 📌 注意事项

- 如果 `out/<version>/` 已存在，脚本会提示并退出，避免覆盖。
- 打包前务必确认 `CHANGELOG.md` 已更新到当前版本。
- 脚本依赖 Node.js 环境，需安装 `archiver` 库。

---