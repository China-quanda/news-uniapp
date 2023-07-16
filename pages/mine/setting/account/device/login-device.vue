<template>
  <view class='login-device'>
	
		<view class="tisi">
			<view class="zaixian">在线设备（10）</view>
			<view class="miaosu">
				以下是近期登录的设备，若非本人操作，请及时移除。移除后账号将从这个设备登出，再次登录时需要进行身份验证。
			</view>
		</view>
		
		<view class="item" @tap="router.push('device-info')">
			<view class="title">
				<my-text prefixIcon="icon-shouji" size="18">iPhone X</my-text>
			</view>
			<view class="con">
				<my-text color="#ccc">登录应用：今日头条</my-text>
				<my-text color="#ccc">最近活跃：2021-02-06 15:53</my-text>
				<my-icon class="icon-view" icon="icon-xiangyoujiantou"></my-icon>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
	import router from '@/utils/router';
</script>
<style lang="scss" scoped>
	.login-device{
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
		}
		.con{
			position: relative;
			.icon-view{
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
</style>
