<template>
  <view class="wrap">
    <!-- 顶部 -->
		<my-nav-bar rightText="搜索" :clickLeft="clickLeft" leftWidth="60rpx" rightWidth="120rpx">
			<view class="nav-view">
				<view v-if="showUser" class="user" >
					<view class="user-info" @tap="goToUser(article.user_id)">
						<image class="user-avatar" :src="article?.user?.avatar" mode="widthFix"/>
						<text>{{article?.user?.nickname}}</text>
					</view>
					<!-- <button class="mini-btn" type="default" size="mini">按钮</button> -->
					<view class="user-btn" @tap="gzUser(article?.user_id)">
						<uni-icons type="plusempty" size="12" color="#55a4f4" />
						<text>关注</text>
					</view>
				</view>
				<view v-else class="article-title" >
					<text>webpack2 + vue2 老项目迁移 vite 成功! 是真香啊webpack2 + vue2 老项目迁移 vite 成功! 是真香啊</text>
				</view>
			</view>
			<block v-slot:right>
				<view >
					<uni-icons type="search" size="18" color="#000" style="margin-right: 7.5px;" @tap="search"/>
					<uni-icons type="more-filled" size="18" color="#000" style="margin-left: 7.5px;" @tap="more"/>
				</view>
			</block>
		</my-nav-bar>
    <view class="container w" >
      <!-- 文章内容 -->
      <view class="article-content" ref="articleContent">
        <h1>{{article.title}}</h1>
        <!-- 文章作者 -->
        <view class="author" ref="author" v-if="article.user">
          <view class="author-left" @tap="goToUser(article.user_id)">
            <view class="author-avatar" >
							<!-- <u-avatar :src="article.user.avatar"  size="36"></u-avatar> -->
            </view>
            <view class="author-name">
              <h4>{{article.user.nickname}}</h4>
              <view class="author-more">
                <text>{{article.createdAt }}</text>
                <text> · </text>
                <text>{{article.user.introduce}}</text>
              </view>
            </view>
          </view>
          <view class="author-right">
						<!-- <u-button size="small" type="primary" @tap="onClickFocus(article.user_id)">{{isAttentionAuthor ? '已关注':'+关注'}}</u-button> -->
          </view>
        </view>
        <!-- 文章描述 -->
				<!-- <u-parse :content="article.content" ref="content" class="content"></u-parse> -->
				<rich-text :nodes="article.content"></rich-text>
        <!-- <article class="content" ref="content" style="text-align: center; width: 100%; overflow: hidden;" v-html="article.content"> -->
          <!-- <view v-html="article.content"></view> -->
        <!-- </article> -->
      </view>
      <!-- 相关搜索 -->
      <!-- <MyPanel title="相关推荐" showTitle>
        <ArticleItem :config="config"></ArticleItem>
      </MyPanel> -->
      <!-- <MyPanel :title="'评论 ' + total + ''" showTitle>
        <ArticleComment @onShowPost="siPostshow=true" :articleId="articleId"/>
      </MyPanel> -->
    </view>
    <!-- 底部区域 -->
    <!-- <CommentAction  @onShowPost="siPostshow=true" :articleId="articleId"/> -->
    <!-- 分享 -->
    <!-- <my-share /> -->
    <!-- 发布评论 -->
   <!-- <u-popup
    :show="siPostshow"
    mode="bottom"
		@close="siPostshow = false"
    >
    <PostComment :articleId="articleId" />
    </u-popup> -->
  </view>
