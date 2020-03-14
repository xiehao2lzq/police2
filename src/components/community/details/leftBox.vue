<template>
  <div class="leftBox">
    <div class="baseInfo boxStyle specialBoxColor">
      <li class="title clear">
        <img src="@static/image/icon2.png" alt />
        <span>社区基础要素</span>
      </li>
      <ul>
        <router-link tag="li" to="/community/houseinglist" class="li1">
          <img src="@static/image/base1.png" alt />
          <span class="name">实有房屋</span>
          <span class="num">{{info.roomTotalNum}}</span>
        </router-link>
        <router-link tag="li" to="/community/personParticularList" class="li2">
          <img src="@static/image/base2.png" alt />
          <span class="name">实有人口</span>
          <span class="num">{{info.personTotalNum}}</span>
        </router-link>
        <router-link tag="li" to="/community/CarParticularList" class="li3">
          <img src="@static/image/base3.png" alt />
          <span class="name">实有车辆</span>
          <span class="num">{{info.carTotalNum}}</span>
        </router-link>
      </ul>
    </div>
    <div class="perceptionInfo boxStyle specialBoxColor">
      <li class="title clear">
        <img src="@static/image/icon2.png" alt />
        <span>今日感知数据:{{info2.todayPersonSenseNum+info2.todayCarSenseNum+info2.faceCaptureNum+info2.carCaptureNum}}</span>
      </li>
      <ul>
        <router-link tag="li" :to="{name:'PersonPerceptionList',query:{tabIndex:0,xqCode:xqCode}}" class="li1">
          <img src="@static/image/perception1.png" alt />
          <span class="name">人员出入</span>
          <span class="num">{{info2.todayPersonSenseNum}}</span>
        </router-link>
        <router-link tag="li" :to="{name:'CarPerceptionList',query:{tabIndex:0,xqCode:xqCode}}" class="li2">
          <img src="@static/image/perception2.png" alt />
          <span class="name">车辆出入</span>
          <span class="num">{{info2.todayCarSenseNum}}</span>
        </router-link>
        <router-link tag="li" :to="{name:'PersonPerceptionList',query:{tabIndex:1,xqCode:xqCode}}" class="li3">
          <img src="@static/image/perception3.png" alt />
          <span class="name">人脸抓拍</span>
          <span class="num">{{info2.faceCaptureNum}}</span>
        </router-link>
        <router-link tag="li" :to="{name:'CarPerceptionList',query:{tabIndex:1,xqCode:xqCode}}" class="li1">
          <img src="@static/image/perception4.png" alt />
          <span class="name">车辆抓拍</span>
          <span class="num">{{info2.carCaptureNum}}</span>
        </router-link>
      </ul>
    </div>
    <div class="warning boxStyle specialBoxColor">
      <li class="title clear">
        <img src="@static/image/icon1.png" alt />
        <span>智慧预警:{{tableData.length}}</span>
      </li>
      <div class="table2">
        <el-table
          :data="tableData"
          height="290"
          style="width: 100%"
          @row-click="detial"
        >
          <el-table-column prop="captureTime" label="时间"></el-table-column>
          <el-table-column label="地点">
            <template slot-scope="scope">
              <span>{{scope.row.xqName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="alarmType" label="事件"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  computed: {
    ...mapState({
      url:state=>state.commonData.url
    })
  },
    data () {
        return {
             tableData: [],
             xqCode:"",
             info:{},
             info2:{}
        }
    },
    created () {
      this.listInfo1()
      this.listInfo2()
      this.listInfo3()
    },
    methods: {
      //新增需求
      detial(row){
        console.log(row)
        var data = row;
        var type = {};
        switch (data.event) {
          case "0": //车辆占到
            type = { type: 8 };
            break;
          case "4": //流浪动物
            type = { type: 7 };
            break;
          case "5": //严重犯罪车辆
            type = { type: 1 };
            break;
          case "6": //肇事逃逸车辆
            type = { type: 3 };
            break;
          case "7": //疑似被盗车辆
            type = { type: 6 };
            break;
          case "8": //A级通缉犯人员
            type = { type: 2 };
            break;
          case "9": //c级通缉犯人员
            type = { type: 4 };
            break;
          case "10": //疑似犯罪人员
            type = { type: 5 };
            break;
          default:
            break;
        }
        data = Object.assign(data,type);
        this.$store.state.commonData.popList.push(data);
      },
      listInfo1(){
        this.$axios({
          method:'get',
          url:"http://" + this.url + ":9000/sjwl/webapi/subdistrict/baseInfo",
          params:{areaId:0}
        }).then(res=>{
          if(res.data.code==1000){
            this.info = res.data.data
          }
          //console.log(res)
        })
      },
      listInfo2(){
        this.$axios({
          method:'get',
          url:"http://" + this.url + ":9000/sjwl/webapi/subdistrict/statistics/todaySense",
          params:{areaId:0}
        }).then(res=>{
          if(res.data.code==1000){
            this.info2 = res.data.data
          }
          //console.log(res)
        })
      },
    listInfo3(){
        this.$axios({
          method:'get',
          url:"http://" + this.url + ":9000/sjwl/webapi/alarm/homeList",
          params:{areaId:0}
        }).then(res=>{
          if(res.data.code==1000){
            this.tableData = res.data.data
          }
          //console.log(res)
        })
      }
    }
};
</script>

<style lang="scss" scoped>
.leftBox {
  width: 400px;
  height: 980px;
  margin: 10px 0 0 10px;
  background: url(../../../../static/image/conboxLT.png) no-repeat left top,
    url(../../../../static/image/conboxRT.png) no-repeat right top,
    url(../../../../static/image/conboxLB.png) no-repeat left bottom,
    url(../../../../static/image/conboxRB.png) no-repeat right bottom;
  overflow: hidden;
  float: left;
}
.boxStyle {
  margin: 15px auto;
  
}
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
    margin-top: -3px;
  }
}
ul li {
  margin-top: 15px;
  margin-left: 16px;
  width: 339px;
  height: 54px;
  border: 1px solid rgba(176, 198, 254, 1);
  overflow: hidden;
  line-height: 54px;
  border-radius: 5px;
  cursor: pointer;
  img {
    float: left;
    margin-top: 10px;
    margin-left: 20px;
  }
  .name {
    float: left;
    font-size: 18px;
    margin-left: 20px;
  }
  .num {
    float: right;
    font-size: 30px;
    margin-right: 20px;
  }
}
/* 有区别样式 */
.li1 {
  color: #03e9f8;
  border: 1px solid #03e9f8;
}
.li2 {
  color: #f18c60;
  border: 1px solid #f18c60;
}
.li3 {
  color: #56cbff;
  border: 1px solid #56cbff;
}
.baseInfo {
  width: 370px;
  height: 251px;
  overflow: hidden;
}
.perceptionInfo {
  width: 370px;
  height: 320px;
  overflow: hidden;
}
.warning {
  width: 370px;
  height: 350px;
  overflow: hidden;
  /* 重置一下 */
  .title {
    span {
      margin: -1px;
    }
  }
 .table{
     width: 340px;
     margin:10px auto 0;
 }
}
</style>