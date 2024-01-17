<template>
	<view class="container">
		<!-- 顶部 -->
		<my-nav-bar :clickLeft="clickLeft" leftWidth="60rpx" rightWidth="120rpx">
			<view class="user" v-if="showNavBarAuthor">
				<view class="user-info" @tap="goToUser(article.user_id)">
					<my-avatar :src="article?.user?.avatar" width="26px" height="26px" iconSize="16"></my-avatar>
					<my-text bold lines="1" style="margin:0px 8px;">{{ article?.user?.nickname }}</my-text>
				</view>
				<my-button type="primary" :plain="isAttentionAuthor" :text="isAttentionAuthor ? '已关注' : '+ 关注'" size="mini" @tap="gzUser(article?.user_id)" />
			</view>
			<my-text v-else lines="1" style="margin-left: 8px;">{{ appName}}</my-text>
			<block v-slot:right>
				<view>
					<uni-icons type="search" size="18" color="#000" style="margin-right: 7.5px;" @tap="search" />
					<uni-icons type="more-filled" size="18" color="#000" style="margin-left: 7.5px;" @tap="more" />
				</view>
			</block>
		</my-nav-bar>

		<!-- 文章内容 -->
		<view class="article-content" ref="articleContent">
			<h1>{{ article.title }}</h1>
			<!-- 文章作者 -->
			<info-author id="author" :article="article" :isWage="isAttentionAuthor" />
			<!-- 文章描述 -->
			<rich-text class="content" :nodes="article.content" ref="content" />
		</view>

		<!-- 相关搜索 暂时不需要-->

		<!-- 相关推荐 -->
		<my-panel title="相关推荐" radius="8b" rightIcon="xx" bold :border="false"><article-item :config="config" :list="articleList"></article-item></my-panel>

		<!-- 评论组件 -->
		<article-comment v-show="showComment" />

		<!-- 底部区域 -->
		<info-action class="info-action" v-show="showAction" @onAction="onActionTap" />

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
		<view style="height: 44px;"></view>
	</view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { onLoad ,onPageScroll} from '@dcloudio/uni-app';
import router from '@/utils/router';
import storage from '@/utils/storage';
import {useAppStore} from '@/store/app'
const {appName} = useAppStore()
import { getArticleList } from '@/api/article';
import { getArticleId } from '@/api/article'
import infoAuthor from './components/info-author.vue';
import infoAction from './components/info-action.vue';
import articleItem from './components/article-item.vue';
import articleComment from './components/article-comment.vue'

// import { isWage } from '@/api/user'
// import bus from '@/utils/bus'
// import {mapGetters} from 'vuex'
let total = ref<number>(2980)
let showNavBarAuthor = ref<boolean>(false)
let showComment = ref<boolean>(true)
let showAction = ref<boolean>(true)
// let config = reactive({
//        showAuthorName: true,
//        showRead: true,
//        // showAvatar: true
//        one: true,
//        showAvatar: false
//  })
 let config = reactive({
 	showAuthorName: true,
 	showRead: true,
 	// showAvatar: true
 	one: true,
 	two: true,
 	three: true,
 	zero: true,
 	// showTime: true
 });
let articleId = ref<number>(0)
let article = ref({})
let author_id = ref<number>(0)
let isAttentionAuthor = ref<boolean>(false)
let token = ref<string>('')
let articleList = ref([]);
onLoad((o)=>{
	articleId.value = o.article_id
	getArticle(o.article_id)
	token.value	= storage.get('token')

	getArticleList().then(res => {
		articleList.value = res.data.list;
		console.log(articleList.value);
	});

})
// let time = ref(null)
onPageScroll((e)=>{
	// clearTimeout(time.value)
	// time.value = setTimeout(()=>{

	// },300)
	const query = uni.createSelectorQuery().in(this);
	query.select('#author').boundingClientRect(data => {
		// #ifdef H5
		if(data.top <= 0){
			showNavBarAuthor.value=true
		}else{
			showNavBarAuthor.value=false
		}
		// #endif
		// #ifdef APP-PLUS
		if((Number(data.top) - 44) <= 0){
			showNavBarAuthor.value=true
		}else{
			showNavBarAuthor.value=false
		}
		// #endif

	}).exec();
})
const onActionTap = (value)=>{
	console.log(value);
	if(value === 'comment'){
		showComment.value = !showComment.value
		showAction.value = false
	}
	// if(value === 'star') showComment.value = true
	// if(value === 'like') showComment.value = true
	// if(value === 'share') showComment.value = true
}

const clickLeft = () => {
	router.back()
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
const gzUser = (id) => {
	console.log('id',id);
};

const getArticle = async(id)=>{
	const res = await getArticleId(id)
	 article.value = res?.data
	 // console.log(article);
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
.user {
	flex: 1;
	animation: nav-view-in 0.3s linear;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.user-info {
		display: flex;
		// line-height: 10px;
		align-items: center;
	}
}
@keyframes nav-view-in {
	0% {
		opacity: 0.5;
	}
	100% {
		opacity: 1;
	}
}

.article-content {
	padding: 5px 12px;
	h1 {
		text-align: left;
		font-size: 22px;
	}

	.content {
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
.info-action{
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	border-top: 1px solid rgb(245, 245, 245);
}
</style>
