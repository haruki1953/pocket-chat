<script setup lang="ts">
import { pb } from '@/lib'
import type { ImageSelectListDesuwaType } from './dependencies'

const props = defineProps<{
  imageSelectListDesuwa: ImageSelectListDesuwaType
}>()

const {
  //
  imageSelectList,
  imageSelectListClear,
} = props.imageSelectListDesuwa
</script>

<template>
  <div class="image-page-bottom-bar relative flow-root">
    <div
      class="image-page-bottom-box relative z-[3] flow-root bg-color-background-soft pb-1"
    >
      <div class="my-2 flex items-center justify-between">
        <!-- 左按钮 取消 -->
        <div class="mx-2">
          <ElButton
            circle
            type="info"
            :disabled="imageSelectList.length <= 0"
            @click="imageSelectListClear"
          >
            <template #icon>
              <RiCloseFill></RiCloseFill>
            </template>
          </ElButton>
        </div>
        <div class="flex-1 truncate">
          <!-- 图片选择 -->
          <div v-if="imageSelectList.length > 0">
            <div class="flex items-center justify-center">
              <div v-for="item in imageSelectList" :key="item.id">
                <div class="mx-[4px] overflow-hidden rounded-[4px]">
                  <div
                    class="h-[30px] w-[30px] bg-cover bg-center"
                    :style="{
                      backgroundImage: `url(${pb.files.getURL(item, item.imageTiny)})`,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 提示 -->
          <div v-else>
            <div
              class="select-none truncate px-1 text-center text-[14px] font-bold italic text-color-text-soft"
            >
              请选择图片
            </div>
          </div>
        </div>
        <!-- 右按钮 确认 -->
        <div class="mx-2">
          <!-- 确认 -->
          <ElButton
            class=""
            circle
            type="primary"
            :disabled="false"
            @click="() => {}"
          >
            <template #icon>
              <RiCheckFill></RiCheckFill>
            </template>
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-page-bottom-box {
  border-radius: 24px 24px 0 0;
  box-shadow: 0 0 6px 6px var(--color-background);
}
</style>
