import request from '@/utils/request'
// 获取热门搜索列表
export const getHotSearchlist =(query:any):Promise<any>=> {
  return request({
    url: '/article/search/getHotSearch',
    method: 'GET',
		params:query
  })
}
// 获取用户搜索历史记录列表
export const getUserSearchHistoryList =(query:any):Promise<any>=> {
  return request({
    url: '/article/search/getUserSearchHistory',
    method: 'GET',
		params:query
  })
}
// 销毁多个 or 销毁单个 用户搜索历史记录
export const destroyUserOneSearchHistory =(ids):Promise<any>=> {
  return request({
    url: '/article/search/destroyUserOneSearchHistory',
    method: 'POST',
		data:{
			ids
		}
  })
}
// 删除用户所有搜索历史记录
export const destroyUserAllSearchHistory =():Promise<any>=> {
  return request({
    url: '/article/search/destroyUserAllSearchHistory',
    method: 'POST'
  })
}
// 获取搜索联想建议列表
export const getAdvicelist =(msg):Promise<any>=> {
  return request({
    url: '/article/search/getAdvicelist',
    method: 'GET',
		params:{
			msg
		}
  })
}