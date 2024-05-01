<template>
	<view class="message">
		<my-nav-bar title="消息私信" rightText="设置" border fixed @clickLeft="router.back()" @clickRight="rightClick" />


		<view class="message-list">
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">评论和@</text>
					<text class="desc">小温暖 回复了你</text>
				</view>
				<view class="item-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">点赞</text>
					<text class="desc">你的maya 点赞了你的视频</text>
				</view>
				<view class="item-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">粉丝</text>
					<text class="desc">小温暖 关注了你</text>
				</view>
				<view class="item-right">
					<text class="iconfont icon-xiangyoujiantou text-14px text-#a3a6a8"></text>
				</view>
			</view>

		</view>

		<view class="message-list mt-6px">
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">闹闹的开心</text>
					<text class="desc">感谢关注！记得常来串门哦</text>
				</view>
				<view class="item-right">
					<text class="time">刚刚</text>
					<view class="badge">1</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">创作通知</text>
					<text class="desc">邀请您参加热门话题讨论 快来看看吧</text>
				</view>
				<view class="item-right">
					<text class="time">04-30</text>
					<view class="badge">2</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">活动通知</text>
					<text class="desc">官方@你签收五一明信片 🎑</text>
				</view>
				<view class="item-right">
					<text class="time">04-30</text>
					<view class="badge">2</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">系统通知</text>
					<text class="desc">亲爱的头条用户你好，诚邀你填写问卷，你的真实体验、评价和建议对我们非常重要！</text>
				</view>
				<view class="item-right">
					<text class="time">04-22</text>
					<view class="badge">1</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">头条小组</text>
					<text class="desc">亲爱的你的Maya，你加入的【 程序员摸鱼小组 】小组#为什么有些公司不招大龄程序员#话题正在热议中！</text>
				</view>
				<view class="item-right">
					<text class="time">04-02</text>
					<view class="badge">2</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">订阅通知</text>
					<text class="desc">亲爱的你的Maya，极目新闻诚邀你参与话题 #雪龙2 号进入北极圈将开始科考作业#讨论</text>
				</view>
				<view class="item-right">
					<text class="time">2023-04-02</text>
					<view class="badge">1</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">头条百科</text>
					<text class="desc">你的Maya，为了更好地传播知识，平台正着力打造一款全新且高质量的百科产品</text>
				</view>
				<view class="item-right">
					<text class="time">2023-04-02</text>
					<view class="badge">1</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">审核通知</text>
					<text class="desc">亲爱的创造者，你对已发表文章《Vue3项目的两种方法创建方法》的修改已通过审核，内容正常推荐中。</text>
				</view>
				<view class="item-right">
					<text class="time">2023-04-02</text>
					<view class="badge">1</view>
				</view>
			</view>
			<view class="message-item">
				<image class="item-left" src="@/static/logo.png" mode="scaleToFill" />
				<view class="item-center">
					<text class="title">陌生人消息</text>
					<text class="desc">你是个大可爱是打算发叔叔把咖啡就会崩溃啊大发</text>
				</view>
				<view class="item-right">
					<text class="time">11:11</text>
					<view class="badge">2</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import router from '@/utils/router';
const rightClick = () => {
	router.push('/pages/mine/setting/message/index')
}
</script>
<style lang="scss" scoped>
.message {
	background-color: #eeeeee;
}

.message-list {
	.message-item {
		@apply flex flex-items-center p-12px gap-x-10px text-13px bg-white;

		.item-left {
			@apply w43px h43px rd-full;
		}

		.item-center {
			@apply flex flex-col flex-1 gap-y-3px;

			.title,
			.desc {
				@include ellipsis(1);
			}

			.title {
				@apply text-13.5px font-500;
			}

			.desc {
				@apply text-#63676a;
			}
		}

		.item-right {
			@apply flex flex-col flex-items-end gap-y-6px;

			.time {
				@apply text-#a3a6a8 text-11px;
			}

			.badge {
				@apply w15px h15px rd-full lh-15px text-center bg-red text-11px text-white;
			}
		}
	}
}

// .top,
// .bottom {
// 	margin-top: 5px;
// 	background-color: #fff;

// 	.avatar {
// 		width: 45px;
// 		height: 45px;
// 	}
// }

// .row {
// 	display: flex;
// 	align-items: center;
// 	padding: 5px 0px 5px 12px;
// 	border: 0.5px solid #eeeeee;
// }

// .bottom {
// 	.row {
// 		padding: 5px 12px;
// 	}
// }

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
