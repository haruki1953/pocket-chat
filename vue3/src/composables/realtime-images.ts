import {
  pbImagesSubscribeAllApi,
  type ImagesResponseWithBaseExpand,
} from '@/api'
import { appUserDefaultAvatar, routerDict } from '@/config'
import { pb } from '@/lib'
import { useI18nStore, useRealtimeImagesStore } from '@/stores'
import { useWebNotification } from '@vueuse/core'
import { useRoute } from 'vue-router'

export const useRealtimeImagesSubscribe = () => {
  const realtimeImagesStore = useRealtimeImagesStore()

  // 启动订阅，将在App.vue调用
  const startSubscribe = async () => {
    // 防止多次调用
    if (realtimeImagesStore.isSubscribeStarted) {
      return 'realtimeImagesStore.isSubscribeStarted' as const
    }
    realtimeImagesStore.isSubscribeStartedSetTrue()

    // pb实时图片订阅
    await pbImagesSubscribeAllApi(
      async (e: { action: string; record: ImagesResponseWithBaseExpand }) => {
        // // 模拟延迟
        // await new Promise((resolve) => setTimeout(resolve, 6000))

        if (e.action === 'create') {
          realtimeImagesStore.createListCheckAndPush(e.record)
        }
        if (e.action === 'update') {
          realtimeImagesStore.updateListPush(e.record)
        }
        if (e.action === 'delete') {
          realtimeImagesStore.deleteListPush(e.record)
        }
        // console.log(e)
      }
    ).catch((error) => {
      console.error('pbImagesSubscribeAllApi', error)
    })

    realtimeImagesStore.isSubscribeReadySetTrue()
    return 'startSubscribe'
  }

  return {
    startSubscribe,
  }
}
