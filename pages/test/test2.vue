<template>
  <view> {{ msg }} </view>
  <div>{{ msg1 }}</div>
  <view class="text-30px text-blue">
    test
  </view>
  <view class="w-40px h-30px bg-emerald text-white hover:(bg-gray-400 font-medium text-2xl text-38px)">
    1122
  </view>
  <button class="i-carbon-sun dark:i-carbon-moon">button</button>
  <view class="btn ">
    自定义按钮
  </view>
</template>

<script setup lang="ts">
const msg = ref('msg')
const msg1 = ref('msg1')
onLoad(() => {
  console.log(11);
})
</script>

<style scoped lang="scss">
.btn{
  @apply p-1 bg-gray-400 text-10
}
</style>