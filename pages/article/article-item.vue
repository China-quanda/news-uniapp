<template>
  <view
    ref="article-item"
  >
      <view class="Panel-item">
        <view class="item" v-for="item in  list" :key="item.id">
        <view class="avatar" v-if="showAvatar" @tap="goToUser(item.user_id)">
					<image class="user-avatar" :src="item.user.avatar" mode="widthFix"></image>
          <view class="author">
            <a>{{ item.user.nickname }}</a>
            <text class="introduce" >已关注 · {{item.user.introduce}}</text>
          </view>
        </view>
				
        <view  class="top"  v-if="cover.type === 0 || cover.type === 2 || cover.type === 3" @tap="goToArticle(item.id)" >
          <h1>{{ item.title }}</h1>
        </view>
				
        <view class="centre" v-if="cover.type === 2" @tap="goToArticle(item.id)">
					<image :lazy-load="true" :src="item.cover_img" mode="widthFix"/>
        </view>
				
        <view class="centre-3" v-if="cover.type === 3" @tap="goToArticle(item.id)">
					<view class="image">
						<image :src="item.cover_img" mode="widthFix"/>
					</view>
					<view class="image">
						<image :src="item.cover_img" mode="widthFix"/>
					</view>
					<view class="image">
						<image :src="item.cover_img" mode="widthFix" />
					</view>
        </view>
        <view>
          <view class="bottom-1" v-if="cover.type === 1">
            <view class="left">
              <h1 @tap="goToArticle(item.id)">{{ item.title }}</h1>
              <view class="left-bottom">
                <view>
                  <text class="author-name" v-if="!showAvatar">{{
                    item.user.nickname
                  }}</text>
                  <text class="comment">{{ item.comment_count }}评论</text>
                  <text class="read">{{ item.read_count }}观看</text>
                  <text class="time">{{ item.createdAt }}</text>
                </view>
                <view>
                  <!-- <i class="iconfont icon-cha" @tap="onClickCha"></i> -->
									<uni-icons type="closeempty" size="14" color="#999" @tap="onClickCha(item)"/>
                </view>
              </view>
            </view>
            <view class="right" @tap="goToArticle(item.id)">
							<image :src="item.cover_img" mode="widthFix" />
            </view>
          </view>
          <view
            class="bottom"
            v-if="cover.type === 0 || cover.type === 2 || cover.type === 3"
          >
            <view>
              <text class="author-name" v-if="!showAvatar">{{
                item.user.nickname
              }}</text>
              <text class="comment">{{ item.comment_count }}评论</text>
              <text class="read">{{ item.read_count }}观看</text>
              <text class="time">{{ item.createdAt }}</text>
            </view>
            <view>
							<uni-icons type="closeempty" size="14" color="#999" @tap="onClickCha(item)"/>
            </view>
          </view>
        </view>
        </view>
      </view>
  </view>
</template>

<script setup lang="ts">
	import {ref,reactive} from 'vue'
	import router from '@/utils/router';
	// import { debounce } from 'lodash'
	// import { getArticleList } from '@/api/article'
	const props = defineProps({
    config: {
      zero: false,
      one: false,
      two: false,
      three: false,
      showComment: true
      // showAuthorName: {
      //   type: Boolean,
      //   default: () => true
      // },
      // showComment: {
      //   type: Boolean,
      //   default: true
      // },
			// ,
   //    showAvatar: {
   //      type: Boolean,
   //      default: true
   //    },
      // showRead: {
      //   type: Boolean,
      //   default: true
      // },
      // showTime: {
      //   type: Boolean,
      //   default: true
      // }
    },
    list: {
      type: Array,
      required: true // 暂时不必填
    }
  })

	// 是否显示图片
	let showAvatar =ref<boolean>(false)
	let cover = {
		// 封面类型 0 无图；1 右边1张图；2 一张大图；3 三张图片；
        type: 1, 
				// 图片数组
        images: [] 
  }
	const goToUser = (id) =>{
		router.push('/pages/user/index?user_id='+id)
	}
	const goToArticle =(id)=> {
		router.push('/pages/article/info?article_id=' + id)
	}
	const onClickCha =() =>{
	  console.log('点击了差')
	  // this.isCha = true
	  // bus.$emit('onClickCha')
	}
</script>

<style lang="scss" scoped>
	// .Panel-item{
	// 	background-color: rgb(245, 243, 243);
	// }
.article-home {
  position: fixed;
  left: 0;
  right: 0;
  top: 97.95px;
  bottom: 50px;
  overflow-y: auto;
  background-color: rgb(245, 243, 243);
}

.item {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 15px 15px;
  box-sizing: border-box;
  // height:330px;
  margin-top: 8px;
  background-color: #fff;
  .avatar {
    display: flex;
    margin-bottom: 10px;
		.user-avatar{
			width: 36px;
		}
    .author {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
      a {
        font-size: 14px;
        font-weight: 500;
      }
      text {
        font-size: 10px;
        color: #ccc;
      }
      .introduce{
        max-width: 190px;
        overflow: hidden; //溢出内容隐藏
          text-overflow: ellipsis; //文本溢出部分用省略号表示
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical; //盒子中内容竖直排列
      }
    }
  }
  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    h1 {
      font-size: 16px;
      line-height:23px;
      margin: 0;
      overflow: hidden; //溢出内容隐藏
        text-overflow: ellipsis; //文本溢出部分用省略号表示
        display: -webkit-box; //特别显示模式
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical; //盒子中内容竖直排列
    }
  }
  .centre {
    width: 100%;
    height: 200px;
    border-radius: 4px;
        overflow: hidden;
    margin-top: 5px;
    // .van-image {
    //   width: 100%;
    //   height: 200px;
    // }
  }
  .centre-3 {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    border-radius: 4px;
    overflow: hidden;
				
    .image {
      width: 114px;
      height: 90px;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    .icon-cha {
      font-size: 12px;
      color: #ccc;
    }
    text {
      font-size: 12px;
      color: #ccc;
      margin-right: 10px;
    }
  }
  .bottom-1 {
    display: flex;
    box-sizing: border-box;
    height: 90px;
    .left {
      // position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      width: 230px;
      margin-right: 14px;
      h1 {
        font-size: 16px;
        line-height:23px;
        margin: 0;
        overflow: hidden; //溢出内容隐藏
        text-overflow: ellipsis; //文本溢出部分用省略号表示
        display: -webkit-box; //特别显示模式
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical; //盒子中内容竖直排列
      }
      .left-bottom {
        display: flex;
        justify-content: space-between;

        .icon-cha {
          font-size: 12px;
          color: #ccc;
        }
        text {
          font-size: 12px;
          color: #ccc;
          margin-right: 10px;
        }
      }
    }
    .right {
      width: 120px;
      // height: 99px;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
