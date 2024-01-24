import request from '@/utils/request'

// 收藏文章
export const addArticleCollect = (articleId) => {
	return request({
		url: '/article/collect/addArticleCollect',
		method: 'post',
		data: {
			articleId
		}
	})
}
// 根据文章id判断用户是否已收藏
export const isCollect = (articleId) => {
	return request({
		url: '/article/collect/isCollect',
		method: 'post',
		data: {
			articleId
		}
	})
}
// 获取用户收藏文章列表
export const getUserCollectList = (query) => {
	return request({
		url:'/article/collect/getUserCollectList',
		method: 'GET',
		params:query
	})
}
// 对文章取消收藏
export const destroyArticleCollect = (articleId) => {
	return request({
		url: '/article/collect/destroyArticleCollect',
		method: 'post',
		data: {
			articleId
		}
	})
}