<template>
	<my-nav-bar fixed leftIcon="icon-cha" />
	<view class="channel">

		<view class=" my-channel">
			<view class="section">
				<view class="section-left">
					<view class="title">我的频道</view>
					<view class="sub-title">{{ editStatus ? '点击删除频道' : '点击进入频道' }}</view>
				</view>
				<view class="section-right" @click="editStatus = !editStatus">
					<text class="edit">{{ editStatus ? '完成' : '编辑' }}</text>
				</view>
			</view>
			<view class="channel-list">
				<view class="channel-item rd-4px bg-#f8f8f8" :class="{ 'shake-bottom': editStatus }"
					v-for="(item, index) in myChannel" :key="index" @click="tapMyChannel(item, index)">
					<text class="item-text" :class="{ 'active': item.title === '推荐' }">{{ item.title }}</text>
					<text v-show="editStatus" class="iconfont icon-cha"></text>
				</view>
			</view>
		</view>

		<view class="tj-channel mt-60px">
			<view class="section">
				<view class="section-left">
					<view class="title">为你推荐</view>
					<view class="sub-title">点击添加频道</view>
				</view>
			</view>
			<view class="channel-list">
				<view class="channel-item rd-4px bg-#f8f8f8" v-for="(item, index) in myChannel" :key="index"
					@click="tapMyChannel(item, index)">
					<text class="iconfont icon-jiahao"></text>
					<text class="item-text">{{ item.name }}fdasfhjkladsfhg</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">

const editStatus = ref(false);
const myChannel = ref([
	{
		name: 'photo',
		title: '关注'
	},
	{
		name: 'lock',
		title: '推荐'
	},
	{
		name: 'star',
		title: '郴州'
	},
	{
		name: 'hourglass',
		title: '房产'
	},
	{
		name: 'home',
		title: '美食'
	},
	{
		name: 'star',
		title: '科技'
	},
	{
		name: 'photo',
		title: '股票'
	},
	{
		name: 'lock',
		title: '家居'
	}
]);
const hotChannel = ref([
	{
		title: '热门精选',
		data: [
			{
				name: 'photo',
				title: '微头条'
			},
			{
				name: 'lock',
				title: '直播'
			},
			{
				name: 'star',
				title: '问答'
			},
			{
				name: 'hourglass',
				title: '热点'
			},
			{
				name: 'home',
				title: '视频'
			},
			{
				name: 'home',
				title: '小视频'
			},
			{
				name: 'home',
				title: '图片'
			},
			{
				name: 'home',
				title: '娱乐'
			},
			{
				name: 'home',
				title: '科技'
			},
			{
				name: 'home',
				title: '军事'
			},
			{
				name: 'home',
				title: '国际'
			},
			{
				name: 'home',
				title: '健康'
			},
			{
				name: 'home',
				title: '数码'
			},
			{
				name: 'home',
				title: '手机'
			},
			{
				name: 'home',
				title: '游戏'
			},
			{
				name: 'home',
				title: '历史'
			},
			{
				name: 'home',
				title: '搞笑'
			},
			{
				name: 'home',
				title: '情感'
			},
			{
				name: 'home',
				title: '三农'
			}
		]
	},
	{
		title: '生活娱乐',
		data: [
			{
				name: 'photo',
				title: '健身'
			},
			{
				name: 'lock',
				title: '综艺'
			},
			{
				name: 'star',
				title: '时尚'
			},
			{
				name: 'hourglass',
				title: '养生'
			},
			{
				name: 'home',
				title: '旅游'
			},
			{
				name: 'home',
				title: '宠物'
			},
			{
				name: 'home',
				title: '收藏'
			},
			{
				name: 'home',
				title: '星座'
			}
		]
	},
	{
		title: '体育财经',
		data: [
			{
				name: 'photo',
				title: '钓鱼'
			},
			{
				name: 'lock',
				title: '财经'
			},
			{
				name: 'star',
				title: '体育'
			},
			{
				name: 'hourglass',
				title: 'NBA'
			},
			{
				name: 'home',
				title: '彩票'
			}
		]
	},
	{
		title: '科教文艺',
		data: [
			{
				name: 'photo',
				title: '动物'
			},
			{
				name: 'lock',
				title: '传媒'
			},
			{
				name: 'star',
				title: '国风'
			},
			{
				name: 'hourglass',
				title: '教育'
			},
			{
				name: 'home',
				title: '文化'
			},
			{
				name: 'home',
				title: '科学'
			},
			{
				name: 'home',
				title: '辟谣'
			},
			{
				name: 'home',
				title: '正能量'
			}
		]
	},
	{
		title: '其他',
		data: [
			{
				name: 'photo',
				title: '党媒推荐'
			},
			{
				name: 'lock',
				title: '热榜'
			},
			{
				name: 'star',
				title: '政法'
			},
			{
				name: 'hourglass',
				title: '台海'
			},
			{
				name: 'home',
				title: '漫画'
			},
			{
				name: 'home',
				title: '口述电影'
			},
			{
				name: 'home',
				title: '动漫'
			},
			{
				name: 'home',
				title: '生活'
			}
		]
	}
]);
const tapMyChannel = (row, index) => {
	if (editStatus.value) {
		// 删除频道
	} else {
		// 去频道页面
	}
};
</script>

