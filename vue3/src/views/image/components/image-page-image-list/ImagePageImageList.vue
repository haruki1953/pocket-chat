<script setup lang="ts">
import { useImagePageListQuery } from '@/queries'
import type { ImageQueryModeMarkType } from './dependencies'
import { useAuthStore } from '@/stores'
import { useElementSize, useWindowSize } from '@vueuse/core'
import { dataProcessChunkArrayBalancedUtil } from '@/utils'

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

// 内容的数据，图片的个数
const imageItemsCountByQuery = computed(
  () => imagePageListQuery.data.value?.items.length ?? 0
)

// 缓存的用于高度计算的，图片的个数
const imageItemsCountByCache = ref(0)
// 缓存逻辑，当图片的个数变化
watch(
  imageItemsCountByQuery,
  (val) => {
    if (val <= 0) {
      return
    }
    imageItemsCountByCache.value = val
  },
  {
    immediate: true,
  }
)

// 将用于高度计算的，图片的个数
const imageItemsCountForHeightCalc = computed(() => {
  if (imageItemsCountByQuery.value > 0) {
    return imageItemsCountByQuery.value
  }
  return imageItemsCountByCache.value
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

// 内容盒子应保持的高度，根据图片计算
const contentBoxHeightByItemsCountCalcFn = (
  width: number,
  itemNum: number,
  itemsPerRow: number
) => {
  // width 除以 itemsPerRow 得到 正常情况下item的宽度，即正常情况下item的高度（正常情况下宽度和高度一致）
  // itemNum 除以 itemsPerRow （可能要向上取整）得到 行数
  // 行数 乘 正常情况下item的高度 得到 应为的高度

  if (itemNum <= 0 || width <= 0) {
    return 0
  }

  // 每个 item 的宽度（正常情况下宽高一致）
  const itemSize = width / itemsPerRow

  // 行数，向上取整
  const rows = Math.ceil(itemNum / itemsPerRow)

  // 总高度 = 行数 * item 高度
  return rows * itemSize
}

const windowsSize = useWindowSize()

// 内容盒子应保持的高度，图片为0时，使用此默认高度
const contentBoxHeightByDefault = () => {
  // 外边距
  const m = 16 * 2
  // 分页栏
  const pageBar = 48
  // 边框、分割线
  const b = 3 * 3
  return windowsSize.height.value - (m + pageBar + b)
}
// 内容盒子应保持的高度
const contentBoxHeigh = computed(() => {
  const contentBoxHeightByItemsCount = contentBoxHeightByItemsCountCalcFn(
    sizeContentBox.width.value,
    imageItemsCountForHeightCalc.value,
    imageItemsPerRow.value
  )

  if (contentBoxHeightByItemsCount > 0) {
    return contentBoxHeightByItemsCount
  }
  return contentBoxHeightByDefault()
})

// 内容的数据，图片二维数组，用于渲染
const imageQueryDataMatrix = computed(() => {
  if (imagePageListQuery.data.value?.items == null) {
    return null
  }
  return dataProcessChunkArrayBalancedUtil(
    imagePageListQuery.data.value.items,
    imageItemsPerRow.value
  )
})

// 当 imageQueryDataMatrix 只有一行时，可能需要进行特殊的渲染，需要垫片，
// 此为垫片宽度占比 flex-<number>
const imageQueryDataMatrixOneRowGasket = computed(() => {
  if (imageQueryDataMatrix.value == null) {
    return null
  }
  if (imageQueryDataMatrix.value.length !== 1) {
    return null
  }
  if (imageQueryDataMatrix.value[0].length <= 0) {
    return null
  }

  // 第一行的数量
  const firstRowlength = imageQueryDataMatrix.value[0].length
  // 一行中应显示的个数
  // imageItemsPerRow
  // 计算 imageItemsPerRow 减 firstRowlength 得到一个值，判断其是否大于等于2
  const diff = imageItemsPerRow.value - firstRowlength
  if (diff < 2) {
    return null
  }
  return diff
})
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
          class="relative transition-[height]"
          :style="{
            height: `${contentBoxHeigh}px`,
          }"
        >
          <Transition name="fade" mode="out-in">
            <!-- 特殊情况，只有一行且需垫片 -->
            <div
              v-if="
                imageQueryDataMatrixOneRowGasket != null &&
                imageQueryDataMatrix != null &&
                imageQueryDataMatrix.length > 0 &&
                imageQueryDataMatrix[0].length > 0
              "
              class="flex h-full flex-col items-stretch"
            >
              <!-- 行 -->
              <div class="flex flex-1 items-stretch">
                <template
                  v-for="(item, index) in imageQueryDataMatrix[0]"
                  :key="item.id"
                >
                  <!-- 分割线 -->
                  <div
                    v-if="index !== 0"
                    class="border-l-[3px] border-transparent"
                  ></div>
                  <!-- 列 -->
                  <div class="flex-1">
                    <div class="h-full bg-red-950"></div>
                  </div>
                </template>
                <div
                  :style="{
                    flex: `${imageQueryDataMatrixOneRowGasket}`,
                  }"
                  class="flex items-center justify-center"
                >
                  <div class="text-color-background">
                    <!-- class="h-full max-h-[50%] w-full max-w-[50%] object-contain" -->
                    <RiMessage3Fill size="100px"></RiMessage3Fill>
                  </div>
                </div>
              </div>
            </div>
            <!-- 正常情况 -->
            <div
              v-else-if="
                imageQueryDataMatrix != null &&
                imageQueryDataMatrix.length > 0 &&
                imageQueryDataMatrix[0].length > 0
              "
              :key="
                imageQueryDataMatrix
                  .map((r) => r.map((i) => i.id).toString())
                  .toString()
              "
              class="flex h-full flex-col items-stretch"
            >
              <template
                v-for="(row, rowIndex) in imageQueryDataMatrix"
                :key="row.map((i) => i.id).toString()"
              >
                <!-- 分割线 横向 -->
                <div
                  v-if="rowIndex !== 0"
                  class="border-t-[3px] border-transparent"
                ></div>
                <!-- 行 -->
                <div class="flex flex-1 items-stretch">
                  <template v-for="(item, index) in row" :key="item.id">
                    <!-- 分割线 -->
                    <div
                      v-if="index !== 0"
                      class="border-l-[3px] border-transparent"
                    ></div>
                    <!-- 列 -->
                    <div class="flex-1">
                      <div class="h-full bg-red-950"></div>
                    </div>
                  </template>
                </div>
              </template>
            </div>
            <!-- 空状态 -->
            <div
              v-else-if="
                imageQueryDataMatrix != null && imageQueryDataMatrix.length <= 0
              "
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
            >
              <div
                class="h-[100px] w-[100px] overflow-hidden text-color-background"
              >
                <!-- class="h-full max-h-[50%] w-full max-w-[50%] object-contain" -->
                <RiMessage3Fill size="100px"></RiMessage3Fill>
              </div>
            </div>
            <!-- 加载状态 -->
            <div
              v-else
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
            >
              <div
                class="h-[50px] w-[50px] overflow-hidden text-color-text-soft"
              >
                <RiLoader3Line
                  class="loading-spinner-800ms"
                  size="50px"
                ></RiLoader3Line>
              </div>
            </div>
          </Transition>
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
                  <template v-for="item in 20" :key="item">
                    <div
                      class="flex flex-shrink-0 cursor-pointer items-center transition-colors"
                      :class="{
                        'bg-el-primary-light-6': imageQueryPage === item,
                      }"
                      @click="imageQueryPageSet(item)"
                    >
                      <div
                        class="mx-[12px] my-[12px] w-[24px] select-none text-center text-[16px] font-bold text-color-text"
                      >
                        {{ item }}
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
