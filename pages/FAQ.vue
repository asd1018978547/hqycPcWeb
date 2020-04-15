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
        <h3>新手入门 > FAQ</h3>
        <div class="about_content">
          <p class="title">一、环球云仓的货品是正品吗？</p>
          <p>环球云仓在澳大利亚、新西兰等国家（地区）都设有资深的直采团队，与当地的厂家和实力经销商保持着深度的合作关系。我们承诺所有出自环球云仓的商品，均为100%原装本地正品。</p>
          <p class="title">二、环球云仓的货品价格有优势吗？</p>
          <p>环球云仓通过国外大批量采购、有效的物流仓储成本管理等方式，本着最大程度让利消费者的理念进行商品定价，因而价格十分优惠。</p>
          <p class="title">三、环球云仓的货源是否稳定？</p>
          <p>环球云仓和国外品牌厂商和供应商建立了稳定的合作关系，保证了货源可以持续稳定的供应。我们有专业的物流仓储团队负责整个供应链环节的监管工作，业务团队及时监控市场并通过高效率的采购工作保证货物的安全库存。</p>
          <p class="title">四、环球云仓支持哪些支付方式？</p>
          <p>环球云仓支持常见的微信、支付宝及网银支付方式。</p>
          <p class="title">五、货品订购人需要提供身份证报关吗？</p>
          <p>根据《海关法》及海关总署要求，跨境进口商品通关时需主动向海关出示护照或身份证件。因此，在电商平台购买此类进口商品，需要按照海关总署要求对个人身份证进行验证，所以购买时需要提供订购人的身份证信息，且订购人的身份证信息须与支付人的身份证信息保持一致，敬请理解。我们将严格保密订购人信息，敬请放心。</p>
          <p class="title">六、对于购买环球云仓平台上的保税商品，“个人年度交易限值”方面的国家政策是怎样的？</p>
          <p>根据国家相关法律法规要求，消费者购买跨境贸易电子商务进口商品，以“个人自用、合理数量”为原则，参照《关于跨境电子商务零售进口税收政策的通知》（财关税〔2016〕18号）文件要求，单次交易限值为人民币5000元，个人年度交易限值为人民币26000元。</p>
          <p class="title">七、环球云仓订单什么时候发货？大概多长时间可以收到货？</p>
          <p>正常情况下，我们会在两个工作日内为订购的货品安排清关，清关成功后包裹由保税区仓库发出，经海关清关转国内快递配送，时效约2-4天。</p>
          <p>注：因海关仅在工作日处理清关，故须扣除周末、法定节假日</p>
          <p class="title">八、收到包裹后，发现漏发了或者错发，应该怎么办？</p>
          <p>请先准备好漏发、错发的相关图片（拍摄图片），再通过客服核实，待客服确认后会进行相关处理。</p>
          <p class="title">九、为什么大部分跨境进口商品都没有防伪标识？</p>
          <p>海外的购物环境比较健全，几乎没有假货仿货的存在，整个商业社会都建立在完善的信用体系上。所以海外销售的商品其实很少有防伪标识，基本没有购物者担心自己会买到假货。环球云仓的商品100%海外采购，只销售原本面向海外用户的商品，就是为了确保放心地买到原装正品。</p>
          <p class="title">十、为什么跨境保健品的包装不够精致？</p>
          <p>欧洲、美国等地保健食品一向比较环保，不会花很多的心思在产品包装上面。所以买家拿到保健食品之后，不要诧异于它的简洁。另外，国外的保健食品一般都是没有说明书的，其产品的成分、服用方法、注意事项、日期等全部都明确的标识在瓶身上。</p>
          <p class="title">十一、为什么收到的包装和网站上展示的商品包装不一样？</p>
          <p>国外产品的包装、产品的配方、配件等时常会进行调整。调整后，市场上还能同时购买到同样产品的新旧两款包装，此种为正常现象。网站展示图片仅供参考，一切以收到的实物为准。我们不能确保客户收到的产品与商城图片、产地、附件说明完全一致，但能确保为海外原装正品，同时我们会尽量及时更新网站图片。网页显示的相关图片及配方表仅作参考，以收到的实物为准。</p>
          <p class="title">十二、国外商品包装上的保质期、生产日期怎么看？</p>
          <p>国外的商品包装上一般不会单独列出保质期是多长，一般只会在产品包装上标注生产日期或有效日期，也有只标注出厂批号没有标日期的情况（如日本和欧洲的洗护品、化妆品，只有批号没有标日期）。</p>
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