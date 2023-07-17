<template>
  <view class="my-history">
   <view v-if="list.length" class="item-avatar-one" v-for="item in list" :key="item.id">
           <view class="top"  @click="goToUser(item.article.user.id)">
            <u-avatar :src="item.article.user.avatar ? item.article.user.avatar : avatar" shape="square" size="36"></u-avatar>
             <view class="author" v-if="item.article.user">
               <a>{{item.article.user.nickname}}</a>
               <span class="introduce">{{isAttentionAuthor ? '已关注  .  ':'关注'}} .  {{item.createdAt | relativeTime}}  . {{item.article.user.introduce}}  </span>
             </view>
             <view class="right-bnt">
							 <u-button size="small"  @tap="onClickFocus(item.article.user_id)">{{isAttentionAuthor ? '已关注  .  ':'关注'}}</u-button>
             </view>
           </view>
           <view class="centre">
             <view class="left">
               <h1 @click="goToArticle(item.article.id)">{{item.article.title}}</h1>
             </view>
             <view class="right" @click="goToArticle(item.article.id)">
							 <u--image :showLoading="true" :src="item.article.cover_img" width="120px" height="90px" @click="click"></u--image>
             </view>
           </view>
           <view class="bottom">
						 <my-operation :article='item.article'></my-operation>
           </view>
         <my-share></my-share>
         </view>
				 
				 <view v-if="!list.length" class="empty">
				 	<u-empty mode="list"  text="暂无历史记录"/>
				 </view>
       </view>
   </template>

<script>
import {getUserArticleViewHistory} from '@/api/article'
export default {
  name: 'my-history',
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
    this.getUserArticleViewHistory(this.userId,this.query)
  },
  methods: {
    goToUser (id) {
     uni.navigateTo({ url: '/pages/user/index?user_id='+id});
    },
    goToArticle (id) {
    	uni.navigateTo({ url: '/pages/article/index?article_id=' + id });
    },
    async getUserArticleViewHistory(id,data){
       const res = await getUserArticleViewHistory(id,data)
       this.query.pageNum = res.pageNum
       this.query.pageSize = res.pageSize
       this.list = res.list
       this.total = res.total
     }
  }
}
</script>

<style lang="scss" scoped>
.my-history {
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
		justify-content: space-between;
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
      .introduce{
        max-width: 260px;
        overflow: hidden; //溢出内容隐藏
          text-overflow: ellipsis; //文本溢出部分用省略号表示
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical; //盒子中内容竖直排列
      }
    }
    .right-bnt{
      // float: right;
      // position: absolute;
      // right: 0;
      // top: -5px;
    }
  }
  .centre {
    display: flex;
    .left {
      // position: relative;
      display: flex;
      align-items:center;
      justify-content: space-between;
      width: 230px;
      margin-right: 14px;
      h1 {
        font-size: 16px;
        margin: 0;
      }
    }
    .right {
      border-radius: 4px;
      overflow: hidden;
    }
  }
	.bottom{
		padding: 15px 0px 10px 0px;
	}

}
</style>
