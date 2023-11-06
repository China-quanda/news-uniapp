#BackTop 返回顶部 

**介绍**
该组件一个用于长页面，滑动一定距离后，出现返回顶部按钮，方便快速返回顶部的场景。


**基本使用**
由于返回顶部需要实时监听滚动条的位置，从而判断返回的按钮该出现还是隐藏，由于组件无法得知页面的滚动条信息，只能在页面的onPageScroll生命周期 中获得滚动条的位置，故需要在页面监听onPageScroll生命周期，实时获得滚动条的位置，通过Props传递给组件。

```

<template>
		<view class="" v-for="(item, index) in 50" style="border-bottom: 1px solid;">{{ index }}</view>
		<view class="test" style="height: 60px; background-color: aliceblue;">test</view>
		<view class="" v-for="(item, index) in 50" style="border-bottom: 1px solid;">{{ index }}</view>
		
		基本使用
		由于返回顶部需要实时监听滚动条的位置，从而判断返回的按钮该出现还是隐藏，由于组件无法得知页面的滚动条信息，只能在页面的onPageScroll生命周期 中获得滚动条的位置，故需要在页面监听onPageScroll生命周期，实时获得滚动条的位置，通过Props传递给组件。
		<my-back-top :scrollTop="scrollTop"></my-back-top>
		
		改变返回顶部按钮的出现时机
		可以通过top参数，修改页面滚动多少距离时，出现返回顶部的按钮
		<my-back-top :scrollTop="scrollTop" top="100"></my-back-top>
		
		自定义返回顶部的图标和提示
		通过icon修改返回顶部按钮的图标，可以是uView内置的图标，或者图片路径
		通过text参数修改返回顶部按钮的文字提示信息，如果需要修改文字的颜色和大小，可以通过customStyle参数
		<my-back-top :scrollTop="scrollTop" top="100" icon="icon-xiangshang" text="返回"></my-back-top>
		
		其他自定义样式
		通过iconStyle参数自定义图标的样式，比如颜色，大小等
		通过customStyle修改返回按钮的背景颜色，大小等
		通过mode修改按钮的形状，circle为圆形，square为方形
		<my-back-top mode="square" :scrollTop="scrollTop" :iconStyle="iconStyle"></my-back-top>
		
		自定义位置
		通过 right 和 bottom 属性来设置组件距离右侧和底部的位置。
		<my-back-top :scrollTop="scrollTop" right="10px" bottom="20px"></my-back-top>
		
		自定义内容
		使用默认插槽来自定义组件展示的内容。
		<my-back-top :scrollTop="scrollTop">返回</my-back-top>
		
		设置滚动目标
		可以通过 target 属性来设置触发滚动的目标对象，支持传入选择器或 HTMLElement。
		<my-back-top mode="square" target=".test" :scrollTop="scrollTop"></my-back-top>
		
		瞬间滚动
		当设置 immediate 属性后，页面滚动的过程不再有过渡效果，而是瞬间滚动到顶部。
		<my-back-top :scrollTop="scrollTop" immediate>返回</my-back-top>
		
	
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';
let scrollTop = ref(0)
let iconStyle = reactive({
	fontSize:'16px',
	color:'#ccc'
})
onPageScroll(e => {
	scrollTop.value = e.scrollTop
})
</script>


```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| mode | 按钮形状 circle圆形	square方形| string | 'circle' | 否 |
| icon | 图标名称| string | 'icon-xiangshang' | 否 |
| text | 返回顶部按钮的提示文字| string | '-' | 否 |
| right | 距离页面右侧的距离，默认单位为 px| string | '20px' | 否 |
| bottom | 距离页面底部的距离，默认单位为 px | string | '40px' | 否 |
| duration | 背返回顶部过程中的过渡时间，单位ms | string | '200' | 否 |
| scrollTop | 页面的滚动距离，通过onPageScroll生命周期获取| string,number | '0' | 是 |
| top | 滚动条滑动多少距离时显示，单位px | string,number | '200' | 否 |
| target | 设置滚动目标 元素选择器，用于指定要滚动到的元素位置 | string | '-' | 否 |
| immediate | 是否瞬间滚动到顶部| boolean | 'false' | 否 |
| z-index | 设置组件的 z-index 层级 | number | '100' | 否 |
| iconStyle | 图标的样式，对象形式	 | object | '{}' | 否 |
| customStyle | 按钮外层的自定义样式 | object | '{}' | 否 |

<!-- 下个版本升级 | teleport | 指定挂载的节点，等同于 Teleport 组件的 to 属性 | string,Element | 'body' | 否 | -->

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击的回调函数 | - |

**Slots**
| 名称 | 说明 |
| --- | --- |
| default |自定义按钮显示内容|



