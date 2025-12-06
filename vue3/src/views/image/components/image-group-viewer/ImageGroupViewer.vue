<script setup lang="ts"></script>

<template>
  <div>
    <div
      :style="{
        'aspect-ratio': `16 / 9`,
      }"
    >
      <div class="flex h-full items-stretch">
        <!-- 左半 -->
        <div class="flex-1">
          <div class="h-full bg-red-950"></div>
        </div>
        <!-- 分割线 -->
        <div class="border-l-[3px] border-transparent"></div>
        <!-- 右半 -->
        <div class="flex-1">
          <div class="flex h-full flex-col items-stretch">
            <!-- 上 -->
            <div class="flex-1">
              <div class="h-full bg-red-950"></div>
            </div>
            <!-- 分割线 -->
            <div class="border-t-[3px] border-transparent"></div>
            <!-- 下 -->
            <div class="flex-1">
              <div class="h-full bg-red-950"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
