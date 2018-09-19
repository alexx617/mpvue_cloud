<template>
	<div class="indexBox">
		<div class="top">
			<button open-type="getUserInfo">123</button>
		</div>
		<div class="middle">
			<div>
				功能1
			</div>
			<div>
				功能2
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},

	components: {
	},

	methods: {
		test(){
			console.log('213');
			
		}
	},

	created() {

	}
}
</script>

<style lang="scss" scoped>
.indexBox {
  text-align: center;
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
