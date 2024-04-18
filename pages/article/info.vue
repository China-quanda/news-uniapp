<template>
	<view class="container">
		<view :class="['nav-bar']">
			<view class="nav-bar-left">
				<view class="btn-item" @click="back">
					<text class="iconfont icon-xiangzuojiantou"></text>
				</view>
			</view>
			<view class="nav-bar-center">
				<view class="nav-title ellipsis1" v-if="!showNavBarAuthor">{{ pageTitle }}你的Maya你的Maya你的Maya你的Maya</view>
				<view class="nav-user" v-else>
					<view class="user-left">
						<image class="user-avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
						<text class="user-name ellipsis1">你的Maya你的Maya你的Maya你的Maya你的Maya</text>
					</view>
					<view class="user-right">
						<view class="gz nav-bar-btn" v-if="true">
							<text class="iconfont icon-jiahao"></text>
							<text class="text">关注</text>
						</view>
						<view class="wgz nav-bar-btn" v-else>
							<text class="text">已关注</text>
						</view>
					</view>
				</view>
			</view>
			<view class="nav-bar-right">
				<view class="btn-item">
					<text class="iconfont icon-sousuo"></text>
				</view>
				<!-- #ifndef MP-WEIXIN -->
				<view class="btn-item ml-2">
					<text class="iconfont icon-gengduo1"></text>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<scroll-view class="scroll-view" scroll-y @scroll="scroll">
			<!-- 文章内容 -->
			<view v-if="true" class="article-container" ref="articleContent">
				<h1 class="ellipsis2">
					公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目
					再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。
				</h1>
				<!-- 文章作者 -->
				<view class="article-user">
					<view class="user-left">
						<image class="user-avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
						<!-- <text class="user-name ellipsis1">你的Maya</text> -->
						<view class="flex flex-col gap-4px">
							<text class="user-name ellipsis1">你的Maya</text>
							<text class="push-time">2024-10-24 22:50</text>
						</view>
					</view>
					<view class="user-right">
						<view class="gz btn" v-if="true">
							<text class="iconfont icon-jiahao"></text>
							<text class="text">关注</text>
						</view>
						<view class="wgz btn" v-else>
							<text class="text">已关注</text>
						</view>
					</view>
				</view>
				<!-- 文章描述 -->
				<rich-text class="article-content"
					nodes="公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。公司年会需要一个能够支撑60000+人的抽奖程序，原本通过找 网页的开源项目 再定制化实现了效果，并成功运行再周年庆上；但是现在又到年会了，领导要求要能够在任何地方、任何人只要有一台电脑就能简单方便的定制自己的PC抽奖应用，所有就有了这么一个主题。11"
					ref="content" />
			</view>
			<!-- 相关推荐 -->
			<view class="related-recommend">
				<view class="title">相关推荐</view>
				<infoArticleItem />
				<infoArticleItem />
				<infoArticleItem />
				<infoArticleItem />
			</view>

			<!-- 评论组件 -->
			<article-comment ref="articleCommentRef" :articleId="1" />

			<!-- 底部区域 -->
			<info-action class="info-action" :id="1" :info="{ commentCount: 0, collectCount: 0, likeCount: 0 }"
				@onClickComment="onClickComment" fixed border />


			<!-- <view class="safeAreaBottomHeight"></view> -->
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import infoArticleItem from '@/pages/article/components/info-article-item.vue';
import articleComment from './components/article-comment.vue';
import infoAction from './components/info-action.vue';
const pageTitle = ref('文章详情页');
const showNavBarAuthor = ref(false);
const articleCommentRef = ref()

// const placeholderheight = ref('0')
const navBarheight = ref('0px')
const navBarPaddingTopheight = ref('0px')
const menuButtonWidth = ref('0px')
const safeAreaBottomHeight = ref('0px')
const getPlaceholder = () => {

	// #ifndef H5
	const systemInfo = uni.getSystemInfoSync()
	// placeholderheight.value = systemInfo.safeArea?.top + 'px';
	// console.log('systemInfo', systemInfo)
	safeAreaBottomHeight.value = (systemInfo!.safeAreaInsets?.bottom! || 0) + 15 + 'px';
	// console.log('safeAreaBottomHeight.value', safeAreaBottomHeight.value)
	// #endif

	// #ifdef APP-PLUS
	navBarheight.value = systemInfo.safeArea!.top! + 44 + 'px';
	navBarPaddingTopheight.value = systemInfo.safeArea!.top! + 'px';
	// scrollViewheight.val
	// #endif

	// #ifdef MP-WEIXIN
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// console.log('menuButtonInfo', menuButtonInfo)
	navBarheight.value = (systemInfo.safeArea!.top! || 0) + (menuButtonInfo.height! || 0) + 10 + 'px';
	navBarPaddingTopheight.value = (systemInfo.safeArea!.top || 0) + 'px';
	menuButtonWidth.value = menuButtonInfo.width! + 15 + 'px';
	// placeholderheight.value = (menuButtonInfo.height! || 0) + (systemInfo.statusBarHeight! || 0) + 10 + 'px';
	// #endif
}

