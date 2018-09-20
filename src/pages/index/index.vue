<template>
	<div class="indexBox">
		<!-- <p class="title">welcome to miniprogram</p> -->
		<div class="wrapper">
			<h1 class="font1 web-font">
				<span>welcome</span>
			</h1>
		</div>
		<button class="getuserinfo" open-type="getUserInfo" @getuserinfo="bindgetuserinfo">获取</button>
		<div class="top">
			<div class="btnBox">
				<button class="btn">微信登陆授权</button>
				<!-- <button @click="onGetOpenid">登陆</button> -->
				<p>登陆后可享受会员权益</p>
			</div>
			<!-- <button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'> 获取电话号码</button> -->
		</div>
		<div class="middle">
			<div>
				功能1
			</div>
			<div @click="test2">
				功能2
			</div>
		</div>
	</div>
</template>

<script>
import { setStorage } from 'utils/wxchat'
export default {
	data() {
		return {
			avatarUrl: '',
			userInfo: '',
			name: 'welcome'
		}
	},

	components: {
	},

	methods: {
		test2() {

		},
		getPhoneNumber(e) {
			console.log(e);
			if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: '未授权',
					success: function (res) { }
				});
			} else {
				wx.showModal({
					title: '提示',
					showCancel: false,
					content: '同意授权',
					success: function (res) { }
				});
			}
		},
		onGetOpenid() {
			// 调用云函数
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					console.log('[云函数] [login] user openid: ', res.result.openid)
					setStorage('openid', res.result.openid).then(rs => {
						console.log('openid储存成功');
					})
				},
				fail: err => {
					console.error('[云函数] [login] 调用失败', err)
				}
			})
		},
		bindgetuserinfo(e) {
			if (e.mp.detail.userInfo) {
				setStorage('userInfo', e.mp.detail.userInfo).then(rs => {
					console.log('userInfo储存成功');
				})
				this.avatarUrl = e.mp.detail.userInfo.avatarUrl;
				this.userInfo = e.mp.detail.userInfo;
			}
		}
	},

	mounted() {
		wx.loadFontFace({
			family: 'webfont',
			source: 'url("//at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
			success: function (res) {
				console.log(res.status) //  loaded
			},
			fail: function (res) {
				console.log(res.status) //  error
			},
			complete: function (res) {
				console.log(res.status);
			}
		});
	},

	created() {
		// // 获取用户信息
		// wx.getSetting({
		// 	success: res => {
		// 		if (res.authSetting['scope.userInfo']) {
		// 			// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		// 			wx.getUserInfo({
		// 				success: res => {
		// 					this.avatarUrl = res.userInfo.avatarUrl;
		// 					this.userInfo = res.userInfo
		// 				}
		// 			})
		// 		}
		// 	}
		// })
	}
}
</script>

<style lang="scss" scoped>
.indexBox {
  text-align: center;
  padding: 30px;
  .title {
    font-size: 40px;
    font-weight: bold;
  }
  .getuserinfo {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
  }
  .top {
    width: 100%;
    padding: 20px;
    margin-top: 100px;
    .btnBox {
      padding: 100px 0 50px 0;
      border-radius: 20px;
      box-shadow: 0 4px 20px -3px #bdbdbd;
      text-align: center;
      .btn {
        display: inline-block;
        border-radius: 50px;
        padding: 20px 60px;
        background-image: radial-gradient(20px 0px, #f6ce47, #fbe060);
        box-shadow: 0 4px 20px -3px #bdbdbd;
        margin-bottom: 50px;
        font-size: 32px;
      }
    }
  }
  .wrapper h1 {
    font-size: 100px;
    margin: 0;
    font-weight: normal;
    animation: neon 3s infinite;
  }
  .font1 {
    font-family: "黑体", cursive;
  }

  @keyframes neon {
    0% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
    80% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
    81% {
      color: #222;
      text-shadow: 0 0 10px #000, 1px 1px rgb(99, 74, 82), -2px 0px 4px #29121a;
    }
    94% {
      color: #222;
      text-shadow: 0 0 10px #000, 1px 1px rgb(99, 74, 82), -2px 0px 4px #29121a;
    }
    95% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
    96% {
      color: #222;
      text-shadow: 0 0 10px #000, 1px 1px rgb(99, 74, 82), -2px 0px 4px #29121a;
    }
    97% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
    98% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
    99% {
      color: #222;
      text-shadow: 0 0 10px #000, 1px 1px rgb(99, 74, 82), -2px 0px 4px #29121a;
    }
    100% {
      color: #e91e63;
      text-shadow: 0 0 10px #e91e63, 1px 1px rgb(255, 149, 162),
        0 0 280px #e91e9f;
    }
  }
}
</style>
