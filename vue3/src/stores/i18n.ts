import {
  i18nDefaultLocale,
  i18nMessages,
  type I18nLocaleType,
  type I18nMessagesKeyType,
} from '@/config/i18n'
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

export const useI18nStore = defineStore(
  `pocket-together-i18n-${STORE_VERSION}`,
  () => {
    // type I18nLocaleType = "en-US" | "zh-CN" | "zh-TW" ……
    const locale = ref<I18nLocaleType>(i18nDefaultLocale)

    const localeSet = (code: I18nLocaleType) => {
      locale.value = code
    }

    /**
     * 好多i18n库都用t命名(translate)，来获取语言内容
     */
    const t = <MessageKey extends I18nMessagesKeyType>(
      messageKey: MessageKey
    ) => {
      return i18nMessages[messageKey][
        locale.value
      ] as (typeof i18nMessages)[MessageKey][I18nLocaleType]
    }

    return {
      locale,
      localeSet,
      t,
    }
  },
  {
    persist: true, // 持久化
  }
)
