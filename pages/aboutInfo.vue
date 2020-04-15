<template>
 <div class="main">
    <v-top></v-top>
    <div class="searchCon padding_lr white-bg">
      <div class="container clearfix">
        <div class="logo-con lf">
          <v-logo></v-logo>
        </div>
        <div class="serarch-con lf marginTop10">
          <v-search></v-search>
        </div>
        <div class="shopCar-con lr marginTop10">
          <v-shopcar></v-shopcar>
        </div>
      </div>
    </div>
    <v-nav></v-nav>
    <div class="imgBox">
      <div class="huiCon">
        <div class="container" style='width:1180px;'>
          <p class="title padding_t flex flex-c clearfix">
            <span style="font-size:18px;color:#333333">授权展示</span>
          </p>
          <div style="">
            <div class="hui-container marginTop10" style="float:left;width:25%"  v-for="(item,index) in list" :key="index">
              <div class="swiper-slide swiper-no-swiping about_img">
                  <div class="image_con">
                    <img class="center" v-lazy="item.url" @click="bannerClick(item)" />
                  </div>
                  <p class='about_name'>{{ item.name }}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div style="clear:both;height:20px;"></div>
      <p style="font-size:18px;color:#333333;text-align:left;padding-top:5px;padding-bottom:15px;">公司资质</p>
      <div class='gszz'>
        <div class='gssz_img'><img src='https://file.a-amall.com/u/20cbe35c4dac47a08b30f5148da0b013_营业执照.jpg'/></div>
        <div class='gssz_img'><img src="https://file.a-amall.com//u/b1f95877d1ff419e92b89efedfe5ccef_lADPDgQ9rU6DQO7NAn7NAcw_460_638.jpg_620x10000q90g.jpg"/></div>
        <div class='gssz_img'><img src='https://file.a-amall.com/u/b536644cea774d3c838f5b3b6ed553f1_出入境备案表.jpg'/></div>
        <div class='gssz_img'><img src='https://file.a-amall.com/u/15a6e5699b634bc78169bdbaf8bda9c4_对外贸易登记证.jpg'/></div>
      </div>
    </div>
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
import 'static/css/list.css';
 export default {
    components: {
      vLogo,
      vSearch,
      goodsItem,
      goodsFilter,
      vShopcar,
      limitpPage: 1,
      vTop,
      vBottom,
      vNav,
      vSide
    },
    data() {
      return {
        list: [
          {
            name: 'Anna-hill',
            url: 'https://file.a-amall.com/u/6ef45fa4bcef4d3080efcd860e738e65_Anna-hill.jpg'
          },
          {
            name: 'AO',
            url: 'https://file.a-amall.com/u/9b5de2323f5e4e1a87ddc0254b315ce9_AO.jpg'
          },
          {
            name: 'Healtheries',
            url: 'https://file.a-amall.com/u/d58c743d1c7b4264a23887efc202b4ae_Healtheries.jpg'
          },
          {
            name: 'Jema-rose',
            url: 'https://file.a-amall.com/u/8e027d0598d84f30b6a98a826985d2e2_Jema-rose.jpg'
          }
        ],
        huiSwiperOption: {
        slidesPerView: 4,
          spaceBetween: 20,
          loop:true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: ".fa-angle-right",
            prevEl: ".fa-angle-left"
          }}
      }
    }
 }
</script>


<style lang="less" scoped="scoped">
.gszz{
  width:100%;
  display:flex;
   flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
.gssz_img{
  box-sizing:border-box;
  padding:15px;
}
.gszz .gssz_img{
  flex: 0 0 50%;
}
.about_img{
  background:#fafafa;
  flex: 0 0 20%
}
.about_name{
  font-size:16px;
  height:40px;
  line-height:40px;
  color:#999;
}
.about_img:hover .about_name{
  color:#fbb040
}
.title{
  box-sizing:border-box;
  width:100%;
}
.imgBox{
    width: 1200px;
    background: #fff;
    box-sizing: border-box;
    margin: 0 auto;
    text-align: center;
    padding: 0 10px;
}
.imgBox h3{
    font-size: 20px;
    padding: 15px 0
}
  .b_cate.active {
    color: #FF4200
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
          color: #409EFF;
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
          color: #FF4200;
          text-decoration: underline;
        }

        &.active {
          color: #FF4200;
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
          border: 1px solid #FC0000;
          border-radius: 2px;
          color: #FC0000;

          &:hover {
            text-decoration: none;
          }

          .fa-close {
            font-size: 14px;
            position: relative;
            top: 2px;
            transition: all .2s linear;
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
        color: #FF4200;
        margin-right: 4px;
      }
    }
  }
</style>
<style lang="less" scoped="scoped">

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
        width: 1180px;
        overflow: hidden;
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
          color: #fbb040;
        }
      }

      .image_con {
        width: 275px;
        height: 280px;
        background: #fafafa;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: #ccc;
        }

        img {
          display: block;
          max-width: 100%;
          max-height: 100%;
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
      font-size: 24px;
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
        overflow: hidden;
        padding: 10px;

        .title {
          font-size: 18px;
          color: #666;
        }

        ul {
          height: 490px;
          overflow-y: auto;
        }

        li {
          margin-top: 22px;
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
</style>