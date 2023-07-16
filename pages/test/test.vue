<template>
	<view>
		<!-- <button @tap="scanCode">扫码</button> -->
		<!-- <button @tap="requestApi">请求</button> -->
		<!-- <button @tap="requestFn">请求request接口测试</button> -->
		
	<!-- 	<my-switch v-model:value="value1" disabled ></my-switch>
		
		<my-switch v-model:value="value1"  disabled active-color="red" inactive-color="green" ></my-switch>
		
		<my-switch v-model:value="value1" loading ></my-switch>
		
		<my-switch v-model:value="value1" activeValue="开" inactiveValue="关" >
			<block v-slot:value> {{value1? '1' : '2'}} </block>
		</my-switch> -->
		
		<!-- <my-progress :progress="20" shape="square" id="a"/>
		<my-progress :progress="50" shape="square" id="aa"/>
		<my-progress :progress="60" :centreStyle="{fontSize: '20px'}"  id="b"/> -->


<!-- <view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button type="primary">主要按钮</my-button>
	<my-button type="success">成功按钮</my-button>
	<my-button type="default">默认按钮</my-button>
	<my-button type="info">默认按钮</my-button>
	<my-button type="warning">警告按钮</my-button>
	<my-button type="danger">危险按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button plain type="primary" >朴素按钮</my-button>
	<my-button plain type="success">朴素按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button plain hairline type="primary" >细边框按钮</my-button>
	<my-button plain hairline type="success">细边框按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button disabled type="primary">禁用状态</my-button>
	<my-button disabled type="success">禁用状态</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button loading type="primary" />
	<my-button loading type="success" loading-text="加载中..." />
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button type="primary">方形按钮</my-button>
	<my-button shape="circle" type="success">圆形按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button icon="icon-cha" type="primary" />
	<my-button icon="icon-cha" type="primary" text="哈哈"/>
	<my-button icon="icon-cha" type="primary">按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button type="primary" size="large">大号按钮</my-button>
	<my-button type="primary" size="normal">普通按钮</my-button>
	<my-button type="primary" size="small">小型按钮</my-button>
	<my-button type="primary" size="mini">迷你按钮</my-button>
	<my-button shape="circle" type="primary" size="mini">迷你按钮</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button type="primary" url="https://github.com">URL 跳转</my-button>
	<my-button type="primary" url="/pages/index/index">路由跳转</my-button>
	
	<my-button type="primary" linkType="tab" url="/pages/index/index">路由跳转</my-button>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-button color="#7232dd">单色按钮</my-button>
	<my-button color="#7232dd" plain>单色按钮2</my-button>
	<my-button color="#7232dd" shape="circle">单色按钮</my-button>
	<my-button @tap="buttono" color="linear-gradient(to right, #ff6034, #ee0a24)">
	  渐变色按钮
	</my-button>
</view> -->



<!-- <view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text>基础功能</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text type="primary">主要</my-text>
		<my-text type="success">成功</my-text>
		<my-text type="default">默认</my-text>
		<my-text type="info">默认</my-text>
		<my-text type="warning">警告</my-text>
		<my-text type="danger">危险</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text color="red">自定义颜色</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text size="20">自定义大小</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text bold>自定义粗体</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text prefixIcon="icon-cha" >前置图标</my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text suffixIcon="icon-cha" >后置图标</my-text>
</view>

<view class="" style="margin: 10px; display: flex; flex: 1;flex-wrap: wrap;">
	<my-text lines="1" >自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体自定义粗体</my-text>
	<my-text  mode="price" text="123456"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text  mode="phone" text="18684868151"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text desensitization mode="phone" text="18684868151"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text desensitization mode="emall" text="877880098@qq.com"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text desensitization mode="idCard" text="431024199906234536"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text desensitization mode="bankCard" text="6212268202014638666"></my-text>
	<view class="" style="margin: 12px;"></view> 
	<my-text desensitization mode="name" text="李泉达"></my-text>
</view> -->


<!-- <my-panel title="标题" label="猜猜猜" value="状态" icon="icon-dianzan_kuai" radius="8">
	内容
