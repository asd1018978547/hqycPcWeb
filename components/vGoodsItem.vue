<template>
  <div class="list-good" :class="size=='small'?'list-item':''" @click="handleClick(item)">
    <div class="image_con">
      <img class="center" :style="isError" :src="baseUrl+item.Image" @error="repalceImg($event)" />
    </div>
    <p class="good-name ellipsis2" style="margin-bottom:-18px" v-show="size=='small'">
      <span class="priceColor typeS" style="font-size:10px" v-if="item.OrderType==1">跨境直邮</span>
      <span class="priceColor typeS" style="font-size:10px" v-if="item.OrderType==2">保税备货</span>
      <span class="priceColor typeS" style="font-size:10px" v-if="item.OrderType==3">一般贸易</span>
      <span style="font-size:10px" v-if="item.OrderType==1">【澳洲直邮】</span>
      {{item.Name}}
    </p>

    <p class="color80 marginTop10 clearfix price_con">
      <i class="priceColor size12" style="font-style: normal;"></i>
    </p>
    <p class="good-name ellipsis2" v-show="size!='small'"> <span style="font-size:10px" v-if="item.OrderType==1">【澳洲直邮】</span>{{item.Name}}</p>
      <span class="priceColor" style="font-size:16px" v-if="ShowStatus==0">登录后看价格</span>
      <span
        class="priceColor"
        v-if="ShowStatus==1"
      >￥{{parseFloat(isVip?item.Price:item.UnMemberPrice).toFixed(2)}}</span>
    <p class="tag-group clearfix" v-show="size!=='small'">
      <span class="marginRight10">{{item.StoreType}}</span>
    </p>
  </div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
import { _CONFIG } from "~/_config/config.js";
export default {
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    size: {
      type: String,
      default: "default"
    },
    ShowStatus: {
      type: Number,
      default: "default"
    }
  },
  data() {
    return {
      baseUrl: ali_oss_data.URL_IMG_SHOW,
      isError: {},
      StoreTypeArr: []
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
    handleClick(item) {
      const { href } = this.$router.resolve({
        path: "/goodDetail",
        query: {
          goodsId: item.SkuId,
          type: item.OrderType
        }
      });
      window.open(href, "_blank");
    },
    repalceImg(e) {
      let imgSrc = require("assets/img/error_img.png");
      e.target.src = imgSrc;
      this.isError = {
        width: "80%"
      };
    },
    repalceTye() {
      this.StoreTypeArr = this.item.StoreType.split("/");
    }
  },
  mounted() {
    this.repalceTye();
  }
};
</script>

<style lang="less" scoped="scoped">
.typeS {
  font-size: 10px;
  color: red;
  border-style: solid;
  border-width: 0.5px;
  padding: 0 4px 0 4px;
}
.list-good {
  width: 228px;
  height: 358px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.2s linear;
  border-radius: 2px;
  background: #fff;
  &:hover {
    box-shadow: 0 0 10px #ccc;
    .image_con {
      top: -4px;
    }
  }
}
.image_con {
  width: 100%;
  height: 210px;
  background: #fff;
  text-align: center;
  position: relative;
  transition: all 0.2s linear;
  top: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    top: 0;
  }
}
p {
  line-height: 20px;
  position: relative;
}
.good-name {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  margin-top: 10px;
  &:hover {
    color: #fc0000;
    text-decoration: underline;
    cursor: pointer;
  }
}
.tag-group {
  margin-top: 10px;
  span {
    float: left;
    margin-right: 10px;
    line-height: 20px;
    padding: 0 8px;
    border-radius: 2px;
    border: 1px solid #fc0000;
    color: #fc0000;
  }
}
.priceColor {
  font-size: 20px;
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
  transform: scale(0.8);
  position: absolute;
  right: -4px;
  top: 2px;
}
.list-item {
  width: 190px;
  height: 260px;
  box-sizing: border-box;
  border: 1px solid #fff;
  padding: 6px;
  transition: all 0.2s linear;
  border-radius: 2px;
  background: #fff;
  &:hover {
    box-shadow: 0 0 10px #ccc;
    border-color: #ccc;
  }
  .image_con {
    height: 160px;
    img {
      width: 160px;
    }
  }
  .good-name {
    margin-top: 8px;
    color: #8f8f8f;
    &:hover {
      color: #ff6600;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .price_con {
    margin-top: 8px;
    .priceColor {
      font-size: 18px;
      color: #ff6600;
    }
  }
}
</style>