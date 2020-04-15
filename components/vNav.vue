<template>
  <div class="navCon white-bg">
    <div class="container flex flex-c white-bg">
      <div class="categoryCon">
        <v-category></v-category>
      </div>
      <ul class="tab-nav clearfix flex1">
        <li
          class="lf"
          v-for="(item,index) in navList"
          :class="item.active?'active':''"
          @click="routeChange(item)"
          :key="index"
        >{{item.Title}}</li>
        <li class="lf" @click="jumpgsda" :class="$route.path == '/aboutInfo' ? 'active' : ''">公司档案</li>
        <li class="lf" @click="jumpnews" :class="$route.path == '/news' ? 'active' : ''">云仓快报</li>
      </ul>
    </div>
  </div>
</template>

<script>
import vCategory from "./vCategory";
import { API } from "~/_config/API.js";
export default {
  components: {
    vCategory
  },
  data() {
    return {
      navList: [
        { Title: "首页", path: { path: "/" }, name: "" },
        {
          Title: "全部商品",
          name: "searchName",
          path: { path: "/list", query: { searchName: "" } }
        },
        {
          Title: "保税备货",
          name: "expType",
          path: { path: "/list", query: { expType: 2 } }
        },
        {
          Title: "跨境直邮",
          name: "expType",
          path: { path: "/list", query: { expType: 1 } }
        },
        {
          Title: "一般贸易",
          name: "expType",
          path: { path: "/list", query: { expType: 3 } }
        }
      ]
    };
  },
  methods: {
    jumpgsda() {
     
      
      const { href } = this.$router.resolve("aboutInfo");
      if (this.$route.fullPath != this.$router.resolve("aboutInfo").href) {
        window.open(href, "_blank");
      }
    },
    jumpnews() {
   

      const { href } = this.$router.resolve("news");
      if (this.$route.fullPath != this.$router.resolve("news").href) {
        window.open(href, "_blank");
      }
    },
    getData() {
      API.indexData({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        //lnk 1：商品 2:分类  3：品牌
        if (res.ResponseId == 0) {
          let arr = res.Data.AdvRecommendes;
          arr.forEach(v => {
            let routeLink = v.Link.split("&");
            let type = routeLink[0].split("=")[1];
            let id = routeLink[1].split("=")[1];
            let path, query, name;
            if (type == 1) {
              name = "goodDetail";
              path = "/goodDetail";
              query = {
                goodsId: id
              };
            } else if (type == 2) {
              name = "cate_code";
              path = "/list";
              query = {
                cate_code: id
              };
            } else {
              name = "brandCode";
              path = "/list";
              query = {
                brandCode: id
              };
            }
            v.name = name;
            v.path = {
              path: path,
              query: query
            };
          });
          this.navList = this.navList.concat(arr);
          this.activeInit();
        }
      });
    },
    routeChange(item) {
      const { href } = this.$router.resolve(item.path);
      if (this.$route.fullPath != this.$router.resolve(item.path).href) {
        window.open(href, "_blank");
      }
    },
    activeInit(item) {
      let query = this.$route.query;
      this.navList.forEach(v => {
        for (let key in query) {
          if (v.name == key) {
            if (v.path.query) {
              v.active = v.path.query[key] == query[key];
            } else {
              v.active = true;
            }
          }
        }
      });
      if (JSON.stringify(query) == "{}") this.navList[0].active = true;
    }
  },
  mounted() {
    this.getData();
  },
  watch: {}
};
</script>

<style lang="less" scoped="scoped">
.navCon {
  line-height: 40px;
  height: 40px;
  .tab-nav {
    box-sizing: border-box;
    height: 40px;
    box-sizing: border-box;
    li {
      position: relative;
      box-sizing: border-box;
      text-align: center;
      min-width: 70px;
      margin-left: 30px;
      transition: all 0.2s linear;
      cursor: pointer;
      font-size: 15px;
      color: #666;
      &.active {
        color: #fbb040;
      }
      &:hover {
        color: #fbb040;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: #fbb040;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>