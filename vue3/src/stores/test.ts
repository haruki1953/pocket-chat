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

export const useTestStore = defineStore(
  `pocket-together-test-${STORE_VERSION}`,
  () => {
    const testVal = ref(0)

    const testValAdd = () => {
      testVal.value += 1
    }

    return {
      testVal,
      testValAdd,
    }
  },
  {
    persist: true, // 持久化
  }
)
