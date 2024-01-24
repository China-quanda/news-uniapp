import request from '@/utils/request'

// 获取用户收藏文章列表
export const getUserViewHistoryList = (query) => {
	return request({
		url:'/article/view/getUserViewHistoryList',
		method: 'GET',
		params:query
	})
}
