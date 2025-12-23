<script setup lang="ts">
import type { ImagesResponseWithExpand } from '@/api'
import { imageGetDprFn } from '@/config'
import { pbImageDataChooseByTargetSizeWithUrl } from '@/utils'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  imageItem: ImagesResponseWithExpand
  // 用于设置背景色
  bgTwcss?: string
}>()

const refDiv = ref<HTMLElement | null>(null)
const divSize = useElementSize(refDiv)

// 获取 dpr ，几倍屏
const dpr = imageGetDprFn()

const imageUrl = computed(() => {
  if (divSize.width.value === 0 || divSize.height.value === 0) {
    return undefined
  }
  return pbImageDataChooseByTargetSizeWithUrl(props.imageItem, {
    targetWidth: divSize.width.value * dpr,
    targetHeight: divSize.height.value * dpr,
  }).url
})
</script>

<template>
  <div
    ref="refDiv"
    class="h-full bg-cover bg-center"
    :class="bgTwcss"
    :style="{
      backgroundImage: `url(${imageUrl})`,
    }"
  ></div>
</template>

<style lang="scss" scoped></style>
