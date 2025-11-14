import type { I18nMessagesSatisfiesType } from './dependencies'
/**
 * i18nMessagesSettingPart 个人信息相关部分
 */
export const i18nMessagesSettingPartProfilePart = {
  // 设置页 个人信息 修改名称与简介
  settingProfileUpdateNameBioContentTitle: {
    'en-US': () => 'Edit Name and Bio' as const,
    'zh-CN': () => '修改名称与简介' as const,
    'zh-TW': () => '修改名稱與簡介' as const,
    'ja-JP': () => '名前と自己紹介を編集' as const,
    'ko-KR': () => '이름과 소개 수정' as const,
    'ru-RU': () => 'Редактировать имя и биографию' as const,
  },
  settingProfileUpdateNameBioNameLabel: {
    'en-US': () => 'Name' as const,
    'zh-CN': () => '名称' as const,
    'zh-TW': () => '名稱' as const,
    'ja-JP': () => '名前' as const,
    'ko-KR': () => '이름' as const,
    'ru-RU': () => 'Имя' as const,
  },
  settingProfileUpdateNameBioBioLabel: {
    'en-US': () => 'Bio' as const,
    'zh-CN': () => '简介' as const,
    'zh-TW': () => '簡介' as const,
    'ja-JP': () => '自己紹介' as const,
    'ko-KR': () => '소개' as const,
    'ru-RU': () => 'Биография' as const,
  },
  settingProfileUpdateNameBioNamePlaceholder: {
    'en-US': () => 'Write down the name you want to display' as const,
    'zh-CN': () => '写下你希望展示的名称' as const,
    'zh-TW': () => '寫下你希望展示的名稱' as const,
    'ja-JP': () => '表示したい名前を書いてください' as const,
    'ko-KR': () => '표시할 이름을 입력하세요' as const,
    'ru-RU': () => 'Введите имя, которое хотите отображать' as const,
  },
  settingProfileUpdateNameBioBioPlaceholder: {
    'en-US': () => 'Sketch your silhouette with words' as const,
    'zh-CN': () => '用文字勾画你的剪影' as const,
    'zh-TW': () => '用文字勾畫你的剪影' as const,
    'ja-JP': () => '言葉であなたを表現してください' as const,
    'ko-KR': () => '단어로 당신을 표현하세요' as const,
    'ru-RU': () => 'Опишите себя словами' as const,
  },
  // 设置页 个人信息 修改用户名
  settingProfileUpdateUsernameContentTitle: {
    'en-US': () => 'Modify Username' as const,
    'zh-CN': () => '修改用户名' as const,
    'zh-TW': () => '修改用戶名' as const,
    'ja-JP': () => 'ユーザー名を変更' as const,
    'ko-KR': () => '사용자 이름 수정' as const,
    'ru-RU': () => 'Изменить имя пользователя' as const,
  },
  settingProfileUpdateUsernameUsernameLable: {
    'en-US': () => 'Username' as const,
    'zh-CN': () => '用户名' as const,
    'zh-TW': () => '用戶名' as const,
    'ja-JP': () => 'ユーザー名' as const,
    'ko-KR': () => '사용자 이름' as const,
    'ru-RU': () => 'Имя пользователя' as const,
  },
  // 设置页 个人信息 修改头像
  settingProfileUpdateAvatarContentTitle: {
    'en-US': () => 'Update Avatar' as const,
    'zh-CN': () => '修改头像' as const,
    'zh-TW': () => '修改頭像' as const,
    'ja-JP': () => 'アバターを更新' as const,
    'ko-KR': () => '아바타 수정' as const,
    'ru-RU': () => 'Обновить аватар' as const,
  },
  settingProfileUpdateAvatarDialogTitle: {
    'en-US': () => 'Crop Avatar' as const,
    'zh-CN': () => '裁剪头像' as const,
    'zh-TW': () => '裁剪頭像' as const,
    'ja-JP': () => 'アバターを切り抜き' as const,
    'ko-KR': () => '아바타 자르기' as const,
    'ru-RU': () => 'Обрезать аватар' as const,
  },
  settingProfileUpdateAvatarDialogCancelButton: {
    'en-US': () => 'Cancel' as const,
    'zh-CN': () => '取消' as const,
    'zh-TW': () => '取消' as const,
    'ja-JP': () => 'キャンセル' as const,
    'ko-KR': () => '취소' as const,
    'ru-RU': () => 'Отмена' as const,
  },
  settingProfileUpdateAvatarDialogCropButton: {
    'en-US': () => 'Crop' as const,
    'zh-CN': () => '裁剪' as const,
    'zh-TW': () => '裁剪' as const,
    'ja-JP': () => '切り抜き' as const,
    'ko-KR': () => '자르기' as const,
    'ru-RU': () => 'Обрезать' as const,
  },
  // 设置页 个人信息 修改邮箱
  settingProfileUpdateEmailContentTitle: {
    'en-US': () => 'Update Email' as const,
    'zh-CN': () => '修改邮箱' as const,
    'zh-TW': () => '修改信箱' as const,
    'ja-JP': () => 'メールを更新' as const,
    'ko-KR': () => '이메일 수정' as const,
    'ru-RU': () => 'Обновить электронную почту' as const,
  },
  settingProfileUpdateEmailConfirmContainerTitle: {
    'en-US': (email: string) =>
      `A verification email will be sent to ${email}` as const,
    'zh-CN': (email: string) => `将向 ${email} 发送验证邮件` as const,
    'zh-TW': (email: string) => `將向 ${email} 發送驗證信` as const,
    'ja-JP': (email: string) => `${email} に確認メールを送信します` as const,
    'ko-KR': (email: string) => `${email} 로 확인 메일이 전송됩니다` as const,
    'ru-RU': (email: string) =>
      `Письмо с подтверждением будет отправлено на ${email}` as const,
  },
  settingProfileUpdateEmailEmailLable: {
    'en-US': () => 'Email' as const,
    'zh-CN': () => '邮箱' as const,
    'zh-TW': () => '信箱' as const,
    'ja-JP': () => 'メール' as const,
    'ko-KR': () => '이메일' as const,
    'ru-RU': () => 'Электронная почта' as const,
  },
  settingProfileUpdateEmailPendingVerificationText: {
    'en-US': () => 'Pending verification' as const,
    'zh-CN': () => '待验证' as const,
    'zh-TW': () => '待驗證' as const,
    'ja-JP': () => '確認待ち' as const,
    'ko-KR': () => '확인 대기 중' as const,
    'ru-RU': () => 'Ожидает подтверждения' as const,
  },
  settingProfileUpdateEmailVerifiedText: {
    'en-US': () => 'Verified' as const,
    'zh-CN': () => '已验证' as const,
    'zh-TW': () => '已驗證' as const,
    'ja-JP': () => '確認済み' as const,
    'ko-KR': () => '확인됨' as const,
    'ru-RU': () => 'Подтверждено' as const,
  },
  settingProfileUpdateEmailRetryAfterDuration: {
    'en-US': (duration: string) => `Retry after ${duration}` as const,
    'zh-CN': (duration: string) => `${duration}后可重试` as const,
    'zh-TW': (duration: string) => `${duration}後可重試` as const,
    'ja-JP': (duration: string) => `${duration} 後に再試行できます` as const,
    'ko-KR': (duration: string) =>
      `${duration} 후에 다시 시도할 수 있습니다` as const,
    'ru-RU': (duration: string) =>
      `Повторите попытку через ${duration}` as const,
  },
  // 设置页 个人信息 验证邮箱
  settingProfileVerifyEmailContentTitle: {
    'en-US': () => 'Verify Email' as const,
    'zh-CN': () => '验证邮箱' as const,
    'zh-TW': () => '驗證信箱' as const,
    'ja-JP': () => 'メールを確認' as const,
    'ko-KR': () => '이메일 확인' as const,
    'ru-RU': () => 'Подтвердить электронную почту' as const,
  },
  settingProfileVerifyEmailVerifiedText: {
    'en-US': () => 'Verified' as const,
    'zh-CN': () => '已验证' as const,
    'zh-TW': () => '已驗證' as const,
    'ja-JP': () => '確認済み' as const,
    'ko-KR': () => '확인됨' as const,
    'ru-RU': () => 'Подтверждено' as const,
  },
  settingProfileVerifyEmailUnverifiedText: {
    'en-US': () => 'Unverified' as const,
    'zh-CN': () => '未验证' as const,
    'zh-TW': () => '未驗證' as const,
    'ja-JP': () => '未確認' as const,
    'ko-KR': () => '미확인' as const,
    'ru-RU': () => 'Не подтверждено' as const,
  },
  settingProfileVerifyEmailPendingVerificationText: {
    'en-US': () => 'Pending verification' as const,
    'zh-CN': () => '待验证' as const,
    'zh-TW': () => '待驗證' as const,
    'ja-JP': () => '確認待ち' as const,
    'ko-KR': () => '확인 대기 중' as const,
    'ru-RU': () => 'Ожидает подтверждения' as const,
  },
  settingProfileVerifyEmailButtonSubmitText: {
    'en-US': () => 'Verify Email' as const,
    'zh-CN': () => '验证邮箱' as const,
    'zh-TW': () => '驗證信箱' as const,
    'ja-JP': () => 'メールを確認' as const,
    'ko-KR': () => '이메일 확인' as const,
    'ru-RU': () => 'Подтвердить почту' as const,
  },
  settingProfileVerifyEmailConfirmContainerTitle: {
    'en-US': (email: string) =>
      `A verification email will be sent to ${email}` as const,
    'zh-CN': (email: string) => `将向 ${email} 发送验证邮件` as const,
    'zh-TW': (email: string) => `將向 ${email} 發送驗證信` as const,
    'ja-JP': (email: string) => `${email} に確認メールを送信します` as const,
    'ko-KR': (email: string) => `${email} 로 확인 메일이 전송됩니다` as const,
    'ru-RU': (email: string) =>
      `Письмо с подтверждением будет отправлено на ${email}` as const,
  },
  settingProfileVerifyEmailRetryAfterDuration: {
    'en-US': (duration: string) => `Retry after ${duration}` as const,
    'zh-CN': (duration: string) => `${duration}后可重试` as const,
    'zh-TW': (duration: string) => `${duration}後可重試` as const,
    'ja-JP': (duration: string) => `${duration} 後に再試行できます` as const,
    'ko-KR': (duration: string) =>
      `${duration} 후에 다시 시도할 수 있습니다` as const,
    'ru-RU': (duration: string) =>
      `Повторите попытку через ${duration}` as const,
  },
  // 设置页 个人信息 修改密码
  settingProfileUpdatePasswordContentTitle: {
    'en-US': () => 'Modify Password' as const,
    'zh-CN': () => '修改密码' as const,
    'zh-TW': () => '修改密碼' as const,
    'ja-JP': () => 'パスワードを変更' as const,
    'ko-KR': () => '비밀번호 수정' as const,
    'ru-RU': () => 'Изменить пароль' as const,
  },
  settingProfileUpdatePasswordConfirmContainerTitle: {
    'en-US': (email: string) =>
      `A password reset link will be sent to ${email}` as const,
    'zh-CN': (email: string) => `密码重置链接将发送至 ${email}` as const,
    'zh-TW': (email: string) => `密碼重置連結將發送至 ${email}` as const,
    'ja-JP': (email: string) =>
      `パスワードリセットリンクが ${email} に送信されます` as const,
    'ko-KR': (email: string) =>
      `비밀번호 재설정 링크가 ${email} 로 전송됩니다` as const,
    'ru-RU': (email: string) =>
      `Ссылка для сброса пароля будет отправлена на ${email}` as const,
  },
  settingProfileUpdatePasswordButtonSubmitText: {
    'en-US': () => 'Modify Password' as const,
    'zh-CN': () => '修改密码' as const,
    'zh-TW': () => '修改密碼' as const,
    'ja-JP': () => 'パスワードを変更' as const,
    'ko-KR': () => '비밀번호 수정' as const,
    'ru-RU': () => 'Изменить пароль' as const,
  },
  settingProfileUpdatePasswordRetryAfterDuration: {
    'en-US': (duration: string) => `Retry after ${duration}` as const,
    'zh-CN': (duration: string) => `${duration}后可重试` as const,
    'zh-TW': (duration: string) => `${duration}後可重試` as const,
    'ja-JP': (duration: string) => `${duration} 後に再試行できます` as const,
    'ko-KR': (duration: string) =>
      `${duration} 후에 다시 시도할 수 있습니다` as const,
    'ru-RU': (duration: string) =>
      `Повторите попытку через ${duration}` as const,
  },
  // 设置页 个人信息 退出登录
  settingProfileLogOutContentTitle: {
    'en-US': () => 'Log Out' as const,
    'zh-CN': () => '退出登录' as const,
    'zh-TW': () => '登出' as const,
    'ja-JP': () => 'ログアウト' as const,
    'ko-KR': () => '로그아웃' as const,
    'ru-RU': () => 'Выйти' as const,
  },
  settingProfileLogOutConfirmContainerTitle: {
    'en-US': () => 'Are you sure you want to log out?' as const,
    'zh-CN': () => '确认要退出登录吗？' as const,
    'zh-TW': () => '確定要登出嗎？' as const,
    'ja-JP': () => 'ログアウトしてもよろしいですか？' as const,
    'ko-KR': () => '로그아웃하시겠습니까?' as const,
    'ru-RU': () => 'Вы уверены, что хотите выйти?' as const,
  },
  settingProfileLogOutButtonSubmitText: {
    'en-US': () => 'Log Out' as const,
    'zh-CN': () => '退出登录' as const,
    'zh-TW': () => '登出' as const,
    'ja-JP': () => 'ログアウト' as const,
    'ko-KR': () => '로그아웃' as const,
    'ru-RU': () => 'Выйти' as const,
  },
  // 设置页 个人信息 未登录提示
  settingProfileNotLoginPromptTitle: {
    'en-US': () =>
      // eslint-disable-next-line prettier/prettier
      'You\'re not logged in. Sign in to access more content.' as const,
    'zh-CN': () => '当前未登录，登录后可查看更多内容' as const,
    'zh-TW': () => '尚未登入，登入後可查看更多內容' as const,
    'ja-JP': () =>
      'ログインしていません。ログインするとさらに多くのコンテンツにアクセスできます' as const,
    'ko-KR': () =>
      '로그인되어 있지 않습니다. 로그인하면 더 많은 콘텐츠를 볼 수 있습니다' as const,
    'ru-RU': () =>
      'Вы не вошли в систему. Войдите, чтобы получить доступ к большему количеству контента' as const,
  },
  settingProfileNotLoginPromptLoginText: {
    'en-US': () => 'Sign in' as const,
    'zh-CN': () => '登 录' as const,
    'zh-TW': () => '登 入' as const,
    'ja-JP': () => 'ログイン' as const,
    'ko-KR': () => '로그인' as const,
    'ru-RU': () => 'Войти' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
