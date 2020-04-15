<template>
  <div class="informCon" v-if="show">
    <div class="infomCon_content">
      <div class="info_con">
        <p class="title">消费者告知书</p>
        <div class="info">
          <p>尊敬的客户：</p>
          <p>您好！为帮助您更好的选购境外商品，请您在购买前务必认真、详细并完全理解本告知书的全部内容，并对自身风险承担做出客观判断，同意本告知书内容后再下单购买：</p>
          <p>1、您通过本网站购买的所有境外物品等同于境外购买。</p>
          <p>2、您购买的所有境外物品适用的品质、健康、安全、卫生、环保、标示等项目标准可能与我国质量安全标准不同，由此可能产生的危害或损失以及法律责任或其他风险，将由您个人承担，请务必了解相关信息后再做下单购买。</p>
          <p>3、订单清关期间，海关可能会抽查核验订单真实性，拨打购买人电话核实信息，必要时海关可能需要订购人提供身份证照片等信息进行核验交易。</p>
          <p>4、您通过跨境电商平台购买的境外物品可能无中文标签或说明书，请在下单前认真阅读平台提供的物品信息。</p>
          <p>5、跨境商品订单付款后本网站立即向海关申报，故本网站不接受7天无理由退货，下单前请确认您的下单信息。如您有任何问题，欢迎联系本网站客服，我们将竭诚为您服务！</p>
        </div>
        <div class="info_btn" @click="saveGzs">同意并继续</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      checked: false
    };
  },
  mounted() {
    let m = sessionStorage.getItem("info_notice");
    if (m) {
      this.checked = m == 1 ? true : false;
    }
  },
  methods: {
    saveGzs() {
      this.show = false;
      sessionStorage.setItem("info_notice", 1);
    }
  },
  watch: {
    checked: function(val) {
      if (val) {
        this.show = false;
        localStorage.setItem("info_notice", 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.info_btn {
  color: #fff;
  background: #19a5b2;
  font-size: 24px;
  width: 150px;
  text-align: center;
  border-radius: 20px;
  padding: 5px 0;
  position: absolute;
  left: 50%;
  margin-left: -75px;
  bottom: -116px;
  cursor: pointer;
}
.informCon {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(0, 24, 32, 0.5);
  .infomCon_content {
    width: 950px;
    height: 512px;
    border-radius: 4px;
    background: #f6f6f7;
    background-image: url(~assets/img/inform_bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    box-sizing: border-box;
    padding: 15px;
    .info_con {
      width: 615px;
      height: 330px;
      position: relative;
      left: 150px;
      top: 8px;
    }
    .el-icon-circle-close {
      position: relative;
      top: -10px;
      float: right;
      font-size: 20px;
      color: #666;
      &:hover {
        color: #19a5b2;
      }
    }
    .title {
      line-height: 92px;
      font-weight: bold;
      font-size: 46px;
      text-align: center;
      color: #19a5b2;
    }
    .info {
      padding: 10px;
      padding-top: 0;
      font-size: 23px;
      line-height: 33px;
      color: #19a5b2;
    }
    .not_notice {
      position: absolute;
      right: 20px;
      bottom: 4px;
      .el-checkbox {
        color: #19a5b2 !important;
      }
    }
  }
}
</style>
