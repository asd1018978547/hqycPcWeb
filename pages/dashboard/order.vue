<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 订单详情
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container_admin">
      <div class="infoBox pd15">
        <ul>
          <li>
            当前状态：
            <span class="bigFont">{{goodsInfo.BaseInfo.OrderStatusDesc}}</span>
          </li>
          <li
            class="w100"
            v-if="goodsInfo.PayInfo == null && goodsInfo.BaseInfo.OrderStatusDesc == '退款中'"
          >
            退款金额：
            <span class="red mr20">¥{{parseFloat(goodsInfo.BaseInfo.RefundAmount).toFixed(2)}}</span>
            退款原因：
            <span
              style="margin-right:200px"
            >{{goodsInfo.BaseInfo.RefundReasonDesc == ''? '暂无原因':goodsInfo.BaseInfo.RefundReasonDesc}}</span>
            申请退款时间：
            <span class="mr20">{{goodsInfo.BaseInfo.RefundDate}}</span>
          </li>
          <li class="w100" v-if="goodsInfo.PayInfo == null && goodsInfo.BaseInfo.OrderStatus != 0">
            应付金额：
            <span
              class="red mr20"
            >¥{{parseFloat(goodsInfo.BaseInfo.FinnalMoney+goodsInfo.BaseInfo.TransFee+goodsInfo.BaseInfo.TaxAmount).toFixed(2)}}</span>
            剩余
            <span class="red">{{endTime}}</span>进行付款，超期未付的订单系统将自动取消
          </li>
          <li v-if="goodsInfo.BaseInfo.OrderStatus == 0 && goodsInfo.BaseInfo.CancelReason">
            <span>取消原因：{{goodsInfo.BaseInfo.CancelReason}}</span>
          </li>
          <li v-if="goodsInfo.PayInfo == null">
            <el-button
              v-if="goodsInfo.BaseInfo.OrderStatus === 10"
              type="danger"
              size="mini"
              @click="payOrder"
            >立即付款</el-button>
            <el-button
              @click="cancelOrder(goodsInfo.BaseInfo.OrderCode)"
              v-if="goodsInfo.BaseInfo.OrderStatus === 10"
              type="info"
              plain
              size="mini"
            >取消订单</el-button>
          </li>
          <li
            v-if="goodsInfo.BaseInfo.OrderStatus==25||goodsInfo.BaseInfo.OrderStatus==30||goodsInfo.BaseInfo.OrderStatus==35||goodsInfo.BaseInfo.OrderStatus==40||goodsInfo.BaseInfo.OrderStatus==50"
          >
            <el-button
              type="danger"
              size="mini"
              @click="refundOrder(goodsInfo.BaseInfo.OrderCode)"
            >申请退款</el-button>
          </li>
        </ul>
        <div class="clearfix"></div>
        <div
          v-if="goodsInfo.BaseInfo.OrderStatusDesc == '退款中' || goodsInfo.BaseInfo.OrderStatus === 90"
          class="line"
          style="margin: 11px 0 15px 0;"
        ></div>
        <span
          v-if="goodsInfo.BaseInfo.OrderStatusDesc == '退款中'"
          style="color:#999999;margin-left:10px"
        >*您的退款申请已提交，请耐心等待商家处理。</span>
        <span
          v-if="goodsInfo.BaseInfo.OrderStatus === 90"
          style="color:#999999;margin-left:10px"
        >*商家已同意您的退款申请，一般情况下，订单款项会于1-7个工作日原路返回至您的账户</span>
      </div>
      <div
        class="infoBox"
        v-if="goodsInfo.BaseInfo.ExpNum != '' && goodsInfo.BaseInfo.OrderStatus >= 60"
      >
        <h4>物流信息</h4>
        <ul class="pay">
          <li class="w100">
            物流公司：
            <span>{{goodsInfo.BaseInfo.ExpName}}</span>
          </li>
          <li class="w100">
            运单号码：
            <span>{{goodsInfo.BaseInfo.ExpNum}}</span>
          </li>
          <li class="wlinfo" v-show="ExpDesc.length!=0">
            <p v-for="(item,index) in ExpDesc" :key="index">
              <span>{{item.AcceptTime}}</span>
              <span>{{item.AcceptStation}}</span>
            </p>
          </li>
          <li v-show="ExpDesc.length ==0">暂无物流信息</li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="infoBox">
        <h4>基本信息</h4>
        <ul class="infoBox_left">
          <li>订单信息</li>
          <li v-if="goodsInfo.BaseInfo.StoreType">
            <i>订单类型：</i>
            {{goodsInfo.BaseInfo.StoreType}}
          </li>
          <li v-if="goodsInfo.BaseInfo.Source">
            <i>订单提交方式：</i>
            {{goodsInfo.BaseInfo.Source}}
          </li>
          <li v-if="goodsInfo.BaseInfo.OrderStatusDesc">
            <i>订单状态：</i>
            {{goodsInfo.BaseInfo.OrderStatusDesc}}
          </li>
          <li v-if="goodsInfo.BaseInfo.OrderCode">
            <i>订单编号：</i>
            {{goodsInfo.BaseInfo.OrderCode}}
          </li>
          <li v-if="goodsInfo.BaseInfo.DateAdded">
            <i>订单提交时间：</i>
            {{goodsInfo.BaseInfo.DateAdded | moment('yyyy-MM-dd hh:mm:ss')}}
          </li>
          <li v-if="goodsInfo.BaseInfo.PayDate">
            <i>支付时间：</i>
            {{goodsInfo.BaseInfo.PayDate}}
          </li>
          <li v-if="goodsInfo.BaseInfo.Channel">
            <i>订单来源：</i>
            {{goodsInfo.BaseInfo.Channel}}
          </li>
          <li v-if="goodsInfo.BaseInfo.ExtOrderCode">
            <i>订单外部编号：</i>
            {{goodsInfo.BaseInfo.ExtOrderCode}}
          </li>
          <li
            v-if="goodsInfo.BaseInfo.MemoOfRetailer"
            style="word-wrap:break-word; word-break:break-all;line-height: 20px;"
          >
            <i>订单留言：</i>
            {{goodsInfo.BaseInfo.MemoOfRetailer}}
          </li>
        </ul>
        <ul class="infoBox_right">
          <li>收货信息</li>
          <li class="w100">
            <i>收件人：</i>
            <span>{{goodsInfo.ReceiverInfo.Receiver}}</span>
          </li>
          <li class="w100">
            <i>电话：</i>
            <span>{{goodsInfo.ReceiverInfo.Phone}}</span>
          </li>
          <li class="w100" v-if="goodsInfo.BaseInfo.OrderType != 3">
            <i>身份证号：</i>
            <span>{{goodsInfo.ReceiverInfo.IdNum}}</span>
          </li>
          <li class="w100">
            <i>收件地址：</i>
            <span>{{goodsInfo.ReceiverInfo.Province + goodsInfo.ReceiverInfo.City + goodsInfo.ReceiverInfo.District + goodsInfo.ReceiverInfo.Address}}</span>
          </li>
        </ul>
        <div class="clearfix"></div>
        <h4 class="nb">订购商品信息</h4>
        <div class="table_box">
          <table>
            <thead>
              <tr>
                <th width="500">商品信息</th>
                <th>单价</th>
                <th>订购数量</th>
              </tr>
            </thead>
            <tr v-for="(item,index) in goodsInfo.Items" :key="index">
              <td class="imgBox">
                <div class="img">
                  <img v-lazy="getUrl(item.Image)" @click="toGoodsDetail(item)" />
                </div>
                <div>
                  <p class="goods_name" @click="toGoodsDetail(item)">{{item.NameCN}}</p>
                  <p>{{item.Standard}}</p>
                  <p>
                    <i>商品编码：</i>
                    {{item.SN}}
                  </p>
                  <p v-if="item.Expiration">
                    <i>效期：</i>
                    {{item.Expiration}}
                  </p>
                  <p
                    style="cursor:pointer;color:#00b0ff"
                    @click="showTKDetail(item)"
                    title="点击查看详情"
                    v-if="item.OrderStutasDesc !=''"
                  >{{item.OrderStutasDesc}}</p>
                
                  <span v-else class="textcenter"></span>
                  <span v-if="item.OrderStatusDesc =='待付款'"></span>
                  <span v-else>
                    <el-button
                      v-if="item.RefundButtonStatus === 1 && item.OrderStatusDesc !='待付款'"
                      class="sh_btn tc"
                      size="small"
                      title="点击申请售后"
                      @click="sqshClick(item)"
                    >
                      <span v-if="item.OrderStutasDesc =='退款关闭'">重新申请</span>

                      <span v-else>申请售后</span>
                    </el-button>
                    <el-popover placement="top-start" title="温馨提示" width="200" trigger="hover">
                      <p>{{item.RefundTimeOutDesc}}</p>
                      <el-button
                        slot="reference"
                        v-if="item.RefundButtonStatus === 2 && item.OrderStatusDesc !='待付款'"
                        class="sh_btn tc"
                        style="color: #C0C4CC;cursor: not-allowed;background-image: none;background-color: #FFF;border-color: #EBEEF5;"
                        size="small"
                      >申请售后</el-button>
                    </el-popover>
                  </span>
                </div>
              </td>
              <td class="textcenter">¥{{item.Price}}</td>
              <td class="textcenter">{{item.Count}}件</td>
            </tr>
          </table>
        </div>
        <div class="price">
          <p>
            商品金额：
            <span class="color_black">¥{{goodsInfo.BaseInfo.FinnalMoney.toFixed(2)}}</span>
          </p>
          <p>
            商品运费({{allWeight.toFixed(2)}}kg)：
            <span
              class="color_black"
            >¥{{goodsInfo.BaseInfo.TransFee.toFixed(2)}}</span>
          </p>
          <p v-if="goodsInfo.BaseInfo.OrderType != 3">
            综合税费：
            <span class="color_black">¥{{goodsInfo.BaseInfo.TaxAmount.toFixed(2)}}</span>
          </p>
          <p>
            合计金额：
            <span
              class="span_bolder"
            >¥{{(goodsInfo.BaseInfo.FinnalMoney+goodsInfo.BaseInfo.TransFee+goodsInfo.BaseInfo.TaxAmount).toFixed(2)}}</span>
          </p>
        </div>
        <div class="clearfix"></div>
        <div v-if="goodsInfo.PayInfo != null">
          <h4>支付信息</h4>
          <ul class="pay">
            <li class="w100">
              支付方式：
              <span>{{goodsInfo.PayInfo.PayTypeDesc}}</span>
            </li>
            <li class="w100">
              支付金额：¥
              <span>{{parseFloat(goodsInfo.PayInfo.Amount).toFixed(2)}}</span>
            </li>
            <li class="w100">
              支付时间：
              <span>{{goodsInfo.PayInfo.DateAdded}}</span>
            </li>
            <li class="w100">
              订单编号：
              <span>{{goodsInfo.PayInfo.OrderCode}}</span>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </div>
      <!--取消订单-->
      <el-dialog title="选择取消原因" :visible.sync="cancelOrderVisible" width="400px">
        <el-radio v-model="radio" label="重复下单">重复下单</el-radio>
        <br />
        <br />
        <el-radio v-model="radio" label="商品价格无优势">商品价格无优势</el-radio>
        <br />
        <br />
        <el-radio v-model="radio" label="订单提交信息错误">订单提交信息错误</el-radio>
        <br />
        <br />
        <div slot="footer">
          <el-button @click="cancelOrderVisible = false">取 消</el-button>
          <el-button type="primary" @click="subCancel">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 退款 -->
      <el-dialog title="选择退款原因" :visible.sync="refundOrderVisible" width="400px">
        <el-radio v-model="refundRadio" label="重复下单">重复下单</el-radio>
        <br />
        <br />
        <el-radio v-model="refundRadio" label="商品价格无优势">商品价格无优势</el-radio>
        <br />
        <br />
        <el-radio v-model="refundRadio" label="订单提交信息错误">订单提交信息错误</el-radio>
        <br />
        <br />
        <div slot="footer">
          <el-button @click="refundOrderVisible = false">取 消</el-button>
          <el-button type="primary" @click="subRefund">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { ali_oss_data } from "~/_config/config.js";
