#MyUploadImg 示例

**介绍**
上传图片组件

**使用**

```

 基本用法：

<template>
	<view class="test">
		<myUploadImg required label="图片"  :count="5" :imgs="imgs" @getImgs="getImgs"></myUploadImg>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import myUploadImg from './my-upload-img.vue'
	const imgs = ref([])
	const getImgs = (imgList) =>{
		imgs.value = imgList
		console.log(imgs.value);
	}
</script>

<style scoped lang="scss"></style>


```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| label | 图片标题| string | '-' | 否 |
| required | 已有图片数组 | arrar | '[]' | 否 |
| count | 最多可以选择的图片张数 | string、 number | '30' | 否 |
| extension | 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。 | string[] | '[]' | 否 |
| sizeType | original 原图，compressed 压缩图，默认二者都有| string[] | '[]' | 否 |
| crop | 图像裁剪参数，设置后 sizeType 失效| object | '-' | 否 |
| disabled | 是否禁用，单位px | boolean | 'false' | 否 |
| sourceType | album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项| string[] | '[]' | 否 |
| uploadUrl | 上传地址 | string | '-' | 否 |
| borderBottom | 底部边框 | boolean | 'false' | 否 |

**crop Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| quality | 取值范围为1-100，数值越小，质量越低（仅对jpg格式有效）。默认值为80。 | number | '80' | 否 |
| width | 裁剪的宽度，单位为px，用于计算裁剪宽高比。 | number | '-' | 否 |
| height | 裁剪的高度，单位为px，用于计算裁剪宽高比。 | number | '-' | 否 |
| resize | 是否将width和height作为裁剪保存图片真实的像素值。默认值为true。注：设置为false时在裁剪编辑界面显示图片的像素值，设置为true时不显示 | boolean | 'true' | 否 |


**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| getImgs |  上传图片后的回调函数 | e:Array |
