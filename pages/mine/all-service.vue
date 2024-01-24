<template>
	<view class="container">
		<!-- <my-nav-bar title="全部服务" border :clickLeft="router.back" /> -->
		<view class="Panel" v-for="service in serviceList" :key="service.title">
			<text class="Panel-title">{{ service.title }}</text>
			<my-grid class="my-grid" columns="4" backgroundColor="#fff" :border="false">
				<my-grid-item v-for="(item, index) in service.data" :icon="item.icon" :text="item.text" iconSize="20" :key="index"
					@tap="tapItem(item)" />
			</my-grid>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '@/utils/router';
	import prompt from '@/utils/prompt';
	let serviceList = ref([
		{
			title: '精选工具',
			data: [
				{ text: '下载管理', icon: 'icon-xiazai' },
				{ text: '客服中心', icon: 'icon-kefu' },
				{ text: '大字模式', icon: 'icon-zitifangda' },
				{ text: '夜间模式', icon: 'icon-yejian' },
				{ text: '消息', icon: 'icon-xiaoxi' }
			]
		},
		{
			title: '创作中心',
			data: [
				{ text: '创作首页', icon: 'icon-chuangzuo' },
				{ text: '数据助手', icon: 'icon-shujukanban' },
				{ text: '收益提现', icon: 'icon-licaishouyi' },
				{ text: '活动广场', icon: 'icon-huodong' }
			]
		},
		{
			title: '我的内容',
			data: [
				{
					text: '浏览历史',
					icon: 'icon-lishi',
					url: '/pages/mine/content/index',
					type: 'history'
				},
				{
					text: '评论',
					icon: 'icon-pinglun',
					url: '/pages/mine/content/index',
					type: 'comment'
				},
				{
					text: '点赞',
					icon: 'icon-dianzan',
					url: '/pages/mine/content/index',
					type: 'like'
				},
				{
					text: '收藏',
					icon: 'icon-shoucang',
					url: '/pages/mine/content/index',
					type: 'collect'
				},
				{
					icon: 'icon-jubao',
					text: '举报',
					url: '/pages/mine/content/index',
					type: 'report'
				},
			]
		},
		{
			title: '我的服务',
			data: [
				{ text: '钱包', icon: 'icon-xiazai' },
				{ text: '借钱', icon: 'icon-pinglun' },
				{ text: '免流量', icon: 'icon-dianzan' },
				{ text: '我的订单', icon: 'icon-shoucang' },
				{ text: '优惠券', icon: 'icon-shoucang' },
				{ text: '地址管理', icon: 'icon-shoucang' },
				{ text: '任务', icon: 'icon-shoucang' }
			]
		}
	]);
	// let tapItem = row => {
	// 	console.log(row);
	// 	if (!row.url) return prompt.msg(`${row.text} 功能未实现`);
	// 	router.push(row.url);
	// 	// 	router.push('/pages/user/download/index');
	// 	// 	router.push('/pages/user/message/index');
	// 	// 	router.push('/pages/user/content/index');
	// };
	const tapItem = row => {
		if (row.url) {
			if (row.type) {
				router.push(`${row.url}?type=${row.type}`);
			} else {
				router.push(`${row.url}`);
			}
		} else {
			return prompt.msg(`${row.text} 功能未实现`);
		}
	};
	let clickTwoGrid = e => {
		console.log(e);
	};
	let goMyContent = () => {
		router.push('/pages/user/mycontent');
	};
	let onNo = () => {
		console.log('功能未实现');
	};
	let leftClick = () => {
		router.back();
	};
</script>

<style lang="scss" scoped>
	.container {
		// height: 100vh;
		background-color: #f8f8f8;
		margin-bottom: -0px;
	}

	.Panel {
		// margin: 12px;
		padding: 0px 5px;
		background-color: #fff;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 10px;

		.Panel-title {
			display: inline-block;
			padding: 12px;
			font-weight: 500;
		}
	}

	.my-grid {
		:deep(.grid-item-text) {
			margin-top: 8px;
		}
	}
</style>