import { API } from "~/_config/API.js";
import { _CONFIG } from "~/_config/config.js";
export default {
  data() {
    return {
      endTime: "",
      allWeight: 0,
      goodsInfo: {
        BaseInfo: {
          StoreType: "",
          FinnalMoney: 0,
          TransFee: 0,
          TaxAmount: 0,
          Source: "",
          OrderStatusDesc: "",
          OrderCode: "",
          DateAdded: "",
          PayDate: "",
          Channel: "",
          ExtOrderCode: "",
          MemoOfRetailer: ""
        },
        Items: {},
        PayInfo: {},
        ReceiverInfo: {
          Receiver: "",
          Phone: "",
          IdNum: "",
          Province: "",
          City: "",
          District: "",
          Address: ""
        }
      },
      cancelOrderVisible: false,
      cancelOrderCode: "",
      radio: 1,
      ExpDesc: [],
      refundOrderVisible: false,
      refundOrderCode: "",
      refundRadio: ""
    };
  },
  methods: {
    showTKDetail(item) {
      this.$router.push({
        path: "/dashboard/afterSaleShbcStep2",
        query: { RefundOrderCode: item.RefundOrderCode }
      });
    },
    sqshClick(code) {
      this.$router.push({
        path: "/dashboard/afterSale",
        query: code
      });
    },
    toGoodsDetail(item) {
      let { href } = this.$router.resolve({
        path: "/goodDetail",
        query: {
          goodsId: item.ProId,
          type: this.goodsInfo.BaseInfo.OrderType
        }
      });
      window.open(href, "_blank");
    },
    getUrl(url) {
      return ali_oss_data.URL_IMG_SHOW + url;
    },
    getEndTime(time) {
      var now = new Date(time);
      now.setMinutes(now.getMinutes() - new Date().getTimezoneOffset());
      let sTime = new Date(now).getTime() + 7200000;
      let eTime = sTime - new Date().getTime();
      if (eTime < 1000) {
        clearInterval(window.timeInterval);
        return "支付已超时";
      }
      let day = parseInt(eTime / 1000 / 60 / 60 / 24);
      day = day > 0 ? day + "天" : "";
      return (
        day +
        (parseInt(eTime / 1000 / 60 / 60) % 24) +
        "小时" +
        Math.floor((eTime / 1000 / 60) % 60) +
        "分" +
        Math.floor((eTime / 1000) % 60) +
        "秒"
      );
    },
    getData() {
      API.getOrderInfo({
        ordercode: this.$route.query.id,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId != 0) {
          this.$message.error(res.Message);
        } else if (res.ResponseId == -1) {
          this.$store.commit("LOGOUT");
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
          let arr = this.goodsInfo.BaseInfo.ExpDesc
            ? JSON.parse(this.goodsInfo.BaseInfo.ExpDesc)
            : [];
          arr = arr.sort((v1, v2) => {
            let time1 = new Date(v1["AcceptTime"]).getTime();
            let time2 = new Date(v2["AcceptTime"]).getTime();
            if (time1 > time2) {
              return -1;
            } else if (time1 < time2) {
              return 1;
            } else {
              return 0;
            }
          });
          this.ExpDesc = arr;
          this.$nextTick(() => {
            clearInterval(window.timeInterval);
            window.timeInterval = setInterval(() => {
              this.endTime = this.getEndTime(this.goodsInfo.BaseInfo.DateAdded);
            }, 1000);
          });
        }
      });
    },
    checkInventory(code, callback) {
      API.checkInventory({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        orderCode: code
      }).then(res => {
        callback(res);
      });
    },
    payOrder() {
      let code = this.goodsInfo.BaseInfo.OrderCode;
      this.checkInventory(code, res => {
        if (res.ResponseId == 0) {
          this.$router.push({
            path: "/pay",
            query: {
              orderNum: code
            }
          });
        } else {
          this.$message.error(res.Message);
        }
      });
    },
    //取消订单
    subCancel() {
      API.cancelOrder({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        ordercode: this.cancelOrderCode,
        cancelReason: this.radio
      }).then(res => {
        this.cancelOrderVisible = false;
        if (res.ResponseId == 0) {
          this.$message({
            message: "取消订单成功",
            type: "success"
          });
          this.getData();
        } else if (res.ResponseId == -1) {
          this.$store.commit("LOGOUT");
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
          this.$message.error(res.Message);
        }
      });
    },
    cancelOrder(code) {
      this.cancelOrderVisible = true;
      this.cancelOrderCode = code;
    },
    refundOrder(code) {
      this.refundOrderVisible = true;
      this.refundOrderCode = code;
    },
    subRefund() {
      if (this.refundRadio == "") {
        this.$message.error("请选择退款原因");
        return;
      }
      switch (this.refundRadio) {
        case "重复下单":
          this.RefundReasonCode = "RRC013";
          this.RefundReasonDesc = "重复下单";
          break;
        case "商品价格无优势":
          this.RefundReasonCode = "RRC014";
          this.RefundReasonDesc = "商品价格无优势";
          break;
        case "订单提交信息错误":
          this.RefundReasonCode = "RRC015";
          this.RefundReasonDesc = "订单信息提交错误";
          break;
      }
      let para = {
        OrderCode: this.goodsInfo.BaseInfo.OrderCode,
        RefundMethodCode: "RMC004",
        RefundMethodDesc: "退款",
        RefundReasonCode: this.RefundReasonCode,
        RefundReasonDesc: this.RefundReasonDesc,
        refundExplain: " ",
        Token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      };
      API.szPayBack(para).then(res => {
        this.refundOrderVisible = false;
        if (res.ResponseId == 0) {
          this.$message({
            message: "申请退款成功",
            duration: 2000,
            type: "success"
          });
          this.refundRadio = "";
          this.getData();
        } else if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
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
          this.$message.error(res.Message);
        }
      });
    }
  },
  mounted: function() {
    this.getData();
  }
};
</script>
<style scoped>
.pd15 {
  padding-bottom: 15px;
}
.pay li {
  color: #999999 !important;
}
.pay li span {
  color: #333 !important;
}
.pay li:nth-child(1) {
  font-size: 12px !important;
}
.color_black {
  color: #333333 !important;
}
.table_box {
  padding: 15px;
}
.nb {
  border: none !important;
}
.infoBox_left,
.infoBox_right {
  width: 50%;
  float: left;
  box-sizing: border-box;
  position: relative;
}

