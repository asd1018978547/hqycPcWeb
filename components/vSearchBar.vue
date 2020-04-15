 <template>
 	<div class="search-con">
 		<div class="searchBar" :style="{width:width}">
 			<input type="text" maxlength="100" v-model="value" placeholder="请输入商品名、品牌、商品编码等" @keydown.enter="searchGoods"/>
 			<div class="search-btn pointer flex flex-c flex-s-c" @click="searchGoods"> <img class="search_icon" src="~/assets/icon/search_icon.png" alt="">搜索</div>
 		</div>
 	</div>
</template>

<script>
	export default {
		props:{
			type:{
				type:String,
				default:'search'
			},
			width:{
				type:String,
				default:'604px'
			}
		},
		data(){
			return {
				value:'',
			}
		},
		methods:{
			searchGoods(){
				sessionStorage.setItem('serach_history',this.value);
				if(this.type =='link'){
					const {href} = this.$router.resolve({
						path: '/list',
						query:{
							searchName:this.value
						}
					})
					window.open(href,'_blank');
				}else{
          this.$router.push({
            path: '/list',
						query:{
							searchName:this.value
						}
          })
					this.$emit('callback',this.value);
				}
			}
		},
		mounted(){
			let search_history = sessionStorage.getItem('serach_history');
			this.value = search_history?search_history:'';
		}
	}
</script>

<style lang="less" scoped="scoped">
.search-con{
	position: relative;
	.searchBar{
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		border: 2px solid #fbb040;
		padding-left: 14px;
		font-size: 14px;
		display: flex;
		align-items: center;
		input{
			flex: 1;
		}
		.search-btn{
			width: 140px;
			text-align: center;
			color: #fff;
			background: #fbb040;
			font-size: 16px;
			.search_icon{
				width: 16px;
				height: auto;;
				margin-right: 6px;
			}
		}
		.fa-search{
			font-size: 18px;
			color: #fff;
			padding: 0 8px;
		}
	}
}
</style>