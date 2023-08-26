<template>
	<view class="container-print">
		
		<!-- 连接蓝牙按钮 -->
		<!-- <view class="connection" 
		:style="`background: linear-gradient(2deg,${Bluetooth.connection ? ' #1cb75c, #58f884' : '#f32f32, #f58356'});`" 
		@tap="toConnectionBluetooth">
			<text class="state">{{Bluetooth.connection ? '已' : '未'}}连接</text>
		</view> -->

		<!-- 底部按钮 -->
		<!-- <view style="height: 40px;"></view>
		<view class="footer-box">
			<button class="footer-btn" @tap="print" :loading="isLabelSend" :disabled="isLabelSend">{{ isLabelSend ? '打印中' : '打印' }}</button>
		</view> -->
	</view>
</template>

<script setup lang="ts">
import {onMounted,ref ,defineExpose} from 'vue';
const esc = require('@/utils/bluetooth/esc.js')
const encode = require('@/utils/bluetooth/encoding.js')
// import esc from '@/utils/bluetooth/esc.js';
// import encode from '@/utils/bluetooth/encoding.js';
import { useBluetoothStore } from '@/store/bluetooth'
const Bluetooth = useBluetoothStore()
const {onBLEConnectionState} = Bluetooth

let looptime = ref(0)
let currentTime = ref(1)
let lastData = ref(0)
let oneTimeData = ref(0)
let buffSize = ref([])
let printNum = ref([])
let printerNum = ref(1)
let currentPrint = ref(1)
let isReceiptSend = ref<boolean>(false)
let isLabelSend = ref<boolean>(false)

onMounted(()=>{
	onBLEConnectionState()
	let list = [];
	let numList = [];
	let j = 0;
	for (let i = 20; i < 200; i += 10) {
		list[j] = i;
		j++;
	}
	for (let i = 1; i < 10; i++) {
		numList[i - 1] = i;
	}
	buffSize.value = list;
	oneTimeData.value = list[0];
	printNum.value = numList;
	printerNum.value = numList[0];
})


const print =()=>{
	console.log(1);
			let command = esc.jpPrinter.createNew()
			command.init()
			// 标题
			command.bold(5);//加粗
			command.setFontSize(16);//字体大小
			command.setSelectJustification(1)//居中
			command.rowSpace(150);
			command.setText("水费收费小票");
			command.setPrint();
			
			command.rowSpace(80);
			command.bold(0);//取消加粗
			command.setFontSize(0);//正常字体
			command.setSelectJustification(0);//居左
			command.setText("用水户名称:李泉达");
			command.setPrint();
			command.setSelectJustification(0);//居左
			command.setText("地址:湖南省长沙市");
			command.setPrint();
			command.setSelectJustification(0);//居左
			command.setText("收费日期:10月");
			command.setPrint();
			command.setSelectJustification(0);//居左
			command.setText("收费类别:居民用水");
			command.setPrint();
			command.setSelectJustification(0);//居左
			command.setText("年度用水:18");
			command.setPrintAndFeed(120);//打印并走纸feed个单位
			
			//列表
			command.rowSpace(80);//间距
			command.bold(5);//加粗
			command.setText("费用项");
			command.setAbsolutePrintPosition(130);
			command.setText("月份");
			command.setAbsolutePrintPosition(220);
			command.setText("抄表读数");
			command.setAbsolutePrintPosition(360);
			command.setText("用量");
			command.setAbsolutePrintPosition(420);
			command.setText("单价");
			command.setAbsolutePrintPosition(500);
			command.setText("金额");
			command.setPrint()
			command.bold(0);//加粗
			
			// 可循环
			let list = [
				{
					name:'污水费',
					month:'10月',
					reading:'65-69',
					dosage:'3.50',
					univalence:'0.80',
					amount:'2.80'
				},
				{
					name:'自来水水费',
					month:'10月',
					reading:'65-69',
					dosage:'3.50',
					univalence:'3.80',
					amount:'13.30'
				},
				{
					name:'普通水费',
					month:'10月',
					reading:'65-69',
					dosage:'3.50',
					univalence:'3.80',
					amount:'1333.30'
				},
			]
			list.forEach(item=>{
				command.setText(item.name);
				command.setAbsolutePrintPosition(130);
				command.setText(item.month);
				command.setAbsolutePrintPosition(220);
				command.setText(item.reading);
				command.setAbsolutePrintPosition(360);
				command.setText(item.dosage.toFixed(2));
				command.setAbsolutePrintPosition(420);
				command.setText(item.univalence.toFixed(2));
				command.setAbsolutePrintPosition(500);
				command.setText(item.amount.toFixed(2));
				command.setPrint()
			})
			// 30.toFixed(2)
			command.setPrintAndFeed(80);//打印并走纸feed个单位
			command.bold(4);//加粗
			command.setAbsolutePrintPosition(0);
			command.setText("上次余额:10");
			command.setAbsolutePrintPosition(380);
			command.setText("应缴金额:20");
			command.setPrint();
			command.setAbsolutePrintPosition(0);
			command.setText("本次余额:30");
			command.setAbsolutePrintPosition(380);
			command.setText("实收金额:5");
			command.setPrint();
			
			command.rowSpace(100);
			command.setAbsolutePrintPosition(0);
			command.setText("大写金额:伍元整");
			command.setAbsolutePrintPosition(380);
			command.setText("小写合计:5");
			command.setPrint()
			
			command.rowSpace(80);//间距
			command.bold(0);//加粗
			command.setSelectJustification(1);//居中
			command.setText("收费员:李泉达");
			command.setPrint();
			
			command.setPrintAndFeedRow(3);
			
			this.prepareSend(command.getData());
		}


