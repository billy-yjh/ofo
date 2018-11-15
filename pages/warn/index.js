// pages/warn/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputValue: {
      num: 0,
      desc: ''
    },
    actionText: '拍摄/相册',
    picUrls: [],
    checkboxValues: [],
    itemsValue: [{
      value: '私锁私用',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '车盘缺损',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '轮胎坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '车锁坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '违规乱停',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '密码不对',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '刹车坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '其他故障',
      checked: false,
      color: '#b9dd08'
    }],
    btnColor: '#f2f2f2'
  },
  changeCheckbox: function (e) {
    console.log(e)
    var _value = e.detail.value;
    if (_value.length == 0) {
      this.setData({
        btnColor: '#f2f2f2',
        checkboxValues: []
      })
    } else {
      this.setData({
        btnColor: '#b9dd08',
        checkboxValues: _value
      })
    }
  },
  clickPhoto: function () {
    //从本地相册选择图片或使用相机拍照。
    wx.chooseImage({
      //最多可以选择的图片张数，默认9
      count: 9,
      //original 原图，compressed 压缩图，默认二者都有
      sizeType: ['original', 'compressed'],
      //album 从相册选图，camera 使用相机
      sourceType: ['album', 'camera'],
      success: (res) => {
        var _picUrls = this.data.picUrls;
        var _tfs = res.tempFilePaths;
        for (let temp of _tfs) {
          _picUrls.push(temp);
          this.setData({
            picUrls: _picUrls,
            actionText: '+'
          })
        }
      },
    });
  },
  delPic: function (e) {
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index, 1);
    this.setData({
      picUrls: _picUrls
    })
    if (_picUrls.length == 0) {
      this.setData({
        actionText: '拍摄/相册'
      })
    }
  },
  changeNumber: function (e) {
    this.setData({
      inputValue: {
        num: e.detail.value,
        desc: this.data.inputValue.desc
      }
    })
  },
  changeDesc: function () {
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: e.detail.value
      }
    })
  },
  submit: function () {
    if (this.data.picUrls.length > 0 && this.data.checkboxValues.length > 0) {
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b8e4f0333fe09358e9ea7d2/example/msg',
        success: (res) => {
          //提示框
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        }
      })
    } else {
      //模拟弹窗
      wx.showModal({
        title: '请填写完整的反馈信息',//标题
        content: '你瞅啥',//描述
        confirmText: 'ok',//同意按钮
        cancelText: '不填',//拒绝按钮
        success: (res) => {
          if (res.confrim) {

          } else {
            //关闭当前页面，返回上一页面或多级页面
            wx.navigateBack({
              delta: 1
            });
          }
        }
      })
    }
  }
})