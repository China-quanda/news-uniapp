// import { useMemberStore } from "@/stores"

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke: (options: UniApp.RequestOptions) => {
    // 1.非http开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 2.请求超时，默认设置10S
    options.timeout = 10000
    // 3.添加小程序请求头标识
    options.header = {
      ...options.header,
      "source-client": "miniapp"
    }
    // 4.添加token请求头标识
    // const menberStore = useMemberStore()
    // const token = menberStore.profile?.token
    const token = ''
    if (token) {
      options.header.Authorization = token;
      // options.header.Authorization: `Bearer ${token}`
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string;
  msg: string;
  result: T;
}

// 添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 401失败回到登录页
          // const menberStore = useMemberStore()
          // menberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误'
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误'
        })
        reject(err)
      }
    })
  })
}
