<template>
  <div class="news">
    <v-top :class="top_fixed ? 'top_fixed' : ''"></v-top>
    <div :class=" news_top_fixed ? 'news_title news_top_fixed' : 'news_title'">
      <div class="news_title_img">
        <img src="~assets/img/news_title.png" />
      </div>
    </div>
    <div class="news_con">
      <div class="news_l">
        <div :class=" news_tab_fixed ? 'news_tab_fixed news_tab' :'news_tab' ">
          <div class="news_tab_box">
            <div @click='changeActive(item.Id)' class="tab_item" :class='data.LabelId == item.Id ? "active" : ""' v-for='(item,index) in tagList'
              :key='index'>{{ item.Name }}</div>
          </div>
          <p class="mb"><span @click='jumpList'>{{data.LableName}}</span> > 正文</p>
        </div>
        <div class="newsInfo">
          <div class="info_title">{{data.Title}}</div>
          <div class="info_time">{{data.DateAdded}}
            <div class="share">
              <div class="bdsharebuttonbox">
                <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
              </div>
            </div>
          </div>
          <div class="info_con" v-html='data.Content'></div>
        </div>
      </div>
      <div :class='rightFixed ? "fiexdR news_r" : " news_r"'>
        <div class="news_r_t">本周热门排行</div>
        <div class="rank_item" v-for='(item,index) in hotList' :key="index">
          <p @click='jumpDesc(item.Id)'><span>{{index+1}}</span>{{item.Title}}</p>
          <p @click='jumpDesc(item.Id)'><span></span>{{item.Desc}}</p>
          <div class="rank_zan">
            <div class="news_item_zan">
              <div class="zan" :class='item.isZan ? "active" : ""' @click.stop='hotzan($event,item)'>({{ item.ThumbsUpNumber
              }})</div>
              <div class="look">{{item.ReadNumber}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-bottom></v-bottom>
  </div>
</template>
<script>
  import vTop from "~/components/vTop";
  import vBottom from "~/components/vBottom";
  import vSide from "~/components/vSideBar.vue";
  import { API } from "~/_config/API.js";
  export default {
    components: {
      vTop,
      vSide,
      vBottom
    },
    data() {
      return {
        tagList: [],
        pageIndex: 1,
        pageSize: 15,
        data: {},
        selecetdIndex: 0,
        rightFixed: false,
        news_tab_fixed: false,
        top_fixed: false,
        news_top_fixed: false,
        hotList: []
      }
    },
    mounted() {
      this.getTags()
      this.getListData()
      this.getHot()
      let _this = this
      window.onscroll = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollTop > 120) {
          _this.rightFixed = true
          _this.top_fixed = true
          _this.news_top_fixed = true
          _this.news_tab_fixed = true
        } else {
          _this.rightFixed = false
          _this.top_fixed = false
          _this.news_tab_fixed = false
          _this.news_top_fixed = false
        }
      }
    },
    methods: {
      jumpList() {
        this.$router.push({
          path: '/news',
          query: {
            id: this.data.LabelId
          }
        })
      },
      hotzan(e,item) {
        var $i = $("<b>").text("+" + 1);
        var x = e.pageX,
          y = e.pageY;
        $i.css({
          top: y - 20,
          left: x,
          position: "absolute",
          color: "#e60012"
        })
        $("body").append($i);
        $i.animate({
          top: y - 120,
          opacity: 0,
          "font-size": "1.4em"
        }, 1500, function () {
          $i.remove();
        });
        e.stopPropagation();
        let zan = localStorage.getItem('zan') ? JSON.parse(localStorage.getItem('zan')) : []
        API.newsZan({
          id: item.Id,
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
        }).then(() => {
          this.hotList.map(v => {
            if (v.Id == item.Id) {
              v.isZan = true
              v.ThumbsUpNumber += 1
              zan.push(v)
            }
          })
          
        })
        localStorage.setItem('zan', JSON.stringify(zan))
      },
      jumpDesc(id) {
        const { href } = this.$router.resolve({
        path: "/newsInfo",
        query: {
          id: id
        }
      });
      window.open(href, "_blank");
      },
      changeActive(index) {
        this.$router.push({
          path: '/news',
          query: {
            id: index
          }
        })
      },
      getHot() {
        let zan = localStorage.getItem('zan') ? JSON.parse(localStorage.getItem('zan')) : []
        API.getHotNews({
          pageSize: 5,
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
        }).then(res => {
          res.Data.map(v => {
            v.isZan = false
            zan.map(item => {
              if (item.Id == v.Id) {
                v.isZan = true
              }
            })
          })
          this.hotList = res.Data
        })
      },
      getListData() {
        API.getNewsInfo({
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
          id: this.$route.query.id
        }).then(res => {
          let content = res.Data.Content
          res.Data.Content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
          this.data = res.Data
        })
      },
      getTags() {
        API.getNewsTag({
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
        }).then(res => {
          this.tagList = res.Data
        })
      },

    },
  }
