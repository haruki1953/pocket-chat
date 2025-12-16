<script setup lang="ts">
import { RiFolderImageFill, RiFolderUserFill } from '@remixicon/vue'
import { PanelImageUploader } from './components'

const searchInputContent = ref('')
</script>

<template>
  <div>
    <div class="overflow-hidden rounded-[24px] bg-color-background-soft">
      <!-- 上传图片 -->
      <div>
        <PanelImageUploader></PanelImageUploader>
      </div>
      <!-- 分割线 -->
      <div class="border-t-[3px] border-color-background"></div>
      <!-- 全部图片 我的图片 -->
      <div>
        <div class="flex items-stretch">
          <!-- 左 全部图片 -->
          <div class="flex-1 truncate">
            <div class="flow-root h-full cursor-pointer bg-el-primary-light-6">
              <div class="flex h-full items-center">
                <div class="flex-1 truncate">
                  <div class="my-[12px] ml-[16px] mr-[8px]">
                    <div class="flex items-center">
                      <!-- 图标 -->
                      <div class="text-color-text">
                        <RiFolderImageFill></RiFolderImageFill>
                      </div>
                      <!-- 文字 -->
                      <div class="ml-[4px] flex-1 truncate">
                        <div
                          class="select-none truncate text-center text-[12px] font-bold text-color-text"
                        >
                          全部图片全部图片全部图片全部图片全部图片全部图片
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="border-l-[3px] border-color-background"></div>
          <!-- 右 我的图片 -->
          <div class="flex-1 truncate">
            <div
              class="flow-root h-full cursor-pointer bg-color-background-soft"
            >
              <div class="flex h-full items-center">
                <div class="flex-1 truncate">
                  <div class="my-[12px] ml-[16px] mr-[8px]">
                    <div class="flex items-center">
                      <!-- 图标 -->
                      <div class="text-color-text">
                        <RiFolderUserFill></RiFolderUserFill>
                      </div>
                      <!-- 文字 -->
                      <div class="flex-1 truncate">
                        <div
                          class="select-none truncate text-center text-[12px] font-bold text-color-text"
                        >
                          我的图片
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="border-t-[3px] border-color-background"></div>
      <!-- 搜索栏 -->
      <div class="search-input-box">
        <div class="my-2 flex items-stretch">
          <!-- 左栏 输入框 -->
          <div class="ml-2 mr-1 flow-root flex-1 truncate">
            <div>
              <ElInput
                v-model="searchInputContent"
                placeholder="搜索ALT、用户名"
                @keydown.enter.exact.prevent="() => {}"
              />
            </div>
          </div>
          <!-- 右栏 按钮 -->
          <div class="mr-2 flex flex-col-reverse">
            <ElButton circle type="info" @click="() => {}">
              <template #icon>
                <RiSearchLine></RiSearchLine>
              </template>
            </ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-input-box {
  .el-input {
    :deep() {
      .el-input__wrapper {
        background-color: transparent;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
        .el-input__inner {
          color: var(--color-text);
          font-size: 14px;
          font-weight: bold;
          // text-align: center;
          &::placeholder {
            color: var(--color-text-soft);
            font-size: 14px;
            font-style: italic;
          }
        }
      }
    }
  }
}
</style>
