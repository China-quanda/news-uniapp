import request from '@/utils/request'

// 关注用户
export const addFocus = (follerdId) => {
	return request({
		url: '/fans/addFocus',
		method: 'post',
		data: {
			follerdId
		}
	})
}

// 根据id判断是否已关注
export const isFocus = (follerdId) => {
	return request({
		url: '/fans/isFocus',
		method: 'post',
		data: {
			follerdId
		}
	})
}
// 取消关注用户
export const destroyFocus = (follerdId) => {
	return request({
		url: '/fans/destroyFocus',
		method: 'post',
		data: {
			follerdId
		}
	})
}