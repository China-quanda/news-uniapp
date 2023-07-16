<template>
	<view class="account">
		<view class="cell">
			<my-cell title="手机号码" value="186****8151" @tap="tapPhone" />
			<my-cell title="邮箱" :value="userInfo?.email ? userInfo?.email : '去绑定'" @tap="tapEmail" />
			<my-cell title="修改密码" @tap="tapPassword"/>
			<my-text class="describe" bold color="#ccc">社交平台账号绑定</my-text>
			<my-cell title="微信" :isLink="false" :clickable="false">
				<block v-slot:value> <my-switch v-model:value="weixinStatus"/></block>
			</my-cell>
			<my-cell title="QQ" :isLink="false" :clickable="false">
				<block v-slot:value> <my-switch v-model:value="qqStatus"/></block>
			</my-cell>
			<my-text class="describe" bold color="#ccc">高级设置</my-text>
			<my-cell title="账号注销" @tap="router.push('del-account')" />
			<my-cell title="登录设备管理" @tap="router.push('./device/login-device')"/>
			<my-cell title="安全中心" @tap="router.push('./security/index')" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref,reactive} from 'vue';
	import prompt from '@/utils/prompt';
	import router from '@/utils/router';
// import { mapGetters } from 'vuex';

const tapPhone = ()=>{	
	let content = '更换已绑定的手机号码 当前绑定的手机号码为：186****8151'
	prompt.confirm({
		content: content,
		confirmText: '更换',
	}).then(()=>{
		router.push('replace?title=手机号')
		
	}).catch(()=>{})
}
const tapEmail = ()=>{	
	let content = '更换已绑定的邮箱 当前绑定的邮箱为：186****8151@qq.com'
	prompt.confirm({
		content: content,
		confirmText: '更换',
	}).then(()=>{
		router.push('replace?title=邮箱')
	}).catch(()=>{})
}
const tapPassword = ()=>{	
	let content = '修改登录密码 讲给手机：186****8151发送验证码'
	prompt.confirm({
		content: content,
		confirmText: '确认',
	}).then(()=>{
		router.push('replace?title=登录密码')
	}).catch(()=>{})
}
				
let weixinStatus = ref<boolean>(false)
let qqStatus = ref<boolean>(false)
let userInfo = reactive({})
</script>
<style lang="scss" scoped>
.describe {
	display: block;
	margin: 0px 15px;
	padding: 10px 0px;
	font-size: 14px;
	border-bottom: 1px solid rgb(243, 243, 243);
}
</style>
