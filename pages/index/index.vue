<template>
	<view class="content">
		<my-nav-bar rightText="搜索" :clickLeft="clickLeft" :clickRight="clickRight" :clickCentre="clickCentre" leftWidth="60rpx" rightWidth="70rpx">
			<view class="input-view">
				<uni-icons type="search" size="18" color="#999" />
				<input disabled class="nav-bar-input" type="text" placeholder="你想搜索点什么" />
			</view>
			<block v-slot:left><my-scan size="18" color="#000" /></block>
		</my-nav-bar>
		<button @tap="router.push('./channel')">111</button>
		<article-item :config="config" :list="articleList" />
	</view>
</template>
<script setup lang="ts">
import router from '@/utils/router';
import storage from '@/utils/storage';
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import articleItem from '../article/article-item.vue';
import { getArticleList } from '@/api/article';
let articleList = ref([]);
onLoad(async () => {
	storage.set('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIxLCJpYXQiOjE2ODgyODA5NTQsImV4cCI6MTY4OTU3Njk1NH0.XTBQ5F0k2XV7yxRH94TwWO4XWTEtJrRXJgoSV9I3_Cg');
	getArticleList().then(res => {
		articleList.value = res.data.list;
		console.log(articleList.value);
	});
});

const clickLeft = () => {};
const clickRight = () => {
	console.log('clickRight');
};
const clickCentre = () => {
	console.log('clickCentre');
	router.push('../search/index');
};
let config = reactive({
	showAuthorName: true,
	showRead: true,
	// showAvatar: true
	one: true,
	two: true,
	three: true,
	zero: true,
	showTime: true
});
</script>

<style lang="scss" scoped>
// page {
// 	background-color: $uni-bg-color-grey;
// }
.content {
	background-color: $uni-bg-color-grey;
}
.input-view {
	display: flex;
	flex: 1;
	border-radius: 15px;
	padding: 0 15px;
	line-height: 30px;
	background-color: #f8f8f8;
}
.nav-bar-input {
	height: 30px;
	width: 100%;
	line-height: 30px;
	padding: 0 5px;
	font-size: 12px;
}
</style>
