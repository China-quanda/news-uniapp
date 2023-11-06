<template>
	<view class="list">
		<scroll-view
			class="scroll"
			:scroll-y="true"
			:scroll-top="scrollTop"
			:upper-threshold="upperThreshold"
			:lower-threshold="lowerThreshold"
			:enable-back-to-top="enableBackToTop"
			:show-scrollbar="showScrollbar"
			:refresher-enabled="refresherEnabled"
			:refresher-threshold="refresherThreshold"
			:refresher-default-style="refresherDefaultStyle"
			:refresher-background="refresherBackground"
			:refresher-triggered="refresherTriggered"
			:scroll-with-animation="scrollWithAnimation"
			@scrolltoupper="scrolltoupper"
			@scrolltolower="scrolltolower"
			@scroll="scroll"
			@refresherpulling="refresherpulling"
			@refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore"
			@refresherabort="refresherabort"
		>
			<view v-show="list.length >0">
				<slot name="topLoading">
					<view class="topBox">
						<view class="loader">
							<view v-for="(v, i) in 10" :key="v" :style="{ transform: 'rotate(' + i * 36 + 'deg)', animationDelay: v == 10 ? 1 + 's' : '0.' + v + 's' }"></view>
						</view>
						<view class="load-text">{{ topTis }}</view>
					</view>
				</slot>
				<slot></slot>
				<slot name="bottomLoading"><my-load-more :status="loadMoreStatus" @loadmore="loadListData" /></slot>
			</view>
			<view v-show="list.length <=0">
				<slot name="empty">
					<my-empty></my-empty>
				</slot>
			</view>
		</scroll-view>
		<my-back-top v-if="showBackTop" :scrollTop="scrollTop" @click="backTop" />
	</view>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
const props = defineProps({
	upperThreshold: {
		// 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
		type: [String, Number],
		default: '50'
	},
	lowerThreshold: {
		// 距底部/右边多远时（单位px），触发 scrolltolower 事件
		type: [String, Number],
		default: '80'
	},
	enableBackToTop: {
		// iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
		type: Boolean,
		default: true
	},
	showScrollbar: {
		// 控制是否出现滚动条
		type: Boolean,
		default: false
	},
	refresherEnabled: {
		// 开启自定义下拉刷新
		type: Boolean,
		default: false
	},
	scrollWithAnimation: {
		// 在设置滚动条位置时使用动画过渡
		type: Boolean,
		default: false
	},
	refresherThreshold: {
		// 设置自定义下拉刷新阈值
		type: [String, Number],
		default: 45
	},
	refresherDefaultStyle: {
		// 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
		type: String,
		default: 'none'
	},
	refresherBackground: {
		// 设置自定义下拉刷新区域背景颜色
		type: String,
		default: '#f7f7f7'
	},
	height: {
		// 列表的高度
		type: String,
		default: '80vh'
	},
	width: {
		// 列表的宽度
		type: String,
		default: 'auto'
	},
	showBackTop: {
		// 是否显示返回顶部按钮 开启后scrollTop大于200会显示
		type: Boolean,
		default: true
	},
	query: {
		// 自定义列表查询参数
		type: Object,
		default: () => {}
	},
	// getlist: {
	// 	// 自定获取数据api接口
	// 	type: Function,
	// 	default: () => {}
	// }
});

interface EmitsType {
	(e: 'getData', e): void;
	(e: 'scrolltoupper', e): void;
	(e: 'scrolltolower', e): void;
	(e: 'scroll', e): void;
	(e: 'refresherpulling', e): void;
	(e: 'refresherrefresh', e): void;
	(e: 'refresherrestore', e): void;
	(e: 'refresherabort', e): void;
}
const emit = defineEmits<EmitsType>();

