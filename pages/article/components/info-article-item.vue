<template>
  <!-- 文章详情页item -->
  <view class="item-box">
    <view class="item-content">
      <view class="left-box">
        <text class="left-text ellipsis2">
          公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找网页的开源项目
          再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。
        </text>
        <view class="left-bottom">
          <view class="bottom-left">
            <view class="item">
              <text class="iconfont icon-touxiang"></text>
              <!-- 查看 -->
              <text class="text">你的Maya</text>
            </view>
            <view class="item">
              <text class="iconfont icon-dianzan"></text>
              <!-- 赞 -->
              <text class="text">111</text>
            </view>
            <view class="item">
              <text class="iconfont icon-pinglun"></text>
              <!-- 评论 -->
              <text class="text">111</text>
            </view>
          </view>
        </view>
      </view>
      <image v-if="isPic" class="right-image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
    </view>
  </view>
</template>

<script setup lang="ts">
const isPic = ref(true);
</script>

<style scoped lang="scss">
.item-box {
  @apply flex flex-col bg-white py-1 px-3;
}

.item-content {
  @apply mt-2;
  @apply flex justify-between h-18 overflow-hidden;

  .left-box {
    @apply flex-1 flex flex-col flex-items-center justify-center;

    .left-text {
      @apply text-3.5 text-gray-9 lh-6 font-500;
    }
  }

  .right-image {
    @apply w-23 h-18 rd-1 m-l-1.5 box-border;
  }

}

.left-bottom {
  @apply mt-2 w-full flex justify-between flex-items-center text-3 text-gray-6;

  .bottom-left {
    @apply flex justify-between flex-items-center;

    .item {
      @apply mr-3;

      .iconfont {
        @apply text-3.5 mr-1;
      }

      .text {
        @apply text-gray-5;
      }
    }
  }
}
</style>