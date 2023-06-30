import request from '@/utils/request'

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