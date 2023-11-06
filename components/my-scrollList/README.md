#Sticky 吸顶

**介绍**
该组件与CSS中position: sticky属性实现的效果一致，当组件达到预设的到顶部距离时， 就会固定在指定位置，组件位置大于预设的顶部距离时，会重新按照正常的布局排列。


**基础用法**
将内容包裹在 Sticky 组件内即可。
```
<my-sticky>基础用法</my-sticky>

```

**吸顶距离**
通过 sticky-top 属性可以设置组件在吸顶时与顶部的距离。
```
<my-sticky stickyTop="100px">吸顶距离</my-sticky>

```

**吸底距离**
将 position 设置为 bottom 可以让组件吸附在底部。通过 sticky-bottom 属性可以设置组件在吸底时与底部的距离。
```
<my-sticky position="bottom" sticky-bottom="44px">吸底距离</my-sticky>

```

**禁用吸顶**
设置disabled属性为true后将禁用吸顶效果
```
<my-sticky disabled>禁用吸顶</my-sticky>

```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| position |吸附位置，可选值为 bottom top | string | 'top' | 否 |
| stickyTop |吸顶时与顶部的距离，支持 px vw vh rem 单位，默认 px | string | '0px' | 否 |
| stickyBottom |吸底时与顶部的距离，支持 px vw vh rem 单位，默认 px | string | '0px' | 否 |
| bgColor |组件背景颜色 | string | 'transparent' | 否 |
| disabled | 是否禁用吸顶功能 | Boolean | 'false' | 否 |
| z-index | 设置组件的 z-index 层级 | number | '100' | 否 |


**Slots**
| 名称 | 说明 |
| --- | --- |
| default |默认插槽|