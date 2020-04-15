<template>
	<div class="logo-img pointer" :style="{width:w+'px'}" @click="toIndex">
		<img src="~/assets/img/logo.png"/>
	</div>
</template>

<script>
	export default {
		props:{
			w:{
				type:Number,
				default:200
			}
		},
		methods:{
			toIndex(){
				this.$router.push({
					path: '/',
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	.logo-img{
		display: inline-block;
		img {
			width: 100%;
			height: 100%;
		}
	}
</style>