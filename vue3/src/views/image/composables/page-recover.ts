import { useRouterHistoryStore } from '@/stores'
import type { ImageQueryModeDesuwaType } from './query-mode'
import type { ImageSelectListDesuwaType } from './select-list'
import { injectAppMainElScrollbar, useOnComponentLeave } from '@/composables'
import type {
  ImageScreenViewerDesuwaType,
  RefImagePageImageListType,
} from './dependencies'
import { watchUntilSourceCondition } from '@/utils'
import { useWindowSize } from '@vueuse/core'

/** 页面恢复数据获取 */
export const useImageSelectPagePageRecoverDataDesuwa = () => {
  const routerHistoryStore = useRouterHistoryStore()

  const imageSelectPagePageRecoverData =
    routerHistoryStore.currentGetPageRecoverDataForImageSelectPageItem()

  // imageQueryMode: ImageQueryModeMarkType;
  // imageQuerySearch: string;
  // imageQueryPage: number;
  // 在 useImageQueryModeDesuwa 初始化
  // src\views\image\composables\query-mode.ts

  // imageSelectList: {
  //     ...;
  // }[];
  // 在 useImageSelectListDesuwa 初始化
  // src\views\image\composables\select-list.ts

  // appMainElScrollbarScrollTop: number | undefined;
  // 此为滚动位置，比较特殊，因为高度主要由子组件决定，
  // 其初始化实际要依赖子组件中的值，即等待子组件的数据初始化完毕
  // 子组件将导出其值，然后在ImageSelectPage接收并判断与初始化，并封装
  // 在 useImageSelectPagePageRecoverScrollTop 初始化
  // src\views\image\composables\page-recover.ts
  // src\views\image\ImageSelectPage.vue

  return {
    imageSelectPagePageRecoverData,
  }
}

export type ImageSelectPagePageRecoverDataDesuwaType = ReturnType<
  typeof useImageSelectPagePageRecoverDataDesuwa
>

/** 页面恢复 滚动恢复 */
export const useImageSelectPagePageRecoverScrollTop = (data: {
  imageSelectPagePageRecoverDataDesuwa: ImageSelectPagePageRecoverDataDesuwaType
  refImagePageImageList: RefImagePageImageListType
}) => {
  const { imageSelectPagePageRecoverDataDesuwa, refImagePageImageList } = data

  const {
    // 页面恢复数据
    imageSelectPagePageRecoverData,
  } = imageSelectPagePageRecoverDataDesuwa

  const appMainElScrollbar = injectAppMainElScrollbar()

  // // 是否有内容高度
  // const isHaveContentHeight = computed(() => {
  //   if (
  //     refImagePageImageList.value != null &&
  //     refImagePageImageList.value.refContentBox != null &&
  //     refImagePageImageList.value.sizeContentBox.width.value > 0 &&
  //     refImagePageImageList.value.contentBoxHeigh > 0
  //   ) {
  //     return true
  //   }
  //   return false
  // })

  onMounted(async () => {
    // 无 页面恢复数据 直接返回
    if (imageSelectPagePageRecoverData == null) {
      return
    }
    // // 等待有内容高度，有内容高度才能初始化滚动
    // await watchUntilSourceCondition(isHaveContentHeight, (val) => val === true)
    await nextTick()
    // // 因为子组件内的内容高度有过渡duration-300，所以可能还要再等300ms
    // await new Promise((resolve) => setTimeout(resolve, 300))
    appMainElScrollbar.value?.wrapRef?.scrollTo({
      top: imageSelectPagePageRecoverData.data.appMainElScrollbarScrollTop, // 滚动到原先的位置
      behavior: 'instant',
    })
  })
}

/**
 * 页面恢复数据收集
 * onBeforeUnmount
 * onBeforeRouteLeave
 */
export const useImageSelectPagePageRecoverDataSetOnLeave = (data: {
  //
  imageQueryModeDesuwa: ImageQueryModeDesuwaType
  imageSelectListDesuwa: ImageSelectListDesuwaType
  refImagePageImageList: RefImagePageImageListType
  imageScreenViewerDesuwa: ImageScreenViewerDesuwaType
}) => {
  const {
    //
    imageQueryModeDesuwa,
    imageSelectListDesuwa,
    refImagePageImageList,
    imageScreenViewerDesuwa,
  } = data

  const {
    //
    imageQueryMode,
    imageQuerySearch,
    imageQueryPage,
  } = imageQueryModeDesuwa

  const {
    //
    imageSelectList,
  } = imageSelectListDesuwa

  const {
    //
    imageScreenViewerImageList,
    imageScreenViewerImageCurrentId,
  } = imageScreenViewerDesuwa

  const windowSize = useWindowSize()

  const appMainElScrollbar = injectAppMainElScrollbar()

  const routerHistoryStore = useRouterHistoryStore()

  const imageSelectPagePageRecoverDataSet = () => {
    routerHistoryStore.currentSetPageRecoverDataForImageSelectPageItem({
      imageQueryMode: imageQueryMode.value,
      imageQuerySearch: imageQuerySearch.value,
      imageQueryPage: imageQueryPage.value,
      imageSelectList: imageSelectList.value,
      appMainElScrollbarScrollTop: appMainElScrollbar.value?.wrapRef?.scrollTop,
      windowWidth: windowSize.width.value,
      contentBoxWidth: refImagePageImageList.value?.sizeContentBox.width.value,
      imageScreenViewerImageList: imageScreenViewerImageList.value,
      imageScreenViewerImageCurrentId: imageScreenViewerImageCurrentId.value,
    })
  }

  // 在组件离开时执行 页面恢复数据收集
  useOnComponentLeave(imageSelectPagePageRecoverDataSet)
}
