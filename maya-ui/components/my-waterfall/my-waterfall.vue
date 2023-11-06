<template>
	<my-list refresherEnabled showBackTop height="100vh" @get-data="getData">
		<view class="waterfall">
			<view class="waterfall-left" ref="left"><image class="image" v-for="(item, i) in leftList" :key="i" :src="item" mode="widthFix"></image></view>
			<view class="waterfall-right" ref="right"><image class="image" v-for="(item, i) in rightList" :key="i" :src="item" mode="widthFix"></image></view>
		</view>
	</my-list>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
const props = defineProps({
	height: {
		// 间隔槽高度，单位px
		type: [String, Number],
		default: '20px'
	},
	marginTop: {
		// 与前一个元素的距离，单位px
		type: [String, Number],
		default: 0
	},
	marginBottom: {
		// 与后一个元素的距离，单位px
		type: [String, Number],
		default: 0
	},
	bgColor: {
		// 背景颜色 transparent(背景透明)
		type: String,
		default: 'transparent'
	}
});
let list = ref([]);
const getData = e => {
	console.log('getData', e);
	list.value = e.list;
	setWaterFallLayout2()
};
let imageList = ref([
	'https://img0.baidu.com/it/u=1345303087,1528317222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082',
	'https://img2.baidu.com/it/u=1893470775,4143435497&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
	'https://img0.baidu.com/it/u=1088754973,1390499664&fm=253&fmt=auto&app=138&f=JPEG?w=335&h=500',
	'https://img1.baidu.com/it/u=3866290852,3566512524&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
	'https://img2.baidu.com/it/u=1114729443,1120710416&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
	'https://img0.baidu.com/it/u=1345303087,1528317222&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082',
	'https://img2.baidu.com/it/u=1893470775,4143435497&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
	'https://img0.baidu.com/it/u=1088754973,1390499664&fm=253&fmt=auto&app=138&f=JPEG?w=335&h=500'
]); //所有图片
let leftList = ref([]); //左边列图片
let rightList = ref([]); //右边列图片
let columnWidth = ref(0); //列宽度
let rightHeight = ref(0); //右边列高度
let leftHeight = ref(0); //左边列高度
onMounted(() => {
	nextTick(() => {
		uni
			.createSelectorQuery()
			.in(this)
			.select('.waterfall-left')
			.boundingClientRect(res => {
				console.log(res);
				columnWidth.value = res.width;
				//方法1
				// setWaterFallLayout();
				//方法2
				// setWaterFallLayout2()
			})
			.exec();
	});
});
//方法1通过img.onload，小程序不支持
const setWaterFallLayout = async () => {
	for (let item of imageList.value) {
		let img = new Image();
		img.src = item;
		try {
			let h = await getImgHeight(img);
			if (leftHeight.value <= rightHeight.value) {
				leftList.value.push(item);
				leftHeight.value += h;
			} else {
				rightList.value.push(item);
				rightHeight.value += h;
			}
		} catch (e) {
			console.log(e);
		}
	}
};

//获取图片高度
const getImgHeight = img => {
	return new Promise((resolve, reject) => {
		img.onload = () => {
			let h = (img.height / img.width) * columnWidth.value;
			resolve(h);
		};
		//加载出错
		img.onerror = () => {
			reject('error');
		};
	});
};
//方法2通过uni.getImageInfo，小程序支持
const setWaterFallLayout2 = async () => {
	for (let item of imageList.value) {
		try {
			let h = await getImgHeight2(item);
			if (leftHeight.value <= rightHeight.value) {
				leftList.value.push(item);
				leftHeight.value += h;
			} else {
				rightList.value.push(item);
				rightHeight.value += h;
			}
		} catch (e) {}
	}
};
const getImgHeight2 = url => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: url,
			success: e => {
				resolve(e.height);
			},
			fail: e => {
				reject(e);
			}
		});
	});
};
</script>

<style lang="scss" scoped>
.waterfall {
	width: 100%;
	// min-height: 100vh;
	display: flex;
	align-items: flex-start;
	padding: 2% 1% 0px 1%;
	box-sizing: border-box;
	.waterfall-left,
	.waterfall-right {
		margin: 0 auto;
		width: 48%;
		box-sizing: border-box;
	}
	.image {
		width: 100%;
		height: auto;
		border-radius: 4px;
		margin-bottom: 3px;
	}
}
</style>
