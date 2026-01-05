import type { UsersResponse } from '@/lib'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type ProfileQueryData = UsersResponse

/**
 * 当前 Store 的版本号。
 *
 * 当 store 的结构（字段、类型）发生不兼容更新时，
 * 修改此版本号即可强制生成一个新的持久化存储空间。
 * 避免旧数据与新类型不符导致运行时错误。
 */
const STORE_VERSION = 'v1'

// 用于 useProfileQuery 的 placeholderData
export const usePlaceholderDataProfileStore = defineStore(
  `pocket-together-usePlaceholderDataProfileStore-${STORE_VERSION}`,
  () => {
    const data = ref<ProfileQueryData | null>(null)
    const set = (newData: ProfileQueryData | null) => {
      data.value = newData
    }
    return {
      data,
      set,
    }
  },
  {
    persist: true, // 持久化
  }
)
