<template>
	<view>
		<!-- <button @tap="scanCode">扫码</button> -->
		<!-- <button @tap="requestApi">请求</button> -->
		<!-- <button @tap="requestFn">请求request接口测试</button> -->
		
		<my-switch
		v-model:value="value1"
		disabled
		></my-switch>
		
		<my-switch
		v-model:value="value1" 
		disabled
		active-color="red"
		inactive-color="green"
		></my-switch>
		
		<my-switch
		v-model:value="value1"
		loading
		></my-switch>
		
		<my-switch
		v-model:value="value1"
		activeValue="开"
		inactiveValue="关"
		
		>
		<block v-slot:value> {{value1? '1' : '2'}} </block>
		
		</my-switch>
		

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

</style>
