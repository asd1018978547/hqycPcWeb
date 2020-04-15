<template>
	<div class="top-nav">
			<div class="container clearfix">
				<div class="lf color65">
					<span class="marginRight10">欢迎来到环球云仓</span>
					<span class="username-con" v-show="isLogin">{{user.name}}</span>
					<span class="login-group marginLeft8">
						<p v-if="!isLogin">
							<span @click='toLogin'>登录</span>
							<span class="marginLeft10" @click='toRegister'>免费注册</span>
						</p>
						<span @click="loginout" v-else>退出</span>
					</span>
				</div>
				<div class="lr clearfix nav-menu">
					<span :class="item.active?'active':''" v-for="(item,i) in topNav" :key='i' @mouseenter="item.active = true" @mouseleave="item.active = false" @click="openUrl(item)">{{item.text}}</span>
					<div class="qrcode_con padding10 flex" v-show="topNav[4].active" @mouseenter="topNav[4].active = true" @mouseleave="topNav[4].active = false">
						<div class="image_con">
							<img src="/img/xiaochengxu.jpg"/>
							<p class="color80">小程序</p>
						</div>
						<div class="image_con">
							<img src="/img/qrcode.jpg"/>
							<p class="color80">公众号</p>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data(){
			return {
				topNav: [{
						text: '环球云仓首页',
						path: '/',
						type:'link',
						active: false
					},{
						text: '我的云仓',
						path: '/dashboard',
						type:'link',
						active: false
					},
					{
						text: '我的订单',
						path: '/dashboard/orderCenter',
						type:'link',
						active: false
					},
					{
						text: '关于我们',
						path: 'http://about.a-amall.com',
						type:'open',
						active: false
					},
					{
						text: '移动端',
						path: '',
						type:'',
						active: false
					},
				]
			}
		},
		computed:{
			...mapState({
				isLogin:state => state.loginStatus.logined,
				user:state => state.loginStatus.loginedUser
			})
    },
    mounted() {
      this.$store.dispatch('loginStatus/login')
    },
		methods:{
			toLogin(){
				this.$router.push({
					path: '/login'
				})
			},
			toRegister(){
				this.$router.push({
					path:'/register'
				})
			},
			loginout(){
				this.$store.commit('loginStatus/LOGOUT');
				this.$store.dispatch("shopcarStatus/GETCARLEN", localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null);
				this.$router.push({
					path:'/'
        })
        location.reload()
			},
			openUrl(item){
				if(item.type == 'link'){
					const {href} = this.$router.resolve({
						path:item.path
					});
					window.open(href,'_blank');
				}else if(item.type == 'open'){
					window.open(item.path);
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
.top-nav {
			background: #f6f6f6;
			line-height: 36px;
			height: 36px;
			color: #333;
			.username-con {
				font-size: 12px;
				color: #FE0000;
			}
			.login-group {
				span {
					cursor: pointer;
					&:hover {
						color: #FE0000;
					}
				}
			}
			.nav-menu {
				position: relative;
				span {
					padding: 0 10px;
					&.active {
						text-decoration: underline;
						color: #ff5722;
						cursor: pointer;
					}
				}
				.qrcode_con{
					position: absolute;
					border: 1px solid #EEEEEE;
					right: 0;
					top: 36px;
					background: #fff;
					z-index: 100;
					.image_con{
						margin-right: 15px;
						&:last-child{
							margin-right: 0;
						}
						img{
							width: 100px;
							height: 100px;
							display: block;
						}
					}
					p{
						line-height: 18px;
						text-align: center;
						color: #333;
						font-size: 12px;
					}
				}
			}
		}
</style>