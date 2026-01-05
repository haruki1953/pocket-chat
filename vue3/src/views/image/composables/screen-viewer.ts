import type { ImagesResponseWithBaseExpand } from '@/api'
import { useRouteControlDialog } from '@/composables'
import { imageScreenViewerDialogQueryKey } from '@/config'
import type { ImageSelectPagePageRecoverDataDesuwaType } from './dependencies'

export const useImageScreenViewerDesuwa = (data: {
  // 其中有页面恢复初始化数据
  imageSelectPagePageRecoverDataDesuwa: ImageSelectPagePageRecoverDataDesuwaType
}) => {
  const {
    //
    imageSelectPagePageRecoverDataDesuwa,
  } = data
  const {
    //
    imageSelectPagePageRecoverData,
  } = imageSelectPagePageRecoverDataDesuwa

  const {
    dialogOpen,
    dialogClose: imageScreenViewerClose,
    dialogVisible: imageScreenViewerVisible,
  } = useRouteControlDialog({
    dialogQueryKey: imageScreenViewerDialogQueryKey,
  })

  const imageScreenViewerImageList = ref<ImagesResponseWithBaseExpand[]>([])
  const imageScreenViewerImageCurrentId = ref<string>('')
  // 根据页面恢复数据初始化
  if (imageSelectPagePageRecoverData != null) {
    imageScreenViewerImageList.value =
      imageSelectPagePageRecoverData.data.imageScreenViewerImageList
    imageScreenViewerImageCurrentId.value =
      imageSelectPagePageRecoverData.data.imageScreenViewerImageCurrentId
  }

  const imageScreenViewerOpen = (data: {
    imageList: ImagesResponseWithBaseExpand[]
    imageCurrentId: string
  }) => {
    const { imageList, imageCurrentId } = data
    imageScreenViewerImageList.value = imageList
    imageScreenViewerImageCurrentId.value = imageCurrentId
    dialogOpen()
  }

  return {
    imageScreenViewerOpen,
    imageScreenViewerClose,
    imageScreenViewerVisible,
    imageScreenViewerImageList,
    imageScreenViewerImageCurrentId,
  }
}

export type ImageScreenViewerDesuwaType = ReturnType<
  typeof useImageScreenViewerDesuwa
>
