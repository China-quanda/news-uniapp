<template>
	<view class="message">
		<view class="Panel-top">
			<view class="Panel">
				<view class="title"><h2>互动消息</h2></view>
				<my-cell title="评论和" value="所有人" />
				<my-cell title="新增粉丝" value="所有人" />
				<my-cell title="点赞" value="所有人" />
				<my-cell title="@我" value="所有人" />
			</view>
		</view>
		<view class="Panel-top">
			<view class="Panel">
				<view class="title"><h2>私信消息</h2></view>
				<my-cell title="谁可以私信我" value="默认" />
				<my-cell title="陌生人消息" value="聚合消息" />
			</view>
		</view>
		<view class="Panel-top">
			<view class="Panel">
				<view class="title"><h2>其他消息</h2></view>
				<my-cell title="问答" value="新回答与所有回答邀请" />
				<my-cell title="专栏" :isLink="false" :clickable="false">
					<block v-slot:value><my-switch v-model:value="checked" /></block>
				</my-cell>
				<my-cell title="圈子" :isLink="false" :clickable="false">
					<block v-slot:value><my-switch v-model:value="checked" /></block>
				</my-cell>
				<my-cell title="话题邀请" :isLink="false" :clickable="false">
					<block v-slot:value><my-switch v-model:value="checked" /></block>
				</my-cell>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let checked = ref<string>(false);
</script>
<style lang="scss" scoped>
.Panel {
	overflow: hidden;
	border-radius: 6px;
	.title {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 10px 15px;
		h2 {
			margin: 0;
			color: #bebec4;
			font-size: 14px;
			font-weight: 400;
		}
	}
}
</style>
