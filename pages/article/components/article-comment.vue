<template>
	<uni-popup ref="popupRef" type="bottom" @change="popupChange" :safe-area="false">
		<view class="article-comment" :class="{ 'is-fullScreen': isFullScreen }" ref="comment">
			<!-- 状态栏高度 小程序menu高度 -->
			<view v-if="isFullScreen" class="placeholder"></view>
			<!-- 头 -->
			<view class="popup-header">
				<view class="popup-header-wrapper">
					<view class="header-left"> 0条评论 </view>
					<view class="header-right">
						<view class="icon-button" @click="isFullScreen = !isFullScreen">
							<text class="iconfont text-10px text-#868686"
								:class="[isFullScreen ? 'icon-xiala' : 'icon-xiangshang']"></text>
						</view>
						<view class="icon-button" @click="popupClose">
							<text class="iconfont icon-cha text-8px text-#868686"></text>
						</view>
					</view>
				</view>
			</view>

			<!-- 评论 -->
			<view class="comment-item" v-for="(item, index) in 1" :key="item">
				<view class="comment-left">
					<image class="w-36px h-36px rd-full" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
				</view>
				<view class="comment-right">
					<view class="header">
						<text class="text-13px font-500">你的Maya</text>
					</view>
					<view class="comment" @tap="ontapHuifu(item)">
						<text class="text-13px">你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关</text>
					</view>
					<view class="footer">
						<view class="left-action">
							<text class="text-12px text-#999">30分钟前 · 广州</text>
							<text class="action-reply text-12px text-#999" @click="$emit('onShowPost')">回复</text>
						</view>
						<view class="right-action" @click="ontapLike(index)">
							<text class="iconfont icon-dianzan text-14px"></text>
							<text class="m-l-5px text-12px font-500">44</text>
						</view>
					</view>

					<!-- 回复列表 -->
					<view class="reply" v-for="i in 1" :key="i" v-if="true">
						<view class="comment-left">
							<image class="w-26px h-26px rd-full" src="https://img.yzcdn.cn/vant/cat.jpeg" mode="scaleToFill" />
						</view>
						<view class="comment-right">
							<view class="header">
								<text class="text-13px font-500">你的Maya</text>
							</view>
							<view class="comment" @tap="ontapHuifu(item)">
								<text class="text-13px">你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关</text>
							</view>
							<view class="footer">
								<view class="left-action">
									<text class="text-12px text-#999">30分钟前 · 广州</text>
									<text class="action-reply text-12px text-#999" @click="$emit('onShowPost')">回复</text>
								</view>
								<view class="right-action" @click="ontapLike(item)">
									<text class="iconfont icon-dianzan text-14px"></text>
									<text class="m-l-5px text-12px font-500">44</text>
								</view>
							</view>
						</view>
					</view>

					<!-- 展开回复评论 -->
					<view class="more">
						<!-- 该条评论下有评论有显示：展开xx条回复 -->
						<!-- 展开回复后加载前3条回复内容数据后有一下情况：
							1，展示的数据小于3条 => 收起
							2, 展示的数据大于3条 => 展开更多回复 -，展开更多后 暂时完数据后显示 => 收起, 没展示完数据则显示=> 展开更多回复  收起-->

						<view class="more-icon more-text" @click="ontapLike(item)">
							<text class="iconfont icon-xiala text-14px"></text>
							<text class="m-l-5px text-12px font-500">展开3条回复</text>
						</view>
						<view class="more-icon more-text" @click="ontapLike(item)">
							<text class="iconfont icon-xiala text-14px"></text>
							<text class="m-l-5px text-12px font-500">展开更多回复</text>
						</view>
						<view class="more-icon" @click="ontapLike(item)">
							<text class="iconfont icon-xiangshang text-14px"></text>
							<text class="m-l-5px text-12px font-500">收起</text>
						</view>
					</view>
				</view>
			</view>


			<!-- 发布评论 -->
			<view class="send-comment" v-if="showSendComment">
				<view class="textarea-box">
					<textarea class="textarea" :class="{ 'is-text': commentContent }" v-model="commentContent"
						:placeholder="commentPlaceholder" auto-focus fixed auto-blur :adjust-position="false"
						@focus="onSendKeyboard" @blur="onSendKeyboard" confirm-type="send"></textarea>
				</view>
				<view v-show="commentContent"
					class="text-center py-5px px-8px rd-full bg-#007aff text-13px text-white box-border ml-10px w-60px">发送
				</view>
			</view>

			<!-- 评论底部操作栏 -->
			<view class="comment-action" @click="showSendComment = !showSendComment" v-show="showActionComment">
				<view class="radius-box">
					<view class="radius-box-edit">
						<text class="iconfont icon-chuangzuo text-16px text-#000 mr-5px"></text>
						<text class="text-12px">{{ commentContent ? commentContent : commentPlaceholder }}</text>
					</view>
					<text class="iconfont icon-weixiao text-24px text-#000"></text>
				</view>
				<view v-if="commentContent"
					class="send-btn py-4px px-8px rd-full ml-10px shrink text-13px text-white box-border bg-#007aff">发送</view>
			</view>

			<!-- 是否为iPhoneX留出底部安全距离 -->
			<view class="safeArea-inset-bottom-height" v-if="safeAreaInsetBottom"></view>
		</view>
	</uni-popup>
