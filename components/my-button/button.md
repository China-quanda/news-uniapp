#Button 按钮 

**介绍**
按钮用于触发一个操作，如提交表单。

**使用**

```

按钮类型
支持default、primary、info、warning、danger五种类型，默认为default。
<my-button type="default">默认按钮</my-button>
<my-button type="primary">主要按钮</my-button>
<my-button type="info">信息按钮</my-button>
<my-button type="warning">警告按钮</my-button>
<my-button type="danger">危险按钮</my-button>
 
 
朴素按钮
通过plain属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
 <my-button plain type="default">朴素按钮</my-button>
 <my-button plain type="primary">朴素按钮</my-button>
 <my-button plain type="info">朴素按钮</my-button>
 <my-button plain type="warning">朴素按钮</my-button>
 <my-button plain type="danger">朴素按钮</my-button>
 
 
 细边框
 设置hairline属性可以开启 0.5px 边框，基于伪类实现。
 <my-button plain hairline type="default">细边框</my-button>
 <my-button plain hairline type="primary">细边框</my-button>
 <my-button plain hairline type="info">细边框</my-button>
 <my-button plain hairline type="warning">细边框</my-button>
 <my-button plain hairline type="danger">细边框</my-button>
 
 
 禁用状态
 通过disabled属性来禁用按钮，此时按钮的bind:click事件不会触发。
 <my-button disabled type="default">禁用状态</my-button>
 <my-button disabled type="primary">禁用状态</my-button>
 <my-button disabled type="info">禁用状态</my-button>
 <my-button disabled type="warning">禁用状态</my-button>
 <my-button disabled type="danger">禁用状态</my-button>
 
 
 加载状态
 通过loading属性来设置加载状态，此时按钮的bind:click事件不会触发。loadingText设置加载中文字
 <my-button loading loadingText="加载中" type="default">默认按钮</my-button>
 <my-button loading type="primary">加载状态</my-button>
 <my-button loading type="info">加载状态</my-button>
 <my-button loading type="warning">加载状态</my-button>
 <my-button loading type="danger">加载状态</my-button>
 
 
 按钮形状
 按钮形状 通过shape值设置按钮形状，circle为圆角
 <my-button type="default">方型按钮</my-button>
 <my-button type="primary">方型按钮</my-button>
 <my-button shape="circle" type="info">圆型按钮</my-button>
 <my-button shape="circle" type="warning">圆型按钮</my-button>
 <my-button shape="circle" type="danger">圆型按钮</my-button>
 
 
 图标按钮
 通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以自定义阿里图标 
 通过iconColor自定义图标颜色默认为#ccc
 <my-button icon="icon-weixiao" iconColor="pink" type="default">图标按钮</my-button>
 <my-button icon="icon-sousuo" type="primary">图标按钮</my-button>
 <my-button icon="icon-dianzan" type="info">图标按钮</my-button>
 <my-button icon="icon-shoucang" type="warning">图标按钮</my-button>
 <my-button icon="icon-fenxiang" type="danger">图标按钮</my-button>
 
 
 按钮尺寸
 支持large、normal、small、mini四种尺寸，默认为normal。
	<my-button size="large" type="default">large</my-button>
	<my-button size="normal" type="primary">normal</my-button>
	<my-button size="small" type="info">small</my-button>
	<my-button size="mini" type="warning">mini</my-button>
	
	
	自定义颜色
	通过color属性可以自定义按钮的颜色也可以通过color值设置按钮渐变颜色
	<my-button color="pink" type="default">粉红色</my-button>
	<my-button color="red" type="primary">禁用状态</my-button>
	<my-button color="#ccc" type="info">禁用状态</my-button>
	<my-button color="linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36));" type="info">渐变色</my-button>
	
	
	跳转按钮 
	通过url属性点击后跳转的链接地址，此时按钮的bind:click事件不会触发，
	设置了linkType跳转到本地页面，未设置跳转外部链接
	通过linkType属性设置链接跳转的方式 push，tab，redirect，reLaunch
	push 关闭当前页面，返回上一页面或多级页面
	tab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 
	reLaunch 关闭所有页面，打开到应用内的某个页面。 
	redirect 关闭当前页面，跳转到应用内的某个页面。
	<my-button url="/pages/login/login" linkType="push" type="default">跳转首页</my-button>
	<my-button url="/pages/login/login" linkType="tab" type="primary">跳转底部</my-button>
	<my-button url="/pages/login/login" linkType="redirect" type="info">关闭当前页面跳转</my-button>
	<my-button url="/pages/login/login" linkType="reLaunch" type="info">重定向</my-button>
	<my-button url="http://www.baidu.com" type="warning">外部链接</my-button>
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| type | 按钮类型 ：primary、success、info、warning、danger、default  | string | 'default' | 否 |
| size | 按钮尺寸 :支持 large、normal、small、mini 四种尺寸| string | 'normal' | 否 |
| plain | 朴素按钮 通过 plain 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。 | Boolean | 'false' | 否 |
| hairline | 细边框 设置 hairline 属性可以展示 0.5px 的细边框。  | Boolean | 'false' | 否 |
| disabled | 禁用状态 通过 disabled 属性来禁用按钮，禁用状态下按钮不可点击。  | Boolean | 'false' | 否 |
| loading |加载状态 通过loading值设置是否开启加载图标 | Boolean | 'false' | 否 |
| loadingText | loadingText设置加载中文字 | string | '-' | 否 |
| shape | 按钮形状 通过shape值设置按钮形状，circle为圆角| string | 'shape' | 否 |
| color | 自定义颜色 通过color值设置按钮渐变颜色 | string | '-' | 否 |
| text | 按钮文字 | string | '-' | 否 |
| icon | 按钮图标 | string | '-' | 否 |
| iconColor | 自定义图标颜色 | string | '#ccc' | 否 |
| url | 点击后跳转的链接地址 | string | '-' | 否 |
| linkType | 链接跳转的方式 可选 push', 'tab', 'redirect','reLaunch | string | '-' | 否 |

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击按钮的回调函数 | - |

