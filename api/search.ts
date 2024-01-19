import request from '@/utils/request'
// 获取热门搜索列表
export const getHotSearchlist =(query:any):Promise<any>=> {
  return request({
    url: '/article/search/getHotSearch',
    method: 'GET',
		params:query
  })
}