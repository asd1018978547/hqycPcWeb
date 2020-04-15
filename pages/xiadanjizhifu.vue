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
        <h3>新手入门 > 下单及支付</h3>
        <div class="about_content">
          <p class="title">一、如何下单？</p>
          <p>● 在小程序选中您需要的产品进行下单</p>
          <p>● 在环球云仓平台选中您需要的产品进行下单</p>
          <p class="title">二、订单状态是什么意思？</p>
          <p>● 买家待付款：消费者未支付</p>
          <p>● 买家待发货：消费者已经支付，正在清关</p>
          <p>● 待收货：海关清关放行。已安排货品出区</p>
          <p>● 交易完成：交易已经完成</p>
          <p>● 退款中：正在进行退款，1.审核中 需要耐心等待； 2.自动退款 正在处理过程中； 3、已退款未到账最快需要2小时，一般2到3个工作日会到账（备注：都是原路返回支付方）</p>
          <p>● 已发货：已产生运单号，查看物流信息。或拨打相关物流公司询问（联系客服我们是一样的处理方式） </p>
          <p>● 订单取消：待支付状态订单2小时未支付此交易自动关闭</p>
          <p class="title">三、订单可以取消吗？</p>
          <p>● “待付款”状态的订单，可自行取消</p>
          <p>● “已受理”状态的订单：保税，直邮的订单由于系统对接，已经进入了海关清关状态，订单受理后无法拦截，具体情况可咨询前台客服</p>

          <p class="title">四、下单失败怎么办？</p>
          <p>请您提供您下单失败的界面截图，然后联系我们的客服进行处理</p>
          <p class="title">五、清关不通过怎么办？</p>

          <p>清关不通过一般客服会告知具体不通过的原因，可以根据短信告知的原因，修改相关信息或者重新下单购买</p>

          <p class="title">六、支付方式？</p>
          <p>支持常见的微信、支付宝、网银支付</p>
          <p>
            <img src="../assets/img/8.png" alt="">
          </p>

          <p class="title">七、打开支付页面，提示“该页无法显示”或空白页，可能是什么原因？</p>
          <p>● 没有升级IE浏览器，导致加密级别过低，无法进入银行系统</p>
          <p>● 上网环境或上网方式受限，可能是网络服务商限制，建议更换一种上网方式</p>
          <p>● 尝试刷新页面；如果刷新不能解决问题，可能由于浏览器缓存设置的原因，请在IE菜单->工具->Internet选项->点击“删除cookies”和“删除文件”，用以清除临时文件</p>
          <p class="title">八、为什么交易不成功？</p>
          <p>
            ● 如果您的支付信息银行没有及时传输给我们，导致银行卡已经扣款成功，但商品没有购买成功，我们感到非常抱歉。不过请放心，您可以提供您下单的订单编号以及支付凭证给到我们的在线客服，确认您的扣款成功后，在能完成购买的情况下，立刻帮您完成购买，否则我们会立刻给您安排退款，相应款项会原路径返回您的支付账户
          </p>
          <p>
            ● 重复付款导致（交易状态已经是已付款状态），可能对同一笔交易重复付款，不过请放心，在您提供相应的订单编号和支付凭证给我们的客服核实后，我们会立即给您安排退款；如果您没有及时发现也不用担心，我们会对每一笔订单的款项进行核实，核实到您重复支付的情况，客服会给您进行电话或短信联系通知您，重复付款的金额会原路径返回您的支付账户
          </p>
          <p class="title">九、支付失败的原因？</p>
          <p>● “交易买家不匹配”一般是因为两个不同的手机账户扫描了支付二维码</p>
          <p>● 收款二维码，未支付时间超过1分钟，将无法再扫码支付，需重新点击微信扫码刷新便可以支付</p>
          <p class="title">十、支付注意</p>
          <p>当您点击确认支付后，请不要关闭新打开的页面（需要在新打开的页面进行支付）否则支付将无法完成</p>
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
.marginTop5 {
  margin-top: 5px;
}
.mb15 {
  margin-bottom: 15px;
}
.specifi_list {
  margin-bottom: 10px;
}
.mb10 {
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
  color: #666666;
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
  display: none;
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
  justify-content: space-between;
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