<style scoped lang="scss">
.shake-bottom {
	-webkit-animation: shake-bottom 0.8s cubic-bezier(0.255, 0.03, 0.215, 0.255) infinite both;
	animation: shake-bottom 0.8s cubic-bezier(0.255, 0.03, 0.215, 0.255) infinite both;
}

@-webkit-keyframes shake-bottom {

	0%,
	100% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
	}

	10% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}

	20%,
	40%,
	60% {
		-webkit-transform: rotate(-2deg);
		transform: rotate(-2deg);
	}

	30%,
	50%,
	70% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}

	80% {
		-webkit-transform: rotate(-2deg);
		transform: rotate(-2deg);
	}

	90% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}
}

@keyframes shake-bottom {

	0%,
	100% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
	}

	10% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}

	20%,
	40%,
	60% {
		-webkit-transform: rotate(-2deg);
		transform: rotate(-2deg);
	}

	30%,
	50%,
	70% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}

	80% {
		-webkit-transform: rotate(-2deg);
		transform: rotate(-2deg);
	}

	90% {
		-webkit-transform: rotate(2deg);
		transform: rotate(2deg);
	}
}

:deep(.my-nav-bar) {
	.icon-cha {
		&::before {
			font-size: 15px !important;
		}
	}
}

.channel {
	padding: 0px 15px;

	.my-channel,
	.tj-channel {
		.section {
			@apply w-full flex flex-items-center justify-between;

			.section-left {
				@apply flex-1 flex flex-items-center;

				.title {}

				.sub-title {
					@apply text-#bcbcbc m-l-10px text-13px;
				}
			}

			.section-right {
				.edit {
					font-size: 14px;
					color: deepskyblue;
				}
			}
		}
	}

	.channel-list {
		@apply grid grid-cols-4 grid-rows-2 gap-10px mt-10px;
	}

	.channel-item {
		@apply relative py-8px px-8px box-border flex-1;

		.item-text {
			@include ellipsis(1);
		}

		.iconfont {
			@apply text-black;
		}

		.icon-cha {
			@apply absolute top--0px right-0px text-8px;
			transform: translate(30%, -30%);
		}

		.icon-jiahao {
			@apply text-12px text-#282828 mr-3px;
		}
	}
}

.my-channel {
	.channel-item {
		@apply text-center;
	}
}

.tj-channel {
	.channel-item {
		@apply flex flex-items-center;
	}
}

.active {
	color: #3c73cc;
}
</style>
