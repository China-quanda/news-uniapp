#LoadMore 加载更多

**介绍**
此组件一般用于标识页面底部加载数据时的状态，共有三种状态：

加载前，显示"加载更多"，加入点击可选，是因为数据不够一页时，无法触发页面的onReachBottom生命周期
加载中，显示"正在加载..."，2种动画可选
加载后，如果还有数据，回到"加载前"状态，否则加载结束，显示"没有更多了"



**使用**

```

基本使用
通过status设置组件的状态，加载前值为loadmore，加载中为loading，没有数据为nomore
注意：以下示例仅为模拟效果，实际中请根据自己的逻辑，修改代码的实现
<my-load-more status="loadmore" > </my-load-more>
<my-load-more status="loading" > </my-load-more>
<my-load-more status="nomore" > </my-load-more>


修改默认文字
通过loadmoreText、loadingText、nomoreText属性设置组件的状态，加载前值为loadmore，加载中为loading，没有数据为nomore
<my-load-more status="loadmore" loadmoreText="下拉加载更多" loadingText="努力加载中" nomoreText="数据已加载完"> </my-load-more>


改变颜色和字体大小
通过color属性设置字体颜色，通过fontSize属性设置字体大小
<my-load-more status="loadmore" color="pink" fontSize="16px"> </my-load-more>


线条自定义颜色和设置为虚线
可以通过配置lineColor实现颜色,lineType线条类型solid实线，dashed虚线
<my-load-more showLine lineColor="red" lineType="dashed"> </my-load-more>


自定义加载图标
可以通过配置showIcon显示加载图标 ，iconColor改变加载图标颜色，iconType设置加载类型，iconNo设置加载编号
<my-load-more showIcon iconColor="red" iconType="dots" iconNo="7"> </my-load-more>

```

**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| status | 组件状态 loadmore、loading、nomore| string | 'loadmore' | 否 |
| bgColor | 背景颜色 transparent(背景透明) | string | 'transparent' | 否 |
| loadmoreText | 加载前的提示语 | string | '加载更多' | 否 |
| loadingText | 加载中提示语 | string | '正在加载...' | 否 |
| nomoreText | 没有更多的提示语 | string | '没有更多了' | 否 |
| color | 字体颜色 | string | '#606266' | 否 |
| showIcon | 加载中时是否显示图标| boolean | 'true' | 否 |
| fontSize | 字体大小，单位px | string | '14px' | 否 |
| iconColor | 加载中的动画图标的颜色 | string | '#b7b7b7' | 否 |
| iconNo | 加载图标编号 通过No设置加载动画样式 默认为1 可选1-11 | string,number | '3' | 否 |
| iconType | 加载中状态的图标 支持classic、spinner、bars、dots、infinity、continuous、progress、wobbling、shapes、pulsing 默认为spinner。 | string | 'spinner' | 否 |
| showLine | 是否显示左边分割线| boolean | 'false' | 否 |
| lineColor | 线条颜色 | string | '#E6E8EB' | 否 |
| lineType | 线条类型，solid实线，dashed虚线| string | 'solid' | 否 |
| height | 高度| string、number | 'auto' | 否 |
| marginTop | 与前一个元素的距离，单位px| string | '10px' | 否 |
| marginBottom | 与后一个元素的距离，单位px| string | '10px' | 否 |


**Events事件**
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| loadmore |  status为loadmore时，点击组件会发出此事件 | - |
