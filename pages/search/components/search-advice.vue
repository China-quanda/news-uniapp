<template>
	<view class="advice">
		<view class="item ellipsis1" v-for="(advice, index) in list" :key="index" @click="emit('onClick',advice)">
			<uni-icons type="search" size="18" color="#999" />
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
		(e : 'onClick', row) : void
	}>()
	
const highlight = str => {
	const highlightStr = `<text style="color:red">${props.keyword}</text>`;
	return str.replace(new RegExp(props.keyword, 'gi'), highlightStr);
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
	height: calc(100vh - 44px);
	background-color: $uni-bg-color;
	.item {
		.iconfont {
			margin-right: 10px;
		}
		margin: 0px 12px;
		font-size: 16px;
		height: 45px;
		line-height: 1;
		border-bottom: 0.5px solid #e2e5ea;
		display: flex;
		align-items: center;
	}
}
</style>
