<template>
	<div class="main">
		<div class="topCon">
			<div class="container flex flex-c">
				<span><v-logo></v-logo></span>
				<span class="flex1" style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;">找回密码</span>
				<span class="color65">已有账号?<span class="pointer" @click="toLogin"><span class="activeColorBlue">去登录</span></span></span>
			</div>
		</div>
		<div class="forgetCon marginTop20">
			<div class="container text-center white-bg">
				<div class="forget-group white-bg" v-loading='isLoading'>
					<div class="mobile-con flex flex-c">
						<span class="label size14 color65 text-right"><i class="color-red">*</i>手机号</span>
						<span class="input-con marginLeft15">
							<el-input 
								type='text' 
								placeholder="请输入手机号码" 
								v-model="mobileValue" 
								size="medium"
								:maxlength='11'
								:clearable='true'
								>
						    <el-select v-model='phoneMode' slot="prepend" placeholder="请选择">
                  <el-option label="中国大陆 +86" value="1"></el-option>
                  <el-option label="中国台湾 +886" value="2"></el-option>
                  <el-option label="中国香港 +82" value="3"></el-option>
                  <el-option label="澳大利亚 +61" value="4"></el-option>
                </el-select>
						  	</el-input>
						</span>
						<span class="tip marginLeft10 flex flex-c" v-show='!mobileFlag&&mobileValue'>
							<i class="el-icon-warning"></i>
							<span>请输入正确的手机号</span>
						</span>
					</div>
					<div class="mobile-con flex flex-c marginTop20">
						<span class="label size14 color65 text-right"><i class="color-red">*</i>短信验证码</span>
						<span :class="isCodeDown?'w222':'w260'" class="code-con marginLeft15">
							<el-input placeholder="请输入短信验证码" v-model="codeValue" size="medium"></el-input>
						</span>
						<span class="code-btn marginLeft10">
							<el-button :type="mobileFlag&&getCodeFlag?'primary':'info'" :disabled='!mobileFlag||!getCodeFlag' size="small" @click='getCode'>
								<span>获取验证码</span>
								<span v-show="countTime&&!getCodeFlag">{{countTime}}s</span>
							</el-button>
						</span>
					</div>
					<div class="mobile-con flex flex-c marginTop20">
						<span class="label size14 color65 text-right"><i class="color-red">*</i>设置密码</span>
						<span class="input-con marginLeft15">
							<el-input
								 type='password'
								 placeholder="6-20位密码"
								  v-model="passwordValue"
								   size="medium"
								   :minlength='6'
								   :maxlength='20'
								   :clearable='true'
								   :disabled='!mobileFlag?true:false'
								   ></el-input>
						</span>
						<span class="tip marginLeft10 flex flex-c" v-show='!passwordFlag&&passwordValue'>
							<i class="el-icon-warning"></i>
							<span>请输入6-20位数字或字母</span>
						</span>
					</div>
					<div class="mobile-con flex flex-c marginTop20">
						<span class="label size14 color65 text-right"><i class="color-red">*</i>确认密码</span>
						<span class="input-con marginLeft15">
							<el-input 
								type='password' 
								placeholder="6-20位密码" 
								v-model="rePasswordValue" 
								size="medium"
								:minlength='6' 
								:maxlength='20' 
								:clearable='true'
								:disabled='!mobileFlag?true:false'
								></el-input>
						</span>
						<span class="tip marginLeft10 flex flex-c" v-show='!rePasswordFlag&&rePasswordValue'>
							<i class="el-icon-warning"></i>
							<span>请与上方密码保持一致</span>
						</span>
					</div>
					<div class="btn-con marginTop20 text-center">
						<span class="forget-btn pointer" :class="forgetFlag?'active':''" @click="forget">确定提交</span>
					</div>
				</div>
			</div>
		</div>
		<v-bottom></v-bottom>
	</div>
</template>

