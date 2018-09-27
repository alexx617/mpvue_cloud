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
  $alert(content, cb, showCancel = false, title = '') {
    wx.showModal({
      title,
      showCancel,
      content,
      success(res) {
        if (cb) return cb();
      }
    });
  },
  $setTitle(title) {
    wx.setNavigationBarTitle({
      title
    })
  },
  $go(url) {
    // wx.redirectTo({
    wx.navigateTo({
      url
    })
  },
  $gotab(url) {
    wx.switchTab({
      url
    })
  },
}
