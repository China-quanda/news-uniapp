未实现 ： 
	手风琴效果
	Collapse Methods： toggleAll ｜ init
	Collapse Props ： value  ｜ accordion
	
参考地址：
	[Collapse 折叠面板](https://www.uviewui.com/components/collapse.html)
	[Collapse 折叠面板](https://vant-contrib.gitee.io/vant/#/zh-CN/collapse)


#Collapse 折叠面板

**介绍**
将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。

**使用**

```

基本用法
<my-link href="http://www.example.com" text="http://www.example.com"></my-link>

打开链接类型
通过openType属性设置打开链接方式
<my-link href="http://www.example.com" text="http://www.example.com" openType="webview"></my-link>

链接文字大小
通过fontSize属性设置链接文字大小，单位px
<my-link href="http://www.example.com" text="http://www.example.com" fontSize="18px"></my-link>

链接文字颜色
通过color属性设置链接文字颜色
<my-link href="http://www.example.com" text="http://www.example.com" color="red"></my-link>

是否显示下划线
通过showUnderLine属性设置是否显示下划线
<my-link href="http://www.example.com" text="http://www.example.com" showUnderLine></my-link>


```

**Collapse Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| value | 当前展开面板的name，非手风琴模式：[<String | Number>]，手风琴模式：String | Arrar| String | '' | 否 |
| accordion | 是否手风琴模式 | boolean | 'false' | 否 |
| border | 是否显示外边框 | boolean | 'true' | 否 |


**CollapseItem Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| title | 面板标题| string | '' | 否 |
| value | 标题右侧内容| string | '' | 否 |
| label | 标题下方的描述信息 | string | '' | 否 |
| isLink | 是否展示右侧箭头并开启点击反馈 | boolean | 'true' | 否 |
| clickable | 是否开启点击反馈 | boolean | 'false' | 否 |
| disabled | 是否禁用面板 | boolean | 'false' | 否 |
| border | 是否显示内边框 | boolean | 'true' | 否 |
| name | 唯一标识符，如不设置，默认用当前collapse-item的索引值 | String | Number | '' | 否 |
| icon | 标题左侧图片，可为绝对路径的图片或内置图标 | String | '' | 否 |
| duration |  面板展开收起的过渡时间，单位ms | Number | 300 | 否 |



**Collapse Methods**
通过 ref 可以获取到 Collapse 实例并调用实例方法
| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggleAll | 切换所有面板展开状态，传 true 为全部展开，false 为全部收起，不传参为全部切换 | options?: boolean | object | - |
| init | 重新初始化内部高度计算，用于异步获取内容的情形，请结合nextTick()使用 | - | - |

toggleAll 方法示例
Tips: 手风琴模式下无法使用 toggleAll 方法。
```
import { ref } from 'vue';
import type { CollapseInstance } from 'vant';

const collapseRef = ref<CollapseInstance>();

// 全部切换
collapseRef.value?.toggleAll();
// 全部展开
collapseRef.value?.toggleAll(true);
// 全部收起
collapseRef.value?.toggleAll(false);

// 全部全部切换，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  skipDisabled: true,
});
// 全部选中，并跳过禁用的复选框
collapseRef.value?.toggleAll({
  expanded: true,
  skipDisabled: true,
});


```


**CollapseItem Methods**
通过 ref 可以获取到 CollapseItem 实例并调用实例方法
| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换面板展开状态，传 true 为展开，false 为收起，不传参为切换 | expand?: boolean | - |


**Slots**
| 名称 | 说明 |
| --- | --- |
| default | 面板内容|
| title | 自定义标题栏左侧内容|
| value | 自定义标题栏右侧内容|
| label | 自定义标题栏描述信息|
| icon | 自定义标题栏左侧图标|
| right-icon | 自定义标题栏右侧图标|


**Events事件**
注意：请在<my-collapse></my-collapse>上监听此事件
| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| change |  当前激活面板展开/关闭时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) | activeNames: String | Array |
| open |  当前激活面板展开/关闭时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) | activeNames: String | Array |
| close |  当前激活面板展开/关闭时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array) | activeNames: String | Array |


