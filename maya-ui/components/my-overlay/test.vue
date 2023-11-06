<template>
	<button @tap="show = true">显示遮罩层</button>
	<my-gap height="300px"></my-gap>

	<my-overlay v-model:show="show" :custom-style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }" tapClose lockScroll>
		<view class="wrapper"><view class="box" @tap.stop="tapHandle">占位内容</view></view>
	</my-overlay>

	<button>占位</button>
	<button>占位</button>
	<button>占位</button>
	<button>占位</button>

	<my-gap height="900px"></my-gap>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

let show = ref(false);

const tapHandle = () => {
	console.log('tapHandle');
};
</script>
<style lang="scss" scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: calc(50vh - 50px);
	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
		width: 100px;
		border-radius: 8px;
		background-color: #fff;
	}
}
</style>