const onClickComment = () => {
	articleCommentRef.value.popupOpen()
}
const back = () => {
	uni.navigateBack();
};
onLoad(() => {
	getPlaceholder()
	uni.setNavigationBarTitle({
		title: pageTitle.value
	});
});

// 监听滚动事件，滚动隐藏文章作者后 nav是否显示作者
const scroll = (e) => {
	const query = uni.createSelectorQuery()
	query
		.select('.article-user')
		.boundingClientRect((data: NodeInfo) => {
			if (!data) return console.error('data is null');
			// #ifdef H5
			if (data.top! <= 0) {
				showNavBarAuthor.value = true;
			} else {
				showNavBarAuthor.value = false;
			}
			// #endif

			// #ifndef H5
			if (Number(data.top) - 44 <= 0) {
				showNavBarAuthor.value = true;
			} else {
				showNavBarAuthor.value = false;
			}
			// #endif
		})
		.exec();
};
</script>

<style scoped lang="scss">
page,
.container {
	height: 100vh;
	background-color: #f5f2f2;
}

.nav-bar {
	@apply fixed top-0 left-0 right-0 flex justify-between flex-items-center w-full bg-white px-12px box-border z-9;
	animation: nav-view-in 0.5s linear;

	/* #ifdef H5 */
	height: 44px;
	/* #endif */

	/* #ifndef H5 */
	height: v-bind(navBarheight);
	padding-top: v-bind(navBarPaddingTopheight);
	/* #endif */

	/* #ifdef MP-WEIXIN */
	padding-right: v-bind(menuButtonWidth);
	/* #endif */

	.nav-bar-left {}

	.nav-bar-center {
		@apply w-full px-8px flex justify-center;

		.nav-title {
			@apply text-14px mx-15px;
		}

		.nav-user {
			@apply w-full flex-1 flex justify-between flex-items-center mr-10px box-border;
			animation: nav-view-in 0.5s linear;

			.user-left {
				@apply flex justify-between flex-items-center;

				.user-avatar {
					@apply w-20px h-20px rd-full mr-4px box-border;
				}

				.user-name {
					@apply text-13px max-w-120px;
					/* #ifdef MP-WEIXIN */
					@apply max-w-100px;
					/* #endif */
				}
			}

			.user-right {
				@apply flex flex-items-center;

				.nav-bar-btn {
					@apply flex flex-items-center justify-center text-12px px-4px py-4px bg-#007aff rd-4px;

					.iconfont {
						@apply text-10px text-#fff mr-1px;
					}

					.text {
						@apply text-10px text-#fff;
					}
				}
			}
		}
	}

	.nav-bar-right {
		@apply flex;
	}

	.btn-item {
		@apply flex flex-items-center justify-center box-border;

		.iconfont {
			@apply text-20px;
		}
	}

	@keyframes nav-view-in {
		0% {
			opacity: 0.1;
		}

		100% {
			opacity: 1;
		}
	}
}

.scroll-view {
	padding-top: v-bind(navBarheight);
	/* #ifdef H5 */
	padding-top: 44px;
	/* #endif */
	height: calc(100vh - 44px - var(--status-bar-height));


	.article-container {
		@apply bg-white;
		padding: 5px 12px;

		h1 {
			@apply text-16.5px lh-24px;
		}

		.article-user {
			@apply w-full flex-1 flex justify-between flex-items-center my-15px box-border;

			.user-left {
				@apply flex justify-between flex-items-center;

				.user-avatar {
					@apply w-33px h-33px rd-full mr-6px box-border;
				}

				.user-name {
					@apply text-12px max-w-150px;
				}

				.push-time {
					@apply text-11px text-gray-500;
				}
			}

			.user-right {
				@apply flex flex-items-center;

				.btn {
					@apply flex flex-items-center justify-center text-1px px-8px py-6px bg-#007aff rd-4px;

					.iconfont {
						@apply text-10px text-#fff mr-2px;
					}

					.text {
						@apply text-10px text-#fff;
					}
				}
			}
		}

		.article-content {
			@apply mt-15px text-15px lh-24px text-blueGray-9;
			letter-spacing: 1.2px;

			p {
				line-height: 24px;
				color: #000;
			}

			img {
				text-align: center;
				width: 100%;
				height: auto;
				border-radius: 5px;
			}
		}
	}

	.related-recommend {
		@apply bg-white mt-10px pb-10px pt-8px;

		.title {
			@apply px-12px pt-5px pl-17px;
			position: relative;

			&::before {
				position: absolute;
				left: 12px;
				top: 7px;
				/* #ifdef H5 */
				bottom: 2px;
				/* #endif */
				/* #ifdef APP */
				bottom: 3px;
				/* #endif */
				content: '';
				width: 3px;
				border-radius: 99px;
				background-color: #007aff;
			}
		}
	}

	.safeAreaBottomHeight {
		height: v-bind(safeAreaBottomHeight);
	}
}
</style>
