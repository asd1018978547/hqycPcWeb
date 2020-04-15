<template>
  <div class="main">
    <div class="topCon">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span class="flex1" style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;">{{
          $route.query.iswx ? '绑定手机' : '欢迎注册'}}</span>
        <span class="color65 size14">已有账号?<span @click="toLogin"><span class="activeColorBlue pointer">立即登录</span></span></span>
      </div>
    </div>
    <div class="registerCon marginTop20">
      <div class="container white-bg text-center">
        <div class="register-group white-bg" v-loading='isLoading' style="position:relative">
          <p v-if='$route.query.iswx' style="line-height:35px;text-align:left;font-size:14px;padding-left: 135px;position: absolute;color: #FE0000; top: -20px;">为了您的账号安全，请绑定手机</p>
          <div class="mobile-con flex flex-c">
            <span class="label size14 color65 text-right"><i class="color-red">*</i>手机号</span>
            <span class="input-con marginLeft15">
              <el-input type='text' placeholder="请输入手机号码" v-model="mobileValue" size="medium"
                :clearable='true' @blur="testPhone" @focus="isBlur = false" @keyup.native="testPhone">
                <el-select v-model='phoneMode' slot="prepend" placeholder="请选择">
                  <el-option label="中国大陆 +86" value="1"></el-option>
                  <el-option label="中国台湾 +886" value="2"></el-option>
                  <el-option label="中国香港 +82" value="3"></el-option>
                  <el-option label="澳大利亚 +61" value="4"></el-option>
                </el-select>
              </el-input>
            </span>
            <span class="tip marginLeft10 flex flex-c" v-show='!mobileFlag&&mobileValue'>
              <i v-show="!isCorrect||isRegist" class="el-icon-warning"></i>
              <span v-show="!isCorrect">{{ phoneErrorText }}</span>
              <span v-show="isCorrect&&isRegist&&isBlur">当前手机号已被注册</span>
            </span>
          </div>
          <div class="mobile-con flex flex-c marginTop20">
            <span class="label size14 color65 text-right"><i class="color-red">*</i>短信验证码</span>
            <span :class="isCodeDown?'w222':'w260'" class="code-con marginLeft15">
              <el-input placeholder="请输入短信验证码" v-model="codeValue" size="medium"></el-input>
            </span>
            <span class="code-btn marginLeft10">
              <el-button :type="mobileFlag&&getCodeFlag?'primary':'info'" :disabled='!mobileFlag||!getCodeFlag' size="small"
                @click='getCode'>
                <span>获取验证码</span>
                <span v-show="countTime&&!getCodeFlag">{{countTime}}s</span>
              </el-button>
            </span>
          </div>
          <div class="mobile-con flex flex-c marginTop20">
            <span class="label size14 color65 text-right"><i class="color-red">*</i>设置密码</span>
            <span class="input-con marginLeft15">
              <el-input type='password' placeholder="6-20位密码" v-model="passwordValue" size="medium" :minlength='6'
                :maxlength='20' :clearable='true' :disabled='!mobileFlag?true:false'></el-input>
            </span>
            <span class="tip marginLeft10 flex flex-c" v-show='!passwordFlag&&passwordValue'>
              <i class="el-icon-warning"></i>
              <span>请输入6-20位数字或字母</span>
            </span>
          </div>
          <div class="mobile-con flex flex-c marginTop20">
            <span class="label size14 color65 text-right"><i class="color-red">*</i>确认密码</span>
            <span class="input-con marginLeft15">
              <el-input type='password' placeholder="6-20位密码" v-model="rePasswordValue" size="medium" :minlength='6'
                :maxlength='20' :clearable='true' :disabled='!mobileFlag?true:false'></el-input>
            </span>
            <span class="tip marginLeft10 flex flex-c" v-show='!rePasswordFlag&&rePasswordValue'>
              <i class="el-icon-warning"></i>
              <span>请与上方密码保持一致</span>
            </span>
          </div>
          <div class="authorizeCon marginTop20">
            <el-checkbox v-model="checked" size='mini'>我已阅读并接受 </el-checkbox>
            <span class="color80"><span class="color-red pointer" @click='jump'>《环球云仓用户注册协议》</span></span>
          </div>
          <div class="btn-con marginTop20">
            <span class="register-btn pointer" :class="registerFlag?'active':''" @click="register">立即注册</span>
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
    components: {
      vLogo,
      vBottom
    },
    data() {
      return {
        phoneMode: '1',
        isLoading: false,
        mobileValue: '',
        isRegist: false,
        phoneErrorText: '请输入正确的手机号码',
        mobileSelect: '',
        codeValue: '',
        passwordValue: '',
        rePasswordValue: '',
        getCodeFlag: true,
        countTime: 180,
        checked: false,
        mobileArea: [
          { name: '中国：+86', id: '86' }
        ],
        isBlur: false,
        isCodeDown: false
      }
    },
    watch: {
      phoneMode: function() {
        this.testPhone()
      }
    },
    computed: {
      isCorrect() {
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
      mobileFlag() {
        return this.isCorrect && !this.isRegist && this.isBlur;
      },
      codeFlag() {
        if (this.codeValue != '') {
          return true;
        } else {
          return false;
        }
      },
      passwordFlag() {
        if (RegExp.passWord.test(this.passwordValue)) {
          return true;
        } else {
          return false;
        }
      },
      rePasswordFlag() {
        if (this.passwordValue === this.rePasswordValue) {
          return true;
        } else {
          return false;
        }
      },
      registerFlag() {
        if (this.mobileFlag && this.codeFlag && this.passwordFlag && this.rePasswordFlag && this.checked) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      jump() {
        const { href } = this.$router.resolve('/xy');
        window.open(href, '_blank');
      },
      testPhone() {
        if (this.isCorrect && !this.$route.query.iswx) {
          API.testPhone({
            phone: this.mobileValue
          }).then(res => {
            this.isBlur = true;
            if (res.ResponseId == 0) {
              this.isRegist = res.Data
            } else {
              this.$message(res.Message);
              this.isRegist = false;
            }
          })
        } else if (this.isCorrect && this.$route.query.iswx) {
          this.isBlur = true
        }
      },
      getCode() {
        if (this.mobileFlag && this.getCodeFlag && !this.$route.query.iswx) {
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
          API.getCode({
            phone: this.mobileValue,
            region: p,
            templateId: this.phoneMode == 1 ? 0 : 5
          }).then((res) => {
            if (res.ResponseId == 0) {
              this.countTime--;
              this.getCodeFlag = false;
              let timer = setInterval(() => {
                this.isCodeDown = true
                this.countTime--;
                if (this.countTime == 0) {
                  clearInterval(timer);
                  this.getCodeFlag = true;
                  this.countTime = 180;
                  this.isCodeDown = false
                }
              }, 1000)
            } else {
              this.$message.error(res.Message)
            }
          })
        } else if (this.mobileFlag && this.getCodeFlag && this.$route.query.iswx) {
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
          API.getBindCode({
            phone: this.mobileValue,
            region: p,
            smsCodeType: 2,
            templateId: this.phoneMode == 1 ? 4 : 8
          }).then((res) => {
            if (res.ResponseId == 0) {
              this.countTime--;
              this.getCodeFlag = false;
              let timer = setInterval(() => {
                this.isCodeDown = true
                this.countTime--;
                if (this.countTime == 0) {
                  clearInterval(timer);
                  this.getCodeFlag = true;
                  this.countTime = 180;
                  this.isCodeDown = false
                }
              }, 1000)
            } else {
              this.$message.error(res.Message)
            }
          })
        }
      },
      register() {
        if (this.registerFlag) {
          let misc = navigator.userAgent;
          let params = {
            userId: this.mobileValue,
            phone: this.mobileValue,
            pwd: md5(this.passwordValue),
            code: this.codeValue,
            roleId: '22',
            region: '',
            misc: misc
          }
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
          params.region = p
          this.isLoading = true;
          if (this.$route.query.iswx) {
            params.openid = this.$route.query.oid
            params.unionid = this.$route.query.uid
            params.smsCodeType = 2
            API.wxBind(params).then(res => {
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
                this.$store.commit('LOGIN');
                this.$message({
                  message: '绑定成功，正在登录...',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$router.push({ path: '/' })
                  }
                })
              } else {
                this.$message({
                  message: res.Message,
                  type: 'error'
                })
              }
            })
          } else {
            API.register(params).then((res) => {
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
                this.$store.commit('LOGIN');
                this.$message({
                  message: '注册成功，正在登录...',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.$router.push({ path: '/' })
                  }
                })
              } else {
                this.$message({
                  message: res.Message,
                  type: 'error'
                })
              }
            })
          }
        }
      },
      toLogin() {
        localStorage.setItem('directPath', '/');
        this.$router.push({
          path: '/login'
        });
      }
    },
  }
