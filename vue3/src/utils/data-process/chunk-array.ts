/**
 * 将一维数组拆分为二维数组
 * @param arr 原始数组
 * @param size 每行的元素个数
 * @returns 二维数组
 *
 * ```ts
 * // 使用示例
 * const data = [1, 2, 3, 4, 5, 6, 7];
 * const result = dataProcessChunkArrayUtil(data, 3);
 * console.log(result); // [[1,2,3],[4,5,6],[7]]
 * ```
 */
export const dataProcessChunkArrayUtil = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0) {
    console.error('size <= 0')
    return []
  }

  const result: T[][] = []
  let currentRow: T[] = []

  for (let i = 0; i < arr.length; i++) {
    currentRow.push(arr[i])

    if (currentRow.length === size) {
      result.push(currentRow)
      currentRow = [] // 重置新行
    }
  }

  // 如果最后一行不足 size 个元素，也要加入
  if (currentRow.length > 0) {
    result.push(currentRow)
  }

  return result
}

/**
 * 将一维数组拆分为二维数组，并尽量让每行元素数量分布均匀
 * @param arr 原始数组
 * @param size 每行的期望元素个数（用于计算行数）
 * @returns 二维数组
 *
 * ```ts
 * // 使用示例
 * const data = [1, 2, 3, 4, 5, 6, 7];
 * const result = dataProcessChunkArrayBalancedUtil(data, 3);
 * console.log(result); // [[1,2,3],[4,5],[6,7]]
 * ```
 */
export const dataProcessChunkArrayBalancedUtil = <T>(
  arr: T[],
  size: number
): T[][] => {
  if (size <= 0) {
    console.error('size <= 0')
    return []
  }

  const totalItems = arr.length
  if (totalItems === 0) return []

  // ⛓️ 总共需要多少行（向上取整）
  const totalRows = Math.ceil(totalItems / size)

  // 🎯 每行应分配的基础数量（平均分配）
  const baseCount = Math.floor(totalItems / totalRows)
  // 🧩 有多少行需要比其他行多放一个（用来填平）
  const extraRows = totalItems % totalRows

  const result: T[][] = []
  let index = 0

  for (let row = 0; row < totalRows; row++) {
    // 📊 前 extraRows 行平均分配 baseCount + 1 个
    const count = row < extraRows ? baseCount + 1 : baseCount
    result.push(arr.slice(index, index + count))
    index += count
  }

  return result
}
