<template>
	<div class="shopCar" @click="toShopcar">
		<img src="~/assets/icon/shopcar_icon.png"/>
		<span class="badge" v-if="len">
			<el-badge :value="len" class="item"></el-badge>
		</span>
		<span class="color33 size14">购物车</span>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data(){
			return {
				bl:0,
				dl:0
			}
		},
		computed:{
			...mapState({
				user: state => state.loginStatus.loginedUser
			}),
			len(){
				return this.$store.getters['shopcarStatus/len'];
			}
		},
		methods:{
			toShopcar(){
				const {href} = this.$router.resolve({
					path: '/car'
				});
				window.open(href,'_blank');
			}
		},
		mounted(){
			if(localStorage.getItem('user'))this.$store.dispatch('shopcarStatus/GETCARLEN', localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null);
		},
		watch:{

		}
	}
</script>

<style lang="less" scoped="scoped">
	.shopCar{
		line-height: 38px;
		height: 38px;
		min-width: 110px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 11.5px;
		border: 1px solid #eee;
		border-radius: 8px;
		background: #fff;
		display: flex;
		position: relative;
		align-items: center;
		cursor:pointer; 
		&:hover{
			background: #f8f8f8;
		}
		img{
			width: 20px;
		}
		.badge{
			position: relative;
			top: 0;
			left: -6px;
		}
	}
</style>