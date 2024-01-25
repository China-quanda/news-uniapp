/**
 * @description 页面通讯 bus
 * @method emit()
 * @method on()
 * @method once()
 * @method off()
 */
export default {
	/**
	 * 触发全局的自定义事件，附加参数都会传给监听器回调函数。
	 * @param {string} eventName 事件名 必填
	 * @param {Objct} payload 触发事件携带的附加参数
	 * @example emit('update',{msg:'页面更新'}) | emit('update')
	 */
	emit:(eventName:string,payload?:any)=>{
		uni.$emit(eventName,payload)
	},
	/**
	 * 监听全局的自定义事件，事件由 emit 触发，回调函数会接收事件触发函数的传入参数。
	 * @param {string} eventName 事件名 必填
	 * @param {function} callback 事件的回调函数 必填
	 * @example on('update',(data)=>{
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	})
	 */
	on:(eventName:string,callback?: (result: any) => void)=>{
		uni.$on(eventName,callback)
	},
	/**
	 * 监听全局的自定义事件，事件由 emit 触发，但仅触发一次，在第一次触发之后移除该监听器。
	 * @param {string} eventName 事件名 必填
	 * @param {function} callback 事件的回调函数 必填
	 * @example once('update',(data)=>{
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	})
	 */
	once:(eventName:string,callback?: (result: any) => void)=>{
		uni.$once(eventName,callback)
	},
	/**
	 * 移除全局自定义事件监听器。
	 * @param {string} eventName 事件名 必填
	 * @param {function} callback 事件的回调函数 必填
	 * @example off('update',()=>{console.log('结束监听')})
	 */
	off:(eventName?: string | string[],callback?: (result: any) => void)=>{
		uni.$off(eventName,callback)
	}
}