.infoBox_right::before {
  content: " ";
  height: 100%;
  background: #eeeeee;
  width: 1px;
  position: absolute;
  left: -1px;
  top: 15px;
}

.infoBox_left li i,
.infoBox_right li i {
  color: #999999;
}

h4 {
  font-size: 16px;
  font-weight: 400;
}

.mr20 {
  margin-right: 20px;
}

.bigFont {
  font-size: 20px;
  font-weight: 600;
}

.wlinfo {
  width: 95% !important;
  overflow-x: hidden;
  display: block;
  margin-top: 15px;
  padding: 0 15px;
  margin-bottom: 15px;
  overflow-y: scroll;
  height: 150px !important;
}

.wlinfo p {
  line-height: 24px;
  text-indent: 15px;
  position: relative;
  color: #333 !important;
  border-left: 1px solid #dedede;
}
.wlinfo p:nth-child(1) {
  font-weight: bolder;
}
.wlinfo p:nth-child(1)::before {
  background: #f05454;
}
.wlinfo p::before {
  content: " ";
  width: 9px;
  height: 9px;
  background: #dedede;
  left: -5px;
  top: 7px;
  position: absolute;
  border-radius: 50%;
}

.w100 {
  width: 100% !important;
}

.red {
  color: #ff0000;
}
.span_bolder {
  font-size: 18px;
  font-weight: bolder !important;
}
.imgBox p i {
  color: #999999;
}
.price {
  width: 170px;
  float: right;
  padding-right: 20px;
  font-size: 13px;
  box-sizing: content-box;
}

