<template>
	<div class="indexBox">
		<!-- <p class="title">Miniprogram</p> -->
		<div class="wrapper">
			<h1 class="font1 web-font">
				<span>WELCOME</span>
			</h1>
		</div>
		<button v-if="showUserInfo" class="getuserinfo" open-type="getUserInfo" @getuserinfo="bindgetuserinfo"></button>
		<div class="top">
			<div class="btnBox">
				<button class="btn" v-if="showUserInfo&&!hasOpenId">微信授权</button>
				<button class="btn" v-else-if="!showUserInfo&&!hasOpenId" @click="onGetOpenid">用户登陆</button>
				<div class="integral" v-else>
					<span>0</span>
					积分
				</div>
				<p class="p" v-if="hasOpenId">欢迎您, {{userInfo.nickName}}</p>
				<p class="p" v-else>登陆后可享受会员权益</p>
			</div>
			<!-- <button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'> 获取电话号码</button> -->
		</div>
		<div class="middle">
			<div @click="$go('/pages/menu/main')">
				<i-icon type="shop_fill" size="38" />
				<p>功能2</p>
			</div>
			<div @click="test2">
				<i-icon type="createtask" size="38" />
				<p>功能2</p>
			</div>
		</div>
	</div>
</template>

<script>
import { setStorage, getStorage } from 'utils/wxchat'
export default {
	data() {
		return {
			avatarUrl: '',
			userInfo: '',
			showUserInfo: true,
			hasOpenId: false,
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
						this.hasOpenId = true;
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
					this.avatarUrl = e.mp.detail.userInfo.avatarUrl;
					this.userInfo = e.mp.detail.userInfo;
					this.showUserInfo = false;
				})
			} else {
				this.$alert('需要授权才能正常使用所有功能', () => { }, false, '同意授权')
			}
		},
	},

	mounted() {
		getStorage('userInfo').then(rs => {
			this.showUserInfo = false;
			this.avatarUrl = rs.data.avatarUrl;
			this.userInfo = rs.data;
		}).catch(err => {
			this.showUserInfo = true;
		})
		getStorage('openid').then(rs => {
			this.hasOpenId = true;
		}).catch(err => {
			this.hasOpenId = false;
		})



		wx.loadFontFace({
			family: 'webfont',
			source: 'url("https://github.com/alexx617/mpvue_cloud/blob/8dcbd22621f0c1d2731f32ab86120b468dcaf609/Monoton-Regular.ttf?raw=true")',
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
@mixin box-shadow {
  box-shadow: 0 4px 20px -3px #bdbdbd;
  border-radius: 10px;
}
.indexBox {
  text-align: center;
  padding: 40px;
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
    margin: 100px 0 40px 0;
    background: #fff;
    .btnBox {
      padding: 100px 0 50px 0;
      border-radius: 20px;
      text-align: center;
      @include box-shadow;
      .btn {
        display: inline-block;
        padding: 25px 70px;
        font-weight: 500;
        background-image: radial-gradient(20px 0px, #f6ce47, #fbe060);
        margin-bottom: 50px;
        font-size: 32px;
        @include box-shadow;
      }
      .p {
        color: #828282;
      }
      .integral {
        span {
          font-size: 100px;
          margin-left: 50px;
          font-weight: 500;
          vertical-align: top;
        }
      }
    }
  }
  .middle {
    display: flex;
    justify-content: space-between;
    div {
      padding: 20px;
      width: 45%;
      background: #fff;
      @include box-shadow;
    }
  }

  .wrapper h1 {
    font-size: 80px;
    margin: 0;
    font-weight: normal;
    animation: neon 3s infinite;
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
