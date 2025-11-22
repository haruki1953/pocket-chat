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
  appInitWebNotifTitle: {
    'en-US': (websiteName: string) => `Welcome to ${websiteName}` as const,
    'zh-CN': (websiteName: string) => `欢迎来到 ${websiteName}` as const,
    'zh-TW': (websiteName: string) => `歡迎來到 ${websiteName}` as const,
    'ja-JP': (websiteName: string) => `${websiteName} へようこそ` as const,
    'ko-KR': (websiteName: string) =>
      `${websiteName}에 오신 것을 환영합니다` as const,
    'ru-RU': (websiteName: string) =>
      `Добро пожаловать на ${websiteName}` as const,
  },
  appInitWebNotifBody: {
    'en-US': () =>
      'Keep this page open to receive new message notifications here' as const,
    'zh-CN': () => '保留此网页，就能在此收到新消息通知' as const,
    'zh-TW': () => '保留此網頁，就能在此收到新訊息通知' as const,
    'ja-JP': () =>
      'このページを開いたままにすると、新しいメッセージ通知を受け取れます' as const,
    'ko-KR': () =>
      '이 페이지를 열어 두면 새 메시지 알림을 받을 수 있습니다' as const,
    'ru-RU': () =>
      'Оставьте эту страницу открытой, чтобы получать уведомления о новых сообщениях' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
