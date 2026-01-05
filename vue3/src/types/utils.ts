/**
 * `Group<T>` 是一个语义占位类型，用于在复杂类型表达式中进行视觉分组。
 *
 * 它不会对类型 `T` 做任何变换，仅用于替代括号分组，防止格式化工具（如 Pitter）移除括号。
 *
 * ### 用途示例：
 * ```ts
 * type Result =
 *   | Group<A | B>
 *   | Group<C & D>
 *   | Group<Extract<T, U>>
 * ```
 *
 * ### 技术说明：
 * - `Group<T>` 等价于 `T`，在类型系统中无任何副作用
 * - 仅用于提升可读性和格式控制
 *
 * @template T 任意类型
 */
export type Group<T> = T

/**
 * `KeyValueMirror<T>` 构造一个对象类型，其键来自联合类型 `T`，
 * 且每个键的值必须与键名完全一致。
 *
 * ### 示例：
 * ```ts
 * type Fields = 'author' | 'quoteRoom' | 'quoteFile'
 *
 * const obj: KeyValueMirror<Fields> = {
 *   author: 'author',
 *   quoteRoom: 'quoteRoom',
 *   quoteFile: 'quoteFile',
 * }
 * ```
 *
 * ✅ 类型检查保证：
 * - 只能使用联合类型中的键
 * - 每个值必须等于对应的键名
 *
 * @template T - 字符串字面量联合类型
 */
export type KeyValueMirror<T extends string> = {
  [K in T]: K
}

/**
 * ReplacePropertyType<T, K, NewType>
 *
 * 一个通用的类型工具，用于在已有对象类型 T 中，
 * 将指定属性 K 的类型替换为新的类型 NewType。
 *
 * @template T - 原始对象类型
 * @template K - 需要替换的属性键，必须是 T 的键之一
 * @template NewType - 替换后的新类型
 *
 * @example
 * type User = {
 *   id: number;
 *   name: string;
 *   active: boolean;
 * };
 *
 * // 将 User 类型中的 id 从 number 改为 string
 * type UserWithStringId = ReplacePropertyType<User, "id", string>;
 *
 * // 结果：
 * // {
 * //   id: string;
 * //   name: string;
 * //   active: boolean;
 * // }
 */
export type ReplacePropertyType<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P]
}
