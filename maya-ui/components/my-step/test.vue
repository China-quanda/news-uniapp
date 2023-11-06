<template>
	<view class="">
		基本使用
		通过direction属性设置row-横向，column-竖向
		<my-step direction="row" current="1">
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>

		<my-step direction="column" current="2">
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>


		显示点类型
		通过dot属性设置显示点类型
		<my-step direction="row" current="1" dot>
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>

		<my-step direction="column" current="2" dot>
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>

		自定义图标
		通过activeIcon属性设置激活状态的图标，inactiveIcon属性设置未激活状态图标
		<my-step direction="row" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>

		<my-step direction="column" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
			<my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc">
			</my-step-item>
		</my-step>

		自定义内容
		icon：图标，title：标题，desc：描述
		<my-step direction="row" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
			<my-step-item v-for="(item,index) in list" :num="index">
				<template #icon>
					<i :class="`iconfont icon-weixiao`"></i>
				</template>
				<template #title>
					title
				</template>
				<template #desc>
					desc
				</template>
			</my-step-item>
		</my-step>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const list = ref([
  { title: "已下单", desc: "10:30" },
  { title: "已发货", desc: "11:31" },
  { title: "已发货", desc: "11:31" },
  { title: "运输中", desc: "12:55" },
]);
</script>

<style>
</style>