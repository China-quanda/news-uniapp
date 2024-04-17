<template>
  <view class="h">
    <homeArticleItem class="mb-2.5" :type="type" :isGzUser="isGzUser" />
    <homeArticleItem class="mb-2.5" :type="type" :isGzUser="isGzUser" />

    <view @click="isGzUser = !isGzUser">显示关注用户</view>
    <view @click="type = 0">无图</view>
    <view @click="type = 1">右侧一张小图</view>
    <view @click="type = 2">一张大图</view>
    <view @click="type = 3">三张小图</view>
  </view>
</template>

<script setup lang="ts">
import homeArticleItem from '@/pages/article/components/home-article-item.vue'

const type = ref(1)
const isGzUser = ref(false)

</script>

<style scoped lang="scss">
page,
.h {
  min-height: 100vh;
  background-color: #f5f2f2;
}
</style>