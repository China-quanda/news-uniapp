#Cell 单元格

**介绍**
cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。

**基本用法**
```
<my-cell title="标题" value="value"> </my-cell>
<my-cell title="标题" value="value" label="label"> </my-cell>
```

**展示图标**
通过 icon 属性在标题左侧展示图标。
```
<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
```

**展示右箭头**
设置isLink为true，将会显示右侧的箭头,通过rightIcon属性设置箭头方向
上箭头icon-xiangshang，下箭头icon-xiala，左箭头icon-xiangzuojiantou，右箭头icon-xiangyoujiantou
```
<my-cell title="标题" value="value" isLink> </my-cell>
<my-cell title="标题" value="value" isLink rightIcon="icon-xiala"> </my-cell>
```

**不显示下边框**
```
<my-cell title="标题" value="value" :border="false"></my-cell>
```

**页面导航**
设置isLink为true，单元格点击可跳转页面,传入url设置跳转地址
设置了linkType跳转到本地页面，未设置跳转外部链接
通过linkType属性设置链接跳转的方式 push，tab，redirect，reLaunch
push 关闭当前页面，返回上一页面或多级页面
tab 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 
reLaunch 关闭所有页面，打开到应用内的某个页面。 
redirect 关闭当前页面，跳转到应用内的某个页面。
```
<my-cell title="标题" value="value" isLink url="/pages/index/index"></my-cell>
<my-cell title="标题" value="value" isLink url="/pages/index/index" linkType="reLaunch"></my-cell>
```

**开启点击反馈**
通过clickable属性开启点击反馈
```
<my-cell title="标题" value="value" isLink clickable>
```

**禁用单元格**
通过disabled属性开启禁用单元格，禁用后不会触发click点击事件,不会路由跳转
```
<my-cell title="标题" value="value" isLink disabled>
```

**对齐方式**
通过align属性设置对齐方式
```
<my-cell title="标题" value="value" label="label" align="flex-start"></my-cell>
<my-cell title="标题" value="value" label="label" align="center"></my-cell>
<my-cell title="标题" value="value" label="label" align="flex-end"></my-cell>
```

**自定义插槽内容**
title	自定义左侧标题部分的内容，如需使用，请勿定义title参数，或赋值null即可
value	自定义右侧标题部分的内容，如需使用，请勿定义value参数，或赋值null即可
icon	自定义左侧的图标
right-icon	自定义右侧图标内容
label	自定义label内容
```
<my-cell isLink>
	<block v-slot:icon>
		<i class="iconfont icon-weixiao"></i>
	</block>
	<block v-slot:title>
		自定义title
	</block>
	<block v-slot:value>
		自定义value
	</block>
	<block v-slot:label>
		自定义label
	</block>
	<block v-slot:rightIcon>
		<i class="iconfont icon-xiangyoujiantou"></i>
	</block>
</my-cell>
```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| title | 左侧标题  | string | '-' | 否 |
| label | 标题下方的描述信息| string | '-' | 否 |
| value | 右侧的内容 | string | '-' | 否 |
| border | 是否显示下边框 | boolean | 'true' | 否 |
| url | 点击后跳转的URL地址| string | '-' | 否 |
| linkType | 链接跳转的方式 可选 push', 'tab', 'redirect','reLaunch | string | '-' | 否 |
| clickable | 是否开启点击反馈(表现为点击时加上灰色背景) | boolean | 'false' | 否 |
| disabled | 是否禁用单元格| boolean | 'false' | 否 |
| isLink | 是否展示右侧箭头并开启点击反馈 | boolean | 'false' | 否 |
| icon | 在标题左侧展示图标。 | string | '-' | 否 |
| rightIcon | 右侧的图标箭头| string | 'icon-xiangyoujiantou' | 否 |
| align | 对齐方式 可选'flex-start', 'flex-end', 'center' | string | 'center' | 否 |


**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击的回调函数 | - |

**Slots**
| 名称 | 说明 |
| --- | --- |
| icon |自定义左侧图标|
| title |	自定义左侧标题|
| label |	自定义标题下方的描述信息|
| value |	自定义右侧内容|
| rightIcon |	自定义右侧图标|
