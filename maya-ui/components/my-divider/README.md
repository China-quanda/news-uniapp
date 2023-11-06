#Divider 分割线 

**介绍**
用于将内容分隔为多个区域。



**基础用法**
默认渲染一条水平分割线。
```
<my-divider />

```

**展示文本**
通过插槽在可以分割线中间插入内容。
```
<my-divider>
	文本
</my-divider>

```

**内容位置**
通过 text-position 指定内容所在位置。
```
	<my-divider textPosition="center" text="文本"/>
	
	<my-divider textPosition="left" >
		left
	</my-divider>
	
	<my-divider textPosition="right" >
		right
	</my-divider>

```

**虚线**
添加 dashed 属性使分割线渲染为虚线。
```
<my-divider dashed/>

```

**设置细线**
可以通过hairline指定细线
```
<my-divider hairline/>

```

**设置以点代替文字**
可以通过dot指定以点代替文字
```
<my-divider dot />

```

**设置文本颜色和线条颜色**
可以通过textColor和lineColor指定文字刚线条颜色
```
<my-divider text="文本" textColor="#2979ff" ineColor="#ff0000"/>

```

**垂直**
可以通过vertical设置垂直
```
		文本
	<my-divider vertical/>
		文本
	<my-divider vertical/>
		文本
	<my-divider vertical/>

```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| dashed | 是否使用虚线 | Boolean | 'false' | 否 |
| hairline | 是否细线 是否使用 0.5px 线 | Boolean | 'true' | 否 |
| vertical | 是否使用垂直 | Boolean | 'false' | 否 |
| dot | 是否以点替代文字，优先于text字段起作用 | Boolean | 'false' | 否 |
| textPosition |内容文本的位置 ：left right center | string | 'center' | 否 |
| text |文本内容 | string | '' | 否 |
| textSize |字体大小，单位px | string | '14px' | 否 |
| textColor |文本颜色 | string | '#909399' | 否 |
| lineColor |线条颜色 | string | '#dcdfe6' | 否 |
