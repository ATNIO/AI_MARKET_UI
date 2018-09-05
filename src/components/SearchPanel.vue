<template>
    <div>
        <!-- 组件不能写到template的根节点上，即每个组件只有一个根节点，这里的div就是这个template的根节点 -->
        <!--  getindex是自定义事件 -->
        <!--<logo-select  @getindex='getIndex'></logo-select>>-->
        <div class="search-input">
            <!-- $event是实参，表示event对象 -->
            <!--
                输入搜索内容即时搜索，所以有一个keyup事件。
                按回车键有一个进入搜索内容页面，所以有一个keydown.enter事件
                按上下键可以选择列表条目
            -->
            <input type="text" v-model="keyword" @keyup="get($event)" @keydown.enter="search()" @keydown.down="selectDown()" @keydown.up.prevent="selectUp()" class="search">
            <!-- 这是一个小叉叉，点击它可清除输入框内容 -->
            <span class="search-reset" @click="clearInput()">&times;</span>
            <div class="search-select">
                <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
                <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
                    <li v-for="(value,index) in myData" :class="{selectback:index==now}" class="search-select-option search-select-list" @mouseover="selectHover(index)" @click="selectClick(index)" :key="value">
                        <div class="value-style">
                            <div class="icon-style"></div>
                            <div class="value-param-style">
                                <span > {{value.dbot_addr}}</span>
                                <span > {{value.tags}}</span>
                                <span class="text-style"> 通报显示，截至目前，广州市交通部门联合相关部门先后41次对滴滴、易到、神州、AA租车、曹操等网约车平台进行调查，对平台向无证车辆、无证司机违规派单等违章行为共立案查处240宗，其中立案查处滴滴平台违章208宗。
另外，目前滴滴平台已有29宗违章案件将到强制执行期。通报显示，若滴滴平台仍拒不执行处罚决定，待法定期限届满后，广州市交通部门将依法申请法院强制执行。“对于网约车平台这种不配合调查的行为，将以‘不配合出租汽车行政主管部门调取查阅相关数据信息’为由立案查处。”在广州市交通委方面看来，认可网约车服务市民出行选择的同时，也应以依法依规经营，严守安全底线，落实承运人安全管理主体责任为经营、发展的前提。“互联网不是法外之地，共享经济也不是违规经营的灰色地带。”广州市交通部门一再重申，对于网约车市场存在的违规行为，将继续保持高压整治</span>
                            </div>

                        </div>
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
// import xxx from someSrc     es6中得到模块的方法。

export default {
  name: "SearchPanel",
  //注册组件
  data: function() {
    return {
      myData: [], //用来接收ajax得到的数据
      keyword: "", //v-model绑定的输入框的value
      now: -1,
      searchIndex: 0
    };
  },
  methods: {
    // &event是实参，表示event对象
    async get(ev) {
      // 如果按得键是上或者下，就不进行ajax
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        return;
      }
      console.log("------------", this.keyword);

      const { search } = this.$api.home;
      const response = await search(0, 10, this.keyword);
      const { status, data } = response;
      if (status === 200) {
        this.myData = data;
      }
      // this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
      //     this.myData = res.data.s;
      // });
    },
    selectDown() {
      this.now++;
      //到达最后一个时，再按下就回到第一个
      if (this.now == this.myData.length) {
        this.now = 0;
      }
      this.keyword = this.myData[this.now];
    },
    selectUp() {
      this.now--;
      //同上
      if (this.now == -1) {
        this.now = this.myData.length - 1;
      }
      this.keyword = this.myData[this.now];
    },
    search() {
      //打开对应的搜索界面
      window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
    },
    selectHover(index) {
      this.now = index;
    },
    selectClick(index) {
      this.keyword = this.myData[index];
      this.search();
    },
    clearInput() {
      this.keyword = "";
      // this.$http.jsonp('https://sug.so.360.cn/suggest?word=' + this.keyword + '&encodein=utf-8&encodeout=utf-8').then(function(res) {
      //     this.myData = res.data.s;
      // });
    },
    getIndex(index) {
      this.searchIndex = index;
    }
  }
};
</script>

<style type="text/css">
.search {
  width: 590px;
  height: 30px;
}
.search-input {
  height: 45px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}

.search-input input {
  border: 1px solid #e4e4e4;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 590px;
  height: 30px;
  /* font-size: 18px; */
  /* float: left; */
  /* padding-left: 10px; */
  /* padding-right: 10px; */
  /* overflow: hidden; */
  border-radius: 7px;
}

.search-select {
  position: absolute;
  top: 45px;
  width: 500px;
  box-sizing: border-box;
  z-index: 999;
}

.search-select li {
  border: 1px solid #d4d4d4;
  border-top: none;
  border-bottom: none;
  background-color: #fff;
  width: 100%;
}

.search-select-option {
  box-sizing: border-box;
  list-style: none;
  padding: 7px 10px;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}

input::-ms-clear {
  display: none;
}

.search-reset {
  width: 590px;
  height: 30px;
}

.search-select-list {
  transition: all 0.5s;
}

.itemfade-enter,
.itemfade-leave-active {
  opacity: 0;
}

.itemfade-leave-active {
  position: absolute;
}

.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
.search-select ul {
  margin: 0;
  text-align: left;
}
.icon-style {
  background: url("https://avatars2.githubusercontent.com/u/37093600?s=40&v=4");
  width: 40px;
  height: 40px;
}
.value-style {
  display: flex;
  flex-direction: row;
}

.value-param-style {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.text-style {
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
