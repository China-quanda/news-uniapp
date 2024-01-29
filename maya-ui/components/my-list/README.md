#List 列表

**介绍**
瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。


**基础用法**

```

<template>
	<my-list refresherEnabled :refresherTriggered="false" showBackTop @get-data="getData">
		<view v-for="(item, index) in list" class="scroll-view-item uni-bg-blue">{{ item }}</view>
	</my-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let list = ref([]);
const getData = e => {
	console.log('getData', e);
	list.value = e.list;
};
</script>

<style lang="scss" scoped>
.scroll-view-item {
	height: 60px;
	border-bottom: 1px solid #f7f7f7;
}
</style>


```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| upperThreshold | 距顶部/左边多远时（单位px），触发 scrolltoupper 事件| string、number | '50' | 否 |
| lowerThreshold | 距底部/右边多远时（单位px），触发 scrolltolower 事件| string、number | '80' | 否 |
| enableBackToTop | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向| boolean | 'true' | 否 |
| showScrollbar | 控制是否出现滚动条| boolean | 'false' | 否 |
| scrollWithAnimation | 在设置滚动条位置时使用动画过渡| boolean | 'false' | 否 |
| refresherEnabled | 开启自定义下拉刷新| boolean | 'true' | 否 |
| refresherThreshold | 设置自定义下拉刷新阈值| string、number | '45' | 否 |
| marginBottom | 与后一个元素的距离，单位px| string、number | '0px' | 否 |
| refresherDefaultStyle | 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式 | string | 'none' | 否 |
| refresherBackground | 设置自定义下拉刷新区域背景颜色 | string | '#f7f7f7' | 否 |
| height | 列表的高度 | string | '80vh' | 否 |
| width | 列表的宽度 | string | 'auto' | 否 |
| showBackTop | 是否显示返回顶部按钮 开启后scrollTop大于200会显示| boolean | 'true' | 否 |
| query | 自定义列表查询参数| object | '{}' | 否 |
| loading | 列表数据加载状态 | boolean | 'false' | 否 |
| loadingText | 数据加载时显示的文字 | boolean | '数据加载中' | 否 |

**Events**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| getData |  监听数据变化，下拉刷新上拉加载都会触发 | object |
| scrolltoupper |  滚动到顶部/左边，会触发  | object |
| scrolltolower |  滚动到底部/右边，会触发 | object |
| scroll |  滚动时会触发 | object |
| refresherpulling |  自定义下拉刷新控件被下拉' | object |
| refresherrefresh |  自定义下拉刷新被触发 | object |
| refresherrestore |  自定义下拉刷新被复位 | object |
| refresherabort |  自定义下拉刷新被中止 | object |

**Slots**
| 名称 | 说明 |
| --- | --- |
| default |默认插槽展示列表数据|
| topLoading |自定义下拉刷新动画插槽|
| bottomLoading |自定义上拉加载动画更多插槽|
| empty |空数据插槽|
| loading |数据加载时插槽|