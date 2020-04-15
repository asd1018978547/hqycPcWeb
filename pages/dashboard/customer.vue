<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="cr_title">
          <i class="el-icon-tickets"></i> 客户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container_admin">
      <div class="handle-box">
        <el-row>
          <el-col :span="20">
            <el-input size="mini" :maxlength='20' placeholder="输入身份证号、姓名、电话" v-model="search.cardNumber" @keydown.native.enter = 'searchCustomer'>
            </el-input>
          </el-col>
          <el-button type="danger" @click="searchCustomer" size="mini">查询</el-button>
        </el-row>
        <el-button class="addCustomer" type="danger" plain size="mini" @click="addUser">新增客户</el-button>
        <div class="clearfix"></div>
      </div>
      <el-table v-loading="table_loading" :data="tableData" border style="width: 100%;margin-top:10px;" ref="multipleTable">
        <el-table-column class-name="c_td" type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column class-name="c_td" prop="Contact" label="姓名" width="100">
        </el-table-column>
        <el-table-column class-name="c_td" prop="IDNum" label="身份证号" width="170">
        </el-table-column>
        <el-table-column class-name="c_td" prop="Phone" label="手机号" width="130">
        </el-table-column>
        <el-table-column class-name="c_td" prop="allAddress" label="地址">
        </el-table-column>
        <el-table-column class-name="c_td" label="操作" width="180" align='center'>
          <template slot-scope="scope">
            <a @click="editUser(scope.row)" class="add_btn">编辑</a>
            <a @click="deleteUser(scope.row)" class="del_btn">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
			      :current-page.sync="currentPage"
			      :page-size="1"
			      layout="prev, pager, next, jumper"
			      :total="totalPages">
			    </el-pagination>
      </div>
    </div>
    <el-dialog v-if="dialogFormVisible" @close='clearDialog' :title="subType == 1 ? '新增客户':'编辑客户'" :visible.sync="dialogFormVisible" width='40%'>
      <el-form>
        <el-form-item label="姓名" :label-width="formLabelWidth" required>
          <el-col :span="20">
            <el-input :maxlength='20' placeholder='请输入姓名' v-model="add.name" auto-complete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" required>
          <el-col :span="20">
            <el-input :maxlength='11' placeholder='请输入电话' v-model="add.phone" auto-complete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input :maxlength='18' placeholder='请输入身份证号' v-model="add.cardNumber" auto-complete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="选择城市" :label-width="formLabelWidth" required>
          <el-col :span="20">
            <el-cascader size="mini" ref="cascader" v-model="add.city" separator="-" placeholder="试试搜索：成都" :props='areaOptions' :options="areaData" filterable></el-cascader>
          </el-col>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" required>
          <el-col :span="20">
            <el-input :maxlength='200' placeholder='请输入详细地址' v-model="add.address" auto-complete="off" size="mini"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addSub" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { API } from "~/_config/API.js";
