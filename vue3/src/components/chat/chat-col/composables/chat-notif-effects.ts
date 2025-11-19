import {
  appIcon,
  appIconNotif,
  appMessageNotifSound,
  appMessageUpdateSound,
} from '@/config'
import { useRealtimeMessagesStore } from '@/stores'
import { useFavicon } from '@vueuse/core'
import { useSound } from '@vueuse/sound'

// useChatRoomMessagesRealtimeNotifEffects
/**
 * 封装 消息实时提示效果
 *
 * 消息提示：网站图标、标题、音效
 */
export const useChatRoomMessagesRealtimeNotifEffects = (data: {
  //
  chatRoomMessagesRealtimeUnReadNumber: ComputedRef<number>
}) => {
  const {
    //
    chatRoomMessagesRealtimeUnReadNumber,
  } = data

  // 有新消息时网站图标与标题改变
  useFavicon(
    computed(() => {
      if (chatRoomMessagesRealtimeUnReadNumber.value > 0) {
        return appIconNotif
      }
      return appIcon
    })
  )
  // const title = useTitle()
  watch(
    () => chatRoomMessagesRealtimeUnReadNumber.value,
    (num) => {
      // 正则匹配开头的 (数字)，并去除
      const baseTitle = document.title.replace(/^\(\d+\)\s*/, '')

      if (num > 0) {
        document.title = `(${num}) ${baseTitle}`
      } else {
        document.title = baseTitle
      }
    }
  )

  // 消息通知音效
  const messageNotifSound = useSound(appMessageNotifSound, { volume: 0.25 })
  watch(chatRoomMessagesRealtimeUnReadNumber, () => {
    if (chatRoomMessagesRealtimeUnReadNumber.value === 0) {
      return
    }
    messageNotifSound.play()
  })
  // 消息更新音效
  const messageUpdateSound = useSound(appMessageUpdateSound, { volume: 0.25 })
  const realtimeMessagesStore = useRealtimeMessagesStore()
  const chatRoomMessagesUpdateRealtime = computed(() => {
    // props.roomId
    // return realtimeMessagesStore.updateList.filter(i => i.room === props.roomId)
    return realtimeMessagesStore.updateList
  })
  watch(
    computed(() => chatRoomMessagesUpdateRealtime.value.length),
    () => {
      messageUpdateSound.play()
    }
  )

  return {
    //
  }
}
