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
// import {mapGetters} from 'vuex'
// import bus from '@/utils/bus'
import { ref, onBeforeMount } from 'vue';
const emits = defineEmits(['onAction']);
const props = defineProps({
	articleId: {
		type: [Number, String]
		// required: true
	}
});
let like = ref(false);
let star = ref(false);
let starTotal = ref(0);
let likeTotal = ref(0);
let commentTotal = ref(0);
const tapItem = value => {
	emits('onAction', value);
};
const ontapShare = () => {
	// this.$toast('点击分享')
	bus.$emit('onClickShare');
};

// 点赞或取消点赞
const ontapLike = async () => {
	if (!this.token) return console.log('去登录');
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
const ontapComment = () => {
	if (!this.$route.hash) {
		this.$router.push('#comment');
		bus.$emit('ontapComment');
	}
};
// 收藏或取消收藏
const ontapStar = async () => {
	if (!this.token) return console.log('去登录');

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
	if (!this.token) return console.log('去登录');
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
	if (!this.token) return console.log('去登录');
	const res = await getArticleCollectionsId(id);
	if (res) {
		// console.log('当前状态已收藏');
		this.star = false;
	} else {
		// console.log('当前状态未收藏');
		this.star = true;
	}
};
onBeforeMount(() => {
	// getArticleLikingsId(props.articleId)
	// getArticleCollectionsId(props.articleId)
});
</script>
<style lang="scss" scoped>
.info-action {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	height: 44px;
	display: flex;
	border-top: 1px solid rgb(245, 245, 245);
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
