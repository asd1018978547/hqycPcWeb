<template>
  <div class="main">
    <div class="topCon">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span class="flex1" style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;">欢迎登录</span>
      </div>
    </div>
    <div class="loginCon" style="background:#6acff6;">
      <div class="container clearfix">
        <div class="loginBg_con">
          <img src="~/assets/img/login-bg.jpg" />
        </div>
        <div class="login-group lr" v-loading='isLoading'>
          <div class="login-title clearfix">
            <span class="lf fontBold color65 size16">用户登录</span>
            <span class="msglogin" :class='msgLoginStr == "使用帐号密码登录" ? "lockLogin" : ""' @click='changeMsgLogin'>{{msgLoginStr}}</span>
          </div>
          <div class="mobile-con">
            <p class="tip flex flex-c marginTop20" v-show='!mobileFlag&&mobileValue'>
              <i class="el-icon-warning" style="color:#ff6633;"></i>
              <span>请输入正确的手机号码</span>
            </p>
            <span class="input-con marginTop20">
              <el-input type='text' placeholder="请输入手机号码" v-model="mobileValue" size="medium"
                :clearable='true'>
                <el-select v-if='isMsgLogin' v-model='phoneMode' slot="prepend" placeholder="请选择">
                  <el-option label="中国大陆 +86" value="1"></el-option>
                  <el-option label="中国台湾 +886" value="2"></el-option>
                  <el-option label="中国香港 +82" value="3"></el-option>
                  <el-option label="澳大利亚 +61" value="4"></el-option>
                </el-select>
              </el-input>
            </span>
          </div>
          <div class="mobile-con flex flex-c marginTop20" v-if='isMsgLogin'>
            <span class="code-con flex1 yzminput">
              <el-input placeholder="验证码" v-model="msgCode" size="medium"></el-input>
            </span>
            <span v-if='!isGetMsgCode' :class='mobileFlag&&mobileValue ? "activeBtn code-img marginLeft10 flex flex-c yzm" : "activeBtn_def code-img marginLeft10 flex flex-c yzm"' @click='getMsgCode'>
              {{ msgCodeMsg }}
            </span>
            <span v-else class="activeBtn_def code-img marginLeft10 flex flex-c yzm">{{ msgCodeMsg }}</span>
          </div>
          <div class="mobile-con" v-if='!isMsgLogin'>
            <span class="tip flex flex-c marginTop20" v-show='!passwordFlag&&passwordValue'>
              <i class="el-icon-warning" style="color:#ff6633;"></i>
              <span>请输入6-20位数字或字母</span>
            </span>
            <span class="input-con marginTop20">
              <el-input type='password' placeholder="6-20位密码" v-model="passwordValue" size="medium" :minlength='6'
                :maxlength='20' :clearable='true' @keydown.native.enter="login"></el-input>
            </span>
          </div>
          <div class="mobile-con flex flex-c marginTop20" v-show="loginCount>6 && !isMsgLogin">
            <span class="code-con flex1">
              <el-input placeholder="验证码" v-model="codeValue" size="medium"></el-input>
            </span>
            <span class="code-img marginLeft10 flex flex-c">
              <img style="width:80px;height:40px;" :src="verifyImg" />
              <span class="color99 size14 marginLeft6" @click="getVerifyImg">
                <p>看不清？</p>
                <p>换一张</p>
              </span>
            </span>
          </div>
          <div class="forgetCon marginTop20 clearfix">
            <span class="lf">
              <el-checkbox v-model="pwdHistory">{{ isMsgLogin ? '10天免登录' : '记住密码' }}</el-checkbox>
            </span>
            <span class="lr pointer size14 color65" @click="toGetPassword">忘记密码？</span>
          </div>
          <div class="btn-con marginTop20 text-center">
            <span class="login-btn pointer" :class="loginFlag?'active':''" @click="login">登录</span>
          </div>
          <img src="~/assets/img/wxLogo.png" class="wxlogin" @click='wxLogin' />
          <div class="toRegister lr">
            <span class="lr">
              没有账号？
              <span class="pointer activeColorBlue" @click="toRegister"><i class="fa fa-arrow-circle-right marginRight6"></i>立即注册</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import vLogo from "~/components/vLogo";
  import vBottom from "~/components/vBottom";
  import { RegExp } from '@/tools/index';
  import { API } from "~/_config/API.js";
  import md5 from 'md5';
  export default {
    components: {
      vLogo,
      vBottom
    },
    data() {
      return {
        phoneMode: '1',
        isLoading: false,
        msgCodeMsg: '获取验证码',
        isMsgLogin: false,
        msgLoginStr: '使用短信验证登录',
        isGetMsgCode: false,
        loginCount: 0,
        mobileValue: '',
        codeValue: '',
        msgCode: '',
        passwordValue: '',
        checked: false,
        verifyImg: '',
        pwdHistory: false,
        count: '',
        timer: null,
      }
    },
    computed: {
      mobileFlag() {
        if (!this.isMsgLogin) {
          return true
        } else {
          switch (this.phoneMode) {
            case '1':
              return RegExp.phone.test(this.mobileValue);
              break;
            case '2':
              return RegExp.TWphone.test('886' + this.mobileValue);
              break;
            case '3':
              return RegExp.HKphone.test('82' + this.mobileValue);
              break;
            case '4':
              return RegExp.AUphone.test('61' + this.mobileValue);
              break;
            default:
              return false
          }
        }
      },
      passwordFlag() {
        return RegExp.passWord.test(this.passwordValue);
      },
      loginFlag() {
        if (this.mobileFlag && this.passwordFlag && !this.isMsgLogin) {
          return true;
        } else if (this.isMsgLogin) {
          if (this.mobileFlag && this.msgCode != '') {
            return true
          } else {
            return false
          }
        } else {
          return false;
        }
      }
    },
    methods: {
      wxLogin() {
        this.$router.push({ path: '/wxauth' })
      },
      changeMsgLogin() {
        this.isMsgLogin = !this.isMsgLogin
        this.msgLoginStr = this.isMsgLogin ? '使用帐号密码登录' : '使用短信验证登录'
        this.mobileValue = ''
        this.msgCode = ''
        this.passwordValue = ''
      },
      getMsgCode() {
        if (!this.isGetMsgCode && this.mobileFlag) {
          let p = ''
          switch (this.phoneMode) {
            case '1':
              break;
            case '2':
              p = '886'
              break;
            case '3':
              p = '82'
              break;
            case '4':
              p = '61'
              break;
            default:
              return false
          }
          API.getMsgCode({
            phone: this.mobileValue,
            region: p,
            smsCodeType: 3,
            templateId: this.phoneMode == 1 ? 2 : 7
          }).then(res => {
            if (res.ResponseId == 0) {
              this.$message.success('验证码已发送')
              this.isGetMsgCode = true
              const TIME_COUNT = 180
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.msgCodeMsg = '已获取(' + this.count + ')'
                    this.count--;
                  } else {
                    this.isGetMsgCode = false;
                    this.msgCodeMsg = '获取验证码'
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
            } else if(res.ResponseId == 1) {
              this.$message.error(res.Message);
              this.isGetMsgCode = true
              const TIME_COUNT = 180
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.msgCodeMsg = '已获取(' + this.count + ')'
                    this.count--;
                  } else {
                    this.isGetMsgCode = false;
                    this.msgCodeMsg = '获取验证码'
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
              
            } else {
              this.$message.error(res.Message);
            }

          })
        } else if (this.isGetMsgCode) {
        } else {
          this.$message.error('请输入正确的手机号')
        }
      },
      login() {
        if (this.passwordValue == '' && !this.isMsgLogin) {
          this.$message.error('请输入密码');
          return false;
        }
        if (this.loginFlag) {
          if (this.codeValue === '' && this.loginCount > 6 && !this.isMsgLogin) {
            this.$message.error('请输入验证码');
            return false;
          }
          if (this.isMsgLogin) {
            this.isLoading = true;
            API.msgLogin({
              userId: this.mobileValue,
              code: this.msgCode,
              misc: navigator.userAgent,
              roleId: '22',
              isRememberPwd: this.pwdHistory ? 1 : 0
            }).then(res => {
              this.isLoading = false;
              if (res.ResponseId == 0) {
                let u = {};
                u.name = res.Data.NickName;
                u.token = res.Data.Token;
                u.tokenExpirationTime = res.Data.TokenExpirationTime;
                u.userId = res.Data.UserId;
                u.isMember = res.Data.IsMember;  //是否会员
                u.levelId = res.Data.LevelId;   //会员等级
                u.summary = res.Data.Summary;   //会员等级描述
                u.retailerAuthStatus = res.Data.RetailerAuthStatus;   //认证状态
                localStorage.setItem('user', JSON.stringify(u));
                this.$store.commit('loginStatus/LOGIN');
                let dirPath = localStorage.getItem('directPath');
                if (dirPath && dirPath != 'null') {
                  localStorage.setItem('directPath', '');
                  this.$router.push({ path: dirPath });
                } else {
                  this.$router.push('/')
                }
              } else {
                this.$message.error(res.Message);
                this.loginCount++
              }
            });
          } else {
            this.isLoading = true;
            API.login({
              UserId: this.mobileValue,
              pwd: md5(this.passwordValue),
              code: this.codeValue,
              roleId: '22'
            }).then(res => {
              this.isLoading = false;
              if (res.ResponseId == 0) {
                let u = {};
                u.name = res.Data.NickName;
                u.token = res.Data.Token;
                u.tokenExpirationTime = res.Data.TokenExpirationTime;
                u.userId = res.Data.UserId;
                u.isMember = res.Data.IsMember;  //是否会员
                u.levelId = res.Data.LevelId;   //会员等级
                u.summary = res.Data.Summary;   //会员等级描述
                u.retailerAuthStatus = res.Data.RetailerAuthStatus;   //认证状态
                localStorage.setItem('user', JSON.stringify(u));
                this.$store.commit('loginStatus/LOGIN');
                this.setHistory();
                let dirPath = localStorage.getItem('directPath');
                if (dirPath && dirPath != 'null') {
                  localStorage.setItem('directPath', '');
                  this.$router.push({ path: dirPath });
                } else {
                  this.$router.go(-1)
                }
              } else {
                this.$message.error(res.Message);
                this.loginCount++
              }
            });
          }

        }
      },
      getVerifyImg() {
        API.getVerifyImg().then(res => {
          if (res.ResponseId == 0) {
            this.verifyImg = res.Data.Base64;
          } else {
            this.$message.error(res.Message);
          }
        })
      },
      toGetPassword() {
        this.$router.push({
          path: '/getPassword'
        })
      },
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      setHistory() {
        let o = this.pwdHistory ? { phone: this.mobileValue, password: this.passwordValue } : null;
        localStorage.setItem('pwdHistory', JSON.stringify(o));
      }
    },
    mounted() {
      this.getVerifyImg();
      let pwdHistory = localStorage.getItem('pwdHistory');
      if (pwdHistory && pwdHistory != 'null') {
        this.pwdHistory = true;
        let { phone, passWord } = JSON.parse(pwdHistory);
        this.mobileValue = phone;
        this.passwordValue = passWord;
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

  .el-input__suffix {
    line-height: 2.3;
  }
</style>
<style>

  .activeBtn{
    background: #FE0000 !important;
    color: #fff;
  }
  .activeBtn_def{
  background:#e6e6e6 !important
}
  .yzminput input {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0
  }
</style>
<style lang="less" scoped="scoped">
  .wxlogin {
    position: absolute;
    bottom: 15px;
  }

  .yzm {
    background: #e6e6e6;
    height: 36px;
    margin-left: 0;
    cursor: pointer;
    flex: 0 0 100px;
    justify-content: center;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .lockLogin {
    background-image: url(~assets/img/22222.png) !important;
    background-size: auto 80% !important;
    background-repeat: no-repeat;
    background-position: 0px 65%;
  }

  .msglogin {
    font-size: 12px;
    font-weight: 500;
    float: right;
    padding-top: 5px;
    background: url(~assets/img/msglogin.png) no-repeat;
    padding-left: 17px;
    background-size: auto 70%;
    background-position: 0px 65%;
    cursor: pointer;
    color: #666666;
  }

  .topCon {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #fff;
    border-bottom: 1px solid #ececec;
  }

  .loginCon {
    min-height: 554px;
    position: relative;
  }

  .loginBg_con {
    width: 100%;
    background: #6acff6;
    overflow: hidden;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;

    img {
      height: 552px;
      width: auto;
      position: relative;
      left: -380px;
    }
  }

  .mobile-con {
    position: relative;
  }

  .login-group {
    z-index: 99;
    display: inline-block;
    background: #FFFFFF;
    position: absolute;
    top: 92px;
    right: 98px;
    width: 340px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 30px;
    padding-bottom: 20px;
    box-sizing: border-box;
    border: 1px solid #ECECEC;
    border-radius: 8px;
    box-shadow: 0 0 6px #ccc;

    .input-con {
      width: 100%;
    }

    .login-btn {
      display: inline-block;
      width: 100%;
      transition: all .2s linear;
      line-height: 40px;
      height: 40px;
      border-radius: 2px;
      background: #CCCCCC;
      border: 1px solid #ECECEC;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 14px;
      color: #999;

      &.active {
        background: #FE0000;
        border: 1px solid #FE0000;
        color: #fff;
      }
    }
  }

  .tip {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ffb4a8;
    color: #808080;
    line-height: 30px;
    background: #fef2f2;
    padding-left: 10px;
    font-size: 12px;

    span {
      margin-left: 4px;
    }
  }

  .toRegister {
    font-size: 12px;
    margin-top: 20px;
    color: #656565;
  }
</style>