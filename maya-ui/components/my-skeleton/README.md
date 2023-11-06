#Skeleton 骨架屏

**介绍**
骨架屏一般用于页面在请求远程数据尚未完成时，页面用灰色块预显示本来的页面结构，给用户更好的体验。

**基础用法**
通过 title 属性显示标题占位图，通过 line 属性配置占位段落行数。
```
<my-skeleton title line="3"></my-skeleton>

```

**显示头像**
通过 avatar 属性显示头像占位图。
```
<my-skeleton avatar line="3"></my-skeleton>

```

**展示子组件**
将 loading 属性设置成 false 表示内容加载完成，此时会隐藏占位图，并显示 Skeleton 的子组件。
```
	<my-skeleton title avatar :loading="false">
		<my-gap height="100px" bgColor="pink"></my-gap>
	</my-skeleton>

```

**设置每一行高度和宽度**
段落占位图的宽度、高度，可以为百分比，数值，带单位字符串等，可通过数组传入指定每个段落行的宽度，
通过 lineWidth 属性设置段落宽度 ，通过 lineHeight 属性设置段落高度。
```
<my-skeleton avatar line="3" :lineWidth="['30%','40%','50%']" :lineHeight="['8px','10px','15px']"></my-skeleton>

```

**标题和段落显示为圆角风格**
通过 round 属性设置为圆角风格
```
<my-skeleton avatar title round line="3"></my-skeleton>

```

**加载中动画**
设置animate为true，加载中的骨架块将会有一个动画效果，用以加强视觉效果。
```
<my-skeleton avatar title animation line="3"></my-skeleton>

```

**自定义骨架屏展示内容**
通过 template 插槽完成自定义内容的展示。
```
<template>

	<my-skeleton>
		<template #template>
			<view class="custom">
				<view class="left">
					<view class="user">
						<my-skeleton-avatar style="margin-right: 10px;"/>
						<my-skeleton-title style="margin: 0;" height="12px"/>
					</view>
					<my-skeleton-line/>
					<my-skeleton-line/>
				</view>
				<view class="right">
					<my-skeleton-image width="100px" height="80px"/>
				</view>
			</view>
		</template>
	</my-skeleton>

</template>

<style lang="scss" scoped>
	.custom{
		display: flex;
		width: 100%;
		.left{
			flex: 1;
			.user{
				display: flex;
				align-items: center;
				margin-bottom: 5px;
			}
		}
		.right{
			margin-left: 15px;
			flex-shrink: 0;
		}
	}
</style>

```



**skeleton Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| animation | 是否开启动画效果 | Boolean | 'true' | 否 |
| bgColor |组件背景颜色 | string | '#f2f3f5' | 否 |
| loading | 是否显示骨架屏，传 false 时会展示子组件内容 | Boolean | 'true' | 否 |
| round | 是否将标题和段落显示为圆角风格| Boolean | 'false' | 否 |
| avatar | 是否显示头像占位图| Boolean | 'false' | 否 |
| avatarSize |头像占位图大小 | string | '32px' | 否 |
| avatarRound |头像占位图是否显示圆形 | Boolean | 'true' | 否 |
| title | 是否显示标题占位图| Boolean | 'false' | 否 |
| titleWidth |标题占位图宽度 | string | '40%' | 否 |
| titleHeight |标题占位图高度 | string | '15px' | 否 |
| line |段落占位图行数 | string,number | '3' | 否 |
| lineWidth |段落占位图宽度，可传数组来设置每一行的宽度 | string | '['100%','100%','50%']' | 否 |
| titleHeight |段落占位图高度 ，可传数组来设置每一行的宽度| string | '15px' | 否 |

**skeletonAvatar Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| round | 是否将头像显示为圆角风格| Boolean | 'true' | 否 |
| size |头像占位图大小 | string | '32px' | 否 |

**skeletonImage Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| width | 图片占位图宽度 | string | '45px' | 否 |
| height | 图片占位图高度 | string | '45px' | 否 |

**skeletonLine Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| round | 是否将段落显示为圆角风格| Boolean | 'false' | 否 |
| width | 段落占位图宽度 | string | '100%' | 否 |
| height | 段落占位图高度 | string | '15px' | 否 |

**skeletonLine Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| round | 是否将标题显示为圆角风格| Boolean | 'false' | 否 |
| width | 标题占位图宽度 | string | '40%' | 否 |
| height | 标题占位图高度 | string | '15px' | 否 |


**Slots**
| 名称 | 说明 |
| --- | --- |
| default |内容插槽|
| template |骨架屏|