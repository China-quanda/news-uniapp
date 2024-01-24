<template>
	<view class="container">
		<!-- 顶部 -->
		<my-nav-bar v-if="true" :clickLeft="back" leftWidth="60rpx" rightWidth="120rpx">
			<view class="user" v-if="showNavBarAuthor">
				<view class="user-info" @tap="goToUser(articleInfo.user.id)">
					<my-avatar :src="articleInfo?.user?.avatar" width="26px" height="26px" iconSize="16" />
					<my-text bold lines="1" style="margin:0px 8px;">{{ articleInfo?.user?.username }}</my-text>
				</view>
				<my-button type="primary" :plain="isFocuAuthor" :text="isFocuAuthor ? '已关注' : '+ 关注'" size="mini"
					@tap="focuAuthor(articleInfo?.user.id)" />
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
		<view v-if="true" class="article-content" ref="articleContent">
			<h1>{{ articleInfo.title }}</h1>
			<!-- 文章作者 -->
			<info-author id="author" :article="articleInfo" :isWage="isFocuAuthor" @onIsWage="isFocuAuthor = $event" />
			<!-- 文章描述 -->
			<rich-text class="content" :nodes="articleInfo.content" ref="content" />
		</view>

		<!-- 相关搜索 暂时不需要-->

		<!-- 相关推荐 -->
		<my-panel title="相关推荐" radius="8b"  bold :border="false">
			<article-item v-for="(item,index) in tjarticleList" :key="index" :info="item"/>
		</my-panel>

		<!-- 评论组件 -->
		<article-comment ref="articleCommentRef" :id="articleId"/>

		<!-- 底部区域 -->
		<info-action v-if="articleInfo.id" class="info-action" :id="articleId" :info="articleInfo"
			@onRefresh="loadArticleInfo" @onClickComment="articleCommentRef.popupOpen" />
		<view style="height: 44px;"></view>
	</view>
</template>
<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { onLoad, onPageScroll } from '@dcloudio/uni-app';
	import { shareSystem } from '@/utils/share'
	import router from '@/utils/router';
	import prompt from '@/utils/prompt';
	import { useAppStore } from '@/store/app'
	const { appName } = useAppStore()
	import { useUserStore } from '@/store/user'
	const userStore = useUserStore()
	import { getArticleById ,getArticleList} from '@/api/article';
	import { addFocus, isFocus, destroyFocus } from '@/api/fans'
	import infoAuthor from './components/info-author.vue';
	import infoAction from './components/info-action.vue';
	import articleItem from './components/article-item.vue';
	import articleComment from './components/article-comment.vue'

	const articleCommentRef = ref(null)
	const articleId = ref<number>(0)
	const articleInfo = ref({})
	const showNavBarAuthor = ref<boolean>(true)
	const isFocuAuthor = ref<boolean>(false)
	const authorId = ref<number>(0)
	const tjarticleList = ref([])
	const back = () => { router.back() };
	const goToUser = (userId) => {
		console.log('userId', userId);
	}
	const focuAuthor = async (id) => {
		if (!userStore.token) return console.log('去登录');
		if (isFocuAuthor.value) {
			const res = await destroyFocus(id)
			if (res.data.destroy) {
				isFocuAuthor.value = false
			}
		} else {
			const res = await addFocus(id)
			if (res.data.isFocu) {
				isFocuAuthor.value = true
			}
		}
	};

	const search = () => {
		console.log('search');
		router.push('../search/index');
	}
	const more = () => {
		console.log('more');
		// #ifdef APP-PLUS
		shareSystem({
			type: 'text',
			title: articleInfo.value.title,
			content: articleInfo.value.title,
		})
		// #endif
	}
	const loadArticleInfo = () => {
		getArticleById(articleId.value).then(res => {
			articleInfo.value = res.data
			authorId.value = res.data.user.id

			uni.setNavigationBarTitle({
				title: articleInfo.value.title
			})

			// nextTick(() => {
			//   handlePerviewImage()
			// })

			if (!userStore.token) return console.log('未登录 不去判断当前用户是否关注');
			isFocus(authorId.value).then(res => {
				if (res.data?.isFocus) {
					isFocuAuthor.value = true
				}
			})
		})
	}
	// const onClickComment = () => {
	// 	articleCommentRef.value.popupOpen()
	// }
	onLoad((o) => {
		articleId.value = o?.articleId ?? 0
		loadArticleInfo()
		getArticleList({pageSize:4}).then(res=>{
			tjarticleList.value =  res.data.list
			console.log('tjarticleList.value',tjarticleList.value);
		})
	})


	// let time = ref(null)
	onPageScroll((e) => {
		// clearTimeout(time.value)
		// time.value = setTimeout(()=>{

		// },300)
		const query = uni.createSelectorQuery().in(this);
		query.select('#author').boundingClientRect(data => {
			// #ifdef H5
			if (data.top <= 0) {
				showNavBarAuthor.value = true
			} else {
				showNavBarAuthor.value = false
			}
			// #endif
			// #ifdef APP-PLUS
			if ((Number(data.top) - 44) <= 0) {
				showNavBarAuthor.value = true
			} else {
				showNavBarAuthor.value = false
			}
			// #endif

		}).exec();
	})


	const handlePerviewImage = () => {
		// 1获取文章内容 dom 容器
		const articleContent = this.$refs.content
		// 2得到所有的img标签
		let imgs = articleContent.querySelectorAll('img')
		const imgPaths = []
		// 3循环img列表，给img注册点击事件
		imgs.forEach((img, index) => {
			imgPaths.push(img.src)
			img.onclick = function () {
				// ImagePreview({
				//   images: imgPaths, // 预览图片路径
				//   startPosition: index// 图片起始位置
				// })
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
			font-size: 19px;
		}

		.content {
			font-size: 14px;

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

	.info-action {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		border-top: 1px solid rgb(245, 245, 245);
	}
	.my-panel{
		padding: 0px;
		:deep(.my-panel-header){
			padding: 0px 12px;
		}
	}
</style>