</template>
<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import router from '@/utils/router';
	import storage from '@/utils/storage';
	import { getArticleId } from '@/api/article'
	// import MyPanel from './components/My-panel.vue'
	// import ArticleItem from '@/pages/index/Article-item.vue'
	// import ArticleComment from './components/article-comment.vue'
	// import CommentAction from './components/comment-action.vue'
	// import NavBar from './components/My-NavBar.vue'
	// import PostComment from './components/post-comment.vue'
	
	// import { addUserFollowings,deleteUserFollowings,isWage } from '@/api/user'
	// import bus from '@/utils/bus'
	// import {mapGetters} from 'vuex'
	let total = ref<number>(2980)
	let showUser = ref<boolean>(true)
	let siPostshow = ref<boolean>(false)
	let config = reactive({
        showAuthorName: true,
        showRead: true,
        // showAvatar: true
        one: true,
        showAvatar: false
  })
	let articleId = ref<number>(0)
	let article = ref({})
	let author_id = ref<number>(0)
	let isAttentionAuthor = ref<boolean>(false)
	let token = ref<string>('')
	onLoad((o)=>{
		articleId.value = o.article_id
		getArticle(o.article_id)
		token.value	= storage.get('token')
		
	})
	const clickLeft = () => {
		router.back()
	};
	const gzUser = (id) => {
		console.log('id',id);
	};

	const clickCentre = () => {
		console.log('clickCentre');
		// router.push('../search/index');
	};
	const search = () => {
		console.log('search');
		router.push('../search/index');
	}
	const more = () => {
		console.log('more');
		// router.push('../search/index');
	}
	const isWage = async(id)=>{
		if(!token.value) return console.log('去登录');
		const res = await isWage(id)
		if(res){
		  isAttentionAuthor.value = true
		   // console.log('当前状态已关注');
		}else{
		  // console.log('当前状态未关注');
		  isAttentionAuthor.value = false
		}
	}
	const goToUser = (id)=>{
		console.log(id);
	}
	const onClickFocus = async (author_id)=>{
		if(!token.value) return console.log('去登录');
		if(isAttentionAuthor.value){
		  // 发起请求取消关注
		   await deleteUserFollowings(author_id)
		  // console.log('取消关注作者成功');
		  isAttentionAuthor.value = false
		}else{
		  // 发起请求关注
		  const re = await addUserFollowings({follerd_id:author_id})
		  if(!re) return console.log('关注失败');
		  // console.log('关注作者成功');
		  isAttentionAuthor.value = true
		}
	}
	const getArticle = async(id)=>{
		const res = await getArticleId(id)
		 article.value = res?.data
		 console.log(article);
		author_id.value = article.user_id
		uni.setNavigationBarTitle({
		  title: article.value.title
		})
		// this.isWage(this.author_id)
		// this.$nextTick(() => {
		//   this.handlePerviewImage()
		// })
	}
	const handlePerviewImage = ()=>{
		// 1获取文章内容 dom 容器
		const articleContent = this.$refs.content
		// 2得到所有的img标签
		let imgs = articleContent.querySelectorAll('img')
		const imgPaths = []
		// 3循环img列表，给img注册点击事件
		imgs.forEach((img, index) => {
		  imgPaths.push(img.src)
		  img.onclick = function () {
		    ImagePreview({
		      images: imgPaths, // 预览图片路径
		      startPosition: index// 图片起始位置
		    })
		  }
		})
	}

</script>

<style lang="scss" scoped>
.container {
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 50px;
  // top: 46px;
  // overflow-y: auto;
}
.nav-view {
	// display: flex;
	flex: 1;
	
	.article-title {
		// height: 30px;
		// width: 100%;
		// line-height: 30px;
		// padding: 0 5px;
		// font-size: 12px;
		text-align: center;
		overflow: hidden; //溢出内容隐藏
		  text-overflow: ellipsis; //文本溢出部分用省略号表示
		  display: -webkit-box; //特别显示模式
		  -webkit-line-clamp: 1; //行数
		  -webkit-box-orient: vertical; //盒子中内容竖直排列
		
	}
	
	.user{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		.user-info{
			display: flex;
			align-items: center;
			.user-avatar{
				width: 25px;
				height: 25px;
				margin-right: 10px;
				border-radius: 50%;
			}
		}
		.user-btn{
			margin-left: 15px;
			font-size: 12px;
			border-radius: 8px;
			padding: 2px 6px;
			color: #55a4f4;
			background-color: #e1e7f7;
		}
	}
}
.article-content {
  // background-color:#000;
  padding: 5px 15px;
  // margin-top: 46px;
  h1 {
    text-align: left;
    font-size: 22px;
  }
  .author {
    color: #000;
    // height: 40px;
    // background-color: antiquewhite;
    display: flex;
    justify-content: space-between;
    .author-left {
      display: flex;
      .author-avatar {
        margin-top: 5px;
        margin-right: 15px;
      }
      .author-name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 14px;
        // margin-top:4px;
        h4 {
          margin: 0;
        }
        text {
          margin-right: 2px;
        }
      }
      .author-more {
        color: rgb(200, 195, 195);
        font-size: 12px;
        width: 200px;
        margin-right: 10px;
        overflow: hidden; //溢出内容隐藏
          text-overflow: ellipsis; //文本溢出部分用省略号表示
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 1; //行数
          -webkit-box-orient: vertical; //盒子中内容竖直排列
      }
    }
    .author-right {
    }
  }
  .content {
		// width: 100% !important;
		margin-top: 10px;
    font-size: 16px;
    p {
      line-height: 28px;
      color: #000;
    }
    img {
			text-align: center;
      width: 100%;
      height: auto;
      border-radius: 5px;
    }
  }
}
</style>
