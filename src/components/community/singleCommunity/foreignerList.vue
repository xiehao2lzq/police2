<template>
  <div class="foreignerList boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <li class="title clear">
        <img src="@static/image/icon1.png" alt />
        <span>涉外人员({{total||0}})</span>
      </li>
    <!-- <div class="selected2 clear">
      <ul class="type1">
        <p class="selectedType">本日</p>
        <p>本月</p>
      </ul>
    </div>-->
    <div class="table2">
      <div class="showBox">
        <li v-for="item in list" :key="item.paperNumber">
          <!-- <span>{{item.xqCode}}</span> -->
          <img :src="item.image || src" alt />
          <div class="infoBox">
            <p>姓名：{{item.name || "未知"}}</p>
            <p>小区：{{item.xqName}}</p>
            <p>国别：{{item.country}}</p>
            <p>电话号：{{item.phone}}</p>
           <!--  <p>护照号：{{item.phone}}</p> -->
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectedValue: state => state.commonData.selectedValue
    }),
    ...mapState({
      url: state => state.commonData.url
    })
  },
  created() {
    this.xqCode = this.$route.query.xqCode;
    /* 用的现有人员查询接口，国别传0 */
    this.$axios({
      method: "get",
      url: "http://" + this.url + ":9000/sjwl/webapi/foreigner/sense",
      headers: {
        Authorization: sessionStorage.getItem("Authorization")
      },
      params: {
        areaId: "0",
        xqCode: this.xqCode,
        subdistrictId: "",
        timeType: "month",
        limit: 3,
        page: 1,
        nationalityName: 0
      }
    }).then(res => {
      if (res.data.code == 1000) {
       // console.log(res)
        this.list =this.list.length>3?res.data.data.stranger.slice(0, 3):[];
        this.total = res.data.data.totalRows
      }
    });
  },
  data() {
    return {
      src:require("@static/image/person.png"),
      options: [
        {
          value: "day",
          label: "本日"
        },
        {
          value: "month",
          label: "本月"
        }
      ],
      value: "day",
      list: [],
      total:"",
      xqCode:""  
    };
  },
  methods: {
    router(){
      this.$router.push({name:"PersonParticularList",query:{tabIndex:3,xqCode:""}})
    },
  }
};
</script>

<style lang="scss" scoped>
.foreignerList {
  width: 426px;
  height: 458px;
  border-radius: 4px;
  position: relative;
  margin-left: 11px;
  margin-top: 10px;
  overflow: hidden;
  float: left;
   background: url(../../../../static/image/conboxRT2.png) no-repeat right top,
    url(../../../../static/image/conboxLB.png) no-repeat left bottom, #0a1a6b;
    position: relative;
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
.foreignerList {
 /* 公共样式 */
.title {
  margin-top: 10px;
  margin-left: 16px;
  margin-bottom: 10px;
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
}
.table2 {
  width: 100%;
  height: 440px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.showBox {
  width: 100%;
  height: 400px;
  overflow: hidden;
  //margin-top: 15px;
}
.showBox li {
  width: 387px;
  height: 122px;
  background: #163D97;
  margin: 10px auto;
  position: relative;
  color: #fff;
  border-radius: 5px;
  img {
    width: 90px;
    height: 110px;
    float: left;
    margin: 5px 0 0 10px;
  }
  .infoBox {
    float: left;
    margin-left: 30px;
    p {
      margin-top: 10px;
      width: 250px;
      //background: red;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>