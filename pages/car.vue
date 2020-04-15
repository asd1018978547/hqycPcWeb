<template>
  <div id="car">
    <v-top></v-top>
    <div class="topCon">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span
          class="flex1"
          style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;"
        >购物车</span>
        <span class="lr">
          <v-search type="link"></v-search>
        </span>
      </div>
    </div>
    <div class="container white-bg marginTop10 contentContainer marginBottom15">
      <div class="clearfix border-bottom">
        <span
          class="top_btn pointer"
          :class="item.active?'active':''"
          @click="changeType(item)"
          v-for="(item,i) in typeList"
          :key="i"
        >{{item.text}}</span>
      </div>
      <div class="nores white-bg" v-show="showList.length==0&&!isLoading">
        <div class="image_con text-center">
          <img src="~assets/img/nores.png" />
          <p class="color80 marginTop10">暂无购物车数据</p>
        </div>
      </div>
      <div class="table_con marginTop15" v-loading="isLoading">
        <el-checkbox-group v-model="checkBoxIndex" @change="handleCheckBoxChange">
          <table class="goods" v-if="showList.length!=0">
            <tr>
              <th width="60">
                <span class="checkbox" :class="checkAll?'active':''" @click="topCheckAllChange"></span>全选
              </th>
              <th >商品</th>
              <th width="100">备货地</th>
              <th>单价</th>
              <th v-if="expressType != 3">税率</th>
              <th width="150">数量</th>
              <th>小计</th>
              <th width="80">操作</th>
            </tr>
            <tr
              v-for="(item,index) in showList"
              :key="index"
              :class="item.Status==0?'goods_invalid':''"
              v-if="item.Status != 0"
            >
              <td class="middle">
                <el-checkbox :label="index">
                  <span></span>
                </el-checkbox>
              </td>
              <td class="goods_info">
                <div class="imgbox pointer" @click="toDetail(item)">
                  <img :src="imgBaseUrl + item.Image" alt />
                </div>
                <div class="desc">
                  <div style="line-height: 20px;">
                    <p class="desc_link pointer ellipsis2" @click="toDetail(item)">{{item.ProName}}</p>
                    <p v-show="item.SN">
                      <span class="color80">编码：</span>
                      {{item.SN}}
                    </p>
                    <p v-show="item.StandardInfo">
                      <span class="color80">规格：</span>
                      {{item.StandardInfo}}
                    </p>
                  </div>
                </div>
              </td>
              <td >{{item.ExpressTypeDesc}}</td>
              <td style="text-align:center;">
                <div style="display:inline-block;text-align:right;">
                  <p>¥{{item.UnMemberPrice.toFixed(2)}}</p>
                </div>
              </td>
              <td  style="text-align:center;" v-if="expressType != 3">{{item.TaxRate}}%</td>
              <td  style="text-align:center;">
                <el-input-number
                :disabled="item.OrderType==1?(item.IsPreView==1? true:false):false"
                  v-if="expressType != 3"
                  v-model="item.Count"
                  :min="1"
                  :max="item.Amount > 99999 ? 99999 : item.Amount"
                  label
                  v-show="item.Status != 0"
                  @change="editCar(item)"
                ></el-input-number>
                <el-input-number
                  v-else
                  :disabled="item.OrderType==1?(item.IsPreView==1? true:false):false"
                  v-model="item.Count"
                  :min="1"
                  label
                  :max="item.Amount"
                  v-show="item.Status != 0"
                  @change="editCar(item)"
                ></el-input-number>
              </td>
              <td  style="text-align:center;">
                <span
                  v-if="item.Status != 0"
                >¥{{parseFloat(isVip?item.Price*item.Count:item.UnMemberPrice*item.Count).toFixed(2)}}</span>
              </td>
              <td class="del pointer" @click="deleteCar(item,index)">删除</td>
            </tr>
            <tr
              v-for="(item,index) in showList"
              :key="index"
              :class="item.Status==0?'goods_invalid':''"
              v-if="item.Status == 0"
            >
              <td class="middle">
                <span class="invalid" v-if="item.Status == 0">失效</span>
              </td>
              <td class="goods_info">
                <div class="imgbox pointer" @click="toDetail(item)">
                  <img :src="imgBaseUrl + item.Image" alt />
                </div>
                <div class="desc">
                  <div style="line-height: 20px;">
                    <p class="desc_link pointer ellipsis2" @click="toDetail(item)">{{item.ProName}}</p>
                    <p v-show="item.SN">
                      <span class="color80">编码：</span>
                      {{item.SN}}
                    </p>
                    <p v-show="item.StandardInfo">
                      <span class="color80">规格：</span>
                      {{item.StandardInfo}}
                    </p>
                  </div>
                </div>
              </td>
              <td>{{item.ExpressTypeDesc}}</td>
              <td>¥{{isVip?item.Price.toFixed(2):item.UnMemberPrice.toFixed(2)}}</td>
              <td></td>
              <td v-if="expressType != 3"></td>
              <td>
                <span class="goods_invalid_num" v-if="item.Status == 0">{{item.StatusDesc}}</span>
              </td>
              <td class="del pointer" @click="deleteCar(item,index)">删除</td>
            </tr>
          </table>
        </el-checkbox-group>
        <div class="bottomCon marginTop15">
          <div class="goOrder border white-bg" v-show="showList.length!=0">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>全选
            <div class="price">
              <div class="price_info">
                <p :class="expressType == 3 ? 'lh65':''">
                  共
                  <span class="priceColor">{{all_count}}</span> 件 总价：
                  <span class="priceColor">￥{{allPrice_Bound}}</span>
                </p>
                <p
                  v-if="expressType != 3"
                >原价：￥{{allPrice}}&nbsp;预估税费：￥{{parseFloat(allPrice_Bound - allPrice).toFixed(2)}}</p>
              </div>
              <div class="go pointer" :class="submitFlag?'active':''" @click="createOrder">下单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-zoom-in-bottom">
      <div class="scroll_group white-bg box-shodow-t" v-show="scrollGroupShow">
        <div class="container">
          <div class="bottomCon">
            <div class="goOrder white-bg" v-show="showList.length!=0">
              <div class="price">
                <div class="price_info">
                  <p>
                    共
                    <span class="priceColor">{{all_count}}</span> 件 总价：
                    <span class="priceColor">￥{{allPrice_Bound}}</span>
                  </p>
                  <p>原价：￥{{allPrice}} &nbsp;预估税费：￥{{parseFloat(allPrice_Bound - allPrice).toFixed(2)}}</p>
                </div>
                <div class="go pointer" :class="submitFlag?'active':''" @click="createOrder">下单</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <v-bottom></v-bottom>
    <v-side></v-side>
  </div>
