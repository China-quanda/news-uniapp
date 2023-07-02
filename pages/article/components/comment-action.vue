<template>
  <view class='comment-action'>
    <view @tap="$emit('onShowPost')">
      <button class="comment" >
				<i class="iconfont icon-chuangzuo" style="font-size: 12px; margin-right: 2px;"/>
				你想说点什么...
				</button>
    </view>
    <view>
			<i class="iconfont icon-xiaoxi" @tap="ontapComment" />
    </view>
     <view>
			 <i v-if="star" class="iconfont icon-shoucang" @tap="ontapStar" />
			 <i v-else class="iconfont icon-shoucang1" @tap="ontapStar" />
     </view>
     <view>
			 <i v-if="like" class="iconfont icon-dianzan" @tap="ontapLike" />
			 <i v-else class="iconfont icon-dianzan_kuai" @tap="ontapLike" />
     </view>
		 <i class="iconfont icon-fenxiang" @tap="ontapShare" />
   </view>
</template>

<script>
import { addArticleLikings,deleteArticleLikings,addArticleCollections,deleteArticleCollections,getArticleLikingsId,getArticleCollectionsId} from '@/api/article'
import {mapGetters} from 'vuex'
import bus from '@/utils/bus'
export default {
  name: 'CommentAction',
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      // required: true
    }
  },
  data () {
    return {
      commentTotal: 0,
      like: true,
      star: true
    }
  },
  computed:{
    ...mapGetters(['token'])
  },
  created () {
    this.getArticleLikingsId(this.articleId)
    this.getArticleCollectionsId(this.articleId)
  },
  methods: {
    async getArticleCollectionsId(id){
      if(!this.token) return console.log('去登录');
      const res = await getArticleCollectionsId(id)
      if(res){
        // console.log('当前状态已收藏');
        this.star = false
      }else{
        // console.log('当前状态未收藏');
        this.star = true
      }

    },
    // 查看当前文章是否已点赞
    async getArticleLikingsId(id){
      if(!this.token) return console.log('去登录');
      const res = await getArticleLikingsId(id)
      if(res){
        // console.log('当前状态已点赞');
        this.like = false
      }else{
        // console.log('当前状态未点赞');
        this.like = true
      }
    },
    // 点击评论按钮，跳转到评论喵点
    ontapComment () {
      if (!this.$route.hash) {
        this.$router.push('#comment')
        bus.$emit('ontapComment')
      }
    },
    // 收藏或取消收藏
    async ontapStar () {
      if(!this.token) return console.log('去登录');

      if(this.star){
      const res = await addArticleCollections({article_id:this.articleId})
      if(!res) return console.log('已经收藏过文章了，发请求取消收藏文章');
      // console.log('收藏文章成功');
      this.star = false
      }else{
        const re = await deleteArticleCollections(this.articleId)
        if(!re) return console.log("取消收藏文章失败");
        // console.log('取消收藏文章成功');
        this.star = true
      }
    },
    // 点赞或取消点赞
    async ontapLike () {
      if(!this.token) return console.log('去登录');
      if(this.like){
        const res = await addArticleLikings({article_id:this.articleId})
        if(!res)return console.log("已经点赞过文章了，发请求取消点赞文章");
        // console.log('点赞文章成功');
         this.like = false
      }else{
        const re = await deleteArticleLikings(this.articleId)
        if(!re) return console.log("取消点赞文章失败");
        // console.log('取消点赞文章成功');
        this.like = true
        }
    },
    ontapShare () {
      // this.$toast('点击分享')
      bus.$emit('onClickShare')
    }
  }
}
</script>
<style lang="scss" scoped>
	.iconfont{
		font-size: 24px;
	}
	.icon-shoucang1,.icon-dianzan_kuai{
		color: rgb(114, 138, 233);
	}
.comment-action{
  position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid rgb(245, 245, 245);
  justify-content: space-around;
  align-items: center;
  // line-height: 50px;
  box-sizing: border-box;
  background-color: #fff;
  bottom: 0;
  .comment{
    font-size: 12px;
    // border-radius:1px solid #ccc;
    padding: 0 19px;
    // margin: 5 15px;
    border:none;
    height: 30px;
    border-radius: 50px;
  }
  .van-icon-star,.van-icon-good-job{
    color: rgb(114, 138, 233);
  }
}
</style>
