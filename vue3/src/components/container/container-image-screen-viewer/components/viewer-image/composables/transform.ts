import { ref, computed, type ComputedRef } from 'vue'

export const useViewerImageTransformDesuwa = (data: {
  allSize: ComputedRef<{
    windowWidth: number
    windowHeight: number
    contentWidth: number
    contentHeight: number
  }>
}) => {
  const { allSize } = data

  const scale = ref(1)
  const translateX = ref(0)
  const translateY = ref(0)

  // ---------------------------
  // 计算当前图片边界（缩放 + 位移后）
  // ---------------------------
  const boundariesFn = () => {
    const { windowWidth, windowHeight, contentWidth, contentHeight } =
      allSize.value

    const w = contentWidth * scale.value
    const h = contentHeight * scale.value

    const left = (windowWidth - w) / 2 + translateX.value
    const right = windowWidth - (left + w)
    const top = (windowHeight - h) / 2 + translateY.value
    const bottom = windowHeight - (top + h)

    return { left, right, top, bottom }
  }
  const boundaries = computed(boundariesFn)

  // ---------------------------
  // 位移限制
  // ---------------------------
  const clampTranslate = () => {
    const { windowWidth, windowHeight, contentWidth, contentHeight } =
      allSize.value

    const w = contentWidth * scale.value
    const h = contentHeight * scale.value

    // 图片中心点 = 屏幕中心 + translate
    // 图片左边 = centerX - w/2
    // => translateX = left - (windowWidth - w)/2
    const halfW = w / 2
    const halfH = h / 2

    const minLeft = 50
    const minRight = 50
    const minTop = 100
    const minBottom = 100

    // 屏幕中心
    const screenCenterX = windowWidth / 2
    const screenCenterY = windowHeight / 2

    // 当前图片中心
    const imgCenterX = screenCenterX + translateX.value
    const imgCenterY = screenCenterY + translateY.value

    // 当前边界
    const left = imgCenterX - halfW
    const right = windowWidth - (imgCenterX + halfW)
    const top = imgCenterY - halfH
    const bottom = windowHeight - (imgCenterY + halfH)

    // ---------------------------
    // X 方向
    // ---------------------------

    let newTranslateX = translateX.value

    const leftTooBig = left >= minLeft
    const rightTooBig = right >= minRight

    if (leftTooBig && rightTooBig) {
      // 图片太小，两边都满足 → 居中
      newTranslateX = 0
    } else if (leftTooBig) {
      // 左边超过 → 把左边拉回到 minLeft
      const targetCenterX = minLeft + halfW
      newTranslateX = targetCenterX - screenCenterX
    } else if (rightTooBig) {
      // 右边超过 → 把右边拉回到 minRight
      const targetCenterX = windowWidth - minRight - halfW
      newTranslateX = targetCenterX - screenCenterX
    }

    // ---------------------------
    // Y 方向
    // ---------------------------

    let newTranslateY = translateY.value

    const topTooBig = top >= minTop
    const bottomTooBig = bottom >= minBottom

    if (topTooBig && bottomTooBig) {
      newTranslateY = 0
    } else if (topTooBig) {
      const targetCenterY = minTop + halfH
      newTranslateY = targetCenterY - screenCenterY
    } else if (bottomTooBig) {
      const targetCenterY = windowHeight - minBottom - halfH
      newTranslateY = targetCenterY - screenCenterY
    }

    translateX.value = newTranslateX
    translateY.value = newTranslateY
  }

  // ---------------------------
  // 缩放限制：是否允许继续缩小
  // ---------------------------
  const canScaleDown = computed(() => {
    const b = boundaries.value
    return !(b.left >= 50 && b.right >= 50 && b.top >= 100 && b.bottom >= 100)
  })

  // ---------------------------
  // 应用缩放（带鼠标中心补偿）
  // ---------------------------
  const applyScale = (newScale: number, centerX: number, centerY: number) => {
    const oldScale = scale.value

    // 限制缩小
    if (newScale < oldScale && !canScaleDown.value) return

    // 限制最大最小
    if (newScale > 3) newScale = 3
    if (newScale < 0.5) newScale = 0.5

    const { windowWidth, windowHeight } = allSize.value

    // 图片中心点（缩放前）
    const imgCenterX = windowWidth / 2 + translateX.value
    const imgCenterY = windowHeight / 2 + translateY.value

    // 鼠标相对图片中心的偏移
    const offsetX = centerX - imgCenterX
    const offsetY = centerY - imgCenterY

    const ratio = newScale / oldScale

    // 位移补偿：模拟以鼠标为中心缩放
    translateX.value -= offsetX * (ratio - 1)
    translateY.value -= offsetY * (ratio - 1)

    scale.value = newScale
    clampTranslate()
  }

  // ---------------------------
  // 滚轮缩放
  // ---------------------------
  const onWheel = (e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = scale.value + delta
    applyScale(newScale, e.clientX, e.clientY)
  }

  // ---------------------------
  // 鼠标拖动
  // ---------------------------
  let dragging = false
  let lastX = 0
  let lastY = 0

  const onMouseDown = (e: MouseEvent) => {
    dragging = true
    lastX = e.clientX
    lastY = e.clientY
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return

    const dx = e.clientX - lastX
    const dy = e.clientY - lastY

    lastX = e.clientX
    lastY = e.clientY

    translateX.value += dx
    translateY.value += dy
    clampTranslate()
  }

  const onMouseUp = () => {
    dragging = false
  }

  // ---------------------------
  // 双指触摸
  // ---------------------------
  let touchStartDist = 0
  let touchStartCenter = { x: 0, y: 0 }
  let touchStartScale = 1
  let touchStartTranslate = { x: 0, y: 0 }

  const getTouchDist = (t: TouchList) => {
    const dx = t[0].clientX - t[1].clientX
    const dy = t[0].clientY - t[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getTouchCenter = (t: TouchList) => ({
    x: (t[0].clientX + t[1].clientX) / 2,
    y: (t[0].clientY + t[1].clientY) / 2,
  })

  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      touchStartDist = getTouchDist(e.touches)
      touchStartCenter = getTouchCenter(e.touches)
      touchStartScale = scale.value
      touchStartTranslate = { x: translateX.value, y: translateY.value }
    }
  }

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 2) return

    const newDist = getTouchDist(e.touches)
    const center = getTouchCenter(e.touches)

    // 缩放
    const ratio = newDist / touchStartDist
    const newScale = touchStartScale * ratio
    applyScale(newScale, center.x, center.y)

    // 位移
    translateX.value = touchStartTranslate.x + (center.x - touchStartCenter.x)
    translateY.value = touchStartTranslate.y + (center.y - touchStartCenter.y)

    clampTranslate()
  }

  // ---------------------------
  // 重置
  // ---------------------------
  const reset = () => {
    scale.value = 1
    translateX.value = 0
    translateY.value = 0
  }

  return {
    scale,
    translateX,
    translateY,

    transform: computed(() => {
      return `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`
    }),

    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,

    reset,
  }
}
