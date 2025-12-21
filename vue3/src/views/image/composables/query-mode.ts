import { queryKeys } from '@/queries'
import { useAuthStore } from '@/stores'
import { useQueryClient } from '@tanstack/vue-query'

export type ImageQueryModeMarkType = 'image_all' | 'image_my'

export const useImageQueryModeDesuwa = () => {
  // 查询模式
  const imageQueryMode = ref<ImageQueryModeMarkType>('image_all')

  // 查询搜索
  const imageQuerySearch = ref<string>('')

  // 查询页数
  const imageQueryPage = ref(1)

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
  }
}

export type ImageQueryModeDesuwaType = ReturnType<
  typeof useImageQueryModeDesuwa
>
