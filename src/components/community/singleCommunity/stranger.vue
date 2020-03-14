<template>
  <div class="strangerList boxColor">
    <div class="rightLogo" @click="router">更多>></div>
    <li class="title clear">
        <img src="@static/image/icon1.png" alt />
        <span>陌生人员感知</span>
      </li>
    <div class="selected2 clear">
      <ul class="type1">
        <p
          v-for="(item,index) in options"
          :key="index"
          @click="slected(index)"
          :class="{selectedType:item.status}"
        >{{item.label}}</p>
      </ul>
    </div>
    <div class="table2">
      <div class="showBox">
        <li v-for="item in list" :key="item.index">
          <img :src="item.image || src" alt />
          <div class="infoBox">
            <p>年龄段：{{item.age}}</p>
            <p>性别：{{item.sex}}</p>
            <p>出现地点：{{item.xqName}}</p>
            <p>抓拍时间：{{item.capTime}}</p>
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
      url: state => state.commonData.url
    })
  },
  methods: {
    router(){
      this.$router.push({name:"PersonPerceptionList",query:{tabIndex:3,xqCode:""}})
    },
    slected(index) {
      this.options.forEach(item => {
        item.status = false;
      });
      this.options[index].status = true;
      this.value = this.options[index].value;
    },
  /*   router(){
      this.$router.push({name:"personParticularList",params: { userId: 1}})
    }, */
    listInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/person/stranger/list",
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
          areaId: "0",
          xqCode:this.xqCode,
          subdistrictId: "",
          timeType: this.value,
          page: 1,
          limit: 3
        }
      }).then(res => {
        if (res.data.code == 1000) {
          
          this.list = res.data.data.stranger;
          console.log(res)
        }
      });
    }
  },
  watch: {
    value() {
      this.listInfo()
    }
  },
  created() {
     this.xqCode = this.$route.query.xqCode; 
     this.listInfo();

  },
  data() {
    return {
      src:require("@static/image/person.png"),
      list:[],
      options: [
        {
          value: "day",
          label: "本日",
          status: true
        },
        {
          value: "month",
          label: "本月",
          status: false
        }
      ],
      value: "day",
      xqCode:""
    };
  },
};
</script>

<style lang="scss" scoped>
.strangerList {
  width: 426px;
  height: 502px;
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
.strangerList {
  /* 公共样式 */
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
}
.selected2 {
  /* 隐藏此节点 */
  margin: 10px auto 5px;
  width: 160px;
  //display: none;
}
.selected2 ul {
  width: 160px;
  height: 32px;
  border-radius: 4px;
  float: left;
  overflow: hidden;
  background: #3ba9e6;
  p {
    width: 80px;
    float: left;
    height: 100%;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
}
.selectedType {
  background: #5fc9fb;
}
.table2 {
  width: 100%;
  height: 470px;
  margin: 5px auto;
  overflow: auto;
}
.el-table--enable-row-transition .el-table__body td {
  transition: none;
}
.showBox {
  width: 100%;
  height: 430px;
  overflow: hidden;
  //margin-top: 15px;
}
.showBox li {
  width: 387px;
  height: 122px;
  background: #163D97;
  /* background-image: url(../../../../../static/image/triangle.png); */
  background-position: top right;
  background-repeat: no-repeat;
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
      margin-top: 8px;
    }
  }
}
</style>