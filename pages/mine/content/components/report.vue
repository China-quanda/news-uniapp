<template>
	<view class="my-report">
		<view class="my-report-item" v-for="(item, index) in 3" :key="index">
			<view class="title"><h1>1234</h1></view>
			<view>
				<text>处理进度：</text>
				<text class="active">举报处理中</text>
			</view>
			<view>
				<text>举报理由：</text>
				<text>封面引人不适</text>
			</view>
			<view>
				<text>举报时间：</text>
				<text>3天前</text>
			</view>
			<!-- '举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->
		</view>
		<!-- <view v-if="!list.length" class="empty">
			暂无举报内容
		</view> -->
	</view>
</template>

<script setup lang="ts">
// import {getUserReport} from '@/api/article'
import { reactive, ref, onMounted } from 'vue';
let userId = ref(1);
let list = reactive([]);
let total = ref(0);
let query = reactive({
	pageNum: 1,
	pageSize: 10
});
onMounted(() => {
	// getUserReport(userId.value,query)
});
const getUserReport = (id, data) => {
	getUserReport(id, data).then(res => {
		query.pageNum = res.pageNum;
		query.pageSize = res.pageSize;
		list = res.list;
		total.value = res.total;
	});
};
</script>
<style lang="scss" scoped>
.my-report {
	background-color: rgb(243, 243, 243);
}
.my-report-item {
	display: flex;
	flex-direction: column;
	text-align: left;
	padding: 8px 15px;
	margin-top: 10px;
	background-color: #fff;

	.title {
		h1 {
			font-size: 16px;
		}
	}

	text {
		font-size: 16px;
		color: #ccc;
	}

	.active {
		color: rgb(31, 30, 30);
	}
}
</style>
