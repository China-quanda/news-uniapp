<template>
  <view class='container'>
		<my-nav-bar title="设置" :clickLeft="router.back" />
    <view class="setting user-setting" ></view>
		<my-cell title="编辑资料" isLink url="/pages/setting/profile/index" />
		<my-cell title="账号安全" isLink url="/pages/setting/account/index" />
		<my-cell title="隐私设置" isLink url="/pages/setting/privacy/index" />
		
    <view class="setting basic-setting"></view>
		<my-cell title="夜间模式"  >
			<view slot="value">
				<!-- <u-switch v-model="switchoverStatus" @change="switchoverChange"></u-switch> -->
			</view>
		</my-cell>
		<my-cell title="大字设置" isLink />
		<my-cell title="字体大小" isLink value="小" />
		
    <view class="setting"></view>
		<my-cell title="清除缓存" isLink  value="0B" />
		<my-cell title="播放与网络设置" isLink  />
		<my-cell title="推送通知设置" isLink  />
		<my-cell title="安全浏览设置" isLink />
		<my-cell title="提示音开关"  >
			<view slot="value" >
				<!-- <u-switch v-model="promptStatus" @change="promptChange"></u-switch> -->
			</view>
		</my-cell>
		
    <view class="setting"></view>
		<my-cell title="隐私政策及简明版" isLink />
		<my-cell title="个人信息收集清单" isLink  />
		<my-cell title="第三方信息共享清单" isLink  />
		<my-cell title="安全浏览设置" isLink />
		
    <view class="setting"></view>
		<my-cell title="检查版本" isLink  :value="appVersion" />
		<my-cell title="关于头条" isLink  />
		<my-cell title="用户反馈" isLink  />
		
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
const promptChange = (e)=>{
	promptStatus.value = e
}
const switchoverChange = (e)=>{
	switchoverStatus.value = e
}

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
