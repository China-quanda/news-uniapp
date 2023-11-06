#Keyboard 键盘 

**介绍**
此为自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3种模式，都有可以打乱按键顺序的选项。



**使用**

```

	<!-- 基础用法 -->
	通过type参数定义键盘的类型，show绑定一个值为布尔值的变量控制键盘的弹出与收起：
	type = car (默认值)为汽车键盘，此时顶部工具条中间的提示文字为"车牌号键盘"
	type = number为数字键盘，此时顶部工具条中间的提示文字为"数字键盘"
	type = card 为身份证键盘，此时顶部工具条中间的提示文字为"身份证键盘"
	设置 value 属性后，Badge 会在子元素的右上角显示对应的徽标，可自定义徽标内容 
 <my-keyboard  type="number"> </my-keyboard>
 
 
隐藏键盘"."符号
通过dotDisabled参数配置是否显示键盘"."符号，默认为false，只在"type = number"时生效
<my-keyboard  type="number" :dotDisabled="fals"> </my-keyboard>
 
 
 是否打乱按键的顺序
 如果配置random参数为true的话，每次打开键盘，按键的顺序都是随机的，该功能默认是关闭的
 <my-keyboard  type="number" random> </my-keyboard>
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| type | 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘  | string | number | 否 |
| dotDisabled | 是否显示"."按键，只在mode=number时有效 | boolean | 'false' | 否 |
| random | 是否打乱键盘按键的顺序 | Boolean | 'false' | 否 |
| tooltip | 是否显示键盘顶部工具条  | Boolean | 'true' | 否 |
| showTips | 是否显示工具条中间的提示  | Boolean | 'true' | 否 |
| tips | 工具条中间的提示文字 | string | '#fff' | 否 |
| showCancel | 是否显示工具条左边的"取消"按钮  | Boolean | 'true' | 否 |
| showConfirm | 是否显示工具条右边的"完成"按钮  | Boolean | 'true' | 否 |
| confirmText | 确认按钮的文字 | string | '确认' | 否 |
| cancelText | 取消按钮的文字 | string | '取消' | 否 |
| zIndex | 弹出键盘的z-index值| string, number | '1024' | 否 |


**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| delete |  键盘退格键被点击 | - |
| change | 按键被点击(不包含退格键被点击) | - |
| confirm | 键盘顶部工具条右边的"完成"按钮被点击 | - |
| cancel | 键盘顶部工具条左边的"取消"按钮被点击 | - |
| close | 键盘关闭 | - |
