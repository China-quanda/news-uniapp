#Dialog 弹出框

**介绍**
弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。


**基础用法**
默认情况下，弹出框只有一个确认按钮
通过show绑定一个布尔变量来控制模态框的显示与否。
```
	<my-dialog :show="show" title="系统提示" :content="content">
		
	</my-dialog>
	
	import { ref } from "vue";
	let show = ref(false)
	let content = ref("模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作")

```

**传入富文本内容**
通过 allowHtml 属性可以设置组件为富文本内容渲染
```
	<my-dialog :show="show" title="系统提示" allowHtml :content="content">
		
	</my-dialog>
	import { ref } from "vue";
	let content = ref(`<h1>内容</h1><h2>内容</h2>`)

```

**点击遮罩关闭**
有时候我们不显示"关闭"按钮的时候，需要点击遮罩也可以关闭弹出框，这时通过配置tapClose为true即可（注意：关闭事件需要自行处理，只会在开启tapClose后点击遮罩层执行close回调）
```
<my-dialog :show="show" title="系统提示" tapClose content="content">

```

**控制弹出框宽度**
可以通过设置width参数控制模态框的宽度，可以数值，px，rpx单、百分比单位
```
<my-dialog :show="show" title="系统提示" width="80%">

```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| show | 是否显示弹出框 | Boolean | 'false' | 否 |
| title | 标题内容 | string | '' | 否 |
| content | 弹出框内容，如传入slot内容，则此参数无效 | string | '' | 否 |
| contentAlign | 内容水平对齐方式，可选值为 left right justify center | string | 'justify' | 否 |
| confirmText | 确认按钮的文字 | string | '确认' | 否 |
| cancelText | 取消按钮的文字 | string | '取消' | 否 |
| showConfirmButton | 是否显示确认按钮 | Boolean | 'true' | 否 |
| showCancelButton | 是否显示取消按钮 | Boolean | 'false' | 否 |
| confirmButtonDisabled | 是否禁用确认按钮 | Boolean | 'false' | 否 |
| cancelButtonDisabled | 是否禁用取消按钮 | Boolean | 'false' | 否 |
| confirmColor | 确认按钮的颜色 | string | '#2979ff' | 否 |
| cancelColor | 取消按钮的颜色 | string | '#606266' | 否 |
| buttonReverse | 对调确认和取消的位置 | Boolean | 'false' | 否 |
| tapClose | 是否允许点击遮罩关闭dialog（注意：关闭事件需要自行处理，只会在开启closeOnClickOverlay后点击遮罩层执行close回调） | Boolean | 'false' | 否 |
| z-index | 自定义遮罩层级 | number | '1' | 否 |
| lockScroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | Boolean | 'false' | 否 |
| width | 弹窗宽度，默认单位为 px | string | '320px' | 否 |
| overlayClass | 自定义遮罩层类名| string | '' | 否 |
| allowHtml | 是否允许 content 内容中渲染 HTML | Boolean | 'false' | 否 |
| overlayStyle |自定义遮罩样式 | string | 'Object' | 否 |


**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| close |  关闭弹窗时触发 | - |
| closed |  关闭弹窗且动画结束后触发 | - |
| confirm |  点击确认按钮时触发 | - |
| cancel |  点击取消按钮时触发 | - |

**Slots**
| 名称 | 说明 |
| --- | --- |
| default | 自定义content内容 |
| title | 自定义标题 |
| button | 自定义按钮区域 |