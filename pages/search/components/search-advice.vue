<template>
	<view class="advice">
		<view class="item ellipsis1" v-for="(advice, index) in list" :key="index" @click="emit('onClick', advice)">
			<text class="iconfont icon-sousuo text-#999"></text>
			<view v-html="highlight(advice)"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
const props = defineProps({
	list: {
		type: Array,
		required: true,
		default: () => []
	},
	keyword: {
		type: String,
		default: ''
	}
});

const emit = defineEmits<{
	(e: 'onClick', row): void
}>()

// 微信小程序没有红色高亮效果

const highlight = str => {
	// #ifndef MP-WEIXIN
	const highlightStr = `<text style="color:red;">${props.keyword}</text>`;
	str = str.replace(new RegExp(props.keyword, 'gi'), highlightStr);
	// #endif
	return str
};
// const tapAdvice = keyword => {
// 	console.log('点击类型建议item 发请求查询文章', keyword);
// 	// this.$emit('onSearch', keyword);
// 	// this.list = [] // 清空联想建议才能显示搜索结果
// 	// this.hotSearchResList.push(item)
// 	// this.keyword = item
// 	// this.getArticleList()
// 	// this.$emit('close')
// };
</script>

<style lang="scss" scoped>
.advice {
	.item {
		@apply text-15px h40px flex flex-items-center gap-x5px;
		border-bottom: 0.5px solid #f2f3f6;
	}
}
</style>