import { RegExp, AREA } from "~/tools/index";
export default {
  data() {
    return {
      table_loading: true,
      //搜索选项
      search: {
        name: "",
        cardNumber: "",
        phoneNumber: ""
      },
      //城市选择器
      areaOptions: {
        value: "Code",
        label: "Name",
        children: 'Children'
      },
      areaData: [],
      //弹出框
      dialogFormVisible: false,
      formLabelWidth: "120px",
      subType: 1,
      //新增选项
      add: {
        name: "",
        cardNumber: "",
        phone: "",
        address: "",
        addressId: "",
        city: []
      },
      tableData: [],
      currentPage: 1,
      totalPages:1,
      addressId: 0
    };
  },
  mounted () {
    this.getAddress(() => {
      this.getData();
    })
  },
  methods: {
    getAddress(cb) {
      API.getAddressData({
        token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
      }).then(res => {
        res.Data.map(a => {
          a.Children.map(b => {
            b.Children.map(c => {
              delete c.Children
            })
          })
        })
        this.areaData = res.Data
        cb()
      })
    },
    searchCustomer() {
      this.getData();
    },
    test(v) {
    },
    //提交
    addSub() {
      if (!RegExp.phone.test(this.add.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      if (this.add.cardNumber != '' && !this.regIdCard(this.add.cardNumber)) {
        this.$message.error("请输入正确的身份证号码");
        return;
      }
      if (this.add.name == "") {
        this.$message.error("收件人姓名不能为空");
        return;
      }
      if (RegExp.regEn.test(this.add.name)||RegExp.regCn.test(this.add.name)) {
        this.$message.error("请输入正确的收件人");
        return;
      }
      if (this.add.city.length == 0) {
        this.$message.error("请选择城市");
        return;
      }
      if (this.add.address == "") {
        this.$message.error("请输入详细地址");
        return;
      }
      if (RegExp.regEn.test(this.add.address)||RegExp.regCn.test(this.add.address)) {
        this.$message.error("详细地址不能包含特殊字符");
        return;
      }
      let p = {};
      p.contact = this.add.name;
      p.idNum = this.add.cardNumber;
      p.phone = this.add.phone;
      p.province = AREA.getprovince(this.add.city[0], this.areaData).Name;
      p.city = AREA.getcity(this.add.city[0], this.add.city[1], this.areaData).Name;
      p.district = AREA.getdistrict(
        this.add.city[0],
        this.add.city[1],
        this.add.city[2], this.areaData
      ).Name;
      p.areaCode = this.add.city[2];
      p.address = this.add.address;
      p.token= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
      if (this.subType == 1) {
        API.addCustomer(p).then(res => {
          if (res.ResponseId == 0) {
            this.$message.success("添加成功");
            this.getData();
            this.dialogFormVisible = false;
          }else if(res.ResponseId == -1){
						this.$store.commit('LOGOUT');
						this.$message({
							message:'登录过期，请重新登录',
							type:'error',
							duration:1000,
							onClose:()=>{
								this.$router.push({path:'/login'})
							}
						})
					} else {
            this.$message.error(res.Message);
          }
        });
      } else {
        p.addressId = this.add.addressId;
        API.editCustomer(p).then(res => {
          if (res.ResponseId == 0) {
            this.$message.success("修改成功");
            this.getData();
            this.dialogFormVisible = false;
          }else if(res.ResponseId == -1){
						this.$store.commit('LOGOUT');
						this.$message({
							message:'登录过期，请重新登录',
							type:'error',
							duration:1000,
							onClose:()=>{
								this.$router.push({path:'/login'})
							}
						})
					} else {
            this.$message.error(res.Message);
          }
        });
      }
    },
    //新增
    addUser() {
      this.add = {
        name: "",
        cardNumber: "",
        phone: "",
        address: "",
        city: []
      };
      this.subType = 1;
      this.dialogFormVisible = true;
    },
    //清空
    clearDialog() {
      let obj = {};
      obj.stopPropagation = () => {};
      this.$refs.cascader.clearValue(obj);
      this.add = {
        name: "",
        cardNumber: "",
        phone: "",
        address: "",
        city: []
      };
    },
    //编辑
    editUser(row) {
      this.subType = 2;
      this.add.name = row.Contact;
      this.add.cardNumber = row.IDNum;
      this.add.phone = row.Phone;
      this.add.city[0] = row.FirAreaCode;
      this.add.city[1] = row.SecAreaCode;
      this.add.city[2] = row.AreaCode;
      this.add.address = row.Address;
      this.add.addressId = row.AddressId;
      this.dialogFormVisible = true;
    },
    //删除
    deleteUser(row) {
      this.$confirm("是否删除客户信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.deletCustomer({
          addressId: row.AddressId,
          token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
        }).then(res => {
          if (res.ResponseId == 0) {
            this.$message.success("删除成功");
            this.getData();
          }else if(res.ResponseId == -1){
						this.$store.commit('LOGOUT');
						this.$message({
							message:'登录过期，请重新登录',
							type:'error',
							duration:1000,
							onClose:()=>{
								this.$router.push({path:'/login'})
							}
						})
					} else {
            this.$message.error(res.Message);
          }
        });
      });
    },
    getData() {
      API.getCustomer({
        pageSize:15,
        token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
        pageIndex:this.currentPage,
        info: this.search.cardNumber
      }).then(res => {
        this.table_loading = false;
        if (res.ResponseId == 0) {
          for (let x = 0; x < res.Data.Data.length; x++) {
            res.Data.Data[x].allAddress =
              res.Data.Data[x].Province +
              res.Data.Data[x].City +
              res.Data.Data[x].District +
              res.Data.Data[x].Address;
          }
          this.tableData = res.Data.Data;
          this.totalPages = res.Data.TotalPages;
          this.currentPage = res.Data.PageIndex;
        }else if(res.ResponseId == -1){
						this.$store.commit('LOGOUT');
						this.$message({
							message:'登录过期，请重新登录',
							type:'error',
							duration:1000,
							onClose:()=>{
								this.$router.push({path:'/login'})
							}
						})
					} else {
          this.$message.error(res.Message);
        }
      });
    },
    regIdCard(val) {
      if (!RegExp.IDcard.test(val)) return false;
      let idCardWi = new Array(7,9,10, 5, 8, 4, 2,1, 6,3, 7,9,10,5,8, 4,2); //将前17位加权因子保存在数组里
      let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += val.substring(i, i + 1) * idCardWi[i];
      }
      let idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      let idCardLast = val.substring(17); //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch:{
    currentPage(){
      this.getData();
    }
  }
};
</script>
<style>
.el-table td.c_td, .el-table th.c_td{
font-size: 12px !important;
  padding: 8px 0;
}
.c_td>div{
  font-size: 12px !important;
}
</style>

<style scoped>

  .del_btn{
    color: #f56c6c;
    margin-left: 5px;
  }
  .add_btn{
    color: #23a8f5;
    margin-right: 5px;
  }
  .add_btn,.del_btn{
    cursor: pointer;
  }
  .cr_title{
    font-size: 18px;
    font-weight: bolder;
  }
.dialog-footer{
  display: block !important;
}
.clearfix {
  clear: both;
}
.addCustomer,
.upload-demo {
  float: left;
}
.addCustomer {
  margin-right: 10px;
  background: #fff;
}
.el-col {
  padding-right: 15px;
}
.el-row {
  padding-bottom: 10px;
}
.el-form-item {
  margin-bottom: 8px;
}
.el-cascader {
  width: 100%;
}
</style>
