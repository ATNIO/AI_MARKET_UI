<template>
  <section>
    <div id="container">
      <div class="left">
        <div class="leftImg"><img src="../assets/home/icon-64.png" alt=""></div>
        <ul class="leftMenu">
          <li><img src="../assets/home/markets.png" alt=""> Markets</li>
          <li><img src="../assets/home/account.png" alt="">  account</li>
          <li><img src="../assets/home/login.png" alt="">  login</li>
        </ul>
      </div>
      <div class="right">
        <div class="rightTop">
          <div class="rightBalance">ATN{{msg}}</div>
          <div class="rightSearch">Search</div>
          <div class="rightTips">Tips</div>
        </div>
      
      </div>
    </div>
  </section>
</template>
<style lang="less" scoped>
#container {
  height: 100vh;
  // background:url('../assets/4021531881055_.jpg') no-repeat left top / cover;
}
.left {
  width: 20em;
  height: 100vh;
  position: absolute;
  // background-color: green;
  opacity: 0.55;
  filter: alpha(opacity=55);
}
.leftImg {
  width: 20em;
  height: 20em;
}
.leftImg img {
  padding-left: 6em;
  padding-top: 5em;
}
.leftMenu li {
  text-align: center;
  font-size: 1.5rem;
  list-style: none;
  padding-bottom: 4em;
}
.rightTop {
  height: 11em;
  background-color: #f7f6fe;
  // opacity:0.55;
  // filter:alpha(opacity=55);
  position: absolute;
  left: 20em;
  display: flex;
}
.rightBalance {
  float: left;
}
.rightTips {
  float: right;
}
</style>
