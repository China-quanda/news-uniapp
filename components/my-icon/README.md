#Icon 图标

**介绍**
基于阿里字体的图标集，可以通过 font-class,svg  方式使用，也可以在其他组件中通过 icon 属性引用。

**使用**

```
  基本使用
  <my-icon icon="icon-quanping" size="44" color="red"/>
  <my-icon icon="icon-quanping"  type="svg"/>
  
  显示文字
  <my-icon icon="/static/logo.png" textPos="left" text="文字"/>
  <my-icon icon="/static/logo.png" textPos="right">
  	文字
  </my-icon>
```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| icon | iconfont 图标名称 | string | '' | 是 |
| type | 图标类型 font-class,svg | string | 'font-class' | 否 |
| className |svg自定义类名 | string | '' | 是 |
| size | 字体大小 | string | '16px' | 否 |
| color | 字体颜色 | string | '#8a8a8a' | 否 |
| bold | 是否显示粗体 | boolean | 'false' | 否 |
| text | 文字 | string | '' | 否 |
| textSize | 文字大小 | string | '15px' | 否 |
| textColor | 文字颜色 | string | '#141414' | 否 |
| textPos | 相对于图标的位置 bottom / top / left /right | string | 'right' | 否 |
| space | 文字与图标的距离，单位默认px | string | '3px' | 否 |

**GridSlots**
| 名称 | 说明 |
| --- | --- |
| default |	默认插槽|

**Events事件**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| click |  点击的回调函数 | - |

<!-- [Icon 图标 参考是否需要加入图片功能，图标名称，见示例图标集，如名称带有/，会被认为是图片图标](https://www.uviewui.com/components/icon.html) -->