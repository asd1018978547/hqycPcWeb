import {
  request
} from './request';
import {
  _CONFIG
} from './config'
const API = {
  //申请退款链接相关
  afterSaleValidate(para) {
    return request('i/want/401046', para);
  },
  //申请退款链接相关---订单-用户匹配
  afterSaleValidateCust(para) {
    return request('i/want/401047', para);
  },
  //退款售后-售中发起退款
  szPayBack(para) {
    return request('i/want/401043', para);
  },
  //退款售后-编辑退款申请
  editPayBack(para) {
    return request('i/want/401039', para);
  },
  //退款售后-退款金额计算
  sumBackMoney(para) {
    return request('i/want/401042', para);
  },
  //退款售后-发起退款
  submitPayBack(para) {
    return request('i/want/401038', para);
  },
  //退款售后-撤销申请
  rejectPayBackApply(req) {
    return request('i/want/401037', req);
  },
  //退款售后-查询协商历史
  getXsDetail(req) {
    return request('i/want/401041', req);
  },
  //退款售后-查询退款详情
  getPayBackDetail(req) {
    return request('i/want/401040', req);
  },
  //退款售后-物流填写
  submitLogistics(req) {
    return request('i/want/401044', req);
  },
  //退款售后-退款类型及原因
  getPayBackType(req) {
    return request('i/want/401035', req);
  },
  //退款售后-订单详情
  getPayBackList(req) {
    return request('i/want/401034', req);
  },
  getPayList(req) {
    return request('/i/want/100020', req);
  },
  //申请售后详情列表
  getSHSQList(req) {
    return request('i/want/401034', req);
  },
  getactivities(req) {
    return request('/i/want/300283', req);
  },
  calcOrderCityPrice(req) {
    return request('/i/want/401028', req);
  },
  getAddressData(req) {
    return request('/i/want/401025', req);
  },
  indexData(req) {
    return request('/i/want/400074', req);
  },
  indexGetTopNews(para) {
    return request('/i/want/401019', para);
  },
  newsZan(para) {
    return request('/i/want/401023', para);
  },
  getNewsTag(para) {
    return request('/i/want/300169', para);
  },
  getNewsList(para) {
    return request('/i/want/401019', para);
  },
  getHotNews(para) {
    return request('/i/want/401022', para);
  },
  getNewsInfo(para) {
    return request('/i/want/401020', para);
  },
  getMsgCode(para) {
    return request('/i/want/100009', para);
  },
  calcPrice(para) {
    return request('/i/want/401017', para);
  },
  checkCount(para) {
    return request('/i/want/400119', para);
  },
  calcSkuPrice(para) {
    return request('/i/want/401018', para);
  },
  getBindCode(para) {
    return request('/i/want/100010', para);
  },
  wxBind(para) {
    return request('/i/want/401016', para);
  },
  msgLogin(para) {
    return request('/i/want/401014', para);
  },
  batchPay(req) {
    return request('payCenter/moPay/mopay_retailer_batch.aspx', req);
  },
  getCase(req) { //获取分类
    return request('/i/want/400091', req);
  },
  getIDcardAuth(para) {
    return request('/i/want/200008', para);
  },
  brandList(req) { //
    return request('/i/want/400075', req);
  },
  limitGoods(req) { //
    return request('/i/want/400117', req)
  },
  goodsList(req) { //
    return request('/i/want/400081', req);
  },
  searchGoods(req) { //
    return request('/i/want/400070', req);
  },
  goodsDetail(req) { //
    return request('/i/want/400076', req);
  },
  goodsDetailContent(req) { //
    return request('/i/want/400077', req);
  },
  goodsDetailSpecifi(req) { //
    return request('/i/want/400078', req)
  },
  joinCar(req) { //
    return request('/i/want/400067', req);
  },
  cartList(req) { //
    return request('/i/want/400065', req);
  },
  getCartList(req) {
    return request('/i/want/401024', req);
  },
  deleteCart(req) { //
    return request('/i/want/400066', req);
  },
  editCart(req) { //
    return request('/i/want/400073', req)
  },
  testPhone(req) { //
    return request('/i/want/400090', req);
  },
  register(req) { //
    return request('/i/want/400004', req);
  },
  getCode(req) { //
    return request('/i/want/100004', req)
  },
  //
  login(req) {
    return request('/i/want/400001', req);
  },
  //
  getVerifyImg(req) {
    return request('/i/want/100005', req);
  },
  //
  getOrderLIst(req) {
    return request('/i/want/400082', req)
  },
  //
  cancelOrder(req) {
    return request('/i/want/400084', req)
  },
  //
  getOrderInfo(req) {
    return request('/i/want/400083', req)
  },
  //
  createOrder(req) {
    return request('/i/want/400068 ', req)
  },
  //
  subOrder(req) {
    return request('/i/want/400085', req)
  },
  //
  getCustomer(req) {
    return request('/i/want/400086', req);
  },
  //
  addCustomer(req) {
    return request('/i/want/400072', req);
  },
  //
  batchCreateOrder(para) {
    return request('/i/want/401011', para);
  },
  //
  batchSubOrder(para) {
    return request('/i/want/401012', para);
  },
  //
  ruthUserOrderCount(para) {
    return request('/i/want/401013', para);
  },
  //
  editCustomer(req) {
    return request('/i/want/400079', req);
  },
  //
  deletCustomer(req) {
    return request('/i/want/400080', req);
  },
  changePwd(req) { //
    return request('/i/want/400007', req);
  },
  forgetPwd(req) { //
    return request('/i/want/400008', req);
  },
  notPayInfo(req) { //
    return request('/i/want/400088', req);
  },
  checkPaySuccess(req) { //
    return request('/i/want/400115', req);
  },
  wePay(req) { //
    return request('/i/want/400087', req)
  },
  tlPay(data) { //
    return request('/i/want/400106', data);
  },
  orderCount(req) {
    return request('/i/want/400089', req)
  },
  mobaoPay(orderCode, token) {
    let u = '/payCenter/moPay/mopay_signleretailer.aspx';
    let url = _CONFIG.url + u + '?partnerId=20000&token=' + token + '&orderCode=' + orderCode;
    window.open(url, '_blank');
  },
  subAuth(req) { //
    return request('/i/want/400104', req)
  },
  authResult(req) { //
    return request('/i/want/400105', req)
  },
  updateAuth(req) { //
    return request('/i/want/400101', req)
  },
  getUserInfo(req) { //
    return request('/i/want/400009', req)
  },
  bankPay(req) { //
    let u = 'payCenter/tonglianPay/tlUnionPay.aspx';
    let url = _CONFIG.url + u + '?partnerId=' + _CONFIG.partnerId + '&token=' + req.ext1 + '&orderNo=' + req.orderNo;
    window.open(url, '_blank');
  },
  uploadExcle(data) { //
    return request('/i/want/400109', data);
  },
  exportOrder(data) { //
    return request('/i/want/400113', data);
  },
  exportSku(data) {
    return request('/i/want/400112', data);
  },
  refund(data) { //
    return request('/i/want/400116', data);
  },
  getCustomerManager(data) { //
    return request('/i/want/401005', data);
  },
  serverPhone() {
    return request('i/want/200007')
  },
  checkInventory(req) { //
    return request('i/want/401008', req)
  },
  getzuijijia(req) { //
    return request('i/want/401033', req)
  }
}
export {
  API
}
