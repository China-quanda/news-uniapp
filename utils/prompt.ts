/**
 * @description 提示 prompt
 * @method msg() 显示消息提示框。
 * @method errorMsg() 显示错误消息提示框。
 * @method successMsg() 显示成功消息提示框。
 * @method hideMsg() 隐藏提示框。
 * @method loading() 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
 * @method hideLoading() 隐藏 loading 提示框。
 * @method alert() 显示模态弹窗，只有一个确定按钮
 * @method confirm() 确认窗体 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。
 */
export default {
	/**
	 * @description 显示消息提示框。
	 * @param {string ｜ object} option ShowToastOptions or string
	 * @example msg('您有新短消息') ｜ msg({
				title: '您有新短消息',
				icon: "none",
				duration: 2000
			})
	 */
	msg: (option: string | ShowToastOptions): void => {
		if (typeof option === "object") {
			uni.showToast(option)
		} else {
			uni.showToast({
				title: option,
				icon: "none",
				duration: 2000
			})
		}
	},
	/**
	 * @description 显示错误消息提示框。
	 * @param {string} content content
	 * @example errorMsg('请求失败') 
	 */
	errorMsg: (content: string): void => {
		uni.showToast({
			title: content,
			icon: 'error'
		})
	},
	/**
	 * @description 显示成功消息提示框。
	 * @param {string} content content
	 * @example msgSuccess('操作成功') 
	 */
	successMsg: (content: string): void => {
		uni.showToast({
			title: content,
			icon: 'success'
		})
	},
	/**
	 * @description 隐藏提示框。
	 * @example hideMsg() 
	 */
	hideMsg: (): void => {
		uni.hideToast()
	},
	/**
	 * @description 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
	 * @example loading('加载中') ｜ loading()
	 */
	loading: (content?: string): void => {
		if (typeof content === "string") {
			uni.showLoading({
				title: content,
				mask: true
			});
		} else {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
		}
	},
	/**
	 * @description 隐藏 loading 提示框。
	 * @example hideLoading() 
	 */
	hideLoading: (): void => {
		uni.hideLoading();
	},
	/**
	 * @description 显示模态弹窗，只有一个确定按钮
	 * @example alert('撤销成功') ｜ alert({
		 title:'系统提示',
		 content:'撤销成功'
	 }) 
	 */
	alert: (option: ShowModalOptions | string): void => {
		if (typeof option === "object") {
			uni.showModal({
				title: option.title || '提示',
				content: option.content,
				confirmText: option.confirmText || '确定',
				showCancel: false
			})
		} else {
			uni.showModal({
				title: '提示',
				content: option,
				showCancel: false
			})
		}
	},
	/**
	 * @description 确认窗体 显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。
	 * @example confirm('确定要签到吗?').then(=>{
		console.log('点击了确认');
		}).catch(() => {
			 console.log('点击了取消');
		})
		｜
		confirm({
		 title:'系统提示',
		 content:'确认要撤销吗?',
		 confirmText:'确定',
		 cancelText:'取消'
	 }).then(=>{
		console.log('点击了确认');
		}).catch(() => {
			 console.log('点击了取消');
		})
	 */
	confirm: (option: ShowModalOptions | string): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			if (typeof option === "object") {
				uni.showModal({
					title: option.title || '',
					content: option.content,
					confirmText: option.confirmText || '确定',
					cancelText: option.cancelText || '取消',
					success(res: ShowModalRes) {
						if (res.confirm) {
							resolve(res.confirm)
						} else if (res.cancel) {
							reject(res.cancel)
						}
					}
				})
			} else {
				uni.showModal({
					title: '系统提示',
					content: option,
					cancelText: '取消',
					confirmText: '确定',
					success: function (res) {
						if (res.confirm) {
							resolve(res.confirm)
						} else if (res.cancel) {
							reject(res.cancel)
						}
					}
				})
			}
		})
	}
};
