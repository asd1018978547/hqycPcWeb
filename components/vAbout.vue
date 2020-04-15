<template>
  <div class="about_left">
    <div v-for="(item,index) in linkList" :key="index">
      <p class="about_title">{{ item.title }}</p>
      <p @click="jump(o.link)" class="about_des" :class=" o.link == $route.path ? 'active' : '' " v-for="(o,i) in item.list" :key="i">{{ o.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    jump(e) {
      this.$router.push(e)
    },
  },
  data() {
    return {
      linkList: [
        {
          title: "关于云仓",
          list: [
            { title: "公司介绍", link: "/gongsijieshao" },
            { title: "发展历史", link: "/fazhanlishi" },
            { title: "云仓文化", link: "/yuncangwenhua" },
            { title: "云仓荣誉", link: "/yuncangrongyao" },
            { title: "加入我们", link: "/jiaruwomen" },
          ]
        },
        {
          title: "云仓特色",
          list: [
            { title: "跨境供应链", link: "/kuajinggongyinglianfuwushang" },
            { title: "技术服务", link: "/jishufuwu" },
            { title: "保税仓储", link: "/baoshuicangchu" },
            { title: "专业客服", link: "/zhuanyekefu" },
            { title: "物流服务", link: "/wuliufuwu" },
          ]
        },
        {
          title: "新手入门",
          list: [
            { title: "注册和登录", link: "/zhucehedenglu" },
            { title: "用户认证", link: "/yonghurenzheng" },
            { title: "下单及支付", link: "/xiadanjizhifu" },
            { title: "物流配送", link: "/wuliupeisong" },
            { title: "FAQ", link: "/FAQ" },
            { title: "商品税率表", link: "/shangpinshuilvbiao" }
          ]
        },
        {
          title: "协议政策",
          list: [
            { title: "环球云仓服务协议", link: "/fuwuxieyi" },
            { title: "环球云仓隐私政策", link: "/yinsizhengce" },
            { title: "关税规则", link: "/tuihuojishouhoutiaokuan" },
            { title: "免责声明", link: "/shenfenzhengbaoguan" }
          ]
        },
        {
          title: "商家合作",
          list: [
            { title: "供应商", link: "/gongyingshangzhaomu" },
            { title: "渠道合作", link: "/qudaohezuo" },
            { title: "联系我们", link: "/lianxiwomen" }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped>
.about_title {
  font-size: 18px;
  color: #333333;
  line-height: 35px;
}
.about_des {
  font-size: 14px;
  line-height: 30px;
  color: #999999;
}
.about_des.active {
  color: #fbb040;
}
.about_left p {
  cursor: pointer;
}
.about_left {
  flex: 0 0 240px;
  box-sizing: border-box;
  background: #fff;
  padding-left: 40px;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>