<template>
  <div class="pay">
    <v-top></v-top>
    <div class="topCon white-bg">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span class="flex1" style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;">收银台</span>
      </div>
    </div>
    <div style="min-height:600px;">
      <div class="codeCon marginTop20" v-show="!paySuccess">
        <div class="container marginTop10 white-bg">
          <div class="flex flex-c">
            <img src="~assets/icon/success.png" />
            <div class="flex1">
              <p class="clearfix">
                订单提交成功，请您尽快付款！订单号：<span class="priceColor">{{orderNum}}</span>
              </p>
              <p>请您在提交订单后<span class="priceColor">{{orderTimeText}}</span>内完成付款，超时未支付的订单系统将会自动取消。</p>
            </div>
            <span>应付金额：<i>￥</i><em>{{orderPrice}}</em></span>
          </div>
        </div>
      </div>
      <div class="payCon marginTop20" v-show="!paySuccess&&!getPayFlag">
        <div class="container white-bg">
          <p class="title">支付方式</p>
          <div class="border marginTop10 padding10 flex flex-c item" v-for="(item,index) in payWayList" :key='index'>
            <el-radio v-model="payway" :disabled='item.disabled' :label="item.PayWay">{{item.title}}</el-radio>
            <img class="icon marginLeft10" :src="item.icon" v-show="item.icon" />
            <p class="marginLeft10" style="color: #c0c4cc;" v-show="item.disabled"></p>
            <p class="marginLeft10" style="color: #c0c4cc;" v-show="item.tip">{{item.tip}}</p>
          </div>
          <div class="btn_group marginTop20">
            <span class="pay_btn pointer" @click="getPay">去支付</span>
          </div>
        </div>
      </div>
      <div class="wePayCon marginTop20" v-show="getPayFlag&&(payType == 1||payType == 5)&&!paySuccess">
        <div class="container white-bg">
          <div class="wepay_con">
            <p class="title border-bottom">{{payway== 'WxPay'?'微信支付':'支付宝'}}</p>
            <div class="wePay_code_con flex flex-c flex-s-r">
              <div class="code_image_con" v-loading='wepayLoading'>
                <p v-if="payTime">距离二维码过期还有&nbsp;<span class="color-red">{{payTimeText}}</span>
                  ,过期后请点击刷新重新获取二维码
                </p>
                <p v-else>二维码已过期，点击<span class="color-red pointer" @click="tlPay">刷新</span> 重新获取二维码</p>
                <canvas id="canvas" class="pay_code_sao marginRight10" v-show='payTime'></canvas>
                <img v-show="!payTime" class="pay_code_img marginTop10" src="~assets/img/guoqi_code.png" />
                <div class="flex flex-c marginTop10 flex-s-r">
                  <div class="flex">
                    <img src="~assets/icon/saoyisao.png" />
                    <div>
                      <p>请使用{{payway=='WxPay'?'微信':'支付宝'}}扫一扫</p>
                      <p>扫描二维码支付</p>
                    </div>
                  </div>
                  <span class="readyPay_btn bg_gradient_orange pointer" @click="checkReadyPay">我已支付</span>
                </div>
              </div>
              <img class="pay_code_phone" :src="payPhone_img" />
            </div>
            <p class="marginTop10 choosePayType"><span class="flex flex-c fontBold pointer" @click="getPayFlag = false"><i
                  class="fa fa-angle-left" style="font-size: 15px;"></i><span class="marginLeft4">选择其他支付方式</span></span>
            </p>
          </div>
        </div>
      </div>
      <div class="paySuccesCon marginTop20" v-show="paySuccess">
        <div class="container white-bg">
          <div class="success_con flex flex-c">
            <img :src="successImg" />
            <div class="info marginLeft15">
              <p>订单支付成功</p>
              <p>订单号：{{orderNum}} <span class="marginLeft15">支付金额：<span class="priceColor">{{orderPrice}}</span>元</span></p>
              <p>正常情况下，您的订单将于2个工作日内完成发货,请您及时关注订单动态</p>
              <p class="click_group"><span class="pointer" @click="goOrder">查看订单</span><span class="pointer" style="margin-left: 30px;"
                  @click="goIndex">返回首页</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>

