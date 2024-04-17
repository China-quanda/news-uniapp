<template>
  <!-- 首页文章item -->
  <view class="item-box">
    <!-- 标题 -->
    <view class="item-title" v-if="true">公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找网页的开源项目
      再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。</view>
    <!-- 用户 -->
    <view class="item-user" v-if="isGzUser && type !== 1">
      <image class="user-pic" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
      <text class="user-name">你的Maya</text>
    </view>
    <!-- 内容 -->
    <view class="item-content">
      <!-- 无图片 -->
      <text class="content-text" v-if="type === 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatum.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        voluptatum.
      </text>
      <!-- 一张图片-右侧小图 -->
      <view class="content-right-image" v-if="type === 1">
        <view class="left-box">
          <view class="item-user" v-if="isGzUser">
            <image class="user-pic" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
            <text class="user-name">你的Maya</text>
          </view>
          <text :class="[isGzUser ? 'ellipsis2' : 'ellipsis3', 'left-text']">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            voluptatum.
          </text>
        </view>
        <image class="right-image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
      </view>
      <!-- 一张图片-一张大图 -->
      <image class="content-max-image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" v-if="type === 2" />
      <!-- 三张小图排一行 -->
      <view class="content-three-image" v-if="type === 3">
        <image class="image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
        <image class="image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
        <image class="image" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
      </view>
    </view>
    <!-- 底部 -->
    <view class="item-bottom" v-if="true">
      <view class="bottom-left">
        <view class="item">
          <text class="iconfont icon-dianzan"></text>
          <!-- 查看 -->
          <text class="text">111</text>
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
        <view class="item">
          <text class="iconfont icon-shoucang"></text>
          <!-- 收藏 -->
          <text class="text">111</text>
        </view>
        <view class="item">
          <text class="iconfont icon-lishi"></text>
          <text class="text">18小时前</text>
        </view>
      </view>
      <view class="bottom-right">
        <text class="iconfont icon-gengduo1"></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  // 类型 0:无图片；1:一张图片-右侧小图；2:一张图片-一张大图；3:三张小图排一行
  type: {
    type: Number,
    default: 1
  },
  // 是否显示关注的用户
  isGzUser: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.item-box {
  @apply flex flex-col bg-white py-4 px-3;
}

.item-title {
  @apply text-3.8 font-500 text-coolgray-9 lh-5.3;
  @include ellipsis(2);
}

.item-user {
  @apply flex items-center mt-1.8;

  .user-pic {
    @apply w4.5 h4.5 rd-full box-border border-1px border-solid border-gray-2;
  }

  .user-name {
    @apply ml-1.5 text-3 text-gray-6;
  }
}

.item-content {
  @apply mt-2;

  .content-text {
    @apply text-3.2 text-gray-6 lh-6;
    @include ellipsis(3);
  }

  .content-right-image {
    @apply flex justify-between h-18 overflow-hidden;

    .left-box {
      @apply flex-1;

      .item-user {
        @apply m-t-0;
      }

      .left-text {
        @apply text-3.5 text-gray-6 lh-6;
      }
    }

    .right-image {
      @apply w-23 h-18 rd-1 m-l-1.5 box-border;
    }
  }

  .content-max-image {
    @apply w-full h55 rd-2;
  }

  .content-three-image {
    @apply flex justify-between rd-1 overflow-hidden;

    .image {
      @apply w-29 h-22;
    }
  }
}

.item-bottom {
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

.bottom-right {
  @apply text-2.8;
}
</style>