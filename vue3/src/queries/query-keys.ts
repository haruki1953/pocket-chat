import type { PMLRCApiParameters0DataPageParamNonNullable } from '@/api'
import type { Ref } from 'vue'

export const queryKeys = {
  profile: (id: string) => ['profile', id] as const,
  listAuthMethods: () => ['listAuthMethods'] as const,
  pbCollectionConfig: () => ['pbCollectionConfig'] as const,
  /** useChatRoomMessagesInfiniteQuery */
  chatRoomMessagesInfinite: (roomId: string | null) =>
    ['chatRoomMessagesInfinite', roomId] as const,
  /** useChatRoomMessagesInfiniteTwowayQuery */
  chatRoomMessagesInfiniteTwoway: (
    roomId: string | null,
    twowayPositioningCursorData: PMLRCApiParameters0DataPageParamNonNullable | null
  ) =>
    [
      'chatRoomMessagesInfiniteTwoway',
      roomId,
      twowayPositioningCursorData,
    ] as const,

  /** useChatRoomMessagesGetOneQuery */
  chatRoomMessagesGetOne: (messageId?: string | null) =>
    ['chatRoomMessagesGetOne', messageId] as const,

  /** useImagePageListQuery */
  imagePageList: (
    pageNum: number | null,
    authorId: string | null,
    searchContent: string | null
  ) => ['imagePageList', pageNum, authorId, searchContent] as const,

  /**  */
  rooms: (...args: string[]) => ['rooms', ...args] as const,
  /** useRoomsGetOneQuery */
  roomsGetOne: (roomId: string | null) => ['roomsGetOne', roomId],
  /**
   * @description rooms-list-infinite
   * 搜索词
   * - @param {Ref<string>} options.searchTerm
   * 只看用户自己
   * - @param {Ref<boolean>} options.onlyUserRooms
   */
  roomsListInfinite: (options: {
    searchTerm: Ref<string>
    onlyUserRooms: Ref<boolean>
    onlyJoinRooms: Ref<boolean>
    userId: string | null | undefined
  }) => ['rooms', 'list', 'infinite', options] as const,
}
