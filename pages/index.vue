<template>
  <div class="main">
    <!-- <v-informgg></v-informgg> -->

    <v-top></v-top>
    <transition
      name="slideInDown"
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <div class="search_scroll white-bg" v-show="scroll_search_show">
        <div class="container clearfix flex flex-c">
          <div style="margin-right:50px;">
            <v-logo :w="140"></v-logo>
          </div>
          <v-search type="link" width="800px"></v-search>
        </div>
      </div>
    </transition>
    <div class="searchCon white-bg">
      <div class="container clearfix white-bg">
        <div class="logo-con lf">
          <v-logo></v-logo>
        </div>
        <div class="serarch-con lf marginTop10">
          <v-search type="link"></v-search>
        </div>
        <div class="shopCar-con lr marginTop10">
          <v-shopcar></v-shopcar>
        </div>
      </div>
    </div>
    <v-nav :list="navList"></v-nav>
    <div class="bannerCon">
      <div class="bannner-container">
        <div v-swiper:bannerSwiper="bannerSwiperOption" style="height:500px">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item,index) in bannerList"
              @click="bannerClick(item)"
              :key="index"
            >
              <div class="image_con">
                <img :src="baseUrl+item.AdvImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container center">
        <div class="swiper-button-prev bp"></div>
        <div class="swiper-button-next bn"></div>
      </div>
    </div>
    <!--云仓快报-->

    <!-- 限时特惠 -->
    <div class="huiCon marginTop10">
      <div class="container ppzc_box">
        <div
          class="ppzc"
          v-for="(item,index) in AdvActivities"
          :key="index"
          @click="jumpActivities(item)"
        >
          <img v-lazy="baseUrl + item.AdvImg" />
        </div>
      </div>
    </div>
    <!-- 今日秒杀 -->
    <!-- <div class="huiCon marginTop10">
      <div class="container">
        <p class="title padding_t padding_b flex flex-c clearfix">
          <span class="l flex1 flex flex-c">
            <span style="font-size:22px;">今日秒杀</span>
          </span>
        </p>
        <div>
          <div class="hui-container" style="padding:10px 0;">
            <div class="miaosha mbox">
              <p class="mbox_title">今日秒杀</p>
              <div class="m_timebox">
                <p>距离秒杀结束还有</p>
                <div class="m_time">
                  <div class="m_time_box">{{ countDownHour }}</div>
                  <div class="m_time_txt">:</div>
                  <div class="m_time_box">{{ countDownMinute }}</div>
                  <div class="m_time_txt">:</div>
                  <div class="m_time_box">{{ countDownSecond }}</div>
                </div>
              </div>
            </div>
            <div
              class="miaosha"
              v-for="(item, index) in AdvTodaySeckills"
              :key="index"
              @click="handleClick(item)"
            >
              <div class="miaosha_img">
                <img v-lazy="baseUrl + item.AdvImg" alt />
              </div>
              <p class="time_pro_title">{{ item.Title }}</p>
              <p class="item_pro_price">
                <span>秒杀价</span>
                <span>￥{{ item.Price.toFixed(2) }}</span>
                <span>￥{{ item.OriginalPrice.toFixed(2) }}</span>
              </p>
              <div class="you_img" style="z-index:3">
                <p v-for="(i,ind) in item.Label" :key="ind">{{ i }}</p>
              </div>
              <img class="you_img" v-if="item.LabelImg != ''" v-lazy="baseUrl + item.LabelImg" alt />
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="floorCon">
      <div class="container" style="width:1200px;">
        <!-- <p class="title" style="margin-bottom:20px">热卖组合</p>
        <div class="goodsCon flex newCont" style="height:280px;">
          <div class="newC">
            <div v-swiper:newSwiper="newSwiperOption" style="height:280px">
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  :key="index"
                  @click="handleClick(item)"
                  v-for="(item,index) in AdvCombinationSkus"
                >
                  <div class="image_con">
                    <img v-lazy="baseUrl+item.AdvImg" />
                  </div>
                  <p class="newTitle">{{item.Title}}</p>
                  <span
                    class="priceColor newPrice newPrice_1"
                    v-show="logined"
                  >￥{{parseFloat(isVip?item.Price:item.Price).toFixed(2)}}</span>
                  <span
                    class="priceColor newPrice newPrice_1"
                    v-show="!logined"
                  >￥{{parseFloat(item.Price).toFixed(2)}}</span>
                  <div class="newC_label" v-if="item.Label != ''">{{ item.Label }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev newp"></div>
          <div class="swiper-button-next newn"></div>
        </div>-->
      </div>
    </div>
    <!-- 热卖品牌 -->
    <div class="brandCon marginTop10">
      <div class="container">
        <p class="title padding_t padding_b flex flex-c clearfix" style="margin-bottom:10px">
          <span class="flex1 flex flex-c">
            <span style="font-size:22px;">热卖品牌</span>
          </span>
        </p>
        <div class="clearfix">
          <div
            class="lf marginRight10 marginTop10"
            v-for="(item,index) in brandList"
            :key="index"
            @mouseenter="maskToggle(item)"
            @mouseleave="maskToggle(item)"
          >
            <div class="image_con" @click="bannerClick(item)">
              <img class="center" v-lazy="baseUrl+item.AdvImg" />
              <transition
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
              >
                <div
                  class="brand_mask flex flex-column text-center flex-s-r colorFFF"
                  v-show="item.active"
                >
                  <p class="title pointer">{{item.Title}}</p>
                  <p class="size12 pointer" style="color:#fbb040;">进入品牌类目 >></p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hotCon" style="display:none;">
      <div class="container">
        <p class="title padding_t padding_b flex flex-c" style="padding-bottom:0;">
          <img class="icon marginRight6" src="~/assets/icon/huo_icon.png" />
          <span style="font-size:22px;">本周热销</span>
        </p>
        <ul class="hotGoods-con clearfix">
          <li class="lf" v-for="(item,index) in hotGoodsList" :key="index">
            <goods-item :item="item"></goods-item>
          </li>
        </ul>
      </div>
    </div>
    <div class="floorCon" v-for="(k,i) in AdvSkuCategoryList" :key="i">
      <div class="container" style="width:1200px;">
        <p class="title">
          {{k.Name}}
          <span>{{k.Desc}}</span>
          <span class="lr size16 color66 marginRight12 pointer" @click="toCategory(k.Code)">更多>></span>
        </p>
        <div class="goodsCon flex">
          <div class="brand_con">
            <img
              v-lazy="baseUrl+kk.AdvImg"
              v-for="(kk,ii) in k.AdvFloorRecommendList"
              :key="ii"
              @click="bannerClick(kk)"
            />
          </div>
          <ul class="hotgoods_con clearfix">
            <li
              class="list-item lf marginLeft10 marginTop10"
              v-for="(item,index) in k.AdvSkuList"
              :key="index"
            >
              <goods-item :item="item" :ShowStatus='ShowStatus' size="small"></goods-item>
            </li>
          </ul>
          <div class="rangegoods_con white-bg">
            <p class="title text-center">热销排行榜</p>
            <ul class="clearfix">
              <li
                class="flex flex-c"
                v-for="(item,index) in k.AdvHotSaleList"
                :key="index"
                @click="toDetail(item)"
              >
                <img v-lazy="baseUrl+item.Image" />
                <div class="flex1">
                  <p class="good-name ellipsis2" style="height:32px;"><span style="font-size:10px" v-if="item.OrderType==1">【澳洲直邮】</span>{{item.Name}}</p>
                  <p class="color80 clearfix price_con">
                    <i class="priceColor size12" style="font-style: normal;"></i>
                    <span class="priceColor size14" v-if="ShowStatus==0">登录后看价格</span>
                    <span
                      class="priceColor"
                      v-if="ShowStatus==1"
                    >￥{{parseFloat(isVip?item.Price:item.UnMemberPrice).toFixed(2)}}</span>
                    <span
                      class="priceColor typeS"
                      style="font-size:10px"
                      v-if="item.OrderType==1"
                    >跨境直邮</span>
                    <span
                      class="priceColor typeS"
                      style="font-size:10px"
                      v-if="item.OrderType==2"
                    >保税备货</span>
                    <span
                      class="priceColor typeS"
                      style="font-size:10px"
                      v-if="item.OrderType==3"
                    >一般贸易</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
    <v-side></v-side>
    <v-inform></v-inform>
    <!-- <vExpInfo></vExpInfo> -->
  </div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
// import vExpInfo from "~/components/vExpinfo.vue"; //延期发货
import vLogo from "~/components/vLogo";
import vSearch from "~/components/vSearchBar";
import vNav from "~/components/vNav";
import goodsItem from "~/components/vGoodsItem";
import vShopcar from "~/components/vShopcar";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import vSide from "~/components/vSideBar.vue";
import vInform from "~/components/vInform.vue";
// import vInformgg from "~/components/vInformgg.vue";
import { _CONFIG } from "~/_config/config.js";
import { API } from "~/_config/API.js";
import { resolve, reject } from "q";
import { Message } from "element-ui";
export default {
  components: {
    // vExpInfo, //延期发货
    vLogo,
    vSearch,
    goodsItem,
    vShopcar,
    vTop,
    vBottom,
    vNav,
    vSide,
    // vInformgg,
    vInform
  },

  data() {
    return {
      navList: [],
      isError: {},
      AdvCombinationSkus: [],
      countDownHour: "00",
      countDownMinute: "00",
      countDownSecond: "00",
      bannerSwiperOption: {
        autoplay: {
          delay: 20000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        loop: false,
        preventClicks: false,
        navigation: {
          nextEl: ".bn",
          prevEl: ".bp"
        }
      },
      huiSwiperOption: {
        slidesPerView: 5,
        preventClicks: false,
        slidesPerGroup: 5,
        navigation: {
          nextEl: ".fa-angle-right",
          prevEl: ".fa-angle-left"
        }
      },
      newsSwiperOption: {
        autoplay: true,
        direction: "vertical",
        loopedSlides: 3,
        loop: true,
        slidesPerView: "auto",
        mousewheel: true,
        on: {
          init: function() {
            this.emit("slideChangeTransitionEnd"); //在初始化时触发一次slideChangeTransitionEnd事件
            var slide = this.slides.eq(0);
            slide.addClass("ani");
          },
          transitionStart: function() {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.removeClass("ani");
            }
          }
        }
      },
      newSwiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 5,
        autoplay: {
          delay: 6000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        loop: false,
        navigation: {
          nextEl: ".newn",
          prevEl: ".newp"
        }
      },
      newsList: [],
      bannerList: [],
      AdvTodaySeckills: [],
      brandList: [],
      AdvBestNewSku: [],
      hotGoodsList: [],
      currentPage: 1,
      AdvActivities: [],
      ShowStatus: 0,
      tottlePage: 1,
      scroll_search_show: false,
      baseUrl: ali_oss_data.URL_IMG_SHOW,
      AdvCombinationSkus: [],
      getLimitGoodsFlag: true,
      floorArr: [],
      AdvLimitedTimeDisCounts: [],
      AdvSkuCategoryList: [],
      limitpPage: 1
    };
  },
  computed: {
    logined() {
      return this.$store.state.loginStatus.logined;
    },
    user() {
      return this.$store.state.loginStatus.loginedUser;
    },
    isVip() {
      return this.user.isMember;
    }
  },
  methods: {
    jumpActivities(row) {
      this.bannerClick(row);
    },
    countDown: function(e) {
      let now = new Date();
      let deadline = 10;
      const ten = new Date();
      if (now.getHours() >= deadline) {
        ten.setDate(new Date().getDate() + 1);
      }
      ten.setHours(deadline);
      ten.setMinutes(0);
      ten.setSeconds(0);
      var totalSecond = (ten.getTime() - now.getTime()) / 1000;
      var interval = setInterval(
        function() {
          // 秒数
          var second = totalSecond;
          var day = Math.floor(second / 3600 / 24);
          var dayStr = day.toString();
          if (dayStr.length == 1) dayStr = "0" + dayStr;
          // 小时位
          var hr = Math.floor((second - day * 3600 * 24) / 3600);
          var hrStr = hr.toString();
          if (hrStr.length == 1) hrStr = "0" + hrStr;
          // 分钟位
          var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
          var minStr = min.toString();
          if (minStr.length == 1) minStr = "0" + minStr;
          // 秒位
          var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
          var secStr = sec.toString();
          if (secStr.length == 1) secStr = "0" + secStr;
          this.countDownHour = hrStr;
          this.countDownMinute = minStr;
          this.countDownSecond = secStr;
          totalSecond--;
          if (totalSecond < 0) {
            clearInterval(interval);
            this.countDownHour = hrStr;
            this.countDownMinute = minStr;
            this.countDownSecond = secStr;
          }
        }.bind(this),
        1000
      );
    },
    handleClick(item) {
      let str = item.Link.split("&")[2].split("=")[1];
      const { href } = this.$router.resolve({
        path: "/goodDetail",
        query: {
          goodsId: item.SkuId ? item.SkuId : item.Id,
          type: str
        }
      });
      window.open(href, "_blank");
    },
    jumpList() {
      this.$router.push("/news");
    },
    jumpDesc(id) {
      this.$router.push({
        path: "/newsInfo",
        query: {
          id: id
        }
      });
    },
    getLimitList() {
      if (!this.getLimitGoodsFlag) return;
      // this.API.limitGoods({
      //   pageIndex: this.limitpPage,
      //   pageSize: 5
      // }).then(res => {
      //   if (res.ResponseId != 0) return;
      //   let arr = res.Data.Data;
      //   if (arr.length == 0) {
      //     this.getLimitGoodsFlag = false;
      //   }
      //   this.AdvLimitedTimeDisCounts = _.unionWith(
      //     this.AdvLimitedTimeDisCounts,
      //     res.Data.Data,
      //     _.isEqual
      //   );
      //   this.$nextTick(() => {
      //     this.huiInit();
      //   });
      // });
    },
    maskToggle(item) {
      item.active = !item.active;
      this.$forceUpdate();
    },
    repalceImg(e) {
      let imgSrc = "assets/img/error_img.png";
      e.target.src = imgSrc;
      this.isError = {
        width: "80%"
      };
    },
    bannerClick(item) {
      let routeLink = item.Link.split("&");
      let type = routeLink[0].split("=")[1];
      let id = routeLink[1].split("=")[1];
      let path, query;
      if (type == 1) {
        let str = routeLink[2].split("=")[1];
        path = "/goodDetail";
        query = {
          goodsId: id,
          type: str
        };
      } else if (type == 2) {
        path = "/list";
        query = {
          cate_code: id
        };
      } else if (type == 4) {
        path = "/activities";
        query = {
          id: id
        };
      } else {
        path = "/list";
        query = {
          brandCode: id
        };
      }
      let o = {
        path: path,
        query: query
      };
      let { href } = this.$router.resolve(o);
      window.open(href, "_blank");
    },
    toCategory(code) {
      let o = {
        path: "/list",
        query: {
          cate_code: code
        }
      };
      let { href } = this.$router.resolve(o);
      window.open(href, "_blank");
    },
    windowScroll(y) {
      let endScroll = y - 80;
      window.scrollTo(0, endScroll);
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
    getAllList() {
      API.indexData({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
          this.$store.dispatch(
            "shopcarStatus/GETCARLEN",
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          );
          location.reload();
        } else {
          this.ShowStatus = res.Data.ShowStatus;
          console.log(this.ShowStatus);
          let bannerList = [];
          let brandList = [];
          let AdvBestNewSku = [];
          let AdvLimitedTimeDisCounts = [];
          let AdvSkuCategoryList = [];
          if (res.Data != null) {
            if (res.Data.AdvSlides.length !== 0) {
              bannerList = res.Data.AdvSlides;
            }
            if (res.Data.AdvCategories.length !== 0) {
              brandList = res.Data.AdvCategories;
            }
            if (res.Data.AdvBestNewSku.length !== 0) {
              AdvBestNewSku = res.Data.AdvBestNewSku;
            }
            if (res.Data.AdvLimitedTimeDisCounts.length !== 0) {
              AdvLimitedTimeDisCounts = res.Data.AdvLimitedTimeDisCounts;
            }
            if (res.Data.AdvSkuCategoryList.length !== 0) {
              AdvSkuCategoryList = res.Data.AdvSkuCategoryList;
            }
            brandList.forEach(v => {
              v.active = false;
            });
            if (res.Data.AdvRecommendes.length !== 0) {
              this.$store.commit("common/SETNAVLIST", res.Data.AdvRecommendes);
            }
            let a = [];
            if (res.Data.AdvTodaySeckills.length !== 0) {
              res.Data.AdvTodaySeckills.map(item => {
                item.Label = item.Label.split(",");
                if (item.Label.length > 3) {
                  item.Label.map((v, ind) => {
                    if (ind < 3) {
                      a.push(v);
                    }
                  });
                  item.Label = a;
                }
              });
            }
            this.AdvCombinationSkus = res.Data.AdvCombinationSkus;
            this.AdvActivities = res.Data.AdvActivities;
            this.AdvTodaySeckills = res.Data.AdvTodaySeckills;
            this.bannerList = bannerList;
            this.brandList = brandList;
            this.AdvBestNewSku = AdvBestNewSku;
            this.AdvLimitedTimeDisCounts = AdvLimitedTimeDisCounts;
            this.AdvSkuCategoryList = AdvSkuCategoryList;
          }
        }
      });
      API.indexGetTopNews({
        pageindex: 1,
        pageSize: 3
      }).then(r => {
        console.log(r);
        this.newsList = r.Data;
      });
    }
  },
  mounted() {
    this.getAllList();
    this.$store.dispatch("loginStatus/login");
    let _this = this;
    $(window).scroll(function() {
      let scrollTop = $(this).scrollTop();
      if (scrollTop < 106) {
        _this.scroll_search_show = false;
      } else {
        _this.scrollGroupShow = scrollTop > 0 ? true : false;
        _this.scroll_search_show = true;
      }
    });
    this.countDown();
  },
  watch: {
    limitpPage: function(val) {
      this.getLimitList();
    }
  }
};
</script>
<style lang='less'>
@import "../assets/css/index.less";
@import "../assets/css/main.css";
@import "../assets/css/color-dark.css"; /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
.info_con p {
  font-size: 14px;
  line-height: 24px;
}
.typeS {
  font-size: 10px;
  color: red;
  border-style: solid;
  border-width: 0.5px;
  padding: 0px 4px 0px 4px;
}
.you_img {
  position: absolute;
  right: 0;
  top: 0;
  width: 95px;
  height: 95px;
}
.you_img p {
  color: #fff;
  font-size: 16px;
  text-align: right;
  margin-bottom: 5px;
  padding-right: 5px;
}
.you_img p:nth-child(1) {
  padding-top: 5px;
}
.time_pro_title {
  font-size: 14px;
  color: #666666;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 225px;
  box-sizing: border-box;
  overflow: hidden;
  line-height: 30px;
  padding: 0 10px;
}
.item_pro_price {
  margin-top: 5px;
  padding-left: 10px;
  box-sizing: border-box;
}
.item_pro_price span:nth-child(1) {
  background: #e63e33;
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding: 3px 10px;
  border-radius: 20px;
}
.item_pro_price span:nth-child(2) {
  color: #e63e33;
  font-size: 18px;
}
.item_pro_price span:nth-child(3) {
  color: #999999;
  text-decoration: line-through;
  margin-left: 5px;
}
.miaosha_img {
  height: 230px;
  width: 226px;
  box-sizing: border-box;
  position: relative;
  padding: 10px;
}
.miaosha_img img {
  max-width: 210px;
  max-height: 206px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.m_time {
  display: flex;
  padding: 0 27px;
  text-align: center;
  font-size: 26px;
  padding-bottom: 27px;
  padding-top: 20px;
  width: 100%;
  box-sizing: border-box;
}
.m_time_txt {
  padding: 0 10px;
  color: #fff;
}
.m_time .m_time_box {
  background: #333333;
  padding: 5px;
  color: #fff;
}
.miaosha {
  width: 231.9px;
  float: left;
  background: #fff;
  transition: all 0.2s linear;
  height: 300px;
  margin-right: 10px;
  position: relative;
}
.miaosha:nth-last-child(1) {
  margin-right: 0;
}
.mbox {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAYAAABxcwvcAAAGoklEQVR4nOWcaYwURRiGn0VURBRQQIM3axQ8AHWJGBMCmhUVMR7ECNGIJCISjyAY1ASJaASj+MczxhOJouJ9EAyXouDBrYCKICogSgAROZf19UftxKWnurv6nFaeZP5Uf/3VO29XV1dX1UyVJBJSDfwBbEyaKAMGYnS9lyRJVUKTqoHZwFKgNkmiDDgZ+BYQcAEwLXYmSXE/vSX9qX95MEGutD+tJa3T3twQN19cEbfKztACGISk+T76Yl3IOAKe8hFQ4sIKmlMl6Z0QfZMlNcnKpMMlzQgRUGmjxjvqmy/pWNe8TRy7rrOABUAvh9h6oGnsTjIZ7wM/OMSdCcwDujtldXBygKR6xyu0QNLxFWpFpU9zSVMc9UrSNWE5w4YAY4BRTm7DZGAAUOcQ2wo4DWgHHAe0Bw4FWgMHA38Cm4EtwM/AWuBXYAmwy1HPk8AQx9gxwGjfoz7uNZU0KcLVGONwhWsk3SVpqqQNEXI3Zo1Mx3ubpI4OdQ6LkHuCXx5b4QmSFjsmrpe5Hf1EnihptPwfyUmZKTMcOSJAQ19JOx3zzZXUxpvDm7BW0ibHhGskdfMRdpak5yTVOeZKymZJD8u/P+ws6UfHXKsldZGPSbdEEDVTFscltZX0fIQ8abNLpuXup3JtrSTNcsyzR1I/NTKpg6QnIwh52iIASYMVv69Jm2Uyd4VN57MR8oyS1AZJQyKcNNxSaXNJL0fIkSf3yW7UXRFy9ERmKD8uJPAvSRdbKquRtDKS7PyZKqmlyrVfKXNbBTFInj7pDZ/A5bI/bmsl7U6mPze+k3Sc7BfZO1tQYlQpznvSHE/gO5KaWZJfneY3yImN8jy1Gj7tJH3miX22cYytf1nfEPiQJSGSLsnwi2TNZpkHle17TWyIme09ZnstqQG6As9YBujdgbmOQ/2ishY4HfPa42Uo8AbwW+PCKNO3bYBVwCEJBBaFL3CdAQDnqRKAt/h/GARwNvCQa7BrS7oHuDeuohB+A17HXLAqzMT930A/4MiM6izRC5gVFuRiUjVuE1lxmQ30sJRPB87LsF4w/dPRYUEut9vE5FoC2d+n/ICM6wU4ChgbFhRmUl8idHAxqYpYnjZ3EnJbh5l0f3paCs3IoINBJvUEOqcqpbgMAVr6HQwyaVj6WgpLM+A6v4N+JrUD+mQip7hc73fAz6QBwH7ZaCksXTHrcWX4mXRpdloKTV9boc2k5phh+77IubZCm0nnYozaFzkHaOEttJlkvS/3EVpgVpb3wmZSh+y1FJoTvQU2kzrlIKTIOJnUPgchReZYb4HXpCpL2b5G2cSi15ADyWeKosiUvcN5Tdqfyu1S89K2QvWGDgF24L5JKms+rlC9O7wFXpP22IIypt6nfDDmpfOXHLUAbPUW2DrpnTkICdNQ4gWgIzA+HykAbPMW2ASuzUFIY7pgVmP8Zh22AyMwbwIf5qCn7PvbTPo+ByGNOQizXLUY8xsQPxZi5rgGAqsz1LPCW2AzaVWGAoI4FZgKTACOCIh7ETgFeDgjHSu9BTaTFmVUuSvXYn71dHNAzA7gDsya/pQU667DtOi9seyuOKBh90URmCb/zauNP/0lrUqhvjm2/LaWtBv4PMWrk4TzgS+BcZi+y49XMFMcDwJrEtT3qa3Q7/GbZhNOg5HA18DlATHbMQuNnySo511bod9egLaYR6HfEnQleRMYjv0J1wOYSbyX9BXASbYDfsk2AB/EqCgPrsD8xmSEp7wJ5raLO4vxou+RgM6wZwodYdZ8Jqm7jN5HEuSpV8BPL8K23izErEcVnTcxLSwuzwOD/A6GmXQZZofb/51qAgbRYffv28D8VOUUjycIectw2enWCViWlqKCsQkzpx84h+byJFgOPJCGogIyEIdJxihblBcAZyQQVDSeBm50CYxiUnvMAK6IA8yoLMWyUutHlIHXOuCiyHKKxyaC563KiDo6nU7AjrD/AHswe7fXRTkpzhB+AnBTjPMqzXbMu92SqCcm+Wugq4BX456cMxswf11UPqHmQJIl7dcwTff3BDnyYB7QjZgGQfJ1/1mY1Y6PEubJiscxBv2UJEkamyPWA72BuzEdYxH4GehP8Dy5M2nuIBmLmZiv9Avxo5iVl0lpJUz6n25+XADcjmlheVAHPAc8BnyTdvKsTCrRA9Ps+wDHZJB/EWam4iUyXC/M2qQSTTGtqhazu7cmZp5twFfADMzAdk4q6kLIyyQvnTDb7qoxG1kPw2yeao1ZOtqK+e/KLZgHwyrgR8yPE5MsGcXiHxlTMM9BO+aWAAAAAElFTkSuQmCC);
  background-position: center 90px;
  background-repeat: no-repeat;
  background-color: #e63e33;
  position: relative;
}
.m_timebox {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.m_timebox p {
  color: #fff;
  font-size: 18px !important;
  text-align: center;
}
.mbox .mbox_title {
  color: #fff;
  font-size: 30px;
  text-align: center;
  line-height: 90px;
}
.miaosha:not(.mbox):hover {
  box-shadow: rgb(49, 49, 49) 0 0 2px;
}
.news {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -ms-user-select: none;
}
.look {
  cursor: default;
}
.news_con img {
  display: block;
  margin: 0 auto;
}
.newp,
.newn {
  z-index: 99;
}
</style>
<style lang="less" scoped="scoped">
.news_silde {
  display: flex;
}
.gonggaoBox button {
  border: none;
  font-size: 16px;
  padding: 15px 40px;
  background: #fbb040;
  color: #fff;
  border-radius: 5px;
  outline: none;
}
.gonggonggaibu {
  text-align: center;
  margin-top: 15px;
}
.gonggaoBox p {
  padding: 0 100px;
  font-size: 16px;
  line-height: 25px;
}
.gonggaoBox {
  width: 800px;
  height: 400px;
  background: #fff;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 150px;
}
.gonggaoBox h3 {
  font-size: 20px !important;
  text-align: center;
  height: 65px;
  line-height: 65px;
}
.gonggao {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  z-index: 9999999;
}
.news_sw_cont {
  font-size: 14px;
  margin-top: 10px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: 66px;
  overflow: hidden;
  padding-right: 55px;
  color: #999999;
  box-sizing: border-box;
}

.news_sw_ri_title {
  font-size: 16px;
  color: #333333;
  box-sizing: border-box;
  padding-right: 50px;
  position: relative;
}

.news_more {
  color: #707070;
  position: absolute;
  right: 0;
  top: 0px;
  font-size: 16px;
}

.news_sw_ri_title span {
  color: #ff0000;
  margin-right: 10px;
}

.news_sw_ri {
  flex: 1;
  padding: 20px 10px;
  width: 740px;
  position: relative;
  box-sizing: border-box;
}

.newsCon {
  height: 120px;
  width: 100%;
  background: #fff;
  margin-top: 10px;
  cursor: pointer;
}

.news {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
}

.news_sw {
  flex: 1;
  display: flex;
  width: 970px;
}

.news_sw_lf {
  flex: 0 0 200px;
  box-sizing: border-box;
  padding: 10px 0;
}

.news_sw_lf img {
  height: 100%;
  width: 100%;
}

.news_title p {
  color: #666666;
  font-size: 12px;
  margin-top: 10px;
}

.news_title {
  height: 120px;
  width: 230px;
  padding-left: 36px;
  box-sizing: border-box;
  flex: 0 0 230px;
}

.news_title img {
  margin-top: 40px;
}

.newCont {
  position: relative;
}

.newCont .swiper-button-next,
.newCont .swiper-button-prev {
  position: absolute;
  height: 100%;
  width: 16px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100% auto;
  top: 23px;
  outline: none;
}

.newCont .swiper-button-next {
  background-image: url(~assets/img/nright.gif);
  right: 0 !important;
}

.newCont .swiper-button-prev {
  background-image: url(~assets/img/nleft.gif);
  left: 0 !important;
}

.newC {
  position: relative;
  width: 100%;
}
.newC .swiper-slide {
  position: relative;
}
.newPrice {
  font-size: 18px;
  padding: 0 10px;
  margin-top: 5px;
}
.newPrice_1 {
  color: #f60 !important;
}
.newTitle {
  color: #666666;
  font-size: 14px;
  overflow: hidden;
  padding: 0 10px;
  line-height: 20px;
  min-height: 40px;
  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;
}

// .newC .image_con::before {
//   content: "";
//   background: url(~assets/img/new.png) center center no-repeat;
//   width: 33px;
//   height: 35px;
//   position: absolute;
//   top: 0;
//   left: 15px;
// }

.newC .image_con {
  width: 100%;
  padding: 10px;
  height: 205px;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  line-height: 195px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newC .image_con img {
  max-width: 100%;
  max-height: 100%;
}

.newCont .swiper-slide {
  height: 280px;
  width: 225px;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #fff;
  margin-right: 15px;
  cursor: pointer;
}

.newCont {
  height: 100%;
  width: 100%;
}

.main {
  width: 100%;

  .bannerCon {
    position: relative;

    .swiper-button-prev {
      width: 52px;
      height: 84px;
      background: url(~assets/img/indexSlidePic_l.png) no-repeat;
      background-size: 100% 100%;
      left: -52px;
    }

    .swiper-button-next {
      width: 52px;
      height: 84px;
      background: url(~assets/img/indexSlidePic_r.png) no-repeat;
      background-size: 100% 100%;
      right: -52px;
    }
  }

  .bannner-container {
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;

    .image_con {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: auto;
        height: 100%;
      }
    }
  }

  .huiCon {
    .hui-container {
      position: relative;
      width: 1200px;
      overflow: hidden;
      padding: 10px;
    }

    .fa {
      display: block;
      float: left;
      padding: 0 10px;
      background: #fff;
      font-size: 24px;
      color: #333;
      margin: 0;

      &:hover {
        color: #fc0000;
      }
    }

    .image_con {
      width: 230px;
      height: 146px;
      background: #fff;
      position: relative;
      overflow: hidden;

      &:hover {
        border-color: #ccc;
      }

      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }

  .brandCon {
    .image_con {
      width: 230px;
      height: 100px;
      background: #fff;
      position: relative;
      overflow: hidden;

      &:hover {
        border-color: #ccc;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .brand_mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 99;
      background: rgba(7, 17, 27, 0.7);
    }

    .animated {
      animation-duration: 0.5s;
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
  }

  .searchCon .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .serarch-con {
    margin-left: 132px;
  }

  .icon {
    width: 20px;
    height: auto;
  }
}

.marginTop30 {
  margin-top: 30px;
}

.search_scroll {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 99999;
  padding: 10px;
  box-shadow: 0 2px 4px #ccc;
}

.slideInDown,
.slideOutUp {
  animation-duration: 0.5s;
}

.floorCon {
  margin-top: 20px;
  margin-bottom: 20px;

  .title {
    font-size: 22px;
    color: #333;

    span {
      margin-left: 20px;
      color: #999;
      font-size: 14px;
    }

    margin-bottom: 10px;
  }

  .goodsCon {
    height: 545px;
    overflow: hidden;

    .brand_con {
      width: 400px;

      img {
        width: 400px;
        height: 260px;
        display: block;
        margin-top: 10px;
        cursor: pointer;
      }
    }

    .hotgoods_con {
      width: 600px;
    }

    .rangegoods_con {
      margin-left: 10px;
      margin-top: 10px;
      width: 190px;
      height: 530px;
      box-sizing: border-box;
      // overflow: hidden;
      padding: 8px;

      .title {
        font-size: 18px;
        color: #666;
      }

      ul {
        height: 490px;
        // overflow-y: auto;
      }

      li {
        margin-top: 18px;
        min-height: 75.5px;
      }

      img {
        width: 60px;
        height: 60px;
        margin-right: 4px;
      }

      p {
        line-height: 16px;
        color: #666;
        cursor: pointer;
      }

      .priceColor {
        color: #ff6600;
        font-size: 18px;
        margin-top: 6px;
      }

      .good-name:hover {
        color: #ff6600;
        text-decoration: underline;
      }

      .vip_tag {
        padding: 0 4px;
        height: 18.75px;
        line-height: 18.75px;
        text-align: center;
        font-size: 12px !important;
        color: #fff38d;
        background: #414141;
        border-radius: 2px;
        transform: scale(0.8) translateX(-4px);
      }
    }
  }
}

.left_floor {
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 20px;
  width: 80px;
  text-align: center;
  line-height: 40px;
  color: #333;
  font-size: 18px;
  background: #f5f5f5;
  border-radius: 2px;
  border: 1px solid #eee;

  li {
    cursor: pointer;
    border-bottom: 1px solid #eee;
    transition: all 0.2s linear;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: #fbb040;
      color: #fff;
    }
  }
}
.newC_label {
  position: absolute;
  background: #ff6600;
  height: 22px;
  line-height: 22px;
  top: 0;
  text-align: center;
  left: 50%;
  color: #fff;
  transform: translate(-50%, 0%);
  font-size: 14px;
  padding: 0 10px;
  overflow: hidden;
}
.ppzc {
  height: 340px;
  // background: #ff0000;
  flex: 0 0 285px;
  margin-right: 20px;
}
.ppzc img {
  width: 100%;
  height: 100%;
}
.ppzc:nth-child(4) {
  margin-right: 0;
}
.ppzc_box {
  display: flex;
  margin-top: 20px;
}
</style>