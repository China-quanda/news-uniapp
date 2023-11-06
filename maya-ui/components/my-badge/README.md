#Badge 徽标

**介绍**
在右上角展示徽标数字或小红点。

**使用**

```

	<!-- 基础用法 -->
	
	设置 value 属性后，Badge 会在子元素的右上角显示对应的徽标，可自定义徽标内容 
 <my-badge value="2">
 	<button>消息</button>
 </my-badge>
 
 
 也可以通过 isDot 来显示小红点。不展示数字，只有一个小点
 <my-badge isDot>
 	<button>消息</button>
 </my-badge>
 
 
 最大值
 设置 max 属性后，当 value 的数值超过最大值时，会自动显示为 {max}+。
 <my-badge value="2" :max="21">
 	<button>消息</button>
 </my-badge>
 
 
 自定义颜色
 通过 color 属性来设置徽标的颜色。
 <my-badge value="2" :max="21" color="red">
 	<button>消息</button>
 </my-badge>
 
 
 自定义背景颜色
 通过 bgColor="#3c9cff" 属性来设置徽标的背景颜色。
 <my-badge value="2" :max="21" bgColor="#3c9cff">
 	<button>消息</button>
 </my-badge>
 
 
 数据为0时是否显示
 通过 showZero 属性来设置徽标为0时是否显示
 <my-badge value="2" :max="21" showZero>
 	<button>消息</button>
 </my-badge>
 
 
 自定义徽标位置
 通过 position 属性来设置徽标的位置。
 <my-badge value="2" :max="21" position="top-left">
 	<button>消息</button>
 </my-badge>
	
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| value | 显示值  | string,number | '' | 否 |
| max | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | '-' | 否 |
| isDot | 不展示数字，只有一个小点 | Boolean | 'false' | 否 |
| showZero | 当数值为 0 时，是否展示 Badge  | Boolean | 'false' | 否 |
| color | 文字颜色 | string | '#fff' | 否 |
| bgColor | 背景颜色 | string | '#f56c6c' | 否 |
| position | 徽标位置，可选值为 top-left bottom-left bottom-right | string | 'top-right' | 否 |
| customStyle | 自定义样式，对象形式 | bbject | '-' | 否 |

position还未实现

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击角标的回调函数 | - |