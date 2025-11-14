import type { I18nMessagesSatisfiesType } from '.'
/**
 * i18nMessages 提示信息相关部分
 */
export const i18nMessagesNotificationPart = {
  messageUpdateSuccess: {
    'en-US': () => 'Updated successfully' as const,
    'zh-CN': () => '修改成功' as const,
    'zh-TW': () => '修改成功' as const,
    'ja-JP': () => '更新に成功しました' as const,
    'ko-KR': () => '수정이 완료되었습니다' as const,
    'ru-RU': () => 'Успешно обновлено' as const,
  },
  messageUpdateFailure: {
    'en-US': () => 'Update failed' as const,
    'zh-CN': () => '修改失败' as const,
    'zh-TW': () => '修改失败' as const,
    'ja-JP': () => '更新に失敗しました' as const,
    'ko-KR': () => '수정에 실패했습니다' as const,
    'ru-RU': () => 'Ошибка обновления' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
