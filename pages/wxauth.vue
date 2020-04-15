<template></template>
<script>
import { _CONFIG } from "~/_config/config.js";
export default {
  watch: {
    $route() {
      if (!this.$route.query.wui) {
        window.open(
          _CONFIG.url +
            "Authorization/weixin/Login.aspx?&misc=" +
            navigator.userAgent,
          "_self"
        );
      } else {
        const res = JSON.parse(this.$route.query.wui);
        if (res.ResponseId == -1) {
          this.$router.push({
            path: "/register",
            query: {
              iswx: 1,
              uid: res.Data.unionid,
              oid: res.Data.openid
            }
          });
          return;
        }
        let u = {};
        u.name = res.Data.NickName;
        u.token = res.Data.Token;
        u.tokenExpirationTime = res.Data.TokenExpirationTime;
        u.userId = res.Data.UserId;
        u.isMember = res.Data.IsMember; //是否会员
        u.levelId = res.Data.LevelId; //会员等级
        u.summary = res.Data.Summary; //会员等级描述
        u.retailerAuthStatus = res.Data.RetailerAuthStatus; //认证状态
        localStorage.setItem("user", JSON.stringify(u));
        this.$store.commit('loginStatus/LOGIN');
        let dirPath = localStorage.getItem("directPath");
        if (dirPath && dirPath != "null") {
          localStorage.setItem("directPath", "");
          this.$router.push({ path: dirPath });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  mounted() {
    if (!this.$route.query.wui) {
        window.open(
          _CONFIG.url +
            "Authorization/weixin/Login.aspx?&misc=" +
            navigator.userAgent,
          "_self"
        );
      } else {
        const res = JSON.parse(this.$route.query.wui);
        if (res.ResponseId == -1) {
          this.$router.push({
            path: "/register",
            query: {
              iswx: 1,
              uid: res.Data.unionid,
              oid: res.Data.openid
            }
          });
          return;
        }
        let u = {};
        u.name = res.Data.NickName;
        u.token = res.Data.Token;
        u.tokenExpirationTime = res.Data.TokenExpirationTime;
        u.userId = res.Data.UserId;
        u.isMember = res.Data.IsMember; //是否会员
        u.levelId = res.Data.LevelId; //会员等级
        u.summary = res.Data.Summary; //会员等级描述
        u.retailerAuthStatus = res.Data.RetailerAuthStatus; //认证状态
        localStorage.setItem("user", JSON.stringify(u));
        this.$store.commit('loginStatus/LOGIN');
        let dirPath = localStorage.getItem("directPath");
        if (dirPath && dirPath != "null") {
          localStorage.setItem("directPath", "");
          this.$router.push({ path: dirPath });
        } else {
          this.$router.push({ path: "/" });
        }
      }
  }
};
</script>