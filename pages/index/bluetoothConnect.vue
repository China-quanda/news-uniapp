<template>
	<view class="content">
		<view class="btn-box">
			<button class="btn" size="mini" type="primary" :loading="isSearching" @tap="startSearch">{{isSearching ? '正在搜索蓝牙中...' : '搜索蓝牙'}} </button>
			<button class="btn" size="mini" type="warn" @tap="stopSearch">停止搜索</button>
		</view>
		
		
		<view v-for="device in list" :key="device.deviceId" @tap="connectionBluetooth(device)">
			<view class="item">
				<view class="name block">
					<my-icon icon="icon-lanya" size="19" color="#1ab3d3"/>
					<view class="name-text">
						{{device.name}}
					</view>
				</view>
				<view class="deviceId block">{{device.deviceId}}</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {onMounted,ref ,onBeforeUnmount} from 'vue';
	import { onLoad, onHide ,onUnload} from "@dcloudio/uni-app";
	import { useBluetoothStore } from '@/store/bluetooth'
	const bluetoothStore = useBluetoothStore()
	const {onBLEConnectionState,errorCodeTip,BLEInformationSet,SET_CONNECTION_STATE} = bluetoothStore
	
	let isSearching = ref<boolean>(false)
	let time = ref(null)
	let list = ref([])
	let services = ref([])
	let serviceId = ref(0)
	let writeCharacter = ref<boolean>(false)
	let readCharacter = ref<boolean>(false)
	let notifyCharacter = ref<boolean>(false)
	
	onLoad(()=>{
		onBLEConnectionState()
	})
	onUnload(()=>{
		if (isSearching.value) {
			stopSearch()
		}
	})
	onHide(()=>{
		if (isSearching.value) {
			stopSearch()
		}
	})
	
	//开始搜索蓝牙
	const startSearch = () =>{
		// if(bluetoothStore.connection) return
		// uni.closeBluetoothAdapter()
		uni.openBluetoothAdapter({
			success(res) {
				uni.getBluetoothAdapterState({
					success(res2) {
						if(!res2.available) return uni.showModal({ title: '提示', content: '本机蓝牙不可用', showCancel: false })
						isSearching.value = true;
						if (res2.discovering) return uni.showToast({ title: '正在搜索附近打印机设备', icon: "none"  })
						getBluetoothDevices()
					},
					fail(fail2) {
						errorCodeTip(fail2.errCode);
					}
				});
			},
			fail(fail1) {
				if(fail1.errCode == 10001){
					uni.showModal({ title: '提示', content: '蓝牙初始化失败，请打开蓝牙', showCancel: false })
				}else{
					errorCodeTip(fail1.errCode);
				}
			}
		})
	}
	// 停止搜索蓝牙设备
	const stopSearch =()=> {
		uni.stopBluetoothDevicesDiscovery({
			success: (res) => {
				isSearching.value = false;
			},
			fail: (e) => {
				errorCodeTip(e.errCode);
			}
		})
	}
	//未启用 校验权限 android 6.0以上需授权地理位置权限
	const checkPemission=()=> {
		let BLEInformation = bluetoothStore.BLEInformation
		let platform = BLEInformation.platform;
		getBluetoothDevices();
	}
	
	//获取蓝牙设备信息
	const getBluetoothDevices =()=> {
		list.value = [];
		uni.startBluetoothDevicesDiscovery({
			success(res) {
				uni.onBluetoothDeviceFound(() => {
					time.value = setTimeout(() => {
						uni.getBluetoothDevices({
							success(res2) {
								list.value = res2.devices.filter(item=> item.name && item.localName)
							},
							fail(fail2){
								errorCodeTip(fail2.errCode);
							}
						})
						clearTimeout(time.value);
					}, 3000);
				});
			},
			fail(e){
				errorCodeTip(e.errCode);
			}
		});
	}
	
	//连接蓝牙
	const connectionBluetooth = (device:string|number)=> {
		if(!device) return
		let BLEInformation = bluetoothStore.BLEInformation
		stopSearch();
		serviceId.value = 0;
		writeCharacter.value = false;
		readCharacter.value = false;
		notifyCharacter.value = false;
		uni.showLoading({ title: '正在连接'})
		uni.createBLEConnection({
			deviceId: device.deviceId,
			success(res) {
				uni.showToast({ icon: 'success', title: '连接成功' });
				BLEInformation.deviceId = device.deviceId;
				BLEInformation.name = device.name;
				let sysinfo = uni.getSystemInfoSync();
				BLEInformation.platform = sysinfo.platform || "";
				BLEInformationSet(BLEInformation)
				SET_CONNECTION_STATE(true)
				getBLEDeviceServices()
			},
			fail(e) {
				errorCodeTip(e.errCode);
			},
			complete(){
				uni.hideLoading()
			}
		})
	}
	
	//获取蓝牙设备所有服务(service)。
	const getBLEDeviceServices =()=> {
		let BLEInformation = bluetoothStore.BLEInformation
		let t = setTimeout(()=>{
			uni.getBLEDeviceServices({
				deviceId: BLEInformation.deviceId,
				success(res) {
					services.value = res.services;
					getCharacteristics()
				},
				fail(e) {
					errorCodeTip(e.code);	
				}
			})
			clearTimeout(t);
		},1500)
	}
	
	// 获取蓝牙设备某个服务中所有特征值
	const getCharacteristics =()=> {
		let list = services.value
		let num = serviceId.value
		let write = writeCharacter.value
		let read = readCharacter.value
		let notify = notifyCharacter.value
		let BLEInformation = bluetoothStore.BLEInformation
		uni.getBLEDeviceCharacteristics({
			deviceId: BLEInformation.deviceId,
			serviceId: list[num].uuid,
			success(res) {
				for (var i = 0; i < res.characteristics.length; ++i) {
					var properties = res.characteristics[i].properties
					var item = res.characteristics[i].uuid
					if (!notify) {
						if (properties.notify) {
							BLEInformation.notifyCharaterId = item;
							BLEInformation.notifyServiceId = list[num].uuid;
							BLEInformationSet(BLEInformation)
							notify = true
						}
					}
					if (!write) {
						if (properties.write) {
							BLEInformation.writeCharaterId = item;
							BLEInformation.writeServiceId = list[num].uuid;
							BLEInformationSet(BLEInformation)
							write = true
						}
					}
					if (!read) {
						if (properties.read) {
							BLEInformation.readCharaterId = item;
							BLEInformation.readServiceId = list[num].uuid;
							BLEInformationSet(BLEInformation)
							read = true
						}
					}
				}
				if (!write || !notify || !read) {
					num++
					writeCharacter.value = write;
					readCharacter.value = read;
					notifyCharacter.value = notify;
					serviceId.value = num;
					if (num == list.length) {
						uni.showModal({ title: '提示', content: '找不到该读写的特征值'})
					} else {
						getCharacteristics()
					}
				} else {
					uni.navigateBack()
				}
			},
			fail(e) {
				errorCodeTip(e.errCode);	
			}
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	
	.btn-box{
		display: flex;
		justify-content: space-between;
		margin: 15px 0px 25px 0px;
		.btn{
			width: 45%;
		}
	}

	.item {
		display: block;
		font-family: Arial, Helvetica, sans-serif;
		color: #524b4b;
		font-size: 14px;
		margin: 0 12px;
		padding: 10px;
		margin-top: 10px;
		background-color: #fff;
		border-radius: 12px;
		// border-bottom: 2px solid #1ec7ea;
		box-shadow: 0 1px 4px 0px rgba(122, 192, 241, 0.5);
	}
	.block {
		display: block;
		font-size: 15px;
	
	}
	.name{
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		.name-text{
			margin-left: 8px;
			overflow: hidden;
			text-overflow: ellipsis; 
			display: -webkit-box; 
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical; 
		}
	}
</style>
