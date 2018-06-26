import Web3 from "web3";

export default Vue => {
  Vue.prototype.$web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
};
