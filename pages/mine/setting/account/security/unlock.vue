<template>
  <view class='security-lock'>
		
		<u-popup v-if="status == 2" :show="true" mode="right"  >
			<view class="dev-info">
				<u-navbar placeholder title="解除锁定"  border @leftClick="status = 0"/>
				<view class="cell">
					<view class="Panel-con">
						<i class="iconfont icon-suoding"></i>
						<view class="Panel-title">解除锁定保护</view>
					</view>
					<view class="Panel-list">
						<view class="Panel-row"><span>·</span><p>如果锁定前您的帐号存在可疑绑定或疑似盗号等问题，解除锁定保护成功后，帐号的绑定关系将会还原</p></view>
						<view class="Panel-row"><span>·</span><p>解除锁定保护帐号可以正常登录</p></view>

					</view>
				</view>
				<view class="btn-tuichu">
				<u-button type="error"  >解除锁定保护</u-button>
				</view>
			</view>
		</u-popup>
		
   </view>
</template>

<script>

export default {
  name: 'security',
  data () {
    return {status:0}
  },
	props:{
		title:{
			type:String,
			required:true,
			default: '导航栏'
		}
	},
  methods: {

	}
}
</script>
<style lang="scss" scoped>
	.security-lock{
		background-color: #fff;
	}
	.dev-info{
		.cell{
			margin-top: 70px;
		}
		.Panel-con{
			display: flex;
			    flex-direction: column;
			    align-items: center;
			.Panel-title{
				margin-top: 20px;
			}
			.iconfont{
				font-size: 110px;
			}
		}
		.Panel-list{
			padding: 0px 15px;
			font-size: 14px;
			color: #626262;
		}
		.Panel-row{
			padding: 10px 0px;
			display: flex;
			span{
				color: #7f8083;
				font-size: 30px;
				line-height: 18px;
				margin-right: 5px;
			}
		}
		.btn-tuichu{
			padding: 0px 15px;
			margin-top: 30px;
		}
	}
</style>
