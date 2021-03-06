var app = getApp()
Page({
  /**
   * 初始化数据
   */
  data: {
    checkData: {},
    price: '0',
    payname:'预 约',
    
    dates: '2018-01-08',
  },
  listenerPhoneInput: function (e) {
    this.data.checkData['phone'] = e.detail.value;
  },
  listenerNameInput: function (e) {
    this.data.checkData['name'] = e.detail.value;
  },
  listenerThemeInput: function (e) {// 性别
    this.data.checkData['theme'] = e.detail.value;
  },
  listenerDetailAddrInput: function (e) {// 详细地点
    this.data.checkData['address'] = e.detail.value;
  },

  /**
   * 监听登录按钮
   */
  listenerLogin: function () {
    var sendData = this.data.checkData
    var telRule = /^1[2-9]\d{9}$/, nameRule = /^[\u2E80-\u9FFF]+$/
    if (sendData['name'] == undefined || sendData['name'] == '') {
      this.showMessage('请输入姓名')
    } else if (sendData['phone'] == undefined || sendData['phone'] == '') {
      this.showMessage('请输入手机号码')
    } else if (!telRule.test(sendData['phone'])) {
      this.showMessage('手机号码格式不正确')
    } else if (sendData['theme'] == undefined || sendData['theme'] == '') {
      this.showMessage('请选择活动主题')
    } else if (sendData['date'] == undefined || sendData['date'] == '') {
      this.showMessage('请选择活动时间')
    } else if (sendData['address'] == undefined || sendData['address'] == '') {
      this.showMessage('请输入详细地点')
    } else if (sendData['machine'] == undefined || sendData['machine'] == '') {
      this.showMessage('请选择机位需求')
    } else {

      sendData['user_id'] = '1';
      sendData['type'] = 'live';
      sendData['pay'] = 'not';

      var that = this
      var url1 = app.requestlivebookingUrl;

      wx.showLoading({
        title: '提交中...',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)

      wx.request({
        url: url1,
        data: sendData,
        //POST请求要添加下面的header设置
        // method: 'POST',
        // header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (res) {

          that.setData({
            hidden: true
          });
          wx.hideLoading()
          // wx.showToast({
          //   title: res.data['msg'],
          // })
          if (res.data['code'] == '0') {
            wx.showModal({
              content: '预约成功, 我们将会尽快审核!请勿重复预约哦',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            })
            
          }
        },
        fail: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: '网络错误,请稍后再试',
          })

        },

        complete: function (res) {
          wx.hideLoading()
        }

      });
    }
  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.data.checkData['date'] = e.detail.value;
    this.setData({
      dates: e.detail.value
    })
  },
  // 机位选择 1 单机位 ,2 双机位 ,3 多机位
  radioChange: function (e) {
    //console.log(e.detail.value)
    var that = this
    // var newprice = that.data.price
    // var newpayname = '预 约'
    if (e.detail.value == 1){
      // newprice = '3500'
      // newpayname = '支付3500元'
      this.data.checkData['machine'] = '单机位:支付3500元'
    } else if (e.detail.value == 2) {
      // newprice = '5000'
      // newpayname = '支付5000元'
      this.data.checkData['machine'] = '双机位:支付5000元'
    } else {
      this.data.checkData['machine'] = '多机位:联系后支付'
    }
    // this.setData({
    //   price: newprice,
    //   payname: newpayname
    // })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    
    // 当前时间
    var myDate = new Date();//获取系统当前时间
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var datas = year + '-' + month + '-' + day
    this.setData({
      dates: datas
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})