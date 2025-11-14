import type { I18nMessagesSatisfiesType } from './dependencies'
import { i18nMessagesSettingPartProfilePart } from './profile'
/**
 * i18nMessages 设置页相关部分
 */
export const i18nMessagesSettingPart = {
  // 设置页 按钮
  settingButtonSave: {
    'en-US': () => 'Save' as const,
    'zh-CN': () => '保存' as const,
    'zh-TW': () => '保存' as const,
    'ja-JP': () => '保存' as const, // 日本語
    'ko-KR': () => '저장' as const, // 한국어
    'ru-RU': () => 'Сохранить' as const, // Русский
  },
  settingButtonCancel: {
    'en-US': () => 'Cancel' as const,
    'zh-CN': () => '取消' as const,
    'zh-TW': () => '取消' as const,
    'ja-JP': () => 'キャンセル' as const, // 日本語
    'ko-KR': () => '취소' as const, // 한국어
    'ru-RU': () => 'Отмена' as const, // Русский
  },
  settingButtonConfirm: {
    'en-US': () => 'Confirm' as const,
    'zh-CN': () => '确认' as const,
    'zh-TW': () => '確認' as const,
    'ja-JP': () => '確認' as const, // 日本語
    'ko-KR': () => '확인' as const, // 한국어
    'ru-RU': () => 'Подтвердить' as const, // Русский
  },
  // 个人信息相关部分
  ...i18nMessagesSettingPartProfilePart,
} as const satisfies I18nMessagesSatisfiesType
