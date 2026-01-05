/**
 * 单图比例计算（必填配置版本）
 *
 * @param img.imageWidth   图片原始宽度
 * @param img.imageHeight  图片原始高度
 *
 * @param options.maxRatio     最大允许比例（必填）
 * @param options.minRatio     最小允许比例（必填）
 * @param options.defaultRatio 宽或高为 0 时的默认比例（必填）
 *
 * @returns 经过裁剪后的图片比例
 *
 * ## 逻辑说明
 *
 * 1. 若宽或高为 0 → 返回 defaultRatio
 * 2. 否则计算 raw = w / h
 * 3. 最终比例 = clamp(raw, minRatio, maxRatio)
 *
 * ## 示例
 *
 * ```ts
 * imageCalcSingleRatioUtil(
 *   { imageWidth: 300, imageHeight: 100 },
 *   { maxRatio: 3/1, minRatio: 1/2, defaultRatio: 16/9 }
 * )
 * ```
 */
export function imageCalcSingleRatioUtil(
  img: { imageWidth: number; imageHeight: number },
  options: {
    maxRatio: number
    minRatio: number
    defaultRatio: number
  }
): number {
  const { imageWidth: w, imageHeight: h } = img
  const { maxRatio, minRatio, defaultRatio } = options

  if (w <= 0 || h <= 0) return defaultRatio

  const raw = w / h
  return Math.min(maxRatio, Math.max(minRatio, raw))
}

/**
 * 根据图片比例与阶梯规则计算最大宽度。
 *
 * ## steps 阶梯匹配逻辑示例演示
 *
 * 假设 steps 配置如下：
 *
 *    [
 *      { ratio: 2/1, maxHeight: 260 },
 *      { ratio: 1/1, maxHeight: 360 },
 *      { ratio: 1/2, maxHeight: 480 }
 *    ]
 *
 * 则阶梯匹配逻辑等价于以下 if-else：
 *
 * ```ts
 * let maxHeight = 0
 *
 * if (ratio >= 2 / 1) {
 *   maxHeight = 260
 * } else if (ratio >= 1 / 1) {
 *   maxHeight = 360
 * } else if (ratio >= 1 / 2) {
 *   maxHeight = 480
 * } else {
 *   // 如果比最小阶梯还小，就使用最后一个阶梯（最竖的图）
 *   maxHeight = 480
 * }
 * ```
 *
 * 实际实现中，会将 steps 按 ratio 从大到小排序，
 * 然后查找第一个满足：`图片比例 >= step.ratio` 的阶梯。
 *
 *
 * ## sizeLimitHandler 二次限制钩子
 *
 * sizeLimitHandler 是一个“二次限制钩子（hook）”，用于在阶梯规则计算出初步 maxWidth 后，
 * 根据图片原始尺寸或业务需求对 maxWidth 进行进一步限制。
 *
 * 典型用途包括：
 * - 限制最大显示宽度不能超过原图宽度的一半
 * - 限制最大显示宽度不能超过屏幕宽度
 * - 限制最大显示宽度不能超过某个业务阈值
 * - 防止图片被放大导致失真
 *
 * 示例：
 *
 * ```ts
 * // 如果原图宽度的一半比 maxWidth 更小，则强制使用原图宽度的一半
 * const sizeLimitHandler = (imageWidth, maxWidth) => {
 *   const half = imageWidth / 2
 *   return half < maxWidth ? half : maxWidth
 * }
 * ```
 *
 * 该函数的返回值将作为最终的 maxWidth。
 *
 *
 * @param options.imageWidth        图片原始宽度
 * @param options.imageHeight       图片原始高度
 * @param options.steps             阶梯规则数组（按比例决定最大高度）
 * @param options.sizeLimitHandler  对初步 maxWidth 进行二次限制的处理函数
 *
 * @returns 最终计算得到的 maxWidth
 */
export function imageCalcMaxWidthByRatioUtil(options: {
  imageWidth: number
  imageHeight: number
  imageCalcSingleRatioOptions: {
    maxRatio: number
    minRatio: number
    defaultRatio: number
  }
  steps: Array<{ ratio: number; maxHeight: number }>
  sizeLimitHandler?: (data: {
    imageWidth: number
    imageHeight: number
    maxWidth: number
    maxHeight: number
  }) => number
}): number {
  const {
    imageWidth,
    imageHeight,
    imageCalcSingleRatioOptions,
    steps,
    sizeLimitHandler,
  } = options

  // 1. 计算预处理后的比例
  const ratio = imageCalcSingleRatioUtil(
    { imageWidth, imageHeight },
    imageCalcSingleRatioOptions
  )

  // 2. 找到对应阶梯（按 ratio 从大到小排序后匹配）
  const sortedSteps = [...steps].sort((a, b) => b.ratio - a.ratio)

  const matched = sortedSteps.find((step) => ratio >= step.ratio)

  // 若没有匹配到，使用最小阶梯
  const maxHeight = matched
    ? matched.maxHeight
    : sortedSteps[sortedSteps.length - 1].maxHeight

  // 3. 根据高度限制计算初步 maxWidth
  let maxWidth = ratio * maxHeight

  // 4. 交给外部处理函数进行二次限制
  if (sizeLimitHandler) {
    maxWidth = sizeLimitHandler({
      imageWidth,
      imageHeight,
      maxWidth,
      maxHeight,
    })
  }

  return maxWidth
}
