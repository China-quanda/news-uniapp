// uniapp 不支持外部PorpsType类型
// 在 3.2 及以下版本中，defineProps() 的泛型类型参数只能使用类型字面量或者本地接口的引用。
// 这个限制已经在 3.3 版本中解决。最新版本的 Vue 支持在类型参数的位置引用导入的和有限的复杂类型。然而，由于类型到运行时的转换仍然基于 AST，因此并不支持使用需要实际类型分析的复杂类型，例如条件类型等。你可以在单个 prop 的类型上使用条件类型，但不能对整个 props 对象使用。

export type Type = 'success' | 'info' | 'warning' | 'error';

// export type ExamplePorps = {
//   bgColor?: string // 背景颜色
//   columns?: string|number // 每列显示个数
//   clickable?:boolean // 是否开启格子点击反馈
// };


// export interface ExamplePorps {
//   bgColor?: string // 背景颜色
//   columns?: string|number // 每列显示个数
//   clickable?:boolean // 是否开启格子点击反馈
// }

export interface ExampleEmits {
  (e: 'click'): void
  (e: 'change', id: number): void
  (e: 'update:show', value: string): void
}