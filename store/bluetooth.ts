import { defineStore } from 'pinia'
import storage from '@/utils/storage'
export const useBluetoothStore = defineStore('bluetooth', {
	// unistorage: true, // 是否持久化
	unistorage: { // true
			key: 'bluetooth', // 缓存的键，默认为该 store 的 id，这里是 bluetooth,
			paths: ['connection', 'BLEInformation.deviceId'], // 需要缓存的路径，这里设置 connection 和 BLEInformation 下的 data 会被缓存
			// 初始化恢复前触发
			// beforeRestore(ctx) {},
			// 初始化恢复后触发
			// afterRestore(ctx) {},
			serializer: {
				// 序列化，默认为 JSON.stringify
				serialize(v) {
					return JSON.stringify(v)
				},
				// 反序列化，默认为 JSON.parse
				deserialize(v) {
					return JSON.parse(v)
				}
			}
		},
    state: () => ({
			test:'1111',
			// BLEInformation: {
			// 	platform: sysinfo.platform || "",
			// 	deviceId: "",
			// 	name: "",
			// 	writeCharaterId: "",
			// 	writeServiceId: "",
			// 	notifyCharaterId: "",
			// 	notifyServiceId: "",
			// 	readCharaterId: "",
			// 	readServiceId: "",
			// },
      BLEInformation: storage.get('BLE') || {
					platform: "",
					deviceId: "",
					name: "",
					writeCharaterId: "",
					writeServiceId: "",
					notifyCharaterId: "",
					notifyServiceId: "",
					readCharaterId: "",
					readServiceId: ""
			},
      connection: storage.get('BLEconnection') || false,
    }),
    getters: {},
    actions: {
			// 设置蓝牙信息
			SET_BLE_INFO(info){
				this.BLEInformation = {...this.info,info}
				storage.set('BLE',{...this.info,info})
			},
			// 设置蓝牙连接状态
			SET_CONNECTION_STATE(state){
				this.connection = state
				storage.set('BLEconnection',state)
			},
			//错误码提示
			errorCodeTip(code) {
				let errMsg = {
					10000:'未初始化蓝牙适配器',
					10001:'当前蓝牙适配器不可用',
					10002:'没有找到指定设备',
					10003:'连接失败',
					10004:'没有找到指定服务',
					10005:'没有找到指定特征值',
					10006:'当前连接已断开',
					10007:'当前特征值不支持此操作',
					10008:'其余所有系统上报的异常',
					10009:'Android 系统特有，系统版本低于 4.3 不支持 蓝牙',
					10010:'已连接',
					10011:'配对设备需要配对码',
					10012:'连接超时',
					10013:'连接 deviceId 为空或者是格式不正确',
					10004:'没有找到指定服务',
					10004:'没有找到指定服务',
					10004:'没有找到指定服务',
					10004:'没有找到指定服务',
					10004:'没有找到指定服务',
				}
				let msg = errMsg[code] || '蓝牙未知异常'
				uni.showToast({ title: msg, icon: 'none' })
			},
			// 自动连接蓝牙
			connectionBLE(){
				if(!this.BLEInformation?.deviceId) return this.SET_CONNECTION_STATE(false)
				uni.openBluetoothAdapter({
					success() {
						uni.getBluetoothAdapterState({
							success(res2) {
								if(!res2.available) return uni.showModal({ title: '提示', content: '本机蓝牙不可用', showCancel: false })
								if(res2.discovering) uni.stopBluetoothDevicesDiscovery()
								// uni.showLoading({ title: '正在连接打印机'})
								uni.createBLEConnection({
									deviceId: this.BLEInformation.deviceId,
									success() {
										// uni.showToast({ icon: 'success', title: '连接成功' });
										this.SET_CONNECTION_STATE(true)
									},
									fail(fail3) {
										// uni.showToast({ icon: 'error', title: '连接失败' });
										 this.SET_CONNECTION_STATE(false)
									},
									complete(){
										uni.hideLoading()
									}
								})
							},
							fail(fail2) {
								this.errorCodeTip(fail2.errCode)
							}
						});
					},
					fail(fail1) {
						if(fail1.errCode == 10001){
							uni.showModal({ title: '提示', content: '蓝牙初始化失败，请打开蓝牙', showCancel: false })
						}else{
							this.errorCodeTip(fail1.errCode)
						}
					}
				})
			},
			// 监听蓝牙连接状态
			onBLEConnectionState(){
				if(!this.BLEInformation?.deviceId) return this.SET_CONNECTION_STATE(false)
				// 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
				uni.onBLEConnectionStateChange((res)=> {
					if(res.deviceId !== this.BLEInformation?.deviceId || !res.connected) return this.SET_CONNECTION_STATE(false)
				})
				// 获取处于已连接状态的设备。
				uni.getConnectedBluetoothDevices({
				  success(res) {
						if(!res.devices.length) return this.SET_CONNECTION_STATE(false)
						if(res.devices[0]?.deviceId !== this.BLEInformation?.deviceId) return this.SET_CONNECTION_STATE(false)
						this.SET_CONNECTION_STATE(true)
				  },
					fail(e) {
						this.SET_CONNECTION_STATE(false)
					}
				})
			}
    }
})
