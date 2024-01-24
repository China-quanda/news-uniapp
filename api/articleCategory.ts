import request from '@/utils/request'

// 获取文章分类列表
export const getArticleCtegoryList = (query) => {
	return request({
		url:'/article/ctegory',
		method: 'GET',
		params:query
	})
}
