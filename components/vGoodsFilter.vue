<template>
	<div class="filterCon flex flex-c size12 color65">
		<div class="condition-con flex">
			<span class="condition-list flex flex-c" v-for="(item,index) in conditionList" :key='index' @click="conditionChange(item)">
				<span :class="item.active?'active':''">{{item.name}}</span>
				<span v-if="item.signle == 2" class="single-con marginLeft4">
					<i class="el-icon-caret-top" :class="item.active&&item.derection == 1?'active':''"></i>
					<i class="el-icon-caret-bottom" :class="item.active&&item.derection == 0?'active':''"></i>
				</span>
			</span>
		</div>
		<div class="radio-con">
			<el-checkbox-group v-model="checkBox">
				<el-checkbox :label="item.id" v-for='(item,index) in checkBoxList'  :key='index' :class="" >{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				checkBox:[],
				conditionList:[
					{name:'综合',type:'orderType',id:1,signle:1,active:true,derection:0},
					{name:'销量',type:'orderType',id:2,signle:1,active:false,derection:0},
					{name:'价格',type:'orderType',id:3,signle:2,active:false,derection:0},
				],
				checkBoxList:[
					{type:'expType',id:2,name:'保税备货'},
          {type:'expType',id:1,name:'跨境直邮'},
          {type:'expType',id:3,name:'一般贸易'},
				]
			}
		},
		methods:{
			init(){
				this.checkBox = [];
				this.conditionList.forEach((val)=>{
					val.active = false;
					val.derection = 0;
				})
				this.conditionList[0].active = true;
			},
			conditionChange(o){
				this.conditionList.forEach((val)=>{
					val.active = false;
				});
				o.active = true;
				if(o.signle == 2){
					o.derection = (o.derection == 0)?1:0;
					this.emitChange(o.type,o.id,o.derection);
				}else{
					this.emitChange(o.type,o.id)
				}
			},
			emitChange(key,value,dir){
				this.$emit('change',{key,value,dir});
			}
		},
    mounted() {
      const $query = this.$route.query
      const checkBoxIndex = $query['expType']
      if(checkBoxIndex){
        this.checkBox.push(parseInt(checkBoxIndex))
      }
    },
		watch:{
			checkBox:function(val){
				this.emitChange('expType',val);
			}
		}
	}
</script>
<style>
.radio-con .el-checkbox__input.is-checked+.el-checkbox__label{
  color: #606266 !important;
}
.radio-con .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
background-color: #fe0000!important;
  border-color: #fe0000!important;
}
</style>


<style lang="less" scoped="scoped">
.filterCon{
	line-height: 36px;
}
.condition-con{
	.condition-list{
		padding: 0 15px;
		border-right: 1px solid #ECECEC;
		cursor: pointer;
	}
	.single-con{
		display: inline-block;
		width: 20px;
		text-align: center;
		display: flex;
		flex-flow: column;
		justify-content: space-around;
	}
}
.active{
	color: #FF4200 !important;
}
.radio-con{
	padding-left: 15px;
}
</style>