</template>
<script>
import { ali_oss_data } from "~/_config/config.js";
import vLogo from "~/components/vLogo";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import vSearch from "~/components/vSearchBar";
import vSide from "~/components/vSideBar.vue";
import { API } from "~/_config/API.js";
import { mapState } from "vuex";
import { _CONFIG } from "~/_config/config.js";
export default {
  components: {
    vLogo,
    vSearch,
    vBottom,
    vTop,
    vSide
  },
  data() {
    return {
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      isLoading: true,
      typeList: [
        {
          type: 2,
          text: "保税备货",
          active: true
        },
        {
          type: 1,
          text: "跨境直邮",
          active: false
        },
        {
          type: 3,
          text: "一般贸易",
          active: false
        }
      ],
      expressType: 2,
      boundList: [],
      directList: [],
      checkAll: false,
      checkBoxIndex: [],
      editItem: {},
      scrollGroupShow: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.loginStatus.loginedUser
    }),
    isVip() {
      return this.user.isMember;
    },
    showList() {
      if (this.expressType == 1) {
        return this.directList;
      } else {
        return this.boundList;
      }
    },
    checkBox() {
      let box = [];
      this.checkBoxIndex.forEach(i => {
        box.push(JSON.stringify(this.showList[i]));
      });
      return box;
    },
    isCheckedBox() {
      let box = [];
      for (let i = 0; i < this.showList.length; i++) {
        if (this.showList[i].Status != 0) {
          box.push(i);
        }
      }
      return box;
    },
    allPrice() {
      let a = 0;
      this.checkBox.forEach(v => {
        let obj = JSON.parse(v);
        let price = this.isVip ? obj.Price : obj.UnMemberPrice;
        let b = price * obj.Count;
        a += b;
      });
      return parseFloat(a).toFixed(2);
    },
    allPrice_Bound() {
      let a = 0;
      this.checkBox.forEach(v => {
        let obj = JSON.parse(v);
        let price = this.isVip ? obj.Price : obj.UnMemberPrice;
        let b = price * obj.Count * (obj.TaxRate / 100 + 1);
        a += b;
      });
      return parseFloat(a).toFixed(2);
    },
    submitFlag() {
      if (this.checkBox.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    all_count() {
      let a = 0;
      this.checkBox.forEach(v => {
        let obj = JSON.parse(v);
        let b = obj.Count;
        a += parseInt(b);
      });
      return a;
    },
    countError() {
      for (let i = 0; i < this.checkBox.length; i++) {
        let c = JSON.parse(this.checkBox[i]).Count;
        if (c > 8) return true;
      }
      if (this.all_count > 25) return true;
    },
    error_text() {
      return "";
    }
  },
  methods: {
    checkCount(ids) {
      return new Promise((re, rj) => {
        API.checkCount({
          skuIds: ids,
          expressType: this.expressType,
          token: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null
        }).then(res => {
          if (res.ResponseId == 0) {
            if (res.Data.length > 0) {
              this.checkAll = false;
              this.getCarList();
              this.$message.error("您选择的部分商品已经售馨，请从新选择");
              this.checkBoxIndex = [];
              rj();
            } else {
              re();
            }
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
      });
    },
    toDetail(item) {
      const { href } = this.$router.resolve({
        path: "/goodDetail",
        query: {
          goodsId: item.SkuId,
          type: item.OrderType
        }
      });
      window.open(href, "_blank");
    },
    changeType(item) {
      this.expressType = item.type;
      this.typeList.forEach(val => {
        val.active = false;
      });
      item.active = true;
    },
    getCarList() {
      this.isLoading = true;
      API.cartList({
        expressType: this.expressType,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        this.isLoading = false;
        if (res.ResponseId == 0) {
          if (this.expressType == 1) {
            this.directList = res.Data;
          } else {
            this.boundList = res.Data;
          }
          this.$nextTick().then(() => {
            let winH = $(window).height(),
              bodyH = $("#app").height();
            if (bodyH - winH > 348) {
              this.scrollGroupShow = true;
            } else {
              this.scrollGroupShow = false;
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
          this.$message({
            message: res.Message,
            type: "error"
          });
        }
      });
    },
    deleteCar(item, index) {
      this.$confirm("确认删除该购物车商品？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        confirmButtonClass: "el-button--danger",
        center: true
      })
        .then(() => {
          this.checkBoxIndex = [];
          this.checkAll = false;
          API.deleteCart({
            ids: item.Id,
            token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          }).then(res => {
            if (res.ResponseId == 0) {
              switch (this.expressType) {
                case 2:
                  this.boundList.splice(index, 1);
                  break;
                default:
                  this.directList.splice(index, 1);
                  break;
              }
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.scrollGroupShow = false;
              this.getCarList();
              this.$store.dispatch(
                "shopcarStatus/GETCARLEN",
                localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user")).token
                  : null
              );
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCheckAllChange(val) {
      this.checkBoxIndex = val ? this.isCheckedBox : [];
    },
    topCheckAllChange() {
      this.checkAll = !this.checkAll;
      this.handleCheckAllChange(this.checkAll);
    },
    handleCheckBoxChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.isCheckedBox.length;
    },
    editCar(item) {
      if (JSON.stringify(this.editItem) != JSON.stringify(item)) {
        this.submitEdit(item);
      } else {
        this.editItem = item;
      }
    },
    submitEdit(item) {
      API.editCart({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        id: item.Id,
        count: item.Count
      }).then(res => {
        if (res.ResponseId != 0) {
          this.boundList = this.directList = [];
          this.getCarList();
          this.$message({
            message: res.Message,
            type: "error"
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
        }
      });
    },
    createOrder() {
      if (this.submitFlag) {
        let o = {
          expressType: this.expressType,
          skuSource: 1,
          proInfo: this.checkBox.map(val => {
            let v = JSON.parse(val);
            return {
              skuId: v.SkuId,
              procount: v.Count
            };
          })
        };
        sessionStorage.setItem("proInfos", JSON.stringify(o));
        this.$router.push({
          path: "/subOrder"
        });
      }
    }
  },
  mounted() {
    this.getCarList();
    let _this = this;
    $(window).scroll(function() {
      let scrollTop = $(this).scrollTop();
      let scrollHeight = $(document).height();
      let windowHeight = $(this).height();
      let diff = scrollHeight - (scrollTop + windowHeight);
      if (diff < 348) {
        _this.scrollGroupShow = false;
      } else {
        _this.scrollGroupShow = true;
      }
    });
  },
  watch: {
    checkBoxIndex: function(val) {
      let a = [];
      if (val.length > 0) {
        val.map(v => {
          a.push(this.showList[v].SkuId);
        });
        this.checkCount(a.join(","))
          .then(() => {})
          .catch(() => {});
      }
    },
    expressType() {
      this.getCarList();
      this.checkBoxIndex = [];
      this.checkAll = false;
    }
  }
};
</script>
<style lang="less" scoped>
.lh65 {
  height: 65px !important;
  line-height: 65px !important;
}
#car {
  box-sizing: border-box;
}
.topCon {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #ececec;
}

.goOrder {
  height: 65px;
  line-height: 65px;
  box-sizing: border-box;
  padding-left: 15px;
  font-size: 13px;
  color: #656565;
}

.price_info {
  width: 250px;
  height: 100%;
  float: left;
}

.price_info p:nth-child(1) {
  font-size: 16px;
  line-height: 34px;
}

.price_info p:nth-child(2) {
  font-size: 12px;
  line-height: 26px;
}

.go {
  width: 108px;
  height: 63px;
  text-align: center;
  line-height: 63px;
  background: #aaa;
  color: #fff;
  float: right;
  font-size: 16px;
  &.active {
    background: #fe0000;
  }
}

.go.disb {
  background: #f8f8f8;
}

.price {
  width: 400px;
  float: right;
  height: 63px;
}

.goods_invalid_num {
  color: #ff0000;
}

.goods_invalid {
  background: #f8f8f8;
}

.invalid {
  font-size: 12px;
}

.goods_info {
  position: relative;
  padding: 25px 0 !important;
  width: 420px;
  text-align: center;
}

.goods_info .imgbox {
  width: 105px;
  height: 105px;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #eee;
}

.goods_info .imgbox img {
  max-width: 100%;
  max-height: 100%;
}

.goods_info .desc {
  float: right;
  width: 300px;
  min-height: 105px;
}

.goods_info p {
  text-align: left;
  width: 100%;
}

.del {
  color: #169bd5;
}

.clearfix {
  clear: both;
}

.top_btn {
  width: 120px;
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  text-align: center;
  box-sizing: border-box;
}

.top_btn.active {
  color: #fe0000;
  border-bottom: 2px solid #fe0000;
}

.goods {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  border: 1px solid #eee;
}

.goods td {
  padding: 5px 0;
  text-align: center;
}

.goods th {
  background: #f5f5f5;
  line-height: 34px;
  font-weight: 400;
  color: #808080;
}

.goods td {
  border-bottom: 1px solid #eee;
}

.nores {
  margin-top: 115px;
  margin-bottom: 140px;
}

.contentContainer {
  padding: 10px;
  min-height: 600px;
}

.border-bg {
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
}
.desc_link:hover {
  color: #fe0000;
  text-decoration: underline;
}
.scroll_group {
  position: fixed;
  width: 100%;
  bottom: -1px;
  z-index: 10;
}
// 不要表格垂直居中的奇葩设计
td {
  vertical-align: top;
  padding: 25px 0 !important;
  &.middle {
    vertical-align: middle;
  }
}
.checkbox {
  display: inline-block;
  border: 1px solid #dcdfe6;
  margin-right: 2px;
  margin-left: 10px;
  position: relative;
  top: 2px;
  border-radius: 2px;
  background: #fff;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
    background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  &.active {
    background: url(~assets/icon/checked_icon.png) no-repeat;
    background-size: 100% 100%;
  }
}
.vip_tag {
  min-width: 67.5px;
  margin-top: 6px;
  padding: 0 4px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px !important;
  color: #fff38d;
  background: #414141;
  border-radius: 2px;
  position: relative;
  top: -1px;
}
.join_vip {
  margin-top: 36px;
  margin-left: 15px;
  color: #fe0000;
  font-size: 12px;
}
</style>