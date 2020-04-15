<template>
    <div class="header">
        <v-top></v-top>
		<div class="searchCon">
			<div class="container">
                <div class="flex flex-c">
                    <router-link to="/" tag="span">
                        <img src="~/assets/img/admin_logo.png" alt="" style="width:200px;">
                    </router-link>
                    <ul class="marginLeft15">
                        <li @click="jump('dashboard')">商户后台</li>
                        <li @click="jump('dashboard/orderCenter')">订单</li>
                        <li @click="jump('dashboard/customer')">客户</li>
                    </ul>
                </div>
			</div>
		</div>
    </div>
</template>
<script>
import bus from "./bus";
import vTop from "~/components/vTop";
export default {
  components: {
    vTop
  },
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 0
    };
  },
  computed: {},
  methods: {
    jump(str) {
      this.$router.push("/" + str);
    },
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    let user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    this.name = user.name || "";
  }
};
</script>
<style scoped>
.searchCon {
  background: #f05454;
}
.container {
  padding: 15px 0;
}
.container li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #fff;
  padding: 0 25px;
  cursor: pointer;
}
.container li:nth-child(1) {
  border-left: 2px solid #f58888;
  font-size: 20px;
}
</style>
