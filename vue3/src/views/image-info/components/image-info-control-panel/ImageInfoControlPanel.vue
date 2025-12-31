<script setup lang="ts">
import {
  UpdateImageAlt,
  UpdateImageIsDeleted,
  UpdateImageKeyword,
  UserInfoAndLinkButton,
} from './components'
import type { ImageInfoQueryDesuwaType } from './dependencies'

const props = defineProps<{
  imageInfoQueryDesuwa: ImageInfoQueryDesuwaType
}>()

const {
  //
  imagesGetOneQuery,
  imageInfoQueryStatus,
} = props.imageInfoQueryDesuwa
</script>

<template>
  <div>
    <!-- 用户信息 与 图片链接按钮 -->
    <!-- UserInfoAndLinkButton -->
    <div>
      <UserInfoAndLinkButton
        :imageInfoQueryDesuwa="imageInfoQueryDesuwa"
      ></UserInfoAndLinkButton>
    </div>
    <!-- 操作面板 -->
    <div class="mt-2">
      <div class="overflow-hidden rounded-[24px] bg-color-background-soft">
        <!-- 修改alt -->
        <!-- UpdateImageAlt -->
        <UpdateImageAlt
          :imageInfoQueryDesuwa="imageInfoQueryDesuwa"
        ></UpdateImageAlt>
        <!-- 分割线 -->
        <div class="border-t-[3px] border-color-background"></div>
        <!-- 修改关键词 -->
        <!-- UpdateImageKeyword -->
        <UpdateImageKeyword
          :imageInfoQueryDesuwa="imageInfoQueryDesuwa"
        ></UpdateImageKeyword>
        <!-- 分割线 -->
        <div class="border-t-[3px] border-color-background"></div>
        <!-- 删除图片 -->
        <!-- UpdateImageIsDeleted -->
        <UpdateImageIsDeleted
          :imageInfoQueryDesuwa="imageInfoQueryDesuwa"
        ></UpdateImageIsDeleted>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
