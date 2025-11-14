import type { I18nMessagesSatisfiesType } from '.'

/**
 * i18nMessages 标签相关部分
 */
export const i18nMessagesTagsPart = {
  tagMovie: {
    'en-US': () => 'Movie' as const,
    'zh-CN': () => '电影' as const,
    'zh-TW': () => '電影' as const,
    'ja-JP': () => '映画' as const,
    'ko-KR': () => '영화' as const,
    'ru-RU': () => 'Фильмы' as const,
  },
  tagGame: {
    'en-US': () => 'Game' as const,
    'zh-CN': () => '游戏' as const,
    'zh-TW': () => '遊戲' as const,
    'ja-JP': () => 'ゲーム' as const,
    'ko-KR': () => '게임' as const,
    'ru-RU': () => 'Игры' as const,
  },
  tagStudy: {
    'en-US': () => 'Study' as const,
    'zh-CN': () => '学习' as const,
    'zh-TW': () => '學習' as const,
    'ja-JP': () => '勉強' as const,
    'ko-KR': () => '공부' as const,
    'ru-RU': () => 'Учёба' as const,
  },
  tagMusic: {
    'en-US': () => 'Music' as const,
    'zh-CN': () => '音乐' as const,
    'zh-TW': () => '音樂' as const,
    'ja-JP': () => '音楽' as const,
    'ko-KR': () => '음악' as const,
    'ru-RU': () => 'Музыка' as const,
  },
  tagTravel: {
    'en-US': () => 'Travel' as const,
    'zh-CN': () => '旅行' as const,
    'zh-TW': () => '旅行' as const,
    'ja-JP': () => '旅行' as const,
    'ko-KR': () => '여행' as const,
    'ru-RU': () => 'Путешествия' as const,
  },
  tagAnime: {
    'en-US': () => 'Anime' as const,
    'zh-CN': () => '动漫' as const,
    'zh-TW': () => '動漫' as const,
    'ja-JP': () => 'アニメ' as const,
    'ko-KR': () => '애니메이션' as const,
    'ru-RU': () => 'Аниме' as const,
  },
  tagASMR: {
    'en-US': () => 'ASMR' as const,
    'zh-CN': () => '助眠' as const,
    'zh-TW': () => '助眠' as const,
    'ja-JP': () => 'ASMR' as const,
    'ko-KR': () => 'ASMR' as const,
    'ru-RU': () => 'ASMR' as const,
  },
  tagChat: {
    'en-US': () => 'Chat' as const,
    'zh-CN': () => '聊天' as const,
    'zh-TW': () => '聊天' as const,
    'ja-JP': () => 'チャット' as const,
    'ko-KR': () => '채팅' as const,
    'ru-RU': () => 'Чат' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
