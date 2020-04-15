<template>

  <div class="informCon" v-if="show">
    <div class="infomCon_content">
      <div class="info_con">
        <p class="title">重要发货通知</p>
        <div class="info">
          <p>各位客户，经持续沟通协调，环球云仓目前已恢复发货！</p>
          <p>如下地区无法发货：湖北全省、四川省甘孜州全州、阿坝州全州、除西昌市以外凉山州、广元剑门关、福建宁德古田。</p>
          <p>非上述地区，因疫情因素，各地方派件网点存在不确定性，派件时效暂无法保证。</p>
          <p>受疫情防控影响，打包、清关、物流等环节流速逐渐恢复中，我们将对近期订单按时间先后陆续发货，请您耐心等待。</p>
          <p>后续结合疫情变化若有推迟，将第一时间通知您！请下单前务必先与客服人员沟通具体情况，多谢理解！</p>
          <p>感谢您的支持！</p>
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
    let m = sessionStorage.getItem("info_notice2");
    if (m) {
      this.checked = m == 1 ? true : false;
    }
  },
  methods: {
    saveGzs() {
      this.show = false;
      sessionStorage.setItem("info_notice2", 1);
    }
  },
  watch: {
    checked: function(val) {
      if (val) {
        this.show = false;
        localStorage.setItem("info_notice2", 1);
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
  z-index: 99999;
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
