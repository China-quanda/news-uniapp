#Segmented 分段器 

**介绍**
该分段器一般用于用户从几个选项中选择某一个的场景



**禁用分段器**
通过设置 disabled 属性为 true，禁用分段器。
```
<my-segmented v-model="current" :list="list" disabled @change="change" />

<script lang="ts" setup>
import { ref } from 'vue';
let current = ref(0)
const change = (e)=>{
	console.log(e);
}
let list = ref([
	{label:'收藏',disabled:false},
	{label:'评论',disabled:false},
	{label:'点赞',disabled:false},
	{label:'转发',disabled:false},
]);

</script>

```

**带振动效果的分段器**
通过设置 vibrate-short 属性为 true，使手机在切换选项时产生短暂振动。
```
<my-segmented v-model="current" :list="list" vibrate-short @change="change" />

```

**模式选择**
通过设置mode属性为 button subsection line模式
```
	<my-segmented v-model="current" :list="list" mode="subsection" @change="change" />
	<my-segmented v-model="current" :list="list" mode="button" @change="change" />
	<my-segmented v-model="current" :list="list" mode="line" @change="change" />

```


**Props**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| v-model=“current” | 当前选中的值| string、number | '0' | 是 |
| list | 选项的数组| string[] | number[] | SegmentedOption[] | '[]' | 否 |
| activeColor |激活时的颜色 | string | '#3c9cff' | 否 |
| inactiveColor |未激活时的颜色 | string | '#303133' | 否 |
| mode |模式选择 button subsection line | string | 'subsection' | 否 |
| disabled | 禁用分段器 | Boolean | 'false' | 否 |
| vibrateShort | 切换选项时是否振动 | Boolean | 'false' | 否 |
| fontSize |字体大小，单位px | string | '12px' | 否 |
| bold | 激活选项的字体是否加粗 | Boolean | 'false' | 否 |
| bgColor |背景颜色 | string | '#eeeeef' | 否 |
| size |尺寸 未启用 | string | '-' | 否 |
| type |类型 未启用 | string | '-' | 否 |


**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| change |  分锻器变化时触发 | e |