.price p {
  height: 28px;
  line-height: 28px;
}

.price p span {
  color: #ff0000;
  float: right;
}

.clearfix {
  clear: both;
}

.infoBox {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding-left: 15px;
}

.infoBox:nth-last-child(1) {
  margin-bottom: 0;
}

.infoBox h4 {
  padding: 15px;
  border-bottom: 1px solid #eeeeee;
}

.infoBox ul {
  padding: 15px;
}

.infoBox ul li {
  list-style: none;
  float: left;
  width: 50%;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}

.infoBox ul li:nth-child(1) {
  width: 100%;
  font-size: 14px;
}

.w100 {
  width: 100% !important;
}

.textcenter {
  text-align: center;
}

.infoBox table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #eaeaea;
}

.infoBox table th {
  font-size: 12px;
  background: #f6f6f6;
  color: #999999;
  font-weight: 300;
  padding: 8px 0;
}

.infoBox table td {
  border-bottom: 1px solid #eaeaea;
  padding: 5px 0;
}

.infoBox table td {
  font-size: 14px;
}
.goods_name:hover {
  color: #fe0000;
  text-decoration: underline;
  cursor: pointer;
}
.line {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  margin: -10px 0 15px -15px;
}
td {
  vertical-align: middle;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
td.middle {
  vertical-align: middle;
}

.imgBox {
  display: flex;
  padding-left: 20px !important;
}

.imgBox .img img {
  width: 100px;
  height: 100px;
}

.imgBox p {
  padding-left: 10px;
  font-size: 14px;
  line-height: 24px;
}
</style>