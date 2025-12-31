import type { ImagesResponseWithBaseExpand } from '@/api'
import type { ImageSelectPagePageRecoverDataDesuwaType } from './page-recover'
import { useQueryClient } from '@tanstack/vue-query'
import type { useImagesGetOneQuery } from '@/queries'
import { queryKeys } from '@/queries'

export const useImageSelectListDesuwa = (data: {
  imageSelectPagePageRecoverDataDesuwa: ImageSelectPagePageRecoverDataDesuwaType
}) => {
  const { imageSelectPagePageRecoverDataDesuwa } = data

  const {
    // 页面恢复数据
    imageSelectPagePageRecoverData,
  } = imageSelectPagePageRecoverDataDesuwa

  // 图片选择列表
  const imageSelectList = ref<ImagesResponseWithBaseExpand[]>([])
  // 图片选择列表
  // 【根据页面恢复数据初始化】
  if (imageSelectPagePageRecoverData != null) {
    imageSelectList.value = imageSelectPagePageRecoverData.data.imageSelectList
  }

  // setup时，需检查图片是否已被删除，因为可能是刚从图片详情页删除并返回
  usePruneDeletedImages({
    imageSelectList,
  })

  /**
   * 添加图片（带最大数量限制 4）：
   * - 若已存在同 id，则更新该项
   * - 若不存在：
   *    - 若数量 < 4：直接追加
   *    - 若数量 >= 4：移除第一个再追加
   */
  const imageSelectListAdd = (val: ImagesResponseWithBaseExpand) => {
    const index = imageSelectList.value.findIndex((item) => item.id === val.id)

    if (index !== -1) {
      // 更新已有项
      imageSelectList.value[index] = val
      return
    }

    // 若数量已达上限 4，则移除最早的一个
    if (imageSelectList.value.length >= 4) {
      imageSelectList.value.shift()
    }

    // 新增
    imageSelectList.value.push(val)
  }

  /**
   * 删除图片：
   * - 根据 id 过滤掉对应项
   */
  const imageSelectListDel = (val: { id: string }) => {
    imageSelectList.value = imageSelectList.value.filter(
      (item) => item.id !== val.id
    )
  }

  /**
   * 清空图片列表
   */
  const imageSelectListClear = () => {
    imageSelectList.value = []
  }

  /**
   * 根据 id 查找图片：
   * - 找到则返回该项
   * - 找不到则返回 undefined
   */
  const imageSelectListFindById = (id: string) => {
    return imageSelectList.value.find((item) => item.id === id)
  }

  /**
   * 切换图片：
   * - 若存在同 id，则删除
   * - 若不存在，则添加
   */
  const imageSelectListSwitch = (val: ImagesResponseWithBaseExpand) => {
    const find = imageSelectListFindById(val.id)

    if (find != null) {
      imageSelectListDel(val)
    } else {
      imageSelectListAdd(val)
    }
  }

  return {
    imageSelectList,
    imageSelectListAdd,
    imageSelectListDel,
    imageSelectListClear,
    imageSelectListFindById,
    imageSelectListSwitch,
  }
}

export type ImageSelectListDesuwaType = ReturnType<
  typeof useImageSelectListDesuwa
>

/**
 * setup时，需检查图片是否已被删除，因为可能是刚从图片详情页删除并返回
 * - 若列表为空则不处理
 * - 若列表有内容，则根据 vue-query 缓存判断哪些图片已被删除
 * - 删除缓存中标记 isDeleted === true 的图片
 *
 * 不导出，其只在 useImageSelectListDesuwa 中使用
 */
const usePruneDeletedImages = (data: {
  imageSelectList: Ref<ImagesResponseWithBaseExpand[]>
}) => {
  const { imageSelectList } = data
  const queryClient = useQueryClient()

  // 若列表为空则无需处理
  if (imageSelectList.value.length > 0) {
    try {
      // 将已删除的图片去除
      imageSelectList.value = imageSelectList.value.filter((i) => {
        // 尝试获取querydata
        const imageGetQueryData = queryClient.getQueryData(
          queryKeys.imagesGetOne(i.id)
        ) as
          | ReturnType<typeof useImagesGetOneQuery>['data']['value']
          | undefined

        // 如果图片query缓存中有数据，且isDeleted是true，则为已删除，返回false
        if (imageGetQueryData != null && imageGetQueryData.isDeleted === true) {
          return false
        }

        return true
      })
    } catch (error) {
      console.warn(
        'src/views/image/composables/select-list.ts',
        'usePruneDeletedImages',
        error
      )
    }
  }
}
