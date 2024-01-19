import request from '@/utils/request'
// 获取用户评论列表
export const getUserCommentlist =(query:any):Promise<any>=> {
  return request({
    url: '/article/comment/getUserCommentlist',
    method: 'GET',
		params:query
  })
}