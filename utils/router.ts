interface base {
  animationType?: number;
  animationDuration?: number;
}
interface push extends base{
	url: string;
	events?:object;
}
interface back extends base{
	delta: number;
	events?:object;
}
interface url {
  url: string;
}
/**
 * @description 路由 router
 * @method push()
 * @method tab()
 * @method back()
 * @method reLaunch()
 * @method redirect()
 */
export default {
	/**
	 * 关闭当前页面，返回上一页面或多级页面
	 * @param {Objct} payload 配置
	 * @param {string} payload.url 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 必填
	 * @param {string} payload.animationType 窗口关闭的动画效果。 默认值：'pop-out'
	 * @param {number} payload.animationDuration 窗口关闭动画的持续时间，单位为 ms。 默认值：300
	 * @param {Objct} payload.events 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。
	 * @example push({url:'/pages/index/index'})
	 */
	push:(payload:push)=>{
		uni.navigateTo(payload);
	},
	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。 
	 * 是否必填：必填
	 * 注意： 如果调用了 uni.preloadPage(OBJECT) 不会关闭，仅触发生命周期 onHide
	 * @param {string} url 需要跳转的 tabBar 页面的路径（需在 pages.json 的 tabBar 字段定义的页面），路径后不能带参数
	 * @example tab({url:'/pages/index/index'})
	 */
	tab:(url:url)=>{
		uni.switchTab({ url });
	},
	/**
	 * 关闭所有页面，打开到应用内的某个页面。 
	 * 是否必填：必填
	 * 注意： 如果调用了 uni.preloadPage(OBJECT) 不会关闭，仅触发生命周期 onHide
	 * @param {string} url 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数
	 * @example reLaunch({url:'/pages/index/index'})
	 */
	reLaunch:(url:url)=>{
		uni.reLaunch({ url });
	},
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 * 是否必填：必填
	 * @param {string} url 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
	 * @example redirect({url:'/pages/index/index'})
	 */
	redirect:(url:url)=>{
		uni.redirectTo({ url });
	},
	/**
	 * 关闭当前页面，返回上一页面或多级页面
	 * @param {Objct} payload 配置
	 * @param {number} payload.delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 默认值：1
	 * @param {string} payload.animationType 窗口关闭的动画效果。 默认值：'pop-out'
	 * @param {number} payload.animationDuration 窗口关闭动画的持续时间，单位为 ms。 默认值：300
	 * @example redirect({delta:1})
	 */
	back:(payload:back)=>{
		uni.navigateBack(payload)
	}
}