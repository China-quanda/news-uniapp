import request from '@/utils/request'

// 已扫描二维码
// export const qrScannedLogin =(data)=> {
//   return request({
//     url: '/app/qrCode/scanned',
//     method: 'post',
//     data
//   })
// }


// 获取文章列表  带用户搜索记录
export const getArticleList = (query) => {
	return request({
		url:'/article',
		method: 'GET',
		params:query
	})
}

// 根据文章id获取文章信息
export const getArticleById = id => {
	return request({
		url:`/article/${id}`,
		method: 'GET'
	})
}