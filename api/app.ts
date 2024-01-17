import request from '@/utils/request'
// 获取app版本接口
export const getAppVersion = (version:string) => {
	// return request({
	// 	url:'/api/common/getAppVersion',
	// 	method: 'GET',
	// 	params:{version}
	// })
	return new Promise((resolve)=>{
		setTimeout(()=>{
			console.log(3);
			resolve({
			    "msg": "操作成功",
			    "code": 200,
			    "data": {
			        "version": "1.0.0",
			        "url": "#",
			        "update": true
			    }
			})
		},1500)
	})
	
	
	
}