</template>
<script lang="ts">
export default { name: 'article-comment' }
</script>
<script setup lang="ts">
// import { toTree ,transListToTreeData} from '@/utils'
// import { getArticleCommentList ,addCommentLikings,deleteCommentLikings,addComment} from '@/api/comment'
const placeholderheight = ref('0px')
const safeAreaInsetsBottomHeight = ref('0px')
const safeAreaInsetsBottomHeight2 = ref('10px')
let systemInfo: GetSystemInfoResult = {}
const init = () => {
	// #ifndef H5
	systemInfo = uni.getSystemInfoSync()
	placeholderheight.value = systemInfo.statusBarHeight + 'px';
	safeAreaInsetsBottomHeight.value = (systemInfo!.safeAreaInsets?.bottom! || 0) + 'px';
	console.log('safeAreaInsetsBottomHeight', safeAreaInsetsBottomHeight.value)

	// #endif
	// #ifdef MP-WEIXIN
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// console.log('menuButtonInfo', menuButtonInfo)
	placeholderheight.value = (menuButtonInfo.height! || 0) + (systemInfo.statusBarHeight! || 0) + 10 + 'px';
	// #endif

}
const emit = defineEmits<{
	(e: 'onClose'): void
	(e: 'onOpen'): void
	(e: 'onShowPost'): void
	(e: 'onChange', boolean: boolean): void
}>()
const isFullScreen = ref(false)
const popupRef = ref()
const popupChange = (e) => {
	emit('onChange', e.show)
	if (!e.show) {
		emit('onClose')
	} else {
		emit('onOpen')
	}
}
const popupOpen = () => {
	console.log('onOpen')
	emit('onOpen')
	popupRef.value.open()
	init()
}
const popupClose = () => {
	emit('onClose')
	popupRef.value.close()
}
const props = defineProps({
	articleId: {
		type: [Number, String]
		// required: true
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	}
});
let showSendComment = ref(false);
let showActionComment = ref(true);
let commentContent = ref('');
let commentPlaceholder = ref('美好的一天从评论开始~');
let queryInfo = reactive({
	pageNum: 1, // 分页页码
	pageSize: 50 // 页面数据条数
});
let commentList = reactive([]);
let total = ref(0);
const ontapHuifu = item => {
	uni.$emit('ontapHuifu', item);
};
const keyboardheight = ref('0px')
// const keyboardheightchange = (e) => {
// 	console.log('enter', e)
// 	keyboardheight.value = e.detail.height + 'px'
// 	console.log('keyboardheightchange', e.detail.height)
// }
const onSendKeyboard = e => {
	const { type } = e;
	if (type == 'onFocus' || type === 'focus') {
		showSendComment.value = true;
		showActionComment.value = false;
	}
	if (type == 'onBlur' || type === 'blur') {
		showSendComment.value = false;
		showActionComment.value = true;
	}
	keyboardheight.value = (systemInfo!.safeAreaInsets?.bottom! || 0) + (e.detail.height || 0) + 'px'
};
// 发布评论
const onPost = async () => {
	// const body = {
	// 	article_id: this.articleId,
	// 	content: this.message
	// };
	// const res = await addComment(body);
	// if (!res) return console.log('发布评论失败');
	// console.log('发布评论成功');
	// this.message = '';
	// bus.$emit('postOk');
};
// 获取文章下的评论列表数据
const getArticleCommentList = async (id, params) => {
	// const res = await getArticleCommentList(id, params);
	// this.total = res.total;
	// this.commentList = res.list;
	// this.commentList = toTree(res.list);
	// this.queryInfo.pageNum = this.queryInfo.pageNum + 1
};
// 给评论点赞 或取消点赞
const ontapLike = async id => {
	console.log(11);
	// if (this.token) {
	// 	const res = await addCommentLikings({ comment_id: id });
	// 	if (res) {
	// 		console.log('点赞成功');
	// 	} else {
	// 		console.log('点过赞了 ， 发请求取消点赞');
	// 		const re = await deleteCommentLikings(id);
	// 		if (!re) return console.log('取消点赞失败');
	// 		console.log('取消点赞成功');
	// 	}
	// }
};

