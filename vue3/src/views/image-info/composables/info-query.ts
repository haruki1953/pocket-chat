import { useImagesGetOneQuery } from '@/queries'
import type { ImageInfoRouteParamsType } from './dependencies'

export const useImageInfoQueryDesuwa = (data: {
  imageInfoRouteParams: ImageInfoRouteParamsType
}) => {
  const {
    //
    imageInfoRouteParams,
  } = data

  const imageId = computed(() => imageInfoRouteParams.value.id)

  const imagesGetOneQuery = useImagesGetOneQuery({
    imageId,
  })

  const imageInfoQueryStatus = computed(() => {
    // 有内容
    if (imagesGetOneQuery.data.value != null) {
      return 'content' as const
    }
    // 加载中
    if (
      imagesGetOneQuery.data.value == null &&
      imagesGetOneQuery.isFetching.value === true
    ) {
      return 'loading' as const
    }
    // 无内容（图片id不存在）
    return 'none' as const
  })

  return {
    //
    imagesGetOneQuery,
    imageInfoQueryStatus,
  }
}

export type ImageInfoQueryDesuwaType = ReturnType<
  typeof useImageInfoQueryDesuwa
>
