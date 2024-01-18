
interface IShareSystemError {
	code : number //获取错误编码
	message : string //获取错误描述信息
}
interface IShareSystemOptions {
	type ?: string
	content ?: string
	thumbs ?: string[]
	pictures ?: string[]
	media ?: string
	href ?: string
	title ?: string
	interface ?: "auto" | "slient" | "editable"
	// JSON对象，位置信息（将废弃）
	geo ?: {
		latitude:number
		longitude:number
	}
	extra ?:{
		scene:string
	}
	miniProgram ?: {
		id:string
		path:string
		type:number
		webUrl:string
	}
}
/**
 * @description 使用系统分享发送分享消息 
 * @param {object} options 
 * @return Promise
 * @link 查看文档 ：https://www.html5plus.org/doc/zh_cn/share.html#plus.share.ShareMessage
 */
export const shareSystem = (options : IShareSystemOptions) => {
	return new Promise((resolve, reject) => {
		plus.share.sendWithSystem(
			options,
			() => { resolve({ message: 'success' }) },
			(error : IShareSystemError) => { reject(error) }
		)
	})
}

// "web"-分享网页类型，title（必填）、content（必填）、thumbs（必填）、href（网页url，必填）属性值有效；
// shareSystem({
// 	type: 'web',
// 	title: "百度",
// 	content: '寻她千百度',
// 	thumbs: ['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
// 	href: 'https://www.baidu.com'
// }).then(res => {
// 	console.log('res', res);
// }).catch(err => {
// 	console.log('err', err);
// })

// "text"-分享文字类型，content（必填）属性值有效；
// shareSystem({
// 	type: 'text',
// 	title: "百度",
// 	content: '寻她千百度',
// }).then(res => {
// 	console.log('res', res);
// }).catch(err => {
// 	console.log('err', err);
// })

// "image"-分享图片类型，pictures（必填）属性值有效；
// shareSystem({
// 	type: 'image',
// 	title: "百度",
// 	content: '寻她千百度',
// 	pictures:['https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'],
// }).then(res => {
// 	console.log('res', res);
// }).catch(err => {
// 	console.log('err', err);
// })