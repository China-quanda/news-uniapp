<template>
	<view class="info-author">
		<view class="author-left" @click="goToUser(article?.user.id)">
			<view class="author-avatar">
				<my-avatar :src="article?.user?.avatar" width="35px" height="35px" />
			</view>
			<view class="author-name">
				<my-text bold>{{ article?.user?.username }}</my-text>
				<view class="author-more">
					<my-text lines="1" size="12"
						color="#c8c3c3">{{ `${article?.createTime} · ${article?.user?.introduce || ''}` }}</my-text>
				</view>
			</view>
		</view>
		<my-button type="primary" :plain="isWage" :text="isWage ? '已关注' : '+ 关注'" size="small"
			@click="focuAuthor(article?.user?.id)" />
	</view>
</template>
<script lang="ts">
	export default { name: 'info-author' }
</script>
<script setup lang="ts">
	import { addFocus, destroyFocus } from '@/api/fans'
	import { onMounted } from 'vue';
	import { useUserStore } from '@/store/user'
	const userStore = useUserStore()
	const props = defineProps({
		article: {
			type: Object,
			default: () => { }
		},
		isWage: {
			type: Boolean,
			default: false
		}
	})
	const emit = defineEmits<{
		(e : 'onIsWage', boolean : boolean) : void
	}>()
	const goToUser = (userId) => {
		console.log('userId', userId);
	}
	const focuAuthor = async (id) => {
		if (!userStore.token) return console.log('去登录');
		if (props.isWage) {
			const res = await destroyFocus(id)
			if (res.data.destroy) {
				emit('onIsWage', false)
			}
		} else {
			const res = await addFocus(id)
			if (res.data.isFocu) {
				emit('onIsWage', true)
			}
		}
	};
</script>

<style scoped lang="scss">
	.info-author {
		color: #000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px 0px;
		box-sizing: border-box;

		.author-left {
			display: flex;
			flex: 1;
			align-items: center;

			.author-avatar {
				line-height: 10px;
				// margin-top: 5px;
				margin-right: 15px;
			}

			.author-name {
				display: flex;
				flex: 1;
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
				display: flex;
				margin-right: 10px;
			}
		}
	}
</style>