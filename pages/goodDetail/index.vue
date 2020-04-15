<template>
  <div class="main">
    <v-top></v-top>
    <div class="searchCon padding_lr white-bg">
      <div class="container clearfix">
        <div class="logo-con lf">
          <v-logo></v-logo>
        </div>
        <div class="serarch-con lf marginTop10">
          <v-search type="link"></v-search>
        </div>
        <div class="shopCar-con lr marginTop10">
          <v-shopcar ref="shocarBar"></v-shopcar>
        </div>
      </div>
    </div>
    <v-nav></v-nav>
    <div class="goodsInfoCon marginTop20 white-bg" v-loading="isLoading">
      <div class="container white-bg">
        <div class="goods-con flex">
          <div class="image_group">
            <div class="m_img_con border">
              <img v-if="imgShowIndex != -1" class="laftImg" :src="baseUrl+showImg" width="360" />
            </div>
            <div class="s_img_con marginTop10">
              <span
                class="image_con"
                :class="imgShowIndex == index?'active':''"
                v-for="(item,index) in imageArr"
                :key="index"
                @click="showImgChange(index)"
                v-show="item"
              >
                <img class="center" :src="baseUrl+item" />
              </span>
            </div>
          </div>
          <div class="info-con flex1 padding10 size14">
            <div class="xiajia" v-show="baseGoodsInfo.Status == 0">
              <p class="text-center">商品已下架</p>
            </div>
            <p class="goods_name" style="margin-left:19px">{{goodsInfo.ProName}}</p>
            <p class="color80 marginTop10 size14" style="margin-left:19px">{{goodsInfo.ShortDesc}}</p>
            <!-- <p v-if="$route.query.type == 1" class="mb15">
              <span class="i_title">发货地</span>
              ：{{goodsInfo.DeliveryAddress}}
            </p>-->
            <div class="mainInfo" style="margin-top:2px">
              <div class="price_con marginTop10">
                <span class="i_title" style="color:#666666">价格</span> ：
                <span class="marginRight10" v-if="ShowStatus==1">
                  <span class="unity_price" style="margin-left:-6px">
                    <i>￥</i>
                    <!-- <em v-if="goodsInfo.PageShowType ==1||goodsInfo.PageShowType ==0">{{preview.TotalPrice.toFixed(2)}}</em>
                    <em v-else>{{baseGoodsInfo.PriceStart.toFixed(2)}}-{{baseGoodsInfo.PriceEnd.toFixed(2)}}</em>-->
                    <em
                      v-if="showTOTALpRIce||goodsInfo.IsMixedLoading||goodsInfo.SkuChildStandards.length==0"
                    >{{preview.TotalPrice.toFixed(2)}}</em>
                    <em
                      v-else
                    >{{baseGoodsInfo.PriceStart.toFixed(2)}}-{{baseGoodsInfo.PriceEnd.toFixed(2)}}</em>
                  </span>

                </span>

                <span
                  class="marginRight10"
                  style="color:red;margin-left:-4px"
                  v-if="ShowStatus==0"
                >登录后看价格</span>
              </div>
              <p style="margin-top:0px;margin-bottom:5px" v-show="baseGoodsInfo.OriginName">
                <span class="i_title">税 费</span>
                <span>&nbsp;:</span>
                <span
                  style="color:#999999;"
                  v-if="ShowStatus==1 &&(showTOTALpRIce||goodsInfo.IsMixedLoading||goodsInfo.SkuChildStandards.length==0)"
                >￥{{parseFloat(((isVip?goodsInfo.NakePrice:goodsInfo.NakeRetailPrice)*goodsInfo.TaxRate/100)).toFixed(2)}}</span>
                <span
                  style="color:#999999;"
                  v-if="ShowStatus==1&&!showTOTALpRIce&&!goodsInfo.IsMixedLoading&&goodsInfo.SkuChildStandards.length!=0"
                >￥{{parseFloat(baseGoodsInfo.NakePriceStart*goodsInfo.TaxRate/100).toFixed(2)}}-{{parseFloat(baseGoodsInfo.NakePriceEnd*goodsInfo.TaxRate/100).toFixed(2)}}</span>
                <span style="color:red;margin-left:2px" v-if="ShowStatus==0">登录后看税费</span>
              </p>
              <div style="margin-bottom:0">
                <span class="i_title mb10">配送</span>
                ：
                <span
                  style="color:#999999;margin-left:-3px"
                  v-if="$route.query.type == 1"
                >{{goodsInfo.DeliveryAddress}}</span>
                <span style="color:#999999;margin-left:6px">至</span>
                <el-cascader
                  @change="chooseCity"
                  size="small"
                  v-model="fhd"
                  separator="-"
                  placeholder="请选择地址"
                  :props="areaOptions"
                  :options="address"
                  filterable
                ></el-cascader>
                <span
                  style="color:#999999;margin-left:6px"
                  v-if=" this.$route.query.type==1&&(showTOTALpRIce||goodsInfo.IsMixedLoading) &&ShowStatus==1"
                >{{preview.TransFee1==0 ? '': preview.TransFee1.toFixed(2)}}</span>
                <span
                  style="color:#999999;margin-left:6px"
                  v-if="this.$route.query.type==2&&(showTOTALpRIce||goodsInfo.IsMixedLoading)&&ShowStatus==1"
                >{{preview.TransFee2==0 ? '': preview.TransFee2.toFixed(2)}}</span>
                <span
                  style="color:#999999;margin-left:6px"
                  v-if="this.$route.query.type==3&&(showTOTALpRIce||goodsInfo.IsMixedLoading)&&ShowStatus==1"
                >{{preview.TransFee3==0 ? '': preview.TransFee3.toFixed(2)}}</span>
                <span style="color:#999999;">元</span>
              </div>
            </div>
            <p class="marginTop15 mb15" v-show="goodsInfo.SN">
              <span class="i_title">编码</span>
              ：{{goodsInfo.SN}}
            </p>
            <p class="mb15" v-show="baseGoodsInfo.BrandName">
              <span class="i_title">商品品牌</span>
              ：{{baseGoodsInfo.BrandName}}
            </p>
            <p class="mb15" v-show="baseGoodsInfo.OriginName">
              <span class="i_title">原产地</span>
              ：{{baseGoodsInfo.OriginName}}
            </p>

            <!-- <p class="mb15" v-show="goodsInfo.StandardInfo">
              <span class="i_title">包装规格</span>
              ：{{goodsInfo.StandardInfo}}
            </p> -->
            <p class="mb15" v-show="goodsInfo.PackgeInfo">
              <span class="i_title">包装</span>
              ：{{goodsInfo.PackgeInfo}}
            </p>
            <div class="Inventory_con mb15" v-show="inventory.length!=0">
              <span class="i_title">发货方式</span> ：
              <!--不要删除-->
              <!-- <span
                :class="InventoryIndex == item.type?'active':''"
                class="Inventory pointer color65 noselect"
                v-for="(item,index) in inventory"
                :key="index"
                @click="InventoryChange(item,item.type)"
              >{{item.name}}</span>-->
              <span
                style="margin-left:-3px"
                :class="InventoryIndex == item.type?'active':''"
                class="Inventory pointer color65 noselect"
                v-for="(item,index) in inventory"
                :key="index"
              >{{item.name}}</span>
            </div>
            <div
              style="margin-left:20px"
              class="specifi_con flex flex-c"
              v-show="SkuStandardsItem.length!=0"
              v-for="(item,index) in SkuStandardsItem"
              :key="index"
            >
              <div>
                <span class="i_title mb10">{{ item.StandardName }}</span> ：
              </div>
              <div class="flex1">
                <span
                  class="specifi_list"
                  v-for="(i, ind) in item.SkuChildStandardValues"
                  :key="ind"
                >
                  <span class="specifi_list_item marginLeft10 flex flex-c">
                    <span class="flex1">
                      <span
                        style="margin-left:-7px"
                        :class="{ active: i.active, lock: i.isLock }"
                        class="tag pointer noselect"
                        @click="specificationChange(i)"
                      >
                        {{
                        i.Val
                        }}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <!-- <div class="Inventory_con" style="margin-left:20px" v-show="previews.length!=0">
              <span class="i_title mb10">规格</span> ：
              <span
                :class="previewsIndex == index?'active':''"
                class="Inventory pointer color65 noselect mb15"
                v-for="(item,index) in previews"
                :key="index"
                @click="previewsChange(item,index)"
              >{{ item.Amount + item.Desc }}</span>
            </div> -->

            <div class="count_con marginTop5" style="margin-left:20px" v-if="showTOTALpRIce||goodsInfo.IsMixedLoading">
              <span class="i_title">数量</span> ：
              <el-input-number
              style="margin-left:-5px"
                v-if="$route.query.type != 3"
                @change="numberChange"
                v-model="count"
                size="mini"
                :min="min"
                :max="goodsInfo.Amount > 99999 ? 99999 / (previews[previewsIndex] ? previews[previewsIndex].Amount : 1) :goodsInfo.Amount / (previews[previewsIndex] ? previews[previewsIndex].Amount : 1)"
                label
              ></el-input-number>
              <el-input-number
                v-else
              style="margin-left:-5px"
                @change="numberChange"
                v-model="count"
                size="mini"
                :min="min"
                :max="goodsInfo.Amount > 99999 ? 99999 / (previews[previewsIndex] ? previews[previewsIndex].Amount : 1) :goodsInfo.Amount / (previews[previewsIndex] ? previews[previewsIndex].Amount : 1)"
                label
              ></el-input-number>
              <span
                class="padding_lr color80 size12"
                style="line-height: 20px;"
              >库存 &nbsp;{{goodsInfo.Amount}}</span>
            </div>
            <p
              class="mb15"
              style="margin-top:20px;margin-left:20px"
              v-show="Expiration != '' && Expiration != undefined"
            >
              <span class="i_title">效期</span>
              ：
              <span>{{ Expiration }}</span>
            </p>
            <div
              style="margin-left:20px;margin-top:20px"
              class="price_con marginTop10"
              v-if="goodsInfo.IsMixedLoading"
            >
              <!-- <span class="i_title">价格</span> ：
              <span class="marginRight10">
                <span class="unity_price" v-if="ShowStatus==1">
                  <i>￥</i>
                  {{parseFloat(isVip?goodsInfo.Price:goodsInfo.RetailPrice).toFixed(2)}}
                </span>
                <span class="unity_price" style="margin-left:-2px" v-if="ShowStatus==0">登录后看价格</span>
                <template v-if="$route.query.type != 3 &&ShowStatus==1">
                  (
                  税率：
                  <span class="revenue">{{goodsInfo.TaxRate}}%</span> )
                </template>
              </span> -->
            </div>
            <div class="btn_group marginTop15" style="margin-left:15px">
              <span class="join_btn pointer" @click="joinCar">加入购物车</span>
              <span class="buy_btn pointer" @click="subOrder">立即下单</span>
              <span class="join_btn pointer" @click="yijianzuidijia">一键最低价</span>
            </div>
          </div>
        </div>
        <div class="goodsContent marginTop20">
          <p class="content_title_con">
            <span @click="changeActive(1)" :class="defActive == 1 ? 'active' : ''">商品详情</span>
            <span @click="changeActive(2)" :class="defActive == 2 ? 'active' : ''">售后保障</span>
          </p>

          <div class="padding_b sh" v-show="defActive == 2">
            <p class="shtitle marginTop10">服务保障</p>
            <p class="shimg shimg1">品质保障</p>
            <p class="pltitle">您在环球云仓线上商城上购买的境外商品均为自营海外仓原装进口，海关监管并检验，商品进驻海关保税区，都会做商检，以确保商品是正品。</p>
            <p class="shimg shimg2">标准检测</p>
            <p
              class="pltitle"
            >境外商品的品质、健康、标识等使用标准符合原产国使用标准，但是可能与我国标准有所不同，所以在使用过程中由此可能产生的不适以及其他风险，由您个人承担。</p>
            <p class="shimg shimg3">无理由退换</p>
            <p
              class="pltitle"
            >为了保证客户权益不受损害，跨境商品不支持二次销售，故环球云仓不支持无理由退换。</p>
            <p class="shtitle marginTop10">买家须知</p>
            <p class="shnp marginTop10">
              1、
              请在下单时填写真实信息，收货姓名务必与身份证姓名保持一致，（因受海关监管需要提供身份证号码，直邮提供正反面照片）环球云仓提供个人信息安全保护，请您放心购买。
            </p>
            <p class="shnp">2、根据财政部、海关总署、国家税务总局规定，跨境电子商务零售进口商品的单次交易限值为人民币5000元，个人年度交易限值为人民币26000元。</p>
            <p class="shnp">3、在环球云仓线上商城购买保税区发货的境外商品时，自动视为由环球云仓代您向海关进行申报和代缴税款。</p>
            <p
              class="shnp"
            >4、保税发货正常情况下运单号会在2个工作日之内出，客户会在下单后3-7个工作日左右收到货，直邮发货正常情况下需要15-30天，周末及国家法定节假日等特殊情况国家海关工作人员不予清关和发货，敬请谅解。</p>
            <p class="shtitle marginTop10">消费者告知书</p>
            <p class="shnp marginTop10">1、您通过本网站购买的所有境外物品等同于境外购买。</p>
            <p
              class="shnp"
            >2、您购买的所有境外物品适用的品质、健康、安全、卫生、环保、标示等项目标准可能与我国质量安全标准不同，由此可能产生的危害或损失以及法律责任或其他风险，将由您个人承担。</p>
            <p class="shnp">3、您通过跨境电商平台购买的境外物品可能无中文标签或说明书，请在下单前认真阅读平台提供的物品信息。</p>
            <p class="shnp">
              4、跨境商品订单付款后本网站立即向海关申报，故本网站不接受7天无理由退货。在订单处于已发货状态时，如果您申请退货退款，请将包裹转寄至本网站指定收货地址（不接收到付包裹），
              <span
                class="redp"
                style="font-weight:bolder;font-size:18px"
              >本网站收到包裹核对无误，扣除税金及发货运费后，方可退款。</span>
            </p>
            <p
              class="shnp"
            >5、本网站保证所有商品在发出时为全新无瑕疵商品，在运输途中难免出现碰撞，可能会出现商品外包装变形现象，如（奶粉憋罐，保健品包装盒褶皱），在不影响商品正常使用的情况下，本网站不接受退货退款。</p>
            <p class="shnp">6、建议您对境外物品有一定了解并评估是否适合自己使用后再下单，感谢您的配合。</p>
            <p class="shtitle marginTop10">关于售后</p>
            <p class="shnp redp marginTop10">Q：收货后，发现商品被损坏，应该怎么办？</p>
            <p class="shnp">
              A： 1、收货时请第一时间检查快递包装是否完整，当场验货确认无误后再签收。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、签收时发现货品损坏请第一时间联系我们的售后人员。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、申请售后需在48小时内提供以下凭证：
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）包裹全貌照片
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）发货面单照片
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）反应产品问题点的照片
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（4）问题产品与面单信息合照
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（5）产品批次号照片，效期照片
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（6）产品放箱子里照片（开箱照）
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、若经核查，责任需我方承担且客户需要退货退款的，客户需要按我们给您提供的地址寄回，并向我们提供寄回物流信息。寄回的商品经核查无误后我们会第一时间为您处理退款事宜。
            </p>
            <p class="shnp redp">Q：付款后，没有发货的前提下能不能申请退款？</p>
            <p class="shnp">
              A： 1、 可以直接退款（付款后，我们会第一时间发至海关申报，所以在没有申报的前提下可以直接为您操作退款）。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、不能直接退款，若核查已申报，您的订单会按正常订单发货，寄送到您的订单地址（因为我们的货品都是保税仓出货，所以包裹不能拒收）收货后按退货地址自费寄回（拒收到付件哦），并向我们
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;提供寄回物流信息，寄回的商品核查不影响二次销售的前提下为您退回商品费用，来回运费需要您来承担。
            </p>
            <p class="shnp redp">Q：收货时，如果发现包裹外箱被损坏，应该怎么办？</p>
            <p class="shnp">
              A： 1、在收到快递后，如您发现出现了外箱破损、商品破损、错发的情况，可以在拍照（包括：快递外箱照片、面单照片、外箱破损处照片、产品破损处照片等）并将照片提供给环球云仓客服的前提下
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拒收包裹。
              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、除上述情况外，环球云仓一律不支持无理由拒收。
            </p>
            <p class="shnp">注：如有其它问题，请直接与我们售后人员联系！</p>
          </div>
          <div class="specifi_con border-bottom clearfix" v-show="defActive == 1">
            <span
              class="lf color65 size12"
              v-for="(item,index) in specifiContents"
              :key="index"
            >{{item.ProName}} : {{item.ProVal}}</span>
          </div>
          <div class="marginTop10 padding_b text-center" v-show="defActive == 1">
            <div class="gdDetail" style="display:inline-block;" v-html="goodsInfo.Detail"></div>
          </div>
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
    <v-side></v-side>
  </div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
