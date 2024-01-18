import request from '@/utils/request'
//验证码登录 and 注册
export const smsLogin =(data)=> {
  return request({
    url: '/user/smsLogin',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfo =()=> {
  return request({
    url: '/user/getUserInfo',
    method: 'GET',
  })
}

// 账户密码登录 and 注册
export const localLogin =(data)=> {
  return request({
    url: '/user/localLogin',
    method: 'POST',
		data
  })
}

// 验证码修改密码
export const smsUpdatePassword =(data)=> {
  return request({
    url: '/user/smsUpdatePassword',
    method: 'POST',
		data
  })
}
//////////未实现
// 已扫描二维码
export const qrScannedLogin =(data)=> {
  return request({
    url: '/app/qrCode/scanned',
    method: 'post',
    data
  })
}

// 扫码授权确认登录
export const qrConfirmLogin =(data)=> {
  return request({
    url: '/app/qrCode/confirm',
    method: 'post',
    data
  })
}

// 扫码授权取消登录
export const qrCancelLogin =(data)=> {
  return request({
    url: '/app/qrCode/cancel',
    method: 'post',
    data
  })
}