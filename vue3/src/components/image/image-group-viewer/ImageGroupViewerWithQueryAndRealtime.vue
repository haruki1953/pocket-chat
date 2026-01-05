<script setup lang="ts">
import type { ImagesResponseWithBaseExpand } from '@/api'
import ImageGroupViewer from './ImageGroupViewer.vue'
import { useImagesGetOneQueriesForCache } from '@/queries'
import { useRealtimeImagesStore } from '@/stores'

const props = defineProps<{
  imageList: ImagesResponseWithBaseExpand[]
  // 用于设置背景色
  bgTwcss?: string
  lazy?: boolean
}>()

// 来自props的图片数据，以此为基础
const imageListFromProps = computed(() => props.imageList)

// 从query缓存中获取图片数据
const imagesGetOneQueriesForCache = useImagesGetOneQueriesForCache({
  imageIds: computed(() => imageListFromProps.value.map((i) => i.id)),
})

// 来自query的图片数据
const imageListFromQuery = computed<
  (ImagesResponseWithBaseExpand | undefined | null)[]
>(() => imagesGetOneQueriesForCache.value.map((i) => i.data))

const realtimeImagesStore = useRealtimeImagesStore()

// 来自realtime的图片数据
const imageListFromRealtime = computed<
  (ImagesResponseWithBaseExpand | undefined | null)[]
>(() =>
  imageListFromProps.value.map((i) =>
    realtimeImagesStore.updateListFindLatestById(i.id)
  )
)

// 最终使用的数据
const imageListWithQueryAndRealtime = computed<ImagesResponseWithBaseExpand[]>(
  () => {
    // 以 imageListFromProps 为基础
    // 在 imageListFromQuery imageListFromRealtime
    // 查询对应 id ，优先使用 updated 大的数据，比较字符串即可
    return imageListFromProps.value.map((base) => {
      const fromQuery = imageListFromQuery.value.find((q) => q?.id === base.id)
      const fromRealtime = imageListFromRealtime.value.find(
        (r) => r?.id === base.id
      )

      // 三者中可能有 undefined/null，所以先收集再过滤
      const candidates = [base, fromQuery, fromRealtime].filter(
        (i): i is ImagesResponseWithBaseExpand => i != null
      )

      // 根据 updated 字符串比较，取最大者
      candidates.sort((a, b) => (a.updated > b.updated ? -1 : 1))

      return candidates[0]
    })
  }
)
</script>

<template>
  <ImageGroupViewer
    v-slot="{ imageItem }"
    :imageList="imageListWithQueryAndRealtime"
    :bgTwcss="bgTwcss"
    :lazy="lazy"
  >
    <slot
      :imageItem="imageItem"
      :imageList="imageListWithQueryAndRealtime"
    ></slot>
  </ImageGroupViewer>
</template>

<style lang="scss" scoped></style>
