import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Vue3 组合式函数：实现字符串动画效果。
 * 字符串长度会从 `min` 增加到 `max`，再从 `max` 减少到 `min`，循环往复。
 *
 * @param {Object} options - 动画配置参数
 * @param {number} [options.min=3] - 字符串的最小长度（默认 3）
 * @param {number} [options.max=6] - 字符串的最大长度（默认 6）
 * @param {number} [options.interval=500] - 每次更新的时间间隔（毫秒，默认 500ms）
 * @param {string} [options.char='.'] - 用于构建字符串的字符（默认 '.'）
 * @param {boolean} [options.autoplay=true] - 是否在组件挂载时自动开始动画（默认 true）
 *
 * 返回对象包含：
 * - `text`: 响应式字符串，会随动画更新
 * - `start`: 启动动画的方法
 * - `stop`: 停止动画的方法
 * - `reset`: 重置动画到初始状态的方法
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useAniStrIncreasingDecreasingSequentially } from './useAniStrIncreasingDecreasingSequentially'
 *
 * const { text } = useAniStrIncreasingDecreasingSequentially({
 *   min: 3,
 *   max: 6,
 *   interval: 400,
 *   char: '.',
 *   autoplay: true,
 * })
 * </script>
 *
 * <template>
 *   <div>{{ text }}</div>
 * </template>
 * ```
 */
export function useAniStrIncreasingDecreasingSequentially(
  options: {
    min?: number
    max?: number
    interval?: number
    char?: string
    autoplay?: boolean
  } = {}
) {
  const {
    min = 3,
    max = 6,
    interval = 500,
    char = '.',
    autoplay = true,
  } = options

  const text = ref(char.repeat(min))
  let timer: number | null = null
  let direction = 1 // 1 = 增加，-1 = 减少
  let current = min

  const step = () => {
    current += direction
    if (current >= max) {
      direction = -1
    } else if (current <= min) {
      direction = 1
    }
    text.value = char.repeat(current)
  }

  const start = () => {
    if (timer != null) return
    timer = window.setInterval(step, interval)
  }

  const stop = () => {
    if (timer != null) {
      clearInterval(timer)
      timer = null
    }
  }

  const reset = () => {
    stop()
    current = min
    direction = 1
    text.value = char.repeat(min)
    if (autoplay) start()
  }

  onMounted(() => {
    if (autoplay) start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    text,
    start,
    stop,
    reset,
  }
}