const toConnectionBluetooth=()=>{
			if(Bluetooth.connection) return uni.showToast({ title: '已连接打印机', icon: "none"  })
			uni.navigateTo({url:'/pages/bluetoothConnect'})
		}

const prepareSend=(buff)=> {
			//console.log(buff);
			let time = oneTimeData.value;
			let looptime = parseInt(buff.length / time);
			let lastData = parseInt(buff.length % time);
			//console.log(looptime + '---' + lastData);
			looptime.value = looptime + 1;
			lastData.value = lastData;
			currentTime.value = 1;
			send(buff);
		}
		
//分包发送
	const	send=(buff)=> {
		let currentTime = currentTime.value
		let loopTime = looptime.value
		let lastData = lastData.value
		let onTimeData = oneTimeData.value
		let printNum = printerNum.value
		let currentPrint = currentPrint.value
			let buf;
			let dataView;
			if (currentTime < loopTime) {
				buf = new ArrayBuffer(onTimeData);
				dataView = new DataView(buf);
				for (var i = 0; i < onTimeData; ++i) {
					dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i]);
				}
			} else {
				buf = new ArrayBuffer(lastData);
				dataView = new DataView(buf);
				for (var i = 0; i < lastData; ++i) {
					dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i]);
				}
			}
			//console.log('第' + currentTime + '次发送数据大小为：' + buf.byteLength);

			plus.bluetooth.writeBLECharacteristicValue({
				deviceId: bluetoothStore.BLEInformation.deviceId,
				serviceId: bluetoothStore.BLEInformation.writeServiceId,
				characteristicId: bluetoothStore.BLEInformation.writeCharaterId,
				value: buf,
				success(res) {
					console.log(res);
				},
				fail(e) {
					console.log(e);
				},
				complete() {
					currentTime++;
					if (currentTime <= loopTime) {
						currentTime.value = currentTime;
						send(buff);
					} else {
						uni.showToast({
							title: '已打印第' + currentPrint + '张'
						});
						if (currentPrint == printNum) {
							looptime.value = 0;
							lastData.value = 0;
							currentTime.value = 1;
							isReceiptSend.value = false;
							isLabelSend.value = false;
							currentPrint.value = 1;
						} else {
							currentPrint++;
							currentPrint.value = currentPrint;
							currentTime.value = 1;
							send(buff);
						}
					}
				}
			});
		}
		
		defineExpose({
			print
		})
</script>

<style scoped lang="scss">
.connection {
	position: fixed;
	text-align: center;
	line-height: 45px;
	right: 30px;
	bottom: 120px;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	color: #fff;
	box-shadow: 0 3px 8px 0px rgba(122, 192, 241, 0.3);
	&:active {
		opacity: 0.8;
	}
	& .state{
		display: block;
		transform: scale(0.7);
	}
}
</style>
