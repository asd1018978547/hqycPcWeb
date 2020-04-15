<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="order-title">
          <i class="el-icon-tickets"></i> 订单管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container_admin">
      <el-menu
        :default-active="menuIndex"
        class="clearfix"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="-1">全部订单</el-menu-item>
        <el-menu-item index="10">
          待支付
          <span
            class="badge"
            v-show="orderCountInfo.WaitingPayOrderTotalCount"
          >{{orderCountInfo.WaitingPayOrderTotalCount>99?'99+':orderCountInfo.WaitingPayOrderTotalCount}}</span>
        </el-menu-item>
        <el-menu-item index="20,25,30,35,40,50">
          待发货
          <span
            class="badge"
            v-show="orderCountInfo.WaitingSendingOrderTotalCount"
          >{{orderCountInfo.WaitingSendingOrderTotalCount>99?'99+':orderCountInfo.WaitingSendingOrderTotalCount}}</span>
        </el-menu-item>
        <el-menu-item index="60">
          待收货
          <span
            class="badge"
            v-show="orderCountInfo.WaitingReceiveOrdertalCount"
          >{{orderCountInfo.WaitingReceiveOrdertalCount>99?'99+':orderCountInfo.WaitingReceiveOrdertalCount}}</span>
        </el-menu-item>
        <el-menu-item index="70">
          已完成
          <span
            class="badge"
            v-show="orderCountInfo.FinishedOrderTotalCount"
          >{{orderCountInfo.FinishedOrderTotalCount>99?'99+':orderCountInfo.FinishedOrderTotalCount}}</span>
        </el-menu-item>
        <el-menu-item index="80,90,100,110">
          退款售后
          <span
            class="badge"
            v-show="orderCountInfo.RefundAfterSaleOrderCount"
          >{{orderCountInfo.RefundAfterSaleOrderCount>99?'99+':orderCountInfo.RefundAfterSaleOrderCount}}</span>
        </el-menu-item>
      </el-menu>
      <div class="handle-box">
        <el-row>
          <el-col :span="6">
            <span class="table_titles">订单编号：</span>
            <el-input :maxlength="50" clearable placeholder="请输入订单编号" v-model="search.orderNumber"></el-input>
          </el-col>
          <el-col :span="6">
            <span class="table_titles">身份证号：</span>
            <el-input :maxlength="18" clearable placeholder="请输入身份证号" v-model="search.cardNumber"></el-input>
          </el-col>
          <el-col :span="6">
            <span class="table_titles">手机号：</span>
            <el-input :maxlength="11" clearable placeholder="请输入手机号" v-model="search.phoneNumber"></el-input>
          </el-col>
          <el-col :span="6">
            <span class="table_titles">姓名：</span>
            <el-input :maxlength="20" clearable placeholder="请输入收件人姓名" v-model="search.name"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="table_titles">原始订单编号：</span>
            <el-input
              :maxlength="50"
              clearable
              placeholder="请输入原始订单编号"
              v-model="search.extOrderCode"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <span class="table_titles">订单类型：</span>
            <el-select
              size="mini"
              clearable
              @change="typechange"
              v-model="search.tradeType"
              placeholder="请选择"
            >
              <el-option
                size="mini"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            <span class="table_titles">订单日期：</span>
            <el-date-picker
              size="mini"
              @change="timeChange"
              v-model="search.timeRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-col>
          <el-button type="danger" @click="getData" size="mini">查询</el-button>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button type="danger" @click="exportExl" size="mini">导出订单</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="bg"></div>
      <table
        class="order"
        v-loading="table_loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
      >
        <thead>
          <tr>
            <th width="20" align="center">
              <el-checkbox @change="toggleCheck" v-model="checkAll"></el-checkbox>
            </th>
            <th>商品</th>
            <th>单价</th>
            <th>数量</th>
            <th>结算</th>
            <th>收货信息</th>
            <th width="75">状态</th>
            <th width="50">商品操作</th>
            <th width="50">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="tableData.length == 0">
            <td class="text-center color99" colspan="9" style="height: 40px;">暂无数据</td>
          </tr>
          <template v-for="(item,i) in tableData">
            <tr class="nb" :key="i">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr class="td_title" :key="item.OrderCode + i">
              <td :rowspan="item.Detail.length + 1" align="center">
                <el-checkbox
                  v-if="item.OrderStatus == 10 && item.OrderType != 3"
                  @change="toggleItemCheck"
                  v-model="item.isCheck"
                ></el-checkbox>
              </td>
              <td colspan="8">
                <span>
                  <i>订单类型：</i>
                  {{item.OrderTypeDesc || "暂无类型"}}
                </span>
                <span class="color-red">
                  <i>订单ID：</i>
                  <span @click="jumpDesc(item.OrderCode)">{{item.OrderCode}}</span>
                </span>
                <span>
                  <i>下单日期：</i>
                  {{item.DateAdded | moment }}
                </span>
                <span>
                  <i>订单来源：</i>
                  {{item.SourceDesc || '商城'}}
                </span>
                <span v-show="item.ExtOrderCode">
                  <i>外部订单号：</i>
                  {{item.ExtOrderCode}}
                </span>
                <span @click="contactServe" style="position: absolute;right: 4px;">
                  <img class="contact_img" src="~assets/img/contact.png" />
                  联系客服
                </span>
              </td>
            </tr>
            <tr v-for="(ite,idx) in item.Detail" :key="ite.id">
              <td class="lh24" @click="jumpDesc(item.OrderCode)">
                <div class="goods_info">
                  <img v-lazy="imgBaseUrl+ite.Image" alt />
                  <p class="goods_name">{{ite.Name}}</p>
                  <p>
                    <i>商品编码：</i>
                    {{ite.SN}}
                  </p>
                  <p>
                    <i>规格：</i>
                    {{ite.Standard}}
                  </p>
                  <p v-if="ite.Expiration">
                    <i>效期：</i>
                    {{ite.Expiration}}
                  </p>
                </div>
              </td>
              <td class="tc lh24">¥ {{ite.Price.toFixed(2)}}</td>
              <td class="tc">{{ite.Count}}</td>
              <template v-if="idx == 0">
                <td class="tc lh24 td_price" style="width:170px" :rowspan="item.Detail.length">
                  <i>商品金额：</i>
                  <span>¥ {{item.GoodsMoney.toFixed(2)}}</span>
                  <br />
                  <i>运费：</i>
                  <span>¥ {{item.TransFee.toFixed(2)}}</span>
                  <br />
                  <i v-if="item.OrderType != 3">综合税费：</i>
                  <span v-if="item.OrderType != 3">¥ {{item.TaxAmount}}</span>
                  <br v-if="item.OrderType != 3" />
                  <i>合计：</i>
                  <span>¥{{parseFloat(item.OrderMoney).toFixed(2)}}</span>
                </td>
                <td class="lh24" :rowspan="item.Detail.length">
                  <i>收件人：</i>
                  {{item.Consignee}}
                  <br />
                  <i>电话：</i>
                  {{item.ConsigneePhone}}
                  <br v-if="item.OrderType != 3" />
                  <i v-if="item.OrderType != 3">身份证号：</i>
                  <template v-if="item.OrderType != 3">{{item.ConsigneeIdNum}}</template>
                </td>
                <td
                  class="tc"
                  style="width: 60px;"
                  :class="getStatusColor(item.OrderStatus)"
                  :rowspan="item.Detail.length"
                >{{item.OrderStatusDesc}}</td>
              </template>
              <td class="tc" style="width: 60px;">
                <!--展示 -->
                <span v-if="item.OrderStatusDesc =='待付款'"></span>
                <div v-else>
                  <span
                    v-if="ite.OrderStutasDesc =='退款关闭'"
                    title="点击查看详情"
                    style="cursor:pointer;color:#23A8F5;margin:0 0 8px 0"
                    @click="jumpDetail(ite)"
                  >{{ite.OrderStutasDesc}}</span>
                  <el-button
                    v-if="ite.RefundButtonStatus === 1 && item.OrderStatusDesc !='待付款'"
                    style="margin:2px 0 0 0"
                    class="sh_btn tc"
                    size="small"
                    @click="sqshClick(ite)"
                  >
                    <span v-if="ite.OrderStutasDesc =='退款关闭'">重新申请</span>

                    <span v-else>申请售后</span>
                  </el-button>
                  <el-popover placement="top-start" title="温馨提示" width="200" trigger="hover">
                    <p>{{ite.RefundTimeOutDesc}}</p>
                    <el-button
                      slot="reference"
                      v-if="ite.RefundButtonStatus === 2 && item.OrderStatusDesc !='待付款'"
                      class="sh_btn tc"
                      style="color: #C0C4CC;cursor: not-allowed;background-image: none;background-color: #FFF;border-color: #EBEEF5;"
                      size="small"
                    >申请售后</el-button>
                  </el-popover>
                  <!--不要删这段代码-->
                  <span v-if="ite.RefundButtonStatus === 0 && item.OrderStatusDesc !='待付款'">
                    <!-- <span>{{item.OrderStutasDesc}}</span> -->
                    <span
                      title="点击查看详情"
                      style="cursor:pointer;color:#23A8F5"
                      v-if="ite.OrderStutasDesc != ''"
                      @click="jumpDetail(ite)"
                    >{{ite.OrderStutasDesc}}</span>
                    <span v-else></span>
                  </span>
                </div>
              </td>
              <template v-if="idx == 0">
                <td :rowspan="item.Detail.length" class="operation" width="50">
                  <p
                    v-if="item.OrderStatus === 10"
                    type="danger"
                    size="mini"
                    @click="payOrder(item)"
                  >支付</p>
                  <p
                    @click="cancelOrder(item.OrderCode)"
                    v-if="item.OrderStatus === 10"
                    type="info"
                    size="mini"
                  >取消</p>
                  <p
                    @click="refundOrder(item.OrderCode,item)"
                    v-if="item.OrderStatus == 25 ||item.OrderStatus == 30 || item.OrderStatus == 35 ||item.OrderStatus == 40 ||item.OrderStatus == 50"
                    type="info"
                    size="mini"
                  >退款</p>
                  <p @click="jumpDesc(item.OrderCode)" type="primary" size="mini">明细</p>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="cur_page"
          :page-sizes="[10,15,50,100]"
          :page-size="cur_size"
          layout="total, prev, pager, next, jumper, sizes"
          :total="totalRows"
        ></el-pagination>
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
      <div slot="footer" class="dialog-footer">
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
      <el-radio v-model="refundRadio" label="订单信息提交错误">订单信息提交错误</el-radio>
      <br />
      <br />
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundOrderVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="subRefund" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 下载订单窗口 -->
    <div class="modal flex flex-column" v-show="modalFlag">
      <p class="title clearfix">
        订单导出
        <i class="el-icon-close pointer lr" @click="modalFlag = false"></i>
      </p>
      <div class="info_success flex1 flex flex-column flex-s-c text-center">
        <a
          target="_blank"
          :href="orderLink"
          style="margin-top:10px;color:#23a8f5;"
          @click="modalFlag = false"
        >点击下载</a>
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
      checkedLength: 0,
      allCheckLength: 0,
      OrderCodea: "",
      checkAll: false,
      //搜索选项
      search: {
        orderNumber: "", //订单编号
        cardNumber: "", //身份证号
        phoneNumber: "", //手机号
        tradeType: "", // 订单类型
        timeRange: "",
        name: "",
        extOrderCode: ""
      },
      baseSearch: {},
      timeRange: [],
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      radio: "",
      cancelOrderCode: 0,
      totalRows: 0,
      //时间选择器配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      options: [
        {
          label: "跨境直邮",
          value: 1
        },
        {
          label: "保税备货",
          value: 2
        },
        {
          label: "一般贸易",
          value: 3
        }
      ],
      tableData: [],
      cur_page: 1,
      cur_size: 15,
      refundType: 0,
      defaultActive: "-1",
      table_loading: true,
      menuIndex: "-1",
      cancelOrderVisible: false,
      orderCountInfo: {},
      modalFlag: false,
      orderLink: "",
      refundOrderVisible: false,
      refundOrderCode: "",
      refundRadio: "",
      batchInfo: {}
    };
  },
  mounted() {
    this.menuIndex = this.$route.query.index || "-1";
    this.checkAll = false;
    this.getOrderCount();
    this.getData();
    this.baseSearch = JSON.parse(JSON.stringify(this.search));
  },
  methods: {
    //格式化日期
    dateFormat(fmt, date) {
      let d = new Date(date);
      let ret;
      const opt = {
        "Y+": d.getFullYear().toString(), // 年
        "m+": (d.getMonth() + 1).toString(), // 月
        "d+": d.getDate().toString(), // 日
        "H+": d.getHours().toString(), // 时
        "M+": d.getMinutes().toString(), // 分
        "S+": d.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    jumpDetail(val) {
      this.$router.push({
        path: "/dashboard/afterSaleShbcStep2",
        query: { RefundOrderCode: val.RefundOrderCode }
      });
    },
    //跳转到客服
    contactServe() {
      let u = "https://chat.xiankefu.com/?bid=8c827410baf6caf4c810e9b9bce25f9a";
      window.open(u);
    },
    sqshClick(code) {
      API.afterSaleValidate({
        SN: code.SN,
        OrderCode: code.OrderCode,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId != -1) {
          console.log("res: ", res);
          this.$router.push({
            path: "/dashboard/afterSale",
            query: {
              SN: code.SN,
              OrderCode: code.OrderCode,
              rdm: res.Data.rdm
            }
          });
        } else {
          this.$message.error("您还未登录，请先登录");
          this.$router.push("/login");
        }
      });
    },
    toggleCheck(v) {
      this.checkAll = v;
      this.tableData.map(v => {
        if (v.OrderStatus == 10 && v.OrderType != 3) {
          v.isCheck = this.checkAll;
          if (this.checkAll) this.checkedLength += 1;
        }
      });
      if (!v) this.checkedLength = 0;
      if (this.checkedLength == 0) this.checkAll = false;
    },
    toggleItemCheck(v) {
      v ? (this.checkedLength += 1) : (this.checkedLength -= 1);
      if (this.allCheckLength == this.checkedLength) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    batchPay() {
      let oarr = [];
      this.tableData.map(v => {
        if (v.isCheck) {
          oarr.push(v.OrderCode);
        }
      });
      if (oarr.length < 1) return;
      this.$confirm(
        "批量支付请选择360浏览器、QQ浏览器、UC浏览器、百度浏览器等双核浏览器，不然无法进行支付",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        window.open(
          _CONFIG.url +
            "payCenter/moPay/mopay_retailer_batch.aspx?partnerId=20000&token=" +
            this.$store.state.loginStatus.loginedUser.token +
            "&orderCodes=" +
            oarr.join(",")
        );
        this.$confirm(
          "请在新打开的网银支付页面完成支付后，根据支付结果选择，支付结果可能存在延迟，请稍后刷新重试",
          "支付完成前请不要关闭此窗口！",
          {
            confirmButtonText: "支付完成",
            cancelButtonText: "支付遇到问题",
            type: "error"
          }
        )
          .then(() => {
            this.reload();
          })
          .catch(() => {
            this.reload();
          });
      });
    },
    reload() {
      this.search = JSON.parse(JSON.stringify(this.baseSearch));
      this.cur_page = 1;
      this.checkAll = false;
      this.checkedLength = 0;
      this.menuIndex = "-1";
      this.getData();
    },
    timeChange(msg) {
      if (msg == null) {
        this.timeRange = [];
        return;
      }
      let arr = this.search.timeRange.map(v => {
        let time = new Date(v).getTime();
        return new Date(time);
      });
      this.timeRange = arr;
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
    //跳转
    jumpDesc(code) {
      this.$router.push("/dashboard/order?id=" + code);
    },
    payOrder(item) {
      this.checkInventory(item.OrderCode, res => {
        if (res.ResponseId == 0) {
          this.$router.push({
            path: "/pay",
            query: {
              orderNum: item.OrderCode
            }
          });
        } else {
          this.$message.error(res.Message);
        }
      });
    },
    toGoodsDetail(item) {
      let { href } = this.$router.resolve({
        path: "/goodDetail",
        query: {
          goodsId: item.ProId
        }
      });
      window.open(href, "_blank");
    },
    //取消订单
    subCancel() {
      if (this.radio == "") {
        this.$message.error("请选择取消原因");
        return;
      }
      API.cancelOrder({
        ordercode: this.cancelOrderCode,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        cancelReason: this.radio
      }).then(res => {
        this.cancelOrderVisible = false;
        if (res.ResponseId == 0) {
          this.$message({
            message: "取消订单成功",
            type: "success"
          });
          this.radio = "";
          this.getData();
          this.getOrderCount();
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
    },
    cancelOrder(code) {
      this.cancelOrderVisible = true;
      this.cancelOrderCode = code;
    },
    refundOrder(code, item) {
      this.OrderCodea = code;
      if (item.PayOrderBatchId != "") {
        this.$confirm(
          "该订单为批量支付订单，退款只能批量退款，该批次所有订单都会被退款，是否继续？",
          "提示",
          {
            confirmButtonText: "继续",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.refundOrderVisible = true;
            this.refundType = 2;
            this.refundOrderCode = code;
          })
          .catch(() => {});
      } else {
        this.refundType = 1;
        this.refundOrderVisible = true;
        this.refundOrderCode = code;
      }
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
        case "订单信息提交错误":
          this.RefundReasonCode = "RRC015";
          this.RefundReasonDesc = "订单信息提交错误";
          break;
      }
      let para = {
        OrderCode: this.OrderCodea,
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
            duration: 1000,
            type: "success"
          });
          this.refundRadio = "";
          this.getData();
          this.getOrderCount();
        } else if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
        } else {
          this.$message.error(res.Message);
        }
      });
    },
    //订单状态颜色
    getStatusColor(status) {
      switch (status) {
        case 0:
          return "chanel";
        case 10:
          return "error";
        case 20:
          return "error";
        case 30:
          return "success";
        case 40:
          return "success";
        case 50:
          return "success";
        case 60:
          return "success";
        case 70:
          return "success";
        default:
          return "";
      }
    },
    //选择订单类型
    typechange(val) {
      this.tradeType = val;
    },
    //时间转换
    getTime(t) {
      if ((t == "") | (t == undefined)) return "";
      let time = new Date(t);
      return (
        time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
      );
    },
    //选择订单类型
    handleSelect(key, keyPath) {
      this.menuIndex = key;
      this.cur_page = 1;
      this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.cur_size = val;
      this.getData();
    },
    // 获取数据
    getData() {
      let param = {
        refundType: 1
      };
      // API.getPayBackType(param).then(res => {
      //   if (res.ResponseId != 0) {
      //     // this.isLoginOut(res);
      //   } else {

      //   }
      // });

      this.table_loading = true;
      API.getOrderLIst({
        orderCode: this.search.orderNumber,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        dateRange1:
          this.timeRange.length > 0
            ? [
                this.getTime(this.timeRange[0]) + " 00:00:00",
                this.getTime(this.timeRange[1]) + " 23:59:59"
              ]
            : "",
        consigneePhone: this.search.phoneNumber,
        idNum: this.search.cardNumber,
        pageIndex: this.cur_page,
        pageSize: this.cur_size,
        storeType: this.search.tradeType,
        status: this.menuIndex,
        consignee: this.search.name,
        extOrderCode: this.search.extOrderCode
      }).then(res => {
        if (res.ResponseId == 0) {
          this.totalRows = res.Data.TotalRows;
          this.cur_page = res.Data.PageIndex;
          this.tableData = res.Data.Data.map(v => {
            v.isCheck = false;
            if (v.PayOrderBatchId != "") {
              if (typeof this.batchInfo[v.PayOrderBatchId] != "object") {
                this.batchInfo[v.PayOrderBatchId] = [];
              }
              this.batchInfo[v.PayOrderBatchId].push(v.OrderCode);
            }
            if (v.OrderStatus == 10) {
              this.allCheckLength += 1;
            }
            return v;
          });
        } else if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
        }
        this.$nextTick(() => {
          this.table_loading = false;
        });
      });
    },
    getOrderCount() {
      API.orderCount({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId == 0) {
          this.orderCountInfo = res.Data;
        } else if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.$router.push({ path: "/login" });
            }
          });
        } else {
          this.$message({
            message: res.Message,
            type: "error"
          });
        }
      });
    },
    exportExl() {
      if (this.search.timeRange.length == 0) {
        this.$message.error("请先选择下单日期范围");
        return;
      }
      let startDate = new Date(this.search.timeRange[0]).getTime(),
        endDate = new Date(this.search.timeRange[1]).getTime();
      let diff = (endDate - startDate) / 1000 / 60 / 60 / 24;
      if (diff > 30) {
        this.$message.error("订单导出时间间隔不可超过30天");
        return;
      }
      let params = {
        orderCode: this.search.orderNumber,
        dateRange1:
          this.timeRange.length > 0
            ? [
                this.getTime(this.timeRange[0]) + " 00:00:00",
                this.getTime(this.timeRange[1]) + " 23:59:59"
              ]
            : "",
        consigneePhone: this.search.phoneNumber,
        idNum: this.search.cardNumber,
        pageIndex: this.cur_page,
        pageSize: this.cur_size,
        storeType: this.search.tradeType,
        status: this.menuIndex,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        consignee: this.search.name,
        extOrderCode: this.search.extOrderCode
      };
      let $loading = this.$loading();
      API.exportOrder(params).then(res => {
        $loading.close();
        if (res.ResponseId == 0) {
          window.open(res.Data.fileLink);
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
  }
};
</script>

<style scoped>
.goods_info {
  position: relative;
  width: 280px;
  margin: 0;
}

.goods_info img {
  position: absolute;
  width: 70px;
  height: 70px;
}

.goods_info p {
  padding-left: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 24.3px;
  line-height: 24.3px;
  white-space: nowrap;
}

.td_price {
  width: 140px;
}

.td_price i,
.td_price span {
  float: left;
}

.td_price i {
  width: 80px;
  text-align: right;
}

.td_price span {
  width: 60px;
  text-align: left;
}

.nb td {
  border: none !important;
}

.order i {
  color: #999999;
}

.bg {
  width: 100%;
  height: 15px;
  background: #f6f6f6;
  position: absolute;
  left: 0;
}

.operation p {
  line-height: 24px;
  color: #23a8f5;
  cursor: pointer;
}

.operation a:hover {
  color: #f56c6c;
}

.handle-box .el-input {
  flex: 1;
}

.table_titles {
  line-height: 28px;
  text-align: right;
}

.el-date-editor {
  width: 300px !important;
}

.order-title {
  font-size: 18px;
  font-weight: 600 !important;
}

.td_title span {
  margin-right: 30px;
}

.lh24 {
  line-height: 24px;
}

.el-col {
  padding-right: 5px;
  display: flex;
}

.el-row {
  padding-bottom: 20px;
}

.time {
  color: #909399;
  font-size: 13px;
}

.order {
  width: 101%;
  border-collapse: collapse;
  margin-top: 25px;
  box-sizing: content-box !important;
}
.order * {
  box-sizing: content-box !important;
}

.order * {
  font-size: 12px !important;
}

.operation {
  text-align: center;
}

.operation button {
  margin: 5px 0;
}

.el-dialog__body {
  padding: 0 20px !important;
}

.order th {
  font-size: 14px;
  padding: 7px 0;
  background: #f6f6f6;
}

.order .tc {
  text-align: center;
}

.order td {
  font-size: 14px;
  padding: 7px 11px;
}

.order td {
  border: 1px solid #dcdfe6;
  color: #303133;
}

.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  padding: 0 30px;
}

.handle-box {
  margin-top: 55px;
}

.td_title {
  background: rgba(242, 242, 242, 1);
  cursor: pointer;
}

.el-select {
  width: 160px !important;
  line-height: 1 !important;
}

.success {
  color: #67c23a !important;
}

.chanel {
  color: #909399 !important;
}

.error {
  color: #f56c6c !important;
}

.color-red {
  color: #fe0000;
}

.goods_name:hover {
  color: #fe0000;
  text-decoration: underline;
  cursor: pointer;
}

.badge {
  background: #f05454;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  font-size: 12px;
  font-weight: normal;
  border-radius: 50%;
  transform: scale(0.8);
  margin-left: 4px;
}

.modal {
  width: 328px;
  height: 190px;
  background: #fff;
  box-shadow: 0px 0px 5px #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 14px;
}

.modal .title {
  line-height: 42px;
  padding: 0 15px;
  font-size: 14px;
  border-width: 1px;
  border-bottom: 1px solid #eee;
  color: #999;
}

.modal .title .el-icon-close {
  color: #333;
  font-size: 18px;
  margin-top: 10px;
}
.contact_img {
  margin: 0 auto;
  vertical-align: middle;
  height: 17px;
}
/* .sh_btn {
  width: 70px;
} */
</style>
<style lang="scss" scoped>
.table {
  .el-button--small {
    padding: 7px 11px !important;
  }
}
</style>