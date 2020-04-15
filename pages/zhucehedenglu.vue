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
        <h3>新手入门 > 注册和登录</h3>
        <div class="about_content">
          <p class="title">注册</p>
          <p>1、单击首页顶部导航“免费注册”按钮。</p>
          <p>
            <img src="https://file.a-amall.com/u/2c27cad5a2574e24ae924addcadd9194_1.png" alt="">
          </p>
          <p>2、进入注册页面，输入手机号码、获取手机验证码、输入手机验证码、设置密码、确认密码、阅读用户协议、点击“立即注册”。</p>
          <p>
            <img src="https://file.a-amall.com/u/bbe8506e15454f448b6e12a7008fbf6b_2.png" alt="">
          </p>
          <p class="title">登录</p>
          <p>1、单击首页顶部导航“登录”按钮。</p>
          <p>
            <img src="https://file.a-amall.com/u/7c2fea9bd8d54eeda765e07bc06d2c60_3.png" alt="">
          </p>
          <p>2、进入登录页面，请在”登录环球云仓“页面输入登录用户名、密码（或使用短信验证登录）进行登录。</p>
          <p>
            <img src="https://file.a-amall.com/u/9871f484ea224a3cb935faee5570fdce_4.png" alt="">
          </p>
          <p class="title">温馨提示：</p>
          <p>● 账号已绑定安全手机号码，更换新手机号码后，为保障账号安全，请第一时间修改安全手机号码</p>
          <p>● 注册成功后，您可以修改密码（点击：我的云仓-系统设置-修改密码）；用户名不可更改</p>
          <p>● 系统会发送短信验证码，有效时间为180秒，未收到短信验证码60秒后可重新获取</p>
          <p>● 请务必仔细阅读《环球云仓服务协议》</p>
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