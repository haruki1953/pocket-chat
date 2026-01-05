<script setup lang="ts">
import type { ImagesResponseWithBaseExpand } from '@/api'
import {
  imageGetDprFn,
  imageLazyIntersectionRootMargin,
  imagePbImageDataChooseByTargetSizeScaleFactorConfig,
} from '@/config'
import { pbImageDataChooseByTargetSizeWithUrl } from '@/utils'
import { useElementSize, useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  imageItem: ImagesResponseWithBaseExpand
  // 用于设置背景色
  bgTwcss?: string
  lazy?: boolean
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
    targetWidth:
      divSize.width.value *
      dpr *
      imagePbImageDataChooseByTargetSizeScaleFactorConfig,
    targetHeight:
      divSize.height.value *
      dpr *
      imagePbImageDataChooseByTargetSizeScaleFactorConfig,
  }).url
})

// 是否显示图片
const isShowImg = ref(true)
// 是否启用懒加载
if (props.lazy === true) {
  isShowImg.value = false
  // 懒加载
  const { stop } = useIntersectionObserver(
    refDiv,
    ([entry]) => {
      if (entry.isIntersecting) {
        isShowImg.value = true
        stop()
      }
    },
    {
      root: null,
      // 边界偏移量
      rootMargin: imageLazyIntersectionRootMargin,
      threshold: 0,
    }
  )
}

const backgroundImageVal = computed(() => {
  if (isShowImg.value === false) {
    return undefined
  }
  return `url(${imageUrl.value})`
})
</script>

<template>
  <div
    ref="refDiv"
    class="h-full bg-cover bg-center"
    :class="bgTwcss"
    :style="{
      backgroundImage: backgroundImageVal,
    }"
  >
    <slot :imageItem="imageItem"></slot>
  </div>
</template>

<style lang="scss" scoped></style>
