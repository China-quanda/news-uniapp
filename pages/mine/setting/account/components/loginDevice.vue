<template>
  <view class='loginDevice'>
		<u-navbar placeholder :title="title" :autoBack="true" border/> 
	
		<view class="tisi">
			<view class="zaixian">在线设备（10）</view>
			<view class="miaosu">
				以下是近期登录的设备，若非本人操作，请及时移除。移除后账号将从这个设备登出，再次登录时需要进行身份验证。
			</view>
		</view>
		
		<view class="item" @tap="showDevInfo = true">
			<view class="title">
				<i class="iconfont icon-shouji"></i>
				<span>iPhone X</span>
			</view>
			<view class="con">
				<p>登录应用：今日头条</p>
				<p>最近活跃：2021-02-06 15:53</p>
				<view class="icon-view">
					<i class="iconfont icon-xiangyoujiantou"></i>
				</view>
			</view>
		</view>
		
		<u-popup :show="showDevInfo" mode="right" @close="showDevInfo = false" @open="showDevInfo = true" >
			<view class="dev-info">
				<u-navbar title="设备详情"  border @leftClick="showDevInfo = false"/> 
				<view class="cell">
					 <u-cell title="登录设备" value="iPhone X" />
					 <u-cell title="最近活跃时间" value="2021-02-06 15:53" />
					 <u-cell title="登录地点" value="湖南省 郴州市" />
					 <u-cell title="登录方式" value="手机APP" />
					 <u-cell title="登录应用" value="今日头条" />
				</view>
				<view class="btn-tuichu">
				<u-button type="error"  >退出登录</u-button>
				</view>
			</view>
		</u-popup>
		
   </view>
</template>

<script>

export default {
  name: 'loginDevice',
  data () {
    return {showDevInfo:false}
  },
	props:{
		title:{
			type:String,
			required:true,
			default: '导航栏'
		}
	},
  methods: {
		toDevInfo(){
			
		}
	}
}
</script>
<style lang="scss" scoped>
	.loginDevice{
		width: 100vw;
		background-color: #F8F8F8;
	}
	.tisi{
		padding: 15px;
		.zaixian{
			font-size: 18px;
			margin-bottom: 10px;
			
		}
		.miaosu{
			color: #554d4d;
			font-size: 14px;
		}
	}
	.item{
		padding: 15px ;
		background-color: #fff;
		border-bottom: 0.5px solid #ccc;
		.title{
			margin-bottom: 10px;
			span{font-size: 18px;}
		}
		.con{
			position: relative;
			color: #ccc;
			font-size: 14px;
			p{padding: 2px 0px;}
			.icon-view{
				position: absolute;
				width: 20px;
				height: 20px;
				// background-color: #3c9cff;
				top: 0;
				right: 0;
			}
		}
	}
	
	.dev-info{
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
		.cell{
			margin-top: 10px;
			background-color: #fff;
		}
		.btn-tuichu{
			padding: 0px 15px;
			margin-top: 40px;
		}
	}
</style>
