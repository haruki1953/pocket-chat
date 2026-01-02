<script setup lang="ts">
import { useDark } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    /** 控制是否显示的值 */
    dialogVisible: boolean
    /**
     * 关闭方法，需要传入函数，才能让其点击遮罩时关闭，如
     * () => { dialogVisible.value = false }
     */
    dialogCloseFn: () => void
    /** 是否可以通过点击遮罩关闭，默认为true */
    closeOnClickOverlay?: boolean
  }>(),
  {
    closeOnClickOverlay: true,
  }
)

const isDark = useDark()

// 遮罩点击后判断是否需要关闭
const dialogOverlayOnClickFn = () => {
  if (props.closeOnClickOverlay === true) {
    props.dialogCloseFn()
  }
}
</script>

<template>
  <Teleport to="body">
    <div>
      <Transition name="fade">
        <div
          v-show="dialogVisible"
          class="dialog-overlay fixed bottom-0 left-0 right-0 top-0 z-[30]"
          :class="{
            // 明暗主题时的背景色稍有区别
            'bg-color-background-a80': !isDark,
            'bg-color-background-a90': isDark,
            'overlay-blur': true,
          }"
          @click="dialogOverlayOnClickFn"
        ></div>
      </Transition>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
