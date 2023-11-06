<template>
  <view :class="[ 'step', `step-${direction}`]">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import {provide} from "vue";
const props = defineProps({
  direction: {
    // row-横向，column-竖向
    type: String,
    default: "row",
    validator(value) {
      return ["row", "column"].includes(value);
    },
  },
  current: {
    // 设置当前处于第几步
    type: [Number, String],
    default: 1,
  },
  activeColor: {
    // 激活状态颜色
    type: String,
    default: "#3c9cff",
  },
  inactiveColor: {
    // 未激活状态颜色
    type: String,
    default: "#969799",
  },
  activeIcon: {
    // 激活状态的图标
    type: String,
    default: "",
  },
  inactiveIcon: {
    // 未激活状态图标
    type: String,
    default: "",
  },
  dot: {
    // 是否显示点类型
    type: Boolean,
    default: false,
  },
});
provide('step',props)
</script>

<style scoped lang="scss">
.step {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.step-row {
  flex-direction: row;
  :deep(.step-item) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0px;
    .step-item-line {
      top: 10px;
      height: 1px;
      width: calc(100% - 20px);
      left: calc(50% + 10px);
    }
    .step-item-dot {
      ~ .step-item-line {
        top: 5px;
        left: calc(50% + 5px);
        height: 1px;
        width: calc(100% - 10px);
      }
    }
    .step-item-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 6px 5px 0px 5px;
    }
  }
}
</style>
