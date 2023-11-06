#Cell-group 单元格分组

**介绍**
cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。

**基本用法**
```
<my-cell-group title="标题1" inset>
	<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
	<my-cell title="标题" value="value"> </my-cell>
	<my-cell title="标题" value="value" label="label"> </my-cell>
</my-cell-group>
<my-cell-group title="标题2" inset>
	<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
	<my-cell title="标题" value="value"> </my-cell>
	<my-cell title="标题" value="value" label="label"> </my-cell>
</my-cell-group>
```

**显示外边框**
通过 border 属性在标题左侧展示图标。
```
<my-cell-group border>
	<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
	<my-cell title="标题" value="value"> </my-cell>
</my-cell-group>
```

**展示为圆角卡片风格**
通过 border 属性是否展示为圆角卡片风格
```
<my-cell-group inset>
	<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
	<my-cell title="标题" value="value"> </my-cell>
</my-cell-group>
```

**分组标题**
通过 title 属性设置分组标题
```
<my-cell-group title="分组">
	<my-cell title="标题" value="value" icon="icon-weixiao"></my-cell>
	<my-cell title="标题" value="value"> </my-cell>
</my-cell-group>
```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| title | 分组标题  | string | '-' | 否 |
| inset | 是否显示下边框 | boolean | 'true' | 否 |
| border | 是否展示为圆角卡片风格 | boolean | 'false' | 否 |


**Slots**
| 名称 | 说明 |
| --- | --- |
| default |默认插槽|
| title |	自定义分组标题|
