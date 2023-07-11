<template>
  <view class='security'>
		<u-navbar placeholder :title="title" :autoBack="true" border/>
	
		<u-cell title="账号锁定" isLink  @tap="status = 1"/>
		<u-cell title="解除锁定" isLink  @tap="status = 2"/>
		
		<u-popup v-if="status == 1" :show="true" mode="right"  >
			<view class="dev-info">
				<u-navbar  placeholder title="账号锁定"  border @leftClick="status = 0"/>
				<view class="cell">
					<view class="Panel-con">
						<i class="iconfont icon-jiesuo"></i>
						<view class="Panel-title">开启锁定保护</view>
					</view>
					<view class="Panel-list">
						<view class="Panel-row"><span>·</span><p>遇到帐号被盗等紧急情况，可以通过锁定保护来防止坏人窃取隐私，盗取资金、发送垃圾短信等</p></view>
						<view class="Panel-row"><span>·</span><p>帐号锁定成功后，已经登录的所有设备会被强制退出登录，锁定期间所有登录方式都不允许登录</p></view>
						<view class="Panel-row"><span>·</span><p>只有锁定保护解除后才能正常登录帐号</p></view>
					</view>
				</view>
				<view class="btn-tuichu">
				<u-button type="error"  >开启锁定保护</u-button>
				</view>
			</view>
		</u-popup>
		
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
	.security{
		width: 100vw;
		background-color: #fff;
	}
	.dev-info{
		width: 100vw;
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
