<template>
	<view class="info-action">
		<view class="info-action-row" @tap="tapItem('comment')">
			<my-icon icon="icon-xiaoxi" size="23" />
			<my-text class="row-text">{{ commentTotal ? commentTotal : '评论' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('star')">
			<my-icon :icon="star ? 'icon-shoucang' : 'icon-shoucang1'" :color="star ? '' : '#728ae9'" size="23" />
			<my-text class="row-text">{{ starTotal ? starTotal : '收藏' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('like')">
			<my-icon :icon="like ? 'icon-dianzan' : 'icon-dianzan_kuai'" :color="like ? '' : '#728ae9'" size="23" />
			<my-text class="row-text">{{ likeTotal ? likeTotal : '点赞' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('share')">
			<my-icon icon="icon-fenxiang" size="23" />
			<my-text class="row-text">分享</my-text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	// import { addArticleLikings,deleteArticleLikings,addArticleCollections,deleteArticleCollections,getArticleLikingsId,getArticleCollectionsId} from '@/api/article'
	// import bus from '@/utils/bus'
	import { ref, onBeforeMount, reactive } from 'vue';
	import { shareSystem } from '@/utils/share'
	import { useUserStore } from '@/store/user'
	const userStore = useUserStore()
	import prompt from '@/utils/prompt';
	const emit = defineEmits<{
		(e : 'onAction', id : string) : void
	}>()

	interface IPorps {
		id : number
		type ?: string
	};

	const props = withDefaults(defineProps<IPorps>(), {
		type: 'article'
	});
	const info = reactive({
		"id": 3,
		"createTime": "2024-01-18 17:43:26.909349",
		"updateTime": "2024-01-18 17:47:39.000000",
		"title": "喊话各大流行UI库，你们的Select组件到底行不行啊？",
		"top": 0,
		"content": "种 UI 库的 Select，你们能不能人性化一点！最近在云效上合并代码，本想着懒的目的输入了非连续的关键字搜索分支，结果...",
		"coverType": 0,
		"coverImg": null,
		"commentCount": 1,
		"likeCount": 0,
		"collectCount": 0,
		"readCount": 0,
		"status": 1,
		"user": {
			"id": 1,
			"createTime": "2024-01-13 14:04:06.532955",
			"updateTime": "2024-01-18 21:20:52.902789",
			"username": "18171@qq.com",
			"password": "i6i8$2a$10$lHcYdsE1W8d4nTSfxFkKWOKMQR4VRrfUr/vYOwLyZYDRX7xa4iEDO",
			"avatar": "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
			"status": 1
		}
	})
	onBeforeMount(() => {
		// getArticleLikingsId(props.articleId)
		// getArticleCollectionsId(props.articleId)
	});
	let like = ref(false);
	let star = ref(false);
	let starTotal = ref(0);
	let likeTotal = ref(0);
	let commentTotal = ref(0);
	const tapItem = (value : any) => {
		emit('onAction', value);
		if (value === 'share') handleShare()
		if (value === 'like') handleLike()
		if (value === 'comment') handleComment()
		if (value === 'star') handleStar()
	};
	// 点击分享
	const handleShare = () => {
		// prompt.msg(`点击分享`)
		if (props.type === 'article') {
			shareSystem({
				type: 'text',
				title: info.title,
				content: info.title,
			})
		}
		if (props.type === 'comment') {
			shareSystem({
				type: 'text',
				title: info.content,
				content: info.content,
			})
		}
	};

	// 点赞或取消点赞
	const handleLike = async () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		if (this.like) {
			const res = await addArticleLikings({ article_id: this.articleId });
			if (!res) return console.log('已经点赞过文章了，发请求取消点赞文章');
			// console.log('点赞文章成功');
			this.like = false;
		} else {
			const re = await deleteArticleLikings(this.articleId);
			if (!re) return console.log('取消点赞文章失败');
			// console.log('取消点赞文章成功');
			this.like = true;
		}
	};
	// 点击评论按钮，跳转到评论喵点
	const handleComment = () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		// if (!this.$route.hash) {
		// 	this.$router.push('#comment');
		// }
	};
	// 收藏或取消收藏
	const handleStar = async () => {
		if (!userStore.token) return prompt.msg(`请先登录`)

		if (this.star) {
			const res = await addArticleCollections({ article_id: this.articleId });
			if (!res) return console.log('已经收藏过文章了，发请求取消收藏文章');
			// console.log('收藏文章成功');
			this.star = false;
		} else {
			const re = await deleteArticleCollections(this.articleId);
			if (!re) return console.log('取消收藏文章失败');
			// console.log('取消收藏文章成功');
			this.star = true;
		}
	};

	// 查看当前文章是否已点赞
	const getArticleLikingsId = async id => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		const res = await getArticleLikingsId(id);
		if (res) {
			// console.log('当前状态已点赞');
			this.like = false;
		} else {
			// console.log('当前状态未点赞');
			this.like = true;
		}
	};

	const getArticleCollectionsId = async id => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		const res = await getArticleCollectionsId(id);
		if (res) {
			// console.log('当前状态已收藏');
			this.star = false;
		} else {
			// console.log('当前状态未收藏');
			this.star = true;
		}
	};
</script>
<style lang="scss" scoped>
	.info-action {
		height: 44px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// line-height: 50px;
		box-sizing: border-box;
		background-color: #fff;
		bottom: 0;

		.comment {
			font-size: 12px;
			// border-radius:1px solid #ccc;
			padding: 0 19px;
			// margin: 5 15px;
			border: none;
			height: 30px;
			border-radius: 50px;
		}

		.info-action-row {
			display: flex;

			.row-text {
				margin-left: 8px;
			}
		}
	}
</style>