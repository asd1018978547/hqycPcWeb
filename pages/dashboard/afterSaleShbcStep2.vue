<!--卖家处理退款-->
<template>
  <div class="mjcl_root">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="order-title">
          <i class="el-icon-tickets"></i> 订单管理
          <span style="color:black">>申请售后</span>
          <span style="color:black" v-if="baseInfo.RefundMethodCode=='RMC001'">>补偿</span>
          <span style="color:black" v-if="baseInfo.RefundMethodCode=='RMC002'">>仅退款</span>
          <span style="color:black" v-if="baseInfo.RefundMethodCode=='RMC003'">>退货退款</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container_admin">
      <div class="bg"></div>
      <div class="order">
        <div class="oder_info">
          <img
            v-if="(baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6')&&(baseInfo.RefundMethodCode=='RMC001'||baseInfo.RefundMethodCode=='RMC002')"
            src="~/assets/img/completeStep1.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6')&&baseInfo.RefundMethodCode=='RMC003'"
            src="~/assets/img/payback/tjtk2.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='1')&&baseInfo.RefundMethodCode=='RMC003'"
            src="~/assets/img/payback/thtk1.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='1')&&(baseInfo.RefundMethodCode=='RMC001'||baseInfo.RefundMethodCode=='RMC002')"
            src="~/assets/img/payback/step2.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='4'||baseInfo.RefundStatus=='5')&&baseInfo.RefundMethodCode=='RMC003'"
            src="~/assets/img/payback/thtk3.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='7' ||baseInfo.RefundStatus=='8'||baseInfo.RefundStatus=='9')&&baseInfo.RefundMethodCode=='RMC003'"
            src="~/assets/img/payback/tjtk4.png"
            alt="售后进度"
          />
          <img
            v-if="(baseInfo.RefundStatus=='7' ||baseInfo.RefundStatus=='8'||baseInfo.RefundStatus=='9')&&(baseInfo.RefundMethodCode=='RMC001'||baseInfo.RefundMethodCode=='RMC002')"
            src="~/assets/img/payback/3-step3.png"
            alt="售后进度"
          />
          <el-row style="color:#999999;margin-top:10px" v-if="baseInfo.RefundMethodCode=='RMC003'">
            <el-col :span="7" style="color:#F05454">1.买家申请退款</el-col>
            <el-col
              :span="4"
              v-if="(baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6')&&baseInfo.RefundMethodCode=='RMC003'"
            >2.卖家处理退款申请</el-col>
            <el-col :span="4" style="color:#F05454" v-else>2.卖家处理退款申请</el-col>
            <el-col
              :span="7"
              style="color:#F05454;margin-left:10px;"
              v-if="baseInfo.RefundStatus=='4'||baseInfo.RefundStatus=='5'||baseInfo.RefundStatus=='8'||baseInfo.RefundStatus=='7'"
            >3.买家退货</el-col>
            <el-col
              :span="7"
              style="color:#F05454;margin-left:10px;"
              v-if="baseInfo.RefundStatus=='9'"
            >3.商家已收货</el-col>
            <el-col
              :span="7"
              v-if="baseInfo.RefundStatus=='1'||baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6'"
              style="margin-left:10px;"
            >3.买家退货</el-col>
            <el-col
              :span="4"
              style="color:#F05454;"
              v-if="baseInfo.RefundStatus=='7'||baseInfo.RefundStatus=='9'"
            >4.退款完毕</el-col>
            <el-col :span="4" style="color:#F05454;" v-if="baseInfo.RefundStatus=='8'">4.退款关闭</el-col>
            <el-col
              :span="4"
              v-if="baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='6'||baseInfo.RefundStatus=='5'||baseInfo.RefundStatus=='4'"
            >4.退款完毕</el-col>
          </el-row>
          <el-row style="color:#999999;margin-top:10px" v-else>
            <el-col :span="8" style="color:#F05454">1.买家申请退款</el-col>
            <el-col :span="8" v-if="baseInfo.RefundStatus=='3'">2.卖家处理退款申请</el-col>
            <el-col :span="8" style="color:#F05454" v-else>2.卖家处理退款申请</el-col>
            <el-col :span="8" style="color:#F05454" v-if="baseInfo.RefundStatus=='8'">3.退款关闭</el-col>
            <el-col :span="8" style="color:#F05454" v-if="baseInfo.RefundStatus=='7'">3.退款完毕</el-col>
            <el-col
              :span="8"
              v-if="baseInfo.RefundStatus=='1'||baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='3'"
            >3.退款完毕</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="container_admin">
      <div class="bg"></div>
      <div class="order" style="display:flex">
        <div class="left_div">
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='1'">
            <span class="title_span" style="color:#F05454">退款处理中</span>
            <br />
            <span style="color:#666666">您已发起退款申请，请耐心等待商家处理</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='2'">
            <span class="title_span" style="color:#F05454">退款待商家审核</span>
            <br />
            <span style="color:#666666">您已发起退款申请，请耐心等待商家处理</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='3'">
            <div style="display:flex">
              <div class="title_span" style="color:#F05454;flex:1">退款拒绝待买家处理</div>
              <div style="color:#F05454;text-align:right">
                <i v-if="flaga" class="fa fa-clock-o" style="color:#F05454"></i>
                &nbsp;{{endTime}}
              </div>
            </div>
            <p style="color:#F05454">拒绝原因：{{baseInfo.RefuseReason}}</p>
            <br />
            <span style="color:#666666">商家已拒绝您的退款申请，请您修改后重新提交</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='4'">
            <span class="title_span" style="color:#F05454">待买家发货</span>
            <br />
            <span style="color:#666666">商家已通过申请，等待买家发货</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='5'">
            <span class="title_span" style="color:#F05454">待卖家确认收货</span>
            <br />
            <span style="color:#666666">买家已发货，等待卖家确认收货</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='6'">
            <div style="display:flex">
              <div class="title_span" style="color:#F05454;flex:1">商家拒绝收货待买家处理</div>
              <div style="color:#F05454;text-align:right">
                <i v-if="flaga" class="fa fa-clock-o" style="color:#F05454"></i>
                &nbsp;{{endTime}}
              </div>
            </div>
            <br />
            <span style="color:#666666">商家拒绝收货，请买家尽快处理</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='7'">
            <span class="title_span" style="color:#F05454">退款成功</span>
            <br />
            <p style="color:#666666">完结时间：{{baseInfo.DateModified}}</p>
            <br />
            <span style="color:#666666">商家确认退款,退款成功</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='8'">
            <span class="title_span" style="color:#F05454">退款关闭</span>
            <br />
            <p style="color:#666666">关闭时间：{{baseInfo.DateModified}}</p>
            <br />
            <span style="color:#666666">退款申请已关闭</span>
          </div>
          <div class="sjcl_div" v-if="baseInfo.RefundStatus=='9'">
            <span class="title_span" style="color:#F05454">商家已确认收货</span>
            <br />
            <p style="color:#666666">完结时间：{{baseInfo.DateModified}}</p>
            <br />
            <span style="color:#666666">商家确认退款退货，等待退款</span>
          </div>
          <div
            class="sjcl1_div"
            v-if="(baseInfo.RefundMethodCode =='RMC001' || baseInfo.RefundMethodCode =='RMC002')&&(baseInfo.RefundStatus=='1'||baseInfo.RefundStatus=='3')&& baseInfo.RefundType=='2'"
          >
            <div style="color:#696969;margin:0 0 10px 0">如您的退款申请被拒绝，您可以修改申请再次发起，商家会重新处理</div>
            <div
              style="color:#696969;margin:0 0 20px 0"
              v-if="baseInfo.RefundStatus =='3' "
            >如您超时未提交，系统自动关闭退款订单</div>

            <div style="margin: 0 0 10px 0;">
              <button class="comfirm" @click="editApply">修改申请</button>
              &nbsp;&nbsp;&nbsp;
              <span style="color:#696969">您还可以</span>
              <el-button
                class="cxsqBtn"
                style=" padding: 8px;width: 130px;margin-left: 10px;"
                @click="rejectApply"
              >撤销申请</el-button>
            </div>
          </div>
          <div
            class="sjcl1_div"
            v-if="baseInfo.RefundMethodCode =='RMC003'&&(baseInfo.RefundStatus=='9'||baseInfo.RefundStatus=='5'||baseInfo.RefundStatus=='7'||baseInfo.RefundStatus=='8')"
          >
            <div style="color:#696969;margin:0 0 0 0">
              <div style="margin:0 0 10px 0">退货物流公司：{{baseInfo.RefundOrderLogistic.ExpName}}</div>
              <div style="margin:0 0 10px 0">退货物流单号：{{baseInfo.RefundOrderLogistic.ExpNum}}</div>
              <div v-if="baseInfo.RefundOrderLogistic.AssumeBackTransFee==2">
                退货运费：
                <span v-if="baseInfo.RefundOrderLogistic.AssumeBackTransFee==2">商家承担，</span>
                <span v-else>买家承担</span>
                <span
                  v-if="baseInfo.RefundOrderLogistic.BackTransFee"
                >{{baseInfo.RefundOrderLogistic.BackTransFee}}</span>
              </div>
            </div>
          </div>
          <div
            class="sjcl1_div"
            v-if="baseInfo.RefundMethodCode =='RMC003' &&(baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6'||baseInfo.RefundStatus=='4')&& baseInfo.RefundType=='2'"
          >
            <div style="color:#696969;margin:0 0 10px 0">如您的退款申请被拒绝，您可以修改申请再次发起，商家会重新处理</div>
            <div
              style="color:#696969;margin:0 0 20px 0"
              v-if="baseInfo.RefundStatus =='3'||baseInfo.RefundStatus=='4' "
            >如您超时未提交，系统自动关闭退款订单</div>
            <div>
              <el-form
                label-position="left"
                v-if="baseInfo.RefundStatus=='4'&&baseInfo.RefundMethodCode=='RMC003'"
                size="small"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="120px"
                class="demo-ruleForm"
              >
                <el-form-item style="width:500px;" label="退货物流公司" prop="payBackName">
                  <el-select
                    style="margin-left: -15px;"
                    v-model="ruleForm.payBackName"
                    placeholder="请选择发货物流"
                  >
                    <el-option label="中通" value="ZTO"></el-option>
                    <el-option label="韵达" value="YUNDA"></el-option>
                    <el-option label="申通" value="ST"></el-option>
                    <el-option label="圆通" value="YT"></el-option>
                    <el-option label="百世汇通" value="BSHT"></el-option>
                    <el-option label="EMS" value="EMS"></el-option>
                    <el-option label="京东快递" value="JD"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="退货物流单号" prop="paybackNum">
                  <el-input v-model="ruleForm.paybackNum" style="width:200px;margin-left: -15px;"></el-input>
                </el-form-item>
                <el-form-item label="退货运费" prop="assumeBackTransFee">
                  <el-radio-group
                    v-model="ruleForm.assumeBackTransFee"
                    style="color:#666666; margin-left: -15px;"
                  >
                    <el-radio :label="1">买家承担运费</el-radio>
                    <el-radio :label="2">
                      商家承担运费
                      <el-input
                        v-if="ruleForm.assumeBackTransFee=='2'"
                        onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                        size="mini"
                        placeholder="请输入运费金额"
                        v-model="ruleForm.backTransFee"
                        style="width:200px;margin-left: 0;"
                      ></el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button
                    style="padding: 8px 40px 8px 40px;margin-left:-120px;width: 100px;"
                    type="primary"
                    @click="submitForm('ruleForm')"
                  >提交</el-button>
                  <span style="margin-left:15px;color:#696969">您还可以</span>
                  <el-button
                    class="cxsqBtn"
                    style=" padding: 8px;width: 100px;margin-left: 10px;"
                    @click="rejectApply"
                  >撤销申请</el-button>
                </el-form-item>
              </el-form>
              <button
                v-if="baseInfo.RefundMethodCode =='RMC003' &&(baseInfo.RefundStatus=='2'||baseInfo.RefundStatus=='3'||baseInfo.RefundStatus=='6')&& baseInfo.RefundType=='2'"
                class="comfirm"
                @click="editApply"
              >修改申请</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="baseInfo.RefundStatus!='4'"
                style="color:#696969"
              >您还可以</span>
              <el-button
                v-if="baseInfo.RefundStatus!='4'"
                class="cxsqBtn"
                style=" padding: 8px;width: 130px;margin-left: 10px;"
                @click="rejectApply"
              >撤销申请</el-button>
            </div>
          </div>
          <div class="sjcl2_div" style="color:#333333">
            <span class="title_span">协商历史</span>
            <div v-for="(item,index) in xsInfoArra" :key="index">
              <span style="font-size: 16px;margin: 6px 0px 10px;" v-if="item.OperatorType==2">商家</span>
              <span
                style="font-size: 16px;margin: 6px 0px 10px;"
                v-if="item.OperatorType==1"
              >买家（{{item.NickName}}）</span>
              <br />
              <div style="display:flex">
                <div style="color:#333333;flex:1">{{item.OperationDesc}}</div>
                <div style="color:#999999;text-align:right">{{item.DateAdded}}</div>
              </div>
              <div class="line"></div>
              <ul style="line-height:26px">
                <li>
                  <div style="display:flex" v-if="item.DetailDesc !=null">
                    <div style="color:#333333;flex:1">买家（{{item.NickName}}）{{item.OperationDesc}}</div>
                    <div style="color:#999999;text-align:right">{{item.DateAdded}}</div>
                  </div>
                </li>
                <li v-if="item.DetailDesc !=null">
                  <span style="color:#666666">退款金额：¥</span>
                  {{parseFloat(item.DetailDesc.RefundGoodsTotalPrice).toFixed(2)}}
                </li>
                <li v-if="item.DetailDesc !=null">
                  <span style="color:#666666">申请件数：</span>
                  {{count}}&nbsp;件
                </li>
                <li
                  style="line-height: 20px;"
                  v-if="item.DetailDesc !=null&&item.DetailDesc.refundExplain!=''"
                >
                  <span style="color:#666666;">说明：</span>
                  <span style="display: inline">{{item.DetailDesc.refundExplain}}</span>
                </li>
                <li v-if="item.DetailDesc !=null">
                  <span style="color:#666666">原因：</span>
                  {{item.DetailDesc.RefundReasonDesc}}
                </li>
                <li v-if="item.DetailDesc !=null">
                  <span style="color:#666666">要求：</span>
                  {{item.DetailDesc.RefundMethodDesc}}
                </li>
                <li
                  v-if="item.DetailDesc !=null
                &&item.DetailDesc.RefundOrderDetails[0].BatchNumberOrExpiryDateImage==''
                &&item.DetailDesc.RefundOrderDetails[0].CartonImage==''
                &&item.DetailDesc.RefundOrderDetails[0].ExpressDeliverySheetImage==''
                &&item.DetailDesc.RefundOrderDetails[0].UnpackingImage==''
                &&item.DetailDesc.RefundOrderDetails[0].ExpressboxImage==''
                &&item.DetailDesc.RefundOrderDetails[0].DamagedImage==''
                &&item.DetailDesc.RefundOrderDetails[0].MerchandiseFrontImage==''
                "
                ></li>
              </ul>
              <div v-if="item.DetailDesc!=null" style="color:#333333;margin:8px 0 0 0 ">
                <span
                  style="color:#666666"
                  v-if="!(item.DetailDesc !=null
                &&item.DetailDesc.RefundOrderDetails[0].BatchNumberOrExpiryDateImage==''
                &&item.DetailDesc.RefundOrderDetails[0].CartonImage==''
                &&item.DetailDesc.RefundOrderDetails[0].ExpressDeliverySheetImage==''
                &&item.DetailDesc.RefundOrderDetails[0].UnpackingImage==''
                &&item.DetailDesc.RefundOrderDetails[0].ExpressboxImage==''
                &&item.DetailDesc.RefundOrderDetails[0].DamagedImage==''
                &&item.DetailDesc.RefundOrderDetails[0].MerchandiseFrontImage=='')
                "
                >凭证：</span>
              </div>
              <div
                style="display:flex;flex-wrap: wrap;justify-content: space-between;"
                v-if="item.DetailDesc!=null"
              >
                <div
                  class="div_boder"
                  v-if="item.DetailDesc.RefundOrderDetails[0].BatchNumberOrExpiryDateImage"
                >
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].BatchNumberOrExpiryDateImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">批次号和效期处</div>
                </div>

                <div class="div_boder" v-if="item.DetailDesc.RefundOrderDetails[0].CartonImage">
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].CartonImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">气泡柱照片</div>
                </div>

                <div
                  class="div_boder"
                  v-if="item.DetailDesc.RefundOrderDetails[0].ExpressDeliverySheetImage"
                >
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].ExpressDeliverySheetImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">产品与快递面单</div>
                </div>

                <div class="div_boder" v-if="item.DetailDesc.RefundOrderDetails[0].UnpackingImage">
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].UnpackingImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">开箱照片</div>
                </div>

                <div class="div_boder" v-if="item.DetailDesc.RefundOrderDetails[0].ExpressboxImage">
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].ExpressboxImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">快递外箱照片</div>
                </div>

                <div class="div_boder" v-if="item.DetailDesc.RefundOrderDetails[0].DamagedImage">
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].DamagedImage"
                    alt="环球云仓"
                  />
                  <div
                    class="desc_div"
                    v-if="item.DetailDesc.RefundReasonCode=='RRC003'||item.DetailDesc.RefundReasonCode=='RRC010'"
                  >瑕疵处照片</div>
                  <div class="desc_div" v-else>破损处照片</div>
                </div>

                <div
                  class="div_boder"
                  v-if="item.DetailDesc.RefundOrderDetails[0].MerchandiseFrontImage"
                >
                  <img
                    class="desc_div_img"
                    v-lazy="imgBaseUrl+item.DetailDesc.RefundOrderDetails[0].MerchandiseFrontImage"
                    alt="环球云仓"
                  />
                  <div class="desc_div">商品正面照片</div>
                </div>
                <div class="div_boder" v-if="imagFlagTwo">
                  <img class="desc_div_img" src="~/assets/img/payback/000.png" alt="环球云仓" />
                  <div class="desc_div"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="line-c"></div>
        <div class="right_div">
          <ul style="line-height:30px">
            <li style="font-size:16px;color:#333333">订单信息</li>
            <li style="cursor:pointer" @click="jumpDesc(goodsBaseInfo.OrderCode)">
              <span style="color:#666666">订单号：</span>
              <span style="color:#F05454;cursor:pointer">{{goodsBaseInfo.OrderCode}}</span>
            </li>
            <li>
              <span style="color:#666666">商品：</span>
              {{goodsBaseInfo.ProName}}
            </li>
            <li>
              <span style="color:#666666">商品数量：</span>
              {{goodsBaseInfo.ProCount}}&nbsp;件
            </li>
            <li>
              <span style="color:#666666">运费：¥</span>
              {{parseFloat(goodsBaseInfo.TransFee).toFixed(2)}}
            </li>
            <li>
              <span style="color:#666666">综合税金：¥</span>
              {{parseFloat(goodsBaseInfo.TaxAmount).toFixed(2)}}
            </li>
            <li>
              <span style="color:#666666">支付金额：¥</span>
              {{parseFloat(goodsBaseInfo.PayPrice).toFixed(2)}}
            </li>
            <li>
              <el-button class="contac_btn" @click="contactServe">
                <img class="contact_img" src="~assets/img/contact.png" alt="联系" />
                <span>联系卖家</span>
              </el-button>
            </li>
          </ul>
          <div class="line1"></div>
          <ul style="line-height:30px" v-if="baseInfo.RefundOrderDetails">
            <li>
              <span style="color:#666666">退款编号：</span>
              {{baseInfo.RefundOrderCode}}
            </li>
            <li>
              <span style="color:#666666">退款金额：¥</span>
              {{baseInfo.RefundOrderAmount}}
            </li>
            <li>
              <span style="color:#666666">申请件数：</span>
              {{baseInfo.RefundOrderDetails[0].RefundCount}}&nbsp;件
            </li>
            <li style="line-height: 20px;" v-if="baseInfo.RefundExplain!=''">
              <span style="color:#666666;">说明：</span>
              <span style="display: inline;">{{baseInfo.RefundExplain}}</span>
            </li>
            <li v-if="baseInfo.RefundReasonDesc!=''" style="margin-top: 3px;">
              <span style="color:#666666">原因：</span>
              {{baseInfo.RefundReasonDesc}}
            </li>
            <li v-else style="margin-top: 20px;">
              <span style="color:#666666">原因：</span>
              {{baseInfo.RefundReasonDesc}}
            </li>
            <li>
              <span style="color:#666666">要求：</span>
              {{baseInfo.RefundMethodDesc}}
            </li>
            <li
              v-if="  
                baseInfo.RefundOrderDetails !=null
                &&baseInfo.RefundOrderDetails[0].BatchNumberOrExpiryDateImage==''
                &&baseInfo.RefundOrderDetails[0].CartonImage==''
                &&baseInfo.RefundOrderDetails[0].ExpressDeliverySheetImage==''
                &&baseInfo.RefundOrderDetails[0].UnpackingImage==''
                &&baseInfo.RefundOrderDetails[0].ExpressboxImage==''
                &&baseInfo.RefundOrderDetails[0].DamagedImage==''
                &&baseInfo.RefundOrderDetails[0].MerchandiseFrontImage==''"
            ></li>
            <li v-else>
              <span style="color:#666666">凭证：</span>
            </li>
          </ul>
          <div style="display:flex;flex-wrap: wrap;" v-if="baseInfo.RefundOrderDetails">
            <div
              class="div_boder1"
              v-if="baseInfo.RefundOrderDetails[0].BatchNumberOrExpiryDateImage"
            >
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].BatchNumberOrExpiryDateImage"
                alt="环球云仓"
              />
              <div class="desc_div">批次号和效期处</div>
            </div>
            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].CartonImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].CartonImage"
                alt="环球云仓"
              />
              <div class="desc_div">气泡柱照片</div>
            </div>
            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].UnpackingImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].UnpackingImage"
                alt="环球云仓"
              />
              <div class="desc_div">开箱照片</div>
            </div>

            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].ExpressDeliverySheetImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].ExpressDeliverySheetImage"
                alt="环球云仓"
              />
              <div class="desc_div">产品与快递面单</div>
            </div>
            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].ExpressboxImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].ExpressboxImage"
                alt="环球云仓"
              />
              <div class="desc_div">快递外箱照片</div>
            </div>
            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].DamagedImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].DamagedImage"
                alt="环球云仓"
              />
              <div class="desc_div">破损处照片</div>
            </div>
            <div class="div_boder1" v-if="baseInfo.RefundOrderDetails[0].MerchandiseFrontImage">
              <img
                class="desc1_div_img"
                v-lazy="imgBaseUrl+baseInfo.RefundOrderDetails[0].MerchandiseFrontImage"
                alt="环球云仓"
              />
              <div class="desc_div">商品正面照片</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ali_oss_data } from "~/_config/config.js";