let refresherTriggered = ref(false);
let topTis = ref('松手刷新');
let scrollTop = ref(0);
let loadMoreStatus = ref<'loadmore' | 'loading' | 'nomore'>('loadmore');
let list = ref([]);
let pageInfo = reactive({
	pageNum: 1,
	pageSize: 10,
	total: 0
});
let flag = true;
const loadListData = async () => {
	if (!flag) return console.log('请勿频繁加载');
	flag = false;
	if (loadMoreStatus.value === 'nomore') return console.log('没有更多了');
	loadMoreStatus.value = 'loading';
	const params = {
		pageNum: pageInfo.pageNum,
		pageSize: pageInfo.pageSize,
		...props.query
	};
	// console.log('params', params, pageInfo);
	const res = await getlist(params);
	list.value = pageInfo.pageNum > 1 ? list.value.concat(res.data.list) : res.data.list;
	pageInfo.total = res.data.total;
	pageInfo.pageNum++;
	// console.log('res', res.data, 'list', list.value);
	emit('getData', { ...pageInfo, ...props.query, list: list.value });
	flag = true;
};

const getlist = query => {
	return new Promise((resolve, reject) => {
		let list = [];
		let total = 0;
		if (query.pageNum == 1) {
			list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			total = 30;
		}
		if (query.pageNum == 2) {
			list = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
			total = 30;
		}
		if (query.pageNum == 3) {
			list = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
			total = 30;
		}
		if (query.pageNum == 4) {
			list = [];
			total = 30;
		}
		setTimeout(() => {
			resolve({
				code: 200,
				data: {
					list,
					total
				},
				message: 'success'
			});
		}, 1000);
	});
};

onMounted(() => {
	loadListData();
});

watch(list, () => {
	if (!list.value.length) loadMoreStatus.value = 'nomore';
	if (list.value.length < pageInfo.total) loadMoreStatus.value = 'loadmore';
	if (list.value.length >= pageInfo.total) loadMoreStatus.value = 'nomore';
});

// 滚动到顶部/左边，会触发 scrolltoupper 事件
const scrolltoupper = e => {
	emit('scrolltoupper', e);
	// console.log(e,'滚动到顶部/左边，会触发 scrolltoupper 事件');
};
// 滚动到底部/右边，会触发 scrolltolower 事件
const scrolltolower = e => {
	emit('scrolltolower', e);
	// console.log(e, '滚动到底部/右边，会触发 scrolltolower 事件');
	loadListData();
};
const scroll = e => {
	emit('scroll', e);
	scrollTop.value = e.detail.scrollTop;
};
const refresherpulling = e => {
	emit('refresherpulling', e);
	// console.log(e, 'refresherpulling自定义下拉刷新控件被下拉');
};
const refresherrefresh = async e => {
	emit('refresherrefresh', e);
	// console.log(e, 'refresherrefresh自定义下拉刷新被触发');
	topTis.value = '努力加载中';
	if (!refresherTriggered.value) {
		refresherTriggered.value = true;
		pageInfo.pageNum = 1;
		flag = true;
		loadMoreStatus.value = 'loading';
		await loadListData();
		refresherTriggered.value = false;
		topTis.value = '松手刷新';
	}
};
const refresherrestore = e => {
	emit('refresherrestore', e);
	// console.log(e,'refresherrestore自定义下拉刷新被复位');
};
const refresherabort = e => {
	emit('refresherabort', e);
	// console.log(e,'refresherabort自定义下拉刷新被中止');
};
const backTop = () => {
	scrollTop.value = 0;
};
</script>

<style lang="scss" scoped>
.scroll {
	height: v-bind('props.height');
	width: v-bind('props.width');
}

.topBox {
	margin-top: -40px;
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: relative;
		margin-top: -25rpx;
		& view {
			width: 2px;
			height: 6px;
			background-color: gray;
			transform-origin: 50% 150%;
			position: absolute;
			animation: color-change 1s infinite;
		}
	}
	.load-text {
		margin-left: 20px;
		color: #d6d6d6;
		font-size: 14px;
		z-index: 2;
	}
}

@keyframes color-change {
	from {
		background-color: gray;
	}

	to {
		background-color: white;
	}
}
</style>
