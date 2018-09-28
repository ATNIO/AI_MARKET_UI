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
                placeholder=" 0 ATN" 
                size="large" 
                class="search" 
                v-model="depositValue">
                <Button :loading="depositLoading" type="primary" class="deposit-btn" slot="append" @click="nextStep">
                  Deposit
                </Button>
              </Input>
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
                <div class="normal-balance" v-if="stateChannelStatus==='normal' && stateChannelBanlance >= 0">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{stateChannelBanlance | priceFormat}} ATN</p>
                  <p class="deposit">Deposit: {{stateChannelDeposit | priceFormat}} ATN</p>
                </div>  
                <div class="force-close" v-else-if="stateChannelStatus === 'outdate' || stateChannelStatus === 'dbotErr'">
                  <p class="deposit" v-if="stateChannelDeposit >= 0">Deposit: {{stateChannelDeposit | priceFormat}} ATN</p>
                  <p class="syncing">{{ showChannelWaiting }}</p>
                  <div class="force-wrapper">
                      <Button class="refresh-left" @click="refreshChannel" type="primary">
                        <Icon type="md-refresh" />
                        Refresh
                      </Button>
                      <!--<Button class="refresh-left" @click="forceCloseChannel" type="primary">
                        ForceClose
                      </Button>-->
                  </div>
                </div>
                <div 
                  class="circle-wrapper" 
                  v-else-if="
                    stateChannelStatus === 'waitingTX' || 
                    stateChannelStatus === 'waitingSync' ||
                    stateChannelStatus === 'TXErr'"
                >
                  <div class="wait">
                    <Progress :percent="syncpecent" :status="syncstatus" :stroke-width="3"/>
                    <!--<ProgressBar :percent="syncpecent" :status="syncstatus" :stroke-width="3"/>-->
                  </div>
                  <div
                    v-if="
                      stateChannelStatus === 'waitingTX' ||
                      stateChannelStatus === 'waitingSync'"
                  >
                    <p class="syncing">{{ showChannelWaiting }}</p>
                  </div>
                  <div class="warning-wrapper" v-else>
                    <p class="warning"> {{ showChannelWaiting }} </p>
                    <Button class="refresh-channel" @click="refreshChannel" type="primary">
                      <Icon type="md-refresh" />
                      Refresh
                    </Button>
                  </div>
                </div>             
                <div class="btn-wrapper" v-if="stateChannelStatus==='normal' && stateChannelBanlance >= 0">
                  <Input 
                    placeholder=" 0 ATN" 
                    size="large" 
                    class="top-up" 
                    v-model="topupValue">
                    <Button :loading="topupLoading" type="primary" class="top-up-btn" slot="append" @click="topup">
                      <span v-if="!topupLoading">TOP UP</span>
                      <span v-else>TOP UP</span>
                    </Button>
                  </Input>
                  <Button :loading="closeLoading" type="primary" class="close-channel" @click="closeChannel">CLOSE</Button>
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
