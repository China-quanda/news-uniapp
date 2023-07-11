<template>
	<view class="channel">
		<my-nav-bar color="transparent" :clickRight="router.back">
			<block v-slot:right><my-icon icon="icon-cha" size="18" color="#000" /></block>
		</my-nav-bar>

		<view class="my-channel">
			<view class="left">
				<view class="title">我的频道</view>
				<view class="desc">{{ editStatus ? '点击删除频道' : '点击进入频道' }}</view>
			</view>
			<view class="edit" @tap="editStatus = !editStatus">{{ editStatus ? '完成' : '编辑' }}</view>
		</view>
		<view class="channel-item">
			<my-grid class="my-grid" columns="4" gap="10" backgroundColor="#fff">
				<my-grid-item class="my-grid-item" :class="{'shake-bottom' :editStatus }" v-for="(item, index) in myChannel" :key="index" backgroundColor="#f8f8f8" radius="4" @tap="tapMyChannel(item, editStatus)">
					{{ item.title }}
					<my-icon v-if="editStatus" class="m-icon icon-cha" icon="icon-cha" size="12" color="#000" />
				</my-grid-item>
			</my-grid>
		</view>

		<view class="tj-channel">
			<view class="left">
				<view class="title">为你推荐</view>
				<view class="desc">点击添加频道</view>
			</view>
		</view>
		<view class="channel-item tj-channel-item">
			<view class="Panel" v-for="hot in hotChannel" :key="hot.title">
				<text class="Panel-title">{{ hot.title }}</text>
				<my-grid class="my-grid" columns="4" gap="10" backgroundColor="#fff">
					<my-grid-item class="my-grid-item" v-for="(item, index) in hot.data" :key="index" border radius="4" @tap="tapHotChannel(item)">
						{{ item.title }}
						<my-icon class="m-icon" icon="icon-jiahao" size="12" color="#000" />
					</my-grid-item>
				</my-grid>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/utils/router';
import prompt from '@/utils/prompt';
let editStatus = ref<boolean>(false);
let myChannel = ref([
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
let hotChannel = ref([
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
let tapHotChannel = row => {
	console.log(row);
	if (!row.url) return prompt.msg(`${row.title} 功能未实现`);
	router.push(row.url);
};
let tapMyChannel = (row, status) => {
	if (status) {
		// 删除频道
	} else {
		// 去频道页面
	}
	console.log(row, status);
	router.push(row.url);
};
</script>

<style scoped lang="scss">
	.shake-bottom {
		-webkit-animation: shake-bottom 0.8s cubic-bezier(0.255, 0.030, 0.215, 0.255) infinite both;
		        animation: shake-bottom 0.8s cubic-bezier(0.255, 0.030, 0.215, 0.255) infinite both;
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
.channel {
	padding: 0px 15px;
}
::v-deep.grid {
	padding: 0px !important;
}
::v-deep.grid-item {
	padding: 8px 3px;
}
.m-icon {
	position: absolute;
	top: -5px;
	right: 0px;
}
.icon-cha {
	font-size: 12px;
	line-height: 1;
	top: 1px;
	font-weight: 500;
	-webkit-text-size-adjust: none;
	-webkit-transform: scale(0.666, 0.666);
}

.Panel {
	margin: 15px 0px;
	background-color: #fff;
	border-radius: 8px;
	overflow: hidden;
	margin-bottom: 10px;
	.Panel-title {
		display: inline-block;
		padding: 12px 0px;
		// font-weight: 500;
		font-size: 13px;
		color: #ccc;
	}
}
.tj-channel {
	margin-top: 60px;
}
.my-channel,
.tj-channel {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	.left {
		display: flex;
		align-items: center;
		font-size: 16px;
		font-family: 500;
		.desc {
			margin-left: 10px;
			font-size: 13px;
			color: #bcbcbc;
		}
	}
	.edit {
		font-size: 14px;
		color: deepskyblue;
	}
}

.channel-item {
	padding-bottom: 10px;
	.item {
		// position: relative;
		// padding: 6px 23px;
		// background-color: #f8f2f2;
		// margin-bottom: 10px;
		// border-radius: 3px;
		.grid-text {
			// font-size: 16px;
		}
		.cha {
			// display: flex;
			// align-items: center;
			// justify-content: center;
			// position: absolute;
			// width: 18px;
			// height: 18px;
			// top: -25%;
			// right: -10%;
			// margin: 0;
			// border-radius: 50%;
			// background-color: #d8d0d0;
			// .icon-cha {
			// color: #fff;
			// font-size: 7px;
			// }
		}
	}
}
</style>
