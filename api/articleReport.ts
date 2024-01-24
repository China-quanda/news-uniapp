import request from '@/utils/request'
interface IReport{
	type:number
	remark:string
	status:number
	user:object
	article:object
}
// 新增用户举报文章
export const createReport = (data:IReport) => {
	return request({
		url: '/article/report/createReport',
		method: 'post',
		data
	})
}
// 获取举报列表
export const getUserReportList = (query) => {
	return request({
		url:'/article/report/getUserReportList',
		method: 'GET',
		params:query
	})
}
// 销毁多个 or 销毁单个 举报的文章
export const destroy = (ids) => {
	return request({
		url: '/article/report/destroy',
		method: 'post',
		data: {
			ids
		}
	})
}
// 删除用户所有搜索历史记录
export const destroyUserAllRepor =():Promise<any>=> {
  return request({
    url: '/article/report/destroyUserAllRepor',
    method: 'POST'
  })
}
