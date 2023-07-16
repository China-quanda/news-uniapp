<template>
	<view class="my-share">
		<!-- <u-popup :show="showShare" mode="bottom" @close="showShare = false" @open="showShare = true" > -->
		<view class="Panel">
			<ul class="Panel-shejiao">
				<li v-for="item in options[0]" @tap="onTap(item)">
					<i :class="'iconfont ' + item.icon"></i>
					<text class="text">{{ item.text }}</text>
				</li>
			</ul>

			<ul class="Panel-item">
				<li v-for="item in options[1]" @tap="onTap(item)">
					<i :class="'iconfont ' + item.icon"></i>
					<text class="text">{{ item.text }}</text>
				</li>
			</ul>
		</view>
		<my-button plain type="primary" @tap="showShare = false">取消</my-button>
		<!-- </u-popup> -->
	</view>
</template>
<script setup lang="ts">
// import bus from '@/utils/bus'
import { ref, reactive, onMounted } from 'vue';
let showShare = ref(false);
let options = reactive([
	[{ text: '微信', icon: 'icon-weixin' }, { text: '朋友圈', icon: 'icon-xinlangweibo' }, { text: '微博', icon: 'icon-xinlangweibo' }, { text: 'QQ', icon: 'icon-qq' }],
	[
		{ text: '复制链接', icon: 'icon-xinlangweibo' },
		{ text: '分享海报', icon: 'icon-xinlangweibo' },
		{ text: '二维码', icon: 'icon-xinlangweibo' },
		{ text: '小程序码', icon: 'icon-xinlangweibo' }
	]
]);
const onTap = item => {
	console.log(item.text);
};
onMounted(() => {
	// bus.$on('onClickShare', () => {
	//   this.showShare = true
	// })
});
</script>

<style lang="scss" scoped>
.my-share {
	background-color: #fff;
	// padding: 15px;
}
.Panel {
	padding: 15px;
	// background-color: #fbfbfb;
}
.Panel-shejiao {
	border-bottom: 0.5px solid #e5e7e8;
	padding-bottom: 10px;
}
ul {
	display: flex;
	justify-content: space-around;
	list-style: none;
	padding: 0;
	margin: 12px 0px;
	// margin-bottom: 20px;
	li {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		cursor: pointer;
	}
}
.text {
	font-size: 12px;
	color: #5a5d5f;
}
.iconfont {
	font-size: 26px;
	width: 42px;
	height: 42px;
	// border: 1px solid #e5e7e8;
	line-height: 42px;
	text-align: center;
	border-radius: 100px;
	margin-bottom: 5px;
	background-color: #fff;
}
.icon-weixin {
	color: rgb(74, 221, 51);
	// border: 1px solid rgb(74, 221, 51);
}
.icon-qq {
	//  font-size:16px;
	color: rgb(87, 139, 222);
	// border: 1px solid rgb(87, 139, 222);
}
.icon-xinlangweibo {
	color: rgb(244, 94, 75);
	// border: 1px solid rgb(244, 94, 75);
}
</style>