let OSS = require("ali-oss");
import { API } from "~/_config/API.js";
import Bus from "~/components/common/bus.js";
import { isNumberAndLetter } from "~/tools/validate.js";
import { _CONFIG } from "~/_config/config.js";
import "~/assets/css/order.css";
export default {
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!isNumberAndLetter(value)) {
        callback(new Error("只能包含数字和字母"));
      } else {
        callback();
      }
    };
    return {
      imagFlagTwo: false,
      templateTime: true,
      count: 0,
      timeInterval: null,
      flaga: true,
      backGroudUrl: "~/assets/img/payback/step2.png",
      imgBaseUrl: ali_oss_data.URL_IMG_SHOW,
      showStep2: true,
      showStep3: false,
      baseInfo: "",
      SN: "",
      endTime: "",
      ruleForm: {
        payBackName: "",
        assumeBackTransFee: 1,
        backTransFee: undefined,
        paybackNum: ""
      },
      rules: {
        assumeBackTransFee: [
          { required: true, message: "请选择退货运费类型", trigger: "blur" }
        ],
        payBackName: [
          { required: true, message: "请选择发货物流", trigger: "blur" }
        ],
        paybackNum: [
          { required: true, message: "请填写单号", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      },
      baseInfoDetial: "",
      OrderCode: "",
      xsInfoArra: [],
      ProId: "",
      hms: null,
      goodsBaseInfo: ""
    };
  },
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    jumpDesc(code) {
      this.$router.push("/dashboard/order?id=" + code);
    },
    submitForm(formName) {
      if (this.ruleForm.assumeBackTransFee == 2) {
        if (this.ruleForm.backTransFee) {
          if (
            this.ruleForm.backTransFee >= 0.01 &&
            this.ruleForm.backTransFee <= 999.99
          ) {
            this.$refs[formName].validate(valid => {
              if (valid) {
                let para = {
                  ThridExpressCode: this.ruleForm.payBackName,
                  ExpNum: this.ruleForm.paybackNum,
                  backTransFee: this.ruleForm.backTransFee,
                  assumeBackTransFee: this.ruleForm.assumeBackTransFee,
                  RefundOrderCode: this.$route.query.RefundOrderCode,
                  Token: localStorage.getItem("user")
                    ? JSON.parse(localStorage.getItem("user")).token
                    : null
                };
                API.submitLogistics(para).then(res => {
                  if (res.ResponseId != 0) {
                    self.isLoginOut(res);
                  } else {
                    this.$message({
                      message: "提交成功",
                      type: "success",
                      duration: 1000,
                      onClose: () => {
                        location.reload();
                      }
                    });
                  }
                });
              } else {
                this.$message({
                  message: "提交失败",
                  type: "error",
                  duration: 1000
                });
                return false;
              }
            });
          } else {
            this.$message.error("运费金额必须介于0.01-999.99之间");
          }
        } else {
          this.$message.error("请填写运费金额");
        }
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let para = {
              ThridExpressCode: this.ruleForm.payBackName,
              backTransFee: this.ruleForm.backTransFee,
              assumeBackTransFee: this.ruleForm.assumeBackTransFee,
              ExpNum: this.ruleForm.paybackNum,
              RefundOrderCode: this.$route.query.RefundOrderCode,
              Token: localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).token
                : null
            };
            API.submitLogistics(para).then(res => {
              if (res.ResponseId != 0) {
                self.isLoginOut(res);
              } else {
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                  onClose: () => {
                    location.reload();
                  }
                });
              }
            });
          } else {
            this.$message({
              message: "提交失败",
              type: "error",
              duration: 1000
            });
            return false;
          }
        });
      }
    },
    editApply() {
      this.$router.push({
        path: "/dashboard/afterSaleShbcEdit",
        query: {
          RefundOrderCode: this.$route.query.RefundOrderCode,
          SN: this.SN,
          OrderCode: this.OrderCode
        }
      });
    },
    //撤销申请
    rejectApply() {
      this.$confirm("确认撤销当前申请？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        confirmButtonClass: "el-button--danger",
        center: true
      })
        .then(() => {
          let para = {
            RefundOrderCode: this.$route.query.RefundOrderCode,
            Token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          };
          API.rejectPayBackApply(para).then(res => {
            if (res.ResponseId != 0) {
              self.isLoginOut(res);
            } else {
              this.$message({
                message: "撤销成功",
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.$router.push({
                    path: "/dashboard/orderCenter"
                  });
                }
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    getEndTime(time) {
      var now = new Date(time);
      now.setMinutes(now.getMinutes() - new Date().getTimezoneOffset());
      let sTime = new Date(now).getTime();
      let eTime = sTime - new Date().getTime();
      this.hms = eTime;
      if (eTime < 1000) {
        clearInterval(this.timeInterval);
        this.flaga = false;
        return "退款已超时";
      }
      let day = parseInt(eTime / 1000 / 60 / 60 / 24);
      day = day > 0 ? day + "天" : "";
      return (
        day +
        (parseInt(eTime / 1000 / 60 / 60) % 24) +
        "小时" +
        Math.floor((eTime / 1000 / 60) % 60) +
        "分" +
        Math.floor((eTime / 1000) % 60) +
        "秒"
      );
    },
    //请求接口后判断用户是否登陆过期
    isLoginOut(res) {
      this.$message.error(res.Message);
      if (res.ResponseId == -1) {
        this.$store.commit("LOGOUT");
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
      }
    },
    //跳转到客服
    contactServe() {
      let u = "https://chat.xiankefu.com/?bid=8c827410baf6caf4c810e9b9bce25f9a";
      window.open(u);
    },
    // 获取数据
    getData() {
      let self = this;
      let para = {
        RefundOrderCode: this.$route.query.RefundOrderCode,
        Token: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).token
          : null
      };
      //获取协商历史
      API.getXsDetail(para).then(res => {
        if (res.ResponseId != 0) {
          self.isLoginOut(res);
        } else {
          let coutImageTwo = 0;

          self.xsInfoArra = res.Data;
          self.xsInfoArra.forEach(element => {
            if (element.DetailDesc) {
              element.DetailDesc.RefundOrderDetails[0].RefundSKUs.forEach(
                (item, index) => {
                  this.count = Number(item.RefundCount) + this.count;
                }
              );
            }
          });
          const aLenth = self.xsInfoArra.length;
          if (self.xsInfoArra[aLenth - 1].DetailDesc != null) {
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .BatchNumberOrExpiryDateImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .CartonImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .DamagedImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .ExpressDeliverySheetImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .ExpressboxImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .MerchandiseFrontImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (
              self.xsInfoArra[aLenth - 1].DetailDesc.RefundOrderDetails[0]
                .UnpackingImage == ""
            ) {
              coutImageTwo = coutImageTwo + 1;
            }
            if (7 - coutImageTwo == 2) {
              this.imagFlagTwo = true;
            }
          }
        }
      });
      API.getPayBackDetail(para).then(res => {
        if (res.ResponseId != 0) {
          self.isLoginOut(res);
        } else {
          self.baseInfo = res.Data;
          this.OrderCode = self.baseInfo.OrderCode;
          this.ProId = self.baseInfo.RefundOrderDetails[0].ProId;
          self.baseInfoDetial = res.Data.RefundOrderDetails[0];
          self.SN = res.Data.RefundOrderDetails[0].SN;
          let state = self.baseInfo.RefundStatus;
          if (state == "8" || state == "7") {
            self.showStep3 = true;
            self.showStep2 = false;
          } else if (state == "1" || state == "2" || state == "3") {
            self.showStep3 = false;
            self.showStep2 = true;
          }
          this.$nextTick(() => {
            clearInterval(window.timeInterval);
            window.timeInterval = setInterval(() => {
              this.endTime = this.getEndTime(this.baseInfo.RefuseDate);
            }, 1000);
          });
          //查询商品详情
          API.getPayBackList({
            SN: self.baseInfo.RefundOrderDetails[0].SN,
            ordercode: self.baseInfo.OrderCode,
            token: localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).token
              : null
          }).then(res => {
            if (res.ResponseId != 0) {
              this.isLoginOut(res);
            } else {
              this.goodsBaseInfo = res.Data;
              this.sum = this.goodsBaseInfo.ProCount;
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.sjcl_div {
  margin: 12px 0 0 0;
  border-style: solid;
  border-width: 0 0 0.5px 0;
  border-color: #eee;
  padding: 0 0 24px 0;
}
.sjcl1_div {
  margin: 20px 0 20px 0;
  border-style: solid;
  border-width: 0 0 0.5px 0;
  border-color: #eee;
  padding: 0 0 24px 0;
}
.sjcl2_div {
  margin: 30px 0 0 0;
  padding: 0 0 24px 0;
}
.title_span {
  font-size: 18px;
  margin: 0 0 10px 0;
}
li {
  color: #333333;
}

p {
  color: #333333;
  line-height: 30px;
}
.left_div {
  padding: 0 20px 0 0;
  width: 75%;
}

.oder_info {
  text-align: center;
  padding: 0 0 14px 0;
}
.order-title {
  font-size: 16px;
  font-weight: 600 !important;
}
.order {
  width: 100%;
  border-collapse: collapse;
  margin-top: 50px;
  box-sizing: content-box !important;
}
.bg {
  width: 100%;
  height: 15px;
  background: #f6f6f6;
  position: absolute;
  left: 0;
}
.right_div {
  padding: 0 0 0 20px;
  width: 30%;
}
.contac_btn {
  margin: 20px 0 0 0;
  font-size: 12px;
  background-color: #eee;
  width: auto;
  height: auto;
}
.line {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  margin: 13px 0 15px 0;
}
.line1 {
  border-style: solid;
  border-width: 0.5px;
  border-color: #eee;
  margin: 30px 0 15px 0;
}
.contact_img {
  margin: 0 auto;
  vertical-align: middle;
  height: 20px;
}
.cxsqBtn {
  background-color: #f5f5f5;
  color: #696969;
}
.desc_div_img {
  border-radius: 5px;
  width: 200px;
  height: 200px;
}
.desc1_div_img {
  border-radius: 5px;
  width: 100px;
  height: 100px;
}
.div_boder {
  margin: 20px 0 0 0;
}
.div_boder1 {
  margin: 20px 20px 0 0;
}
.desc_div {
  margin: 5px 0 0 0;
  text-align: center;
  color: #333333;
}
.comfirm {
  padding: 9px;
  text-align: center;
  width: 130px;
  cursor: pointer;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  background-color: #f56c6c;
  color: white;
}
.line-c {
  margin: -35px 0 -25px 0;
  border-style: solid;
  border-color: #f2f2f2;
  border-width: 0 1px 0 0;
}
.comfirm:hover {
  background-color: #f78989;
}
</style>
<style lang="scss" >
.mjcl_root {
  .el-button {
    padding: 4px 13px;
  }
  .el-button:focus,
  .el-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff !important;
  }
}
</style>