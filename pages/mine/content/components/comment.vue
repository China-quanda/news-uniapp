<template>
	<view class="comment">
		<view class="item-avatar-one" v-for="(item, index) in list" :key="index">
			
			<view class="top">
				<my-avatar :src="item.commentUser.avatar" size="36" @click="goToUser(item.commentUser.id)"/>
				<view class="author">
					<a @click="goToUser(item.commentUser.id)">{{item.commentUser.username}}</a>
					<text selectable>{{item.createTime}}</text>
				</view>
			</view>
			
			<view class="comment">{{item.content}}</view>
			
			<view class="centre">
				<view class="left">
					<view class="author" @click="goToUser(item.commentArticle.user.id)">
						<my-avatar :src="item.commentArticle.user.avatar" width="30px" height="30px"/>
						<a>{{item.commentArticle.user.username}}</a>
					</view>
					<h1 @click="goToArticle(item.commentArticle.id)">
						{{item.commentArticle.title}}
					</h1>
				</view>
				<view class="right" @click="goToArticle(item.commentArticle.id)">
					<my-image :showLoading="true" 
					:src="avatar" width="120px" height="90px" 
					mode="scaleToFill"/>
					</view>
			</view>
			
			<view class="bottom">
				<info-action @onAction="onActionTap" :info="item"/>
			</view>
		</view>
		
		<my-empty v-if="!list.length" text="暂无评论内容"/>
	</view>
</template>
<script lang="ts">
	export default { name: 'comment' }
</script>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import infoAction from '@/pages/article/components/info-action.vue';
import {getUserCommentlist} from '@/api/comment'
import router from '@/utils/router';
let list = ref([]);
let total = ref(0);
let avatar = ref('https://img01.yzcdn.cn/vant/cat.jpeg');
// let isAttentionAuthor = ref(false);
let query = reactive({
	pageNum:1,
	pageSize:10
})
onMounted(() => {
	loadUserComment(query)
});
const onActionTap = value => {
	console.log(value);
	if (value === 'comment') {
		// showComment.value = !showComment.value;
		// showAction.value = false;
	}
};
const goToUser = id => {
	console.log('id',id);
	// router.push('/pages/user/index?user_id=' + id);
};
const goToArticle = id => {
	console.log('id',id);
	router.push(`/pages/article/info?articleId=${id}`);
	// router.push('/pages/article/index?article_id=' + id);
};
// 获取用户评论列表
const loadUserComment = async(pageNum = 1) => {
	const result = await getUserCommentlist(query)
	list.value = pageNum > 1 ? list.value.concat(result.data.list) : result.data.list
	query.pageNum = result.data.pagination
	query.pageSize = result.data.pageSize
	query.total = result.data.total
};
</script>

<style lang="scss" scoped>
.my-comment {
	// background-color: rgb(247, 247, 247);
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
				// @include ellipsis(1);
				font-size: 14px;
				font-weight: 500;
				overflow: hidden; //溢出内容隐藏
					text-overflow: ellipsis; //文本溢出部分用省略号表示
					display: -webkit-box; //特别显示模式
					-webkit-line-clamp: 1; //行数
					-webkit-box-orient: vertical; //盒子中内容竖直排列
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
		justify-content: space-between;
		padding: 10px;
		border: 1px solid rgb(237, 237, 237);
		border-radius: 10px;
		.left {
			display: flex;
			flex-direction: column;
			// margin-right: 14px;
			h1 {
				font-size: 16px;
				margin: 0;
				overflow: hidden; //溢出内容隐藏
					text-overflow: ellipsis; //文本溢出部分用省略号表示
					display: -webkit-box; //特别显示模式
					-webkit-line-clamp: 2; //行数
					-webkit-box-orient: vertical; //盒子中内容竖直排列
			}
			.author {
				// position: relative;
				display: flex;
				align-items: center;
				margin-bottom: 10px;
				a {
					margin-left: 5px;
					font-size: 14px;
					font-weight: 500;
					overflow: hidden; //溢出内容隐藏
						text-overflow: ellipsis; //文本溢出部分用省略号表示
						display: -webkit-box; //特别显示模式
						-webkit-line-clamp: 1; //行数
						-webkit-box-orient: vertical; //盒子中内容竖直排列
				}
			}
		}
		.right {
			border-radius: 4px;
			overflow: hidden;
			min-width: 110px;
			height: 90px;
		}
	}
	.bottom {
		margin-top: 8px;
	}
}
</style>
