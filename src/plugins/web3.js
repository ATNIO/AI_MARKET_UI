import Web3 from "web3";

export default Vue => {
  // let web3 = window.web3;

  // if (typeof web3 !== "undefined") {
  //   web3 = new Web3(web3.currentProvider);
  // } else {
  //   // set the provider you want from Web3.providers
  //   web3 = new Web3(
  //     new Web3.providers.HttpProvider("http://118.31.18.101:4045")
  //   );
  // }

  Vue.prototype.$web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
};
