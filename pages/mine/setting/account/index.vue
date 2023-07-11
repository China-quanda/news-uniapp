<template>
  <view class='account'>
		<u-navbar title="账号安全" placeholder :autoBack="true" border/>
        <view class="cell">
					<u-cell title="手机号码" isLink  value="186****8151" @tap="showModalPhone = true" />
					<u-cell title="邮箱" isLink  :value="userInfo.email ? userInfo.email : '去绑定'" @tap="showModalEmail = true"/>
					<u-cell title="修改密码" isLink  @tap="showModalPwd = true"/>
					 <a class="describe">社交平台账号绑定</a>
					 <u-cell title="微信"  >
					 	<view slot="value" >
					 		<u-switch v-model="weixinStatus" @change="weixinChange"></u-switch>
					 	</view>
					 </u-cell>
					 <u-cell title="QQ"  >
					 	<view slot="value" >
					 		<u-switch v-model="qqStatus" @change="qqChange"></u-switch>
					 	</view>
					 </u-cell>
					 <a class="describe">高级设置</a>
					 <u-cell title="账号注销" isLink  @tap="showDelAccount = true"/>
					 <u-cell title="登录设备管理" isLink  @tap="showLoginDevice = true"/>
					 <u-cell title="安全中心" isLink  @tap="showSecurity = true"/>
        </view>
				<!-- 修改手机 -->
				 <u-modal :show="showModalPhone"  :content="contentPhone" confirmText="更换" cancelText="取消"  showCancelButton @confirm="showReplacePhone = true" @cancel="showModalPhone = false"></u-modal>
				 <u-popup :show="showReplacePhone" mode="right" @close="showReplacePhone = false" @open="showReplacePhone = true" >
						<replace title="手机号"/>
				 </u-popup>
				 <!-- 修改邮箱 -->
				 <u-modal :show="showModalEmail"  :content="contentEmail" confirmText="更换" cancelText="取消"  showCancelButton @confirm="showReplaceEmail = true" @cancel="showModalEmail = false"></u-modal>
				 <u-popup :show="showReplaceEmail" mode="right" @close="showReplaceEmail = false" @open="showReplaceEmail = true" >
				 						<replace title="邮箱"/>
				 </u-popup>
				 <!-- 修改密码 -->
				  <u-modal :show="showModalPwd"  :content="contentPwd" confirmText="确定" cancelText="取消"  showCancelButton @confirm="showReplacePwd = true" @cancel="showModalPwd = false"></u-modal>
					<u-popup :show="showReplacePwd" mode="right" @close="showReplacePwd = false" @open="showReplacePwd = true" >
											<replace title="密码"/>
					</u-popup>
					<!-- 注销账号 -->
					<u-popup :show="showDelAccount" mode="right" @close="showDelAccount = false" @open="showDelAccount = true" >
											<delAccount title="注销账号"/>
					</u-popup>
					<!-- 登录设备 -->
					<u-popup :show="showLoginDevice" mode="right" @close="showLoginDevice = false" @open="showLoginDevice = true" >
											<loginDevice title="登录设备管理"/>
					</u-popup>
					<!-- 安全中心 -->
					<u-popup :show="showSecurity" mode="right" @close="showSecurity = false" @open="showSecurity = true" >
											<security title="安全中心"/>
					</u-popup>
				 
   </view>
</template>

<script>
import { mapGetters } from 'vuex'
import replace from './components/replace.vue'
import delAccount from './components/delAccount.vue'
import loginDevice from './components/loginDevice.vue'
import security from './components/security.vue'
export default {
  name: 'account',
  data () {
    return {
			 weixinStatus: false,
			 qqStatus: false,
			 showModalPhone:false,
			 showModalEmail:false,
			 showModalPwd:false,
			 showReplacePhone:false,
			 showReplaceEmail:false,
			 showReplacePwd:false,
			 showDelAccount:false,
			 showLoginDevice:false,
			 showSecurity:false,
			 contentPhone:'更换已绑定的手机号码 当前绑定的手机号码为：186****8151',
			 contentEmail:'更换已绑定的邮箱 当前绑定的邮箱为：186****8151@qq.com',
			 contentPwd:'修改登录密码 讲给手机：186****8151发送验证码',
    }
  },
	 components: { replace ,delAccount,loginDevice,security},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {},
  methods: {
		weixinChange(e){
			this.weixinStatus = e
		},
		qqChange(e){
			this.qqStatus = e
		},
  }
}
</script>
<style lang="scss" scoped>
	.cell{
		// margin-top: 44px;
	}
.describe{
  display:block;
  margin: 0px 15px;
  padding: 10px 0px;
  font-size: 14px;
  color: #ccc;
  border-bottom: 1px solid rgb(243, 243, 243);
}

</style>
