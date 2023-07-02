import request from '@/utils/request'

// 已扫描二维码
// export const qrScannedLogin =(data)=> {
//   return request({
//     url: '/app/qrCode/scanned',
//     method: 'post',
//     data
//   })
// }


// / 获取文章列表  带用户搜索记录
export const getArticleList = () => {
	return request({
		url:'/api/m/article',
		method: 'GET'
	})
}
// 根据文章id获取文章信息
export const getArticleId = id => {
	return request({
		url:`/api/m/article/${id}`,
		method: 'GET',
		params:{
			id
		}
	})
}

//  获取用户举报文章列表 根据用户id
export const getUserReport = (id, params) => request.get(`/api/m/article/report/userList/${id}`, { params })

// // / 举报文章
// export const addReport = data => request.post('/api/m/article/report', data)

// // / 删除举报的文章
// export const deleteAccusationArticle = data => request.delete('/api/m/article/report', { data })

// // / 获取热门文章
// export const getHotArticle = params => request.get('/api/m/article/hot', { params })

//  获取用户浏览文章历史记录 根据用户id
export const getUserArticleViewHistory = (id, params) => request.get(`/api/m/article/viewHistory/${id}`, { params })

// / 获取用户收藏文章列表 根据用户id
export const getUserArticleCollections = (id, params) => request.get(`/api/m/article/collect/user/${id}`, { params })

//  获取用户点赞文章列表 根据用户id
export const getUserArticleLikings = (id, params) => request.get(`/api/m/article/liking/user/${id}`, { params })

// 获取用户发布的文章列表 根据用户id
export const getUserArticle = (id, params) => request.get(`/api/m/article/userList/${id}`, { params })



// 根据文章id获取点赞信息 根据文章id获取点赞信息 根据文章id判断是否已点赞
export const getArticleLikingsId = id => request.get(`/api/m/article/liking/${id}`)

// 收藏文章
export const addArticleCollections = data => request.post('/api/m/article/collect', data)

//  取消收藏文章
export const deleteArticleCollections = id => request.delete(`/api/m/article/collect/${id}`)

//  根据文章id判断是否已收藏文章
export const getArticleCollectionsId = id => request.get(`/api/m/article/collect/${id}`)

//  对文章点赞
export const addArticleLikings = data => request.post('/api/m/article/liking', data)

//  取消对文章点赞
export const deleteArticleLikings = id => request.delete(`/api/m/article/liking/${id}`)
