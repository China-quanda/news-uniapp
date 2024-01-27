<template>
	<view class="content">
		<my-nav-bar rightText="搜索" :clickLeft="clickLeft" :clickRight="clickRight" :clickCentre="clickCentre"
			leftWidth="60rpx" rightWidth="70rpx">
			<view class="input-view">
				<uni-icons type="search" size="18" color="#999" />
				<input disabled class="nav-bar-input" type="text" placeholder="你想搜索点什么" />
			</view>
			<block v-slot:left><my-scan size="18" color="#000" /></block>
		</my-nav-bar>

		<view class="channel">
			<view class="channel-wrapper">
				<view class="channel-item" 
					:class="{'activeCtegory':item.id === articleCtegoryStore.ctegorId}"
					v-for="(item,index) in articleCtegoryStore.myCtegoryList" :key="item.id" @click="handleClickArticleCtegory(item,index)">
					{{item.name}}
				</view>
				<view class="hamburger" @click="router.push('./channel')">
					<uni-icons type="bars" size="18" color="#999" />
				</view>
			</view>
		</view>
		<my-list 
		:list="list" refresherEnabled :pageInfo="pageInfo" 
		:loadData="getDataList"
		:loading="loading">
			<article-item v-for="(item, index) in list" :key="index" :info="item"/>
		</my-list>
	</view>
</template>
<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { onShow,onLoad} from '@dcloudio/uni-app';
	import router from '@/utils/router';
	import articleItem from '@/pages/article/components/article-item.vue';
	import { useArticleCtegoryStore } from '@/store/articleCtegory'
	const articleCtegoryStore = useArticleCtegoryStore()
	import { getArticleList } from '@/api/article';
	import {usePageList} from '@/maya-ui/components/my-list/hook';
	let query = reactive({
		articleCategoryId: null,
	})
	const { list, pageInfo, loading, getDataList } =usePageList({
		requestApi:getArticleList,
		queryParams:query
	})

	const handleClickArticleCtegory = (item, index) => {
		if(query.articleCategoryId === item.id) return
		query.articleCategoryId = articleCtegoryStore.ctegorId = item.id
		getDataList(pageInfo.pageNum)
	}
	onLoad(()=>{
		articleCtegoryStore.loadArticleCtegoryList()
	})
	onShow(async() => {
		// 监听文章频道页面传来的值
		if(query.articleCategoryId !== articleCtegoryStore.ctegorId){
			query.articleCategoryId = articleCtegoryStore.ctegorId
			getDataList(pageInfo.pageNum)
		}
	})
	const clickLeft = () => { };
	const clickRight = () => {
		console.log('clickRight');
	};
	const clickCentre = () => {
		console.log('clickCentre');
		router.push('../search/index');
	};

</script>

<style lang="scss" scoped>
	// page {
	// 	background-color: $uni-bg-color-grey;
	// }
	.content {
		// background-color: $uni-bg-color-grey;
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

	.channel {
		position: relative;
		height: 35px;

		.channel-wrapper {
			position: fixed;
			// top: 0;
			left: 0;
			right: 40px;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			overflow-x: scroll;
			height: 35px;
			z-index: 1;
			font-size: 15px;
			background-color: white;

			&::-webkit-scrollbar {
				height: 0px;
			}

			.channel-item {
				display: flex;
				align-items: center;
				padding: 0px 10px;
				height: 100%;
				color: #0e0e0e;

				&:not(:first-child) {
					margin-left: 10px;
				}
			}

			.activeCtegory {
				color: #3c73cc;
			}

			.hamburger {
				position: fixed;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 35px;
				width: 40px;
				background-color: white;

				// background-color: rgba(255,255,255,0.8);
				&::before {
					position: absolute;
					content: '';
					left: 0px;
					height: 15px;
					width: 1px;
					// box-shadow: -3px 0px 7px 1px rgba(0, 0, 0, 0.7);
					// background-color: #000;
					background-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
				}
			}

		}
	}
</style>