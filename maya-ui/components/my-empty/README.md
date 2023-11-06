#Empty 空状态

**介绍**
空状态时的占位提示。

**使用**

```

	<!-- 默认通用 -->
  <my-empty></my-empty>
	
	<!-- 通用错误 -->
	<my-empty icon="icon-31gouwuche" text="暂无购物车数据" />
	<!-- 列表为空 -->
	<my-empty icon="icon-liebiao" text="暂无数据" />
	<!-- 网络异常 -->
	<my-empty icon="icon-wangluoyichang" text="网络异常" />
	<!-- 无权限 -->
	<my-empty icon="icon-quanxian" text="无权限" />
	<!-- 页面不存在 -->
	<my-empty icon="icon-yepian" text="页面不存在" />
	<!-- 暂无图片 -->
	<my-empty icon="icon-24gl-pictures" text="暂无图片" />
	<!-- 没有搜索结果 -->
	<my-empty icon="icon-sousuo" text="没有搜索结果" />
	<!-- 消息为空 -->
	<my-empty icon="icon-xiaoxi" text="消息为空" />
	<!-- 没有下载任务 -->
	<my-empty icon="icon-xiazai" text="没有下载任务" />
	<!-- 没有历史记录 -->
	<my-empty icon="icon-lishi" text="没有历史记录" />
	<!-- 没有点赞记录 -->
	<my-empty icon="icon-dianzan" text="没有点赞记录" />
	<!-- 没有收藏记录 -->
	<my-empty icon="icon-shoucang" text="没有收藏记录" />
	
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| text | 文字提示 | string | '暂无数据' | 否 |
| textColor | 文字颜色 | string | '#c0c4cc' | 否 |
| textSize | 文字大小  | string,number | '14px' | 否 |
| icon | 图标名称 | string | '16px' | 否 |
| iconSize | 图标大小 | string | '60px' | 否 |
| iconColor | 图标颜色 | string | '#c0c4cc' | 否 |

