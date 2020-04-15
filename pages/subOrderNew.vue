<template>
  <div class="main">
    <v-top></v-top>
    <div class="topCon">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span
          class="flex1"
          style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;"
          >订单提交</span
        >
      </div>
    </div>
    <div id="sub" class="sub marginTop20">
      <div class="container white-bg">
        <div class="top np">
          <h4 class="bb normal_title">
            订购方式
            <span v-if="listData.length > 0">{{
              listData[0].ExpressType
            }}</span>
          </h4>
        </div>
        <div class="top">
          <h4 class="normal_title size18" style="line-height:10px;">
            订购商品信息
            <span
              v-if="listData.length > 1"
              style="color:#f56c6c;line-height:30px;"
            >
              根据海关规定，购买数量超过单笔订单的清关额度上限或最大装箱数，需要您分
              <span style="font-size: 20px;margin:0 5px;">{{
                listData.length
              }}</span
              >个订单支付。
            </span>
          </h4>
          <table>
            <tbody>
              <tr>
                <th width="70">
                  <el-checkbox
                    v-if="listData.length > 1"
                    v-model="checkA"
                    @change="checkAll"
                    >全选</el-checkbox
                  >
                </th>
                <th>商品信息</th>
                <th>规格价</th>
                <th>规格数量</th>
                <th>运费</th>
                <th>税费</th>
                <th>金额合计</th>
                <!-- <th>代购价</th> -->
              </tr>
              <template v-for="(ite, index) in listData">
                <tr v-if="listData.length > 1" :key="'tr-' + index">
                  <td colspan="8" align="left" style="text-align:left;">
                    <el-checkbox
                      @change="
                        res => {
                          toggleCheck(res, index);
                        }
                      "
                      v-model="ite._isCheck"
                      >订单{{ index + 1 }}</el-checkbox
                    >
                    <span style="color:#999999;margin-left:15px;"
                      >共计{{ ite.allCount }}件商品</span
                    >
                  </td>
                </tr>
                <tr
                  v-for="(item, ii) in ite.Detail"
                  style="border-left:1px solid #eee;border-right:1px solid #eee;"
                  :key="'tr1' + ii"
                >
                  <td></td>
                  <td class="goods_info">
                    <div class="imgbox">
                      <img :src="imgBaseUrl + item.Image" alt />
                    </div>
                    <div class="desc" style="padding-left:20px">
                      <p>{{ item.Name }}</p>
                      <p v-show="item.Code">
                        <span>编号：</span>
                        {{ item.Code }}
                      </p>
                      <p v-show="item.GrossWeight">
                        <span>重量：</span>
                        {{ item.GrossWeight }}kg
                      </p>
                      <p v-show="item.StandardInfo" style="color:#333">
                        <span style="color:#999">规格：</span>
                        {{ item.StandardInfo }}
                      </p>
                    </div>
                  </td>
                  <td style="vertical-align:middle">
                    ¥ {{ parseFloat(item.Price).toFixed(2) }}
                  </td>
                  <td style="vertical-align:middle">{{ item.ProCount }}</td>
                  <td style="vertical-align:middle">
                    ¥ {{ parseFloat(ite.TransFee).toFixed(2) }}
                  </td>
                  <td style="vertical-align:middle">
                    ¥ {{ parseFloat(ite.TotalTaxRate).toFixed(2) }}
                  </td>
                  <td
                    style="vertical-align:middle;border-right: 1px solid #eeeeee;"
                  >
                    ¥ {{ parseFloat(ite.OrderTotalPrice).toFixed(2) }}
                  </td>
                </tr>
                <tr
                  v-show="!ite._addressShow"
                  v-if="listData.length > 1"
                  :key="'tr2-' + index"
                >
                  <td
                    colspan="8"
                    style="text-align:left"
                    v-show="ite.addressee.info.allAddress == ''"
                  >
                    <el-button
                      plain
                      @click="changeAddressShow(index, true)"
                      class
                      type="danger"
                      size="mini"
                      >添加收货地址</el-button
                    >
                    <span style="color:#999999;margin-left:15px;"
                      >每个拆分订单都需要添加收货地址</span
                    >
                  </td>
                  <td
                    colspan="8"
                    style="text-align:left"
                    v-show="ite.addressee.info.allAddress != ''"
                  >
                    <i
                      class="el-icon-location"
                      style="color:#f56c6c;margin-right: 5px;"
                    ></i>
                    <span style="color:#f56c6c">寄送至：</span>
                    <span>
                      {{ ite.addressee.info.allAddress }}（{{
                        ite.addressee.info.Contact
                      }}收）{{ ite.addressee.info.Phone }}
                    </span>
                    <el-button
                      style="font-size:14px;"
                      type="text"
                      @click="changeAddressShow(index, true)"
                      >修改本地址</el-button
                    >
                  </td>
                </tr>
                <tr
                  v-show="ite._addressShow"
                  v-if="listData.length > 1"
                  :key="index"
                >
                  <td colspan="8" style="text-align:left;padding: 0">
                    <div class="marginTop20">
                      <h4
                        class="normal_title size18"
                        style="font-size:16px !important;"
                      >
                        订单{{ index + 1 }}收件人信息
                        <span
                          v-if="expType != 3"
                          style="color:#fe0000;margin-left:10px;"
                          >(根据海关清关需要，请使用真实有效的收件人信息)</span
                        >
                      </h4>
                      <div class="box" style="border-bottom:0">
                        <el-row>
                          <el-col :span="3">
                            <span class="time">收件人姓名：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change($event)"
                              :maxlength="20"
                              placeholder="请输入姓名"
                              v-model="ite.addressee.name"
                            ></el-input>
                          </el-col>
                          <el-col :span="2">
                            <el-button
                              plain
                              @click="showModel(index)"
                              class="checkUser"
                              type="danger"
                              size="mini"
                              >选择收件人</el-button
                            >
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="3">
                            <span class="time">收件人电话：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change($event)"
                              :maxlength="11"
                              placeholder="请输入电话"
                              v-model="ite.addressee.phone"
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row v-if="expType != 3">
                          <el-col :span="3">
                            <span class="time">收件人身份证号：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change($event)"
                              :maxlength="18"
                              placeholder="请输入身份证号"
                              v-model="ite.addressee.cardNumber"
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="3">
                            <span class="time">详细地址：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-cascader
                              @change="getCityPrice(ite)"
                              v-model="ite.addressee.city"
                              separator="-"
                              placeholder="请选择地址"
                              :props="areaOptions"
                              :options="areaData"
                              filterable
                            ></el-cascader>
                            <el-input
                              @input="change($event)"
                              :maxlength="200"
                              class="descAddress"
                              placeholder="请输入详细地址"
                              v-model="ite.addressee.address"
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="3">
                            <div style="visibility:hidden">123</div>
                          </el-col>
                          <el-col :span="6">
                            <el-button
                              plain
                              @click="changeAddressShow(index, false)"
                              type="danger"
                              size="mini"
                              >确定</el-button
                            >
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="listData.length == 1" :key="index">
                  <td colspan="8" style="text-align:left;padding: 0">
                    <div class="marginTop20">
                      <h4
                        class="normal_title size18"
                        style="font-size:16px !important;"
                      >
                        收件人信息
                        <span
                          v-if="expType != 3"
                          style="color:#fe0000;margin-left:10px;"
                          >(根据海关清关需要，请使用真实有效的收件人信息)</span
                        >
                      </h4>
                      <div class="box" style="border-bottom:0">
                        <el-row>
                          <el-col :span="3">
                            <span class="time">收件人姓名：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change($event)"
                              :maxlength="20"
                              placeholder="请输入姓名"
                              v-model="ite.addressee.name"
                            ></el-input>
                          </el-col>
                          <el-col :span="2">
                            <el-button
                              plain
                              @click="showModel(index)"
                              class="checkUser"
                              type="danger"
                              size="mini"
                              >选择收件人</el-button
                            >
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="3">
                            <span class="time">收件人电话：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change1($event)"
                              :maxlength="11"
                              placeholder="请输入电话"
                              v-model="ite.addressee.phone"
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row v-if="expType != 3">
                          <el-col :span="3">
                            <span class="time">收件人身份证号：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-input
                              @input="change($event)"
                              :maxlength="18"
                              placeholder="请输入身份证号"
                              v-model="ite.addressee.cardNumber"
                            ></el-input>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="3">
                            <span class="time">详细地址：</span>
                          </el-col>
                          <el-col :span="6">
                            <el-cascader
                              @change="getCityPrice(ite)"
                              v-model="ite.addressee.city"
                              separator="-"
                              placeholder="请选择地址"
                              :props="areaOptions"
                              :options="areaData"
                              filterable
                            ></el-cascader>
                            <el-input
                              @input="change($event)"
                              :maxlength="200"
                              class="descAddress"
                              placeholder="请输入详细地址"
                              v-model="ite.addressee.address"
                            ></el-input>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="top marginTop20">
          <h4 class="normal_title size18">订单留言</h4>
          <el-input
            @input="change($event)"
            :maxlength="200"
            class="textarea"
            type="textarea"
            :rows="3"
            placeholder="请输入留言内容"
            v-model="textarea"
          ></el-input>
        </div>
        <div class="top marginTop20">
          <h4 class="normal_title size18">发票信息</h4>
          <p v-if="expType != 3" style="margin-top: 20px;font-size: 14px;">
            保税仓发货商品与海外仓发货商品属跨境海外商品，无法开具国内发票
          </p>
          <p v-else style="margin-top: 20px;font-size: 14px;">
            暂无法开具发票，如需开具发票，请联系客服。
          </p>
        </div>
        <div class="top marginTop20">
          <h4 class="normal_title size18">订单结算</h4>
          <div class="allPrice">
            <p>
              商品金额
              <span>¥ {{ parseFloat(allGoodsPrice).toFixed(2) }}</span>
            </p>
            <p>
              运费
              <span>¥ {{ parseFloat(allTransFee).toFixed(2) }}</span>
            </p>
            <p>
              税费
              <span>¥ {{ parseFloat(allTaxAmount).toFixed(2) }}</span>
            </p>
            <p>
              应付总金额
              <span>¥ {{ allPrice }}</span>
            </p>
          </div>
        </div>
        <div class="subBtn">
          <span class="sub_btn active" @click="sub">提交订单</span>
        </div>
        <!--弹窗组件-->
        <el-dialog
          @open="getCustomer"
          top="5vh"
          custom-class="search"
          title="我的收件人"
          :visible.sync="dialogFormVisible"
          width="75%"
        >
          <el-row>
            <el-col :span="20">
              <el-input
                @input="change($event)"
                :placeholder="
                  expType != 3 ? '输入身份证号、姓名、电话' : '输入姓名、电话'
                "
                v-model="search.cardNumber"
              >
                <template slot="prepend">搜索：</template>
              </el-input>
            </el-col>
            <el-col :span="2">
              <el-button
                type="danger"
                plain
                size="mini"
                @click="getCustomer"
                @keydown.native.enter="getCustomer"
                >查询</el-button
              >
            </el-col>
          </el-row>
          <el-table
            :data="tableData"
            border
            cell-class-name="search_cell"
            @row-dblclick="choiceRow"
          >
            <el-table-column
              class-name="tbfs"
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              class-name="tbfs"
              prop="Contact"
              label="姓名"
              width="80"
            ></el-table-column>
            <el-table-column
              class-name="tbfs"
              v-if="expType != 3"
              prop="IDNum"
              label="身份证号"
              width="180"
            ></el-table-column>
            <el-table-column
              class-name="tbfs"
              prop="Phone"
              label="手机号"
              width="120"
            ></el-table-column>
            <el-table-column
              class-name="tbfs"
              prop="allAddress"
              label="地址"
            ></el-table-column>
            <el-table-column class-name="tbfs" label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  @click="choiceRow(scope.row)"
                  type="text"
                  size="small"
                  >选择</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="tottlePage"
          ></el-pagination>
        </el-dialog>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>
