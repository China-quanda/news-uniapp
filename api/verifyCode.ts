import request from '@/utils/request'

// 获取验证码
export const getVerifyCode = data => {
	return request({
		url:'/api/m/verifyCode',
		method: 'POST',
		data
	})
}