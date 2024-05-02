<template>
	<div class="user-content">
		<my-nav-bar title="我的内容" @clickLeft="router.back()" leftWidth="60rpx" rightWidth="160rpx" fixed border>
			<block v-slot:right>
				<view style="display: flex; align-items: center;">
					<uni-icons type="search" size="18" color="#000" style="margin-right: 7.5px;" @tap="search" />
					<!-- <uni-icons type="more-filled" size="18" color="#000"  @tap="more" /> -->
					<view style="margin-left: 7.5px; font-size: 14px;">
						管理
						<!-- 完成 -->
					</view>
				</view>
			</block>
		</my-nav-bar>

		<view class="tabs">
			<view class="tab-item" v-for="item in tabsList" :key="item.name" @tap="clickTabs(item)">
				{{ item.name }}
			</view>
		</view>
		<view class="Panel">
			<collect v-if="type === 'collect'" />
			<comment v-else-if="type === 'comment'" />
			<history v-else-if="type === 'history'" />
			<like v-else-if="type === 'like'" />
			<report v-else-if="type === 'report'" />
			<view v-else class="">暂未开发</view>
		</view>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/utils/router';
import prompt from '@/utils/prompt';
import collect from './components/collect.vue'
import comment from './components/comment.vue';
import like from './components/like.vue'
import history from './components/history.vue';
import report from './components/report.vue';
onLoad((query) => {
	if (query.type) type.value = query.type
})
let type = ref('');
let tabsList = reactive([{ name: '收藏' }, { name: '评论' }, { name: '历史' }, { name: '点赞' }, { name: '举报' }, { name: '推送' }, { name: '预约' }]);
const clickTabs = item => {
	if (item.name == '收藏') {
		type.value = 'collect';
	} else if (item.name == '评论') {
		type.value = 'comment';
	} else if (item.name == '历史') {
		type.value = 'history';
	} else if (item.name == '点赞') {
		type.value = 'like';
	} else if (item.name == '举报') {
		type.value = 'report';
	} else if (item.name == '推送') {
		prompt.msg('推送 功能未开发')
		// type.value = 5;
	} else if (item.name == '预约') {
		// type.value = 6;
		prompt.msg('预约 功能未开发')
	}
};
const search = () => {
	console.log('点击搜索');
	router.push('/pages/search/index');
};
</script>
<style lang="scss" scoped>
page,
.user-content {
	background-color: #f8f8f8;
}

.tabs {
	@apply flex gap-x-10px overflow-x-scroll;

	.tab-item {
		@apply text-14px px-12px py-8px bg-#007aff;
	}
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