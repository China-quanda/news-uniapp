<template>
  <view class="my-comment">
    <view v-if="list.length" class="item-avatar-one" v-for="item in list" :key="item.id">
      <view class="top" @tap="goToUser(item.comment_user.id)">
				<u-avatar :src="item.comment_user.avatar ? item.comment_user.avatar : avatar" shape="square" size="36"></u-avatar>
        <view class="author">
          <a>{{item.comment_user.nickname}}</a>
          <span>{{item.createdAt | relativeTime}}</span>
        </view>
      </view>
      <view class="comment">{{item.content}}</view>
      <view class="centre">
        <view class="left">
          <view class="author" @tap="goToUser(item.comment_article.user.id)">
					<u-avatar :src="item.comment_article.user.avatar ? item.comment_article.user.avatar : avatar" shape="square" size="36"></u-avatar>
            <a>{{item.comment_article.user.nickname}}</a>
          </view>
          <h1 @tap="goToArticle(item.comment_article.id)">{{item.comment_article.title}}</h1>
        </view>
        <view class="right" @tap="goToArticle(item.comment_article.id)">
					<u--image :showLoading="true" :src="item.comment_article.cover_img ?  item.comment_article.cover_img : avatar" width="120px" height="90px" @click="click"></u--image>
        </view>
      </view>
      <view class="bottom">
        <!-- <my-operation :article='item.comment_article.id'></my-operation> -->
      </view>
    </view>
		
		<view v-if="!list.length" class="empty">
			<u-empty mode="data"  text="暂无评论内容"/>
		</view>
		
  </view>
</template>

<script>

import {getUserComment} from '@/api/comment'
export default {
  name: 'my-comment',

  props:{
    userId:{
      type:Number,
      required:false
    }
  },
  data () {
    return {
      query:{
        pageNum:1, pageSize:10
      },
      list:[],
      total:0,
      avatar:'https://img01.yzcdn.cn/vant/cat.jpeg',
			isAttentionAuthor:false
    }
  },
  created () {
    this.getUserComment(this.userId,this.query)
  },
  methods: {
    goToUser (id) {
     uni.navigateTo({ url: '/pages/user/index?user_id='+id});
    },
    goToArticle (id) {
    	uni.navigateTo({ url: '/pages/article/index?article_id=' + id });
    },
    async getUserComment(id,data){
       const res = await getUserComment(id,data)
       this.query.pageNum = res.pageNum
       this.query.pageSize = res.pageSize
       this.list = res.list
       this.total = res.total
       console.log(res);
     }
  }
}
</script>

<style lang="scss" scoped>
.my-comment {
  background-color: rgb(247, 247, 247);
  text-align: left;
}

.item-avatar-one {
  margin-top: 10px;
  padding: 15px 15px 5px 15px;
  box-sizing: border-box;
  background-color: #fff;
  .top {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .author {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
      a {
        font-size: 14px;
        font-weight: 500;
      }
      span {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .comment{
    margin-bottom: 5px;
    font-size: 16px;
  }
  .centre {
    display: flex;
    padding:10px;

    border: 1px solid rgb(237, 237, 237);
    border-radius: 10px;
    .left {
      // position: relative;
      display: flex;
      // align-items:center;

      flex-direction: column;
      // justify-content: space-between;
      width: 230px;
      margin-right: 14px;
      h1 {
        font-size: 16px;
        margin: 0;
      }
      .author {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        a {
            margin-left: 5px;
            font-size: 14px;
            font-weight: 500;
          }
      }
    }
    .right {
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
