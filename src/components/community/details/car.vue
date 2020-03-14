<template>
  <div class="face boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <li class="title clear">
      <img src="@static/image/icon1.png" alt />
      <span>车辆实时抓拍</span>
    </li>
    <div class="infoBox">
        <RealTimeList v-for="item in carList" :key="item.id+item.timeStamp" :item="item" /> 
    </div>
  </div>
</template>

<script> 
import RealTimeList from "./realTimeList"
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
        carList: state => state.commonData.carList
    })
  },
  components: {
      RealTimeList
  },
  methods: {
    router(){
      this.$router.push({name:"CarPerceptionList",query:{tabIndex:1,xqCode:""}})
    }
  }
};
</script>

<style lang="scss" scoped>
/* 特例要在这加背景色 */
.face {
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  float: left;
  width: 432px;
  height: 485px;
  background: url(../../../../static/image/conboxRT2.png) no-repeat right top,
    url(../../../../static/image/conboxLB.png) no-repeat left bottom, #0a1a6b;
    
}
.rightLogo {
  width: 80px;
  height: 32px;
  border-radius: 4px;
  color: #4896f7;
  position: absolute;
  top: 6px;
  right: 20px;
  font-size: 16px;
  text-align: center;
  line-height: 32px;
  z-index: 100;
  cursor: pointer;
}
.title {
  margin-top: 10px;
  margin-left: 16px;
  img {
    float: left;
    margin-right: 10px;
  }
  span {
    float: left;
    font-size: 18px;
    margin-top: -1px;
  }
}

.infoBox{
    width: 402px;
    height: 420px;
    margin: 10px auto 0;
    //background:red;
    overflow-y: auto;
   overflow-x: hidden;
    li{
        width: 100%;
        height: 130px;
        border-radius: 4px;
        background:#163D97;
        margin-bottom:10px;
        overflow: hidden;
        img{
            width: 100px;
            height: 120px;
            margin-top:5px;
            margin-left: 10px;
            margin-right: 20px;
            float: left;
        }
        p{
            font-size: 16px;
            margin-top:15px;
        }
    }
}
</style>