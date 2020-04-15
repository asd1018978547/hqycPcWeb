<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container_admin">
            <el-tooltip :content="errorContent" placement="right" manual effect="light" v-model='pwdError'>
                <el-input size="mini" :maxlength='20' placeholder="请输入原密码" v-model="password" type='password'>
                    <template slot="prepend">原始密码</template>
                </el-input>
            </el-tooltip>
            <br/>
            <el-tooltip :content="newError" placement="right" manual effect="light" v-model='newPwdError' >
	            <el-input size="mini" :maxlength='20' placeholder="请输入新密码" v-model="newPassword" type='password'>
	                <template slot="prepend">新的密码</template>
	            </el-input>
            </el-tooltip>
            <br/>
            <el-tooltip :content="reError" placement="right" manual effect="light" v-model='rePwdError'>
                <el-input size="mini" :maxlength='20' placeholder="请再次输入新密码" v-model="reNewPassword" type='password'>
                    <template slot="prepend">确认密码</template>
                </el-input>
            </el-tooltip>
            <br/>
            <el-button size="mini" style="padding:10px 55px;" type="primary" class="lm10" @click='subChange'>提交</el-button>
            <el-button size="mini" style="padding:10px 55px;margin-left: 45px;" type="info" @click='goIndex'>取消</el-button>
        </div>
    </div>
</template>

<script>
import {RegExp} from "~/tools/index";
import { API } from "~/_config/API.js";
import md5 from 'md5';
export default {
  data() {
    return {
      errorContent: '密码格式错误',
      newError: "新密码格式错误",
      reError: '两次输入的密码不匹配',
      rePwdError:false,
      pwdError:false,
      newPwdError:false,
      account: "",
      password: "",
      newPassword: "",
      reNewPassword: ""
    };
  },
  methods: {
	  init(){
		this.password = this.newPassword = this.reNewPassword = '';
		this.pwdError =  this.rePwdError = this.newPwdError =  true;
    },
    goIndex() {
      this.$router.push('/dashboard')
    },
  	subChange(){
		if(this.password ==''){
      this.errorContent = '请输入原密码'
      this.pwdError = true
			return ;
		} 
    if(this.newPassword =='') {
      this.newError = '请输入新密码'
      this.newPwdError = true
      return ;
    }
    if(this.reNewPassword == '') {
      this.reError = '请输入确认密码'
      this.rePwdError = true
      return ;
    }
		if(!this.pwdError&&!this.newPwdError&&!this.rePwdError){
				API.changePwd({
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
					oldPwd:md5(this.password),
					newPwd:md5(this.newPassword),
					confirmNewPwd:md5(this.reNewPassword),
				}).then(res=>{
					if(res.ResponseId == 0){
						this.$message({
							message:'修改密码成功',
							type:'success'
						})
					}else if(res.ResponseId == -1){
						this.$store.commit('LOGOUT');
						this.$message({
							message:'登录过期，请重新登录',
							type:'error',
							duration:1000,
							onClose:()=>{
								this.$router.push({path:'/login'})
							}
						})
					} else{
						this.$message({
							message:res.Message,
							type:'error'
						})
					}
				})
		}
  	}
  },
  updated(){
  },
  mounted(){
  },
  watch:{
  	password:function(val){
  		let f = RegExp.passWord.test(val);
      if(val.length < 6) {
        this.errorContent = '密码长度至少6位'
      } else {
        this.errorContent = '密码格式错误'
      }
  		if(f){
  			this.pwdError = false;
  		}else{
  			this.pwdError = true;
  		}
  	},
  	newPassword:function(val){
		if(val == '')return;
  		let f = RegExp.passWord.test(val);
      if(val.length < 6) {
        this.newError = '密码长度至少6位'
      } else {
        this.newError = '新密码格式错误'
      }
  		if(f){
  			this.newPwdError = false;
  		}else{
  			this.newPwdError = true;
  		}
  	},
  	reNewPassword:function(val){
  		let f = val === this.newPassword;
  		if(f){
  			this.rePwdError = false;
  		}else{
        this.reError = '两次输入的密码不匹配'
  			this.rePwdError = true;
  		}
  	}
  }
};
</script>

<style scoped>
.el-input {
  margin: 10px;
  width: 320px;
}
.lm10 {
  margin-left: 10px;
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 255);
    background-image: none;
    color: rgb(0, 0, 0);
}
</style>
