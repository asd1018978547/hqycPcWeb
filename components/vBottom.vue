<template>
  <div class="main" :class="position">
    <div class="linkCon white-bg">
      <div class="container clearfix flex">
        <ul class="flex1 l_con flex flex-s-r">
          <li v-for="(item,index) in linkList" :key="index">
            <p class="title marginTop10 pointer">{{item.title}}</p>
            <div>
              <p
                class="marginTop10 pointer"
                v-for="(o, i) in item.list"
                :key="i"
                @click="jump(o.link)"
              >{{o.title}}</p>
            </div>
          </li>
        </ul>
        <div class="r_con">
          <img :src="logoS" alt />
          <img :src="codeImg" alt />
        </div>
      </div>
    </div>
    <div class="CopyrightCon" style="background: #f8f8f8;color: #999;">
      <div class="container text-center">
        <p style="line-height: 60px;color:#999;">
          &copy; Copyright 2017 环球云仓国际贸易（成都）有限公司
          <a
            href="http://beian.miit.gov.cn"
            target="_blank"
          >蜀ICP备18004322号-1</a>
          All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "default",
      required: false
    }
  },
  methods: {
    jump(link) {
      this.$router.push(link);
    }
  },
  data() {
    return {
      codeImg:
        "https://file.a-amall.com/u/e2601cb2ebeb4d4394877a662a1b593c_erweima.jpg",
      logoS:
        "https://file.a-amall.com/u/fc1c893a78c24d088000f1abac867e23_logo.jpg",
      linkList: [
        {
          title: "关于云仓",
          list: [
            { title: "公司介绍", link: "/gongsijieshao" },
            { title: "发展历史", link: "/fazhanlishi" },
            { title: "云仓文化", link: "/yuncangwenhua" },
            { title: "云仓荣誉", link: "/yuncangrongyao" },
            { title: "加入我们", link: "/jiaruwomen" }
          ]
        },
        {
          title: "云仓特色",
          list: [
            { title: "跨境供应链", link: "/kuajinggongyinglianfuwushang" },
            { title: "技术服务", link: "/jishufuwu" },
            { title: "保税仓储", link: "/baoshuicangchu" },
            { title: "专业客服", link: "/zhuanyekefu" },
            { title: "物流服务", link: "/wuliufuwu" }
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

<style lang="less" scoped="scoped">
a:hover {
  color: #00b0ff;
}
a {
  color: #999;
}
.main {
  margin-top: 15px;
}
img {
  width: 60px;
  margin-right: 4px;
}
.r-text {
  width: 70px;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  line-height: 20px;
}
.bottom {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}
.baozhangCon {
  padding: 6px 0;
  line-height: 40px;
  font-size: 14px;
  color: #666;
  p {
    display: flex;
    align-items: center;
    font-size: 18px;
    justify-content: center;
    &:hover {
      color: #fbb040;
    }
  }
  i {
    display: block;
    width: 46px;
    height: 46px;
    margin-right: 15px;
  }
  .icon_zhi {
    background: url(/assets/icon/icon_you.png) no-repeat;
    background-size: 100% 100%;
  }
  .icon_ping {
    background: url(/assets/icon/icon_jia.png) no-repeat;
    background-size: 100% 100%;
  }
  .icon_shan {
    background: url(/assets/icon/icon_zhong.png) no-repeat;
    background-size: 100% 100%;
  }
  .icon_xin {
    background: url(/assets/icon/icon_shan.png) no-repeat;
    background-size: 100% 100%;
  }
}
.linkCon {
  .container {
    padding: 15px;
  }
  .r_con {
    width: 330px;
    height: 178px;
    border-left: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 120px;
      width: auto;
      margin-left: 20px;
    }
  }
  .l_con {
    .title {
      font-size: 16px;
      color: #666;
      &:hover {
        color: #fbb040;
      }
    }
    p {
      font-size: 14px;
      color: #999;
      &:hover {
        color: #fbb040;
      }
    }
  }
}
</style>