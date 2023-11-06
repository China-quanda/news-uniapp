#Overlay 遮罩层

**介绍**
创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景




**基础用法**
通过v-model:show 属性控制遮罩层的显示/隐藏
```
	<my-overlay v-model:show="show"></my-overlay>

```

**嵌入内容**
通过默认插槽可以在遮罩层上嵌入任意内容
注意：如果不想让slot插槽内容的点击事件冒泡到遮罩，请给指定元素添加上@tap.stop
```
	<my-overlay v-model:show="show"  lockScroll>
		<view class="" style="height: 200px;background-color: aqua;" @tap.stop="tapHandle">
			overlay stop
		</view>
	</my-overlay>
	
	<script lang="ts" setup>
		import { ref } from "vue";
		
		let show = ref(false)

		const tapHandle = ()=>{
			console.log('tapm');
		}
	</script>

```

**遮罩样式**
通过 custom-style 进行设置遮罩样式 通过 class-name 进行设置遮罩类名
```
	<my-overlay v-model:show="show" :custom-style="{backgroundColor:'rgba(0, 0, 0, 0.8)'}"></my-overlay>

```

**设置动画时间**
通过 duration 设置遮罩显示/隐藏的时间，单位毫秒,设置为 0 可以禁用动画
```
	<my-overlay v-model:show="show" duration="300"></my-overlay>

```

**锁定背景滚动**
通过 lock-scroll 设置遮罩在显示时是否锁定背景，禁止滚动
```
	<my-overlay v-model:show="show" lockScroll></my-overlay>

```

**点击遮罩不关闭**
通过 lock-scroll 设置遮罩在显示时是否锁定背景，禁止滚动
```
	<my-overlay v-model:show="show" :tapClose="false"></my-overlay>

```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| v-model:show |控制遮罩的显示/隐藏 | Boolean | 'false' | 否 |
| lockScroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | Boolean | 'false' | 否 |
| tapClose | 点击遮罩时是否关闭 | Boolean | 'false' | 否 |
| bgColor |组件背景颜色 | string | 'rgba(0, 0, 0, 0.5)' | 否 |
| className |自定义遮罩类名 | string | '' | 否 |
| customStyle |自定义遮罩样式 | string | 'Object' | 否 |
| duration | 显示/隐藏的动画时长，单位毫秒,设置为 0 可以禁用动画 | Number,String | '300' | 否 |
| z-index | 自定义遮罩层级 | number | '1' | 否 |

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击遮罩层时触发 | - |

**Slots**
| 名称 | 说明 |
| --- | --- |
| default |默认插槽|