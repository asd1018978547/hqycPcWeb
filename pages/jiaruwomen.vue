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
        <h3>关于云仓 > 加入我们</h3>
        <div class="about_content">
          <p class="title">简历投递邮箱：hqyc@a-amall.com</p>
            <table>
            <tr>
              <th style="width:50px">序号</th>
              <th style="width:70px">招聘岗位</th>
              <th >岗位职责</th>
              <th>任职要求</th>
              <th style="width:50px">薪资水平</th>
            </tr>
            <tr>
              <td>1</td>
              <td>报关员（商务专员）</td>
              <td>1. 国际进口货物商检、通关、到货安排；<br>
                2. 进出口货物商检、海关、商务等政府部门相关单证及时办理；<br>
                3. 组织进出口商检资料的准备，完善单证管理工作流程和制度；<br>
                4. 转关，退货等进出口货物的特殊业务办理及追踪；<br>
                5. 每月核销手册，与仓库对账，找出差异原因，及时申请补税；<br>
                6. 每个月做客户结转报关资料，制作报关单证，保证手册的进出口数量平衡；统计送货、收货等数量，按不同的客户或供应商进行分类整理并与之核对。</td>
              <td>1.年龄在35岁以下，有相关行业工作经验一年以上，大专以上学历优先；<br>
                2.良好的沟通能力及沟通技巧；<br>
                3.具备强烈的工作责任心和客户服务意识，沟通协作能力强。</td>
              <td>5k-7k</td>
            </tr>
            <tr>
                <td>2</td>
                <td>仓库管理员</td>
                <td>1.负责日常收货工作，按要求完成验收，对到货产品进行逐批验收，确保产品批次﹑数量及型号准确无误，分盘码放，及时录入系统和上货架;<br>
                    2.及时、准确维护库存管理系统，确保仓库物品的帐、卡、物三者一致，仓库区域划分明确，确保标志标识清楚，货位连续、字迹清晰;<br>
                    3.按操作流程拣货，分货和最后环节的包裹称重，并安排和监督临时工工作；<br>
                    4.做好仓库各种原始单证的传递、保管、归档工作；每月月末对仓库存放产品进行盘点工作 ；做好自己管辖区域的6S工作； 做好库房的安全管理工作，做好防火防盗工作。</td>
                <td>1.年龄在45岁以下，有相关行业工作经验三年以上，大专以上学历优先<br>
                    2.良好的沟通能力及沟通技巧；<br>
                    3.具备强烈的工作责任心和客户服务意识，沟通协作能力强；<br>
                    4.有驾照及叉车驾照者优先录用</td>
                <td>4k-6k</td>
            </tr>
            <tr>
                <td>3</td>
                <td>B2b运营经理</td>
                <td>1.负责公司自营B2b平台运营及团队管理工作<br>
                    2.制定平台销售计划及活动策划方案，完成平台经营目标；<br>
                    3.负责商品发布、下架、价格、库存等平台商品管理工作；<br>
                    4.经营及客户数据汇总、分析；<br>
                    5.负责平台品牌在互联网推广方案的制定；<br>
                    6.客户运营及服务，负责管理商城后台及CRM，统筹前后台客服资源，包括物流、售后等运营流程优化。<br>
                    7.协助研发部门对平台系统提出技术优化建议</td>
                <td>1.电子商务、计算机等相关专业背景，大专以上学历， 2年以上母婴、保健品等消费品类互联网或电商平台运营经验，有B2b平台运营工作经历优先；<br>
                    2. 擅长Excel数据处理，熟练使用PPT等统计分析及展示工具；<br>
                    3. 熟悉互联网电商平台运营团队建设及管理，具备强烈的工作责任心，良好的沟通协调能力及团队合作精神；<br>
                    4. 具备良好的互联网获客、运营等操作经验，整合内外部互联网资源进行平台品牌推广</td>
                <td>6k-10k</td>
            </tr>
            <tr>
                <td>4</td>
                <td>大客户运营经理</td>
                <td>1.制定平台销售计划及活动策划方案，完成平台经营目标；<br>
                    2.负责商品发布、下架、价格、库存等平台商品管理工作；<br>
                    3.经营及客户数据汇总、分析；<br>
                    4.客户运营及服务，负责管理商城后台及CRM，统筹前后台客服资源，包括物流、售后等运营流程优化。<br>
                    5.协助研发部门对平台系统提出技术优化建议。</td>
                <td>1.电子商务、计算机等相关专业背景，大专以上学历，1年以上消费品类（母婴、保健品等品类优先)电商平台运营经验；；<br>
                    2. 擅长Excel数据处理，熟练使用PPT等统计分析及展示工具；<br>
                    3. 熟悉互联网电商平台运营团队建设及管理，具备强烈的工作责任心，良好的沟通协调能力及团队合作精神。</td>
                <td>6k-8k</td>
            </tr>
            <tr>
                <td>5</td>
                <td>客服专员</td>
                <td>1.收集客户信息和用户意见；定期与合作客户进行沟通，建立良好的长期合作关系。<br>
                    2.处理客户咨询、查询以及售后问题。<br>
                    3.主动维系跟进客户，做好新品及活动通知，协助促进客户下单<br>
                    4.负责整理客户资料，收集客户信息和用户意见，资料管理、归类、整理、建档和保管工作。<br>
                    5.具有数据分类管理能力、擅长与客户沟通，工作耐心细致，善于发现问题，分析问题及时解决问题。</td>
                <td>1.女性，30岁以上，有母婴、保健品等行业工作经历者；有电商平台相关工作经验者优先；<br>
                    2.良好的沟通能力及沟通技巧；<br>
                    3.具备强烈的工作责任心和客户服务意识，沟通协作能力强；<br>
                    4.运用互联网技术工具服务客户，做好运营支持，完成平台经营目标。</td>
                <td>4k-6k</td>
            </tr>
            <tr>
                <td>6</td>
                <td>采购经理</td>
                <td>1.负责与品牌厂商、境外公司及代理商进行沟通及采购计划的制定； <br>
                    2.结合月度经营计划制定商品采购计划，管理成本、定价、进销存和产品毛利率；<br> 
                    3.对竞争对手商品结构、价格进行跟踪及分析，制定品牌、产品运营策略及商品生命周期管理，对滞销品库存及时进行处理；<br> 
                    4.对经营数据进行分析，为公司采购及定价决策提供科学依据； <br>
                    5.拓展及引进新供应商，丰富公司经营品类及SKU数量 <br>
                    6.完善供应链运作流程和制度，提升运营效率，完成公司利润目标</td>
                <td>1.35岁以下，女性，电子商务、市场营销或相关专业大专以上学历，母婴、保健品、美妆个护等产品品类商品管理相关工作经验2年以上；英语水平良好者优先 <br>
                    2. 良好的计划管理能力，擅长Excel数据处理，熟练使用PPT等统计分析及展示工具； <br>
                    3.有电商平台或连锁商超等相关工作经验，品牌厂商或代理商的商品部门工作经验或具有优质进口供应链资源者优先； <br>
                    4.熟悉商品管理流程，熟练使用进销存等业务管理系统； <br>
                    5.对订单、库存、销售数据有较强的分析能力，并利用分析结果提供决策支持；<br> 
                    6.具有良好的沟通协作与团队管理能力。</td>
                <td>7k-10k</td>
            </tr>
            <tr>
                <td>7</td>
                <td>新媒体推广经理</td>
                <td>1.负责新媒体渠道平台（公众号、微博、头条、知乎、抖音等）的内容管理和推广计划制定与实施，提高影响力、传播度和关注度；<br>
                    2.及时掌握热点，能够独立运营多渠道平台，有高度传播性的内容，提高品牌认知度；<br>
                    3.负责开拓与维护跨界合作，如媒体发布、商务合作等；<br>
                    4.能够结合公司重大业务事件进行线上线下的推广策划，并进行活动执行，评估与总结；<br>
                    5.能承受高强度，高压力的工作模式，配合公司完成量化业绩考核。</td>
                <td>1.35岁以下，大专以上学历，熟悉各个平台的合作流程及运营方式；<br>
                    2.良好的活动策划能力，能有效的提升用户；<br>
                    3.良好的文案识别能力，文字和口头表达能力强；<br>
                    4.具备优秀的职业素养和敬业精神，良好的工作态度和团队合作精神，思维活跃，主动性强；<br>
                    5.有知名企业同岗位从业经验优先。</td>
                <td>7k-10k</td>
            </tr>
            <tr>
                <td>8</td>
                <td>市场推广经理</td>
                <td>1.开展公司大客户的资料收集整理工作，建立大客户档案；<br>
                    2.跨境快消品母婴渠道、保健品渠道大客户拓展，主要包括电商平台、线下母婴连锁、社区电商平台、微商渠道或平台等；<br>
                    3.独立完成客户合作方案的策划，业务、技术对接等工作，建立良好的客户合作关系；<br>
                    4.定期拜访大客户，维护客户关系，协调、解决合作中的相关问题；<br>
                    5.密切跟踪行业动态，收集客户需求，参与制定市场政策，为公司市场决策提供依据；<br>
                    6.服从上级安排，按时完成上级交代的其他任务和工作指标。</td>
                <td>1.35岁以下，大专以上学历，具备三年以上大客户拓展及市场推广经验，有母婴、保健品、跨境进口电商等行业工作经历，具有海拍客、海带、有赞等平台拓展和销售工作经验的优先考虑 <br>
                    2.较强的沟通能力、语言表达能力、应变能力及谈判能力，熟练运营PPT\KEYNOTE等工具<br>
                    3.具备强烈的工作责任心、团队合作意识和客户服务意识，沟通协作能力强</td>
                <td>6k-8k</td>
            </tr>
            <tr>
                <td>9</td>
                <td>电商设计师/美工</td>
                <td>1.负责公司自营平台的形象设计，对首页、分类页、活动页等页面进行风格优化、合理排版<br>
                    2.负责对产品详情页的制作和优化，包括产品描述、页面设计、主图设计、文案等<br>
                    3.负责与运营、市场、技术等部门沟通，完成公司宣传手册、海报等设计需求</td>
                <td>1.熟练使用Photoshop/CorelDRAW/AI等图形设计及网页编辑软件；有母婴、保健类目设计工作经验，掌握PR等视频编辑技能者优先考虑<br>
                    2.具有扎实的美术功底，审美能力强，善于色彩搭配，具备新颖的设计创意以及良好的视觉表达能力<br>
                    3.良好的团队合作精神和高度的责任感，善于沟通协作，能够承受压力，有创新精神，保证工作质量<br>
                    4.接收专业院校优秀毕业生</td>
                <td>5k-7k</td>
            </tr>
            <tr>
                <td>10</td>
                <td>文案编辑</td>
                <td>1.负责收集相关行业或者相关产品的广告和宣传信息，并进行整理;<br>
                    2.根据公司相关广告策划以及宣传推广方案进行线上产品广告文案、宣传文案、媒体软文的撰写工作;<br>
                    3.密切配合运营部门，协助线上活动的策划和负责微信朋友圈文案输出和微信公众号策划及推广；<br>
                    4.负责公司官网文案维护工作</td>
                <td>1.具备创意思维和良好的文案功底，有较强的逻辑思维能力，能够独立撰写创意文案。<br>
                    2.学习力强，具有敏锐的洞察力，熟悉网络流行语；<br>
                    3.良好的信息搜集和资源整合能力，责任心强、工作主动积极，具有良好的服务意识和团队精神<br>
                    4.接收专业院校优秀毕业生</td>
                <td>5k-7k</td>
            </tr>
            <tr>
                <td>11</td>
                <td>总经理秘书</td>
                <td>1.完成上级及领导交办的工作；<br>
                    2.负责考勤管理及系统维护，包括执行并完善员工入职、转正、异动、离职等相关手续及流程等；<br>
                    3.负责办公用品采买与发放、固定资产的管理以及其他日常行政事务的处理；<br>
                    4.根据公司招聘计划，发布职位需求信息；筛选简历并协助招聘面试</td>
                <td>1.30岁以下，大专及以上学历，一年以上工作经验；<br>
                    2.具有良好的职业道德，工作细心，责任心强，有团队协作精神；<br>
                    3.熟练使用相关办公软件，具备基本的网络知识<br>
                    4.具有较强的亲和能力及沟通表达能力，形象气质佳</td>
                <td>4k-6k</td>
            </tr>
          </table>
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