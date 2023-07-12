<template>
  <view class='container'>
		<my-nav-bar title="设置" :clickLeft="router.back" />
    <view class="setting user-setting" ></view>
		<my-cell title="编辑资料" url="/pages/mine/setting/profile/index"/>
		<my-cell title="账号安全" url="/pages/mine/setting/account/index"/>
		<my-cell title="隐私设置" url="/pages/mine/setting/privacy/index"/>
		
    <view class="setting basic-setting"></view>
		<my-cell title="夜间模式" :isLink="false" :clickable="false">
			<block v-slot:value> <my-switch v-model:value="promptStatus"/></block>
		</my-cell>
		<my-cell title="大字设置" />
		<my-cell title="字体大小" value="小" />
		
    <view class="setting"></view>
		<my-cell title="清除缓存" value="0B" />
		<my-cell title="播放与网络设置"/>
		<my-cell title="推送通知设置"/>
		<my-cell title="安全浏览设置"/>
		<my-cell title="提示音开关" :isLink="false" :clickable="false">
			<block v-slot:value> <my-switch v-model:value="switchoverStatus"/></block>
		</my-cell>
		
    <view class="setting"></view>
		<my-cell title="隐私政策及简明版"/>
		<my-cell title="个人信息收集清单"/>
		<my-cell title="第三方信息共享清单"/>
		<my-cell title="安全浏览设置"/>
		
    <view class="setting"></view>
		<my-cell title="检查版本" :value="appVersion"/>
		<my-cell title="关于头条"/>
		<my-cell title="用户反馈"/>
		
    <view class="login-out" v-if="token">
			<button type="default" @click="onExit()">退出登录</button>
    </view> 
		
   </view>
</template>

<script lang="ts" setup>
// import { mapActions, mapGetters } from 'vuex'
// import {getStorage} from '@/utils/storage'
// ...mapActions('user', ['logout']),
import {ref} from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import storage from '@/utils/storage';
import router from '@/utils/router';
let token = ref('')
let appVersion = ref('')
let promptStatus = ref(false)
let switchoverStatus = ref(false)

onLoad(()=>{
	// 获取app版本号
	appVersion.value = storage.get('systemInfo')?.appVersion
	token.value = storage.get('token')
})

const onExit = ()=> {
  this.logout()
  this.$router.back()
}
</script>
<style lang="scss" scoped>
.container{
  background-color:rgb(240, 240, 240);
	padding-bottom: 20rpx;
}
.setting{
  margin-top: 8px;
	background-color: #fff;
}
.user-setting{
	// margin-top: 95px;
}
.login-out{
  margin-top: 15px;
 background-color: #fff;
 color: #218eff;
}
</style>
