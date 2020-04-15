<!-- 申请售后引导页 -->
<template>
  <div class="table_tk">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="order-title">
          <i class="el-icon-tickets"></i> 订单管理
          <span style="color:black">>申请售后</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container_admin">
      <div class="bg"></div>
      <div class="order">
        <span style="font-size:16px">请选择服务类型</span>
        <div class="line"></div>
        <div class="oder_info">
          <img class="sotp" v-lazy="imgBaseUrl+goodsInfo.ProImage" alt="商品图片" />
          <el-row style="padding-top:10px;">
            <p style="font-size:16px;color:black;margin-bottom:10px">订单信息</p>
            <el-col :span="6" style="line-height:30px;">
              订单号：
              <span
                title="查看订单详情"
                style="color:#F48484;cursor:pointer"
                @click="jumpDesc(goodsInfo.OrderCode)"
              >{{goodsInfo.OrderCode}}</span>
            </el-col>
            <el-col :span="8" style="line-height:30px">商品：{{goodsInfo.ProName}}</el-col>
            <el-col :span="6" style="line-height:30px">商品数量：{{goodsInfo.ProCount}}&nbsp;件</el-col>
            <el-col
              :span="6"
              style="line-height:30px"
            >商品总金额：￥{{parseFloat(goodsInfo.ProTotalPrice).toFixed(2)}}</el-col>
            <el-col
              :span="8"
              style="line-height:30px"
            >运费：￥{{parseFloat(goodsInfo.TransFee).toFixed(2)}}</el-col>
            <el-col
              :span="6"
              style="line-height:30px"
            >综合税金：￥{{parseFloat(goodsInfo.TaxAmount).toFixed(2)}}</el-col>
            <el-col
              :span="6"
              style="line-height:30px"
            >支付金额：￥{{parseFloat(goodsInfo.PayPrice).toFixed(2)}}</el-col>
          </el-row>
        </div>
        <div class="tkxx_box">
          <div style="flex:1;cursor: pointer;" title="申请补偿" @click="applyBC('申请补偿')">
            <img class="dq" src="~assets/img/tksqbc.png" alt="申请补偿" />
            <span class="text-span">申请补偿</span>
          </div>
          <div style="flex:1;cursor: pointer;" title="仅退款" @click="applyBC('仅退款')">
            <img class="dq" src="~assets/img/tkjtk.png" alt="仅退款" />
            <span class="text-span">仅退款</span>
          </div>
          <div style="flex:1;cursor: pointer;" title="退货退款" @click="applyBC('退货退款')">
            <img class="dq" src="~assets/img/tkthtk.png" alt="退货退款" />
            <span class="text-span">退货退款</span>
          </div>
        </div>
      </div>
      <div class="order1">
        <span style="font-size:16px">服务说明</span>
        <div class="line1"></div>
        <div class="tk_des">
          <div class="tkmskg">1.申请补偿</div>
          <div class="tkmskg">
            <p>申请条件：若您收到商品后发现商品存在瘪罐（仅奶粉）、包装破损、商品生产日期不合适等情况，您无需退货，请选择“申请补偿”选项。</p>
            <p>退款原因：瘪罐（仅奶粉）、包装破损、商品生产日期不合适</p>
            <p>退款流程：1.申请退款 > 2. 客服同意退款申请>3.退款成功</p>
          </div>
          <div class="tkmskg" style="margin-top: 10px;">2.仅退款</div>
          <div>
            <p style="margin-top: 5px;">申请条件：若您未收到货或收到的货物不全，请选择“仅退款”选项。</p>
            <p>退款原因：没有收到商品、快递少件、拒收该商品（商品破损等）、拒收该商品（无理由拒收）</p>
            <p>退款流程：1.申请退款 > 2. 客服同意退款申请>3.退款成功</p>
          </div>
          <div class="tkmskg" style="margin-top: 10px;">3.退货退款</div>
          <div>
            <p style="margin-top: 5px;">申请条件：若您收到的货物与预期不符或者影响售卖，需要退还已收到的货，请选择“退货退款”选项，退货后请保留物流底单</p>
            <p>退款原因：爆罐（仅奶粉）、瘪罐（仅奶粉）、包装破损、商品生产日期不合适、商品发错、无理由退货</p>
            <p>退货流程：1.申请退货 >2.客服发送退货地址给买家 >3.买家退货并填写退货物流信息 >4.客服确认收货，退款成功</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
