<template>
  <div class="header">
    <router-link class="person" tag="li" to="/community/personParticularList">实有人口</router-link>
    <router-link class="car" tag="li" to="/community/CarParticularList">实有车辆</router-link>

    <img @click="gorouter" src="@static/image/logo.png" alt />
   <!--  <li class="exit" @click="exit"></li> -->
    <li class="back" @click="back">返回</li>
    <!-- <router-link class="BigData" tag="li" to="/BigData">大数据分析</router-link>
    <router-link class="safety" tag="li" to="/safety">安全布控</router-link>-->
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      sessionStorage.removeItem("Authorization");
      this.$store.state.commonData.onceLogin = true;
      this.$router.push("/");
    },
    back() {
      this.$router.go(-1);
    },
    gorouter() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 86px;
  width: 100%;
  //background: red;
  overflow: hidden;
  position: relative;
  li {
    height: 72px;
    font-size: 22px;
    line-height: 86px;
    cursor: pointer;
    padding: 0 10px;
  }
  .person {
    float: left;
    margin-left: 80px;
  }
  .car {
    float: left;
    margin-left: 80px;
  }
  /* .safety {
    float: right;
    margin-right: 80px;
  }
  .BigData {
    float: right;
    margin-right: 80px;
  } */
  .exit {
    float: right;
    width: 28px;
    height: 30px;
    background: url(../../../static/image/exit.png);
    margin: 27px 30px 0 15px;
  }
  .back {
    float: right;
    width: 86px;
    height: 40px;
    background: #0b4ceb;
    opacity: 0.7;
    margin: 22px 10px 0 0;
    line-height: 40px;
    text-align: center;
    box-shadow: 0 0 5px 5px rgba($color: rgb(92, 130, 143), $alpha: 0.3) inset;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 25px;
  }
  img {
    float: left;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    cursor: pointer;
  }
  .router-link-active {
    background-image: url(../../../static/image/active.png);
    background-size: cover;
  }
}
</style>