</script>

<style>
.el-input-group__prepend {
    background-color: #fff;
  }
  .el-select .el-input {
    width: 150px;
  }
  .el-input__suffix{
    line-height: 2.3;
  }
  </style>
<style lang="less" scoped="scoped">
  .color-red {
    color: #FE0000;
    margin-right: 2px;
  }

  .topCon {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #fff;
    border-bottom: 1px solid #ececec;
  }

  .registerCon {
    min-height: 640px;

    .container {
      min-height: 500px;
    }
  }

  .register-group {
    display: inline-block;
    margin: 100px auto;
    width: 700px;
    padding: 30px 15px;
    box-sizing: border-box;
    border-radius: 8px;

    .label {
      width: 120px;
    }

    .input-con {
      width: 360px;
    }

    .code-con {
      transition: all 0.22s linear;
      width: 260px;
    }

    .register-btn {
      position: relative;
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
      left: -40px;
      color: #999;

      &.active {
        background: #FE0000;
        border: 1px solid #FE0000;
        color: #fff;
      }
    }
  }

  .tip {
    color: #FF4200;
    line-height: 20px;
    font-size: 10px;

    span {
      margin-left: 4px;
    }
  }

  .w260 {
    width: 260px !important;
  }

  .w222 {
    width: 222px !important;
  }
</style>