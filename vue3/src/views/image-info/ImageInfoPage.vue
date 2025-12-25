<script setup lang="ts">
import { useI18nStore } from '@/stores'
import { ImageInfoPageTopBar } from './components'
import { useRoute } from 'vue-router'
import { routerDict } from '@/config'

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
          <div class="h-[2000px] bg-red-950"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
