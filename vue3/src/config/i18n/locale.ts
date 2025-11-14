// 导入element-plus的国际化配置（将控制某些组件如时间选择器的语言）
import elEnUS from 'element-plus/es/locale/lang/en'
import elZhCN from 'element-plus/es/locale/lang/zh-cn'
import elZhTW from 'element-plus/es/locale/lang/zh-tw'
import elJaJP from 'element-plus/es/locale/lang/ja'
import elKoKR from 'element-plus/es/locale/lang/ko'
import elRuRU from 'element-plus/es/locale/lang/ru'

// 导入naive-ui的国际化配置
import {
  enUS as nuEnUS,
  dateEnUS as nuDateEnUS,
  zhCN as nuZhCN,
  dateZhCN as nuDateZhCN,
  zhTW as nuZhTW,
  dateZhTW as nuDateZhTW,
  jaJP as nuJaJP,
  dateJaJP as nuDateJaJP,
  koKR as nuKoKR,
  dateKoKR as nuDateKoKR,
  ruRU as nuRuRU,
  dateRuRU as nuDateRuRU,
} from 'naive-ui'

// 当前所支持的语言，格式：(ISO 639-1)-(Country Code)
export const i18nLocaleList = [
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'ko-KR',
  'ru-RU',
] as const

// 通过类型体操，根据i18nLocaleList的值得到联合类型（Union Types）
export type I18nLocaleType = (typeof i18nLocaleList)[number]

// 语言信息
export const i18nLocaleInfo = {
  'en-US': {
    language: 'English',
    region: 'USA',
    elLocale: elEnUS,
    nuLocale: nuEnUS,
    nuDateLocale: nuDateEnUS,
  },
  'zh-CN': {
    language: '简体中文',
    region: '中国',
    elLocale: elZhCN,
    nuLocale: nuZhCN,
    nuDateLocale: nuDateZhCN,
  },
  'zh-TW': {
    language: '繁體中文',
    region: '台灣',
    elLocale: elZhTW,
    nuLocale: nuZhTW,
    nuDateLocale: nuDateZhTW,
  },
  'ja-JP': {
    language: '日本語',
    region: '日本',
    elLocale: elJaJP,
    nuLocale: nuJaJP,
    nuDateLocale: nuDateJaJP,
  },
  'ko-KR': {
    language: '한국어',
    region: '대한민국',
    elLocale: elKoKR,
    nuLocale: nuKoKR,
    nuDateLocale: nuDateKoKR,
  },
  'ru-RU': {
    language: 'Русский',
    region: 'Россия',
    elLocale: elRuRU,
    nuLocale: nuRuRU,
    nuDateLocale: nuDateRuRU,
  },
} as const satisfies Record<
  // 确保类型正确
  I18nLocaleType,
  {
    language: string
    region: string
    elLocale: unknown // typeof elEnUS | typeof elZhCN | typeof elZhTW
    nuLocale: unknown // typeof nuEnUS | typeof nuZhCN | typeof nuZhTW
    nuDateLocale: unknown // typeof nuDateEnUS | typeof nuDateZhCN | typeof nuDateZhTW
  }
>

// 默认语言，优先使用navigator.language，否则i18nfallbackLocale
const i18nfallbackLocale = 'en-US'
export const i18nDefaultLocale: I18nLocaleType = (() => {
  if (navigator.language == null || navigator.language === '') {
    return i18nfallbackLocale
  }
  // 找到系统语言对应代码，转为小写避免意外
  const findLocale = i18nLocaleList.find(
    (i) => i.toLowerCase() === navigator.language.toLowerCase()
  )
  if (findLocale != null) {
    return findLocale
  }
  // 有的浏览器可能只返回语言标志，用startsWith匹配
  const findLocaleStartsWith = i18nLocaleList.find((i) =>
    i.toLowerCase().startsWith(navigator.language.toLowerCase())
  )
  if (findLocaleStartsWith != null) {
    return findLocaleStartsWith
  }
  return i18nfallbackLocale
})()
