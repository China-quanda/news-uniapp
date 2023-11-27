import storage from '@/utils/storage'
import prompt from '@/utils/prompt';

// 登录页面
const loginPage = "/pages/login"


// // 页面白名单
// const whiteList = [
//   '/pages/login', '/pages/common/webview/index'
// ]

// // 检查地址白名单
// function checkWhite(url) {
//   const path = url.split('?')[0]
//   return whiteList.indexOf(path) !== -1
// }


// 页面黑名单
const blackList = [
  '/pages/chat/list',
	'/pages/chat/chat'
]

// 检查地址黑名单
function checkBlack(url) {
  const path = url.split('?')[0]
  return blackList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
  uni.addInterceptor(item, {
    invoke(to) {
      if (storage.get('token')) {
        if (to.url === loginPage) {
          uni.reLaunch({ url: "/" })
        }
        return true
      } else {
        if (checkBlack(to.url)) {
					prompt.confirm('前往该页面需要登录，您可以继续留在该页面，或者去登录?').then(res => {
					  if (res.confirm) {
					    uni.reLaunch({ url: loginPage })
					  }
					})
          return false
        }
				return true
      }
    },
    fail(err) {
      console.log(err)
    }
  })
})
