<template>
  <div class="homePage" @keyup.enter="login({username:name,password:password,verifyCode:'1234'})">
    <div class="routerBox clear" v-if="!onceLogin">
      <router-link class="community" tag="li" to="./community"></router-link>
      <router-link class="information" tag="li" to="./information"></router-link>
      <router-link class="safety" tag="li" to="./safety"></router-link>
      <router-link class="BigData" tag="li" to="./BigData"></router-link>
    </div>
    <div class="login" v-else>
      <el-form :label-position="labelPosition" label-width="80px">
        <div class="form">
          <el-form-item label="账号">
          <el-input placeholder="请输入账号" v-model="name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" style="width:300px" v-model="password" show-password></el-input>
        </el-form-item>
        </div>
        <el-form-item label>
          <el-checkbox v-model="checked">记住账号</el-checkbox>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button
          type="primary"
          @click="login({'username':name,'password':password,'verifyCode':'1234'})"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      checked: true,
      labelPosition: "right",
      name: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      onceLogin: state => state.commonData.onceLogin
    }),
    ...mapState({
      errorMsg: state => state.commonData.errorMsg
    })
  },
  created() {
    if (sessionStorage.getItem("Authorization")) {
      this.$store.state.commonData.onceLogin = false;
    } else {
      this.$store.state.commonData.onceLogin = true;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  },
  watch: {
    errorMsg() {
      this.open4(this.errorMsg[0]);
    },
    onceLogin() {
      this.gainXqList();
    }
  },
  methods: {
    ...mapActions(["login","gainXqList"]),
    open4(val) {
      this.$message.error(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.homePage {
  width: 100%;
  height: 1080px;
  background: url(../../static/image/bg.jpg);
  position: relative;
}
.routerBox {
  position: absolute;
  top: 340px;
  display: flex;
  justify-content: center;
  width: 100%;
}
li {
  width: 342px;
  height: 462px;
  margin: 0 10px;
  cursor: pointer;
}
.community {
  background: url(../../static/image/community.png);
}
.information {
  background: url(../../static/image/information.png);
}
.safety {
  background: url(../../static/image/safety.png);
}
.BigData {
  background: url(../../static/image/BigData.png);
}
.login {
  //box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.31);
  border-radius: 20px;
  width: 631px;
  height: 540px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  overflow: hidden;
  background: url(../../static/image/login.png)
}
.footer {
  width: 100%;
  text-align: center;
}
</style>