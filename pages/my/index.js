// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userUrl: '',
      nickname: '未登录'
    },
    actionText: "登录",
    btnType: "primary"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取储存
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: {
            userUrl: res.data.userInfo.userUrl,
            nickname: res.data.userInfo.nickname
          },
          actionText: res.data.actionText,
          btnType: res.data.btnType
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  login: function () {
    if (this.data.actionText === '登录') {
      //调用接口wx.login() 获取临时登录凭证（code）
      wx.login({
        success: () => {
          //获取用户信息
          wx.getUserInfo({
            success: (res) => {
              console.log(res);
              this.setData({
                userInfo: {
                  userUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName
                },
                actionText: '退出登录',
                btnType: "warn"
              })
              //将数据存储在本地缓存中指定的 key 中
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    userUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName
                  },
                  actionText: '退出登录',
                  btnType: "warn"
                },
              });
            },
          });
          //获取本地的信息
        }
      })
    } else {
      //删除缓存
      wx.removeStorageSync("userInfo");
      this.setData({
        userInfo: {
          userUrl: '',
          nickname: '未登录'
        },
        actionText: "登录",
        btnType: "primary"
      })
    }
  },
  movetoWallet:function(){
    wx.navigateTo({
      url: '../wallet/index',
    });
  }
})