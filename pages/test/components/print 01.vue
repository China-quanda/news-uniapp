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

<script>
import tsc from '@/utils/bluetooth/tsc.js';
import encode from '@/utils/bluetooth/encoding.js';
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			looptime: 0,
			currentTime: 1,
			lastData: 0,
			oneTimeData: 0,
			// imageSrc: '../../static/img/abc_ic_star_black_16dp.png',
			buffSize: [],
			printNum: [],
			printerNum: 1,
			currentPrint: 1,
			isReceiptSend: false,
			isLabelSend: false
		};
	},
	computed: mapState(['sysinfo','Bluetooth']),
	created() {
		this.onBLEConnectionState();
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
		this.buffSize = list;
		this.oneTimeData = list[0];
		this.printNum = numList;
		this.printerNum = numList[0];
	},
	methods: {
		...mapActions(['onBLEConnectionState']),
		print() {
			// #ifndef H5
			if(!this.Bluetooth.connection) return this.$modal.msg('请先连接打印机')
			let command = tsc.jpPrinter.createNew();
			command.setSize(72, 170);
			command.setGap(0);
			command.setCls();

			let l = 0;
			let r = 290;
			
			// 打印内容 水费收费小票 ------
			command.setText(130, 0, 'TSS24.BF2', 2, 2, '水费收费小票');
			
			command.setText(l, 90, 'TSS24.BF2', 1, 1, '用水户名称:农业银行(010001)');
			
			command.setText(l, 130, 'TSS24.BF2', 1, 1, '地址:金石桥镇政府(金南路东)');
			
			command.setText(l, 170, 'TSS24.BF2', 1, 1, '收据号码: 1061');
			command.setText(r, 170, 'TSS24.BF2', 1, 1, '收费日期: 2023-06-22');
			
			command.setText(l, 210, 'TSS24.BF2', 1, 1, '费用月份:2023-04至2023-06');
			
			command.setText(l, 250, 'TSS24.BF2', 1, 1, '上次读数:18892');
			command.setText(r, 250, 'TSS24.BF2', 1, 1, '本次读数:19197');
			
			command.setText(l, 290, 'TSS24.BF2', 1, 1, '用量:305.00');
			command.setText(r, 290, 'TSS24.BF2', 1, 1, '单价:2.60');
			
			command.setText(l, 330, 'TSS24.BF2', 1, 1, '金额:795.00');
			command.setText(r, 330, 'TSS24.BF2', 1, 1, '违约金:0.00');
			
			command.setText(l, 370, 'TSS24.BF2', 1, 1, '上次余额:0.20');
			command.setText(r, 370, 'TSS24.BF2', 1, 1, '应缴金额:792.80');
			
			command.setText(l, 410, 'TSS24.BF2', 1, 1, '实收余额:793.00');
			command.setText(r, 410, 'TSS24.BF2', 1, 1, '本次余额:0.20');
			
			command.setText(l, 450, 'TSS24.BF2', 1, 1, '大写金额:柒佰玖抬参元整');
			
			command.setText(l, 490, 'TSS24.BF2', 1, 1, '收费员:超级管理员');
			
			
			
			// 打印内容 水费收费存根 ------
			command.setText(130, 740, 'TSS24.BF2', 2, 2, '水费收费存根');
			
			command.setText(l, 830, 'TSS24.BF2', 1, 1, '用水户名称:农业银行(010001)');
			
			command.setText(l, 870, 'TSS24.BF2', 1, 1, '地址:金石桥镇政府(金南路东)');
			
			command.setText(l, 910, 'TSS24.BF2', 1, 1, '收据号码: 1061');
			command.setText(r, 910, 'TSS24.BF2', 1, 1, '收费日期: 2023-06-22');
			
			command.setText(l, 950, 'TSS24.BF2', 1, 1, '费用月份:2023-04至2023-06');
			
			command.setText(l, 990, 'TSS24.BF2', 1, 1, '上次读数:18892');
			command.setText(r, 990, 'TSS24.BF2', 1, 1, '本次读数:19197');
			
			command.setText(l, 1030, 'TSS24.BF2', 1, 1, '用量:305.00');
			command.setText(r, 1030, 'TSS24.BF2', 1, 1, '单价:2.60');
			
			command.setText(l, 1070, 'TSS24.BF2', 1, 1, '金额:795.00');
			command.setText(r, 1070, 'TSS24.BF2', 1, 1, '违约金:0.00');
			
			command.setText(l, 1110, 'TSS24.BF2', 1, 1, '上次余额:0.20');
			command.setText(r, 1110, 'TSS24.BF2', 1, 1, '应缴金额:792.80');
			
			command.setText(l, 1150, 'TSS24.BF2', 1, 1, '实收余额:793.00');
			command.setText(r, 1150, 'TSS24.BF2', 1, 1, '本次余额:0.20');
			
			command.setText(l, 1190, 'TSS24.BF2', 1, 1, '大写金额:柒佰玖抬参元整');
			
			command.setText(l, 1230, 'TSS24.BF2', 1, 1, '收费员:超级管理员');
			

			// command.setText(0, 440, 'TSS24.BF2', 1, 1, '***********************************************************');
			
					
			command.setPagePrint();
			this.isLabelSend = true;
			this.prepareSend(command.getData());
			// #endif
		},
		toConnectionBluetooth(){
			if(this.Bluetooth.connection) return this.$modal.msg('已连接打印机')
			this.$tab.navigateTo('/pages/bluetoothConnect')
		},
		prepareSend(buff) {
			console.log(buff);
			let that = this;
			let time = that.oneTimeData;
			let looptime = parseInt(buff.length / time);
			let lastData = parseInt(buff.length % time);
			console.log(looptime + '---' + lastData);
			this.looptime = looptime + 1;
			this.lastData = lastData;
			this.currentTime = 1;
			that.send(buff);
		},
		//分包发送
		send(buff) {
			let that = this;
			let { currentTime, looptime: loopTime, lastData, oneTimeData: onTimeData, printerNum: printNum, currentPrint } = that;
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
			console.log('第' + currentTime + '次发送数据大小为：' + buf.byteLength);
			let { BLEInformation } = that.Bluetooth;

			uni.writeBLECharacteristicValue({
				deviceId: BLEInformation.deviceId,
				serviceId: BLEInformation.writeServiceId,
				characteristicId: BLEInformation.writeCharaterId,
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
						that.currentTime = currentTime;
						that.send(buff);
					} else {
						uni.showToast({
							title: '已打印第' + currentPrint + '张'
						});
						if (currentPrint == printNum) {
							that.looptime = 0;
							that.lastData = 0;
							that.currentTime = 1;
							that.isReceiptSend = false;
							that.isLabelSend = false;
							that.currentPrint = 1;
						} else {
							currentPrint++;
							that.currentPrint = currentPrint;
							that.currentTime = 1;
							that.send(buff);
						}
					}
				}
			});
		}
	}
};
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
