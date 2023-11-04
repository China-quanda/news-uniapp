#Step 步骤条


**介绍**
该组件一般用于完成一个任务要分几个步骤，标识目前处于第几步的场景。



**通用数据**
通过direction属性设置row-横向，column-竖向

```
<script setup lang="ts">
import { ref } from "vue";
const list = ref([
  { title: "已下单", desc: "10:30" },
  { title: "已发货", desc: "11:31" },
  { title: "已发货", desc: "11:31" },
  { title: "运输中", desc: "12:55" },
]);
</script>
```

**基本使用**
通过direction属性设置row-横向，column-竖向

```
<my-step direction="row" current="1">
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>

<my-step direction="column" current="2">
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>
```

**显示点类型**
通过dot属性设置显示点类型

```
<my-step direction="row" current="1" dot>
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>

<my-step direction="column" current="2" dot>
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>
```

**自定义图标**
通过activeIcon属性设置激活状态的图标，inactiveIcon属性设置未激活状态图标

```
<my-step direction="row" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>

<my-step direction="column" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
  <my-step-item v-for="(item,index) in list" :num="index" :title="item.title" :desc="item.desc"/>
</my-step>
```

**自定义内容**
icon：图标，title：标题，desc：描述

```
<my-step direction="row" current="2" activeIcon="icon-weixiao" inactiveIcon="icon-cha">
  <my-step-item v-for="(item,index) in list" :num="index">
    <template #icon> <i :class="`iconfont icon-weixiao`"></i> </template>
    <template #title>title</template>
    <template #desc>desc</template>
  </my-step-item>
</my-step>
```

**StepProps**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| direction | row-横向，column-竖向 | string | 'row' | 否 |
| current | 设置当前处于第几步 | number,string | '1' | 否 |
| activeColor |激活状态颜色 | string | '#3c9cff' | 否 |
| inactiveColor |未激活状态颜色 | string | '#969799' | 否 |
| activeIcon | 激活状态的图标 | string | '-' | 否 |
| inactiveIcon | 未激活状态图标 | string | '-' | 否 |
| dot | 是否显示点类型 | boolean | 'false' | 否 |


**StepItemProps**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| num | 当前index | number | '-' | 是 |
| title | 标题文字 | string | '-' | 否 |
| desc | 描述文本 | string | '-' | 否 |
| iconSize |图标大小 | string | '18px' | 否 |


**StepSlots**
| 名称 | 说明 |
| --- | --- |
| default |	默认插槽|

**StepItemSlots**
| 名称 | 说明 |
| --- | --- |
| default |	自定义内容插槽|
| icon |	图标插槽|
| title |	标题插槽|
| desc |	描述插槽|
