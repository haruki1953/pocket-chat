<script setup lang="ts"></script>

<template>
  <div>
    <!-- 列表项 -->
    <div class="mx-[14px] my-[10px]">
      <div class="flex items-center justify-between">
        <!-- 左 进度与文件名 -->
        <div class="flex flex-1 items-center">
          <div class="mr-[8px] cursor-pointer text-el-primary">
            <RiProgress8Line size="20px"></RiProgress8Line>
          </div>
          <!-- 文件名，或进度信息 -->
          <div
            class="select-none truncate text-[14px] font-bold text-color-text"
          >
            image.jpg
          </div>
        </div>
        <!-- 右 操作图标 -->
        <div class="flex items-center">
          <div class="ml-[8px] cursor-pointer select-none text-color-text">
            <RiCloseCircleLine size="20px"></RiCloseCircleLine>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
