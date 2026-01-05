import type { pb } from '@/lib'
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

/**
 * pb.authStore 的主要内容，将其响应式
 *
 * 对于不需要响应式的地方，还是推荐使用 pb.authStore
 */
export const useAuthStore = defineStore(
  `pocket-together-auth-${STORE_VERSION}`,
  () => {
    // pb.authStore 的主要内容，将其响应式
    const record = ref<typeof pb.authStore.record>(null)
    const token = ref('')
    const isValid = ref(false)
    const isSuperuser = ref(false)

    // 设置 AuthStore，在 pb.authStore.onChange 时传入 pb.authStore
    const setAuth = (data: {
      record: typeof pb.authStore.record
      token: string
      isValid: boolean
      isSuperuser: boolean
    }) => {
      record.value = data.record
      token.value = data.token
      isValid.value = data.isValid
      isSuperuser.value = data.isSuperuser
    }

    return {
      record,
      token,
      isValid,
      isSuperuser,
      setAuth,
    }
  },
  {
    persist: true, // 持久化
  }
)
