<template>
    <div class="main">
        <div class="title">批量下单</div>
        <div class="actionDesc">
            <p class="title2">批量下单流程</p>
            <p>1、点击“下载最新商品清单”获取环球云仓商品清单及库存（若无需更新商品清单，可跳过此步骤） <a target="_blank" :href="skuLink">下载最新商品清单及库存</a></p>
            <p>2、点击“下载订单模板”获取订单导入模板，根据模板格式要求填入下单信息 <a :href="downFileUrl">下载订单模板</a></p>
            <p>3、点击“选择文件”选择待上传的订单文件，点击‘上传文件’进行批量下单</p>
        </div>
        <div class="uploadCon">
            <div class="choice_group">
                <input type="file" id="fileEl" @change="onChange($event)">
                <input type="text" v-model='uploadFile.name' class="file_text ellipsis">
                <span v-if="!uploadFile.name">选择文件</span>
                <span class="delete" @click="deleteFile" v-else>删除</span>
            </div>
            <span class="upload_btn" @click="upFile">上传文件</span>
        </div>
        <div class="modal flex flex-column" v-show="modalFlag">
            <p class="title clearfix">提示 <i class="el-icon-close pointer lr" @click="modalFlag = false"></i></p>
            <div class="info flex1 flex flex-c flex-s-r" v-if="!uploadSuccess">
                <p class="flex flex-c">
                    <img class="loading-img" :src="require('@/assets/icon/loading_icon.jpg')" alt="">
                    <span>订单导入中，请等待...</span>
                </p>
            </div>
            <div class="info_success flex1 flex flex-column flex-s-c text-center" v-else>
                <p>{{excleInfo.Message}}</p>
                <a target="_blank" :href="excleInfo.Data" style="margin-top:10px;color:#23a8f5;" @click="modalFlag = false">点击查看导入详情</a>
            </div>
        </div>
    </div>
</template>
<script>
import { API } from "~/_config/API.js";
import { _CONFIG } from "~/_config/config.js";
import axios from 'axios';
export default {
  data() {
    return {
      uploadFile: {},
      modalFlag: false,
      downFileUrl:"",
      uploadSuccess: false,
      rABS: true, //是否将文件读取娓二进制数据
      wb: "", //读取完成的数据
      uploadUrl: '',
      excleInfo:{},
      skuLink:'',
    };
  },
  methods: {
    init() {
      this.uploadFile = {}
      this.modalFlag = false
      this.uploadSuccess = false
      this.skuLink = ''
      this.excleInfo = {}
    },
    upFile() {
      let _this = this;
      if (!this.uploadFile.name) {
        this.message = "请先选择文件！";
        return;
      }
      this.uploadSuccess = false;
      this.modalFlag = true;
      let f = new FormData();
      f.append(this.uploadFile.name, this.uploadFile);
      axios.post(this.uploadUrl, f).then(res => {
        if (res.data.ResponseId == 0) {
          let fileName = res.data.Data.fileName,
            token = JSON.parse(localStorage.getItem("user")).token,
            fileUrl = res.data.Data.fileUrl;
          API.uploadExcle({
            fileName: fileName,
            token: token,
            fileUrl:encodeURI(fileUrl)
          }).then(response => {
            this.uploadSuccess = true;
            if (response.ResponseId == 0) {
              this.excleInfo = response;
              this.deleteFile();
            } else if (response.ResponseId == -1) {
              this.modalFlag = false;
              this.$store.commit("loginStatus/LOGOUT");
              this.$message({
                message: "登录过期，请重新登录",
                type: "error",
                duration: 1000,
                onClose: () => {
                  this.$router.push({
                    path: "/login"
                  });
                }
              });
            } else {
              this.modalFlag = false;
              _this.$message.error('上传文件格式不正确，请检查格式重新上传');
            }
          });
        } else if (res.ResponseId == -1) {
          this.$store.commit("loginStatus/LOGOUT");
          this.$message({
            message: "登录过期，请重新登录",
            type: "error",
            duration: 1000,
            onClose: () => {
              this.$router.push({
                path: "/login"
              });
            }
          });
        } else {
          this.$message.error(res.Message);
        }
      });
    },
    onChange(e) {
      let file = e.currentTarget.files[0];
      if (!file) return;
      this.uploadFile = file;
      let arr = this.uploadFile.name.split(".");
      console.log(1);
      if (!(arr[arr.length - 1] == "xls") && !(arr[arr.length - 1] == "xlsx")) {
        this.uploadFile = {};
        this.$message.error("请选择.xls或者.xlsx格式的表格文件！");
      }
    },
    deleteFile() {
      this.uploadFile = {};
      $("#fileEl").val("");
    },
    getSku(){
      const _this = this;
      API.exportSku({
        token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
      }).then(res=>{
        if(res.ResponseId == 0){
          this.skuLink = res.Data.fileLink;
        }else if (res.ResponseId == -1) {
          _this.$store.commit("loginStatus/LOGOUT");
          _this.$message({
                message: "登录过期，请重新登录",
                type: "error",
                duration: 1000,
                onClose: () => {
                  this.$router.push({
                    path: "/login"
                  });
                }
              });
            } else {
              _this.$message.error(res.Message);
            }
      })
    }
  },
  mounted(){
    this.init()
    this.getSku()
    this.downFileUrl = window.location.origin + "/file/环球云仓批量下单导入模版.xls"
    this.uploadUrl = 
        _CONFIG.fileServer +
        "/f/upload/300002/?token=" +
        JSON.parse(localStorage.getItem("user")).token
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 10px 20px;
  .title {
    line-height: 46px;
    font-size: 20px;
    color: #333;
    border-bottom: 2px solid #eee;
  }
  .actionDesc {
    margin-top: 15px;
    font-size: 12px;
    line-height: 21px;
    p {
      color: #666;
    }
    .title2 {
      color: #333;
    }
  }
  .uploadCon {
    padding-left: 20px;
    .choice_group {
      margin-top: 10px;
      width: 100%;
      height: 36px;
      position: relative;
      display: flex;
      align-items: center;
      #fileEl {
        position: absolute;
        width: 265px;
        height: 30px;
        left: 0;
        top: 0;
        z-index: 10;
        opacity: 0;
      }
      .file_text {
        width: 198px;
        height: 30px;
        border: 1px solid #eee;
        border-radius: 2px;
        margin-right: 10px;
        box-sizing: border-box;
        padding-left: 5px;
      }
      span {
        color: #23a8f5;
        cursor: pointer;
      }
      .delete {
        height: 30px;
        z-index: 1000;
        line-height: 30px;
      }
    }
    .upload_btn {
      margin-top: 20px;
      display: block;
      width: 78px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 2px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      background: #f05454;
      &:hover {
        opacity: 0.88;
      }
    }
  }
  a {
    color: #23a8f5;
  }
  .modal {
    width: 328px;
    height: 190px;
    background: #fff;
    box-shadow: 0px 0px 5px #ccc;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    .title {
      line-height: 42px;
      padding: 0 15px;
      font-size: 14px;
      border-width: 1px;
      color: #999;
      .el-icon-close {
        color: #333;
        font-size: 18px;
        margin-top: 10px;
      }
    }
    .info {
      color: #666;
      .loading-img {
        margin-right: 10px;
        animation: roll 1.5s infinite linear;
      }
      @keyframes roll {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>

