import request from '@/utils/request'

// 对文章点赞
export const addArticleLike = (articleId) => {
	return request({
		url: '/article/like/addArticleLike',
		method: 'post',
		data: {
			articleId
		}
	})
}
// 获取用户点赞的文章列表
export const getUserLikeList = (query) => {
	return request({
		url:'/article/like/getUserLikeList',
		method: 'GET',
		params:query
	})
}
// 根据文章id判断用户是否已点赞
export const isLike = (articleId) => {
	return request({
		url: '/article/like/isLike',
		method: 'post',
		data: {
			articleId
		}
	})
}
// 对文章取消点赞
export const destroyArticleLike = (articleId) => {
	return request({
		url: '/article/like/destroyArticleLike',
		method: 'post',
		data: {
			articleId
		}
	})
}