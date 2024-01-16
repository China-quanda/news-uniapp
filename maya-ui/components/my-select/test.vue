<template>
	<view class="test">
		<uni-section title="自定义校验规则" type="line">
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="姓名" required name="name">
						<uni-easyinput v-model="customFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="年龄" required name="age">
						<uni-easyinput v-model="customFormData.age" placeholder="请输入年龄" />
					</uni-forms-item>
					<uni-forms-item label="兴趣爱好" required name="hobby">
						<uni-data-checkbox v-model="customFormData.hobby" multiple :localdata="hobbys" />
					</uni-forms-item>
					<uni-forms-item label="选择" required name="hobby">
						<Myselect :columns="selectColumns1" :value="customFormData.select1" @getSelect="getSelect1"></Myselect>
					</uni-forms-item>
					<uni-forms-item label="选择2" required name="hobby">
						<Myselect :columns="selectColumns2" :value="customFormData.select2" @getSelect="getSelect2"></Myselect>
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit()">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import Myselect from './my-select.vue'
	const selectColumns1 = reactive([
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
	// 表单数据
	let customFormData = reactive({
		name: '',
		age: '',
		hobby: [],
		select1: 431022,
		select2: '永兴县',
	})
	// 多选数据源
	const hobbys = reactive([{
		text: '跑步',
		value: 0
	}, {
		text: '游泳',
		value: 1
	}, {
		text: '绘画',
		value: 2
	}, {
		text: '足球',
		value: 3
	}, {
		text: '篮球',
		value: 4
	}, {
		text: '其他',
		value: 5
	}])
	const customRules = reactive({
		name: {
			rules: [{
				required: true,
				errorMessage: '姓名不能为空'
			}]
		},
		age: {
			rules: [{
				required: true,
				errorMessage: '年龄不能为空'
			}]
		},
		hobby: {
			rules: [{
				format: 'array'
			},
			{
				validateFunction: function (rule, value, data, callback) {
					if (value.length < 2) {
						callback('请至少勾选两个兴趣爱好')
					}
					return true
				}
			}
			]
		}
	})
	const customForm = ref()
	const getSelect1 = (e) => {
		customFormData.select1 = e.dictValue
		console.log(e);
	}
	const getSelect2 = (e) => {
		customFormData.select2 = e
		console.log(e);
	}
	// 触发提交表单
	const submit = () => {
		customForm.value.validate().then(res => {
			console.log('表单数据信息：', res);
		}).catch(err => {
			console.log('表单错误信息：', err);
		})
	}
</script>
