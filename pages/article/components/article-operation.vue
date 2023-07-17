<!-- 该组件未引用 用于我的收藏等文件下面 -->
<template>
	<div class="my-operation">
		<a @tap="onShare">
			<i class="iconfont icon-fenxiang"></i>
			<span>分享</span>
		</a>
		<a @tap="onComment">
			<i class="iconfont icon-pinglun"></i>
			<span>{{ article.comment_count > 0 ? article.comment_count : '评论' }}</span>
		</a>
		<a @tap="onLike">
			<i class="iconfont " :class="[isLike ? 'icon-dianzan_kuai' : 'icon-dianzan']"></i>
			<span>{{ article.like_count > 0 ? article.like_count : '赞' }}</span>
		</a>
		<a @tap="onCollect">
			<i class="iconfont " :class="[isCollect ? 'icon-shoucang1' : 'icon-shoucang']"></i>
			<span>{{ isCollect ? '已收藏' : '收藏' }}</span>
		</a>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
// import {mapGetters} from 'vuex'
// import bus from '@/utils/bus'
// ...mapGetters(['userId','token'])
// import { addArticleLikings,deleteArticleLikings,addArticleCollections,deleteArticleCollections,getArticleCollectionsId,getArticleLikingsId} from '@/api/article'
let article = reactive({});
let isCollect = ref<boolean>(false);
let isLike = ref<boolean>(false);
let token = ref<string>(null);
onMounted(() => {
	getArticleCollectionsIdd(article.id);
	getArticleLikingsId(article.id);
});
//点击分享

const onShare = () => {
	bus.$emit('ontapShare');
};
const onComment = () => {};
// 点击点赞或取消点赞
const onLike = async () => {
	if (!token.value) return console.log('去登录');
	if (!isLike.value) {
		const res = await addArticleLikings({ article_id: article.id });
		if (!res) return console.log('已经点赞过文章了，发请求取消点赞文章');
		// console.log('点赞文章成功');
		isLike.value = true;
		article.like_count = article.like_count + 1;
	} else {
		const re = await deleteArticleLikings(article.id);
		if (!re) return console.log('取消点赞文章失败');
		// console.log('取消点赞文章成功');
		isLike.value = false;
		article.like_count = article.like_count - 1;
	}
};
// 判断当前是否收藏该文章
const getArticleCollectionsIdd = id => {
	if (!token.value) return console.log('去登录');
	const res = await getArticleCollectionsId(id);
	if (res) {
		// console.log('当前状态已收藏');
		isCollect.value = true;
	} else {
		// console.log('当前状态未收藏');
		isCollect.value = false;
	}
};
// 判断当前是否点赞该文章
const getArticleLikingsId = id => {
	if (!token.value) return console.log('去登录');
	const res = await getArticleLikingsId(id);
	if (res) {
		// console.log('当前状态已点赞');
		isLike.value = true;
	} else {
		// console.log('当前状态未点赞');
		isLike.value = false;
	}
};
// 点击收藏或取消收藏
const onCollect = id => {
	if (!token.value) return console.log('去登录');
	if (!isCollect.value) {
		const res = await addArticleCollections({ article_id: article.id });
		if (!res) return console.log('已经收藏过文章了，发请求取消收藏文章');
		// console.log('收藏文章成功');
		isCollect.value = true;
	} else {
		const re = await deleteArticleCollections(article.id);
		if (!re) return console.log('取消收藏文章失败');
		// console.log('取消收藏文章成功');
		isCollect.value = false;
	}
};
</script>
<style lang="scss" scoped>
.my-operation {
	display: flex;
	justify-content: space-between;
	a {
		margin-right: 10px;
		width: 69px;
	}
	i {
		margin-right: 3px;
		font-size: 18px;
	}
	.icon-shoucang1 {
		color: rgb(236, 182, 73);
	}
	.icon-dianzan_kuai {
		color: red;
	}
	span {
		font-size: 14px;
	}
}
</style>
