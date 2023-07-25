<template>
	<view class="my-comment">
		<view class="item-avatar-one" v-for="(item, index) in 4" :key="index">
			<view class="top" @tap="goToUser(item.comment_user.id)">
				<my-avatar :src="avatar" size="36" />
				<view class="author">
					<a>你的Maya</a>
					<text>3天前</text>
				</view>
			</view>
			<view class="comment">妞妞妈妈</view>
			<view class="centre">
				<view class="left">
					<view class="author" @tap="goToUser(item.comment_article.user.id)">
						<my-avatar :src="avatar" size="36" />
						<a>1233</a>
					</view>
					<h1 @tap="goToArticle(item.comment_article.id)">今天是个好日子</h1>
				</view>
				<view class="right" @tap="goToArticle(item.comment_article.id)"><my-image :showLoading="true" :src="avatar" width="120px" height="90px" @click="click" /></view>
			</view>
			<view class="bottom"><info-action @onAction="onActionTap" /></view>
		</view>

		<!-- 	<view v-if="!list.length" class="empty">
			暂无评论内容
		</view> -->
	</view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import infoAction from '@/pages/article/components/info-action.vue';
// import {getUserComment} from '@/api/comment'
let userId = ref(1);
let list = reactive([]);
let total = ref(0);
let avatar = ref('https://img01.yzcdn.cn/vant/cat.jpeg');
let isAttentionAuthor = ref(false);
onMounted(() => {
	// getUserComment(userId.value,query)
});
const onActionTap = value => {
	console.log(value);
	if (value === 'comment') {
		showComment.value = !showComment.value;
		showAction.value = false;
	}
};
const goToUser = id => {
	router.push('/pages/user/index?user_id=' + id);
};
const goToArticle = id => {
	router.push('/pages/article/index?article_id=' + id);
};
const getUserComment = (id, data) => {
	getUserComment(id, data).then(res => {
		query.pageNum = res.pageNum;
		query.pageSize = res.pageSize;
		list = res.list;
		total.value = res.total;
	});
};
</script>

<style lang="scss" scoped>
.my-comment {
	background-color: rgb(247, 247, 247);
	text-align: left;
}

.item-avatar-one {
	margin-top: 10px;
	padding: 15px 15px 5px 15px;
	box-sizing: border-box;
	background-color: #fff;
	.top {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		.author {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-left: 10px;
			a {
				font-size: 14px;
				font-weight: 500;
			}
			text {
				font-size: 12px;
				color: #ccc;
			}
		}
	}
	.comment {
		margin-bottom: 5px;
		font-size: 16px;
	}
	.centre {
		display: flex;
		padding: 10px;

		border: 1px solid rgb(237, 237, 237);
		border-radius: 10px;
		.left {
			display: flex;

			flex-direction: column;
			width: 230px;
			margin-right: 14px;
			h1 {
				font-size: 16px;
				margin: 0;
			}
			.author {
				position: relative;
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				a {
					margin-left: 5px;
					font-size: 14px;
					font-weight: 500;
				}
			}
		}
		.right {
			border-radius: 4px;
			overflow: hidden;
		}
	}
	.bottom {
		margin-top: 10px;
	}
}
</style>
