<script setup lang="ts">
import {
  imageCalcMaxWidthByRatioUtil,
  pbImageDataChooseByLargest,
} from '@/utils'
import type { ImageInfoQueryDesuwaType } from './dependencies'
import {
  imageCalcMaxWidthByRatioSizeLimitHandlerConfig,
  imageCalcMaxWidthByRatioStepsOnImagePageConfig,
  imageCalcSingleRatioOptionsConfig,
} from '@/config'
import { IGVSoltAltLable, ImageGroupViewer } from '@/components'

const props = defineProps<{
  imageInfoQueryDesuwa: ImageInfoQueryDesuwaType
}>()

const {
  //
  imagesGetOneQuery,
  imageInfoQueryStatus,
} = props.imageInfoQueryDesuwa

const imageViewerMaxWidth = computed(() => {
  if (imagesGetOneQuery.data.value == null) {
    return undefined
  }
  const { width: imageWidth, height: imageHeight } = pbImageDataChooseByLargest(
    imagesGetOneQuery.data.value
  )

  const maxWidthNum = imageCalcMaxWidthByRatioUtil({
    imageWidth,
    imageHeight,
    imageCalcSingleRatioOptions: imageCalcSingleRatioOptionsConfig,
    steps: imageCalcMaxWidthByRatioStepsOnImagePageConfig,
    sizeLimitHandler: imageCalcMaxWidthByRatioSizeLimitHandlerConfig,
  })
  return `${maxWidthNum}px`
})
</script>

<template>
  <div>
    <div v-if="imagesGetOneQuery.data.value != null">
      <div
        class="mx-auto"
        :style="{
          maxWidth: imageViewerMaxWidth,
        }"
      >
        <div
          class="overflow-hidden rounded-[20px] border-[3px] border-transparent bg-color-background-soft"
        >
          <ImageGroupViewer
            v-slot="{ imageItem }"
            :imageList="[imagesGetOneQuery.data.value]"
            bgTwcss="bg-color-background-mute"
          >
            <div
              class="h-full cursor-pointer"
              @click="
                () => {
                  console.log('imageItem', imageItem)
                }
              "
            >
              <IGVSoltAltLable :imageItem="imageItem"></IGVSoltAltLable>
            </div>
          </ImageGroupViewer>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
