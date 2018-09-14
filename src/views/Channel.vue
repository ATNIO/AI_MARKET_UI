<template>
  <section> 
    <!-- 通道未开通 -->
    <template v-if="!isLogin || (stateChannelStatus === 'normal' && stateChannelBanlance < 0) || stateChannelStatus === null">
      <div class="inaccessible">
        <div class="wrapper">
            <p class="title">No channel was found registered for you on this Dbot</p>
            <div class="means">
              <p class="method">In order to call API...</p>
              <p class="step-one"><Icon custom="icon-add" color="#87C5FE" size="20"/> deposit some ATN to open a channel with this Dbot</p>
              <p class="step-two"><Icon custom="icon-sign" color="#87C5FE" size="20"/> For each transfer , sign a message confirming the balance with the new transferred amount.</p>
              <Input 
                search 
                enter-button="Deposit" 
                placeholder=" 0 ATN" 
                size="large" 
                class="search" 
                v-on:on-search="nextStep" 
                v-model="depositValue"
              />
            </div>
        </div>
      </div>
    </template>

    <!-- 通道loading -->
    <template v-else>
      <div class="accessible">
        <div class="wrapper">       
            <div class="yourself">
              <avatar :width="86" :height="86" :borderWidth="3" :text="address"></avatar>
              <span>{{ address }}</span>
            </div>

            <div class="center">
              <div class="content">
                <div v-if="stateChannelStatus==='normal' && stateChannelBanlance >= 0">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{stateChannelBanlance | priceFormat}} ATN</p>
                </div>  
                <div 
                  class="circle-wrapper" 
                  v-else-if="
                    stateChannelStatus === 'waitingTX' || 
                    stateChannelStatus === 'waitingSync'"
                >
                  <div class="wait">
                    <div class="circle circle1"></div>
                    <div class="circle circle2"></div>
                    <div class="circle circle3"></div>
                    <div class="circle circle4"></div>
                    <div class="circle circle5"></div>
                    <div class="circle circle6"></div>
                    <!--<ProgressBar :barwidth="syncpecent"></ProgressBar>-->
                  </div>
                  <p class="syncing">{{ showChannelWaiting }}</p>
                </div>             
                <P class="description">A channel was found for this address.</P>
                <div class="btn-wrapper" v-if="stateChannelStatus==='normal' && stateChannelBanlance >= 0">
                  <Input 
                    search 
                    enter-button="TOP UP" 
                    placeholder=" 0 ATN" 
                    size="large" 
                    class="top-up" 
                    v-model="topupValue"
                    v-on:on-search="topup"
                  />
                  <button class="close-channel" @click="closeChannel">CLOSE</button>
                </div>
              </div>
            </div>  

            <div class="dbot">
              <div class="dbot-avatar">
                <img :src="dbot.logo" alt="" />
              </div> 
              <span>{{ dbot.addr }}</span>
            </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script src="./Channel.js">
</script>
<style lang="less" scoped src="./Channel.less">
</style>