</my-panel> -->

<my-share></my-share>
		
		
	</view>
</template>

<script setup lang="ts">
	import {onMounted,ref ,onBeforeUnmount} from 'vue';
	import { onLoad, onHide } from "@dcloudio/uni-app";
	// import { io, Socket } from 'socket.io-client'
	import io from '@hyoga/uni-socket.io';
	import router from '@/utils/router';
	import storage, { clearStorage } from '@/utils/storage';
	import {qrScannedLogin} from '@/api/user'
	
	const buttono =(e)=>{
		console.log(e);
	}
	let value1 = ref(true)
	const changeSwitch = (e)=>{
		value1.value = e
	}
	
	const scanCode =()=>{
		// 只允许通过相机扫码
		uni.scanCode({
			onlyFromCamera: true,
			success: (res)=> {
				let result = JSON.parse(res.result)
				if(result.type == 'login'){
					qrScannedLogin({qrcodeId:result.qrcodeId}).then(res=>{
						console.log(res);
						storage.set('qrCode',{...result,...res})
						router.push({url:'/pages/login/confirmLogin'})
					}).catch((err) => {
					  console.log(err);
					})
				}
			}
		});
	}
	const requestApi = ()=>{
		const url1 = 'http://192.168.2.7:7001'
		const url2 = 'http://127.0.0.1:7001'
		const url3 = 'http://192.168.43.191:7001'
		uni.request({
			url: url1,
			success: (res)=> { 
				console.log('连接api接口成功',res.data);
			},
			fail: (e)=> {
				console.log('连接api接口失败');
			}
		});
	}
	const requestFn =()=>{
		qrScannedLogin({qrcodeId:42}).finally(res=>{
			console.log('res',res);
		}).then(rr=>{
			console.log(rr);
		})
	}
	
	/*
	const webSocket =()=>{
		// 192.168.2.2:7001/hello
		const socket = io('ws://127.0.0.1:7001/hello', {
		  transports: [ 'websocket' ],
		  timeout: 5000, 
		}); 
		
		socket.on('connect', () => {
		  // ws连接已建立，此时可以进行socket.io的事件监听或者数据发送操作
		  // 连接建立后，本插件的功能已完成，接下来的操作参考socket.io官方客户端文档即可
		  console.log('ws 已连接');
			
			socket.emit('words', {  time: +new Date()});
			
			socket.on('words', (msg: any) => {
			  console.log('ws words', msg);
			});
			
		  // socket.io 唯一连接id，可以监控这个id实现点对点通讯
		  const { id } = socket;
		  socket.on(id, (message) => {
		    // 收到服务器推送的消息，可以跟进自身业务进行操作
		    console.log('ws 收到服务器消息：', message);
		  });
		  // 主动向服务器发送数据
		  socket.emit('send_data', {
		    time: +new Date(),
		  });
		});
		// socket.emit('words', {  time: 'lisi'});
		// socket.on('ws', (msg: any) => {
		//   console.log('ws words', msg);
		// });
		socket.on('error', (msg: any) => {
		  console.log('ws error', msg);
		});
	}
	*/
	
	// onLoad((option) => { 
	// 	// requestApi()
	// 	// webSocket()
		
	// 	const ws1 = 'ws://192.168.2.2:7001/hello'
	// 	const ws2 = 'ws://127.0.0.1:7001/hello'
	// 	const ws3 = 'ws://192.168.43.191/hello'
	// 	const socket = io(ws2, {
	// 		transports: ['websocket'],
	// 		timeout: 5000, 
	// 	}); 
	// 	socket.on('connect', () => {
	// 		console.log('ws 已连接');
	// 	});
	// 	socket.emit('words', {  time: 'lisi'});
	// 	socket.on('words', (msg: any) => {
	// 	  console.log('words words', msg);
	// 	});
	// 	socket.on('error', (msg: any) => {
	// 		console.log('ws error', msg);
	// 	});

	// });
	onHide(()=>{ })	
</script>

<style lang="scss">
page{
	background-color: #f8f8f8;
}
</style>
