import { useRouteControlDialog } from '@/composables'
import { imageScreenViewerDialogQueryKey } from '@/config'

export const useImageScreenViewerDesuwa = () => {
  const {
    dialogOpen: imageScreenViewerOpen,
    dialogClose: imageScreenViewerClose,
    dialogVisible: imageScreenViewerVisible,
  } = useRouteControlDialog({
    dialogQueryKey: imageScreenViewerDialogQueryKey,
  })

  return {
    imageScreenViewerOpen,
    imageScreenViewerClose,
    imageScreenViewerVisible,
  }
}

export type ImageScreenViewerDesuwaType = ReturnType<
  typeof useImageScreenViewerDesuwa
>
