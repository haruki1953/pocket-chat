import type { I18nMessagesSatisfiesType } from '.'

/**
 * i18nMessages 登录相关部分
 */
export const i18nMessagesLoginPart = {
  // 登录相关
  loginPlaceholderUsernameOrEmail: {
    'en-US': () => 'Please enter username or email' as const,
    'zh-CN': () => '请输入用户名或邮箱' as const,
    'zh-TW': () => '請輸入用戶名或信箱' as const,
    'ja-JP': () => 'ユーザー名またはメールアドレスを入力してください' as const,
    'ko-KR': () => '사용자명 또는 이메일을 입력하세요' as const,
    'ru-RU': () => 'Введите имя пользователя или email' as const,
  },
  loginPlaceholderPassword: {
    'en-US': () => 'Please enter password' as const,
    'zh-CN': () => '请输入密码' as const,
    'zh-TW': () => '請輸入密碼' as const,
    'ja-JP': () => 'パスワードを入力してください' as const,
    'ko-KR': () => '비밀번호를 입력하세요' as const,
    'ru-RU': () => 'Введите пароль' as const,
  },
  loginButtonText: {
    'en-US': () => 'Sign in' as const,
    'zh-CN': () => '登 录' as const,
    'zh-TW': () => '登 入' as const,
    'ja-JP': () => 'ログイン' as const,
    'ko-KR': () => '로그인' as const,
    'ru-RU': () => 'Войти' as const,
  },
  loginForgetText: {
    'en-US': () => 'Forgot password' as const,
    'zh-CN': () => '忘记密码' as const,
    'zh-TW': () => '忘記密碼' as const,
    'ja-JP': () => 'パスワードをお忘れですか' as const,
    'ko-KR': () => '비밀번호 찾기' as const,
    'ru-RU': () => 'Забыли пароль?' as const,
  },
  loginVisitorText: {
    'en-US': () => 'Visitor Mode' as const,
    'zh-CN': () => '游客模式' as const,
    'zh-TW': () => '遊客模式' as const,
    'ja-JP': () => 'ビジターモード' as const,
    'ko-KR': () => '방문자 모드' as const,
    'ru-RU': () => 'Гостевой режим' as const,
  },
  loginRulesUsernameOrEmailRequiredMessage: {
    'en-US': () => 'Please enter username or email' as const,
    'zh-CN': () => '请输入用户名或邮箱' as const,
    'zh-TW': () => '請輸入用戶名或信箱' as const,
    'ja-JP': () => 'ユーザー名またはメールアドレスを入力してください' as const,
    'ko-KR': () => '사용자명 또는 이메일을 입력하세요' as const,
    'ru-RU': () => 'Введите имя пользователя или email' as const,
  },
  loginRulesPasswordRequiredMessage: {
    'en-US': () => 'Please enter password' as const,
    'zh-CN': () => '请输入密码' as const,
    'zh-TW': () => '請輸入密碼' as const,
    'ja-JP': () => 'パスワードを入力してください' as const,
    'ko-KR': () => '비밀번호를 입력하세요' as const,
    'ru-RU': () => 'Введите пароль' as const,
  },
  loginRulesPasswordPatternMessage: {
    'en-US': () => 'Password must be at least 8 characters' as const,
    'zh-CN': () => '密码必须至少包含 8 个字符' as const,
    'zh-TW': () => '密碼必須至少包含 8 個字符' as const,
    'ja-JP': () => 'パスワードは8文字以上である必要があります' as const,
    'ko-KR': () => '비밀번호는 최소 8자 이상이어야 합니다' as const,
    'ru-RU': () => 'Пароль должен содержать не менее 8 символов' as const,
  },
  loginWithOauth2Text: {
    'en-US': (platform: string) => `Continue with ${platform}` as const,
    'zh-CN': (platform: string) => `使用 ${platform} 继续` as const,
    'zh-TW': (platform: string) => `使用 ${platform} 繼續` as const,
    'ja-JP': (platform: string) => `${platform} で続行` as const,
    'ko-KR': (platform: string) => `${platform}으로 계속하기` as const,
    'ru-RU': (platform: string) => `Продолжить через ${platform}` as const,
  },
  loginSuccess: {
    'en-US': () => 'Sign-in complete' as const,
    'zh-CN': () => '登录成功' as const,
    'zh-TW': () => '登入成功' as const,
    'ja-JP': () => 'ログイン成功' as const,
    'ko-KR': () => '로그인 성공' as const,
    'ru-RU': () => 'Вход выполнен успешно' as const,
  },
  loginFailed: {
    'en-US': () => 'Sign-in failed' as const,
    'zh-CN': () => '登录失败' as const,
    'zh-TW': () => '登入失敗' as const,
    'ja-JP': () => 'ログイン失敗' as const,
    'ko-KR': () => '로그인 실패' as const,
    'ru-RU': () => 'Ошибка входа' as const,
  },
  loginFailedErrorUnknow: {
    'en-US': () => 'Sign-in failed' as const,
    'zh-CN': () => '登录失败' as const,
    'zh-TW': () => '登入失敗' as const,
    'ja-JP': () => 'ログイン失敗' as const,
    'ko-KR': () => '로그인 실패' as const,
    'ru-RU': () => 'Ошибка входа' as const,
  },

  // 忘记密码
  loginForgotPasswordContentTitle: {
    'en-US': () => 'Forgot password' as const,
    'zh-CN': () => '忘记密码' as const,
    'zh-TW': () => '忘記密碼' as const,
    'ja-JP': () => 'パスワードをお忘れですか' as const,
    'ko-KR': () => '비밀번호 찾기' as const,
    'ru-RU': () => 'Восстановление пароля' as const,
  },
  loginForgotPasswordRulesEmailRequiredMessage: {
    'en-US': () => 'Please enter email' as const,
    'zh-CN': () => '请输入邮箱' as const,
    'zh-TW': () => '請輸入信​​箱' as const,
    'ja-JP': () => 'メールアドレスを入力してください' as const,
    'ko-KR': () => '이메일을 입력하세요' as const,
    'ru-RU': () => 'Введите email' as const,
  },
  loginForgotPasswordRulesEmailTypeMessage: {
    'en-US': () => 'Incorrect email format' as const,
    'zh-CN': () => '邮箱格式不正确' as const,
    'zh-TW': () => '信​​箱格式不正確' as const,
    'ja-JP': () => 'メールアドレスの形式が正しくありません' as const,
    'ko-KR': () => '이메일 형식이 올바르지 않습니다' as const,
    'ru-RU': () => 'Неверный формат email' as const,
  },
  loginForgotPasswordConfirmContainerTitle: {
    'en-US': (email: string) =>
      `A password reset link will be sent to ${email}` as const,
    'zh-CN': (email: string) => `密码重置链接将发送至 ${email}` as const,
    'zh-TW': (email: string) => `密碼重置連結將發送至 ${email}` as const,
    'ja-JP': (email: string) =>
      `パスワードリセットリンクが ${email} に送信されます` as const,
    'ko-KR': (email: string) =>
      `${email} 으로 비밀번호 재설정 링크가 전송됩니다` as const,
    'ru-RU': (email: string) =>
      `Ссылка для сброса пароля будет отправлена на ${email}` as const,
  },
  loginForgotPasswordEmailLable: {
    'en-US': () => 'Email' as const,
    'zh-CN': () => '邮箱' as const,
    'zh-TW': () => '信箱' as const,
    'ja-JP': () => 'メールアドレス' as const,
    'ko-KR': () => '이메일' as const,
    'ru-RU': () => 'Email' as const,
  },
  loginForgotPasswordPlaceholderEmail: {
    'en-US': () => 'Please enter email' as const,
    'zh-CN': () => '请输入邮箱' as const,
    'zh-TW': () => '請輸入信箱' as const,
    'ja-JP': () => 'メールアドレスを入力してください' as const,
    'ko-KR': () => '이메일을 입력하세요' as const,
    'ru-RU': () => 'Введите email' as const,
  },
  loginForgotPasswordButtonSubmitText: {
    'en-US': () => 'Reset Password' as const,
    'zh-CN': () => '重置密码' as const,
    'zh-TW': () => '重設密碼' as const,
    'ja-JP': () => 'パスワードをリセット' as const,
    'ko-KR': () => '비밀번호 재설정' as const,
    'ru-RU': () => 'Сбросить пароль' as const,
  },
  loginForgotPasswordRetryAfterDuration: {
    'en-US': (duration: string) => `Retry after ${duration}` as const,
    'zh-CN': (duration: string) => `${duration}后可重试` as const,
    'zh-TW': (duration: string) => `${duration}後可重試` as const,
    'ja-JP': (duration: string) => `${duration} 後に再試行できます` as const,
    'ko-KR': (duration: string) =>
      `${duration} 후에 다시 시도할 수 있습니다` as const,
    'ru-RU': (duration: string) => `Повторите через ${duration}` as const,
  },
} as const satisfies I18nMessagesSatisfiesType
