<template>
	<div class="indexBox">
		<button class="getuserinfo" open-type="getUserInfo" @getuserinfo="bindgetuserinfo">获取</button>
		<div class="top">
			<button @click="onGetOpenid">登陆</button>
			<button open-type='getPhoneNumber' @getphonenumber='getPhoneNumber'> 获取电话号码</button>
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
			userInfo: ''
		}
	},

	components: {
	},

	methods: {
		test2() {

		},
		getPhoneNumber (e) {
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
  .getuserinfo {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 0;
  }
  .top {
    width: 100%;
    padding: 20px;
  }
  .middle {
    display: flex;
    div {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>
