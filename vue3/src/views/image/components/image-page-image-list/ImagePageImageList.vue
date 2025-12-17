<script setup lang="ts">
import { useImagePageListQuery } from '@/queries'
import type { ImageQueryModeMarkType } from './dependencies'
import { useAuthStore } from '@/stores'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  imageQueryMode: ImageQueryModeMarkType
  imageQuerySearch: string
}>()

const imageAllQueryPage = ref(1)
const imageMyQueryPage = ref(1)

const imageQueryPage = computed(() => {
  if (props.imageQueryMode === 'image_all') {
    return imageAllQueryPage.value
  } else {
    // props.imageQueryMode === 'image_my'
    return imageMyQueryPage.value
  }
})

const imageQueryPageSet = (val: number) => {
  if (props.imageQueryMode === 'image_all') {
    imageAllQueryPage.value = val
  } else {
    // props.imageQueryMode === 'image_my'
    imageMyQueryPage.value = val
  }
}

const authStore = useAuthStore()

const imagePageListQuery = useImagePageListQuery({
  pageNum: computed(() => {
    // 未登录且image_my，则应为null，不查询
    if (
      (authStore.isValid === false || authStore.record?.id == null) &&
      props.imageQueryMode === 'image_my'
    ) {
      return null
    }
    return imageQueryPage.value
  }),
  authorId: computed(() => {
    if (props.imageQueryMode === 'image_all') {
      return null
    } else {
      // props.imageQueryMode === 'image_my'
      if (authStore.isValid === false || authStore.record?.id == null) {
        return null
      }
      return authStore.record.id
    }
  }),
  searchContent: computed(() => props.imageQuerySearch),
})

const refContentBox = ref<HTMLElement | null>(null)
const sizeContentBox = useElementSize(refContentBox)

// 一行中应显示的个数
const imageItemsPerRowCalcFn = (width: number): number => {
  if (width >= 1800) return 10
  if (width >= 1600) return 9
  if (width >= 1400) return 8
  if (width >= 1200) return 7
  if (width >= 1000) return 6
  if (width >= 800) return 5
  if (width >= 600) return 4
  return 3 // 默认最少 3
}
// 一行中应显示的个数
const imageItemsPerRow = computed(() => {
  return imageItemsPerRowCalcFn(sizeContentBox.width.value)
})

// 内容盒子应保持的高度
const contentBoxHeightCalcFn = (
  width: number,
  itemNum: number,
  itemsPerRow: number
) => {
  // width 除以 itemsPerRow 得到 正常情况下item的宽度，即正常情况下item的高度（正常情况下宽度和高度一致）
  // itemNum 除以 itemsPerRow （可能要向上取整）得到 行数
  // 行数 乘 正常情况下item的高度 得到 应为的高度

  // 每个 item 的宽度（正常情况下宽高一致）
  const itemSize = width / itemsPerRow

  // 行数，向上取整
  const rows = Math.ceil(itemNum / itemsPerRow)

  // 总高度 = 行数 * item 高度
  return rows * itemSize
}
// 内容盒子应保持的高度
// const contentBoxHeigh = computed(() => {
//   return contentBoxHeightCalcFn(sizeContentBox.width.value )
// })
</script>

<template>
  <div>
    <!-- 图片显示 -->
    <div>
      <div
        class="overflow-hidden rounded-t-[24px] border-[3px] border-transparent bg-color-background-soft"
      >
        <!-- 内容盒子，将获取其宽度，控制其高度 -->
        <div
          ref="refContentBox"
          :style="{
            height: '500px',
          }"
        >
          <div class="flex h-full flex-col items-stretch">
            <!-- 行 -->
            <div class="flex flex-1 items-stretch">
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
            </div>
            <!-- 分割线 横向 -->
            <div class="border-t-[3px] border-transparent"></div>
            <!-- 行 -->
            <div class="flex flex-1 items-stretch">
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
              <!-- 分割线 -->
              <div class="border-l-[3px] border-transparent"></div>
              <!-- 列 -->
              <div class="flex-1">
                <div class="h-full bg-red-950"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分割线 横向 -->
    <div class="border-t-[3px] border-transparent"></div>
    <!-- 分页栏 -->
    <div>
      <div class="overflow-hidden rounded-b-[24px] bg-color-background-soft">
        <div class="flex items-stretch">
          <!-- 上一页 -->
          <div class="flex cursor-pointer items-center">
            <div class="mx-[12px] my-[12px]">
              <RiArrowLeftWideFill></RiArrowLeftWideFill>
            </div>
          </div>
          <div class="border-l-[3px] border-color-background"></div>
          <!-- 分页按钮栏 -->
          <div class="flex-1 overflow-hidden">
            <div class="page-button-scrollbar flow-root h-full">
              <ElScrollbar
                height="100%"
                class=""
                :viewStyle="{
                  height: '100%',
                }"
              >
                <div class="flex h-full w-fit items-stretch">
                  <!-- 1 -->
                  <div
                    class="flex flex-shrink-0 cursor-pointer items-center bg-el-primary-light-6"
                  >
                    <div
                      class="mx-[12px] my-[12px] min-w-[24px] select-none text-center text-[16px] font-bold text-color-text"
                    >
                      1
                    </div>
                  </div>
                  <div class="border-l-[3px] border-color-background"></div>
                  <template v-for="item in 20" :key="item">
                    <!-- 2 -->
                    <div class="flex flex-shrink-0 cursor-pointer items-center">
                      <div
                        class="mx-[12px] my-[12px] w-[24px] select-none text-center text-[16px] font-bold text-color-text"
                      >
                        {{ 1 + item }}
                      </div>
                    </div>
                    <div class="border-l-[3px] border-color-background"></div>
                  </template>
                  <!-- 没有更多了 -->
                  <div class="flex flex-shrink-0 items-center">
                    <div
                      class="mx-[24px] my-[12px] select-none text-center text-[14px] font-bold italic text-color-text-soft"
                    >
                      没有更多了...
                    </div>
                  </div>
                </div>
              </ElScrollbar>
            </div>
          </div>
          <div class="border-l-[3px] border-color-background"></div>
          <!-- 下一页 -->
          <div class="flex cursor-pointer items-center">
            <div class="mx-[12px] my-[12px]">
              <RiArrowRightWideFill></RiArrowRightWideFill>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
