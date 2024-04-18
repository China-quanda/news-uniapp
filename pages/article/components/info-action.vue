<template>
  <view class="article-info-action-container">
    <!-- 操作盒子 -->
    <view :class="['action-wrapper', fixed ? 'is-fixed' : '', border ? 'is-border' : '']">
      <view class="action-item" @click="clickItem('comment')">
        <text class="iconfont icon-xiaoxi "></text>
        <text class="action-item-text">{{ info.commentCount ? info.commentCount : '评论' }}</text>
      </view>

      <view class="action-item" @click="clickItem('collect')">
        <text class="iconfont " :class="[collect ? 'icon-shoucang1' : 'icon-shoucang']"
          :style="{ color: collect ? '#728ae9' : '#8a8a8a' }"></text>
        <text class="action-item-text">{{ info.collectCount ? info.collectCount : '收藏' }}</text>
      </view>

      <view class="action-item" @click="clickItem('like')">
        <text class="iconfont " :class="[like ? 'icon-dianzan_kuai' : 'icon-dianzan']"
          :style="{ color: like ? '#728ae9' : '#8a8a8a' }"></text>
        <text class="action-item-text">{{ info.likeCount ? info.likeCount : '点赞' }}</text>
      </view>

      <view class="action-item" @click="clickItem('share')">
        <text class="iconfont icon-fenxiang "></text>
        <text class="action-item-text">分享</text>
      </view>
    </view>
    <!-- fixed定位固定在底部时，是否生成一个等高元素防止塌陷 -->
    <view class="placeholder" v-if="fixed && placeholder"></view>
    <!-- 是否为iPhoneX留出底部安全距离 -->
    <view class="safeArea-inset-bottom-height" v-if="fixed && safeAreaInsetBottom"></view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'onRefresh'): void
  (e: 'onClickShare'): void
  (e: 'onClickLike'): void
  (e: 'onClickComment'): void
  (e: 'onClickCollect'): void
}>()

interface IPorps {
  type?: string
  info: any
  safeAreaInsetBottom?: boolean//是否为iPhoneX留出底部安全距离
  placeholder?: boolean//fixed定位固定在底部时，是否生成一个等高元素防止塌陷
  fixed?: boolean//是否固定在底部
  border?: boolean//是否显示顶边框
};

const porps = withDefaults(defineProps<IPorps>(), {
  type: 'article',
  border: false,
  fixed: false,
  safeAreaInsetBottom: true,
  placeholder: true
});
const safeAreaInsetsBottomHeight = ref('0px')
watchEffect(() => {
  if (porps.fixed && porps.safeAreaInsetBottom) {
    const systemInfo = uni.getSystemInfoSync()
    safeAreaInsetsBottomHeight.value = (systemInfo!.safeAreaInsets?.bottom! || 0) + 'px';
  }
})


const clickItem = (value: any) => {
  emit('onAction', value);
  if (value === 'share') handleShare()
  if (value === 'like') handleLike()
  if (value === 'comment') handleComment()
  if (value === 'collect') handleCollect()
};

const like = ref(false);
// 查看当前文章是否已点赞
const hshLike = () => {

};
// 点赞或取消点赞
const handleLike = async () => {

};
const collect = ref(false);
// 查看当前文章是否已点赞
const hshCollect = () => {

};
// 收藏或取消收藏
const handleCollect = async () => {

};
// 点击分享
const handleShare = () => {

};

// 点击评论按钮，跳转到评论喵点
const handleComment = () => {
  emit('onClickComment')
};

onMounted(() => {
  hshLike()
  hshCollect()
})
</script>

<style scoped lang="scss">
.article-info-action-container {
  --safeArea-insets-bottom-height: v-bind(safeAreaInsetsBottomHeight);
  --news-action-height: calc(44px + var(--safeArea-insets-bottom-height));

  .action-wrapper {
    height: var(--news-action-height);
    padding-bottom: var(--safeArea-insets-bottom-height);
    @apply flex flex-items-center justify-around box-border bg-white;

    .action-item {
      @apply flex flex-items-center;

      .iconfont {
        @apply text-20px;
      }

      .action-item-text {
        @apply text-14px ml-8px;
      }
    }
  }

  .is-fixed {
    @apply fixed right-0 left-0 bottom-0;
  }

  .is-border {
    border-top: 1px solid rgb(245, 245, 245);
  }

  .placeholder {
    height: calc(var(--news-action-height) - var(--safeArea-insets-bottom-height));
  }

  .safeArea-inset-bottom-height {
    height: var(--safeArea-insets-bottom-height);
  }

}
</style>