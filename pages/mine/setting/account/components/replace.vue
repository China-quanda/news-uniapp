<template>
  <view class='replace'>
		<u-navbar placeholder :title="'更换'+title" :autoBack="true" border/> 
		
		<view class="Panel">
			<view class="Panel-row" v-if="status == 1">
				<h1>请输入原{{title}}	</h1>
				<u--input v-model="form.account" :placeholder="'请输入原'+title" border="none" clearable class="row-input"></u--input>
				<u-button @tap="getCode"  type="primary"  shape="circle">下一步</u-button>
				<view class="bottom">
					<span>原{{title}}已忘记？</span> <span class="tijiao">提交反馈</span>
				</view>
			</view>
			
			<view class="Panel-row" v-else-if="status == 2">
				<h1>请输入验证码</h1>
				<u--input v-model="form.code" placeholder="验证码" type="number" border="none" clearable class="row-input">
					<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" changeText="X秒重新获取" ></u-code>
					<u-button @tap="getCode" :text="tips" type="success" size="mini" ></u-button>
				</template>
				</u--input>
				<u-button @tap="verifyCode"  type="primary"  shape="circle">下一步</u-button>
			</view>
			  
			<view class="Panel-row" v-else-if="status == 3">
				<h1>请输入新{{title}}</h1>
				<u--input v-model="form.account" :placeholder="'请输入'+title" border="none" clearable class="row-input"></u--input>
				<u-button @tap="getCode"  type="primary"  shape="circle">下一步</u-button>
			</view>
			
			<view class="Panel-row editPwd" v-else-if="status == 4">
				<u--input v-model="form.code" placeholder="验证码" type="number"  clearable class="row-input">
					<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" changeText="X秒重新获取" ></u-code>
					<u-button @tap="getCode" :text="tips" type="success" size="mini" ></u-button>
				</template>
				</u--input>
				<u--input v-model="form.account" :placeholder="'请输入'+title"  clearable class="row-input"></u--input>
				<u-button @tap="verifyCode"  type="primary"  shape="circle" class="btn-u" >确定修改</u-button>
			</view>
			
		</view>
   </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getVerifyCode } from '@/api/verifyCode'
import { validMobile, validEmail } from '@/utils/validate.js'
export default {
  name: 'replace',
  data () {
    return {
			tips:'',
			form: {
			  account: null,
			  code: null
			},
			status:4
    }
  },
	props:{
		title:{
			type:String,
			required:true,
			default: '导航栏'
		}
	},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {},
  methods: {
		// 验证码提示
		codeChange(text) {
		  this.tips = text;
		},
		// 获取验证码
		async getCode() {
			if (!validMobile(this.form.account) && !validEmail(this.form.account)) {
		  return uni.showToast({icon: 'none',title: '请输入有效的'+this.title});
		}
		  if (this.$refs.uCode.canGetCode) {
		    // 模拟向后端请求验证码
		    uni.showLoading({
		      title: '正在获取验证码'
		    })
				const VerifyCode = await getVerifyCode({ account: this.form.account })
				uni.hideLoading();
				// 这里此提示会被this.start()方法中的提示覆盖
				uni.$u.toast('验证码已发送');
				this.status = 2
				console.log(VerifyCode)
				 // 通知验证码组件内部开始倒计时
				 this.$refs.uCode.start();
		  } else {
		    uni.$u.toast(this.tips);
		  }
		},
		verifyCode(){
			this.status = 3
		}
  }
}
</script>
<style lang="scss" scoped>
	.replace{
		width: 100vw;
	}
	.Panel-row{
		margin-top: 60px;
		h1{
			font-weight: 400;
			margin-bottom: 100px;
			font-size: 26px;
			color: #2e3232;
		}
		.bottom{
			margin-top: 10px;
			.tijiao{
				color: #3c9cff;
			}

		}
		.row-input{
			margin: 40px 0px;
		}
		/deep/.u-button__text{
			font-size: 18px !important;	
		}
		/deep/.u-button--success[data-v-2bf0e569] {
		    color: #554d4d;
		    background-color: #fff !important; 
		    border-color: #fff!important; 
		    border-width: 0px; 
		    border-style: solid; 
		}
		/deep/.u-input__content__field-wrapper__field{
			font-size: 20px  !important;
		}
	}
	.editPwd{
		.row-input{
			margin: 0px 0px;
		}
		.btn-u{
			margin-top: 30px;
		}
		/deep/.u-input__content__field-wrapper__field{
			font-size: 16px  !important;
			height: 40px;
		}
	}
	.Panel{
		padding: 0 15px;
	}
	.cell{
		margin-top: 44px;
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