</script>
<style scoped>
    .top_fixed{
    position: fixed;
    top: 0;
    z-index: 9;
    left: 50%;
    margin-left: -600px;
  }
  .news_tab_fixed{
    position: fixed;
    top: 96px;
    left: 50%;
    margin-left: -600px;
    background: #fff;
    z-index: 9;
  }
  .news_top_fixed{
    position: fixed;
    top: 36px;
    width: 100%;
    z-index: 9;
  }
  .fiexdR{
    position: fixed;
    margin-left: 820px;
    top: 96px;
  }
  .mb span{
    color:#e60012
  }
  .mb {
    font-size: 16px;
    line-height: 45px;
    padding-left: 10px;
    cursor: pointer;
  }
  .share {
    position: absolute;
    top: 7px;
    right: 3px;
  }

  .info_con {
    padding-top: 30px;
    width: 100%;
    overflow: hidden;
  }
  .info_con img {
    max-width: 100%;
  }
  .zan.active {
    background-image: url(~assets/img/zan_active.png);
    color: #e60012
  }

  .share img {
    width: 33px;
    height: 33px;
    margin-right: 7px;
  }

  .newsInfo {
    padding: 20px;
    color: #333333;
  }

  .info_title {
    font-size: 24px;
    box-sizing: border-box;
  }

  .info_time {
    color: #999999;
    position: relative;
    height: 45px;
    font-size: 14px;
    line-height: 45px;
  }

  .rank_zan {
    padding-top: 10px;
    height: 50px;
  }

  .rank_item {
    cursor: pointer;
  }

  .rank_item p span {
    width: 15px;
  }

  .rank_item p:nth-child(1) {
    font-size: 16px;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 30px;
    font-weight: bolder;
  }

  .rank_item p:nth-child(2) * {
    font-size: 12px !important
  }

  .rank_item p:nth-child(2) {
    font-size: 12px !important;
    color: #999999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
    height: 24px;
  }

  .news_r_t {
    height: 65px;
    font-size: 16px;
    line-height: 65px;
  }

  .news_item_title {
    font-size: 18px;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .look,
  .zan {
    display: inline-block
  }

  .look {
    background-image: url(~assets/img/look.png);
    background-repeat: no-repeat;
    padding-left: 23px;
    background-size: 20px auto;
    background-position: left 50%;
  }

  .zan {
    background-image: url(~assets/img/zan.png);
    background-repeat: no-repeat;
    padding-left: 17px;
    background-size: 15px auto;
    background-position: left 50%;
    margin-right: 10px;
  }

  .news_item_time {
    color: #999999;
    float: left;
  }

  .news_item_zan {
    float: right;
    padding-right: 20px;
    color: #999999;
  }

  .news_item_des {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    font-size: 14px;
    color: #999999;
    line-height: 24px;
    height: 72px;
  }

  .news_item_bot {
    position: absolute;
    bottom: 12px;
    height: 26px;
    line-height: 26px;
    width: 100%;
    justify-content: space-between;
  }

  .news_item_con {
    flex: 1;
    width: 525px;
    position: relative;
    box-sizing: border-box;
    padding-right: 20px;
    overflow: hidden;
  }

  .news_item {
    height: 160px;
    border-bottom: 1px solid #dddddd;
    display: flex;
  }

  .news_item_img {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 275px;
  }

  .news_item_img img {
    width: 210px;
    height: 100px;
  }

  .news_tab {
    height: 85px;
    width: 100%;
    border-bottom: 1px solid #dddddd
  }

  .news_tab_box {
    height: 40px;
  }

  .tab_item {
    height: 40px;
    display: inline-block;
    line-height: 40px;
    color: #333333;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }

  .tab_item.active {
    background: #e60012;
    color: #fff;
    position: relative;
  }

  .tab_item.active::after {
    content: "";
    width: 10px;
    height: 10px;
    background: #e60012;
    position: absolute;
    top: 35px;
    left: 50%;
    margin-left: -5px;
    transform: rotate(45deg)
  }

  .news_title {
    height: 60px;
    background: #ffce00;
  }

  .news_title_img {
    width: 1200px;
    line-height: 60px;
    display: flex;
    align-items: center;
    height: 60px;
    margin: 0 auto;
  }

  .news_con {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 20px;
  }


  .news_l,
  .news_r {
    background: #fff;
    min-height: 200px;
  }

  .news_l {
    flex: 0 0 800px;
    width: 800px;
  }

  .news_r {
    flex: 0 0 380px;
    width: 380px;
    height: 650px;
    box-sizing: border-box;
    padding: 20px;
  }
</style>