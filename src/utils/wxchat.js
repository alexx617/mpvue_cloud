export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

export function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}

export function getLocation(type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}

export function wxGetImageInfo(src) {
  return new Promise((resolve, reject) => {
    wx.wxGetImageInfo({
      src: src,
      success: resolve,
      fail: reject
    })
  })
}

export function wxCanvasToTempFilePath(canvasId) {
  return new Promise((resolve, reject) => {
    wx.wxCanvasToTempFilePath({
      canvasId: canvasId,
      success: resolve,
      fail: reject
    })
  })
}

export function wxSaveImageToPhotosAlbum(filePath) {
  return new Promise((resolve, reject) => {
    wx.wxSaveImageToPhotosAlbum({
      filePath: filePath,
      success: resolve,
      fail: reject
    })
  })
}