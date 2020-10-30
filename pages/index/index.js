let app = getApp();
let domain = "http://124.70.134.206:9899";
let url = domain + '/api/user/getLoginUser';


Page({
  data: {
    corpId: 'ding06e43a80515722ebee0f45d8e4f7c288',
    authCode: '',
    userId: '',
    userName: '',
    deptId: '',
    deptName: '',
    hideList: true,
    grid: {
      list: [
        {
          icon: '/image/Kraken 1.jpeg',
          text: '文件',
          url: '/pages/file/file'
        },
        {
          icon: '/image/shark.jpeg',
          text: '用户管理',
          url: '/pages/user/user'
        },
        {
          icon: '/image/チューリップイラスト.jpeg',
          text: '3333333'
        },
      ],
      columnNum: 3
    }
  },
  handleItemTap(e) {
    dd.showToast({
      content: `第${e.currentTarget.dataset.index}个Item`,
      success: (res) => {
        
      },
    });
    console.log(e)
    dd.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  loginSystem() {
    dd.showLoading();
    dd.getAuthCode({
      success: (res) => {
        this.setData({
          authCode:res.authCode
        })
        console.log(res)
        dd.httpRequest({
          url: url,
          method: 'POST',
          data: {
              authCode: res.authCode
          },
          dataType: 'json',
          success: (res) => {
              // dd.alert({content: "step2"});
              console.log('success----', res)
              let data = res.data.data;
              this.setData({
                  userId: data.ddUserId,
                  userName: data.ddUsername,
                  deptId: data.ddDeptId,
                  deptName: data.ddDeptName,
                  hideList: false
              })
              dd.setStorage({
                key: "userInfo",
                data: data
              })
          },
          fail: (res) => {
              console.log("httpRequestFail---",res)
              dd.alert({content: JSON.stringify(res)});
          },
          complete: (res) => {
              dd.hideLoading();
          }
            
        });
      },
      fail: (err)=>{
        // dd.alert({content: "step3"});
        dd.alert({
            content: JSON.stringify(err)
        })
      }
    })
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