<script>
  import vLogo from "~/components/vLogo";
  import vTop from "~/components/vTop";
  import vBottom from "~/components/vBottom";
  import { API } from "~/_config/API.js";
  import { mapState } from "vuex";
  export default {
    components: {
      vLogo,
      vBottom,
      vTop
    },
    data() {
      return {
        payway: '',
        paySuccess: false,
        orderNum: "",
        orderPrice: "",
        orderTime: "",
        payType: 5,
        getPayFlag: false,
        payWayList: [
          {
            type: 5,
            title: "支付宝支付",
            disabled: true,
            icon: require("@/assets/icon/zhifubao.jpg"),
            tip: ''
          },
          {
            type: 4,
            title: "微信支付",
            disabled: true,
            icon: require("@/assets/icon/wepay_icon.jpg"),
            tip: ''
          },
          {
            type: 6,
            title: "银联支付",
            disabled: true,
            icon: require("@/assets/icon/yinlian.jpg"),
            tip: '部分银行（工行、招商等）在线支付仅支持IE浏览器，若遇无法正常支付的情况，请您使用IE浏览器或及时联系客服'
          },
          {
            type: 2,
            title: "我的余额",
            disabled: true,
            icon: "",
            tip: '暂未开通'
          },
          {
            type: 3,
            title: "授信支付",
            disabled: true,
            icon: "",
            tip: '暂未开通'
          }
        ],
        successImg: require("~/assets/img/success.png"),
        payTime: 0,
        wepayLoading: true,
        wePayQrcode: "",
        formData: {}
      };
    },
    computed: {
      orderTimeText() {
        return this.cumputedText(this.orderTime);
      },
      payTimeText() {
        return this.cumputedText(this.payTime);
      },
      payPhone_img() {
        let img = this.payway == 'WxPay' ? require('@/assets/icon/wepay_phone.png') : require('@/assets/icon/alipay_phone.jpg')
        return img;
      }
    },
    methods: {
      init() {
        this.orderNum = this.$route.query.orderNum;
        API.notPayInfo({
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
          orderCode: this.orderNum
        }).then(res => {
          if (res.ResponseId == 0) {
            let orderInfo = res.Data;
            let time = new Date(orderInfo.DateAdded);
            time = time.setMinutes(time.getMinutes() - new Date().getTimezoneOffset())
            let t1 = new Date()
            time = new Date(time).getTime() > t1.getTime() ? t1 : time;
            this.orderTime = new Date(time).getTime() / 1000 + 120 * 60 - new Date().getTime() / 1000;
            let m = orderInfo.FinnalMoney + orderInfo.TaxAmount + orderInfo.TransFee;
            this.orderPrice = parseFloat(m).toFixed(2);
            this.$nextTick().then(() => {
              if (this.orderTime > 0) {
                this.countDown(1, this.orderTime, time => {
                  this.orderTime = time;
                });
              }
            });
          } else if (res.ResponseId == -1) {
            this.$store.commit("LOGOUT");
            this.$message({
              message: "登录过期，请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.checkPaySuccess();
          }
        });
      },
      goOrder() {
        this.$router.push({
          path: "/dashboard/orderCenter"
        });
      },
      goIndex() {
        this.$router.push({
          path: "/"
        });
      },
      getPay() {
        if (this.orderTime < 0) {
          return this.$message({
            message: "支付已超时",
            type: "error"
          });
        }
        if (this.payway) {
          this.getPayFlag = true;
          let type = 0
          this.payWayList.map(v => {
            if (v.PayWay == this.payway) {
              type = parseInt(v.type)
            }
          })
          switch (type) {
            case 6:
              if (this.payway == 'Unionpay') {
                this.bankPay();
              } else {
                this.tlPay();
              }
              break;
            case 3:
              this.getPayFlag = false;
              if (this.payway == 'Unionpay') {
                this.bankPay();
              } else {
                this.mobaoPay();
              }
              break;
            default:
              break;
          }
        } else {
          this.$message({
            message: "请选择支付方式",
            type: "warning"
          });
        }
      },
      getWePayUrl() {
        let params = {
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
          orderCode: this.orderNum
        };
        this.wepayLoading = true;
        API.wePay(params).then(res => {
          this.wepayLoading = false;
          if (res.ResponseId == 0) {
            let url = res.Data;
            this.createCode(url);
          } else if (res.ResponseId == -1) {
            this.$store.commit("LOGOUT");
            this.$message({
              message: "登录过期，请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.$message.error(res.Message);
          }
        });
      },
      mobaoPay() {
        let orderNum = this.orderNum, token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
        API.mobaoPay(orderNum, token);
        this.$alert('查询支付状态', {
          confirmButtonText: '我已支付',
          callback: () => {
            this.checkReadyPay();
          }
        });
      },
      tlPay() {
        this.wepayLoading = true;
        API.tlPay({
          payType: this.payway != 'WxPay' ? 'A01' : 'W01',
          orderNo: this.orderNum,
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
        }).then(res => {
          this.wepayLoading = false;
          if (res.ResponseId == 0) {
            let url = JSON.parse(res.Data).Payinfo;
            this.createCode(url);
          } else if (res.ResponseId == -1) {
            this.$store.commit("LOGOUT");
            this.$message({
              message: "登录过期，请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.$message.error(res.Message);
          }
        })
      },
      bankPay() {
        let params = {
          "orderNo": this.orderNum,
          "orderAmount": this.orderPrice,
          "orderCurrency": "156",
          "payType": "0",
          "token": JSON.parse(localStorage.getItem("user")).token,
        }
        this.formData = {
          orderNo: this.orderNum,
          orderAmount: this.orderPrice,
          ext1: JSON.parse(localStorage.getItem("user")).token,
          ext2: '',
          extTL: '',
          payerNam: '',
          payerEmail: '',
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
          payerTelephone: '',
          payerIDCard: '',
          productName: '',
          productPrice: '',
          productNum: '',
          productId: '',
          productDesc: '',
          pan: '',
        }
        API.bankPay(this.formData);
        this.$alert('查询支付状态', {
          confirmButtonText: '我已支付',
          callback: () => {
            this.checkReadyPay();
          }
        });
      },
      countDown(type, intDiff, fn, callback) {
        if (type == 1) {
          clearInterval(window.orderTimer);
          window.orderTimer = setInterval(function () {
            if (intDiff > 0) {
              intDiff--;
            } else {
              if (callback instanceof Function && callback !== "") {
                callback();
              }
              clearInterval(window.orderTimer);
            }
            if (fn instanceof Function && fn != "") {
              fn(intDiff);
            }
          }, 1000);
        } else {
          clearInterval(window.payTimer);
          window.payTimer = setInterval(function () {
            if (intDiff > 0) {
              intDiff--;
            } else {
              if (callback instanceof Function && callback !== "") {
                callback();
              }
              clearInterval(window.payTimer);
            }
            if (fn instanceof Function && fn != "") {
              fn(intDiff);
            }
          }, 1000);
        }
      },
      cumputedText(intDiff) {
        if (intDiff == "") return "";
        if (intDiff < 0) return "支付已超时";
        let day = 0,
          hour = 0,
          minute = 0,
          second = 0,
          d = "",
          m = "",
          text = "";
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - day * 24;
        minute = Math.floor(intDiff / 60) - day * 60 * 24 - hour * 60;
        second = Math.floor(
          intDiff - day * 60 * 60 * 24 - hour * 60 * 60 - minute * 60
        );
        if (day > 0) d = day + "天" + hour + "小时";
        if (day == 0 && hour > 0) d = hour + "小时";
        m = minute + "分";
        if (day == 0 && hour == 0 && minute == 0) m = "";
        text = d + m + second + "秒";
        return text;
      },
      createCode(url) {
        let _this = this;
        let canvas = document.getElementById('canvas')
        const QRCode = require('qrcode')
        this.wePayQrcode = QRCode.toCanvas(canvas, url, {
          width: 300,
          height: 300,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
        this.payTime = 1 * 60;
        this.countDown(2, this.payTime, time => {
          this.payTime = time;
        });
        this.rollCheck();
      },
      getWebSocket() {
        if ("WebSocket" in window) {
          let ws = new WebSocket(window._config.wsUrl);
          ws.onopen = (e) => {
            let o = {
              token: JSON.parse(localStorage.getItem("user")).token,
              type: "client"
            };
            ws.send(JSON.stringify(o));
          };
          ws.onmessage = (e) => {
            this.paySuccess = e.data == 0;
          };
          ws.onclose = () => { };
          ws.onerror = () => { };
        } else {

        }
      },
      checkReadyPay() {
        API.notPayInfo({
          OrderCode: this.orderNum,
          token: JSON.parse(localStorage.getItem("user")).token
        }).then(res => {
          if (res.ResponseId == 0) {
            this.$message({
              type: 'error',
              message: '订单尚未支付，请支付，如有疑问请联系客服！'
            })
          } else if (res.ResponseId == -1) {
            this.$message({
              message: "登录过期，请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$router.push({ path: "/login" });
              }
            });
          } else {
            this.paySuccess = true;
          }
        })
      },
      checkPaySuccess() {
        API.checkPaySuccess({
          OrderCode: this.orderNum,
          token: JSON.parse(localStorage.getItem("user")).token
        }).then(res => {
          if (res.ResponseId == 0) {
            this.paySuccess = true;
            this.orderPrice = res.Data.totalMoney;
            window.clearInterval(window.RollCheck);
          }
        })
      },
      rollCheck() {
        let c = 0;
        window.clearInterval(window.RollCheck);
        window.RollCheck = setInterval(() => {
          this.checkPaySuccess();
          c++;
          if (c == 20) {
            window.clearInterval(window.RollCheck);
          }
        }, 3000)
      },
    },
    beforeRouteLeave(to, from, next) {
      this.$destroy()
      window.clearInterval(window.RollCheck);
      next()
    },
    mounted() {
      this.init();
      API.getPayList({
        platformType: 'PC'
      }).then(res => {
        res.Data.map(v => {
          if (v.PayWay == 'AliPay') {
            this.payWayList[0].disabled = false
            this.payWayList[0].type = v.PayType
            this.payWayList[0].PayWay = v.PayWay
          } else if (v.PayWay == 'WxPay') {
            this.payWayList[1].disabled = false
            this.payWayList[1].type = v.PayType
            this.payWayList[1].PayWay = v.PayWay
          } else if (v.PayWay == 'Unionpay') {
            this.payWayList[2].disabled = false
            this.payWayList[2].type = v.PayType
            this.payWayList[2].PayWay = v.PayWay
          } 
        })
      })
    },
    watch: {
      paySuccess: function () {
        this.$forceUpdate();
      }
    }
  };
</script>

<style lang="less" scoped="scoped">
#canvas{
  width: 300px !important;
  height: 300px !important;
}
  .color-red {
    color: #fe0000;
  }

  .paySuccesCon {
    .container {
      min-height: 615px;
      padding-top: 135px;
      box-sizing: border-box;
    }

    .success_con {
      width: 600px;
      margin: 0 auto;
      line-height: 24px;

      .click_group {
        color: #00b7ee;
      }
    }
  }

  .payCon {
    .container {
      min-height: 485px;
      padding: 20px 15px;
    }

    .icon {
      width: 30px;
      height: auto;
    }

    .item {
      height: 32px;
      line-height: 32px;
      box-sizing: content-box;
    }
  }

  .pay_btn {
    box-sizing: border-box;
    line-height: 36px;
    padding: 0 15px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    min-width: 100px;
    text-align: center;
    background: #fe0000;
  }

  .codeCon {
    .container {
      padding: 20px 15px;
    }

    img {
      width: 68px;
      margin-right: 15px;
    }

    p {
      line-height: 24px;

      .priceColor {
        color: #fe0000;
        font-size: 14px;
      }
    }

    i {
      color: #fe0000;
      font-style: normal;
      font-size: 14px;
    }

    em {
      font-style: normal;
      font-size: 24px;
      color: #fe0000;
    }
  }

  .topCon {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .el-radio-group {
    display: block;
  }

  .wePayCon {
    .container {
      min-height: 400px;

      .wepay_con {
        padding: 20px 15px;
      }

      .wePay_code_con {
        padding-top: 50px;

        p {
          line-height: 20px;
          color: #333;
        }

        .readyPay_btn {
          line-height: 32px;
          padding: 0 15px;
          position: relative;
          border-radius: 8px;
        }

        .code_image_con {
          .pay_code_img {
            display: block;
            width: 300px;
            height: 300px;
            margin: 15px auto;
          }

          .pay_code_sao {
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }

  .choosePayType {
    color: #fe0000;
  }
</style>