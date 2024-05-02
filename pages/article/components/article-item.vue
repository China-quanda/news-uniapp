<template>
	<view class="article-item" ref="article-item">
		<view class="avatar" v-if="showAvatar" @click="goToUser(info.user.id)">
			<!-- <my-image class="user-avatar" :src="info.user.avatar" radius="100px" width="30px" height="30px"/> -->
			<image class="w-30px h-30px overflow-hidden rounded-full" lazy-load
				:src="info.user.avatar || 'https://img01.yzcdn.cn/vant/cat.jpeg'" mode="aspectFill" />
			<view class="author">
				<a>{{ info.user.username }}</a>
				<text class="introduce">已关注 · {{ info.user.introduce || '' }}</text>
			</view>
		</view>

		<view class="top" v-if="cover.type === 0 || cover.type === 2 || cover.type === 3" @click="goToArticleInfo(info.id)">
			<h1>{{ info.title }}</h1>
		</view>

		<view class="centre" v-if="cover.type === 2" @click="goToArticleInfo(info.id)">
			<image lazy-load :src="info.coverImg || 'https://img01.yzcdn.cn/vant/cat.jpeg'" mode="widthFix" />
		</view>

		<view class="centre-3" v-if="cover.type === 3" @click="goToArticleInfo(info.id)">
			<image class="w-114px h-90px" :src="info.coverImg || 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
			<image class="w-114px h-90px" :src="info.coverImg || 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
			<image class="w-114px h-90px" :src="info.coverImg || 'https://img01.yzcdn.cn/vant/cat.jpeg'" />
			<!-- <view class="image"><image :src="info.coverImg|| 'https://img01.yzcdn.cn/vant/cat.jpeg'" mode="widthFix" /></view> -->
			<!-- <view class="image"><image :src="info.coverImg|| 'https://img01.yzcdn.cn/vant/cat.jpeg'" mode="widthFix" /></view> -->
			<!-- <view class="image"><image :src="info.coverImg|| 'https://img01.yzcdn.cn/vant/cat.jpeg'" mode="widthFix" /></view> -->
		</view>

		<view>
			<view class="bottom-1" v-if="cover.type === 1">
				<view class="left">
					<h1 @click="goToArticleInfo(info.id)">{{ info.title }}</h1>
					<view class="left-bottom">
						<view>
							<text class="author-name" v-if="!showAvatar">{{ info.user.username }}</text>
							<text class="comment">{{ info.commentCount }}评论</text>
							<text class="read">{{ info.readCount }}观看</text>
							<text class="time">{{ info.createdTime }}</text>
						</view>
						<view>
							<!-- <i class="iconfont icon-cha" @click="onClickCha"></i> -->
							<uni-icons type="closeempty" size="14" color="#999" @click="onClickCha(info)" />
						</view>
					</view>
				</view>
				<view class="right" @click="goToArticleInfo(info.id)">
					<image class="w-full h-full" :src="info.coverImg || 'https://img01.yzcdn.cn/vant/cat.jpeg'"
						mode="scaleToFill" />
				</view>
			</view>
			<view class="bottom" v-if="cover.type === 0 || cover.type === 2 || cover.type === 3">
				<view>
					<text class="author-name" v-if="!showAvatar">{{ info.user.username }}</text>
					<text class="comment">{{ info.commentCount }}评论</text>
					<text class="read">{{ info.readCount }}观看</text>
					<text class="time">{{ info.createdAt }}</text>
				</view>
				<view><uni-icons type="closeempty" size="14" color="#999" @click="onClickCha(info)" /></view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
export default { name: 'article-item' }
</script>
<script setup lang="ts">
defineProps({
	info: {
		type: Object,
		required: true
	},
	// 是否显示图片
	showAvatar: {
		type: Boolean,
		default: false
	}
});

let cover = {
	// 封面类型 0 无图；1 右边1张图；2 一张大图；3 三张图片；
	type: 1,
	// 图片数组
	images: []
};
const goToUser = (id: number) => {
	console.log('goToUser', id);
	uni.navigateTo({
		url: '/pages/user/index?user_id=' + id
	})
};
const goToArticleInfo = (id: number) => {
	uni.navigateTo({
		url: `/pages/article/info?articleId=${id}`
	})
};
const onClickCha = (info: any) => {
	console.log('点击了差');
	// this.isCha = true
	// bus.$emit('onClickCha')
};
</script>

<style lang="scss" scoped>
.article-item {
	display: flex;
	flex-direction: column;
	padding: 15px 15px 15px 15px;
	box-sizing: border-box;
	// height:330px;
	margin-top: 8px;
	background-color: #fff;

	.avatar {
		display: flex;
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
				font-size: 10px;
				color: #ccc;
			}

			.introduce {
				max-width: 190px;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 1; //行数
				-webkit-box-orient: vertical; //盒子中内容竖直排列
			}
		}
	}

	.top {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;

		h1 {
			font-size: 15px;
			line-height: 23px;
			margin: 0;
			overflow: hidden; //溢出内容隐藏
			text-overflow: ellipsis; //文本溢出部分用省略号表示
			display: -webkit-box; //特别显示模式
			-webkit-line-clamp: 2; //行数
			-webkit-box-orient: vertical; //盒子中内容竖直排列
		}
	}

	.centre {
		width: 100%;
		height: 200px;
		border-radius: 4px;
		overflow: hidden;
		margin-top: 5px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.centre-3 {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
		border-radius: 4px;
		overflow: hidden;

		// .image {
		// 	width: 114px;
		// 	height: 90px;
		// 	image {
		// 		width: 100%;
		// 		height: 100%;
		// 	}
		// }
	}

	.bottom {
		display: flex;
		justify-content: space-between;

		.icon-cha {
			font-size: 12px;
			color: #ccc;
		}

		text {
			font-size: 12px;
			color: #ccc;
			margin-right: 10px;
		}
	}

	.bottom-1 {
		display: flex;
		box-sizing: border-box;
		height: 90px;

		.left {
			// position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			text-align: left;
			// width: 230px;
			flex: 1;
			margin-right: 14px;

			h1 {
				font-size: 15px;
				line-height: 23px;
				margin: 0;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 2; //行数
				-webkit-box-orient: vertical; //盒子中内容竖直排列
			}

			.left-bottom {
				display: flex;
				justify-content: space-between;

				.icon-cha {
					font-size: 12px;
					color: #ccc;
				}

				text {
					font-size: 12px;
					color: #ccc;
					margin-right: 10px;
				}
			}
		}

		.right {
			width: 120px;
			height: 90px;
			border-radius: 4px;
			overflow: hidden;
		}
	}
}
</style>
