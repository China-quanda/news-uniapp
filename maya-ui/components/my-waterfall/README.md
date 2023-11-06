#瀑布流 Waterfall

**介绍**
瀑布流又称瀑布流式布局，是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动。


**使用**

```

基本使用
直接引入即可使用

通过height配置高度，单位px
通过bgColor配置背景颜色

<my-gap height="30px" marginTop="20px" marginBottom="20px" bgColor="red"></my-gap>

```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| height | 间隔槽高度，单位px| string、number | '20px' | 否 |
| marginTop | 与前一个元素的距离，单位px| string、number | '0px' | 否 |
| marginBottom | 与后一个元素的距离，单位px| string、number | '0px' | 否 |
| bgColor | 背景颜色 transparent(背景透明) | string | 'transparent' | 否 |
