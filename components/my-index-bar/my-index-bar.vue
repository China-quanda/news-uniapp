<template>
	<view class="index-bar" @touchmove="handleTouchMove">
		<view class="index-bar-sidebar">
			<view
				class="sidebar-index"
				:class="{ 'sidebar-active': sidebarActive === index }"
				v-for="(item, index) in indexList"
				:key="index"
				@tap="handleSelect({ index: index, item: item })"
			>
				{{ item }}
			</view>
		</view>
		<slot></slot>
	</view>
</template>
<script lang="ts" setup>
import { onMounted, provide, ref, watch } from 'vue';
const props = defineProps({
	indexList: {
		// 索引字符列表
		type: Array,
		default: () => []
	},
	zIndex: {
		// z-index 层级
		type: [String, Number],
		default: 1
	},
	sticky: {
		// 是否开启锚点自动吸顶
		type: Boolean,
		default: true
	},
	stickyOffsetTop: {
		// 锚点自动吸顶时与顶部的距离
		type: String,
		default: '0px'
	},
	inactiveColor: {
		// 右边锚点状态非激活时的颜色
		type: String,
		default: '#606266'
	},
	activeColor: {
		// 右边锚点状态激活时的颜色
		type: String,
		default: '#1989fa'
	}
	// teleport: {
	// 	// 指定索引栏挂载的节点
	// 	type: String,
	// 	default: ''
	// }
});
provide('indexBar', props);

interface EmitsType {
	(e: 'select', e): void;
	(e: 'change', e): void;
}
const emit = defineEmits<EmitsType>();

let anchors = [];
let active = ref({});
let sidebarActive = ref(0);
let indexBar = ref({});
let systemInfo = uni.getSystemInfoSync();

watch(active, () => {
	console.log(11);
	emit('change',active.value)
	uni.$emit('active', { active: active.value, indexBar: indexBar.value, systemInfo });
});

onMounted(() => {
	const query = uni.createSelectorQuery().in(this);
	query
		.selectAll('.index-anchor')
		.boundingClientRect(data => {
			anchors = data;
			// active.value = anchors[sidebarActive.value];
		})
		.exec();

	query
		.select('.index-bar')
		.boundingClientRect(data => {
			indexBar.value = data;
		})
		.exec();
});

const handleTouchMove = event => {
	const query = uni.createSelectorQuery().in(this);
	let barQuery = query.select('.index-bar');
	barQuery
		.boundingClientRect(data => {
			let top = Math.abs(data.top);
			anchors.find((item, index) => {
				let itemTop = Math.abs(item.top);
				if (top + 15 >= itemTop) {
					active.value = item;
					sidebarActive.value = index;
					// console.log(active);
				}
			});
		})
		.exec();
};

const handleSelect = row => {
	emit('select', row);
	sidebarActive.value = row.index;
	active.value = anchors[row.index];
	uni.pageScrollTo({
		scrollTop: active.value.top,
		duration: 200
	});
};
</script>

<style lang="scss" scoped>
.index-bar {
	position: relative;
	z-index: v-bind('props.zIndex');
}
.index-bar-sidebar {
	position: fixed;
	top: 50%;
	right: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	text-align: center;
	transform: translateY(-50%);
	cursor: pointer;
	-webkit-user-select: none;
	user-select: none;
	.sidebar-index {
		padding: 0px 8px 0px 16px;
		font-weight: 600;
		font-size: 12px;
		line-height: 14px;
		color: v-bind('props.inactiveColor');
	}
	.sidebar-active {
		color: v-bind('props.activeColor');
		font-weight: 700;
	}
}
</style>
