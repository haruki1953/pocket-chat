import {
  queryKeys,
  useImageInfoMessageListQuery,
  useImagesGetOneQuery,
} from '@/queries'
import type { ImageInfoRouteParamsType } from './dependencies'
import { useQueryClient } from '@tanstack/vue-query'
import { useAuthStore, useRealtimeImagesStore } from '@/stores'
import type { ImagesResponseWithBaseExpand } from '@/api'
import { compareDatesSafe } from '@/utils'

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

  const realtimeImagesStore = useRealtimeImagesStore()

  // 经过实时优化的图片数据，会使用较新的数据
  const imageInfoDataWithRealtime = computed(() => {
    if (imageId.value == null) {
      return null
    }
    const fromQuery = imagesGetOneQuery.data.value
    const fromRealtime = realtimeImagesStore.updateListFindLatestById(
      imageId.value
    )
    // 两者都有 → 比较 updated
    if (fromQuery != null && fromRealtime != null) {
      if (fromRealtime.updated > fromQuery.updated) {
        return fromRealtime
      } else {
        return fromQuery
      }
    }
    // 只有 query 有
    if (fromQuery != null) {
      return fromQuery
    }
    // 只有 realtime 有
    if (fromRealtime != null) {
      return fromRealtime
    }
    // 两者都不存在
    return null
  })

  const imageInfoQueryStatus = computed(() => {
    // 有内容
    if (imageInfoDataWithRealtime.value != null) {
      // 特殊情况已删除
      if (imageInfoDataWithRealtime.value.isDeleted === true) {
        return 'isDeleted'
      }
      return 'content' as const
    }
    // 加载中
    if (
      imageInfoDataWithRealtime.value == null &&
      imagesGetOneQuery.isFetching.value === true
    ) {
      return 'loading' as const
    }
    // 无内容（图片id不存在）
    return 'none' as const
  })

  const imageInfoMessageListPageNum = ref(1)

  const imageInfoMessageListQuery = useImageInfoMessageListQuery({
    pageNum: computed(() => imageInfoMessageListPageNum.value),
    imageId,
  })

  // 查询页数设置
  const imageInfoMessageListPageSet = (val: number) => {
    imageInfoMessageListPageNum.value = val
  }

  const queryClient = useQueryClient()

  // 是否正在刷新
  const isImageQueryRefreshRunning = ref(false)
  // 查询刷新
  const imageQueryRefresh = async () => {
    if (isImageQueryRefreshRunning.value) return
    isImageQueryRefreshRunning.value = true

    try {
      // 页面重置
      // imageInfoMessageListPageNum.value = 1

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.imagesGetOne(imageId.value),
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.imageInfoMessageList(imageId.value),
        }),
      ])
    } finally {
      isImageQueryRefreshRunning.value = false
    }
  }

  const authStore = useAuthStore()

  // 当前是否为发送者
  const isAuthorCurrent = computed(() => {
    if (
      imageInfoDataWithRealtime.value == null ||
      authStore.isValid === false ||
      authStore.record?.id == null
    ) {
      return false
    }
    if (imageInfoDataWithRealtime.value.author === authStore.record.id) {
      return true
    }
    return false
  })

  /**
   * 用于图片信息修改成功后，根据返回的数据检查并设置setQueryData
   * 在 onSuccess 中使用
   */
  const imageInfoCheckSetQueryDataOnSuccessUpdate = (
    data: ImagesResponseWithBaseExpand
  ) => {
    // 更新query
    // 更新前，应确认data.update时间为最新的，以此方式避免两次很近的请求导致问题
    if (
      imagesGetOneQuery.data.value != null &&
      // data.updated > imagesGetOneQuery.data.value.updated
      compareDatesSafe(data.updated, imagesGetOneQuery.data.value.updated) === 1
    ) {
      // 更新query缓存
      queryClient.setQueryData(
        queryKeys.imagesGetOne(imagesGetOneQuery.data.value.id),
        // 确保类型正确
        data satisfies NonNullable<typeof imagesGetOneQuery.data.value>
      )
    }
  }

  return {
    //
    imagesGetOneQuery,
    imageInfoDataWithRealtime,
    imageInfoQueryStatus,
    imageInfoMessageListQuery,
    imageInfoMessageListPageNum,
    imageInfoMessageListPageSet,
    imageQueryRefresh,
    isImageQueryRefreshRunning,
    isAuthorCurrent,
    imageInfoCheckSetQueryDataOnSuccessUpdate,
  }
}

export type ImageInfoQueryDesuwaType = ReturnType<
  typeof useImageInfoQueryDesuwa
>
