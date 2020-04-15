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
        <h3>商家合作 > 开放平台</h3>
        <div class="about_content">
          <h2 style="text-align:center;margin-bottom:20px;">环球云仓系统对接标准及流程</h2>
          <h4 style="text-align:center;">（试行版）</h4>
          <p>为了明确客户分类，减少研发资源浪费，特对需要系统对接客户进行分类管理，对客户沟通、备案、对接、合作做如下规定：</p>
          <p>一、对接方式：</p>
          <p>1、默认客户对接我们标准接口，客户对接我们不收对接费及对接保证金；</p>
          <p>2、我们对接客户，收费规则如下：</p>
          <table>
            <tr>
              <th>项目</th>
              <th>收费标准</th>
              <th>说明</th>
            </tr>
            <tr>
              <td>技术对接费</td>
              <td>5000元</td>
              <td rowspan="3">合作金额累计金额超过50万，全额返还。</td>
            </tr>
            <tr>
              <td>对接保证金</td>
              <td>5000元</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>10000元</td>
            </tr>
          </table>
          <p>二、合作审批流程</p>
          <p>1、系统对接客户需要获得公司同意方可进行；</p>
          <p>2、审批需要描述清楚客户经营情况，包括客户公司简介及月度计划销售额，同时递交客户资料表（见附件）</p>
          <p>3、审批流程如下：</p>
          <p>
            <img src="https://file.a-amall.com/u/49a0ec322ba3446bab2d2be856c5214a_6666.png" alt="">
          </p>
          <p>4、IT人员分工：客户自行联系客服对接研发人员</p>
          <p>三、合作客户备案工作：</p>
          <p>1、成都海关备案需向客户收取代办费用，规则如下：</p>
          <table>
            <tr>
              <th>项目</th>
              <th>收费标准</th>
              <th>说明</th>
            </tr>
            <tr>
              <td>备案代办费</td>
              <td>1000元</td>
              <td rowspan="2">合作金额累计金额超过50万，全额返还。</td>
            </tr>
            <tr>
              <td>合计</td>
              <td>1000元</td>
            </tr>
          </table>
          <p>2、支付企业备案、179支付原始数据等工作需客户自行完成。</p>
          <p>四、对接接口要求</p>
          <p>1、为了更好的服务客户，提高客户满意度，需要完全对接以下接口:</p>
          <table>
            <tr>
              <th colspan="2">SKU接口</th>
              <th>订单接口</th>
              <th>物流发货对接</th>
            </tr>
            <tr>
              <td>SKU API</td>
              <td>库存API</td>
              <td>订单API</td>
              <td>物流发货同步API</td>
            </tr>
          </table>
          <p style="text-align:right;margin-top:20px;">环球云仓国际贸易（成都）有限公司</p>
          <p style="text-align:right"> 2019年7月24日</p>
          <p>附件一、客户信息表</p>
          <table>
            <tr>
              <th>客户类型</th>
              <th>客户定义</th>
              <th>客户名称</th>
              <th>联系人</th>
              <th>电话</th>
              <th>平台类型</th>
              <th>平台属性</th>
              <th>运营方式</th>
              <th>GMV</th>
              <th>澳新产品占比</th>
            </tr>
            <tr>
              <td rowspan="3">S2b2b2c</td>
              <td rowspan="3">b2b</td>
              <td>母婴加盟连锁</td>
              <td></td>
              <td></td>
              <td></td>
              <td>自建</td>
              <td>自有平台</td>
              <td>O2O</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>传统批发</td>
              <td></td>
              <td></td>
              <td></td>
              <td>自建</td>
              <td>自有平台</td>
              <td>线上</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>线上b2b</td>
              <td></td>
              <td></td>
              <td></td>
              <td>自建</td>
              <td>自有平台</td>
              <td>线上</td>
              <td></td>
              <td></td>
            </tr>
          </table>
          <p>附件二、成都关区备案流程</p>
          <p>
            <img src="https://file.a-amall.com/u/f69f33720e2d464ab0c1356df37b436e_22.png" alt="">
          </p>
          <p>附件三、成都关区备案所需资料及填写要求：</p>
          <p>===============================================</p>
          <p>资料准备一</p>
          <p>===============================================</p>
          <p>对接海关所需要提交资料--获取DXPID账号</p>
          <p>1、 跨境进口统一版企业接入申请表---1份</p>
          <p>需要：法人签字、法人印章、公章</p>
          <p>2、 公司营业执照---1份</p>
          <p>需要：公章</p>
          <p>3、 海关进出口货物收发货人备案回执（海关注册证）---1份</p>
          <p>需要：地方海关章且加盖公章</p>
          <p>4、 情况说明---1份</p>
          <p>需要：公章</p>
          <p>5、 境外企业授权书---1份</p>
          <p>需要：公章</p>
          <p>6、 ICP备案截图---1份</p>
          <p>需要：公章</p>
          <p>7、 授权办理人证明---1份</p>
          <p>需要：公章</p>
          <p>8、 授权办理人身份证复印---1份</p>
          <p> 需要：公章</p>
          <p>===============================================</p>
          <p>资料准备二</p>
          <p>===============================================</p>
          <p>对接信通所需要提交资料--获取信通分配账号</p>
          <p>1、成都跨境贸易电子商务企业情况登记表---1份</p>
          <p>需要：公章，另扫描一份发至信通邮箱（kf@xtoneict.com ）</p>
          <p>2、成都跨境贸易电子商务公共服务平台使用协议书---3份</p>
          <p>需要：法人签字、公章</p>
          <p>3、中国电子口岸数字证书服务申请受理登记表---1份</p>
          <p>需要：公章</p>
          <p>4、申报数据真实性承诺书---1份</p>
          <p>需要：公章</p>
          <p>5、营业执照---1份</p>
          <p>需要：公章</p>
          <p>以上资料准备齐全后待海关DXPID账号出来，由企业自行填写在成都跨境贸易电子商务企业情况登记表后，递交给信通核对；信通确认且分配账号后，登陆https://cbec.cdkjt.com.cn/login填写相关信息申报。（账号：营业执照号码，密码均：8个8，资料填写中标*必填，其他可以不填。）</p>
          <p>附件需要提供的有：</p>
          <p>1、营业执照；2、海关进出口货物收发货人备案回执（海关注册证）；3、ICP备案截图或者有赞协议；4、境外企业授权（原图文件一般过大，建议截图上传）</p>
          <p>因现在支付公司在成都备案的只有4家企业：支付宝、微信、通联、高汇通，若客户合作的支付公司是这4家以外的，需要另填写情况说明，待信通盖章确认后，才可进行后续系统对接流程。</p>
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
.about_content table {
  border-collapse: collapse;
  width: 100%;
}
.about_content table td,
.about_content table th {
  border: 1px solid #333;
  text-align: center;
  padding: 5px 0;
}
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