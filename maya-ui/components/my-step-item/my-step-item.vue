<template>
  <view class="step-item" :class="getCurrent(num + 1)">
    <view v-if="step.dot" class="step-item-dot"></view>
    <view v-if="!step.dot && !step.activeIcon" class="step-item-circle">
      <text class="step-item-circle-text">{{ num + 1 }}</text>
    </view>
    <view v-if="showIcon" class="step-item-icon">
      <view class="iconfont">
        <slot name="icon"><i :class="`iconfont ${getIcon(num + 1)}`"></i></slot>
      </view>
    </view>
    <view class="step-item-line"></view>
    <view class="step-item-content">
      <slot>
        <text class="step-item-content-title"><slot name="title">{{ props.title }}</slot></text>
        <text class="step-item-content-desc"><slot name="desc">{{ props.desc }}</slot> </text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import {inject ,useSlots,computed} from "vue";
const step = inject("step");
const slots = useSlots()
const props = defineProps({
  // Steps Item Props
  num: {
    type: [String, Number],
    required: true,
  },
  title: {
    // 标题文字
    type: String,
    default: "",
  },
  desc: {
    // 描述文本
    type: String,
    default: "",
  },
  iconSize: {
    // 图标大小
    type: String,
    default: "18px",
  },
  // 已完成（finish） // 进行中（process） // 未开始（wait） // 警示／错误（error）
});
const showIcon = computed(()=>{
	if(!!slots?.icon || step.activeIcon || step.inactiveIcon) return true
	return false
})
const getCurrent = (current) => {
  if (current < step.current) return "step-item-active";
  if (current == step.current) return "step-item-current";
};
const getIcon = (current) => {
  return current <= step.current ? step.activeIcon : step.inactiveIcon;
};

</script>

<style scoped lang="scss">
.step-item {
  display: flex;
  flex: 1;
  position: relative;
  box-sizing: border-box;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 10px;
  &:nth-last-child(1) {
    .step-item-line {
      display: none;
      position: absolute;
      top: 0px;
      height: 0px;
      width: 0%;
      left: 0px;
      background-color: transparent;
    }
  }
  .step-item-line {
    position: absolute;
    // background: #909193;
    top: 20px;
    height: calc(100% - 20px);
    width: 1px;
    left: 10px;
    box-sizing: border-box;
    // background-color: rgb(60, 156, 255);
    background-color: v-bind("step.inactiveColor");
  }
  .step-item-dot {
    width: 10px;
    height: 10px;
    border-radius: 100px;
    // background-color: rgb(60, 156, 255);
    background-color: v-bind("step.inactiveColor");
    ~ .step-item-line {
      top: 10px;
      left: 5px;
      height: calc(100% - 10px);
    }
  }
  .step-item-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 100px;
    border: 1px solid v-bind("step.inactiveColor");
    // background-color: v-bind('props.inactiveColor');
    // background-color: transparent;
    .step-item-circle-text {
      font-size: 12px;
      color: v-bind("step.inactiveColor");
    }
  }
  .step-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    .iconfont {
      font-size: v-bind("props.iconSize");
      color: v-bind("step.inactiveColor");
    }
  }
  .step-item-content {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .step-item-content-title {
      text-overflow: ellipsis;
      text-decoration: none;
      font-weight: normal;
      overflow-wrap: normal;
      font-size: 13px;
      color: #606266;
    }
    .step-item-content-desc {
      text-overflow: ellipsis;
      text-decoration: none;
      font-weight: normal;
      overflow-wrap: normal;
      font-size: 12px;
      color: #909193;
    }
  }
}
.step-item-active {
  .step-item-line {
    background-color: v-bind("step.activeColor");
  }
  .step-item-dot {
    background-color: v-bind("step.activeColor");
  }
  .step-item-circle {
    border: 1px solid v-bind("step.activeColor");
    .step-item-circle-text {
      color: v-bind("step.activeColor");
    }
  }
  .step-item-icon {
    .iconfont {
      color: v-bind("step.activeColor");
    }
  }
}

.step-item-current {
  .step-item-line {
    background-color: v-bind("step.inactiveColor");
  }
  .step-item-dot {
    background-color: v-bind("step.activeColor");
  }
  .step-item-circle {
    border: 1px solid v-bind("step.activeColor");
    background-color: v-bind("step.activeColor");
    .step-item-circle-text {
      color: #fff;
    }
  }
  .step-item-icon {
    .iconfont {
      color: v-bind("step.activeColor");
    }
  }
  .step-item-content {
    .step-item-content-title {
      font-size: 14px;
      color: #303133;
    }
    .step-item-content-desc {
    }
  }
}
</style>
