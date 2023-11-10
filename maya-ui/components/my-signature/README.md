#Signature 签名

**介绍**
用于签名场景的组件

**基本用法**
当点击确认按钮时，组件会触发 confirm 事件，事件的第一个参数为 data，包含以下字段：
image：签名对应的图片， h5端返回的是base64数据，其它端是临时图片路径。

```

<template>
	<my-signature @confirm="confirm" />
</template>

<script setup lang="ts">
	const confirm = (e)=>{
		console.log('e',e); // { image: string}
	}
</script>

```

**自定义画笔颜色**
通过 line-color 来自定义画笔颜色。
```
<my-signature line-color="red" />
```

**自定义画笔粗细**
通过 line-width 来自定义画笔宽度。
```
<my-signature line-width="5" />
```


**自定义背景颜色**
通过 bg-color 来自定义背景颜色。
```
<my-signature bgColor="pink" />
```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| type | 导出图片类型 | string | 'png' | 否 |
| lineWidth |  笔画粗细 | String、Number | '5' | 否 |
| lineColor | 笔触颜色，默认黑色| String、Number | '#000' | 否 |
| bgColor |背景颜色 | string | '#ececec' | 否 |
| clearText | 清除按钮文字| string | '清除' | 否 |
| confirmText | 确认按钮文字| string | '确认' | 否 |
| width |  宽度 | String、Number | '100%' | 否 |
| height |  高度 | String、Number | '200px' | 否 |


**Events事件**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| start |  开始签名时触发 | - |
| end |  结束签名时触发 | event:TouchEvent |
| signing |  签名过程中触发 | - |
| confirm |  结束签名时触发 | data:{ image: string } |
| clear |  点击清除按钮时触发 | - |


**Signature Methods**
通过 ref 可以获取到 Signature 实例并调用实例方法
| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| init | 初始化 | - | object | - |
| confirm | 确认 | - | {image:''} |
| finish | 保存到本地 | - | - |
| clear | 清除 | - | - |
