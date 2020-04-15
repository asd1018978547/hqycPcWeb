<!-- 认证详情页-->
<template>
  <div class="main">
    <v-top></v-top>
    <div class="topCon">
      <div class="container flex flex-c">
        <span>
          <v-logo></v-logo>
        </span>
        <span
          class="flex1"
          style="font-size: 24px;color: #656565;margin-left: 20px;padding: 5px 20px;border-left: 2px solid #ccc;"
        >会员认证</span>
      </div>
    </div>
    <!-- 微商代购 -->
    <div class="tableCon marginTop20" v-if=" AUTHTYPE == 1">
      <div class="container white-bg">
        <div class="Auth_info">认证信息</div>
        <el-row>
          <el-form
            :model="s_1"
            :rules="s_1_rules"
            ref="ruleForm"
            size="small"
            label-width="180px"
            style="padding: 15px 0 0 0;"
          >
            <el-col :span="12">
              <el-form-item label="微商名称:" prop="shopName" label-width="150px">
                <el-input disabled v-model="s_1.shopName" placeholder="请填写微商名称" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码:" label-width="150px" prop="idCardNo">
                <el-input v-model="s_1.idCardNo" disabled placeholder="请填写身份证号码" style="width:80%"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="s_1.sales>0">
              <el-form-item label="月销量:" label-width="150px" v-if="s_1.sales>0">
                <el-input
                  v-model="s_1.sales"
                  disabled
                  placeholder="请填写月销量金额 （单位：万）"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operationCategory.length!=0">
              <el-form-item label="经营类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseOperation"
                  v-model="operationCategory"
                  multiple
                  placeholder="请选择经营类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="interestCategory.length!=0">
              <el-form-item label="感兴趣类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseInterestCategory"
                  v-model="interestCategory"
                  multiple
                  placeholder="请选择感兴趣类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 55px;">*</span>
              <el-form-item label="法人身份证:" label-width="150px">
                <el-upload
                  style="display:inline-block"
                  disabled
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  style="display:inline-block"
                  disabled
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg1"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <!-- 网络店铺 -->
    <div class="tableCon marginTop20" v-if="AUTHTYPE == 2">
      <div class="container white-bg">
        <div class="Auth_info">认证信息</div>
        <el-row>
          <el-form
            :model="s_2"
            :rules="s_1_rules"
            ref="ruleForm"
            size="small"
            label-width="180px"
            style="padding: 15px 0 0 0;"
          >
            <el-col :span="12">
              <el-form-item label="店铺名称:" prop="shopName" label-width="150px">
                <el-input disabled v-model="s_2.shopName" placeholder="请填写店铺名称" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售平台:" prop="platform" label-width="150px">
                <el-input disabled v-model="s_2.platform" placeholder="请填写销售平台" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="店铺网址:" prop="webLink" label-width="150px">
                <el-input disabled v-model="s_2.webLink" placeholder="请填写店铺网址" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="s_2.sales>0">
              <el-form-item label="月销量:" label-width="150px">
                <el-input
                  disabled
                  v-model="s_2.sales"
                  placeholder="请填写月销量金额 （单位：万）"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operationCategory.length!=0">
              <el-form-item label="经营类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseOperation"
                  v-model="operationCategory"
                  multiple
                  placeholder="请选择经营类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="interestCategory.length!=0">
              <el-form-item label="感兴趣类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseInterestCategory"
                  v-model="interestCategory"
                  multiple
                  placeholder="请选择感兴趣类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 55px;">*</span>
              <el-form-item label="法人身份证:" label-width="150px">
                <el-upload
                  style="display:inline-block"
                  disabled
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  disabled
                  style="display:inline-block"
                  accept="image/*"
                  class="avatar-uploader"
                  action
                  :http-request="uploadImg1"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <!-- 实体门店 -->
    <div class="tableCon marginTop20" v-if="AUTHTYPE == 3">
      <div class="container white-bg">
        <div class="Auth_info">认证信息</div>
        <el-row>
          <el-form
            :model="s_3"
            :rules="s_1_rules"
            ref="ruleForm"
            size="small"
            label-width="180px"
            style="padding: 15px 0 0 0;"
          >
            <el-col :span="12">
              <el-form-item label="门店名称:" prop="shopName" label-width="150px">
                <el-input disabled v-model="s_3.shopName" placeholder="请输入门店名称" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="门店地址:" prop="addressDetail" label-width="150px">
                <el-cascader
                  disabled
                  @change="chooseAddress"
                  style="width:80%"
                  v-model="s_3.addressDetail"
                  separator="-"
                  placeholder="请选择地址"
                  :props="areaOptions"
                  :options="areaData"
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址:" prop="address" label-width="150px">
                <el-input disabled v-model="s_3.address" placeholder="请填写详细地址" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="营业执照号码:" label-width="150px" prop="license">
                <el-input disabled v-model="s_3.license" placeholder="请填写营业执照号码" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="s_3.sales>0">
              <el-form-item label="月销量:" label-width="150px">
                <el-input
                  disabled
                  v-model="s_3.sales"
                  placeholder="请填写月销量金额 （单位：万）"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operationCategory.length!=0">
              <el-form-item label="经营类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseOperation"
                  v-model="operationCategory"
                  multiple
                  placeholder="请选择经营类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="interestCategory.length!=0">
              <el-form-item label="感兴趣类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseInterestCategory"
                  v-model="interestCategory"
                  multiple
                  placeholder="请选择感兴趣类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 65px;">*</span>
              <el-form-item label="门店照片:" label-width="150px">
                <el-upload
                  style="display:inline-block"
                  disabled
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  style="display:inline-block"
                  disabled
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg1"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 65px;">*</span>
              <el-form-item label="营业执照:" label-width="150px">
                <el-upload
                  disabled
                  style="margin-top:10px"
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg2"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>

    <!-- 网络平台 -->
    <div class="tableCon marginTop20" v-if="AUTHTYPE == 4">
      <div class="container white-bg">
        <div class="Auth_info">认证信息</div>
        <el-row>
          <el-form
            :model="s_4"
            :rules="s_1_rules"
            ref="ruleForm"
            size="small"
            label-width="180px"
            style="padding: 15px 0 0 0;"
          >
            <el-col :span="12">
              <el-form-item label="企业名称:" prop="companyName" label-width="150px">
                <el-input
                  disabled
                  v-model="s_4.companyName"
                  placeholder="请输入门店名称"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平台名称:" prop="shopName" label-width="150px">
                <el-input disabled v-model="s_4.shopName" placeholder="请输入门店名称" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平台网址:" prop="webLink" label-width="150px">
                <el-input disabled v-model="s_4.webLink" placeholder="请输入门店名称" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="月销量:" label-width="150px" v-if="s_4.sales>0">
                <el-input
                  disabled
                  v-model="s_4.sales"
                  placeholder="请填写月销量金额 （单位：万）"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operationCategory.length!=0">
              <el-form-item label="经营类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseOperation"
                  v-model="operationCategory"
                  multiple
                  placeholder="请选择经营类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="interestCategory.length!=0">
              <el-form-item label="感兴趣类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseInterestCategory"
                  v-model="interestCategory"
                  multiple
                  placeholder="请选择感兴趣类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 65px;">*</span>
              <el-form-item label="营业执照:" label-width="150px">
                <el-upload
                  disabled
                  style="margin-top:10px"
                  accept="image/*"
                  class="avatar-uploader"
                  action
                  :http-request="uploadImg2"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 55px;">*</span>
              <el-form-item label="法人身份证:" label-width="150px">
                <el-upload
                  disabled
                  style="display:inline-block"
                  accept="image/*"
                  class="avatar-uploader"
                  action
                  :http-request="uploadImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  disabled
                  style="display:inline-block"
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg1"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <!-- 批采企业 -->
    <div class="tableCon marginTop20" v-if="AUTHTYPE == 7">
      <div class="container white-bg">
        <div class="Auth_info">认证信息</div>
        <el-row>
          <el-form
            :model="s_6"
            :rules="s_1_rules"
            ref="ruleForm"
            size="small"
            label-width="180px"
            style="padding: 15px 0 0 0;"
          >
            <el-col :span="12">
              <el-form-item label="企业名称:" prop="companyName" label-width="150px">
                <el-input
                  disabled
                  v-model="s_6.companyName"
                  placeholder="请输入门店名称"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业地址:" prop="addressDetail" label-width="150px">
                <el-cascader
                  disabled
                  @change="chooseAddress"
                  style="width:80%"
                  v-model="s_6.addressDetail"
                  separator="-"
                  placeholder="请选择地址"
                  :props="areaOptions"
                  :options="areaData"
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="详细地址:" prop="address" label-width="150px">
                <el-input disabled v-model="s_6.address" placeholder="请填写详细地址" style="width:80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="s_6.sales>0">
              <el-form-item label="月销量:" label-width="150px">
                <el-input
                  disabled
                  v-model="s_6.sales"
                  placeholder="请填写月销量金额 （单位：万）"
                  style="width:80%"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="operationCategory.length!=0">
              <el-form-item label="经营类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseOperation"
                  v-model="operationCategory"
                  multiple
                  placeholder="请选择经营类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="interestCategory.length!=0">
              <el-form-item label="感兴趣类目:" label-width="150px">
                <el-select
                  disabled
                  @change="chooseInterestCategory"
                  v-model="interestCategory"
                  multiple
                  placeholder="请选择感兴趣类目"
                  style="width:80%"
                >
                  <el-option
                    v-for="item in operationCategoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 55px;">*</span>
              <el-form-item label="法人身份证:" label-width="150px">
                <el-upload
                  disabled
                  style="display:inline-block"
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  disabled
                  style="display:inline-block"
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg1"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <span style="color:red;position: absolute; margin: 9px 0 0 65px;">*</span>
              <el-form-item label="营业执照:" label-width="150px">
                <el-upload
                  disabled
                  style="margin-top:10px"
                  class="avatar-uploader"
                  accept="image/*"
                  action
                  :http-request="uploadImg2"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>

    <v-bottom></v-bottom>
  </div>