onMounted(() => {
	// getArticleCommentList(this.articleId, this.queryInfo);
});
defineExpose({
	popupOpen,
	popupClose
})
</script>
<style lang="scss" scoped>
.article-comment {
	--safeArea-insets-bottom-height: v-bind(safeAreaInsetsBottomHeight);
	--keyboard-height: v-bind(keyboardheight);
	--placeholder-height: v-bind(placeholderheight);
	height: 65vh;
	min-height: 65vh;
	padding: 0 15px;
	border-radius: 8px 8px 0px 0px;
	background-color: white;
	overflow-y: auto;
	transition: height 0.3s linear;
	box-sizing: border-box;

	.placeholder {
		// background-color: red;
		height: var(--placeholder-height);
	}

	.safeArea-inset-bottom-height {
		// background-color: #000;
		height: var(--safeArea-insets-bottom-height);
	}

	.popup-header {
		height: 25px;

		.popup-header-wrapper {
			position: fixed;
			left: 0;
			right: 0;
			height: 25px;
			padding: 0px 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 1;

			// background-color: red;
			.header-left {
				font-size: 13px;
			}

			.header-right {
				display: flex;

				.icon-button {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ebebeb;
					width: 20px;
					height: 20px;
					border-radius: 100px;

					&:not(:last-child) {
						margin-right: 10px;
					}
				}
			}
		}
	}

	.comment-item {
		display: flex;
		padding: 15px 0px;

		.comment-left {
			margin-right: 12px;
		}

		.comment-right {

			// flex: 1;
			// text-align: left;
			.comment {
				// margin: 8px 0px;
				margin: 4px 0px 8px 0px;
			}

			.footer {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				line-height: 14px;

				.left-action {
					display: flex;

					.action-reply {
						margin-left: 10px;
						cursor: pointer;
					}
				}

				.right-action {
					.like {
						::v-deep.my-text-all {
							margin-left: 5px;
						}
					}
				}
			}

			.reply {
				display: flex;
				margin-top: 20px;
			}

			.more {
				display: flex;
				margin-top: 10px;

				.more-item {
					// display: flex;
				}

				.more-text {
					margin-right: 30px;
				}

				.more-icon {
					::v-deep.my-text-all {
						// margin-left: 5px;
						margin-right: 3px;
					}
				}
			}
		}
	}

	.comment-action {
		position: fixed;
		right: 0;
		bottom: 0;
		// bottom: v-bind(safeAreaInsetsBottomHeight2);
		// bottom: calc(var(--safeArea-insets-bottom-height) + 0px);
		left: 0;
		height: calc(44px);
		display: flex;
		border-top: 1px solid rgb(245, 245, 245);
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		margin: 0px 12px;

		.radius-box {
			display: flex;
			justify-content: space-between;
			flex: 1;
			height: 30px;
			line-height: 30px;
			// margin: 0px 12px;
			padding: 0px 12px;
			border-radius: 100px;
			background-color: #f3eeee;

			.radius-box-edit {
				::v-deep.my-text-all {
					margin-left: 8px;
				}
			}
		}
	}

	.send-comment {
		position: fixed;
		// position: static;
		left: 0;
		right: 0;
		bottom: var(--keyboard-height);
		display: flex;
		align-items: center;
		overflow: hidden;
		background-color: #fff;
		padding: 12px;
		width: 100%;
		box-sizing: border-box;

		.textarea-box {
			@apply flex flex-items-center box-border;
			flex: 1;
			overflow: hidden;
			min-height: 74px;
			max-height: 94px;

			.textarea {
				border-radius: 8px;
				padding: 12px !important;
				background-color: #f7f8fa !important;
				min-height: 50px;
				max-height: 70px;
				overflow-y: auto;
				width: 100%;
				/* #ifndef MP-WEIXIN */
				box-sizing: border-box;
				width: calc(100% - 24px);
				/* #endif */
				font-size: 14px;

				::v-deep.uni-textarea-placeholder {
					color: grey;
					overflow: hidden;
					font-size: 14px;
				}
			}

			.is-text {
				/* #ifndef MP-WEIXIN */
				width: calc(100% - 24px - 70px) !important;
				/* #endif */

			}
		}

	}

}

.is-fullScreen {
	height: 100vh;
	min-height: 100vh;
	// padding-top: calc(var(--status-bar-height) + 44px);
	// background-color: #000;
	// /* #ifdef APP-PLUS */
	// height: calc(100vh - 44px - var(--status-bar-height));
	// /* #endif */
	// /* #ifdef H5 */
	// height: 100vh;
	// /* #endif */
	// border-radius: unset;
}
</style>