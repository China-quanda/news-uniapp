<template>
  <view class="my-collect">
   <!-- <view class="new-collect">
      <i></i><text>新建收藏夹</text>
    </view> -->

    <view v-if="list.length" class="item-avatar-one" v-for="item in list" >
			
			<view class="top"  @tap="goToUser(item.article.user.id)">
			   <u-avatar :src="item.article.user.avatar ? item.article.user.avatar : avatar" shape="square" size="36"></u-avatar>
			    <view class="author" v-if="item.article.user">
			      <a>{{item.article.user.nickname}}</a>
			      <span class="introduce" @tap="ontapFocus(item.article.user_id)">{{isAttentionAuthor ? '已关注  .  ':''}}  >已关注 .  {{item.createdAt | relativeTime}}  . {{item.article.user.introduce}}  </span>
			    </view>
			    <view class="right-bnt">
							<u-button size="small"  @tap="ontapFocus(item.article.user_id)">{{isAttentionAuthor ? '已关注  .  ':'关注'}}</u-button>
			    </view>
			  </view>
			  <view class="centre">
			    <view class="left">
			      <h1 @tap="goToArticle(item.article.id)">{{item.article.title}}</h1>
			    </view>
			    <view class="right" @tap="goToArticle(item.article.id)">
										 <u--image :showLoading="true" :src="item.article.cover_img" width="120px" height="90px" @tap="tap"></u--image>
			    </view>
			  </view>
			  <view class="bottom">
									 <my-operation :article='item.article'></my-operation>
			  </view>


    <my-share></my-share>
    </view>
		
		<view v-if="!list.length" class="empty">
			<u-empty mode="favor"  text="暂无收藏内容"/>
		</view>
  </view>
</template>

<script>
import {getUserArticleCollections} from '@/api/article'
import { addUserFollowings,deleteUserFollowings,isWage } from '@/api/user'
import {mapGetters} from 'vuex'
import bus from '@/utils/bus'
export default {
  name: 'my-collect',

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
  computed:{
    ...mapGetters(['token']),
    isgz(id){
      console.log(this.isWage(id));
      return this.isWage(id)
    }
  },
 created () {
   this.getUserArticleCollections(this.userId,this.query)
   this.isWage()
 },
  methods: {
		tap2(){
			bus.$emit('ontapShare')
		},
    goToUser (id) {
     uni.navigateTo({ url: '/pages/user/index?user_id='+id});
    },
    goToArticle (id) {
    	uni.navigateTo({ url: '/pages/article/index?article_id=' + id });
    },
    async getUserArticleCollections(id,data){
       const res = await getUserArticleCollections(id,data)
       this.query.pageNum = res.pageNum
       this.query.pageSize = res.pageSize
       this.list = res.list
       this.total = res.total
     },
     async isWage(id){
       // if(!this.token) return console.log('去登录');
       const res = await isWage(id)
       if(res){
         this.isAttentionAuthor = true
         return true
          // console.log('当前状态已关注');
       }else{
         // console.log('当前状态未关注');
         this.isAttentionAuthor = false
         return false
       }

     },
     async ontapFocus (author_id) {
       if(!this.token) return console.log('去登录');
       this.isWage(author_id)
       if(this.isAttentionAuthor){
         // 发起请求取消关注
          await deleteUserFollowings(author_id)
         // console.log('取消关注作者成功');
         this.isAttentionAuthor = false
       }else{
         // 发起请求关注
         const re = await addUserFollowings({follerd_id:author_id})
         if(!re) return console.log('关注失败');
         // console.log('关注作者成功');
         this.isAttentionAuthor = true
       }
     },
  }
}
</script>

<style lang="scss" scoped>
.my-collect {
  background-color: rgb(247, 247, 247);
  text-align: left;
}
.new-collect {
  margin:15px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #fff;
      border: 0.5px solid #ccc;
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
