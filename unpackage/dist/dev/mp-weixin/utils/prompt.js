"use strict";
const common_vendor = require("../common/vendor.js");
const prompt = {
  /**
   * @description 显示消息提示框。
   * @param {string ｜ object} option ShowToastOptions or string
   * @example msg('您有新短消息') ｜ msg({
  			title: '您有新短消息',
  			icon: "none",
  			duration: 2000
  		})
   */
  msg: (option) => {
    if (typeof option === "object") {
      common_vendor.index.showToast(option);
    } else {
      common_vendor.index.showToast({
        title: option,
        icon: "none",
        duration: 2e3
      });
    }
  },
  /**
   * @description 显示错误消息提示框。
   * @param {string} content content
   * @example errorMsg('请求失败') 
   */
  errorMsg: (content) => {
    common_vendor.index.showToast({
      title: content,
      icon: "error"
    });
  },
  /**
   * @description 显示成功消息提示框。
   * @param {string} content content
   * @example msgSuccess('操作成功') 
   */
  successMsg: (content) => {
    common_vendor.index.showToast({
      title: content,
      icon: "success"
    });
  },
  /**
   * @description 隐藏提示框。
   * @example hideMsg() 
   */
  hideMsg: () => {
    common_vendor.index.hideToast();
  },
  /**
   * @description 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框。
   * @example loading('加载中') ｜ loading()
   */
  loading: (content) => {
    if (typeof content === "string") {
      common_vendor.index.showLoading({
        title: content,
        mask: true
      });
    } else {
      common_vendor.index.showLoading({
        title: "加载中",
        mask: true
      });
    }
  },
  /**
   * @description 隐藏 loading 提示框。
   * @example hideLoading() 
   */
  hideLoading: () => {
    common_vendor.index.hideLoading();
  },
  /**
   * @description 显示模态弹窗，只有一个确定按钮
   * @example alert('撤销成功') ｜ alert({
  	 title:'系统提示',
  	 content:'撤销成功'
   }) 
   */
  alert: (option) => {
    if (typeof option === "object") {
      common_vendor.index.showModal({
        title: option.title || "提示",
        content: option.content,
        confirmText: option.confirmText || "确定",
        showCancel: false
      });
    } else {
      common_vendor.index.showModal({
        title: "提示",
        content: option,
        showCancel: false
      });
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
  confirm: (option) => {
    return new Promise((resolve, reject) => {
      if (typeof option === "object") {
        common_vendor.index.showModal({
          title: option.title || "",
          content: option.content,
          confirmText: option.confirmText || "确定",
          cancelText: option.cancelText || "取消",
          success(res) {
            if (res.confirm) {
              resolve(res.confirm);
            } else if (res.cancel) {
              reject(res.cancel);
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          title: "系统提示",
          content: option,
          cancelText: "取消",
          confirmText: "确定",
          success: function(res) {
            if (res.confirm) {
              resolve(res.confirm);
            } else if (res.cancel) {
              reject(res.cancel);
            }
          }
        });
      }
    });
  }
};
exports.prompt = prompt;
