import request from '@/utils/request'

// 获取验证码
export const getVerifyCode = data => {
	return request({
		url:'/verifyCode/createVerifyCode',
		method: 'POST',
		data
	})
}