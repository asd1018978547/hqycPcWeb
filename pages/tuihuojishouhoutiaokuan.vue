<template>
  <div class="main">
    <v-top></v-top>
    <div class="searchCon padding_lr white-bg">
      <div class="container clearfix">
        <div class="logo-con lf">
          <v-logo></v-logo>
        </div>
        <div class="serarch-con lf marginTop10">
          <v-search type='link'></v-search>
        </div>
        <div class="shopCar-con lr marginTop10">
          <v-shopcar ref='shocarBar'></v-shopcar>
        </div>
      </div>
    </div>
    <div class="about_cont">
      <v-about></v-about>
      <div class="about_right">
        <h3>协议政策 > 关税规则</h3>
        <div class="about_content">
          <h2 style="text-align:center;padding-bottom:20px;">《关于完善跨境电子商务零售进口税收政策的通知》</h2>
          <p>财关税〔2018〕49号</p>
          <p>各省、自治区、直辖市、计划单列市财政厅（局），新疆生产建设兵团财政局，海关总署广东分署、各直属海关，国家税务总局各省、自治区、直辖市、计划单列市税务局，国家税务总局驻各地特派员办事处：</p>
          <p>为促进跨境电子商务零售进口行业的健康发展，营造公平竞争的市场环境，现将完善跨境电子商务零售进口税收政策有关事项通知如下：</p>
          <p>一、将跨境电子商务零售进口商品的单次交易限值由人民币2000元提高至5000元，年度交易限值由人民币20000元提高至26000元。</p>
          <p>二、完税价格超过5000元单次交易限值但低于26000元年度交易限值，且订单下仅一件商品时，可以自跨境电商零售渠道进口，按照货物税率全额征收关税和进口环节增值税、消费税，交易额计入年度交易总额，但年度交易总额超过年度交易限值的，应按一般贸易管理。</p>
          <p>三、已经购买的电商进口商品属于消费者个人使用的最终商品，不得进入国内市场再次销售；原则上不允许网购保税进口商品在海关特殊监管区域外开展“网购保税+线下自提”模式。</p>
          <p>四、其他事项请继续按照《财政部 海关总署 税务总局关于跨境电子商务零售进口税收政策的通知》（财关税〔2016〕18号）有关规定执行。</p>
          <p>五、为适应跨境电商发展，财政部会同有关部门对《跨境电子商务零售进口商品清单》进行了调整，将另行公布。</p>
          <p>本通知自2019年1月1日起执行。</p>
          <p>特此通知。</p>
          <p style="text-align:right;">    财政部 海关总署 税务总局</p>
          <p style="text-align:right;">    2018年11月29日</p>
        </div>
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
import vShopcar from "~/components/vShopcar";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import vSide from "~/components/vSideBar.vue";
import vAbout from "~/components/vAbout.vue";
export default {
  components: {
    vLogo,
    vSearch,
    vNav,
    vShopcar,
    vBottom,
    vTop,
    vAbout,
    vSide
  }
};
</script>
<style>
.marginTop5{
  margin-top: 5px;
}
.mb15 {
  margin-bottom: 15px;
}
.specifi_list{
  margin-bottom: 10px;
}
.mb10{
  margin-bottom: 10px;
}
  .sh p {
    font-size: 13px;
  }

  .redp {
    color: #ff0000 !important;
  }

  .shnp {
    line-height: 30px;
    padding-left: 26px;
    color: #666666
  }

  .pltitle {
    color: #666666;
    padding-left: 40px;
  }

  .shimg {
    font-size: 16px !important;
    color: #ff0000;
    line-height: 45px;
    margin: 5px 0;
    padding-left: 40px;
  }
  .shtitle {
    background: #f6f6f6;
    border: 1px solid #eeeeee;
    padding: 8px 15px;
    font-weight: bolder;
    font-size: 13px;
    color: #666666;
  }

  .gdDetail img {
    display: block;
    width: 100%;
  }

  .gdDetail object {
    max-width: 100% !important;
  }

  .gdDetail br {
    display: none
  }
