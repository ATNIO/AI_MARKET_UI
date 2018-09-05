import Vue from "vue";
import Router from "vue-router";
import { Base64 } from "js-base64";
import Atn from "atn-js";
const Home = () => import("./views/Home.vue");
const Detail = () => import("./views/Detail.vue");
const MyAccount = () => import("./views/MyAccount.vue");
const ChannelList = () => import("./views/ChannelList.vue");
const AccountProfile = () => import("./views/AccountProfile.vue");

Vue.use(Router);

var atn = new Atn(window.atn3);

//
// const receiverAddress = "0x8c0307c37b21984bdd5dced886d4aeeaeb877c14";
// const blockNumber = 5251;
// const balance = 70;
// const from = "0x6C7986A0c46815495e592b1afcA62B157027ee65";
// var result = atn.getBanlanceSign(receiverAddress, blockNumber, balance, from);
// result.then(resolve => {
//     console.log(resolve);
// });

// console.log('rerererere',re)

// const domain = 'localhost:5000'

// const uri = '/lexer'
// const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
// const dbotAddress = '0x659d25c64e0e7e940afe448f804383f35a397366'
// const response = axios.get(`http://${domain}/api/v1/dbots/${dbotAddress}/channels/${from}`)
// console.log('response----------------', response.then(console.log))

// Test CallApi Start  Baidu

// const gbkBytes = iconv.encode(JSON.stringify({'text': '百度是一家高科技公司'}), 'gbk')
// const option = {
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     responseEncoding: 'GBK',
//     method: 'post',
//     data: gbkBytes
// };
//
// const dbotAddress = '0xb53b139dd9750760077744788042fd13d292df9e';
// const uri = '/lexer';
//
// const from = '0x6c7986a0c46815495e592b1afca62b157027ee65';
// const method = 'post';
// console.log('option option option ', option);
// const result = atn.callAPI(dbotAddress, method, uri, option, from).then(function (response) {
//     console.log('Test result ----------------------', response.data)
// }).catch(function (error) {
//     console.log(error)
// })
//
// console.log('callAPI result',result)

// Test CallApi Start  Face Detect

// const data = {
//   image_url:
//     "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic1.jpg",
//   return_landmark: 1,
//   return_attributes: "gender,age"
// };
//
// const option = {
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     "Access-Control-Allow-Origin": "*"
//   },
//   method: "post",
//   params: data
// };
// //
// const dbotAddressFacee = "0xA15b60c85555CEdaeDf968590b00A227f6dD56E6";
// const uri = "/facepp/detect";
//
// const fromFacee = "0x6c7986a0c46815495e592b1afca62b157027ee65";
// const method = "post";
// console.log("option option option ", option);
// const result = atn.callAPI(dbotAddressFacee, method, uri, option, fromFacee);
// result.then(console.log);

// Test CallApi End

// const dbotAddressFacee = '0xe88cfabd1cc41ba02b10e894b2a50624decd03bc';
// const accountAddress = '0x6C7986A0c46815495e592b1afcA62B157027ee65';
// const result = atn.getChannelDetail(dbotAddressFacee,accountAddress)
// console.log('getChannelDetail',result.then(console.log))

// Test CallApi Start Xunfei

// const f1 =''
// const f2 =''
// const data = {
//     'first_image': f1 ,
//     'second_image': f2,
// }
//
// const jsonFile =JSON.stringify({
//     'auto_rotate': true
// })
//
// const currentTime =new Date().getTime();
// const base64Param = Base64.encode(jsonFile)
//
// const option = {
//     headers: {
//         'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
//         "X-CurTime": currentTime ,
//         "X-Param": Param_b64str,
//     },
//     method: 'post',
//     params: data
// };
// //
// const dbotAddressFacee = '0xf87faa582e6ba7e8e5d348f14247fa5590bc860e';
// const uri = '/facepp/detect';
//
// const fromFacee = '0x6c7986a0c46815495e592b1afca62b157027ee65';
// const method = 'post';
// console.log('option option option ', option);
// const result = atn.callAPI(dbotAddressFacee, method, uri, option, fromFacee).then(function (response) {
//     console.log('Test result ----------------------', response)
// }).catch(function (error) {
//     console.log(error)
// })

// Test CallApi End

//Test CreateChannel Start
// const creatChannelDbotAddress = '0xa15b60c85555cedaedf968590b00a227f6dd56e6'
// const deposit = '555000000000000000'
// const from = '0x6c7986a0c46815495e592b1afca62b157027ee65'
// const result = atn.createChannel(creatChannelDbotAddress, deposit,from,console.log)
//     .on('transactionHash', function(hash){
//     console.log(hash);
// });

// result.then(console.log)
// Test CreateChannel End
//
//

//
// Test topUpChannel Start
// const creatChannelDbotAddress = '0x254046D709e89bEEcCe17EFFe136f3F34A324BE1'
// const value ='55000000000000000'
// const from = '0x6C7986A0c46815495e592b1afcA62B157027ee65'
// const result = atn.topUpChannel(creatChannelDbotAddress,value,from,console.log)
// console.log('result result result', result.then(console.log))

//Test topUpChannel End

// Test closeChannel Start
// const closeChannelDbotAddress = '0x2419B8812569DBD563fA66FBEBBb9F3aDC41F3bb'
// const from = '0x6c7986a0c46815495e592b1afca62b157027ee65'
// //
// const ChannelDetail =atn.getChannelDetail(closeChannelDbotAddress,from)
// const balance = '0'
// console.log('ChannelDetail ChannelDetail ',ChannelDetail.then(console.log))
// const result = atn.closeChannel(closeChannelDbotAddress,balance,from,console.log)
// console.log('result result result', result.then(console.log))

//Test closeChannel End

// const result =atn.getChannelDetail('0x8ad1c2e20ee00baeac2c8c496d0039a36932aea8','0x254046D709e89bEEcCe17EFFe136f3F34A324BE1')
// console.log('---------getChannelDeposit',result.then(console.log))

// // console.log("result console:", result)
//
// var balanceSignature = atn.getBanlanceSign('0x659d25c64e0e7e940afe448f804383f35a397366',4421,6000000000000000,'0x6c7986a0c46815495e592b1afca62b157027ee65')
// console.log('balanceSignature balanceSignature balanceSignature',balanceSignature)
// console.log()
//
// result.then(function (data) {
//     console.log('bbbbbb', data)
// })

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/detail/:address",
      name: "detail",
      component: Detail
    },
    {
      path: "/my-account",
      name: " my-account",
      component: MyAccount,
      children: [
        {
          path: "ChannelList",
          name: "ChannelList",
          component: ChannelList
        },
        {
          path: "AccountProfile",
          name: "AccountProfile",
          component: AccountProfile
        }
      ]
    }
  ]
});
