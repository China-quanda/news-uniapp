<template>
  <view class='delAccount'>
		<u-navbar placeholder :title="title" :autoBack="true" border/> 
		
		<view class="Panel">
			<view class="" v-if="status == 1">
				<h4>为保证你的账号安全，在你提交的注销申请生效前，需同时满足以下条件：</h4>
				
				<view class="Panel-item">
					<view class="Panel-title">1.账号财产已结清</view>
					<view class="Panel-con">
						<p>没有资产、欠款、未结清的资金和虚拟权益</p>
						<p>本账号及通过本账号接入的第三方中没有未完成或存在争议的服务</p>
					</view>
				</view>
				<view class="Panel-item">
					<view class="Panel-title">2.账号处于安全状态</view>
					<view class="Panel-con">
						<p>账号处于正常使用状态，无被盗风险</p>
					</view>
				</view>
				<view class="Panel-item">
					<view class="Panel-title">3.账号权限解除</view>
					<view class="Panel-con">
						<p>账号已解除与其他产品的授权登录或绑定关系</p>
					</view>
				</view>
				<view class="Panel-item on-border">
					<view class="Panel-title">4.账号无任何纠纷，包括投诉举报</view>
				</view>
				
				<view class="xieyi">
					<u-radio-group v-model="value">
						<u-radio shape="circle" label="我已阅读并同意"></u-radio><span>“注销协议”</span>
					</u-radio-group>
					
				</view>
				<u-button @tap="toCode"  type="primary"  shape="circle">下一步</u-button>
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
			
		</view>
   </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { getVerifyCode } from '@/api/verifyCode'
import { validMobile, validEmail } from '@/utils/validate.js'
export default {
  name: 'delAccount',
  data () {
    return {
			tips:'',
			form: {
			  account: null,
			  code: null
			},
			status:1,
			value:''
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
		toCode(){
			this.status = 2
		},
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
	.delAccount{
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

	.Panel{
		padding: 0 15px;
	}
	
	h4{
		margin: 20px 0px;
	}
	
.Panel-item{
	border-bottom: 0.5px solid #ccc;
	padding: 10px 0px;
	.Panel-title{
		font-weight: 500;
		margin-bottom: 10px;
	}
	.Panel-con{
		margin-left: 15px;
		color: #6d6666;
	}	
}
.on-border{
		border-bottom: 0;
}
.xieyi{
	margin: 30px 0px 20px 0px;
	font-size: 14px;
	span{
	color: #3c9cff;
	}
}

</style>
