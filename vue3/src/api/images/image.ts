import { Collections, pb, type Update } from '@/lib'
import { imagesBaseExpand, type ImagesResponseWithBaseExpand } from './base'
import { fetchWithTimeoutPreferred } from '@/utils'
import type { RecordSubscription } from 'pocketbase'

/** images 集合 getone */
export const pbImagesGetOneApi = async (imageId: string) => {
  const pbRes = await pb
    .collection(Collections.Images)
    .getOne<ImagesResponseWithBaseExpand>(imageId, {
      expand: imagesBaseExpand,
      // timeout为5000
      fetch: fetchWithTimeoutPreferred,
    })

  return pbRes
}

/** images 集合 update */
export const pbImageUpdateApi = async (
  imageId: string,
  data: {
    alt?: string
    keyword?: string
    isDeleted?: boolean
  }
) => {
  // 未登录，抛出错误
  if (!pb.authStore.isValid || pb.authStore.record?.id == null) {
    throw new Error('!pb.authStore.isValid || pb.authStore.record?.id == null')
  }

  // 准备数据
  const updateData: Update<Collections.Images> = {
    alt: data.alt,
    keyword: data.keyword,
    isDeleted: data.isDeleted,
  }

  const pbRes = await pb
    .collection(Collections.Images)
    .update<ImagesResponseWithBaseExpand>(imageId, updateData, {
      expand: imagesBaseExpand,
      // timeout为5000
      fetch: fetchWithTimeoutPreferred,
    })

  return pbRes
}

/** images 集合 update alt */
export const pbImageUpdateAltApi = (
  imageId: string,
  data: {
    alt: string
  }
) => {
  return pbImageUpdateApi(imageId, data)
}

/** images 集合 update keyword */
export const pbImageUpdateKeywordApi = (
  imageId: string,
  data: {
    keyword: string
  }
) => {
  return pbImageUpdateApi(imageId, data)
}

/** images 集合 update isDeleted */
export const pbImageUpdateIsDeletedApi = (
  imageId: string,
  data: {
    isDeleted: boolean
  }
) => {
  return pbImageUpdateApi(imageId, data)
}

/** images 集合 实时订阅 */
export const pbImagesSubscribeAllApi = async (
  callback: (data: RecordSubscription<ImagesResponseWithBaseExpand>) => void
) => {
  // expand 字符串
  const expand = imagesBaseExpand

  return pb
    .collection(Collections.Images)
    .subscribe<ImagesResponseWithBaseExpand>(
      '*',
      (e) => {
        callback(e)
      },
      {
        expand,
        // timeout为5000
        fetch: fetchWithTimeoutPreferred,
      }
    )
}
