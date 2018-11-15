//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    latitude: 0,
    longitude: 0
  },
  //事件处理函数
  bindcontroltap: function (e) {
    console.log(e)
    switch (e.controlId) {
      //点击后若id为1 的话
      case 1:
        this.movetoCenter();
        break;
      case 2:
      //判断当前生命周期是否存在
      if(this.timer){
        //关闭当前页面，返回上一页面或多级页面。
        wx.navigateBack({
          delta: 1
        });
      }else{
        //调起客户端扫码界面
        wx.scanCode({
          success: () => {
            //显示 loading 提示框
            wx.showLoading({
              title: '正在获取二维码',
              mask: true,
              //如果成功扫码
              success: (result) => {
                //关闭提示框
                wx.hideLoading();
                //关闭当前页面，跳转到应用内的某个页面。
                wx.redirectTo({
                  //把数据传送到scanResult 页面
                  url: '../scanResult/index?password=' + res.data.data.password + '&number =' 
                  + res.data.data.number,
                  success: (result) => {
                    //显示消息提示框
                    wx.showToast({
                      title: '获取密码成功',
                      icon: 'none',
                      duration: 1500,
                      mask: false,
                    });
                  },
                });
              },
            });
            //发起网络请求
            wx.request({
              url: 'https://www.easy-mock.com/mock/5b8e4f0333fe09358e9ea7d2/example/getName',
              success: (result) => {
                console.log(111)
              }
            });
          }
        }) 
      }
      break;
      case 3:
      wx.navigateTo({
        url:'../warn/index'
      })
      break;
      case 4:
      wx.navigateTo({
        url:'../my/index'
      })
    }
  },
  onLoad: function () {
    // this.timer = options.timer;
    //微信获取地址的接口
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (res) => {
        //setData 可以改变属性
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });
    //获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            //相当于img中的src  获取图片地址
            iconPath: "./images/location.png",
            //图片定位
            position: {
              width: 50,
              height: 50,
              left: 20,
              //windowHeight 屏幕的高
              top: res.windowHeight - 80
            },
            //是否可以点击
            clickable: true
          }, {
            id: 2,
            iconPath: './images/use.png',
            position: {
              width: 90,
              height: 90,
              top: res.windowHeight - 100,
              left: res.windowWidth / 2 - 45
            },
            clickable: true
          }, {
            id: 3,
            iconPath: './images/warn.png',
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 80,
              left: res.windowWidth - 70
            },
            clickable: true
          }, {
            id: 4,
            iconPath: './images/avatar.png',
            position: {
              width: 50,
              height: 50,
              top: res.windowHeight - 155,
              left: res.windowWidth - 70
            },
            clickable: true
          }, {
            id: 5,
            iconPath: './images/marker.png',
            position: {
              width: 30,
              height: 45,
              top: res.windowHeight / 2 - 45,
              left: res.windowWidth / 2 - 15
            },
          }]
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  onShow: function () {
    //获取上下文  
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter()
  },
  movetoCenter: function () {
    //将地图中心移动到当前定位点，
    this.mapctx.moveToLocation();
  }
})