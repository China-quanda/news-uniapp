<!-- 引导页 -->
<template>
  <view class="guide">
    <swiper class="swiper" indicator-dots @change="swiperChange" :current="current">
      <swiper-item class="swiper-item">
        <image class="image" src="@/static/images/guide/guide-1.jpg" mode="aspectFill" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <image class="image" src="@/static/images/guide/guide-2.jpg" mode="aspectFill" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <image class="image" src="@/static/images/guide/guide-3.jpg" mode="aspectFill" />
      </swiper-item>
      <swiper-item class="swiper-item">
        <image class="image" src="@/static/images/guide/guide-4.jpg" mode="aspectFill" />
      </swiper-item>
    </swiper>
    <view class="right-top" v-if="current !== 3" @click="openApp"> 跳过 </view>
    <view class="bottom" v-if="current === 3">
      <view class="button" @click="openApp">
        <view class="button-text">
          <text>立</text>
          <text>即</text>
          <text>开</text>
          <text>启</text>
        </view>
      </view>
      <view class="privacy">
        <checkbox-group class="checkbox-group" @change="checkboxChange">
          <checkbox :checked="isChecked" color="#60a5fa" style="transform:scale(0.6)" />
        </checkbox-group>
        <text class="text">同意并接受</text>
        <text class="text text-blue" @click="handlePrivacy">《服务协议》</text>
        <text class="text"> 和 </text>
        <text class="text text-blue" @click="handleUserAgrement">《个人信息保护政策》</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CheckboxGroupOnChangeEvent, SwiperOnChangeEvent } from '@uni-helper/uni-app-types';
import { useAppStore } from '@/store/app';
const appStore = useAppStore();

const safeAreaInsetsBottom = appStore.systemInfo.safeAreaInsets.bottom + 'px';
let safeAreaInsetsTop = '15px';
// #ifdef MP-WEIXIN
const menuButton: GetMenuButtonBoundingClientRectRes = uni.getMenuButtonBoundingClientRect()
safeAreaInsetsTop = menuButton.height + appStore.systemInfo.safeAreaInsets.top + 15 + 'px';
// #endif
// #ifdef APP-PLUS
safeAreaInsetsTop = appStore.systemInfo.safeAreaInsets.top + 15 + 'px';
// #endif


let current = ref(0)
const swiperChange = (e: SwiperOnChangeEvent) => {
  current.value = e.detail.current
}
let isChecked = ref(false)
const checkboxChange = (e: CheckboxGroupOnChangeEvent) => {
  isChecked.value = e.detail.value.length ? true : false
}
const handlePrivacy = () => {
  let site = appStore.agreements[0]
  uni.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` })
}
const handleUserAgrement = () => {
  let site = appStore.agreements[1]
  uni.navigateTo({ url: `/pages/common/webview/index?title=${site.title}&url=${site.url}` })
}
const openApp = () => {
  if (!isChecked.value) {
    current.value = 3
    return uni.showToast({
      title: '请先勾选同意并接受',
      icon: 'none'
    } as ShowToastOptions)
  }
  appStore.launchFlag = true
  appStore.loadExecution()
}
</script>

<style scoped lang="scss">
page,
.guide {
  position: relative;
  height: 100vh;
  --news-afeAreaInsets-bottom: v-bind(safeAreaInsetsBottom);
  --news-afeAreaInsets-top: v-bind(safeAreaInsetsTop);
}

.swiper {
  height: calc(100% - var(--news-afeAreaInsets-bottom));

  .swiper-item {
    .image {
      height: 100%;
      width: 100%;
    }
  }
}

.right-top {
  @apply absolute right-12px text-center rd-full px-10px py-3px text-12px text-gray-6;
  top: var(--news-afeAreaInsets-top);
  border: 1px solid rgb(188, 184, 184);
}

.bottom {
  @apply absolute left-0 right-0 text-center gap-y-20px;
  bottom: calc(40px + var(--news-afeAreaInsets-bottom));

  .button {
    @apply py-8px px-25px bg-blue text-white inline-block rd-full mb-20px;

    .button-text {
      @apply flex justify-center gap-x-8px text-14px;
    }
  }

  .privacy {
    .checkbox-group {
      @apply inline-block;
    }

    .text {
      @apply text-12px text-gray-6;
    }

    .text-blue {
      @apply text-blue;
    }
  }
}
</style>