<template>
    <div class="informCon" v-if="show">
    <div class="infomCon_content">
      <div class="info_con">
        <p class="title">重要通告</p>
        <div class="info">
          <p>为了配合成都关区做好跨境电子商务零售进出口商品监管工作，环球云仓平台将进行系统升级。非常感谢此次已完成认证客户的支持与配合。</p>
          <p>同时应部分尚未完成认证客户的需求，我司将此次升级时间延长一天，将在2019年9月6日24点之后正式进行系统升级，升级后未完成认证的客户将无法进行商品下单操作，请还未认证客户尽快登录www.a-amall.com“我的云仓”加入云仓大家庭完成认证。</p>
          <p>如在认证过程中遇到任何问题，可联系在线客服或客户经理，我们将第一时间为您提供咨询服务。</p>
          <p>后续我司也将针对不同类型客户需求，全面提升供应链、技术和清关服务能力，助力您的生意发展。</p>
          <p>感谢您的支持与配合！</p>
        </div>
        <div class="info_btn" @click="saveGzs">我知道了</div>
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
    let m = sessionStorage.getItem("info_notice3");
    if (m) {
      this.checked = m == 1 ? true : false;
    }
  },
  methods: {
    saveGzs() {
      this.show = false;
      sessionStorage.setItem("info_notice3", 1);
    }
  },
  watch: {
    checked: function(val) {
      if (val) {
        this.show = false;
        localStorage.setItem("info_notice3", 1);
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
  bottom: -50px;
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
    height: 450px;
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
