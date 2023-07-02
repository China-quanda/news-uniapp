<template>
	<view class="content">
		<my-nav-bar rightText="搜索" :clickLeft="clickLeft" :clickRight="clickRight" :clickCentre="clickCentre" leftWidth="60rpx" rightWidth="70rpx">
			<view class="input-view">
				<uni-icons type="search" size="18" color="#999" />
				<input disabled class="nav-bar-input" type="text" placeholder="你想搜索点什么" />
			</view>
			<block v-slot:left><my-scan size="18" color="#000" /></block>
		</my-nav-bar>
	</view>
</template>
<script setup lang="ts">
import router from '@/utils/router';
const clickLeft = () => {};
const clickRight = () => {
	console.log('clickRight');
};
const clickCentre = () => {
	console.log('clickCentre');
	router.push('../search/index');
};
</script>

<style lang="scss" scoped>
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
