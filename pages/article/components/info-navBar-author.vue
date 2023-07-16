<template>
	<view class="author">
		<view class="author-left" @tap="goToUser(article?.user_id)">
			<view class="author-avatar"><my-avatar :src="article?.user?.avatar" width="35px" height="35px" /></view>
			<view class="author-name">
				<my-text bold>{{ article?.user?.nickname }}</my-text>
				<view class="author-more">
					<text>{{ article?.createdAt }}</text>
					<text>·</text>
					<text>{{ article?.user?.introduce }}</text>
				</view>
			</view>
		</view>
		<my-button type="primary" :plain="isWage" :text="isWage ? '已关注' : '+ 关注'" size="small" @tap="tapFocus(article?.user_id)" />
	</view>
</template>

<script setup lang="ts">
import storage from '@/utils/storage';
// import { addUserFollowings,deleteUserFollowings } from '@/api/user'
const props = defineProps({
	article: {
		type: Object,
		default: () => {}
	},
	isWage: {
		type: Boolean,
		default: false
	}
});
const goToUser = id => {
	console.log(id);
};
console.log(props.isWage);
const tapFocus = async author_id => {
	if (!storage.get('token')) return console.log('请先登录');
	if (props.isWage) {
		// 发起请求取消关注
		await deleteUserFollowings(author_id);
		// console.log('取消关注作者成功');
	} else {
		// 发起请求关注
		const re = await addUserFollowings({ follerd_id: author_id });
		if (!re) return console.log('关注失败');
		// console.log('关注作者成功');
	}
};
</script>

<style scoped lang="scss">
.author {
	color: #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 10px 0px;
	box-sizing: border-box;
	.author-left {
		display: flex;
		align-items: center;
		.author-avatar {
			margin-top: 5px;
			margin-right: 15px;
		}
		.author-name {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			font-size: 14px;
			h4 {
				margin: 0;
			}
			text {
				margin-right: 2px;
			}
		}
		.author-more {
			color: rgb(200, 195, 195);
			font-size: 12px;
			width: 200px;
			margin-right: 10px;
			overflow: hidden; //溢出内容隐藏
			text-overflow: ellipsis; //文本溢出部分用省略号表示
			display: -webkit-box; //特别显示模式
			-webkit-line-clamp: 1; //行数
			-webkit-box-orient: vertical; //盒子中内容竖直排列
		}
	}
}
</style>
