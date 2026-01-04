import { queryKeys, useImagePageListQuery } from '@/queries'
import { useAuthStore } from '@/stores'
import { useQueryClient } from '@tanstack/vue-query'
import type { ImageSelectPagePageRecoverDataDesuwaType } from './page-recover'

export type ImageQueryModeMarkType = 'image_all' | 'image_my'

export const useImageQueryModeDesuwa = (data: {
  imageSelectPagePageRecoverDataDesuwa: ImageSelectPagePageRecoverDataDesuwaType
}) => {
  const { imageSelectPagePageRecoverDataDesuwa } = data

  const {
    // 页面恢复数据
    imageSelectPagePageRecoverData,
  } = imageSelectPagePageRecoverDataDesuwa

  // 查询模式
  const imageQueryMode = ref<ImageQueryModeMarkType>('image_all')

  // 查询搜索
  const imageQuerySearch = ref<string>('')

  // 查询页数
  const imageQueryPage = ref(1)

  // 查询模式
  // 查询搜索
  // 查询页数
  // 【根据页面恢复数据初始化】
  if (imageSelectPagePageRecoverData != null) {
    imageQueryMode.value = imageSelectPagePageRecoverData.data.imageQueryMode
    imageQuerySearch.value =
      imageSelectPagePageRecoverData.data.imageQuerySearch
    imageQueryPage.value = imageSelectPagePageRecoverData.data.imageQueryPage
  }

  // 查询模式切换

  // 是否能 切换至 image_all
  const canImageQueryModeSetToImageAll = computed(() => {
    return true
  })
  // 切换至 image_all
  const imageQueryModeSetToImageAll = () => {
    if (canImageQueryModeSetToImageAll.value === false) {
      return
    }
    imageQueryMode.value = 'image_all'
    imageQueryPage.value = 1
  }

  // 响应式登陆状态
  const authStore = useAuthStore()

  // 是否能 切换至 image_my
  const canImageQueryModeSetToImageMy = computed(() => {
    // 未登录时不能
    if (authStore.isValid === false || authStore.record?.id == null) {
      return false
    }
    return true
  })
  // 切换至 image_my
  const imageQueryModeSetToImageMy = () => {
    if (canImageQueryModeSetToImageMy.value === false) {
      return
    }
    imageQueryMode.value = 'image_my'
    imageQueryPage.value = 1
  }

  // 查询搜索设置
  const imageQuerySearchSet = (val: string) => {
    imageQuerySearch.value = val
    imageQueryPage.value = 1
  }

  // 查询页数设置
  const imageQueryPageSet = (val: number) => {
    imageQueryPage.value = val
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
      imageQueryPage.value = 1

      await queryClient.invalidateQueries({
        queryKey: queryKeys.imagePageList(),
      })
    } finally {
      isImageQueryRefreshRunning.value = false
    }
  }

  // 全部图片
  const numAllImagePageListQuery = useImagePageListQuery({
    pageNum: computed(() => 1),
    authorId: computed(() => null),
    searchContent: computed(() => null),
    customStrId: computed(() => 'numAllImagePageListQuery'),
  })

  // 我的图片
  const numMyImagePageListQuery = useImagePageListQuery({
    pageNum: computed(() => {
      // 未登录则 pageNum 为 null 即不查询
      if (authStore.isValid === false || authStore.record?.id == null) {
        return null
      }
      return 1
    }),
    authorId: computed(() => {
      if (authStore.isValid === false || authStore.record?.id == null) {
        return null
      }
      return authStore.record.id
    }),
    searchContent: computed(() => null),
    customStrId: computed(() => 'numMyImagePageListQuery'),
  })

  const imagePageListQuery = useImagePageListQuery({
    pageNum: computed(() => {
      // 未登录且image_my，则应为null，不查询
      if (
        (authStore.isValid === false || authStore.record?.id == null) &&
        imageQueryMode.value === 'image_my'
      ) {
        return null
      }
      return imageQueryPage.value
    }),
    authorId: computed(() => {
      if (imageQueryMode.value === 'image_all') {
        return null
      } else {
        // imageQueryMode.value === 'image_my'
        if (authStore.isValid === false || authStore.record?.id == null) {
          return null
        }
        return authStore.record.id
      }
    }),
    searchContent: computed(() => {
      // 【260103】
      if (imageQuerySearch.value === '') {
        return null
      }
      return imageQuerySearch.value
    }),
    customStrId: computed(() => 'imagePageListQuery'),
  })

  return {
    imageQueryMode,
    canImageQueryModeSetToImageAll,
    imageQueryModeSetToImageAll,
    canImageQueryModeSetToImageMy,
    imageQueryModeSetToImageMy,
    imageQuerySearch,
    imageQuerySearchSet,
    imageQueryPage,
    imageQueryPageSet,
    isImageQueryRefreshRunning,
    imageQueryRefresh,
    numAllImagePageListQuery,
    numMyImagePageListQuery,
    imagePageListQuery,
  }
}

export type ImageQueryModeDesuwaType = ReturnType<
  typeof useImageQueryModeDesuwa
>
