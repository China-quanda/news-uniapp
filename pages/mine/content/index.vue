<template>
	<div class="user-content">		
		<my-nav-bar :clickLeft="clickLeft" leftWidth="60rpx" rightWidth="160rpx">
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
		
		<view class="" style="display: flex;">
			<view style="margin: 2px 5px;" v-for="item in tabsList" :key="item.name" @tap="clickTabs(item)">
				{{item.name}}
			</view>
		</view>
		<view class="Panel">
			<view class="" v-if="status == 0"></view>
			<!-- <collect v-if="status==0" :userId='userId'/> -->
			<comment v-else-if="status == 1" />
			<history v-else-if="status == 2" />
			<!-- <like v-else-if="status==3" :userId='userId'/> -->
			<report v-else-if="status == 4" />
			<view v-else class="">暂未开发</view>
		</view>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import router from '@/utils/router';
// import collect from './components/collect.vue'
import comment from './components/comment.vue';
// import like from './components/like.vue'
import history from './components/history.vue';
import report from './components/report.vue';
// import {mapGetters} from 'vuex'
let status = ref(4);
let tabsList = reactive([{ name: '收藏' }, { name: '评论' }, { name: '历史' }, { name: '点赞' }, { name: '举报' }, { name: '推送' }, { name: '预约' }]);
const clickTabs = item => {
	if (item.name == '收藏') {
		status.value = 0;
	} else if (item.name == '评论') {
		status.value = 1;
	} else if (item.name == '历史') {
		status.value = 2;
	} else if (item.name == '点赞') {
		status.value = 3;
	} else if (item.name == '举报') {
		status.value = 4;
	} else if (item.name == '推送') {
		status.value = 5;
	} else if (item.name == '预约') {
		status.value = 6;
	}
};
const clickLeft = () => {};
const clickRight = () => {
	console.log('clickRight');
};
const clickCentre = () => {
	console.log('clickCentre');
	router.push('../search/index');
};
const tapLeft = () => {
	router.back();
};
const tapRight = () => {
	console.log('点击搜索');
};
const clickInput = () => {
	router.push('/pages/search/index');
};
</script>
<style lang="scss" scoped>
// /deep/.u-navbar__content__left ,{
// 	padding: 0px 0px 0px 10px;
// 	// padding-left: 10px;
// }
// /deep/.u-navbar__content__right{
// 	padding: 0px 10px 0px 0px;
// 	// padding-right: 10px;
// }
// /deep/.center{
// 	width: 75%;
// 	// flex: 2;
// }
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
