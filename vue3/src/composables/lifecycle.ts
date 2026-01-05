import { onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

/**
 * 在组件离开时执行回调函数。
 *
 * **包括 onBeforeUnmount 与 onBeforeRouteLeave**
 * ```txt
 * onBeforeUnmount 当组件卸载时触发。
 * onBeforeRouteLeave 当前组件因为路由变化而将被卸载时触发。
 * ```

 * 特点：
 * - 同时监听组件卸载与路由离开
 * - 自动保证回调只执行一次
 *
 * 使用场景：
 * - 页面恢复数据收集（pageRecoverDataSet）
 * - 离开页面前保存状态
 * - 离开组件前清理资源
 *
 * ```txt
 * onBeforeUnmount 有一些问题，有时会在 router.afterEach 之后才执行，这对于自己是不正确的，
 * 而 onBeforeRouteLeave 虽然能确保在 router.afterEach 之前执行，但不会触发于非路由卸载（如 v-if）
 * 所以需要将 onBeforeUnmount 和 beforeRouteLeave结合，同时使用这两个，只要让这两个不会执行两次即可
 * 即因路由卸载时是由 onBeforeRouteLeave 触发所以能确保在 router.afterEach 之前执行
 * 而因非路由卸载（如 v-if）时本身就不会触发router.afterEach，所以此时用onBeforeUnmount是没有问题的
 * ```
 *
 * 使用示例
 * ```ts
 * const pageRecoverDataSet = () => {
 *   routerHistoryStore.currentSetPageRecoverDataForImageSelectPageItem({
 *     imageQueryMode: imageQueryMode.value,
 *     imageQuerySearch: imageQuerySearch.value,
 *     imageQueryPage: imageQueryPage.value,
 *     imageSelectList: imageSelectList.value,
 *     appMainElScrollbarScrollTop: appMainElScrollbar.value?.wrapRef?.scrollTop,
 *   })
 * }
 *
 * useOnComponentLeave(pageRecoverDataSet)
 * ```
 *
 * @param callback 要在组件离开时执行的函数
 */
export function useOnComponentLeave(callback: () => void) {
  let hasRun = false

  const runOnce = () => {
    if (hasRun) return
    hasRun = true
    callback()
  }

  onBeforeUnmount(runOnce)
  onBeforeRouteLeave(runOnce)
}
