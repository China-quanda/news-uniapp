<template>
	<view class="my-report">
		<view class="my-report-item" v-for="(item, index) in list" :key="index">
			<view class="title"><h1>{{item.article.title}}</h1></view>
			<view>
				<text>处理进度：</text>
				<text class="active">{{statusDict(item.status)}}</text>
			</view>
			<view>
				<text>举报理由：</text>
				<text>{{item.remark}}</text>
			</view>
			<view>
				<text>举报时间：</text>
				<text>{{item.createTime}}</text>
			</view>
			<view>
				<text>举报类型：</text>
				<text>{{typeDict(item.type)}}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {getUserReportList} from '@/api/articleReport'
import { reactive, ref, onMounted } from 'vue';
let list = ref([]);
let query = reactive({
	pageNum: 1,
	pageSize: 10,
	total: 0
});
const loadUserReportList = async(pageNum:number = 1) => {
	const result = await getUserReportList(query)
	list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
	query.pageNum = result.data.pagination
	query.pageSize = result.data.pageSize
	query.total = result.data.total
};

const typeDict =(val:number)=>{
	const map ={
		0:'其他问题',
		1:'标题夸张',
		2:'低俗色情',
		3:'错别字多',
		4:'旧闻重复',
		5:'广告软文',
		6:'内容不实',
		7:'涉嫌违法犯罪',
		8:'侵权',
	}
	return map[val] || '未知'
}
const statusDict =(val:number)=>{
	const map ={
		0:'审核失败',
		1:'审核中',
		2:'审核完成,内容未违规',
		3:'审核完成,内容违规已删除该文章'
	}
	return map[val] || '未知'
}
onMounted(() => {
	loadUserReportList()
});
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
