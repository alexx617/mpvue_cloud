export default {
  $tip(text, icon = 'none', duration = 1500) {
    wx.hideLoading();
    wx.showToast({
      title: text,
      icon,
      duration,
      mask: true
    })
  },
  $setTitle(title) {
    wx.setNavigationBarTitle({
      title
    })
  },
  $go(url) {
    wx.redirectTo({
      url
    })
  },
  $gotab(url) {
    wx.switchTab({
      url
    })
  },
}