</template>
<script>
import moment from "moment";
import { ali_oss_data } from "~/_config/config.js";
let OSS = require("ali-oss");
let imgSavePath =
  ali_oss_data.URL_IMG_HQYC + "auth/" + moment().format("YYYYMM") + "/img/";
import vLogo from "~/components/vLogo";
import vTop from "~/components/vTop";
import vBottom from "~/components/vBottom";
import { API } from "~/_config/API.js";
import { RegExp, AREA } from "~/tools/index";
import { _CONFIG } from "~/_config/config.js";
export default {
  components: {
    vLogo,
    vBottom,
    vTop
  },
  data() {
    const validateId = (rule, value, callback) => {
      if (!this.regIdCard(value)) {
        callback(new Error("请输入正确的身份证号"));
      } else {
        callback();
      }
    };
    return {
      uploadUrl: "",
      imageUrl: "",
      imageUrl1: "",
      imageUrl2: "",
      addplfname: "",
      visible3: false,
      visible2: false,
      kaname: "",
      status: -2,
      plf: [
        { name: "淘宝", value: "淘宝" },
        { name: "天猫", value: "天猫" },
        { name: "京东", value: "京东" },
        { name: "1688", value: "1688" },
        { name: "拼多多", value: "拼多多" },
        { name: "有赞", value: "有赞" },
        { name: "苏宁易购", value: "苏宁易购" },
        { name: "贝贝", value: "贝贝" },
        { name: "微店", value: "微店" }
      ],
      sp: [
        { storePort: "广州口岸" },
        { storePort: "郑州口岸" },
        { storePort: "重庆口岸" },
        { storePort: "宁波口岸" }
      ],
      areaData: [],
      areaData2: [],
      baseUrl: ali_oss_data.URL_IMG_SHOW,
      loading: true,
      refuseReason: "",
      selectImgUrl: "",
      authType: "默认类型",
      autht: "",
      areaData: [],
      FailReason: null,
      areaOptions: {
        value: "Name",
        label: "Name",
        children: "Children"
      },
      s_1_rules: {
        shopName: [{ required: true, message: "请填写内容", trigger: "blur" }],
        addressDetail: [
          { required: true, message: "请选择地址", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请填写内容", trigger: "blur" }
        ],
        platform: [
          { required: true, message: "请填写销售平台", trigger: "blur" }
        ],
        address: [{ required: true, message: "请填详细地址", trigger: "blur" }],
        webLink: [
          { required: true, message: "请填写店铺网址", trigger: "blur" }
        ],
        idCardNo: [
          { required: true, message: "请填写身份证号码", trigger: "blur" },
          {
            validator: validateId,
            required: true,
            trigger: "blur"
          }
        ],
        license: [
          { required: true, message: "请填写营业执照号码", trigger: "blur" }
        ]
      },
      operationCategoryList: [
        {
          label: "母婴用品",
          value: "002,母婴用品"
        },
        {
          label: "食品保健",
          value: "003,食品保健"
        },
        {
          label: "生活用品",
          value: "004,生活用品"
        },
        {
          label: "美妆个护",
          value: "005,美妆个护"
        },
        {
          label: "儿童玩具",
          value: "006,儿童玩具"
        }
      ],
      operationCategory: [],
      interestCategory: [],
      //!微商代购
      s_1: {
        authType: "1",
        //月销量
        sales: "",
        //微商名称
        shopName: "",
        //身份证号码
        idCardNo: "",
        //法人身份证正面
        idCardFrontImg: null,
        //法人身份证背面
        idCardBehindImg: null,
        //经营品类
        operationCategory: [],
        //感兴趣类目
        interestCategory: []
      },
      //!网络店铺
      s_2: {
        authType: "2",
        // 店铺名称
        shopName: "",
        // 销售平台
        platform: "",
        // 店铺网址
        webLink: "",
        // 经营类目
        operationCategory: [],
        //感兴趣类目
        interestCategory: [],
        //月销量
        sales: "",
        //法人身份证正面
        idCardFrontImg: null,
        //法人身份证反面
        idCardBehindImg: null
      },
      //!实体门店
      s_3: {
        //认证类型
        authType: "3",
        //门店名称
        shopName: "",
        //城市
        city: "",
        //省
        province: "",
        //区
        district: "",
        //详细地址
        address: "",
        //经营品类
        operationCategory: [],
        //感兴趣类目
        interestCategory: [],
        //月销量
        sales: "",
        addressDetail: [],
        // 营业执照号码
        license: "",
        //门店照片
        shopImg: [],
        // 营业执照
        licensImg: null
      },
      //!网络平台
      s_4: {
        authType: "4",
        //企业名称
        companyName: "",
        //平台名称
        shopName: "",
        //平台网址
        webLink: "",
        //经营品类
        operationCategory: [],
        //感兴趣类目
        interestCategory: [],
        //月销量
        sales: "",
        //营业执照
        licensImg: null,
        //法人身份证
        idCardFrontImg: null,
        idCardBehindImg: null
      },
      myFile: "",
      // !.批采企业
      s_6: {
        authType: "7",
        //企业名称
        companyName: "",
        //城市
        city: "",
        //省
        province: "",
        //区
        district: "",
        //详细地址
        address: "",
        addressDetail: [],
        //经营品类
        operationCategory: [],
        //感兴趣类目
        interestCategory: [],
        //月销量
        sales: "",
        // 营业执照
        licensImg: null,
        //法人身份证照片
        idCardFrontImg: null,
        idCardBehindImg: null
      },
      selectedIndex: -1,
      //城市选择器
      areaOptions: {
        value: "Name",
        label: "Name",
        children: "Children"
      },
      AUTHTYPE: "",
      myStatus: null,
      uploadfiles: [],
      imgNames: [],
      FailReason1: null,
      uploadfiles1: [],
      imgNames1: [],
      uploadfiles2: [],
      RetailerId: null,
      imgNames2: []
    };
  },
  methods: {
    getResults() {
      let self = this;
      API.authResult({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        this.myStatus = res.Data.Status;
        if (this.myStatus == 2) {
          this.$router.push({ path: "/authEdit" });
        }
        this.FailReason1 = res.Data.FailReason;
        this.AUTHTYPE = Number(res.Data.AuthType);
        this.RetailerId = res.Data.RetailerId;
        this.selectedIndex = Number(res.Data.AuthType);
        if (Number(res.AuthType) == 7) {
          this.selectedIndex = 6;
        }
        switch (res.Data.AuthType) {
          //微商代购
          case 1:
            this.s_1.shopName = res.Data.ShopName;
            this.s_1.sales = res.Data.Sales;
            //身份证号码
            this.s_1.idCardNo = res.Data.IdCardNo;
            //法人身份证正面
            this.s_1.idCardFrontImg = res.Data.IdCardFrontImg;
            //法人身份证背面
            this.s_1.idCardBehindImg = res.Data.IdCardBehindImg;
            //经营品类
            this.s_1.operationCategory = res.Data.OperationCategory;
            //感兴趣类目
            this.s_1.interestCategory = res.Data.InterestCategory;
            if (res.Data.OperationCategory.length > 0) {
              res.Data.OperationCategory.forEach(element => {
                this.operationCategory.push(
                  element.OperationCategoryCode +
                    "," +
                    element.OperationCategoryName
                );
              });
            }
            if (res.Data.InterestCategory.length > 0) {
              res.Data.InterestCategory.forEach(element => {
                this.interestCategory.push(
                  element.InterestCategoryCode +
                    "," +
                    element.InterestCategoryName
                );
              });
            }

            if (res.Data.IdCardFrontImg) {
              this.imageUrl = this.baseUrl + res.Data.IdCardFrontImg;
            }
            if (res.Data.IdCardBehindImg) {
              this.imageUrl1 = this.baseUrl + res.Data.IdCardBehindImg;
            }
            break;
          // 网络店铺
          case 2:
            // 店铺名称
            this.s_2.shopName = res.Data.ShopName;
            // 销售平台
            this.s_2.platform = res.Data.Platform;
            // 店铺网址
            this.s_2.webLink = res.Data.WebLink;
            // 经营类目
            this.s_2.operationCategory = res.Data.OperationCategory;
            //感兴趣类目
            this.s_2.interestCategory = res.Data.InterestCategory;
            //月销量
            this.s_2.sales = res.Data.Sales;
            //法人身份证正面
            this.s_2.idCardFrontImg = res.Data.IdCardFrontImg;
            //法人身份证反面
            this.s_2.idCardBehindImg = res.Data.IdCardBehindImg;
            if (res.Data.OperationCategory.length > 0) {
              res.Data.OperationCategory.forEach(element => {
                this.operationCategory.push(
                  element.OperationCategoryCode +
                    "," +
                    element.OperationCategoryName
                );
              });
            }
            if (res.Data.InterestCategory.length > 0) {
              res.Data.InterestCategory.forEach(element => {
                this.interestCategory.push(
                  element.InterestCategoryCode +
                    "," +
                    element.InterestCategoryName
                );
              });
            }

            if (res.Data.IdCardFrontImg) {
              this.imageUrl = this.baseUrl + res.Data.IdCardFrontImg;
            }
            if (res.Data.IdCardBehindImg) {
              this.imageUrl1 = this.baseUrl + res.Data.IdCardBehindImg;
            }

            break;
          // 实体门店
          case 3:
            //门店名称
            this.s_3.shopName = res.Data.ShopName;
            //城市
            this.s_3.city = res.Data.City;
            //省
            this.s_3.province = res.Data.Province;
            //区
            this.s_3.district = res.Data.District;
            //详细地址
            this.s_3.address = res.Data.Address;
            //经营品类
            this.s_3.operationCategory = res.Data.OperationCategory;
            //感兴趣类目
            this.s_3.interestCategory = res.Data.InterestCategory;
            //月销量
            this.s_3.sales = res.Data.Sales;
            this.s_3.addressDetail = [
              res.Data.Province,
              res.Data.City,
              res.Data.District
            ];
            // 营业执照号码
            this.s_3.license = res.Data.License;
            //门店照片
            this.s_3.shopImg = res.Data.ShopImg;
            // 营业执照
            this.s_3.licensImg = res.Data.LicensImg;
            if (res.Data.OperationCategory.length > 0) {
              res.Data.OperationCategory.forEach(element => {
                this.operationCategory.push(
                  element.OperationCategoryCode +
                    "," +
                    element.OperationCategoryName
                );
              });
            }
            if (res.Data.InterestCategory.length > 0) {
              res.Data.InterestCategory.forEach(element => {
                this.interestCategory.push(
                  element.InterestCategoryCode +
                    "," +
                    element.InterestCategoryName
                );
              });
            }
            if (res.Data.LicensImg) {
              this.imageUrl2 = this.baseUrl + res.Data.LicensImg;
            }
            if (res.Data.ShopImg) {
              this.imageUrl = this.baseUrl + res.Data.ShopImg.split(",")[0];
              this.imageUrl1 = this.baseUrl + res.Data.ShopImg.split(",")[1];
            }
            break;
          // 网络平台
          case 4:
            //企业名称
            this.s_4.companyName = res.Data.CompanyName;
            //平台名称
            this.s_4.shopName = res.Data.ShopName;
            //平台网址
            this.s_4.webLink = res.Data.WebLink;
            //经营品类
            this.s_4.operationCategory = res.Data.OperationCategory;
            //感兴趣类目
            this.s_4.interestCategory = res.Data.InterestCategory;
            //月销量
            this.s_4.sales = res.Data.Sales;
            //营业执照
            this.s_4.licensImg = res.Data.LicensImg;
            //法人身份证
            this.s_4.idCardFrontImg = res.Data.IdCardFrontImg;
            this.s_4.idCardBehindImg = res.Data.IdCardBehindImg;
            if (res.Data.OperationCategory.length > 0) {
              res.Data.OperationCategory.forEach(element => {
                this.operationCategory.push(
                  element.OperationCategoryCode +
                    "," +
                    element.OperationCategoryName
                );
              });
            }
            if (res.Data.InterestCategory.length > 0) {
              res.Data.InterestCategory.forEach(element => {
                this.interestCategory.push(
                  element.InterestCategoryCode +
                    "," +
                    element.InterestCategoryName
                );
              });
            }

            if (res.Data.LicensImg) {
              this.imageUrl2 = this.baseUrl + res.Data.LicensImg;
            }
            if (res.Data.IdCardFrontImg) {
              this.imageUrl = this.baseUrl + res.Data.IdCardFrontImg;
            }
            if (res.Data.IdCardBehindImg) {
              this.imageUrl1 = this.baseUrl + res.Data.IdCardBehindImg;
            }
            break;
          // 批采企业
          case 7:
            //企业名称
            this.s_6.companyName = res.Data.CompanyName;
            //城市
            this.s_6.city = res.Data.City;
            //省
            this.s_6.province = res.Data.Province;
            //区
            this.s_6.district = res.Data.District;
            //详细地址
            this.s_6.address = res.Data.Address;
            this.s_6.addressDetail = [
              res.Data.Province,
              res.Data.City,
              res.Data.District
            ];
            //经营品类
            this.s_6.operationCategory = res.Data.OperationCategory;
            //感兴趣类目
            this.s_6.interestCategory = res.Data.InterestCategory;
            //月销量
            this.s_6.sales = res.Data.Sales;
            // 营业执照
            this.s_6.licensImg = res.Data.LicensImg;
            //法人身份证照片
            this.s_6.idCardFrontImg = res.Data.IdCardFrontImg;
            this.s_6.idCardBehindImg = res.Data.IdCardBehindImg;
            if (res.Data.OperationCategory.length > 0) {
              res.Data.OperationCategory.forEach(element => {
                this.operationCategory.push(
                  element.OperationCategoryCode +
                    "," +
                    element.OperationCategoryName
                );
              });
            }
            if (res.Data.InterestCategory.length > 0) {
              res.Data.InterestCategory.forEach(element => {
                this.interestCategory.push(
                  element.InterestCategoryCode +
                    "," +
                    element.InterestCategoryName
                );
              });
            }

            if (res.Data.LicensImg) {
              this.imageUrl2 = this.baseUrl + res.Data.LicensImg;
            }
            if (res.Data.IdCardFrontImg) {
              this.imageUrl = this.baseUrl + res.Data.IdCardFrontImg;
            }
            if (res.Data.IdCardBehindImg) {
              this.imageUrl1 = this.baseUrl + res.Data.IdCardBehindImg;
            }
            break;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.selectedIndex == 1 || this.selectedIndex == 2) {
            if (
              this["s_" + this.selectedIndex].idCardFrontImg == null ||
              this["s_" + this.selectedIndex].idCardBehindImg == null
            ) {
              this.$message.error("请上传凭证");
              return;
            }
          }
          if (this.selectedIndex == 3) {
            if (this.s_3.shopImg instanceof Array) {
              if (
                this["s_" + this.selectedIndex].shopImg.length != 2 ||
                this["s_" + this.selectedIndex].licensImg == null
              ) {
                this.$message.error("请上传凭证");
                return;
              } else {
                this["s_" + this.selectedIndex].shopImg = this[
                  "s_" + this.selectedIndex
                ].shopImg.join(",");
              }
            } else {
              this.s_3.shopImg = this.s_3.shopImg.split(",");
              if (
                this["s_" + this.selectedIndex].shopImg.length != 2 ||
                this["s_" + this.selectedIndex].licensImg == null
              ) {
                this.$message.error("请上传凭证");
                return;
              } else {
                this["s_" + this.selectedIndex].shopImg = this[
                  "s_" + this.selectedIndex
                ].shopImg.join(",");
              }
            }
          }
          if (this.selectedIndex == 4 || this.selectedIndex == 6) {
            if (
              this["s_" + this.selectedIndex].idCardFrontImg == null ||
              this["s_" + this.selectedIndex].idCardBehindImg == null ||
              this["s_" + this.selectedIndex].licensImg == null
            ) {
              this.$message.error("请上传凭证");
              return;
            }
          }
          this["s_" + this.selectedIndex].token = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).token
            : null;
          this["s_" + this.selectedIndex].RetailerId = this.RetailerId;
          API.subAuth(this["s_" + this.selectedIndex]).then(res => {
            if (res.ResponseId == 0) {
              this.$message.success("资料提交成功！");
              this.$router.push("/dashboard");
            } else {
              this.$message.error(res.Message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      location.reload();
    },
    chooseAddress(val) {
      this["s_" + this.selectedIndex].province = val[0];
      this["s_" + this.selectedIndex].city = val[1];
      this["s_" + this.selectedIndex].district = val[2];
    },
    //自定義圖片上傳方法
    uploadImg(option) {
      this.uploadfiles = [];
      this.imgNames = [];
      this.uploadfiles.push(option.file);
      this.imgNames.push(option.file.name);
      //配置的上传路径
      let imgFileNameList = this.imgNames.map(element => {
        let name = Math.floor(Math.random() * 1000) + new Date().getTime();
        let imageType = element.substring(element.lastIndexOf(".") + 1);
        return imgSavePath + name + "." + imageType;
      });
      for (var i = 0; i < this.uploadfiles.length; i++) {
        this.uploadImgToOSS(this.uploadfiles[i], imgFileNameList[i]);
      }
      this.$forceUpdate();
      setTimeout(() => {
        this.imageUrl = ali_oss_data.URL_IMG_SHOW + imgFileNameList[0];
        if (this.selectedIndex == 3) {
          this.s_3.shopImg.push(imgFileNameList[0]);
        } else {
          this["s_" + this.selectedIndex].idCardFrontImg = imgFileNameList[0];
        }
      }, 800);
    },
    uploadImg1(option) {
      this.uploadfiles1 = [];
      this.imgNames1 = [];
      this.uploadfiles1.push(option.file);
      this.imgNames1.push(option.file.name);
      //配置的上传路径
      let imgFileNameList = this.imgNames1.map(element => {
        let name = Math.floor(Math.random() * 1000) + new Date().getTime();
        let imageType = element.substring(element.lastIndexOf(".") + 1);
        return imgSavePath + name + "." + imageType;
      });
      for (var i = 0; i < this.uploadfiles1.length; i++) {
        this.uploadImgToOSS(this.uploadfiles1[i], imgFileNameList[i]);
      }
      this.$forceUpdate();
      setTimeout(() => {
        this.imageUrl1 = ali_oss_data.URL_IMG_SHOW + imgFileNameList[0];
        if (this.selectedIndex == 3) {
          this.s_3.shopImg.push(imgFileNameList[0]);
        } else {
          this["s_" + this.selectedIndex].idCardBehindImg = imgFileNameList[0];
        }
      }, 800);
    },
    uploadImg2(option) {
      this.uploadfiles2 = [];
      this.imgNames2 = [];
      this.uploadfiles2.push(option.file);
      this.imgNames2.push(option.file.name);
      //配置的上传路径
      let imgFileNameList = this.imgNames2.map(element => {
        let name = Math.floor(Math.random() * 1000) + new Date().getTime();
        let imageType = element.substring(element.lastIndexOf(".") + 1);
        return imgSavePath + name + "." + imageType;
      });
      for (var i = 0; i < this.uploadfiles2.length; i++) {
        this.uploadImgToOSS(this.uploadfiles2[i], imgFileNameList[i]);
      }
      this.$forceUpdate();
      setTimeout(() => {
        this.imageUrl2 = ali_oss_data.URL_IMG_SHOW + imgFileNameList[0];
        this["s_" + this.selectedIndex].licensImg = imgFileNameList[0];
      }, 500);
    },
    //上传到ali-OSS
    uploadImgToOSS(file, imgName) {
      let client = new OSS(ali_oss_data.PARAMS_OBJ);
      async function put() {
        try {
          let result = await client.put(imgName, file);
        } catch (e) {
          console.log(e);
        }
      }
      put();
    },
    getClass(v) {
      if (this.status == 0 && v == this.autht) {
        return "auth_card_shing";
      } else if (this.status == 1 && v == this.autht) {
        return "auth_card_active";
      } else if (this.status == 2 && v == this.autht) {
        return "auth_card_passed";
      } else {
        return "auth_card_default";
      }
    },
    selected(index) {
      this.selectedIndex = index;
      switch (index) {
        case 1:
          this.authType = "微商代购";
          break;
        case 2:
          this.authType = "网络店铺";
          break;
        case 3:
          this.authType = "实体门店";
          break;
        case 4:
          this.authType = "网络平台";
          break;
        case 6:
          this.authType = "批采企业";
          break;
      }
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      } else {
        this.myFile = file;
      }
      return isLt2M;
    },
    formartstorePort(data) {
      let a = [];
      data.map(v => {
        a.push({
          storePort: v
        });
      });
      return a;
    },
    chooseOperation(val) {
      this[
        "s_" + this.selectedIndex
      ].operationCategory = this.formartoperationCategory(val);
    },
    chooseInterestCategory(val) {
      this[
        "s_" + this.selectedIndex
      ].interestCategory = this.formartinterestCategory(val);
    },
    //格式化经营品类
    formartoperationCategory(data) {
      let a = [];
      data.map(v => {
        a.push({
          operationCategoryCode: v.split(",")[0],
          operationCategoryName: v.split(",")[1]
        });
      });
      return a;
    },
    //格式化感兴趣类目
    formartinterestCategory(data) {
      let a = [];
      data.map(v => {
        a.push({
          interestCategoryCode: v.split(",")[0],
          interestCategoryName: v.split(",")[1]
        });
      });
      return a;
    },
    formartAddress(data) {
      let f = {};
      f.province = "";
      f.city = "";
      f.district = "";
      this.areaData.map(v => {
        if (v.Code == data[0]) {
          f.province = v.Name;
          v.Children.map(v1 => {
            if (v1.Code == data[1]) {
              f.city = v1.Name;
              v1.Children.map(v2 => {
                if (v2.Code == data[2]) {
                  f.district = v2.Name;
                }
              });
            }
          });
        }
      });
      return f;
    },
    getAddress(cb) {
      API.getAddressData({
        token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      }).then(res => {
        res.Data.map(a => {
          a.Children.map(b => {
            b.Children.map(c => {
              delete c.Children;
            });
          });
        });
        let a = JSON.parse(JSON.stringify(res.Data));
        a.map(a => {
          a.Children.map(b => {
            delete b.Children;
          });
        });
        this.areaData = res.Data;
        this.areaData2 = a;
        cb();
      });
    },
    regIdCard(val) {
      if (!RegExp.IDcard.test(val)) return false;
      let idCardWi = new Array(
        7,
        9,
        10,
        5,
        8,
        4,
        2,
        1,
        6,
        3,
        7,
        9,
        10,
        5,
        8,
        4,
        2
      ); //将前17位加权因子保存在数组里
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
    }
  },
  mounted() {
    this.uploadUrl =
      _CONFIG.fileUrl +
      "/f/upload/300002/?partnerId=20000&token=" +
      (localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user")).token
        : "");
    this.getAddress(() => {});
    this.getResults();
  }
};
</script>
<style >
.input_link .input_selete .el-input__inner {
  width: 130px;
}
</style>
<style lang="less" scoped>
.failStyle {
  color: red;
  text-align: center;
  margin: 21px 0 0 0;
  font-size: 20px;
}
.Auth_info {
  background-color: #f6f6f6;
  padding: 5px 0 5px 30px;
}
.Certification_tips {
  color: #666;
  margin-top: 10px;
  line-height: 20px;
}
.input_link {
  width: 340px !important;
}
.mrl10 {
  margin-left: 10px;
}
.w240 {
  flex: 0 0 210px;
}
.w500 {
  width: 500px;
  display: flex;
}
.reUpload {
  position: absolute;
  color: #409eff;
  right: -70px;
}
.link_800_28 {
  line-height: 28px;
  width: 800px !important;
}
.text_left {
  width: 100% !important;
  text-align: left !important;
}
.auth_card {
  margin-bottom: 13px;
  color: #666;
  cursor: pointer;
  padding: 10px 0;
  font-size: 14px;
}
.auth_card_default {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA8CAYAAACEhkNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE4NTU5NDE1QjgxQzExRTk4Q0Q4RUE5NDFDMzMxNjYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE4NTU5NDE2QjgxQzExRTk4Q0Q4RUE5NDFDMzMxNjYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTg1NTk0MTNCODFDMTFFOThDRDhFQTk0MUMzMzE2NjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTg1NTk0MTRCODFDMTFFOThDRDhFQTk0MUMzMzE2NjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5c7LGpAAAWiklEQVR42uyd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);
  background-repeat: no-repeat;
  background-size: auto 40px;
  background-position: center center;
}
.auth_card_shing {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA8CAYAAACEhkNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJGMUQyMjA4QjgxQzExRTlBMDc2OTBCNUMzREREQjE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJGMUQyMjA5QjgxQzExRTlBMDc2OTBCNUMzREREQjE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkYxRDIyMDZCODFDMTFFOUEwNzY5MEI1QzNERERCMTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkYxRDIyMDdCODFDMTFFOUEwNzY5MEI1QzNERERCMTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7V3bBFAAAWwElEQVR42uyd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);
  background-repeat: no-repeat;
  background-size: auto 40px;
  background-position: center center;
}
.auth_card_passed {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA8CAYAAACEhkNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1RkVDQTA4QjgxQzExRTlBQzAxRjNGRjRDRUMwRDMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1RkVDQTA5QjgxQzExRTlBQzAxRjNGRjRDRUMwRDMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVGRUNBMDZCODFDMTFFOUFDMDFGM0ZGNENFQzBEMzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTVGRUNBMDdCODFDMTFFOUFDMDFGM0ZGNENFQzBEMzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4arfpDAAAW90lEQVR42uyd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);
  background-repeat: no-repeat;
  background-size: auto 40px;
  background-position: center center;
}
.auth_card_active {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAA8CAYAAACEhkNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQzOTMzNjExQjgxQzExRTlBNTNDRDI2MzcyRkUwREQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQzOTMzNjEyQjgxQzExRTlBNTNDRDI2MzcyRkUwREQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDM5MzM2MEZCODFDMTFFOUE1M0NEMjYzNzJGRTBERDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDM5MzM2MTBCODFDMTFFOUE1M0NEMjYzNzJGRTBERDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6PM+eUAAAWdElEQVR42uyd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);
  background-repeat: no-repeat;
  background-size: auto 40px;
  background-position: center center;
}
.color-red {
  color: #fe0000;
}
.topCon {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
  border-bottom: 1px solid #ececec;
}
.tableCon .container {
  min-height: 600px;
  padding: 20px;
}
.viewBtn {
  line-height: 32px;
  font-size: 20px;
  width: 80px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  color: #333;
  &:first-child {
    margin-right: 40px;
  }
  &.active {
    border-bottom: 2px solid #fe0000;
  }
}
.view_split {
  display: inline-block;
  height: 20px;
  width: 2px;
  background: #ccc;
  position: relative;
  top: 6px;
  margin-right: 40px;
}
.table {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  color: #808080;
  .input_con {
    margin-top: 15px;
    display: flex;
    .input_label {
      width: 170px;
      text-align: right;
      line-height: 28px;
      margin-right: 10px;
    }
    .input_link,
    .input_address,
    .input_user,
    .input_job,
    .input_phone,
    .input_wechat {
      width: 240px;
    }
  }
}
.image_con {
  width: 238px;
  height: 148px;
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid #dcdfe6;
  text-align: center;
}
.image_con img {
  width: 100%;
  height: 100%;
}
.image_con p {
  width: 100%;
  flex: 1;
}
.btn_group {
  padding-left: 165px;
  margin-top: 30px;
}
.btn_sub {
  display: inline-block;
  width: 240px;
  line-height: 40px;
  background: #fe0000;
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  border-radius: 2px;
}
.descAddress {
  margin-top: 10px;
}
.successInfo {
  padding-top: 60px;
  box-sizing: border-box;
  min-height: 600px;
  .icon_success {
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }
  .info {
    .title {
      font-size: 18px;
      color: #333;
    }
    .color66 {
      color: #666;
      font-size: 12px;
    }
    .colorBlue {
      color: #24a7f7;
    }
  }
}
.input_con .color-red {
  line-height: 28px;
  margin-right: 5px;
  height: 28px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
.link_800 .el-checkbox {
  margin-left: 0 !important;
  margin-right: 30px;
}
</style>
