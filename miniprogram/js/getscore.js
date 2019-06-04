wx.cloud.callFunction({
  name: 'login',
  success: res => {
    window.openid = res.result.openid
    db.collection('User').doc(window.openid).field({
      score: true
    }).get()
      .then(res => {
        // res.data 包含该记录的数据
      })
  },
  fail: err => {
    console.error('get openid failed with error', err)
  }
})