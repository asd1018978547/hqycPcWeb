<template>
	<div class="category-con colorFFF flex flex-column" :class="isHover?'active':''" @mouseenter.stop="isHover = true" @mouseleave.stop="isHover = false" :style="{width:w+'px'}">
		<div class="flex flex-c" style="line-height: 40px;background: #fbb040;padding-left:20px;">
			<i class="icon icon_case marginRight12"></i>
			<span class="size16">所有分类</span>
		</div>
		<div class="category-group" :style="{width:w+'px'}">
			<ul v-show="hoverShow" class="animated fadeIn list">
				<li class="list-item" v-for="(item,index) in list" :key="index" @mouseenter.stop="changeChild(item)" @mouseleave.stop='childShow = false'>
					<div class="cate1 flex flex-c flex-s-r" :class="index!=list.length-1?'border-bottom':''" @click="cateLink(item)">
						<img :src="baseUrl+item.Icon" v-show="item.Icon">
						<span class="pointer size14 cate1_title">{{item.Name}}</span>
						<i class="el-icon-arrow-right"></i>
					</div>
					<div class="left_sliver"></div>
				</li>
			</ul>
			<ul class="childGroup white-bg animated fadeIn clearfix" v-show="childShow" @mouseenter.stop='childShow = true' @mouseleave.stop='childShow = false'>
				<li class="cate2" v-for="(item,index) in childList" :key="index" >
					<p class="title clearfix flex flex-c" @click="cateLink(item)"><span class="flex1">{{item.Name}}</span> <i class="el-icon-arrow-right"></i></p>
					<p><span class="title2" v-for="(o,i) in item.Childs" :key="i" @click="cateLink(o)">{{o.Name}}</span></p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
import { _CONFIG } from '~/_config/config.js'
import { API } from "~/_config/API.js";
	export default {
		props:{
			w:{
				type:Number,
				default:210
			}
		},
		data(){
			return {
				isHover:false,
				list:[],
				childList:[],
				childShow:false,
				baseUrl:ali_oss_data.URL_IMG_SHOW
			}
		},
		computed:{
			hoverShow(){
				let a = this.$route.path;
				if(a=='/')return true;
				return this.isHover;
			}
		},
		methods:{
			cateLink(o){
				this.isHover = false;
				const {href} = this.$router.resolve({
					path:'/list',
					query:{
						'cate_code':o.Code
					}
				})
				window.open(href,'_blank')
			},
			changeChild(o){
        if (this.childShow) {
          return
        }
				this.childShow = true;
				let m = {
					name:o.Name,
					code:o.Code
        }
				this.getCase(m).then(res=>{
					if(res.ResponseId == 0){
						this.childList = res.Data;
					}
				})	
			},
			getCase(item={}){
				return new Promise((resolve)=>{
					let curCode = item.code || '',name = item.name || ''
					let params = {
						curCode:curCode,
            name:name,
            token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
            loading: false
					}
					API.getCase(params).then(res=>{
					  resolve(res)
					})
				})			
			}
		},
		mounted(){
			this.list = window._SkuCategory;
			this.getCase().then(res=>{
				if(res.ResponseId == 0){
					this.list = res.Data;
				}
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
.icon_case{
	background: url('~assets/icon/case_icon.png') no-repeat;
	background-position-y: 1px;
}
	.category-con{
		position: relative;
		.category-group{
			position: absolute;
			left: 0;
			top: 40px;
			z-index: 88;
			.list{
				position: absolute;
				width: 100%;
				background: rgba(255,255,255,0.9);
				color: #666;
				z-index: 10;
			}
			.left_sliver{
				position: absolute;
				height: 60px;
				background: #fbb040;
				width: 4px;
				left: 0;
				top: 0;
				display: none;
			}
			.border-bottom{
				border-bottom: 1px dashed #ccc;
			}
			.list-item{
				width: 100%;
				padding: 0 8%;
				height: 60px;
				position: relative;
				border-top: 1px solid transparent;
				&:hover{
					border-bottom: 1px solid #ccc;
					border-top: 1px solid #ccc;
					border-right: 2px solid #fff;
					.border-bottom{
						border: none;
					}
					color: #fbb040;
					.left_sliver{
						display: block;
					}	
				}

			}
			.cate1{
				height: 100%;
				img{
					width: 16px;
				}
				.cate1_title{
					// width: 100px;
				}
			}
			.childGroup{
				position: absolute;
				width: 800px;
				min-height: 300px;
				left: 210px;
				top: 0;
				padding: 0 15px;
				border: 1px solid #ccc;
				color: #666;
				.cate2{
					box-sizing: border-box;
					padding:10px; 
					.title{
						line-height: 40px;
						font-size: 17px;
						font-weight: bold;
						cursor: pointer;
						border-bottom: 1px solid #ccc;
						&:hover{
							color: #fbb040;
							border-color: #fbb040;
						}
					}
					.title2{
						font-size: 14px;
						color: #666;
						cursor: pointer;
						margin-right: 15px;
						&:hover{
							color: #fbb040;
						}
					}
				}
			}
		}
	}
</style>