import vLogo from "~/components/vLogo";
import vSearch from "~/components/vSearchBar";
import vNav from "~/components/vNav";
import goodsItem from "~/components/vGoodsItem";
import vShopcar from "~/components/vShopcar";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import vSide from "~/components/vSideBar.vue";
import { API } from "~/_config/API.js";
import { mapState } from "vuex";
import { _CONFIG } from "~/_config/config.js";
import { BUP } from "static/js/BUP.js";
export default {
  components: {
    vLogo,
    vSearch,
    vNav,
    vShopcar,
    vBottom,
    vTop,
    vSide
  },
  head() {
    return {
      title: this.goodsInfo.ProName || "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.SeoDescription
        },
        { hid: "keywords", name: "keywords", content: this.SeoKeyWords }
      ]
    };
  },
  data() {
    return {
      showTOTALpRIce: false,
      defActive: 1,
      ShowStatus: 0,
      baseUrl: ali_oss_data.URL_IMG_SHOW,
      Expiration: "",
      isLoading: true,
      navList: [
        {
          text: "保税直供",
          id: 1,
          active: false
        },
        {
          text: "海外直邮",
          id: 2,
          active: false
        }
      ],
      skuId: "",
      SkuStandardsItem: [],
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      expressType: "",
      count: 1,
      SeoKeyWords: "",
      SeoDescription: "",
      goodsId: "",
      price: 0,
      childSkuId: "",
      fhd: [],
      address: [],
      baseGoodsInfo: {},
      unMemberPrice: 0,
      amount: 0,
      //城市code
      cityCode: "",
      //省市code
      provinceCode: "",
      changeType: 0,
      min: 1,
      goodsInfo: {},
      imageArr: [],
      inventory: [],
      previews: [],
      preview: {
        Price: 0,
        TotalPrice: 0,
        TransFee1: 0,
        TransFee2: 0,
        TransFee3: 0
      },
      previewsIndex: 0,
      moreStandardInfo: [],
      imgShowIndex: -1,
      InventoryIndex: 0,
      isError: {},
      specifiContents: [],
      detail: "",
      choiceSpecifi: false,
      areaOptions: {
        value: "Code",
        label: "Name",
        children: "Children"
      },
      orderTypeList: {
        order_1: [],
        order_2: [],
        order_3: []
      }
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.loginStatus.logined,
      user: state => state.loginStatus.loginedUser,
      isVip() {
        if (this.isLogin) {
          return this.user.isMember;
        } else {
          return false;
        }
      }
    }),
    showImg() {
      if (this.imageArr.length != 0) {
        return this.imageArr[this.imgShowIndex];
      } else {
        return "";
      }
    },
    goodsPrice() {
      if (this.goodsInfo.Price1) {
        let a = (this.price * this.goodsInfo.TaxRate) / 100;
        a += this.goodsInfo.Price1;
        return parseFloat(a).toFixed(2);
      }
    }
  },
  methods: {
    yijianzuidijia() {
      API.getzuijijia({
        skuId: this.$route.query.goodsId,
        OrderType: this.$route.query.type,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        window.open(
          "/goodDetail?goodsId=" +
            res.Data.SkuId +
            "&type=" +
            res.Data.OrderType,
          "_self"
        );
      });
    },
    previewsChange(item, index) {
      this.previewsIndex = index;
      this.calcPrice();
    },
    chooseCity(val) {
      this.provinceCode = val[0];
      this.cityCode = val[1];
      this.calcPrice();
    },
    calcPrice() {
      if (
        this.count *
          (this.previews[this.previewsIndex]
            ? this.previews[this.previewsIndex].Amount
            : 1) ===
        0
      )
        return;

      API.calcPrice({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        amount:
          this.count *
          (this.previews[this.previewsIndex]
            ? this.previews[this.previewsIndex].Amount
            : 1),
        cityCode: this.cityCode,
        provinceCode: this.provinceCode,
        skuId: this.goodsInfo.SkuId,
        expressType: this.expressType
      }).then(res => {
        if (res.Data != null) {
          this.preview = Object.assign(res.Data);
          console.log(" this.preview: ", this.preview);

          this.previews = this.goodsInfo.SkuChildStandardPreviews;
        }
      });
    },
    numberChange() {
      // this.calcPrice();
    },
    changeActive(v) {
      this.defActive = v;
    },
    showImgChange(index) {
      this.imgShowIndex = index;
      this.$nextTick().then(() => {
        $(".laftImg").BUP(0.5);
      });
    },
    showImgChange1(index) {
      this.imgShowIndex1 = index;
      this.$nextTick().then(() => {
        $(".laftImg").BUP(0.5);
      });
    },
    InventoryChange(obj, i) {
      let self = this;
      this.Expiration = "";
      this.InventoryIndex = obj.type;
      this.expressType = obj.type;
      this.SkuStandardsItem = this.moreStandardInfo["OrderTypeList" + obj.type];
      this.count = 1;
      if (this.SkuStandardsItem.length == 0) {
        this.previews = [];
        this.preview = {
          Price: 0,
          TotalPrice: 0,
          TransFee2: 0
        };
        this.changeType = obj.type;
        self.goodsInfo = this.orderTypeList["order_" + obj.type][0];
        if (self.goodsInfo.MoreImage instanceof Array) {
        } else {
          self.goodsInfo.MoreImage = self.goodsInfo.MoreImage.split(",");
        }
        this.Expiration = this.orderTypeList["order_" + obj.type][0].Expiration;
        this.changeType = obj.type;
        let aimg = [];
        aimg.push(self.goodsInfo.Image);
        self.goodsInfo.MoreImage.forEach(element => {
          aimg.push(element);
        });
        this.imageArr = aimg;
        this.showImgChange(0);
        this.calcPrice();
        this.$router.push({
          path: "/goodDetail",
          query: {
            goodsId: this.$route.query.goodsId,
            type: obj.type
          }
        });
        return;
      }
      this.SkuStandardsItem.map(v => {
        v.SkuChildStandardValues.map(item => {
          item.active = false;
        });
      });
      this.previews = [];
      this.preview = {
        Price: 0,
        TotalPrice: 0,
        TransFee2: 0
      };
      this.changeType = obj.type;
    },
    fspecificationChange() {},
    specificationChange(obj, isf) {
      this.Expiration = "";
      if (obj.isLock) return;
      const a = JSON.parse(JSON.stringify(this.SkuStandardsItem));
      let flag = false;
      this.count = 1;
      a.map(v => {
        v.SkuChildStandardValues.map(item => {
          if (v.StandardId == obj.StandardId) {
            if (!isf) {
              item.isLock = false;
            }
            if (item.ValId == obj.ValId) {
              if (obj.active) {
                item.active = false;
                flag = true;
              }
            }
          }
        });
      });
      if (flag) {
        this.showTOTALpRIce = false;

        this.SkuStandardsItem = a;
        return;
      }
      a.map(v => {
        if (v.StandardId == obj.StandardId) {
          v.SkuChildStandardValues.map(item => {
            if (item.ValId == obj.ValId) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
        }
      });
      this.SkuStandardsItem = a;
      let arr = [];
      a.map(v => {
        v.SkuChildStandardValues.map(item => {
          if (item.active) {
            arr.push(item.StandardId + "," + item.ValId);
          }
        });
      });
      this.checkOrderList([obj.StandardId + "," + obj.ValId]);
      if (arr.length < a.length) {
        return;
      } else {
        this.showTOTALpRIce = true;
        let o = this.orderTypeList["order_" + this.changeType];
        let checkObj = null;
        o.map(v => {
          let farr = [];
          v.SkuChildStandards.map((item, index) => {
            let sid =
              item.SkuChildStandardValues[0].StandardId +
              "," +
              item.SkuChildStandardValues[0].ValId;
            arr.map(ai => {
              if (sid == ai) {
                farr.push(true);
              }
            });
          });
          if (farr.length == arr.length) {
            checkObj = v;
          }
        });
        if (checkObj != null) {
          this.goodsInfo = checkObj;
          this.Expiration = checkObj.Expiration;
          let aimg = JSON.parse(JSON.stringify(this.imageArr));
          aimg[0] = this.goodsInfo.Image;
          this.imageArr = aimg;
          this.showImgChange(0);
          this.$nextTick(() => {
            this.previews = this.goodsInfo.SkuChildStandardPreviews;
            this.previewsIndex = 0;
            this.calcPrice();
            this.$router.push({
              path: "/goodDetail",
              query: {
                goodsId: checkObj.SkuId,
                type: checkObj.OrderType
              }
            });
          });
        }
      }
    },
    checkOrderList(data) {
      // 检查商品规格数组
      // 商品数组
      let arr = this.orderTypeList["order_" + this.changeType];
      // 规格数组
      let hasArr = [];
      data.map(d => {
        arr.map(vitem => {
          vitem.SkuChildStandards.map(item => {
            let s =
              item.StandardId + "," + item.SkuChildStandardValues[0].ValId;
            if (s == d) {
              hasArr.push(vitem);
            }
          });
        });
      });
      let a = JSON.parse(JSON.stringify(this.SkuStandardsItem));
      data.map(d => {
        let stdid = d.split(",")[0];
        a.map(v => {
          if (v.StandardId != stdid) {
            v.SkuChildStandardValues.map(item => {
              item.isLock = true;
              let f = JSON.parse(JSON.stringify(item.active));
              hasArr.map(hasItem => {
                hasItem.SkuChildStandards.map(hasStd => {
                  if (hasStd.StandardId != stdid) {
                    if (hasStd.SkuChildStandardValues[0].ValId == item.ValId) {
                      item.isLock = false;
                      f ? (item.active = true) : (item.active = false);
                    } else {
                      f ? (item.active = true) : (item.active = false);
                    }
                  }
                });
              });
            });
          }
        });
        this.SkuStandardsItem = a;
      });
    },
    calcSkuPrice() {
      const a = JSON.parse(JSON.stringify(this.moreStandardInfo));
      const std = [];
      a.map(v => {
        v.Values.map(item => {
          if (item.active) {
            std.push({
              standardId: item.StandardId,
              valId: item.ValId
            });
          }
        });
      });
      API.calcSkuPrice({
        skuId: this.$route.query.goodsId,
        Standards: std,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        const data = res.Data;
        this.childSkuId = data.SKuId;
        let aimg = JSON.parse(JSON.stringify(this.imageArr));
        aimg[0] = this.goodsInfo.Image;
        this.imageArr = aimg;
        this.price = data.Price;
        this.unMemberPrice = data.UnMemberPrice;
        this.amount = this.expressType == 2 ? data.Amount2 : data.Amount1;
        this.imgShowIndex = -1;
        this.imgShowIndex = 0;
        this.goodsInfo.SN = data.SN;
        this.choiceSpecifi = true;
        this.getInventory(data);
        this.calcPrice();
        this.$forceUpdate();
        this.$nextTick().then(() => {
          $(".laftImg").BUP(0.5);
        });
      });
    },

    getInventory(obj) {
      let arr = [];
      let o = {
          name: "保税备货",
          type: 2
        },
        m = {
          name: "跨境直邮",
          type: 1
        },
        n = {
          name: "一般贸易",
          type: 3
        };
      if (obj.order_2[0]) arr.push(o);
      if (obj.order_1[0]) arr.push(m);
      if (obj.order_3[0]) arr.push(n);
      // this.inventory = arr;

      arr.forEach(item => {
        if (this.InventoryIndex == item.type) {
          this.inventory.push(item);
        }
      });
      console.log("this.inventory : ", this.inventory);

      this.$forceUpdate();
    },
    // !不要删除下面代码
    // getInventory(obj) {
    //   let arr = [];
    //   let o = {
    //       name: "保税备货",
    //       type: 2
    //     },
    //     m = {
    //       name: "跨境直邮",
    //       type: 1
    //     },
    //     n = {
    //       name: "一般贸易",
    //       type: 3
    //     };
    //   if (obj.order_2[0]) arr.push(o);
    //   if (obj.order_1[0]) arr.push(m);
    //   if (obj.order_3[0]) arr.push(n);
    //   this.inventory = arr;
    //   this.$forceUpdate();
    // },
    repalceImg(e) {
      let imgSrc = require("~/assets/img/error_img.png");
      e.target.src = imgSrc;
      this.isError = {
        width: "80%"
      };
    },
    // 获取当前sku商品
    getSkuGoodsInfo(data) {
      let obj = null;
      data["OrderTypeList" + this.$route.query.type].map(v => {
        if (v.SkuId == this.$route.query.goodsId) {
          obj = v;
        }
      });
      return obj;
    },
    getGoodsInfo() {
      return new Promise((rs, rj) => {
        API.goodsDetail({
          expressType: this.$route.query.type,
          SkuId: this.goodsId,
          token: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null
        }).then(res => {
          this.isLoading = false;
          if (res.ResponseId == 0) {
            this.ShowStatus = res.Data.ShowStatus;
            console.log(this.ShowStatus);

            let data = res.Data;
            this.baseGoodsInfo = data;
            this.goodsInfo = this.getSkuGoodsInfo(data.SkuStandardDetails);
            console.log(" this.goodsInfo: ", this.goodsInfo);

            let arr =
              this.goodsInfo.MoreImage != ""
                ? this.goodsInfo.MoreImage.split(",")
                : [];

            arr.unshift(data.Image);
            this.price = data.Price1;
            this.previews = this.goodsInfo.SkuChildStandardPreviews;
            this.skuId = data.SkuId;
            this.SeoKeyWords = data.SeoKeyWords;
            this.SeoDescription = data.SeoDescription;
            this.moreStandardInfo = data.SkuStandards;
            this.expressType = this.$route.query.type;
            this.changeType = this.$route.query.type;
            this.InventoryIndex = this.$route.query.type;
            this.SkuStandardsItem = this.moreStandardInfo[
              "OrderTypeList" + this.$route.query.type
            ];
            let stdIds = [];
            this.goodsInfo.SkuChildStandards.map(v => {
              stdIds.push(
                v.SkuChildStandardValues[0].StandardId +
                  "," +
                  v.SkuChildStandardValues[0].ValId
              );
            });
            this.orderTypeList.order_1 = data.SkuStandardDetails.OrderTypeList1;
            this.orderTypeList.order_2 = data.SkuStandardDetails.OrderTypeList2;
            this.orderTypeList.order_3 = data.SkuStandardDetails.OrderTypeList3;
            this.getInventory(this.orderTypeList);
            let ite = [];
            this.SkuStandardsItem.map(v => {
              v.SkuChildStandardValues.map((item, index) => {
                let str = item.StandardId + "," + item.ValId;
                item.active = false;
                let flag = false;
                stdIds.map(i => {
                  if (str == i) {
                    flag = true;
                  }
                });
                if (flag) {
                  ite.push(item);
                }
              });
            });
            if (ite.length < 1) {
              this.Expiration = this.orderTypeList[
                "order_" + this.$route.query.type
              ][0].Expiration;
            } else {
              ite.map(v => {
                //!默认选择代码--暂时注释
                // this.specificationChange(v, true);
              });
            }
            this.$nextTick().then(() => {
              if (this.moreStandardInfo.length > 0) {
                this.fspecificationChange();
                this.calcSkuPrice();
              } else {
                this.imageArr = arr;
                let aimg = JSON.parse(JSON.stringify(this.imageArr));
                aimg[0] = this.goodsInfo.Image;
                this.imageArr = aimg;
                this.imgShowIndex = 0;
                this.$nextTick().then(() => {
                  $(".laftImg").BUP(0.5);
                });
                this.calcPrice();
              }
            });
          } else if (res.ResponseId == -1) {
            this.$store.commit("loginStatus/LOGOUT");
            location.reload();
          } else {
            this.$message({
              type: "error",
              message: res.Message
            });
          }
          rs();
        });
      });
    },
    getGoodsContent() {
      return new Promise((rs, rj) => {
        API.goodsDetailContent({
          SkuId: this.$route.query.goodsId,
          token: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null,
          userSN: "88888888"
        }).then(res => {
          if (res.ResponseId == 0) {
            this.detail = res.Data ? res.Data.Detail : "";
          } else {
            this.$message({
              type: "error",
              message: res.Message
            });
          }
          rs();
        });
      });
    },
    getSpecifi() {
      API.goodsDetailSpecifi({
        SkuId: this.baseGoodsInfo.SkuId,
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null,
        userSN: "88888888"
      }).then(res => {
        if (res.ResponseId == 0) {
          this.specifiContents = res.Data.Contents;
        } else {
          this.$message({
            type: "error",
            message: res.Message
          });
        }
      });
    },
    subOrder() {
      if (!this.isLogin) {
        this.$store.commit("loginStatus/LOGOUT");
        this.$router.push({
          path: "/login"
        });
        return;
      }
      let o = {
        expressType: this.expressType,
        proInfo: [
          {
            skuId: this.$route.query.goodsId,
            ProCount:
              this.count *
              (this.previews[this.previewsIndex]
                ? this.previews[this.previewsIndex].Amount
                : 1)
          }
        ]
      };
      if (this.baseGoodsInfo.Status == 0) {
        return this.$message.error("商品已下架");
      }
      if (!this.count) {
        this.$message({
          message: "该商品已售罄",
          type: "error"
        });
        return;
      }
      let a = JSON.parse(JSON.stringify(this.SkuStandardsItem));
      let arr = [];
      a.map(v => {
        v.SkuChildStandardValues.map(item => {
          if (item.active && !item.isLock) {
            arr.push(item.StandardId + "," + item.ValId);
          }
        });
      });
      if (arr.length < a.length) {
        this.$message.error("请选择规格");
        return;
      }
      o.skuSource = 0;
      sessionStorage.setItem("proInfos", JSON.stringify(o));
      this.$router.push({
        path: "/subOrder"
      });
    },
    joinCar() {
      if (!this.isLogin) {
        this.$store.commit("loginStatus/LOGOUT");
        this.$router.push({
          path: "/login"
        });
      } else {
        let params = {
          skuId: this.$route.query.goodsId,
          token: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null,
          count:
            this.count *
            (this.previews[this.previewsIndex]
              ? this.previews[this.previewsIndex].Amount
              : 1),
          expressType: this.$route.query.type
        };
        if (this.baseGoodsInfo.Status == 0) {
          return this.$message.error("商品已下架");
        }
        if (!this.count) {
          return this.$message({
            message: "该商品已售罄",
            type: "error"
          });
        }
        let a = JSON.parse(JSON.stringify(this.SkuStandardsItem));
        let arr = [];
        a.map(v => {
          v.SkuChildStandardValues.map(item => {
            if (item.active) {
              arr.push(item.StandardId + "," + item.ValId);
            }
          });
        });
        if (arr.length < a.length) {
          this.$message.error("请选择规格");
          return;
        }
        API.joinCar(params).then(res => {
          if (res.ResponseId == 0) {
            if (res.Data.AuthStatus == "0") {
              //等待审核
              this.$message.error("请等待审核通过");
              setTimeout(() => {
                this.$router.push({
                  path: "/authDetail"
                });
              }, 1000);
            } else if (res.Data.AuthStatus == "1") {
              //认证成功
              this.$store.dispatch(
                "shopcarStatus/GETCARLEN",
                localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user")).token
                  : null
              );
              this.$message({
                message: "加入购物车成功",
                type: "success"
              });
            } else if (res.Data.AuthStatus == "2") {
              //审核失败
              this.$message.error("请先认证");
              setTimeout(() => {
                this.$router.push({
                  path: "/authEdit"
                });
              }, 1000);
            } else {
              //未认证
              this.$message.error("请先认证");
              setTimeout(() => {
                this.$router.push({
                  path: "/authNew"
                });
              }, 1000);
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
      }
    },
    toAuth() {
      this.$router.push({
        path: "/auth"
      });
    }
  },

  mounted() {
    this.goodsId = this.$route.query.goodsId;
    API.getAddressData().then(res => {
      res.Data.map(a => {
        a.Children.map(b => {
          delete b.Children;
        });
      });
      this.address = res.Data;
    });
    jQuery.fn.BUP = BUP;
    this.getGoodsInfo().then(() => {
      this.getGoodsContent().then(() => {
        this.getSpecifi();
      });
    });
  },
  watch: {
    amount: function(val) {
      this.count = this.min = val == 0 ? 0 : 1;
      this.$forceUpdate();
    }
  }
};
</script>
<style>
.marginTop5 {
  margin-top: 5px;
}
.mb15 {
  margin-left: 19px;
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

.shimg1 {
  background: url(../../assets/img/11.png) no-repeat;
  background-position: 5px 50%;
  background-size: auto 70%;
}

.shimg2 {
  background: url(../../assets/img/22.png) no-repeat;
  background-position: 5px 50%;
  background-size: auto 63%;
}

.shimg3 {
  background: url(../../assets/img/33.png) no-repeat;
  background-position: 5px 50%;
  background-size: auto 70%;
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
  .mainInfo {
    width: 100%;
    padding: 4px 24px 4px 19px;
    background: rgba(255, 102, 0, 0.04);
    box-sizing: border-box;
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