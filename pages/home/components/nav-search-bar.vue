<template>
	<view class="" :style="{ height: statusBarHeight + searchBarHeight +'px'}">
    <view class="fixed top-0 left-0 right-0">
     <view class="w-full bg-blue-400" :style="{ height: statusBarHeight + 'px'}"></view>
      <view class="flex flex-items-center bg-blue-400  py-2px px-13px box-border" :style="{ height: searchBarHeight + 'px'}">
        <view class="flex flex-items-center rounded-full flex-1 bg-gray-100 h-30px py-1px px-12px uni-weixin:h-25px!">
          <view class="iconfont icon-sousuo text-#999 text-15px uni-weixin:text-14px!"></view>
          <text class="text-14px ml-6px text-neutral-400 uni-weixin:text-13.5px!">你想搜索点什么</text>
        </view>
        <view class="flex flex-items-center text-center h-34px ml-8px" :style="{ marginRight: searchBarRight + 'px',marginLeft:searchBarRight?'10px':''}">
          <view class="iconfont icon-jiahao text-white text-15px uni-weixin:text-14px!"></view>
          <text class="ml-1px text-white text-13.5px uni-weixin:text-13px!">发布</text>
        </view>
      </view>
    </view>
	</view>
</template>

<script setup lang="ts">
const statusBarHeight = ref(0)
let menuButtonInfo = reactive({})
const searchBarHeight = ref(44)
const searchBarRight = ref(0)

onMounted(() => {
statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
// #ifdef MP-WEIXIN
menuButtonInfo = uni.getMenuButtonBoundingClientRect()
searchBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height
searchBarRight.value = menuButtonInfo.width + 10
// #endif
})
</script>

<style scoped lang="scss">

</style>