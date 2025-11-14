import type { I18nMessagesSatisfiesType } from '.'

/**
 * i18nMessages 主页相关部分
 */
export const i18nMessagesHomePart = {
  homeMenuAllRooms: {
    'en-US': () => 'All Rooms' as const,
    'zh-CN': () => '全部房间' as const,
    'zh-TW': () => '全部房間' as const,
    'ja-JP': () => 'すべてのルーム' as const,
    'ko-KR': () => '전체 방' as const,
    'ru-RU': () => 'Все комнаты' as const,
  },
  homeMenuMyRooms: {
    'en-US': () => 'My Rooms' as const,
    'zh-CN': () => '我的房间' as const,
    'zh-TW': () => '我的房間' as const,
    'ja-JP': () => '自分のルーム' as const,
    'ko-KR': () => '내 방' as const,
    'ru-RU': () => 'Мои комнаты' as const,
  },
  homeMenuSearchRooms: {
    'en-US': () => 'Search Rooms' as const,
    'zh-CN': () => '搜索房间' as const,
    'zh-TW': () => '搜尋房間' as const,
    'ja-JP': () => 'ルーム検索' as const,
    'ko-KR': () => '방 검색' as const,
    'ru-RU': () => 'Поиск комнат' as const,
  },
  homeMenuFavoriteRooms: {
    'en-US': () => 'Joined Rooms' as const,
    'zh-CN': () => '进驻房间' as const,
    'zh-TW': () => '進駐房間' as const,
    'ja-JP': () => '参加中のルーム' as const,
    'ko-KR': () => '참여한 방' as const,
    'ru-RU': () => 'Присоединённые комнаты' as const,
  },
  homeMenuCreateRoom: {
    'en-US': () => 'Create New Room' as const,
    'zh-CN': () => '创建新房间' as const,
    'zh-TW': () => '創建新房間' as const,
    'ja-JP': () => '新しいルームを作成' as const,
    'ko-KR': () => '새 방 만들기' as const,
    'ru-RU': () => 'Создать комнату' as const,
  },
  homeCardPeopleOnline: {
    'en-US': (count: number) => `${count} people online` as const,
    'zh-CN': (count: number) => `${count} 人在线` as const,
    'zh-TW': (count: number) => `${count} 人在線` as const,
    'ja-JP': (count: number) => `オンライン: ${count}人` as const,
    'ko-KR': (count: number) => `온라인 ${count}명` as const,
    'ru-RU': (count: number) => `Онлайн: ${count}` as const,
  },

  // CreateRoomPage
  createRoomTitle: {
    'en-US': () => 'Create Room' as const,
    'zh-CN': () => '创建房间' as const,
    'zh-TW': () => '創建房間' as const,
    'ja-JP': () => 'ルームを作成' as const,
    'ko-KR': () => '방 만들기' as const,
    'ru-RU': () => 'Создание комнаты' as const,
  },
  createRoomEditInfo: {
    'en-US': () => 'Edit Information' as const,
    'zh-CN': () => '信息编辑' as const,
    'zh-TW': () => '資訊編輯' as const,
    'ja-JP': () => '情報編集' as const,
    'ko-KR': () => '정보 편집' as const,
    'ru-RU': () => 'Редактирование информации' as const,
  },
  createRoomEditInfoDesc: {
    'en-US': () => 'This is how your room will be seen by others' as const,
    'zh-CN': () => '这是您的房间被其他人看到的样子' as const,
    'zh-TW': () => '這是您的房間被其他人看到的樣子' as const,
    'ja-JP': () => '他のユーザーからはこのように見えます' as const,
    'ko-KR': () => '다른 사람들이 방을 이렇게 보게 됩니다' as const,
    'ru-RU': () => 'Так вашу комнату увидят другие пользователи' as const,
  },
  createRoomUploadCover: {
    'en-US': () => 'Please upload a cover image' as const,
    'zh-CN': () => '请上传封面图片' as const,
    'zh-TW': () => '請上傳封面圖片' as const,
    'ja-JP': () => 'カバー画像をアップロードしてください' as const,
    'ko-KR': () => '커버 이미지를 업로드하세요' as const,
    'ru-RU': () => 'Пожалуйста, загрузите обложку' as const,
  },
  createRoomUploadCoverDesc: {
    'en-US': () => 'Supports JPG, PNG, WEBP.' as const,
    'zh-CN': () => '支持 JPG, PNG, WEBP 等多种格式' as const,
    'zh-TW': () => '支援 JPG, PNG, WEBP 等多種格式' as const,
    'ja-JP': () => 'JPG、PNG、WEBP に対応しています。' as const,
    'ko-KR': () => 'JPG, PNG, WEBP 형식을 지원합니다.' as const,
    'ru-RU': () => 'Поддерживаются форматы JPG, PNG, WEBP.' as const,
  },
  createRoomPlaceholderTitle: {
    'en-US': () => 'Click here to enter a title' as const,
    'zh-CN': () => '单击此处输入标题' as const,
    'zh-TW': () => '點擊此處輸入標題' as const,
    'ja-JP': () => 'タイトルを入力してください' as const,
    'ko-KR': () => '제목을 입력하세요' as const,
    'ru-RU': () => 'Введите заголовок' as const,
  },
  createRoomPlaceholderDesc: {
    'en-US': () => 'Click here to enter a description' as const,
    'zh-CN': () => '单击此处输入简介' as const,
    'zh-TW': () => '點擊此處輸入簡介' as const,
    'ja-JP': () => '説明を入力してください' as const,
    'ko-KR': () => '설명을 입력하세요' as const,
    'ru-RU': () => 'Введите описание' as const,
  },
  createRoomPlaceholderTags: {
    'en-US': () =>
      'Click to enter text and press Enter to create a tag' as const,
    'zh-CN': () => '单击输入文本后按 Enter 创建标签' as const,
    'zh-TW': () => '點擊輸入文本後按 Enter 創建標籤' as const,
    'ja-JP': () => '入力後、Enterキーでタグを作成できます' as const,
    'ko-KR': () => '텍스트 입력 후 Enter 키를 눌러 태그를 추가하세요' as const,
    'ru-RU': () => 'Введите текст и нажмите Enter, чтобы создать тег' as const,
  },
  createRoomPreview: {
    'en-US': () => 'Preview' as const,
    'zh-CN': () => '预览' as const,
    'zh-TW': () => '預覽' as const,
    'ja-JP': () => 'プレビュー' as const,
    'ko-KR': () => '미리보기' as const,
    'ru-RU': () => 'Предпросмотр' as const,
  },
  createRoomRoomSettings: {
    'en-US': () => 'Room Settings' as const,
    'zh-CN': () => '房间设置' as const,
    'zh-TW': () => '房間設定' as const,
    'ja-JP': () => 'ルーム設定' as const,
    'ko-KR': () => '방 설정' as const,
    'ru-RU': () => 'Настройки комнаты' as const,
  },
  createRoomLimitUsers: {
    'en-US': () => 'User Limit' as const,
    'zh-CN': () => '人数限制' as const,
    'zh-TW': () => '人數限制' as const,
    'ja-JP': () => '人数制限' as const,
    'ko-KR': () => '인원 제한' as const,
    'ru-RU': () => 'Лимит пользователей' as const,
  },
  createRoomUserLimitStatus: {
    'en-US': (limit: number | string) => `Unlimited | ${limit} people` as const,
    'zh-CN': (limit: number | string) => `不限制 | ${limit} 人` as const,
    'zh-TW': (limit: number | string) => `無限制 | ${limit} 人` as const,
    'ja-JP': (limit: number | string) => `無制限 | ${limit}人` as const,
    'ko-KR': (limit: number | string) => `제한 없음 | ${limit}명` as const,
    'ru-RU': (limit: number | string) =>
      `Без ограничений | ${limit} человек` as const,
  },
  createRoomLimitPassword: {
    'en-US': () => 'Password' as const,
    'zh-CN': () => '密码限制' as const,
    'zh-TW': () => '密碼限制' as const,
    'ja-JP': () => 'パスワード' as const,
    'ko-KR': () => '비밀번호' as const,
    'ru-RU': () => 'Пароль' as const,
  },
  createRoomPasswordStatus: {
    'en-US': (status: string) => `Password: ${status}` as const,
    'zh-CN': (status: string) => `密码: ${status}` as const,
    'zh-TW': (status: string) => `密碼: ${status}` as const,
    'ja-JP': (status: string) => `パスワード: ${status}` as const,
    'ko-KR': (status: string) => `비밀번호: ${status}` as const,
    'ru-RU': (status: string) => `Пароль: ${status}` as const,
  },
  passwordStatusSet: {
    'en-US': () => 'Set' as const,
    'zh-CN': () => '已设置' as const,
    'zh-TW': () => '已設定' as const,
    'ja-JP': () => '設定済み' as const,
    'ko-KR': () => '설정됨' as const,
    'ru-RU': () => 'Установлено' as const,
  },
  createRoomSubmitButton: {
    'en-US': () => 'Create Room >' as const,
    'zh-CN': () => '创建房间 >' as const,
    'zh-TW': () => '創建房間 >' as const,
    'ja-JP': () => 'ルーム作成 >' as const,
    'ko-KR': () => '방 만들기 >' as const,
    'ru-RU': () => 'Создать комнату >' as const,
  },

  // CreateRoomOK
  createRoomOKTitle: {
    'en-US': () => 'Creation successful, nya!' as const,
    'zh-CN': () => '创建成功喵！' as const,
    'zh-TW': () => '創建成功喵！' as const,
    'ja-JP': () => '作成成功にゃ！' as const,
    'ko-KR': () => '방 생성 성공 냥!' as const,
    'ru-RU': () => 'Комната успешно создана, ня!' as const,
  },
  createRoomOKGoToHome: {
    'en-US': () => 'Back to Home' as const,
    'zh-CN': () => '返回首页' as const,
    'zh-TW': () => '返回首頁' as const,
    'ja-JP': () => 'ホームへ戻る' as const,
    'ko-KR': () => '홈으로 돌아가기' as const,
    'ru-RU': () => 'Вернуться на главную' as const,
  },
  createRoomOKGoToRoom: {
    'en-US': () => 'Enter Room' as const,
    'zh-CN': () => '进入房间' as const,
    'zh-TW': () => '進入房間' as const,
    'ja-JP': () => 'ルームに入る' as const,
    'ko-KR': () => '방 입장' as const,
    'ru-RU': () => 'Войти в комнату' as const,
  },

  // CreateRoomPage Errors
  createRoomError_fileTooLarge: {
    'en-US': () =>
      'Image size cannot exceed 5MB, nya! Please select a smaller image, nya!' as const,
    'zh-CN': () => '图片大小不能超过 5MB 喵，请选择更小的图片喵' as const,
    'zh-TW': () => '圖片大小不能超過 5MB 喵，請選擇更小的圖片喵' as const,
    'ja-JP': () =>
      '画像サイズは5MBを超えられないにゃ！もっと小さい画像を選んでにゃ！' as const,
    'ko-KR': () =>
      '이미지 크기는 5MB를 초과할 수 없다냥! 더 작은 이미지를 선택해 달라냥!' as const,
    'ru-RU': () =>
      'Размер изображения не должен превышать 5MB, ня! Выберите картинку поменьше, ня!' as const,
  },
  createRoomError_notLoggedIn: {
    'en-US': () => 'Please log in first, nya!' as const,
    'zh-CN': () => '请先登陆喵' as const,
    'zh-TW': () => '請先登陸喵' as const,
    'ja-JP': () => 'まずログインしてにゃ！' as const,
    'ko-KR': () => '먼저 로그인해 달라냥!' as const,
    'ru-RU': () => 'Сначала войдите в систему, ня!' as const,
  },
  createRoomError_noCover: {
    'en-US': () => 'Please upload a cover image, nya!' as const,
    'zh-CN': () => '请上传封面喵' as const,
    'zh-TW': () => '請上傳封面喵' as const,
    'ja-JP': () => 'カバー画像をアップロードしてにゃ！' as const,
    'ko-KR': () => '커버 이미지를 업로드해 달라냥!' as const,
    'ru-RU': () => 'Пожалуйста, загрузите обложку, ня!' as const,
  },
  createRoomError_noTitle: {
    'en-US': () => 'Please enter a title, nya!' as const,
    'zh-CN': () => '请输入标题喵' as const,
    'zh-TW': () => '請輸入標題喵' as const,
    'ja-JP': () => 'タイトルを入力してにゃ！' as const,
    'ko-KR': () => '제목을 입력해 달라냥!' as const,
    'ru-RU': () => 'Пожалуйста, введите название, ня!' as const,
  },
  createRoomError_creationFailed: {
    'en-US': () =>
      'Failed to create room, nya! Please try again later, nya!' as const,
    'zh-CN': () => '创建房间失败喵，请稍后再试喵' as const,
    'zh-TW': () => '創建房間失敗喵，請稍後再試喵' as const,
    'ja-JP': () =>
      'ルーム作成に失敗したにゃ！後でもう一度試してにゃ！' as const,
    'ko-KR': () =>
      '방 만들기에 실패했다냥! 잠시 후 다시 시도해 달라냥!' as const,
    'ru-RU': () =>
      'Не удалось создать комнату, ня! Попробуйте позже, ня!' as const,
  },
} as const satisfies I18nMessagesSatisfiesType
