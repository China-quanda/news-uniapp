#Tabbar 底部导航栏

**介绍**
优点：
此组件提供了自定义tabbar的能力，具有如下特点：

图标可以使用字体图标(内置图标和扩展图标)或者图片
可以动态切换菜单的数量以及配置
切换菜单之前，可以进行回调鉴权
可以设置角标或数字化提示
有效防止组件区域高度塌陷，无需给父元素额外的内边距或者外边距来避开导航的区域



**使用**
```
<template>
	<view class="tabbar-box">
		
		<view v-for="(i,k) in 40" style="border-bottom: 0.5px solid;height: 30px;text-align: center;line-height: 30px;">
			{{k}}
		</view>
		
		基本使用
		v-model 默认绑定选中标签的索引值，通过修改 v-model 即可切换选中的标签。
		通过icon属性设置图标，通过text属性设置字体
		<my-tabbar v-model="current" @change="change">
			<my-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.id" @click="click">
			</my-tabbar-item>
		</my-tabbar>
		
		通过名称匹配
		在标签指定 name 属性的情况下，v-model 的值为当前标签的 name。
		<my-tabbar v-model="current">
			<my-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.id">
			</my-tabbar-item>
		</my-tabbar>
		
		显示徽标
		设置 badgeDot 属性后，会在图标右上角展示一个小红点；设置 badge 属性后，会在图标右上角展示相应的徽标,
		您也可以使用:badge='badge'动态设置徽标数量， 这在消息盒子的展示中是比较好用的功能,
		使用badgeMax属性设置最大badge，badge超过badgeMax时显示+
		<my-tabbar v-model="current" @change="change">
			<my-tabbar-item v-for="(item,index) in list" 
			:text="item.text" :icon="item.icon" :name="item.id" 
			badge="10" badgeMax="99">
			</my-tabbar-item>
		</my-tabbar>
		
		自定义内容
		<my-tabbar v-model="current">
			<my-tabbar-item v-for="(item,index) in list" :name="item.id">
				<i :class="`iconfont ${item.icon}`"></i>
				<text>{{item.text}}</text>
			</my-tabbar-item>
		</my-tabbar>
		
		自定义图标或字体
		通过 icon 插槽自定义图标
		通过 icon 插槽自定义字体
		<my-tabbar v-model="current">
			<my-tabbar-item v-for="(item,index) in list" :name="item.id">
				<template #icon>
					<i :class="`iconfont ${item.icon}`"></i>
				</template>
				<template #text>
					<text>{{item.text}}</text>
				</template>
			</my-tabbar-item>
		</my-tabbar>
		
		自定义图标/颜色
		如您需要自定义图标/颜色，在tabbar标签中使用插槽activeColor和inactiveColor来定义图标和颜色
		<my-tabbar v-model="current" activeColor="pink" inactiveColor="red">
			<my-tabbar-item v-for="(item,index) in list" 
			:text="item.text" :icon="item.icon" :name="item.id" 
			badge="10" badgeMax="99">
			</my-tabbar-item>
		</my-tabbar>
		
		监听切换事件
		通过 change 事件来监听选中标签的变化。
		在切换事件中，处理拦截事件或者您其他js操作逻辑。 tabbar事件change, tabbar-item事件click
		<my-tabbar v-model="current" @change="change">
			<my-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.id" @click="click">
			</my-tabbar-item>
		</my-tabbar>
		
		边框
		组件默认带了顶部边框，如果不需要，配置border为false即可。
		<my-tabbar v-model="current" :border="false">
			<my-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.id">
			</my-tabbar-item>
		</my-tabbar>
		
		固定在底部(固定在屏幕最下方)
		组件默认固定在底部 与原生效果无异，但您可以按照api配置您需要的其他配置，如徽标，边框等
		<my-tabbar v-model="current" :fixed="false">
			<my-tabbar-item v-for="(item,index) in list" :text="item.text" :icon="item.icon" :name="item.id">
			</my-tabbar-item>
		</my-tabbar>
		
		路由模式
		标签栏支持路由模式，通过route属性开启，路由模式下会匹配页面路径和标签的 openType 属性，并自动选中对应的标签。
		<my-tabbar v-model="current" route>
			<my-tabbar-item v-for="(item,index) in list" 
			:text="item.text" :icon="item.icon" :name="item.id"
				openType="switchTab" 
				:url="item.url" >
			</my-tabbar-item>
		</my-tabbar>
		
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let current = ref(0)
const list = ref([
  { text: "首页", icon: "icon-weixiao", id:1,url:'/pages/index/index'},
  { text: "文章", icon: "icon-weixiao", id:2,url:'/pages/article/article'},
  { text: "视频", icon: "icon-weixiao", id:3,url:'/pages/video/video'},
  { text: "我的", icon: "icon-weixiao", id:4,url:'/pages/user/user'}
]);
const click = (e)=>{
	console.log(e,'click');
	console.log(current.value);
}
const change = (e)=>{
	console.log(e,'change');
}
</script>
```


**TabbarProps**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| route |是否开启路由模式| boolean | 'false' | 否 |
| border | 是否显示上方边框| boolean | 'true' | 否 |
| fixed | 是否固定在底部| boolean | 'true' | 否 |
| z-index | 设置组件的 z-index 层级 | number | '100' | 否 |
| bgColor | footer背景颜色| string | '#fff' | 否 |
| activeColor |选中标签的颜色 | string | '#3c9cff' | 否 |
| inactiveColor |未选中标签的颜色 | string | '#606266' | 否 |

**TabbarItemProps**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| name | item标签的名称，作为与tabbar的v-model参数匹配的标识符| string | '-' | 否 |
| text | 描述文本| string | '-' | 否 |
| icon | 图标或者绝对路径的图片| string | '-' | 否 |
| badge | 徽标显示值 | string,number | '0' | 否 |
| badgeMax | 大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | '99' | 否 |
| badgeDot |是否显示圆点，将会覆盖badge参数| boolean | 'false' | 否 |
| iconStyle | 图标的样式，对象形式	 | object | '{}' | 否 |
| textStyle | 字体的自定义样式	Object | object | '{}' | 否 |
| url |点击后跳转的链接地址 | string | '' | 否 |
| openType | 跳转类型 可选'navigate', 'redirect', 'reLaunch','switchTab','navigateBack' | string | 'navigate' | 否 |


后期会新增中间凸起按钮,需考虑底部安全适配问题

**TabbarEvents事件**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| change |  切换选项时触发 | index：当前要切换项的name |


**TabbarItemEvents事件**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  切换选项时触发 | index：当前要切换项的name |

**TabbarSlots**
| 名称 | 说明 |
| --- | --- |
| default |显示tabbar-item插槽|

**TabbarItemSlots**
| 名称 | 说明 |
| --- | --- |
| default |自定义所有内容插槽|
| icon |自定义图标插槽|
| text |自定义字体插槽|