</style>
<style lang="less" scoped="scoped">
.about_content {
  font-size: 14px;
  box-sizing: border-box;
  padding: 25px;
    color: #333 !important;
  font-family: '微软雅黑' !important;
}
.about_content img {
  max-width: 80%;
  border: 1px solid #ededed;
}
.about_content p {
  line-height: 30px;
}
.about_content .title {
  font-weight: bolder;
  margin: 10px 0;
}
.about_right {
  flex: 0 0 945px;
  background: #fff;
}
.about_right h3 {
  color: #666666;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 400;
  padding: 15px;
  box-sizing: border-box;
}
.about_cont {
  width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: 15px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between
}
  .noselect {

    -webkit-touch-callout: none;
    /* iOS Safari */

    -webkit-user-select: none;
    /* Chrome/Safari/Opera */

    -khtml-user-select: none;
    /* Konqueror */

    -moz-user-select: none;
    /* Firefox */

    -ms-user-select: none;
    /* Internet Explorer/Edge */

    user-select: none;
    /* Non-prefixed version, currently

not supported by any browser */

  }

  .lock {
    cursor: not-allowed;
    color: #ccc !important;
    border: 1px dashed #ccc !important;
  }

  .main .goods-con .info-con .Inventory_con span:first-child {
    margin-left: 0 !important;
  }

  .gmxz {
    padding: 20px;
  }

  .gmxz p {
    font-size: 14px;
    line-height: 28px;
  }

  .main {
    width: 100%;

    .searchCon {
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

    .goods-con {
      padding: 15px;

      .image_group {
        padding: 15px;
        width: 380px;

        .m_img_con {
          box-sizing: border-box;
          width: 361px;
          height: 361px;
          overflow: hidden;
          position: relative;

          img {
            width: 360px;
            height: 360px;
          }
        }

        .s_img_con {
          width: 100%;
          position: relative;
          overflow-x: auto;
          overflow-y: hidden;

          .image_con {
            box-sizing: border-box;
            width: 68px;
            height: 68px;
            text-align: center;
            margin-right: 10px;
            overflow: hidden;
            position: relative;
            border: 1px solid #ececec;

            img {
              width: 68px;
              height: 68px;
            }

            &.active {
              position: relative;
              border: 1px solid #f13e46;
            }

            &.active::after {
              content: " ";
              display: block;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 5px 5px 5px;
              border-color: transparent transparent #f13e46 transparent;
              line-height: 0;
              position: absolute;
              left: 50%;
              top: -8px;
              margin-left: -5px;
              z-index: 10;
            }
          }
        }
      }

      .info-con {
        position: relative;

        .goods_name {
          font-weight: 500;
          font-family: "微软雅黑";
          font-size: 22px;
          padding-bottom: 4px;
          color: #000;
        }

        .price_con {
          padding-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          color: #333;
          font-size: 14px;

          .unity_price {
            color: #fd0000;

            i {
              font-size: 14px;
              font-weight: bold;
            }

            em {
              font-size: 24px;
              font-style: normal;
              font-weight: bold;
              position: relative;
              border-bottom: -3px;
            }
          }
        }

        .Inventory_con {
          .Inventory {
            padding: 0 10px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            font-size: 12px !important;
            margin-left: 6px;
            margin-right: 4px;
            line-height: 24px;

            &.active {
              border-color: #fc0000;
              color: #fc0000;
              border-width: 1px;
            }
          }
        }

        .specifi_con {
          .s_title {
            width: 65px;
          }

          .tag {
            box-sizing: border-box;
            position: relative;
            padding: 0 10px;
            line-height: 24px;
            color: #656565;
            border-radius: 2px;
            border: 1px solid #ccc;
            font-size: 12px !important;
            text-align: center;
          }

          .tag.active {
            border-color: #fc0000;
            color: #fc0000;
          }
        }

        .other_con {
          span {
            display: inline-block;
            width: 40%;
            line-height: 36px;
          }
        }

        .btn_group {
          span {
            line-height: 38px;
            color: #fff;
            font-size: 14px;
            width: 128px;
            text-align: center;
            border-radius: 4px;
            margin-right: 15px;
          }

          .join_btn {
            background: #fd8008;
          }

          .buy_btn {
            background: #fe0000;
          }
        }

        .i_title {
          font-size: 14px;
          width: 60px;
          text-align: justify;
          line-height: 0;
          color: #808080;

          &:after {
            display: inline-block;
            content: "";
            padding-left: 100%;
            line-height: 0;
          }
        }
      }
    }

    .goodsContent {
      position: relative;

      .content_title_con {
        line-height: 38px;
        background: #f5f5f5;
        font-size: 14px;
        border-bottom: 1px solid #fe0000;

        span {
          display: inline-block;
          width: 110px;
          text-align: center;
        }

        span.active {
          color: #fff;
          background: #fe0000;
        }
      }

      .specifi_con {
        padding: 0 15px 10px;

        span {
          display: inline-block;
          width: 25%;
          margin-top: 10px;
        }
      }
    }
  }

  .vip_tag {
    width: 67.5px;
    height: 18.75px;
    line-height: 18.75px;
    text-align: center;
    font-size: 12px !important;
    color: #fff38d;
    background: #414141;
    border-radius: 2px;
    transform: scale(0.8);
    position: relative;
    top: -1px;
  }

  .vip_price {
    margin-top: 10px;
    padding-left: 80px;

    .join_vip {
      color: #fe0000;
      font-size: 12px;
    }
  }

  .xiajia {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1000;

    p {
      margin-top: 100px;
      font-size: 100px;
      font-weight: bold;
      color: #ccc;
    }
  }
</style>