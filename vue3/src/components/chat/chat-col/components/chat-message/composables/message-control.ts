import { onLongPress } from '@vueuse/core'
import type { ChatMessagePropsType } from './dependencies'
import type { MessagesResponseWidthExpand } from '@/api'

// 封装 消息的操作逻辑
export const useMessageControl = (data: {
  //
  props: ChatMessagePropsType
  currentMessageData: ComputedRef<MessagesResponseWidthExpand>
  isCurrentMessageShouldUpdateRealtimeUpdated: ComputedRef<boolean>
  updateCurrentMessageRealtimeUpdated: () => void
  isCurrentMessageRealtimeUpdatedIsDeleted: ComputedRef<boolean>
}) => {
  const {
    //
    props,
    currentMessageData,
    isCurrentMessageShouldUpdateRealtimeUpdated,
    updateCurrentMessageRealtimeUpdated,
    isCurrentMessageRealtimeUpdatedIsDeleted,
  } = data

  // 打开消息详情对话框函数
  const openMessageInfoDialogFn = () => {
    props.openMessageInfoDialog(
      currentMessageData.value.id,
      currentMessageData.value
    )
  }

  // 处理消息行的长按
  const onLongPressTargetRef = ref<HTMLElement | null>(null)
  // 【251113】取消消息长按
  // onLongPress(
  //   onLongPressTargetRef,
  //   () => {
  //     // 消息已删除，返回
  //     if (isCurrentMessageRealtimeUpdatedIsDeleted.value) {
  //       return
  //     }
  //     // 长按时如果需要更新消息则优先
  //     if (isCurrentMessageShouldUpdateRealtimeUpdated.value) {
  //       updateCurrentMessageRealtimeUpdated()
  //       return
  //     }
  //     openMessageInfoDialogFn()
  //   },
  //   {
  //     delay: 500, // 默认是 1000ms，可自定义
  //     modifiers: {
  //       prevent: false, // 阻止默认行为，取消，避免影响文字赋值
  //       stop: false, // 阻止事件冒泡，取消
  //     },
  //   }
  // )

  // 是否显示链接定位标记
  const isShowLinkPositioningFlag = computed(() => {
    if (
      props.linkPositioningFlagMessageId === currentMessageData.value.id &&
      props.linkPositioningFlagShow === true
    ) {
      return true
    }
    return false
  })
  // 链接定位标记的点击，开启详情对话框、延迟等过渡动画结束再取消标记
  const linkPositioningFlagClickFn = async () => {
    openMessageInfoDialogFn()
    await new Promise((resolve) => setTimeout(resolve, 300))
    props.linkPositioningFlagClose()
  }

  // 是否显示回复定位标记
  const isShowReplyPositioningFlag = computed(() => {
    if (
      props.replyPositioningFlagMessageId === currentMessageData.value.id &&
      props.replyPositioningFlagShow === true
    ) {
      return true
    }
    return false
  })
  // 回复定位标记的点击，开启详情对话框、延迟等过渡动画结束再取消标记
  const replyPositioningFlagClickFn = async () => {
    openMessageInfoDialogFn()
    await new Promise((resolve) => setTimeout(resolve, 300))
    props.replyPositioningFlagClose()
  }

  // 是否显示回复（正在回复）标记
  const isShowChatReplyMessageFlag = computed(() => {
    // if (props.chatReplyMessage == null) {
    if (props.refChatInputBar?.chatReplyMessage == null) {
      return false
    }
    if (
      props.refChatInputBar.chatReplyMessage.id === currentMessageData.value.id
    ) {
      return true
    }
    return false
  })

  // 是否显示编辑标记
  const isShowChatEditMessageFlag = computed(() => {
    // if (props.chatReplyMessage == null) {
    if (props.refChatInputBar?.chatEditMessage == null) {
      return false
    }
    if (
      props.refChatInputBar.chatEditMessage.id === currentMessageData.value.id
    ) {
      return true
    }
    return false
  })

  /** 聊天回复定位 */
  const replyMessagesPositioningFn = async () => {
    // 本消息无回复，直接返回
    if (currentMessageData.value.expand?.replyMessage == null) {
      return
    }
    await props.chatRoomMessagesReplyPositioningFn({
      id: currentMessageData.value.expand.replyMessage.id,
      created: currentMessageData.value.expand.replyMessage.created,
    })
  }

  return {
    //
    openMessageInfoDialogFn,
    onLongPressTargetRef,
    isShowLinkPositioningFlag,
    linkPositioningFlagClickFn,
    isShowReplyPositioningFlag,
    replyPositioningFlagClickFn,
    isShowChatReplyMessageFlag,
    isShowChatEditMessageFlag,
    replyMessagesPositioningFn,
  }
}
