<template>
	<view class="content">
		<my-nav-bar rightText="搜索" :clickLeft="clickLeft" :clickRight="clickRight" leftWidth="60rpx" rightWidth="70rpx">
			<view class="input-view">
				<uni-icons type="search" size="18" color="#999" />
				<uni-easyinput
					v-model="search"
					confirm-type="search"
					type="text"
					trim="both"
					class="nav-bar-input"
					focus
					placeholder="请输入关键词进行搜索"
					:inputBorder="false"
					@input="input"
				></uni-easyinput>
			</view>
		</my-nav-bar>
		<!-- <text class="search-result-text">当前输入为：{{ search }}</text> -->

		<!-- 联想建议 -->
		<!-- <search-advice :list="searchResList" :keyword="search" @onSearch="searchKeywords"/> -->
		<!-- history -->
		<search-history :list="searchHistories"></search-history>
		<!-- hot_search -->
		<search-hot :list="hotSearchResList"></search-hot>

		<!-- 搜索结果 -->
		<!-- <view class="search-result" v-if="isSearchList">
		  <ArticleItem :config="config" :data="articleList"/>
		</view> -->
	</view>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/utils/router';
import searchAdvice from './components/search-advice.vue';
import searchHistory from './components/search-history.vue';
import searchHot from './components/search-hot.vue';
let search = ref<string | number>('');
let searchValue = ref<string | number>('');
// 联想建议数据
let searchResList = reactive([
	'11月8号红月亮月全食',
	'163邮箱登录',
	'1美元兑换多少人民币',
	'1g等于多少mg',
	'1升等于多少毫升',
	'192.1681.1',
	'192.168.0.1 登陆页面',
	'126邮箱',
	'163邮箱',
	'12生肖排序'
]);
// 搜索历史的数据
let searchHistories = reactive([
	{
		id: 69,
		user_id: 2,
		number: 20,
		keywords: '测试',
		createdAt: '2022-11-15 18:17:30',
		updatedAt: '2022-11-16 18:36:18',
		deletedAt: null
	},
	{
		id: 68,
		user_id: 2,
		number: 19,
		keywords: 'vue',
		createdAt: '2022-11-15 17:58:27',
		updatedAt: '2022-11-16 17:56:53',
		deletedAt: null
	},
	{
		id: 70,
		user_id: 2,
		number: 1,
		keywords: 'hh',
		createdAt: '2022-11-16 10:32:23',
		updatedAt: '2022-11-16 10:32:23',
		deletedAt: null
	}
]);
let hotSearchResList = reactive([
	{
		id: 69,
		user_id: 2,
		number: 20,
		keywords: '测试',
		createdAt: '2022-11-15 18:17:30',
		updatedAt: '2022-11-16 18:36:18',
		deletedAt: null
	},
	{
		id: 68,
		user_id: 2,
		number: 19,
		keywords: 'vue',
		createdAt: '2022-11-15 17:58:27',
		updatedAt: '2022-11-16 17:56:53',
		deletedAt: null
	},
	{
		id: 70,
		user_id: 2,
		number: 1,
		keywords: 'hh',
		createdAt: '2022-11-16 10:32:23',
		updatedAt: '2022-11-16 10:32:23',
		deletedAt: null
	}
]);
const blur = () => {
	console.log('blur');
};
const focus = () => {
	console.log('focus');
};
const input = () => {
	console.log('input', search.value);
};
const confirmSearch = () => {
	console.log('confirmSearch');
};
const clear = () => {
	console.log('clear');
};
const cancel = () => {
	console.log('cancel');
};
const clickLeft = () => {
	// console.log('clickLeft');
	router.back();
};
const clickRight = () => {
	console.log('clickRight');
};
const clickCentre = () => {
	console.log('clickCentre');
};
</script>

<style lang="scss" scoped>
page {
	background-color: $uni-bg-color;
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
	::v-deep.uni-easyinput__content {
		background-color: transparent !important;
	}
	::v-deep.uni-easyinput__content-input {
		line-height: 1;
		height: 30px;
		font-size: 12px;
	}
}
</style>