<script>
import { ali_oss_data } from "~/_config/config.js";
import vLogo from "~/components/vLogo";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import "~/assets/css/subOrder.css";
import { API } from "~/_config/API.js";
import { RegExp, AREA } from "~/tools/index";
import { _CONFIG } from "~/_config/config.js";
export default {
  components: {
    vLogo,
    vBottom,
    vTop
  },
  data() {
    return {
      checkA: false,
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      tableData: [],
      //弹窗
      dialogFormVisible: false,
      //搜索
      search: {
        cardNumber: "",
        name: "",
        phone: ""
      },
      listData: [],
      channel: "",
      expType: 0,
      extOrderCode: "",
      //订单留言
      textarea: "",
      addressee: {
        name: "",
        phone: "",
        cardNumber: "",
        city: []
      },
      //城市选择器
      areaOptions: {
        value: "Code",
        label: "Name",
        children: "Children"
      },
      areaData: [],
      info: {
        ExpressType: ""
      },
      TotalGrossWeight: 0,
      allTransFee: 0,
      allTaxAmount: 0,
      allWidth: 0,
      allGoodsPrice: 0,
      preOrderCode: "",
      currentPage: 1,
      tottlePage: 1,
      proInfos: {},
      selectedIndex: -1,
      numControl: false,
      allp: 0
    };
  },
  computed: {
    allPrice() {
      return this.allp.toFixed(2);
    },
    countError() {
      let a = 0;
      if (this.proInfos.proInfo) {
        for (let i = 0; i < this.proInfos.proInfo.length; i++) {
          let c = this.proInfos.proInfo[i].count;
          a += c;
          if (c > 8) return true;
        }
      }
      if (a > 25) return true;
    },
    error_text() {}
  },
  methods: {
    getCityPrice(item) {
      API.calcOrderCityPrice({
        OrderCode: item.PreOrderCode,
        OrderType: item.ExpressTypeId,
        ProvinceCode: item.addressee.city[0],
        CityCode: item.addressee.city[1],
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.Data) {
          item.TransFee = res.Data.transfee;
          // item.Detail[0].TransFee = Number(res.Data.transfee);
          // item.Detail[0].TaxRate = res.Data.totaltaxrate;
          // item.Detail[0].TaxRate = res.Data.totaltaxrate;
          item.TotalTaxRate = res.Data.totaltaxrate;
          item.OrderTotalPrice = this.floatAdd(
            this.floatAdd(res.Data.transfee, res.Data.totaltaxrate),
            res.Data.skutotalprice
          );
          this.getPrice();
        }
      });
    },
    toggleCheck(val, index) {
      const o = this.listData[index];
      o._isCheck = val;
      this.listData.splice(index, 1, o);
      let l = 0;
      this.listData.map(v => {
        if (v._isCheck) {
          l += 1;
        }
      });
      if (l == this.listData.length) {
        this.checkA = true;
      } else {
        this.checkA = false;
      }
      this.getPrice();
    },
    checkAll(val) {
      this.checkA = val;
      this.listData.map(v => {
        v._isCheck = val;
      });
      this.getPrice();
    },
    getPrice() {
      let tw = 0;
      let atf = 0;
      let ata = 0;
      let agp = 0;
      let all = 0;
      this.listData.map(v => {
        if (v._isCheck || this.listData.length == 1) {
          tw = this.floatAdd(tw, v.TotalGrossWeight);
          atf = this.floatAdd(atf, v.TransFee);
          ata = this.floatAdd(ata, v.TotalTaxRate);
          v.Detail.map(item => {
            agp = this.floatAdd(agp, item.Price * item.ProCount);
          });
          all = this.floatAdd(all, v.OrderTotalPrice);
        }
      });
      this.allp = all;
      this.allGoodsPrice = agp;
      this.TotalGrossWeight = tw;
      this.allTransFee = atf;
      this.allTaxAmount = ata;
    },
    showModel(index) {
      this.selectedIndex = index;
      this.dialogFormVisible = true;
    },
    changeAddressShow(index, f) {
      const o = this.listData[index];
      let areaDatas = this.areaData;
      if (!f) {
        for (let x = 0; x < areaDatas.length; x++) {
          for (let y = 0; y < areaDatas[x].Children.length; y++) {
            for (let z = 0; z < areaDatas[x].Children[y].Children.length; z++) {
              if (
                o.addressee.city[0] == areaDatas[x].Code &&
                o.addressee.city[1] == areaDatas[x].Children[y].Code &&
                o.addressee.city[2] == areaDatas[x].Children[y].Children[z].Code
              ) {
                o.addressee.info.Contact = o.addressee.Name;
                o.addressee.info.allAddress =
                  areaDatas[x].Name +
                  areaDatas[x].Children[y].Name +
                  areaDatas[x].Children[y].Children[z].Name +
                  o.addressee.address;
                o.addressee.info.Phone = o.addressee.phone;
              }
            }
          }
        }
        let v = o;
        if (v.addressee.name == "") {
          this.$message.error("收件人姓名不能为空");
          return;
        }
        if (
          RegExp.regEn.test(v.addressee.name) ||
          RegExp.regCn.test(v.addressee.name)
        ) {
          this.$message.error("收件人姓名不正确");
          return;
        }
        if (!RegExp.phone.test(v.addressee.phone)) {
          this.$message.error("手机号不正确");
          return;
        }
        if (!this.regIdCard(v.addressee.cardNumber) && this.expType != 3) {
          this.$message.error("身份证号码不正确");
          return;
        }
        if (v.addressee.city.length == 0) {
          this.$message.error("请选择城市");
          return;
        }
        if (v.addressee.address.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message.error("请输入详细地址");
          return;
        }
        if (
          RegExp.regEn.test(v.addressee.address) ||
          RegExp.regCn.test(v.addressee.address)
        ) {
          this.$message.error("详细地址不能包含特殊字符");
          return;
        }
        if (this.checkArrDouble(this.listData) != "") {
          this.$message.error(this.checkArrDouble(this.listData));
          return;
        }
        v.addressee.sourceId = 1;

        if (this.expType != 3) {
          API.getIDcardAuth({
            idCard: v.addressee.cardNumber,
            name: v.addressee.name,
            token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          }).then(res => {
            if (res.ResponseId === 0) {
              o._addressShow = f;
              this.listData.splice(index, 1, o);
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
              o.addressee.name = "";
              o.addressee.cardNumber = "";
              this.listData.splice(index, 1, o);
              this.$message.error(res.Message + "请重新填写");
            }
          });
        } else {
          o._addressShow = f;
          this.listData.splice(index, 1, o);
        }
      } else {
        o._addressShow = f;
        this.listData.splice(index, 1, o);
      }
    },
    checkInventory(code, callback) {
      API.checkInventory({
        orderCode: code,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        callback(res);
      });
    },
    sub() {
      let parArr = [];
      for (let x = 0; x < this.listData.length; x++) {
        let v = this.listData[x];
        let index = x + 1;
        if (this.listData.length == 1) index = "错误";
        if (!v._isCheck && this.listData.length > 1) continue;
        if (v.addressee.name == "") {
          this.$message.error("订单" + index + "：收件人姓名不能为空");
          return;
        }
        if (
          RegExp.regEn.test(v.addressee.name) ||
          RegExp.regCn.test(v.addressee.name)
        ) {
          this.$message.error("订单" + index + "：收件人姓名不正确");
          return;
        }
        if (!RegExp.phone.test(v.addressee.phone)) {
          this.$message.error("订单" + index + "：手机号不正确");
          return;
        }
        if (!this.regIdCard(v.addressee.cardNumber) && this.expType != 3) {
          this.$message.error("订单" + index + "：身份证号码不正确");
          return;
        }
        if (v.addressee.city.length == 0) {
          this.$message.error("订单" + index + "：请选择城市");
          return;
        }
        if (v.addressee.address.replace(/(^\s*)|(\s*$)/g, "") == "") {
          this.$message.error("订单" + index + "：请输入详细地址");
          return;
        }
        if (
          RegExp.regEn.test(v.addressee.address) ||
          RegExp.regCn.test(v.addressee.address)
        ) {
          this.$message.error("订单" + index + "：详细地址不能包含特殊字符");
          return;
        }
        parArr.push(v);
      }
      if (parArr.length < 1) {
        this.$message.error("请选择订单");
        return;
      }
      if (this.listData.length == 1) {
        if (this.expType != 3) {
          API.getIDcardAuth({
            idCard: this.listData[0].addressee.cardNumber,
            name: this.listData[0].addressee.name,
            token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          }).then(res => {
            if (res.ResponseId == 0) {
              let arr = [];
              parArr.map(v => {
                let p = {};
                p.preOrderCode = v.PreOrderCode; //预创建单号
                p.addressId = v.addressee.addressId;
                p.memoOfRetailer = this.textarea; //留言
                p.sourceId = 1; //来源
                p.channelId = ""; //渠道
                p.extOrderCode = ""; //外部订单号
                p.idNum = v.addressee.cardNumber;
                p.contact = v.addressee.name;
                p.phone = v.addressee.phone;
                p.province = AREA.getprovince(
                  v.addressee.city[0],
                  this.areaData
                ).Name;
                p.areaCode = v.addressee.city[2];
                p.city = AREA.getcity(
                  v.addressee.city[0],
                  v.addressee.city[1],
                  this.areaData
                ).Name;
                p.district = AREA.getdistrict(
                  v.addressee.city[0],
                  v.addressee.city[1],
                  v.addressee.city[2],
                  this.areaData
                ).Name;
                p.address = v.addressee.address;
                arr.push(p);
              });
              API.batchSubOrder({
                expressType: this.listData[0].ExpressTypeId,
                skuSource: this.proInfos.skuSource,
                token: localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user")).token
                  : null,
                data: arr
              }).then(res => {
                if (res.ResponseId == 0) {
                  if (arr.length == 1) {
                    let code = arr[0].preOrderCode;
                    this.checkInventory(code, response => {
                      if (response.ResponseId == 0) {
                        this.$router.push({
                          path: "/pay",
                          query: {
                            orderNum: code
                          }
                        });
                      } else {
                        this.$router.go(-1);
                        this.$message.error(response.Message);
                      }
                    });
                  } else {
                    this.$router.push({
                      path: "/dashboard/orderCenter"
                    });
                  }
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
              this.$message.error(res.Message);
            }
          });
        } else {
          let arr = [];
          parArr.map(v => {
            let p = {};
            p.preOrderCode = v.PreOrderCode; //预创建单号
            p.addressId = v.addressee.addressId;
            p.memoOfRetailer = this.textarea; //留言
            p.sourceId = 1; //来源
            p.channelId = ""; //渠道
            p.extOrderCode = ""; //外部订单号
            p.idNum = v.addressee.cardNumber;
            p.contact = v.addressee.name;
            p.phone = v.addressee.phone;
            p.province = AREA.getprovince(
              v.addressee.city[0],
              this.areaData
            ).Name;
            p.areaCode = v.addressee.city[2];
            p.city = AREA.getcity(
              v.addressee.city[0],
              v.addressee.city[1],
              this.areaData
            ).Name;
            p.district = AREA.getdistrict(
              v.addressee.city[0],
              v.addressee.city[1],
              v.addressee.city[2],
              this.areaData
            ).Name;
            p.address = v.addressee.address;
            arr.push(p);
          });
          API.batchSubOrder({
            expressType: this.listData[0].ExpressTypeId,
            skuSource: this.proInfos.skuSource,
            token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null,
            data: arr
          }).then(res => {
            if (res.ResponseId == 0) {
              if (arr.length == 1) {
                let code = arr[0].preOrderCode;
                this.checkInventory(code, response => {
                  if (response.ResponseId == 0) {
                    this.$router.push({
                      path: "/pay",
                      query: {
                        orderNum: code
                      }
                    });
                  } else {
                    this.$router.go(-1);
                    this.$message.error(response.Message);
                  }
                });
              } else {
                this.$router.push({
                  path: "/dashboard/orderCenter"
                });
              }
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
      } else {
        let arr = [];
        parArr.map(v => {
          let p = {};
          p.preOrderCode = v.PreOrderCode; //预创建单号
          p.addressId = v.addressee.addressId;
          p.memoOfRetailer = this.textarea; //留言
          p.sourceId = 1; //来源
          p.channelId = ""; //渠道
          p.extOrderCode = ""; //外部订单号
          p.idNum = v.addressee.cardNumber;
          p.contact = v.addressee.name;
          p.phone = v.addressee.phone;
          p.province = AREA.getprovince(
            v.addressee.city[0],
            this.areaData
          ).Name;
          p.areaCode = v.addressee.city[2];
          p.city = AREA.getcity(
            v.addressee.city[0],
            v.addressee.city[1],
            this.areaData
          ).Name;
          p.district = AREA.getdistrict(
            v.addressee.city[0],
            v.addressee.city[1],
            v.addressee.city[2],
            this.areaData
          ).Name;
          p.address = v.addressee.address;
          arr.push(p);
        });
        API.batchSubOrder({
          expressType: this.listData[0].ExpressTypeId,
          skuSource: this.proInfos.skuSource,
          token: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null,
          data: arr
        }).then(res => {
          if (res.ResponseId == 0) {
            if (arr.length == 1) {
              let code = arr[0].preOrderCode;
              this.checkInventory(code, response => {
                if (response.ResponseId == 0) {
                  this.$router.push({
                    path: "/pay",
                    query: {
                      orderNum: code
                    }
                  });
                } else {
                  this.$router.go(-1);
                  this.$message.error(response.Message);
                }
              });
            } else {
              this.$router.push({
                path: "/dashboard/orderCenter"
              });
            }
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
    // 检测地址是否使用两次
    checkArrDouble(arr) {
      let f = true;
      let obj = {};
      for (let x = 0; x < arr.length; x++) {
        let a = arr[x].addressee;
        if (a.name == "") continue;
        if (obj[a.phone]) {
          obj[a.phone] += 1;
        } else {
          obj[a.phone] = 1;
        }
        if (obj[a.cardNumber]) {
          obj[a.cardNumber] += 1;
        } else {
          obj[a.cardNumber] = 1;
        }
        if (obj[a.cardNumber + a.phone]) {
          obj[a.cardNumber + a.phone] += 1;
        } else {
          obj[a.cardNumber + a.phone] = 1;
        }
      }
      let str = "";
      for (let item in obj) {
        
        // if (item.length == 11 && obj[item] > 2 && this.expType != 3) {
        //   str = "同一个电话每天最多使用两次，请重新选择";
        // } else if (item.length == 18 && obj[item] > 2 && this.expType != 3) {
        //   str = "同一个身份证每天最多使用两次，请重新选择";
        // } else if (item.length == 29 && obj[item] > 2 && this.expType != 3) {
        //   str = "同一个收件人每天最多提交两个订单，请重新选择";
        // }
      }
      return str;
    },
    //选择客户
    choiceRow(row) {
      row.sourceId = 1;
      row.orderType = this.expType;

      let o = JSON.parse(JSON.stringify(this.listData[this.selectedIndex]));
      let arr = JSON.parse(JSON.stringify(this.listData));
      o.addressee.name = row.Contact;
      o.addressee.phone = row.Phone;
      o.addressee.cardNumber = row.IDNum;
      o.addressee.address = row.Address;
      o.addressee.city = [row.FirAreaCode, row.SecAreaCode, row.AreaCode];
      o.addressee.addressId = row.AddressId;
      o.addressee.info = row;
      arr.push(o);
      let str = this.checkArrDouble(arr);
      if (str != "") {
        this.$message.error(str);
        return;
      }
      this.listData.splice(this.selectedIndex, 1, o);
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.getCityPrice(this.listData[this.selectedIndex]);
      });
    },
    change(e) {
      this.$forceUpdate();
    },
    change1(e) {
      this.$forceUpdate();
    },
    //获取客户列表
    getCustomer() {
      API.getCustomer({
        info: this.search.cardNumber,
        pageIndex: this.currentPage,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        pageSize: 15
      }).then(res => {
        if (res.ResponseId == 0) {
          for (let x = 0; x < res.Data.Data.length; x++) {
            res.Data.Data[x].allAddress =
              res.Data.Data[x].Province +
              res.Data.Data[x].City +
              res.Data.Data[x].District +
              res.Data.Data[x].Address;
          }
          this.tableData = res.Data.Data;
          this.currentPage = res.Data.PageIndex;
          this.tottlePage = res.Data.TotalPages;
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
          this.$message.error(res.Message);
        }
      });
    },
    regIdCard(val) {
      if (!RegExp.IDcard.test(val)) return false;
      let idCardWi = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      ); //将前17位加权因子保存在数组里
      let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += val.substring(i, i + 1) * idCardWi[i];
      }
      let idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      let idCardLast = val.substring(17); //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        } else {
          return false;
        }
      }
    },
    createOrder(ld) {
      let par = {};
      par = JSON.parse(sessionStorage.getItem("proInfos"));
      if (!par) {
        this.$router.push("/");
        return;
      }
      this.proInfos = par;
      this.allGoodsPrice = this.allWidth = this.allTransFee = this.allTaxAmount = 0;
      this.expType = par.expressType;
      this.numControl = true;
      API.batchCreateOrder({
        BuyData: par.proInfo,
        SourceId: 1,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        expressType: par.expressType,
        userSN: "88888888"
      }).then(rr => {
        if (ld) {
          ld.close();
        }
        if (rr.ResponseId == 0) {
          let res = rr.Data.Order4PreviewItems;
          if (rr.Data.AuthStatus == "0") {
            //等待审核
            this.$message.error("请等待审核通过");
            setTimeout(() => {
              this.$router.push({
                path: "/authDetail"
              });
            }, 1000);
          } else if (rr.Data.AuthStatus == "1") {
            //认证成功
            this.listData = res;
            this.listData.map(v => {
              v.allCount = 0;
              v.addressee = {
                name: "",
                phone: "",
                cardNumber: "",
                address: "",
                city: [],
                info: {
                  allAddress: ""
                }
              };
              v._addressShow = false;
              v._isCheck = false;
              v.Detail.map(item => {
                v.allCount += item.ProCount;
              });
            });
            if (this.listData.length == 1) {
              this.getPrice();
            }
          } else if (rr.Data.AuthStatus == "2") {
            //审核失败
            this.$message.error("请先认证");
            setTimeout(() => {
              this.$router.push({
                path: "/authEdit"
              });
            }, 1000);
          } else {
            //未认证
            this.$message.error("请先认证");
            setTimeout(() => {
              this.$router.push({
                path: "/authNew"
              });
            }, 1000);
          }
        } else if (rr.ResponseId == -1) {
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
            message: rr.Message,
            type: "error"
          });
          this.$router.go(-1);
        }
      });
    },
    getAddress(cb) {
      API.getAddressData({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        res.Data.map(a => {
          a.Children.map(b => {
            b.Children.map(c => {
              delete c.Children;
            });
          });
        });
        this.areaData = res.Data;
        cb();
      });
    },
    floatAdd(arg1, arg2) {
      (arg1 = arg1.toString()), (arg2 = arg2.toString());
      var arg1Arr = arg1.split("."),
        arg2Arr = arg2.split("."),
        d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
      var maxLen = Math.max(d1.length, d2.length);
      var m = Math.pow(10, maxLen);
      var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
      var d = arguments[2];
      return typeof d === "number" ? Number(result.toFixed(d)) : result;
    }
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    this.getAddress(() => {
      this.createOrder(loading);
    });
  },
  watch: {
    currentPage: function() {
      this.getCustomer();
    },
    addressee: {
      handler: function(val) {
        // let f = this.regIdCard(val.cardNumber)
      },
      deep: true
    }
  }
};
</script>
<style>
.tbfs {
  font-size: 12px;
}
</style>

<style lang="less" scoped>
.topCon {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #ececec;
}

.subtn {
  color: #fff;
  border: none;
  border-radius: 0;
  padding: 12px 18px;
  font-size: 14px;

  &.avtive {
    background: #ff0000;
  }

  &.disabled {
    background: #ccc;
  }
}

.zj {
  font-size: 18px;
  color: #ff0000 !important;
}

.allPrice {
  margin-top: 15px;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.textarea {
  margin-top: 15px;
}

.notBT::before {
  content: none !important;
}

.normal_title {
  font-weight: 400;
  font-size: 18px;
  color: #333333;
}

.normal_title em {
  font-style: normal;
  font-size: 13px;
  color: #999999;
}

h4 {
  font-size: 18px;
  font-weight: normal;
}

.size18 {
  font-size: 18px;
}

.bb {
  border-bottom: 1px solid #eeeeee;
  height: 45px;
  line-height: 45px;
}

.np {
  padding: 0 15px !important;
  margin-bottom: 0 !important;
}

h4 span {
  color: #ff0000;
  font-size: 13px;
  margin-left: 15px;
}

.pagination {
  margin-top: 10px;
}

.search_cell {
  padding: 3px 0 !important;
}

.search .el-col {
  margin-right: 15px;
}

.search .el-dialog__header {
  padding: 10px 20px;
}

.subBtn {
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 15px;

  .sub_btn {
    width: 102px;
    border-radius: 2px;
    font-size: 14px;
    background: #ccc;
    color: #808080;
    cursor: not-allowed;
    line-height: 36px;
    text-align: center;

    &.active {
      background: #fe0000;
      color: #fff;
      cursor: pointer;
    }
  }
}

.allPrice p {
  text-align: left;
  width: 220px;
  color: #666666;
  padding: 6px 0;
}

.allPrice p span {
  margin-left: 30px;
  color: #333333;
  text-align: right;
  float: right;
}

.checkUser {
  margin-left: 5px;
  margin-top: 2px;
}

.descAddress {
  margin-top: 10px;
}

.el-cascader {
  width: 100%;
}

.el-col-3 {
  text-align: right;
  line-height: 35px;
  font-size: 14px;
  min-width: 128px;
}

.el-col-3 span.time::before {
  content: "*";
  color: #ff0000;
  font-size: 14px;
  margin-right: 5px;
}

.time {
  color: #666666;
}

.el-row {
  padding: 5px 0;
}

.addressee {
  padding: 10px;
  font-size: 14px;
}

.goods_info {
  position: relative;
  padding: 15px !important;
  width: 420px;
  text-align: center;
}

.goods_info .imgbox {
  width: 105px;
  height: 105px;
  float: left;
  box-sizing: border-box;
}

.goods_info .imgbox img {
  max-width: 100%;
  max-height: 100%;
}

.goods_info .desc {
  float: right;
  width: 285px;
  min-height: 105px;
}

.goods_info p {
  text-align: left;
  width: 100%;
  line-height: 20px;
  color: #333333;
  margin: 5px 0;
}

.goods_info p span {
  color: #999999;
}

.top {
  box-sizing: border-box;
  padding: 10px 15px;
  box-sizing: border-box;
  padding-bottom: 0;
}

.fx {
  border: 1px solid #313131;
  padding: 15px;
  margin-top: 15px;
}

.top table th {
  font-weight: 400;
  padding: 10px 0;
  background: #f6f6f6;
  color: #999999;
}

.top table td {
  text-align: center;
  border-bottom: 1px solid #eeeeee;
  font-size: 13px;
}

.top table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-top: 15px;
}

.box {
  border: 1px solid #eeeeee;
  margin-top: 15px;
  padding: 15px;
  display: block !important;
}

.border-bg {
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
}

td {
  vertical-align: top;
  padding: 10px;

  &.middle {
    vertical-align: middle;
  }
}
</style>
