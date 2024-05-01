<template>
	<view class="edit">
		<my-nav-bar :title="'编辑' + title" rightText="提交" @clickLeft="leftClick" @clickRight="rightClick" border
			:class="isEditValue ? '' : 'right-text'" />

		<view class="container">
			<uni-easyinput v-if="type == 'input'" type="text" v-model="value" :placeholder="placeholder" trim focus />
			<textarea v-if="type == 'textarea'" v-model="value" :placeholder="placeholder" focus :cursor="value"></textarea>

			<!-- <u-modal
				:show="showModal"
				content="直接返回修改不会生效.是否提交修改？"
				confirmText="提交"
				cancelText="直接返回"
				showCancelButton
				@confirm="rightClick"
				@cancel="close"
			></u-modal> -->
		</view>
	</view>
</template>
<script setup lang="ts">

import router from '@/utils/router';
import prompt from '@/utils/prompt';
let checked = ref<boolean>(false);
let showModal = ref<boolean>(false);
let value = ref<string>(null);
let valueData = ref<string>(null);
let title = ref<string>('编辑资料');
let type = ref<string>('input');
onLoad((o) => {
	value.value = o.valueData
	valueData.value = o.valueData
	title.value = o.title
	type.value = o.type
})
const placeholder = computed(() => {
	return `请输入${title.value}`;
});
const isEditValue = computed(() => {
	if (!value.value) return false;
	if (valueData.value == value.value) return false;
	return true;
});
const rightClick = () => {
	if (!value.value) return prompt.msg(placeholder);
	if (valueData.value == value.value) return prompt.msg(`您未修改${title.value}`);
	// this.$emit('edit', value);
	router.back()
};

const leftClick = () => {
	if (value.value && value.value == valueData.value) return router.back();
	if (!value.value && value.value == valueData.value) return router.back();
	if (!value.value && value.value != valueData.value) return uni.showModal({
		title: `编辑${title.value}提示`,
		content: '直接返回修改不会生效.是否提交修改？',
		confirmText: '提交',
		cancelText: '直接返回',
		success(result) {
			if (result.confirm) {
				rightClick();
			} else if (result.cancel) {
				router.back();
			}
		},
	} as ShowModalOptions);
	if (value.value && value.value != valueData.value) return uni.showModal({
		title: `编辑${title.value}提示`,
		content: '直接返回修改不会生效.是否提交修改？',
		confirmText: '提交',
		cancelText: '直接返回',
		success(result) {
			if (result.confirm) {
				rightClick();
			} else if (result.cancel) {
				router.back();
			}
		},
	} as ShowModalOptions);
};
</script>
<style lang="scss" scoped>
.container {
	margin-top: 50px;
	padding: 10px;
}

.right-text {
	// /deep/.u-navbar__content__right {
	// 	color: #ccc;
	// }
}
</style>
