import type { ImagesResponseWithBaseExpand } from '@/api'
import type { ImageQueryModeMarkType } from '@/views/image/composables'

export type PageRecoverDataForImageSelectPageItemType = {
  uuid: string
  data: {
    imageQueryMode: ImageQueryModeMarkType
    imageQuerySearch: string
    imageQueryPage: number
    imageSelectList: ImagesResponseWithBaseExpand[]
    appMainElScrollbarScrollTop: number | undefined
    windowWidth: number | undefined
    contentBoxWidth: number | undefined
    imageScreenViewerImageList: ImagesResponseWithBaseExpand[]
    imageScreenViewerImageCurrentId: string
  }
}

/** ImageSelectPage 所需要的页面恢复数据 */
export const useRecoverImageSelectPageModule = (data: {
  //
  currentUuid: Ref<string | null>
}) => {
  const {
    //
    currentUuid,
  } = data

  // 【页面恢复数据】各路由页面恢复数据，主要用于路由返回时，页面中的数据恢复（返回时保持之前浏览的位置和数据）

  // 【页面恢复数据 ImageSelectPage 】用于 ImageSelectPage 的页面恢复数据
  const pageRecoverDataForImageSelectPage = ref<
    Array<PageRecoverDataForImageSelectPageItemType>
  >([])
  // ImageSelectPage 的页面恢复数据设置方法
  const pageRecoverDataForImageSelectPageItemSetFn = (
    val: PageRecoverDataForImageSelectPageItemType
  ) => {
    // 按uuid查找，找到则更新，找不到则添加
    const find = pageRecoverDataForImageSelectPage.value.find(
      (i) => i.uuid === val.uuid
    )
    if (find != null) {
      find.data = val.data
      return 'update' as const
    } else {
      pageRecoverDataForImageSelectPage.value.push(val)
      return 'push' as const
    }
  }
  // ImageSelectPage 的页面恢复数据获取方法
  const pageRecoverDataForImageSelectPageItemGetFn = (uuid: string) => {
    const find = pageRecoverDataForImageSelectPage.value.find(
      (i) => i.uuid === uuid
    )
    return find
  }
  // 设置当前的 ImageSelectPage 的页面恢复数据
  const currentSetPageRecoverDataForImageSelectPageItem = (
    data: PageRecoverDataForImageSelectPageItemType['data']
  ) => {
    if (currentUuid.value == null) {
      return null
    }
    return pageRecoverDataForImageSelectPageItemSetFn({
      uuid: currentUuid.value,
      data,
    })
  }
  // 获取当前的 ImageSelectPage 的页面恢复数据
  const currentGetPageRecoverDataForImageSelectPageItem = () => {
    if (currentUuid.value == null) {
      return null
    }
    return pageRecoverDataForImageSelectPageItemGetFn(currentUuid.value)
  }

  return {
    //
    pageRecoverDataForImageSelectPage,
    pageRecoverDataForImageSelectPageItemSetFn,
    pageRecoverDataForImageSelectPageItemGetFn,
    currentGetPageRecoverDataForImageSelectPageItem,
    currentSetPageRecoverDataForImageSelectPageItem,
  }
}
