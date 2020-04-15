<template>
  <div class="main">
    <v-top></v-top>
    <div class="searchCon padding_lr white-bg">
      <div class="container clearfix">
        <div class="logo-con lf">
          <v-logo></v-logo>
        </div>
        <div class="serarch-con lf marginTop10">
          <v-search v-on:callback="inputSearch"></v-search>
        </div>
        <div class="shopCar-con lr marginTop10">
          <v-shopcar></v-shopcar>
        </div>
      </div>
    </div>
    <v-nav></v-nav>
    <div class="brandCon white-bg">
      <div class="container">
        <p class="searchResponse color80" v-show="searchText">
          全部结果
          <i class="fa fa-angle-right size16 marginLeft4 marginRight4"></i>
          {{searchText}}
        </p>
        <p class="searchBrand" v-show="checkBrandBox.length!=0">
          <span class="b_title" style="color:#666;">已选：</span>
          <span class="tag clearfix text-center" v-for="(item,index) in checkBrandBox" :key="index">
            {{item.BrandName}}
            <i class="fa fa-close lr marginLeft4" @click="delteCheckBrand(index)"></i>
          </span>
        </p>
        <div class="brand-table border-top border-bottom color65">
          <div
            class="brand-con flex"
            :style="brandStyle"
            v-show="checkBrandBox.length==0&&brandCategoryList.length!=0"
          >
            <div class="b_title size12" style="color:#666;">品牌：</div>
            <div class="flex1 size12">
              <div class="brandFather">
                <span
                  class="b_cate size12"
                  v-for="(item,index) in brandCategoryList"
                  :key="index"
                  @click="brandCategoryChange(item,$event)"
                >{{item.BrandName}}</span>
              </div>
            </div>
            <div class="seeMore size12">
              <span v-show="!brand_con_status" @click="brand_con_status = true">查看全部</span>
              <span v-show="brand_con_status" @click="brand_con_status = false">收起</span>
            </div>
          </div>
        </div>
        <div class="brand-table border-bottom color65" v-if="KeywordList.length > 0">
          <div class="brand-con flex">
            <div class="b_title size12" style="color:#666;">热搜：</div>
            <div class="flex1 size12">
              <div class="brandFather">
                <span
                  class="b_cate size12"
                  :class="item.check ? 'active' : ''"
                  v-for="(item,index) in KeywordList"
                  :key="index"
                  @click="keyWordChange(item,index)"
                >{{item.Name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hotCon white-bg" v-loading="isLoading">
      <div class="container">
        <div class="color65 border-bottom flex flex-c">
          <span class="b_title size12 lf" style="color:#666;">排序：</span>
          <span class="flex1">
            <goods-filter v-on:change="filterChange" ref="goodsFilter"></goods-filter>
          </span>
          <div class="pageControl clearfix">
            <i class="fa fa-angle-left pointer" @click="currentPage--"></i>
            <i class="fa fa-angle-right pointer" @click="currentPage++"></i>
          </div>
        </div>
        <ul class="hotGoods-con clearfix">
          <li class="lf" v-for="(item,index) in hotGoodsList" :key="index">
            <goods-item :item="item" :ShowStatus="ShowStatus"></goods-item>
          </li>
        </ul>
        <div class="nores" v-show="hotGoodsList.length==0&&!isLoading">
          <div class="image_con text-center">
            <img src="../../assets/img/nores.png" />
            <p class="color80 marginTop10">抱歉，未搜索到该商品！</p>
          </div>
        </div>
      </div>
    </div>
    <div class="goodsPaginationCon white-bg marginTop20">
      <div class="container padding10 text-center">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="1"
          layout="prev, pager, next, jumper"
          :total="tottlePage"
        ></el-pagination>
      </div>
    </div>
    <v-bottom></v-bottom>
    <v-side></v-side>
  </div>
</template>

<script>
import vLogo from "~/components/vLogo";
import vSearch from "~/components/vSearchBar";
import vNav from "~/components/vNav";
import goodsItem from "~/components/vGoodsItem";
import goodsFilter from "~/components/vGoodsFilter";
import vShopcar from "~/components/vShopcar";
import vBottom from "~/components/vBottom";
import vTop from "~/components/vTop";
import vSide from "~/components/vSideBar.vue";
import { API } from "~/_config/API.js";
import "~/assets/css/list.css";
export default {
  components: {
    vLogo,
    vSearch,
    goodsItem,
    goodsFilter,
    vShopcar,
    vTop,
    vBottom,
    vNav,
    vSide
  },
  data() {
    return {
      isLoading: true,
      ShowStatus: 0,
      hotGoodsList: [],
      brandList: [],
      searchText: "",
      checkBrandBox: [],
      brandCategoryList: [],
      KeywordList: [],
      keyword: "",
      category_con_status: 0,
      brand_con_status: false,
      currentPage: 1,
      tottlePage: 1,
      skuId: "",
      orderType: 1,
      expType: "",
      isAsc: 0,
      brandCode: "",
      cateCode: "",
      brandStyle: {}
    };
  },
  methods: {
    keyWordChange(item, e) {
      let a = JSON.parse(JSON.stringify(this.KeywordList));
      if (item.check) {
        a.map(v => {
          if (item.Id == v.Id) {
            v.check = false;
          }
        });
        this.keyword = "";
        this.KeywordList = a;
        this.searchGoods();
      } else {
        a.map(v => {
          if (item.Id == v.Id) {
            v.check = true;
          } else {
            v.check = false;
          }
        });
        this.keyword = item.Name;
        this.KeywordList = a;
        this.searchGoods();
      }
    },
    initParams() {
      this.currentPage = 1;
      (this.tottlePage = 1), (this.skuId = "");
      this.orderType = 1;
      this.expType = "";
      this.isAsc = 0;
      this.cateCode = "";
      this.brandCode = "";
      this.brandCategoryList = [];
      this.checkBrandBox = [];
      this.$refs.goodsFilter.init();
    },
    getAllBrandCate() {
      let box = [];
      this.brandList.forEach(val => {
        val.active = false;
        val.children.forEach(vv => {
          vv.active = false;
          box.push(vv);
        });
      });
      this.brandCategoryList = box;
    },
    hasClass(elements, cName) {
      return !!elements.className.match(
        new RegExp("(\\s|^)" + cName + "(\\s|$)")
      ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    },
    removeClass(elements, cName) {
      if (this.hasClass(elements, cName)) {
        elements.className = elements.className.replace(
          new RegExp("(\\s|^)" + cName + "(\\s|$)"),
          " "
        ); // replace方法是替换
      }
    },
    addClass(elements, cName) {
      if (!this.hasClass(elements, cName)) {
        elements.className += " " + cName;
      }
    },
    activeChange(e) {
      let el = e.target;
      let all = el.parentNode.children;
      for (let i = 0; i < all.length; i++) {
        this.removeClass(all[i], "active");
      }
      this.addClass(el, "active");
    },
    brandChange(o, e) {
      this.activeChange(e);
    },
    brandCategoryChange(o, e) {
      this.activeChange(e);
      this.checkBrandBox.push(o);
      this.brandCode = o.BrandCode;
    },
    delteCheckBrand(i) {
      this.checkBrandBox.splice(i, 1);
      this.brandCode = "";
      this.searchGoods();
    },
    filterChange(msg) {
      this[msg.key] = msg.value;
      this.isAsc = msg.dir != undefined ? msg.dir : 0;
      this.searchGoods();
    },
    inputSearch(msg) {
      this.searchText = msg;
      this.initParams();
      this.searchGoods();
    },
    searchGoods() {
      this.isLoading = true;
      let params = {
        pageIndex: this.currentPage,
        pageSize: 15,
        keyword: this.keyword,
        skuId: this.skuId,
        searchInfo: this.searchText,
        orderType: this.orderType,
        expType: this.expType,
        isAsc: this.isAsc,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        brandCode: this.brandCode,
        cateCode: this.cateCode
      };
      if (params.expType) {
        params.expType = params.expType.join(",");
      }
      API.searchGoods(params).then(res => {
        this.isLoading = false;
        if (res.ResponseId == 0) {
          this.brandCategoryList = res.Data.BrandList;
          res.Data.KeywordList.map(v => {
            v.check = false;
          });
          if (this.KeywordList.length < 1) {
            this.KeywordList = res.Data.KeywordList;
          }
          this.ShowStatus = res.Data.ShowStatus;
          this.hotGoodsList = res.Data.SupplierSku2BList.Data;
          this.tottlePage = res.Data.SupplierSku2BList.TotalPages;
          this.$nextTick(() => {
            if (this.brand_con_status) {
              this.changeSeeMore();
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
    changeSeeMore() {
      let height = $(".brandFather").height();
      height = !this.brand_con_status ? "36px" : height + "px";
      this.brandStyle = {
        height: height,
        overflow: "hidden"
      };
    }
  },
  mounted() {
    this.getAllBrandCate();
    let query = this.$route.query;
    this.searchText = query.searchName;
    this.expType = [query.expType];
    this.cateCode = query.cate_code || "";
    this.brandCode = query.brandCode || "";
    if (this.searchText != undefined) {
      this.searchGoods();
    }
    if (this.expType != undefined) {
      this.searchGoods();
    }
  },
  watch: {
    currentPage: function(val) {
      this.searchGoods();
    },
    brandCode: function(val, old) {
      this.searchGoods();
    },
    cateCode: function(val) {
      this.searchGoods();
    },
    brand_con_status() {
      this.changeSeeMore();
    }
  }
};
</script>

<style lang="less" scoped="scoped">
.b_cate.active {
  color: #ff4200;
}

.main {
  width: 100%;

  .hotCon {
    position: relative;
    min-height: 520px;

    .nores {
      margin-top: 115px;
    }
  }

  .hotGoods-con {
    li {
      margin-top: 15px;
      margin-right: 15px;
    }

    @media (min-width: 1400px) {
      li:nth-child(5n) {
        margin-right: 0;
      }
    }

    @media (max-width: 1400px) {
      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .brandCon {
    line-height: 36px;

    .category-con,
    .brand-con {
      height: 36px;
      overflow: hidden;
      transition: all 0.2s ease-in;
      padding-right: 80px;
      position: relative;

      .seeMore {
        width: 80px;
        text-align: center;
        position: absolute;
        color: #409eff;
        right: 0;
        top: 0;
      }
    }

    .b_cate {
      padding: 0 15px;
    }

    span {
      cursor: pointer;

      &:hover {
        color: #ff4200;
        text-decoration: underline;
      }

      &.active {
        color: #ff4200;
      }
    }

    .searchBrand {
      background: #f5f5f5;
      line-height: 20px;
      color: #656565;

      .tag {
        min-width: 40px;
        padding: 0 4px;
        line-height: 18px;
        border: 1px solid #fc0000;
        border-radius: 2px;
        color: #fc0000;

        &:hover {
          text-decoration: none;
        }

        .fa-close {
          font-size: 14px;
          position: relative;
          top: 2px;
          transition: all 0.2s linear;
          cursor: pointer;
        }
      }
    }
  }

  .searchCon {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .serarch-con {
    margin-left: 132px;
  }

  .b_title {
    width: 80px;
    text-align: center;
    line-height: 36px;
  }

  .icon {
    width: 20px;
    height: auto;
  }

  .pageControl {
    line-height: 40px;
    padding: 0 15px;

    i {
      font-size: 24px;
      color: #ff4200;
      margin-right: 4px;
    }
  }
}
</style>