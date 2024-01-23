<template>
	<view class="info-action">
		<view class="info-action-row" @tap="tapItem('comment')">
			<my-icon icon="icon-xiaoxi" size="23" />
			<my-text class="row-text">{{ info.commentCount ? info.commentCount : '评论' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('collect')">
			<my-icon :icon="collect ? 'icon-shoucang1' : 'icon-shoucang'" :color="collect ? '#728ae9' : '#8a8a8a'"
				size="23" />
			<my-text class="row-text">{{ info.collectCount ? info.collectCount : '收藏' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('like')">
			<my-icon :icon="like ? 'icon-dianzan_kuai' : 'icon-dianzan'" :color="like ? '#728ae9' : '#8a8a8a'" size="23" />
			<my-text class="row-text">{{ info.likeCount ? info.likeCount : '点赞' }}</my-text>
		</view>

		<view class="info-action-row" @tap="tapItem('share')">
			<my-icon icon="icon-fenxiang" size="23" />
			<my-text class="row-text">分享</my-text>
		</view>
	</view>
</template>
<script lang="ts">
	export default { name: 'info-action' }
</script>
<script lang="ts" setup>
	import { destroyArticleLike, isLike, addArticleLike } from '@/api/articleLike'
	import { destroyArticleCollect, isCollect, addArticleCollect } from '@/api/articleCollect'
	import { onMounted, ref } from 'vue';
	import { shareSystem } from '@/utils/share'
	import { useUserStore } from '@/store/user'
	const userStore = useUserStore()
	import prompt from '@/utils/prompt';
	const emit = defineEmits<{
		(e : 'onAction', id : string) : void
		(e : 'onRefresh') : void
		(e : 'onClickShare') : void
		(e : 'onClickLike') : void
		(e : 'onClickComment') : void
		(e : 'onClickCollect') : void
	}>()

	interface IPorps {
		type ?: string
		info : any
	};

	const props = withDefaults(defineProps<IPorps>(), {
		type: 'article'
	});

	const tapItem = (value : any) => {
		emit('onAction', value);
		if (value === 'share') handleShare()
		if (value === 'like') handleLike()
		if (value === 'comment') handleComment()
		if (value === 'collect') handleCollect()
	};

	const like = ref(false);
	// 查看当前文章是否已点赞
	const hshLike = () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		// 查看当前文章是否已点赞
		isLike(props.info.id).then(res => {
			like.value = res.data.isLike
		})
	};
	// 点赞或取消点赞
	const handleLike = async () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		emit('onClickLike')
		if (like.value) {
			if (props.type === 'article') {
				const res = await destroyArticleLike(props.info.id)
				if (res.data.destroy) like.value = false
				emit('onRefresh')
			}
		} else {
			if (props.type === 'article') {
				const res = await addArticleLike(props.info.id)
				if (res.data.isLike) like.value = true
				emit('onRefresh')
			}
		}
	};
	const collect = ref(false);
	// 查看当前文章是否已点赞
	const hshCollect = () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		// 查看当前文章是否已点赞
		isCollect(props.info.id).then(res => {
			collect.value = res.data.isCollect
		})
	};
	// 收藏或取消收藏
	const handleCollect = async () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		emit('onClickCollect')
		if (collect.value) {
			if (props.type === 'article') {
				const res = await destroyArticleCollect(props.info.id)
				if (res.data.destroy) collect.value = false
				emit('onRefresh')
			}
		} else {
			if (props.type === 'article') {
				const res = await addArticleCollect(props.info.id)
				if (res.data.isCollect) collect.value = true
				emit('onRefresh')
			}
		}
	};
	// 点击分享
	const handleShare = () => {
		emit('onClickShare')
		if (props.type === 'article') {
			// #ifdef APP-PLUS
			shareSystem({
				type: 'text',
				title: props.info.title,
				content: props.info.title,
			})
			// #endif
		}
		if (props.type === 'comment') {
			// #ifdef APP-PLUS
			shareSystem({
				type: 'text',
				title: props.info.content,
				content: props.info.content,
			})
			// #endif
		}
	};
	onMounted(() => {
		hshLike()
		hshCollect()
	})

	// 点击评论按钮，跳转到评论喵点
	const handleComment = () => {
		if (!userStore.token) return prompt.msg(`请先登录`)
		emit('onClickComment')
		// if (!this.$route.hash) {
		// 	this.$router.push('#comment');
		// }
	};
</script>
<style lang="scss" scoped>
	.info-action {
		height: 44px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// line-height: 50px;
		box-sizing: border-box;
		background-color: #fff;
		bottom: 0;

		.comment {
			font-size: 12px;
			// border-radius:1px solid #ccc;
			padding: 0 19px;
			// margin: 5 15px;
			border: none;
			height: 30px;
			border-radius: 50px;
		}

		.info-action-row {
			display: flex;

			.row-text {
				margin-left: 8px;
			}
		}
	}
</style>