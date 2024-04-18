<template>
  <view class="my-nav-bar">
    <!-- 占位 -->
    <view class="placeholder" v-if="fixed"></view>
    <view class="my-nav-bar-wrap" :class="{ 'is-border': border, 'is-fixed': fixed, 'is-shadow': shadow }">
      <view class="my-nav-bar-left" @click="onClickLeft">
        <slot name="left">
          <view class="my-nav-bar-btn">
            <text class="btn-icon iconfont" :class="[leftIcon]" v-if="leftIcon"></text>
            <text class="btn-text" v-if="leftText">{{ leftText }}</text>
          </view>
        </slot>
      </view>
      <view class="my-nav-bar-center" @click="onClickCenter">
        <slot name="default">
          <view v-if="title" class="my-nav-bar-title ellipsis1">{{ title }}</view>
        </slot>
      </view>
      <view class="my-nav-bar-right" @click="onClickRight">
        <slot name="right">
          <view class="my-nav-bar-btn">
            <text class="btn-icon iconfont" :class="[rightIcon]" v-if="rightIcon"></text>
            <text class="btn-text" v-if="rightText">{{ rightText }}</text>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },
  title: {
    type: String,
    default: ''
  },
  leftText: {
    type: String,
    default: ''
  },
  rightText: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: String,
    default: 'icon-xiangzuojiantou'
  },
  rightIcon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#000000'
  },
  fixed: {
    type: Boolean,
    default: false
  },
  statusBar: {
    type: Boolean,
    default: true
  },
  shadow: {
    // 微信小程序不支持
    type: Boolean,
    default: false
  },
  border: {
    // 微信小程序不支持
    type: Boolean,
    default: false
  },
  height: {
    type: [Number, String],
    default: '44px'
  },
  leftWidth: {
    type: [String, Number],
    default: '40px'
  },
  rightWidth: {
    type: [String, Number],
    default: '40px'
  }
})
const emit = defineEmits(['clickLeft', 'clickRight', 'clickCenter'])
const onClickLeft = () => {
  emit("clickLeft");
}
const onClickRight = () => {
  emit("clickRight");
}
const onClickCenter = () => {
  emit("clickCenter");
}
const statusBarHeight = ref('0px')
const navBarHeight = ref('0px')
const navRightWidth = ref('0px')
const wxmenuButtonInfo = ref<GetMenuButtonBoundingClientRectRes>({})
const systemInfo = ref<GetSystemInfoResult>({})
const init = () => {
  navBarHeight.value = props.height as string

  // #ifndef H5
  systemInfo.value = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.value.statusBarHeight + 'px'
  // #endif

  // #ifdef MP-WEIXIN
  wxmenuButtonInfo.value = uni.getMenuButtonBoundingClientRect()
  navRightWidth.value = (wxmenuButtonInfo.value.width || 0) + 10 + 'px';
  navBarHeight.value = ((wxmenuButtonInfo.value.top || 0) - (systemInfo.value.statusBarHeight || 0)) * 2 + (wxmenuButtonInfo.value.height || 0) + 'px'
  // #endif

  uni.setNavigationBarTitle({
    title: props.title
  });
}
onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.placeholder {
  height: calc(v-bind(navBarHeight) + v-bind(statusBarHeight));
}

.my-nav-bar-wrap {
  @apply flex flex-items-center;
  background-color: v-bind('props.bgColor');
  height: v-bind(navBarHeight);
  /* #ifndef H5 */
  padding-top: v-bind(statusBarHeight);
  /* #endif */


  .my-nav-bar-left {
    @apply text-left flex justify-start m-l-12px;
    width: v-bind('props.leftWidth');
  }

  .my-nav-bar-right {
    @apply text-right flex justify-end m-r-12px;
    width: v-bind('props.rightWidth');
    /* #ifdef MP-WEIXIN */
    padding-right: v-bind(navRightWidth)
      /* #endif */
  }

  .my-nav-bar-center {
    @apply flex flex-items-center justify-center flex-1 text-center;
    color: v-bind('props.color');
    font-size: 16px;
    /* #ifdef H5 */
    font-size: 15px;
    /* #endif */
    // .my-nav-bar-title {
    //   @apply max-w-150px;
    // }
  }


  .my-nav-bar-btn {
    @apply flex flex-col flex-items-center cursor-pointer;

    .btn-icon {
      @apply text-19px;
    }

    .btn-text {
      @apply text-13px;
    }
  }
}

.is-border {
  border-bottom: 1px solid #eee;
}

.is-fixed {
  @apply fixed right-0 left-0 top-0 z-9;
}

.is-shadow {
  box-shadow: 0 1px 6px #ccc;
}
</style>