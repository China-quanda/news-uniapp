<template>
	<view class="list">
		<scroll-view class="scroll" :scroll-y="true" :scroll-top="scrollTop" :upper-threshold="upperThreshold"
			:lower-threshold="lowerThreshold" :enable-back-to-top="enableBackToTop" :show-scrollbar="showScrollbar"
			:refresher-enabled="list.length>0 && refresherEnabled" :refresher-threshold="refresherThreshold"
			:refresher-default-style="refresherDefaultStyle" :refresher-background="refresherBackground"
			:refresher-triggered="refresherTriggered" :scroll-with-animation="scrollWithAnimation"
			@scrolltoupper="scrolltoupper" @scrolltolower="scrolltolower" @scroll="scroll"
			@refresherpulling="refresherpulling" @refresherrefresh="refresherrefresh" @refresherrestore="refresherrestore"
			@refresherabort="refresherabort">
			<view v-show="list.length >0">
				<slot name="topLoading">
					<view class="topBox">
						<view class="loader">
							<view v-for="(v, i) in 10" :key="v"
								:style="{ transform: 'rotate(' + i * 36 + 'deg)', animationDelay: v == 10 ? 1 + 's' : '0.' + v + 's' }">
							</view>
						</view>
						<view class="load-text">{{ topTis }}</view>
					</view>
				</slot>
				<slot></slot>
				<template v-if="list.length && !refresherTriggered">
					<slot name="bottomLoading">
						<my-load-more :status="loadMoreStatus" @loadmore="loadListData(pageInfo.pageNum+1)" />
					</slot>
				</template>
			</view>
			<template v-if="!list.length && loading">
				<slot name="loading">
					<my-empty :text="loadingText" icon="icon-sousuo"/>
				</slot>
			</template>
			<view v-show="!list.length && !loading">
				<slot name="empty">
					<my-empty></my-empty>
				</slot>
			</view>
		</scroll-view>
		<my-back-top bottom="60px" v-if="showBackTop" :scrollTop="scrollTop" @click="backTop" />
	</view>
</template>
<script lang="ts" setup>
	import { onMounted, ref,watch } from 'vue';
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
			default: '100vh'
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
		loading: {
			// loading
			type: Boolean,
			default: false
		},
		loadingText:{
			type:String,
			default: '数据加载中'
		},
		pageInfo: {
			// 自定义列表查询参数
			type: Object,
			default: () => { }
		},
		list: {
			// 数据
			type: Object,
			default: () => []
		},
		loadData: {
			// 自定获取数据api接口
			type: Function,
			default: (val) => { }
		}
	});

	interface EmitsType {
		(e : 'scrolltoupper', e) : void;
		(e : 'scrolltolower', e) : void;
		(e : 'scroll', e) : void;
		(e : 'refresherpulling', e) : void;
		(e : 'refresherrefresh', e) : void;
		(e : 'refresherrestore', e) : void;
		(e : 'refresherabort', e) : void;
	}
	const emit = defineEmits<EmitsType>();
	// 是否下拉中
	const refresherTriggered = ref(false);
	// 加载提示语
	const topTis = ref('松手刷新');
	// 滑动距离
	const scrollTop = ref(0);
	// 加载状态
	const loadMoreStatus = ref<'loadmore' | 'loading' | 'nomore'>('loadmore');

	// 加载数据
	const loadListData = (pageNum = 1) => {
		return new Promise((resolve, reject) => {
			if (props.loading) return reject('请勿频繁加载');
			if (loadMoreStatus.value === 'nomore') {
				topTis.value = '没有更多了！';
				setTimeout(() => {
					refresherTriggered.value = false;
					topTis.value = '松手刷新';
				}, 500)
				return reject('没有更多了');
			}
			loadMoreStatus.value = 'loading';
			topTis.value = '努力加载中';
			props.loadData(pageNum).then((result) => {
				loadMoreStatus.value = 'loadmore';
				if (!props.list.length) loadMoreStatus.value = 'nomore';
				if (props.list.length < props.pageInfo.total) loadMoreStatus.value = 'loadmore';
				if (props.list.length >= props.pageInfo.total) loadMoreStatus.value = 'nomore'
				topTis.value = '加载数据成功';
				setTimeout(() => {
					refresherTriggered.value = false;
					topTis.value = '松手刷新';
				}, 500)
				resolve('加载数据成功')
			}).catch(err => {
				loadMoreStatus.value = 'loadmore';
				topTis.value = '数据加载失败！';
				setTimeout(() => {
					refresherTriggered.value = false;
					topTis.value = '松手刷新';
				}, 500)
				reject('加载数据失败');
			})
		})
	}
	watch(()=>props.loading,(newValue)=>{
		if(newValue){
			uni.showLoading({ title: props.loadingText, mask:true });
		}else{
			uni.hideLoading();
		}
	},{immediate:true})

	// 滚动到顶部/左边，会触发 scrolltoupper 事件
	const scrolltoupper = e => {
		emit('scrolltoupper', e);
		// console.log(e,'滚动到顶部/左边，会触发 scrolltoupper 事件');
	};
	// 滚动到底部/右边，会触发 scrolltolower 事件
	const scrolltolower = e => {
		emit('scrolltolower', e);
		// console.log(e, '滚动到底部/右边，会触发 scrolltolower 事件')
		if (!props.list.length) loadMoreStatus.value = 'nomore';
		loadListData(props.pageInfo.pageNum + 1);
	};
	// 页面滑动触发
	const scroll = e => {
		emit('scroll', e);
		scrollTop.value = e.detail.scrollTop;
	};
	// 自定义下拉刷新控件被下拉
	const refresherpulling = e => {
		emit('refresherpulling', e);
		// console.log(e, 'refresherpulling自定义下拉刷新控件被下拉');
	};
	// 自定义下拉刷新被触发
	const refresherrefresh = async e => {
		emit('refresherrefresh', e);
		// console.log(e, 'refresherrefresh自定义下拉刷新被触发');
		if (!refresherTriggered.value) {
			refresherTriggered.value = true;
			loadListData()
		}
	};
	// 自定义下拉刷新被复位触发
	const refresherrestore = e => {
		emit('refresherrestore', e);
		// console.log(e,'refresherrestore自定义下拉刷新被复位');
	};
	// 自定义下拉刷新被中止触发
	const refresherabort = e => {
		emit('refresherabort', e);
		// console.log(e,'refresherabort自定义下拉刷新被中止');
	};
	// 返回顶部
	const backTop = () => {
		scrollTop.value = 0;
	};
	onMounted(() => {
		loadListData()
	});
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