import { API } from "~/_config/API.js";
import { _CONFIG } from "~/_config/config.js";
import "~/assets/css/order.css";
export default {
  data() {
    return {
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      goodsInfo: ""
    };
  },
  created() {},
  mounted() {
    API.afterSaleValidateCust({
      SN: this.$route.query.SN,
      OrderCode: this.$route.query.OrderCode,
      rdm: this.$route.query.rdm,
      token: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null
    }).then(res => {
      if (res.ResponseId == 1 && res.Message != "唯一校验码不能为空") {
        this.$router.push({
          path: "/404"
        });
      } else if (res.ResponseId == -1) {
        this.$router.push("/login");
      }
    });
    this.getData();
  },
  methods: {
    jumpDesc(code) {
      this.$router.push("/dashboard/order?id=" + code);
    },
    //申请补偿
    applyBC(type) {
      switch (type) {
        case "申请补偿":
          localStorage.setItem("serviceType", "申请补偿");
          break;
        case "仅退款":
          localStorage.setItem("serviceType", "仅退款");
          break;
        case "退货退款":
          localStorage.setItem("serviceType", "退货退款");
          break;
      }
      let obj = this.goodsInfo;
      API.afterSaleValidateCust({
        SN: this.$route.query.SN,
        OrderCode: this.$route.query.OrderCode,
        rdm: this.$route.query.rdm,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId == 1 && res.Message != "唯一校验码不能为空") {
          this.$router.push({
            path: "/404"
          });
        } else if (res.ResponseId == -1) {
          this.$router.push("/login");
        } else {
          this.$router.push({
            path: "/dashboard/afterSaleShbc",
            query: {
              SN: obj.SN,
              OrderCode: obj.OrderCode,
              rdm: this.$route.query.rdm
            }
          });
        }
      });
    },
    // 获取数据
    getData() {
      API.getSHSQList({
        SN: this.$route.query.SN,
        ordercode: this.$route.query.OrderCode,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId != 0) {
          // this.$message.error(res.Message);
          // this.$store.commit("LOGOUT");
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.$router.push({
                path: "/login"
              });
            }
          });
        } else if (res.ResponseId == -1) {
          // this.$store.commit("LOGOUT");
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.$router.push({
                path: "/login"
              });
            }
          });
        } else {
          this.allWeight = res.Data.TotalGrossWeight;
          this.goodsInfo = res.Data;
        }
      });
    }
  }
};
</script>

<style scoped>
.dq {
  margin-right: 10px;
  vertical-align: middle;
}
.dq:hover {
  margin-right: 10px;
  vertical-align: middle;
  opacity: 0.7;
}
.bg {
  width: 100%;
  height: 15px;
  background: #f6f6f6;
  position: absolute;
  left: 0;
}

.order-title {
  font-size: 16px;
  font-weight: 600 !important;
}

.order1 {
  width: 100%;
  border-collapse: collapse;
  margin-top: 60px;
  box-sizing: content-box !important;
}
.order {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px;
  box-sizing: content-box !important;
}

.tk_bg {
  width: 100%;
}

.line1 {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  margin: 17px 0 17px 0;
}
.line {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  margin: 13px 0 30px 0;
}
p {
  color: #999999;
  line-height: 30px;
}
.tkmskg {
  margin-top: 5px;
}
.oder_info {
  margin-bottom: 40px;
  display: flex;
}
.tkxx_box {
  text-align: center;
  display: flex;
  padding: 36px;
  background: url("~assets/img/tkbg.png") no-repeat;
}
.sotp {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  padding: 5px;
  display: block;
  width: 150px;
  height: 150px;
  margin-right: 20px;
}
.text-span {
  color: #f05454;
  font-size: 16px;
}
.text-span:hover {
  opacity: 0.7;
}
</style>
<style lang="scss" >
.table_tk {
}
</style>