<template>
	<view class="message">
		<my-nav-bar title="消息私信" rightText="设置" :clickRight="rightClick" />
		<view class="top">
			<view class="row">
				<view class="avatar img-comment" />
				<view style="flex:1"><my-cell title="评论和@" label="小温暖 回复了你" :border="false" /></view>
			</view>
			<view class="row">
				<view class="avatar img-like" />
				<view style="flex:1"><my-cell title="点赞" label="你的maya 点赞了你的视频" :border="false" /></view>
			</view>
			<view class="row">
				<view class="avatar img-fans" />
				<view style="flex:1"><my-cell title="粉丝" label="小温暖 关注了你" :border="false" /></view>
			</view>
		</view>

		<view class="bottom">
			<view class="row">
				<view class="avatar img-creation-message" />
				<view style="flex:1"><my-cell title="创作通知" label="邀请您参加热门话题讨论 快来看看吧" :border="false" :isLink="false" /></view>
				<view class="">
					<text>11:11</text>
					<!-- <u-badge type="error" max="99" value="100"></u-badge> -->
				</view>
			</view>
			<view class="row">
				<view class="avatar img-system-message" />
				<view style="flex:1"><my-cell title="系统通知" label="举报通知 】亲爱的用户你好，经核实您举报的" :border="false" :isLink="false" /></view>
				<view class="">
					<text>11:11</text>
					<!-- <u-badge type="error" max="99" value="100"></u-badge> -->
				</view>
			</view>
			<view class="row">
				<view class="avatar img-strange-message" />
				<view style="flex:1"><my-cell title="陌生人消息" label="你是个大可爱是打算发叔叔把咖啡就会崩溃啊大发" :border="false" :isLink="false" /></view>
				<view class="">
					<text>11:11</text>
					<!-- <u-badge type="error" max="99" value="100"></u-badge> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import router from '@/utils/router';
const rightClick =()=>{
	router.push('../setting/message/index')
}
</script>
<style lang="scss" scoped>
.message {
	background-color: #eeeeee;
}
.top,
.bottom {
	margin-top: 5px;
	background-color: #fff;
	.avatar {
		width: 45px;
		height: 45px;
	}
}
.row {
	display: flex;
	align-items: center;
	padding: 5px 0px 5px 12px;
	border: 0.5px solid #eeeeee;
}
.bottom {
	.row {
		padding: 5px 12px;
	}
}
.img-comment,
.img-like,
.img-fans,
.img-creation-message,
.img-system-message,
.img-strange-message {
	background: url('~@/static/images/jlt.png') no-repeat;
}
.img-comment {
	background-size: 45px 385px;
	background-position: 0px 0px;
}
.img-like {
	background-size: 45px 385px;
	background-position: 0px -67px;
}
.img-fans {
	text-indent: -1000px;
	background-size: 45px 385px;
	background-position: 0px -134px;
}
.img-creation-message {
	text-indent: -1000px;
	background-size: 45px 385px;
	background-position: 0px -206px;
}
.img-system-message {
	text-indent: -1000px;
	background-size: 45px 385px;
	background-position: 0px -273px;
}
.img-strange-message {
	text-indent: -1000px;
	background-size: 45px 385px;
	background-position: 0px -341px;
}
</style>
