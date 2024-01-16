#Select 普通选择器示例

**介绍**
从底部弹起的滚动选择器。普通选择器

**使用**

```

基本用法
<my-select :columns="selectColumns" :value="selectValue" @getSelect="getSelect"></my-select>
<my-select :columns="selectColumns2" :value="selectValue2" @getSelect="getSelect2"></my-select>

// 默认数据
const selectValue = ref(431083)
const selectValue2 = ref(‘永兴县’)

// 选择的数据项
const selectColumns = reactive([
	{ dictLabel: '北湖区', dictValue: 431002 },
	{ dictLabel: '苏仙区', dictValue: 431003 },
	{ dictLabel: '桂阳县', dictValue: 431021 },
	{ dictLabel: '宜章县', dictValue: 431022 },
	{ dictLabel: '永兴县', dictValue: 431023 },
	{ dictLabel: '嘉禾县', dictValue: 431024 },
	{ dictLabel: '临武县', dictValue: 431025 },
	{ dictLabel: '女城县', dictValue: 431026 },
	{ dictLabel: '桂东县', dictValue: 431027 },
	{ dictLabel: '安仁县', dictValue: 431028 },
	{ dictLabel: '资兴市', dictValue: 431081 },
	{ dictLabel: '经开区', dictValue: 431082 },
	{ dictLabel: '高新区', dictValue: 431083 },
])
const selectColumns2 = reactive([
	'北湖区',
	'苏仙区',
	'桂阳县',
	'宜章县',
	'永兴县',
	'嘉禾县'
])

// 选择后
const getSelect = (e) => {
	selectValue.value = e.dictValue
	console.log(e);
}
const getSelect2 = (e) => {
	selectValue2.value = e
	console.log(e);
}

```

**Props**

| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| keyName | 健| string | 'dictLabel' | 否 |
| keyValue | 值| string | 'dictValue' | 否 |
| placeholder | 显示文字| 请选择 | '-' | 否 |
| columns | 数据项 | any[] | '' | 是 |
| value | 回显数据 | string、number | '' | 否 |
| disabled | 是否禁用 | boolean | 'false' | 否 |

**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| getSelect | 选择后的回调函数 | e |
