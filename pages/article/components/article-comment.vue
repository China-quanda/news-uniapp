<template>
	<view class="article-comment" ref="comment">
		<view class="comment-item" v-for="item in 1" :key="item">
			<view class="comment-left"><my-avatar src="https://fastly.jsdelivr.net/npm/@vant/assets/cat2s2.jpeg" width="36px" height="36px" /></view>
			<view class="comment-right">
				<view class="header"><my-text bold text="你的Maya" size="13" /></view>
				<view class="comment" @tap="ontapHuifu(item)">
					<my-text text="你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关" size="13" />
				</view>
				<view class="footer">
					<view class="left-action">
						<my-text text="30分钟前 · 广州" size="12" color="#999" />
						<my-text class="action-reply" bold size="12" text="回复" @tap="$emit('onShowPost')" />
					</view>
					<view class="right-action">
						<!-- icon-dianzan_kuai  728ae9-->
						<my-text class="like" bold text="44" prefixIcon="icon-dianzan" size="12" iconSize="14" @tap="ontapLike(item.id)" />
					</view>
				</view>

				<!-- 回复列表 -->
				<view class="reply" v-for="i in 1" :key="i" v-if="true">
					<view class="comment-left"><my-avatar src="https://fastly.jsdelivr.net/npm/@vant/assets/cat2s2.jpeg" iconSize="16" ic width="26px" height="26px" /></view>
					<view class="comment-right">
						<view class="header"><my-text bold text="你的Maya" size="13" /></view>
						<view class="comment" @tap="ontapHuifu(item)">
							<my-text text="你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关,你的英雄难过美人关" size="13" />
						</view>
						<view class="footer">
							<view class="left-action">
								<my-text text="30分钟前 · 广州" size="12" color="#999" />
								<my-text class="action-reply" bold size="12" text="回复" @tap="$emit('onShowPost')" />
							</view>
							<view class="right-action">
								<!-- icon-dianzan_kuai  728ae9-->
								<my-text class="like" bold text="44" prefixIcon="icon-dianzan" size="12" iconSize="14" @tap="ontapLike(item.id)" />
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
					<my-text class="more-icon more-text" size="12" iconSize="14" text="展开3条回复" suffixIcon="icon-xiala" @tap="ontapLike(item.id)" />
					<my-text class="more-icon more-text" size="12" iconSize="14" text="展开更多回复" suffixIcon="icon-xiala" @tap="ontapLike(item.id)" />
					<my-text class="more-icon" size="12" iconSize="14" text="收起" suffixIcon="icon-xiangshang" @tap="ontapLike(item.id)" />
				</view>
			</view>
		</view>

		<!-- 发布评论 -->
		<view class="send-comment" v-if="showSendComment">
			<textarea
				class="textarea"
				v-model="commentContent"
				:placeholder="commentPlaceholder"
				auto-focus
				auto-height
				fixed
				auto-blur
				:cursor-spacing="80"
				@focus="onSendKeyboard"
				@blur="onSendKeyboard"
				confirm-type="send"
			></textarea>
			<my-button v-if="commentContent" class="send-btn" type="primary" size="mini" shape="circle">发送</my-button>
		</view>

		<!-- 评论底部操作栏 -->
		<view class="comment-action" @tap="showSendComment = !showSendComment" v-if="showActionComment">
			<view class="radius-box">
				<my-text class="radius-box-edit" :text="commentContent ? commentContent : commentPlaceholder" prefixIcon="icon-chuangzuo" size="12" iconSize="14" />
				<my-icon icon="icon-weixiao" color="#000" size="22" />
			</view>
			<my-button v-if="commentContent" class="send-btn" style="margin-left: 10px;" type="primary" size="mini" shape="circle">发送</my-button>
		</view>
	</view>
</template>

<script setup lang="ts">
// import { toTree ,transListToTreeData} from '@/utils'
// import { getArticleCommentList ,addCommentLikings,deleteCommentLikings,addComment} from '@/api/comment'
import { ref, onMounted, computed, reactive } from 'vue';
const props = defineProps({
	articleId: {
		type: [Number, String]
		// required: true
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
	bus.$emit('ontapHuifu', item);
};
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
};
// 发布评论
const onPost = async () => {
	const body = {
		article_id: this.articleId,
		content: this.message
	};
	const res = await addComment(body);
	if (!res) return console.log('发布评论失败');
	console.log('发布评论成功');
	this.message = '';
	bus.$emit('postOk');
};
// 获取文章下的评论列表数据
const getArticleCommentList = async (id, params) => {
	const res = await getArticleCommentList(id, params);
	this.total = res.total;
	this.commentList = res.list;
	this.commentList = toTree(res.list);
	// this.queryInfo.pageNum = this.queryInfo.pageNum + 1
};

// 给评论点赞 或取消点赞
const ontapLike = async id => {
	console.log(11);
	if (this.token) {
		const res = await addCommentLikings({ comment_id: id });
		if (res) {
			console.log('点赞成功');
		} else {
			console.log('点过赞了 ， 发请求取消点赞');
			const re = await deleteCommentLikings(id);
			if (!re) return console.log('取消点赞失败');
			console.log('取消点赞成功');
		}
	}
};

onMounted(() => {
	// getArticleCommentList(this.articleId, this.queryInfo);
});
</script>
<style lang="scss" scoped>
.article-comment {
	padding: 0 15px;
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
	left: 0;
	height: 44px;
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
.send-btn {
	margin-left: 8px;
}
.send-comment {
	position: fixed;
	// position: static;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	// align-items: flex-end;
	align-items: center;
	overflow: hidden;
	background-color: #fff;
	padding: 12px;
	.textarea {
		border-radius: 8px;
		padding: 12px !important;
		background-color: #f7f8fa !important;
		// width: 100%;
		min-height: 40px;
		flex: 1;
		// width: auto;
		font-size: 13px;
		::v-deep.uni-textarea-placeholder {
			color: grey;
			overflow: hidden;
			font-size: 13px;
		}
	}
}
</style>
