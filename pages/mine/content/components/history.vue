<template>
	<view class="my-history">
		<view class="item-avatar-one" v-for="(item, index) in 3" :key="index">
			<author @tap="goToUser(item.article.user.id)"></author>
			<view class="centre">
				<view class="left"><h1 @click="goToArticle(item.article.id)">1233</h1></view>
				<view class="right" @click="goToArticle(item.article.id)"><my-image :src="avatar" width="120px" height="90px" @tap="click"></my-image></view>
			</view>
			<view class="bottom"><info-action @onAction="onActionTap" /></view>
		</view>

		<!-- <view v-if="!list.length" class="empty">
					暂无历史记录
				 </view> -->
	</view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import router from '@/utils/router';
// import {getUserArticleViewHistory} from '@/api/article'
import author from '@/pages/article/components/info-author.vue';
import infoAction from '@/pages/article/components/info-action.vue';
let query = reactive({
	pageNum: 1,
	pageSize: 10
});
let userId = ref(1);
let list = reactive([]);
let total = ref(0);
let avatar = ref('https://img01.yzcdn.cn/vant/cat.jpeg');
let isAttentionAuthor = ref(false);
onMounted(() => {
	// getUserArticleViewHistory(userId.value,query)
});
const goToUser = id => {
	router.push('/pages/user/index?user_id=' + id);
};
const goToArticle = id => {
	router.push('/pages/article/index?article_id=' + id);
};
const getUserArticleViewHistory = (id, data) => {
	getUserArticleViewHistory(id, data).then(res => {
		query.pageNum = res.pageNum;
		query.pageSize = res.pageSize;
		list = res.list;
		total.value = res.total;
	});
};
const onActionTap = value => {
	console.log(value);
	if (value === 'comment') {
		showComment.value = !showComment.value;
		showAction.value = false;
	}
};
</script>

<style lang="scss" scoped>
.my-history {
	background-color: rgb(247, 247, 247);
	text-align: left;
}
.item-avatar-one {
	margin-top: 10px;
	padding: 15px 15px 5px 15px;
	box-sizing: border-box;
	background-color: #fff;
	.centre {
		display: flex;
		.left {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 230px;
			margin-right: 14px;
			h1 {
				font-size: 16px;
				margin: 0;
			}
		}
		.right {
			border-radius: 4px;
			overflow: hidden;
		}
	}
	.bottom {
		padding: 15px 0px 10px 0px;
	}
}
</style>
