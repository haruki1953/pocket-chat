import { type MessagesResponseWidthExpand } from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 当前 Store 的版本号。
 *
 * 当 store 的结构（字段、类型）发生不兼容更新时，
 * 修改此版本号即可强制生成一个新的持久化存储空间。
 * 避免旧数据与新类型不符导致运行时错误。
 */
const STORE_VERSION = 'v1'

/** 用于储存订阅的实时Messages */
export const useRealtimeMessagesStore = defineStore(
  `pocket-together-realtime-messages-${STORE_VERSION}`,
  () => {
    // 储存订实时阅得到的消息
    /** 创建的帖子 */
    const createListRef = ref<MessagesResponseWidthExpand[]>([])
    const createList = computed(() => createListRef.value)
    // 用于实时事件时的添加，push即可。返回true代表成功添加，返回false代表已存在
    const createListCheckAndPush = (val: MessagesResponseWidthExpand) => {
      // 使用 id 字段作为唯一标识，如果已存在则直接返回
      if (createListRef.value.find((item) => item.id === val.id) != null) {
        return false
      }
      // push即可
      createListRef.value.push(val)
      return true
    }
    // 用于断线补偿时的添加，查找“比自己小且最接近”的元素，在其之后后插入
    const createListCheckAndInsert = (val: MessagesResponseWidthExpand) => {
      // 使用 id 字段作为唯一标识，如果已存在则直接返回
      if (createListRef.value.find((item) => item.id === val.id) != null) {
        return false
      }
      // 从尾部开始往前找
      for (let i = createListRef.value.length - 1; i >= 0; i--) {
        if (createListRef.value[i].created <= val.created) {
          // 查找“比自己小且最接近”的元素，在其之后后插入
          createListRef.value.splice(i + 1, 0, val)
          return true
        }
      }
      // 如果没有找到比自己小的，插到最前面
      createListRef.value.unshift(val)
      return true
    }

    /** 更新的帖子 */
    const updateListRef = ref<MessagesResponseWidthExpand[]>([])
    const updateList = computed(() => updateListRef.value)
    const updateListPush = (val: MessagesResponseWidthExpand) => {
      updateListRef.value.push(val)
    }
    /* 删除的帖子 */
    const deleteListRef = ref<MessagesResponseWidthExpand[]>([])
    const deleteList = computed(() => deleteListRef.value)
    const deleteListPush = (val: MessagesResponseWidthExpand) => {
      deleteListRef.value.push(val)
    }

    // 是否已启动订阅
    const isSubscribeStartedRef = ref(false)
    const isSubscribeStarted = computed(() => isSubscribeStartedRef.value)
    const isSubscribeStartedSetTrue = () => {
      isSubscribeStartedRef.value = true
    }

    // 是否订阅已就绪
    const isSubscribeReadyRef = ref(false)
    const isSubscribeReady = computed(() => isSubscribeReadyRef.value)
    const isSubscribeReadySetTrue = () => {
      isSubscribeReadyRef.value = true
    }

    // 记录第一次实时连接时得到的第一个消息，也用于判断当前是否为第一次实时连接，none 代表第一次连接时没有消息
    const firstPbConnectMessageRef = ref<
      MessagesResponseWidthExpand | 'none' | null
    >(null)
    const firstPbConnectMessage = computed(() => firstPbConnectMessageRef.value)
    const firstPbConnectMessageSet = (
      val: MessagesResponseWidthExpand | 'none'
    ) => {
      firstPbConnectMessageRef.value = val
    }

    return {
      //
      createList,
      createListCheckAndPush,
      createListCheckAndInsert,
      updateList,
      updateListPush,
      deleteList,
      deleteListPush,
      isSubscribeStarted,
      isSubscribeStartedSetTrue,
      isSubscribeReady,
      isSubscribeReadySetTrue,
      firstPbConnectMessage,
      firstPbConnectMessageSet,
    }
  },
  {
    persist: true, // 持久化
  }
)