<script>
  import vLogo from '~/components/vLogo';
  import vBottom from '~/components/vBottom';
  import { RegExp } from '~/tools/index';
  import { API } from "~/_config/API.js";
  import md5 from 'md5';
	export default {
		components:{
			vLogo,
			vBottom
		},
		data(){
			return {
        phoneMode: '1',
        isLoading:false,
        isCodeDown: false,
				mobileValue:'',
		    	mobileSelect: '',
		    	codeValue:'',
		    	passwordValue:'',
		    	rePasswordValue:'',
		    	getCodeFlag:true,
		    	countTime:180,
			}
		},
		computed:{
			mobileFlag(){
				switch (this.phoneMode) {
          case '1':
            return RegExp.phone.test(this.mobileValue);
            break;
          case '2' :
            return RegExp.TWphone.test('886' + this.mobileValue);
            break;
          case '3' :
            return RegExp.HKphone.test('82' + this.mobileValue);
            break;
          case '4' :
            return RegExp.AUphone.test('61' + this.mobileValue);
            break;
          default:
            return false
        }
			},
			codeFlag(){
				if(this.codeValue!=''){
					return true;
				}else{
					return false;
				}
			},
			passwordFlag(){
				if(RegExp.passWord.test(this.passwordValue)){
					return true;
				}else{
					return false;
				}
			},
			rePasswordFlag(){
				if(this.passwordValue === this.rePasswordValue){
					return true;
				}else{
					return false;
				}
			},
			forgetFlag(){
				if(this.mobileFlag&&this.codeFlag&&this.passwordFlag&&this.rePasswordFlag){
					return true;
				}else{
					return false;
				}
			}
		},
		methods:{
			getCode(){
				if(this.mobileFlag&&this.getCodeFlag){
          this.isCodeDown = true;
          let p =  ''
          switch (this.phoneMode) {
            case '1':
              break;
            case '2' :
              p = '886' 
              break;
            case '3' :
            p = '82' 
              break;
            case '4' :
            p = '61' 
              break;
            default:
              return false
          }
					API.getMsgCode({
            region: p,
            smsCodeType: 1,
            token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
						phone:this.mobileValue,
						templateId:this.phoneMode == 1 ? 1 : 6
					}).then((res)=>{
            if(res.ResponseId == 0) {
              this.countTime--;
              this.getCodeFlag = false;
              let timer = setInterval(()=>{
                this.isCodeDown = true;
                this.countTime--;
                if(this.countTime == 0){
                  clearInterval(timer);
                  this.getCodeFlag = true;
                  this.countTime = 180;
                  this.isCodeDown = false;
                }
              },1000)
            }else{
              this.$message.error(res.Message)
            }
					})
				}
			},
			forget(){
				if(this.forgetFlag){
					let misc = navigator.userAgent;
					let params = {
						phone:this.mobileValue,
						newPwd:md5(this.passwordValue),
						confirmNewPwd:md5(this.rePasswordValue),
            code:this.codeValue,
            token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
						misc:misc
          }
          
					this.isLoading = true;
					API.forgetPwd(params).then(res=>{
						this.isLoading = false;
						if(res.ResponseId == 0){
							this.$message({
								message:'重置密码成功，正在跳转登录页',
								type:'success',
								duration:'1000',
								onClose:()=>{
									this.toLogin();
								}
							})
						}else{
							this.$message({
								message:res.Message,
								type:'error'
							})
						}
					})
				}
			},
			toLogin(){
				localStorage.setItem('directPath','/');
				this.$router.push({
					path:  '/login'
				})
			}
		}
	}
</script>
<style>
  .el-input-group__prepend {
      background-color: #fff;
    }
    .el-select .el-input {
      width: 145px;
    }
    .el-input__suffix{
      line-height: 2.3;
    }
    </style>
<style lang="less" scoped="scoped">
.color-red{
	color: #FE0000;
}
.topCon{
	padding-top: 20px;
	padding-bottom: 20px;
	background: #fff;
	border-bottom: 1px solid #ececec;
}
.forgetCon{
	min-height: 640px;
	.container{
		min-height: 500px;
	}
}
.forget-group{
	display: inline-block;
	margin: 100px auto;
	width: 700px;
	padding: 30px 15px;
	box-sizing: border-box;
	border: 1px solid #ECECEC;
	border-radius: 8px;
	box-shadow:  0 0 6px #ccc;
	.label{
		width: 120px;
	}
	.input-con{
		width: 360px;
	}
	.code-con{
    transition: all 0.22s linear;
		width: 260px;
	}
	.forget-btn{
		display: inline-block;
		width: 320px;
		transition: all .2s linear;
		line-height: 40px;
		height: 40px;
		border-radius: 5px;
		background: #CCCCCC;
		border: 1px solid #ECECEC;
		box-sizing: border-box;
		font-size: 14px;
		color: #999;
		&.active{
			background: #FE0000;
			border: 1px solid #FE0000;
			color: #fff;	
		}
	}
}
.tip{
	color: #FF4200;
	line-height: 20px;
	font-size: 10px;
	span{
		margin-left: 4px;
	}
}
.w260{
  width: 260px!important;
}
.w222{
  width: 222px!important;
}
</style>