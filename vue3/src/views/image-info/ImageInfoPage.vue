<script setup lang="ts">
import { useI18nStore } from '@/stores'
import { ImageInfoImageViewer, ImageInfoPageTopBar } from './components'
import { useRoute } from 'vue-router'
import { routerDict } from '@/config'
import { useImageInfoQueryDesuwa } from './composables'

export type ImageInfoRouteParamsType = typeof imageInfoRouteParams

const i18nStore = useI18nStore()

const route = useRoute()
const imageInfoRouteParams = computed(() => {
  const paramRawId = route.params[routerDict.ImageInfoPage.paramsKey.id]
  const id = (() => {
    if (typeof paramRawId === 'string') {
      return paramRawId
    }
    return null
  })()
  return {
    id: id,
  }
})

const imageInfoQueryDesuwa = useImageInfoQueryDesuwa({
  imageInfoRouteParams,
})
const {
  // 当前查询状态 "content" | "loading" | "none"
  imageInfoQueryStatus,
} = imageInfoQueryDesuwa
</script>

<template>
  <div>
    <!-- 边距控制 -->
    <div class="mx-[8px]">
      <div
        class="mx-auto"
        :style="{
          maxWidth: '500px',
        }"
      >
        <div class="relative mb-4">
          <!-- 顶栏 -->
          <div class="sticky top-0 z-[1] flow-root">
            <!-- 图片详情页顶栏 -->
            <ImageInfoPageTopBar
              :pageTitle="i18nStore.t('pageImageInfo')()"
            ></ImageInfoPageTopBar>
          </div>
          <!-- 内容 -->
          <div v-if="imageInfoQueryStatus === 'content'">
            <!-- 图片显示组件 -->
            <div class="mt-4">
              <ImageInfoImageViewer
                :imageInfoQueryDesuwa="imageInfoQueryDesuwa"
              ></ImageInfoImageViewer>
            </div>
            <!-- 图片详情显示、操作面板 -->
            <!-- 使用此图片的消息 -->
          </div>
          <!-- 加载状态 -->
          <div v-else-if="imageInfoQueryStatus === 'loading'">
            <div class="flex h-[400px] items-center justify-center">
              <div
                class="h-[50px] w-[50px] overflow-hidden text-color-text-soft"
              >
                <RiLoader3Line
                  class="loading-spinner-800ms"
                  size="50px"
                ></RiLoader3Line>
              </div>
            </div>
          </div>
          <!-- 图片不存在 -->
          <!-- <div v-else-if="imageInfoQueryStatus === 'none'"> -->
          <div v-else>
            <div class="flex h-[400px] items-center justify-center">
              <div
                class="h-[100px] w-[100px] overflow-hidden text-color-background-soft"
              >
                <!-- class="h-full max-h-[50%] w-full max-w-[50%] object-contain" -->
                <RiMessage3Fill size="100px"></RiMessage3Fill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
