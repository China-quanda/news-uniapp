<template>
	<view class="container">
		<!-- <my-nav-bar title="全部服务" border :clickLeft="router.back" /> -->
		<view class="Panel" v-for="service in serviceList" :key="service.title">
			<text class="Panel-title">{{ service.title }}</text>
			<my-grid class="my-grid" columns="4" backgroundColor="#fff">
				<my-grid-item v-for="(item, index) in service.data" :key="index" @tap="tapItem(item)">
					<my-icon :icon="item.icon" :size="22" />
					<text class="text">{{ item.text }}</text>
				</my-grid-item>
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
		data: [{ text: '浏览历史', icon: 'icon-lishi' }, { text: '评论', icon: 'icon-pinglun' }, { text: '点赞', icon: 'icon-dianzan' }, { text: '收藏', icon: 'icon-shoucang' }]
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
let tapItem = row => {
	console.log(row);
	if (!row.url) return prompt.msg(`${row.text} 功能未实现`);
	router.push(row.url);
	// 	router.push('/pages/user/download/index');
	// 	router.push('/pages/user/message/index');
	// 	router.push('/pages/user/content/index');
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
	padding: 10px 0px;
	color: #292929;
	.text {
		margin-top: 8px;
		font-size: 14px;
	}
}
</style>
