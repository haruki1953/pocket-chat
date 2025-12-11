import { useNow } from '@vueuse/core'
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

export const useSettingStateStore = defineStore(
  `pocket-together-setting-state-${STORE_VERSION}`,
  () => {
    // 邮箱修改
    /** 用于邮箱修改，记录已提交的、要修改为的邮箱 */
    const emailUpdatePendingVerificationEmail = ref('')
    /** 用于邮箱修改，记录上次提交的时间，以此实现速率限制 */
    const emailUpdateLastSubmitDate = ref('')
    /** 用于邮箱修改，提交后调用此函数来设置信息 */
    const emailUpdateRateLimitSet = (data: {
      emailUpdatePendingVerificationEmail: string
    }) => {
      emailUpdatePendingVerificationEmail.value =
        data.emailUpdatePendingVerificationEmail
      emailUpdateLastSubmitDate.value = new Date().toISOString()
    }

    // 邮箱验证
    /** 用于邮箱验证，记录已提交的邮箱 */
    const emailVerifyPendingVerificationEmail = ref('')
    /** 用于邮箱验证，记录上次提交的时间，以此实现速率限制 */
    const emailVerifyLastSubmitDate = ref('')
    /** 用于邮箱验证，提交后调用此函数来设置信息 */
    const emailVerifyRateLimitSet = (data: {
      emailVerifyPendingVerificationEmail: string
    }) => {
      emailVerifyPendingVerificationEmail.value =
        data.emailVerifyPendingVerificationEmail
      emailVerifyLastSubmitDate.value = new Date().toISOString()
    }

    // 密码修改
    /** 用于密码修改，记录已提交的邮箱 */
    const passwordUpdatePendingVerificationEmail = ref('')
    /** 用于密码修改，记录上次提交的时间，以此实现速率限制 */
    const passwordUpdateLastSubmitDate = ref('')
    /** 用于密码修改，提交后调用此函数来设置信息 */
    const passwordUpdateRateLimitSet = (data: {
      passwordUpdatePendingVerificationEmail: string
    }) => {
      passwordUpdatePendingVerificationEmail.value =
        data.passwordUpdatePendingVerificationEmail
      passwordUpdateLastSubmitDate.value = new Date().toISOString()
    }

    return {
      emailUpdatePendingVerificationEmail,
      emailUpdateLastSubmitDate,
      emailUpdateRateLimitSet,
      emailVerifyPendingVerificationEmail,
      emailVerifyLastSubmitDate,
      emailVerifyRateLimitSet,
      passwordUpdatePendingVerificationEmail,
      passwordUpdateLastSubmitDate,
      passwordUpdateRateLimitSet,
    }
  },
  {
    persist: true, // 持久化
  }
)
