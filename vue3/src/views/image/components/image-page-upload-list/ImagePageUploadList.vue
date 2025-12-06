<script setup lang="ts">
import { RiBrush2Fill } from '@remixicon/vue'
import { ImgUploadItem } from './components'
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-[24px] bg-color-background-soft">
      <!-- 标题栏 -->
      <div class="mx-[14px] my-[14px]">
        <div class="flex items-center justify-between">
          <!-- 左 标题 -->
          <div class="flex flex-1 items-center truncate">
            <div class="mr-[8px] text-color-text">
              <RiImageAddLine size="20px"></RiImageAddLine>
            </div>
            <div
              class="select-none truncate text-[14px] font-bold text-color-text"
            >
              上传图片
            </div>
          </div>
          <!-- 右 操作图标 -->
          <div class="flex items-center">
            <div class="cursor-pointer">
              <RiBrush2Fill size="20px"></RiBrush2Fill>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表 -->
      <div>
        <!-- 分割线 -->
        <div class="border-t-[3px] border-color-background"></div>
        <ImgUploadItem></ImgUploadItem>
        <!-- 分割线 -->
        <!-- <div class="border-t-[3px] border-color-background"></div> -->
        <!-- <ImgUploadItem></ImgUploadItem> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
