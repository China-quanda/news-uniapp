#tag 标签 

**介绍**
tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景



**使用**

```

标签类型
支持default、primary、info、warning、danger五种类型，默认为default。
<my-tag type="default">默认标签</my-tag>
<my-tag type="primary">主要标签</my-tag>
<my-tag type="info">信息标签</my-tag>
<my-tag type="warning">警告标签</my-tag>
<my-tag type="danger">危险标签</my-tag>


可关闭标签
通过closable属性设置为置为true，文字右边会出现一个关闭图标
<my-tag type="primary" >不可关闭</my-tag>
<my-tag type="primary" closable>可关闭</my-tag>
 
 
朴素标签
通过plain属性将标签设置为朴素标签，朴素标签的文字为标签颜色，背景为白色。
 <my-tag plain type="default">朴素标签</my-tag>
 <my-tag plain type="primary">朴素标签</my-tag>
 <my-tag plain type="info">朴素标签</my-tag>
 <my-tag plain type="warning">朴素标签</my-tag>
 <my-tag plain type="danger">朴素标签</my-tag>
 
 
 细边框
 设置hairline属性可以开启 0.5px 边框，基于伪类实现。
 <my-tag plain hairline type="default">细边框</my-tag>
 <my-tag plain hairline type="primary">细边框</my-tag>
 <my-tag plain hairline type="info">细边框</my-tag>
 <my-tag plain hairline type="warning">细边框</my-tag>
 <my-tag plain hairline type="danger">细边框</my-tag>
 
 
 禁用状态
 通过disabled属性来禁用标签，此时标签的bind:click事件不会触发。
 <my-tag disabled type="default">禁用状态</my-tag>
 <my-tag disabled type="primary">禁用状态</my-tag>
 <my-tag disabled type="info">禁用状态</my-tag>
 <my-tag disabled type="warning">禁用状态</my-tag>
 <my-tag disabled type="danger">禁用状态</my-tag>
 
 
 加载状态
 通过loading属性来设置加载状态，此时标签的bind:click事件不会触发。loadingText设置加载中文字
 <my-tag loading loadingText="加载中" type="default">默认标签</my-tag>
 <my-tag loading type="primary">加载状态</my-tag>
 <my-tag loading type="info">加载状态</my-tag>
 <my-tag loading type="warning">加载状态</my-tag>
 <my-tag loading type="danger">加载状态</my-tag>
 
 
 标签形状
 标签形状 通过shape值设置标签形状，circle为圆角
 <my-tag type="default">方型标签</my-tag>
 <my-tag type="primary">方型标签</my-tag>
 <my-tag shape="circle" type="info">圆型标签</my-tag>
 <my-tag shape="circle" type="warning">圆型标签</my-tag>
 <my-tag shape="circle" type="danger">圆型标签</my-tag>
 
 
 图标标签
 通过icon属性设置标签图标，支持 Icon 组件里的所有图标，也可以自定义阿里图标 
 通过iconColor自定义图标颜色默认为#ccc
 <my-tag icon="icon-weixiao" iconColor="pink" type="default">图标标签</my-tag>
 <my-tag icon="icon-sousuo" type="primary">图标标签</my-tag>
 <my-tag icon="icon-dianzan" type="info">图标标签</my-tag>
 <my-tag icon="icon-shoucang" type="warning">图标标签</my-tag>
 <my-tag icon="icon-fenxiang" type="danger">图标标签</my-tag>
 
 
 标签尺寸
 支持large、normal、small、mini四种尺寸，默认为small。
	<my-tag size="large" type="default">large</my-tag>
	<my-tag size="normal" type="primary">normal</my-tag>
	<my-tag size="small" type="info">small</my-tag>
	<my-tag size="mini" type="warning">mini</my-tag>
	
	
	自定义颜色
	通过color属性可以自定义标签的颜色也可以通过color值设置标签渐变颜色
	<my-tag color="pink" type="default">粉红色</my-tag>
	<my-tag color="red" type="primary">禁用状态</my-tag>
	<my-tag color="#ccc" type="info">禁用状态</my-tag>
	<my-tag color="linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36));" type="info">渐变色</my-tag>
	
	
	跳转标签 
	通过url属性点击后跳转的链接地址，此时标签的bind:click事件不会触发，
	设置了linkType跳转到本地页面，未设置跳转外部链接
	通过linkType属性设置链接跳转的方式 push，tab，redirect，reLaunch
	push 关闭当前页面，返回上一页面或多级页面
	tab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 
	reLaunch 关闭所有页面，打开到应用内的某个页面。 
	redirect 关闭当前页面，跳转到应用内的某个页面。
	<my-tag url="/pages/login/login" linkType="push" type="default">跳转首页</my-tag>
	<my-tag url="/pages/login/login" linkType="tab" type="primary">跳转底部</my-tag>
	<my-tag url="/pages/login/login" linkType="redirect" type="info">关闭当前页面跳转</my-tag>
	<my-tag url="/pages/login/login" linkType="reLaunch" type="info">重定向</my-tag>
	<my-tag url="http://www.baidu.com" type="warning">外部链接</my-tag>
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| type | 标签类型 ：primary、success、info、warning、danger、default  | string | 'default' | 否 |
| size | 标签尺寸 :支持 large、normal、small、mini 四种尺寸| string | 'small' | 否 |
| plain | 朴素标签 通过 plain 属性将标签设置为朴素标签，朴素标签的文字为标签颜色，背景为白色。 | Boolean | 'false' | 否 |
| hairline | 细边框 设置 hairline 属性可以展示 0.5px 的细边框。  | Boolean | 'false' | 否 |
| disabled | 禁用状态 通过 disabled 属性来禁用标签，禁用状态下标签不可点击。  | Boolean | 'false' | 否 |
| closable | 是否可关闭，设置为true，文字右边会出现一个关闭图标  | Boolean | 'false' | 否 |
| loading |加载状态 通过loading值设置是否开启加载图标 | Boolean | 'false' | 否 |
| loadingText | loadingText设置加载中文字 | string | '-' | 否 |
| shape | 标签形状 通过shape值设置标签形状，circle为圆角| string | 'shape' | 否 |
| color | 自定义颜色 通过color值设置标签渐变颜色 | string | '-' | 否 |
| text | 标签文字 | string | '-' | 否 |
| icon | 标签图标 | string | '-' | 否 |
| iconColor | 自定义图标颜色 | string | '#ccc' | 否 |
| url | 点击后跳转的链接地址 | string | '-' | 否 |
| linkType | 链接跳转的方式 可选 push', 'tab', 'redirect','reLaunch | string | '-' | 否 |

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击标签的回调函数 | - |
| close |  点击关闭的回调函数 | - |
