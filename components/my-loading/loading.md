#Loading 加载

**介绍**
加载图标，用于表示加载中的过渡状态。般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景


**使用**

```

加载类型
支持classic、spinner、bars、dots、infinity、continuous、progress、wobbling、shapes、pulsing 默认为spinner。
<my-loading type="spinner"></my-loading>

编号 通过No设置加载动画样式 默认为1 可选1-11
<my-loading type="infinity" No="5" ></my-loading>

自定义颜色 通过color设置加载颜色
<my-loading type="infinity" No="7" color="pink" ></my-loading>

文字内容 通过text设置文字内容
<my-loading type="infinity" No="7" color="pink" text="加载中" ></my-loading>

图标和文字是否垂直排列 
<my-loading type="infinity" No="7" color="pink" text="加载中" vertical ></my-loading>

```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| type | 加载类型 支持classic、spinner、bars、dots、infinity、continuous、progress、wobbling、shapes、pulsing 默认为spinner。| string | 'spinner' | 否 |
| No | 编号 通过No设置加载动画样式 默认为1 可选1-11| string、number | '1' | 否 |
| color | 自定义颜色 通过color设置加载颜色 | string | '#1890ff' | 否 |
| text | 文字内容 | string | '-' | 否 |
| vertical |图标和文字是否垂直排列 | Boolean | 'false' | 否 |
