import type { I18nMessagesSatisfiesType } from '.'
/**
 * i18nMessages 图片相关部分
 */
export const i18nMessagesImagePart = {
  // 上传图片组件（点击后即可上传图片）显示的文字
  imagePageImageUploadText: {
    'en-US': () => 'Upload Image' as const,
    'zh-CN': () => '上传图片' as const,
    'zh-TW': () => '上傳圖片' as const,
    'ja-JP': () => '画像をアップロード' as const,
    'ko-KR': () => '이미지 업로드' as const,
    'ru-RU': () => 'Загрузить изображение' as const,
  },
  imagePageAllImageText: {
    'en-US': () => 'All Images' as const,
    'zh-CN': () => '全部图片' as const,
    'zh-TW': () => '全部圖片' as const,
    'ja-JP': () => 'すべての画像' as const,
    'ko-KR': () => '모든 이미지' as const,
    'ru-RU': () => 'Все изображения' as const,
  },
  imagePageMyImageText: {
    'en-US': () => 'My Images' as const,
    'zh-CN': () => '我的图片' as const,
    'zh-TW': () => '我的圖片' as const,
    'ja-JP': () => '自分の画像' as const,
    'ko-KR': () => '내 이미지' as const,
    'ru-RU': () => 'Мои изображения' as const,
  },
  imagePageSearchPlaceholderText: {
    'en-US': () => 'Search ALT, keywords, username' as const,
    'zh-CN': () => '搜索ALT、关键词、用户名' as const,
    'zh-TW': () => '搜尋ALT、關鍵詞、用戶名' as const,
    'ja-JP': () => 'ALT、キーワード、ユーザー名を検索' as const,
    'ko-KR': () => 'ALT, 키워드, 사용자명 검색' as const,
    'ru-RU': () => 'Поиск ALT, ключевых слов, имени пользователя' as const,
  },
  // 图片上传列表标题
  imagePageImageUploadListTitle: {
    'en-US': () => 'Upload Image' as const,
    'zh-CN': () => '上传图片' as const,
    'zh-TW': () => '上傳圖片' as const,
    'ja-JP': () => '画像をアップロード' as const,
    'ko-KR': () => '이미지 업로드' as const,
    'ru-RU': () => 'Загрузить изображение' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
