import myNavBar from './my-nav-bar/my-nav-bar.vue'

// 解决使用组件时候无法高亮的问题
declare module 'vue' {
  export interface GlobalComponents {
    myNavBar: typeof myNavBar
  }
}

export { }
