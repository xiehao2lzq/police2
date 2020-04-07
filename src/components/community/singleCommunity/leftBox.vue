<template>
  <div class="leftBox boxColor map" :style="style">
    <div class="hide" @click="hideOrshow">
      <i v-show="left" class="el-icon-arrow-left"></i>
      <i v-show="!left" class="el-icon-arrow-right"></i>
    </div>

    <li class="title clear">
      <img src="@static/image/icon2.png" alt />
      <span>社区基础要素</span>
    </li>
    <ul>
      <router-link
        tag="li"
        :to="{name:'Houseinglist',query:{xqCode:xqCode,tabIndex:0}}"
        class="li1"
      >
        <img src="@static/image/base1.png" alt />
        <span class="name">实有房屋</span>
        <span class="num">{{info.roomTotalNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'PersonParticularList',query:{xqCode:xqCode,tabIndex:0}}"
        class="li2"
      >
        <img src="@static/image/base2.png" alt />
        <span class="name">实有人口</span>
        <span class="num">{{info.personTotalNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'CarParticularList',query:{xqCode:xqCode,tabIndex:0}}"
        class="li1"
      >
        <img src="@static/image/base3.png" alt />
        <span class="name">实有车辆</span>
        <span class="num">{{info.carTotalNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'PersonParticularList',query:{xqCode:xqCode,tabIndex:2}}"
        class="li1"
      >
        <img src="@static/image/base1.png" alt />
        <span class="name">流动人口</span>
        <span class="num">{{info.flowPersonTotalNum}}</span>
      </router-link>
    </ul>

    <li class="title clear">
      <img src="@static/image/icon2.png" alt />
      <span>今日感知数据:{{info2.todayPersonSenseNum+info2.todayCarSenseNum+info2.faceCaptureNum+info2.carCaptureNum}}</span>
    </li>
    <ul>
      <router-link
        tag="li"
        :to="{name:'PersonPerceptionList',query:{tabIndex:0,xqCode:xqCode}}"
        class="li1"
      >
        <img src="@static/image/perception1.png" alt />
        <span class="name">人员出入</span>
        <span class="num">{{info2.todayPersonSenseNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'CarPerceptionList',query:{tabIndex:0,xqCode:xqCode}}"
        class="li2"
      >
        <img src="@static/image/perception2.png" alt />
        <span class="name">车辆出入</span>
        <span class="num">{{info2.todayCarSenseNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'PersonPerceptionList',query:{tabIndex:1,xqCode:xqCode}}"
        class="li3"
      >
        <img src="@static/image/perception3.png" alt />
        <span class="name">人脸抓拍</span>
        <span class="num">{{info2.faceCaptureNum}}</span>
      </router-link>
      <router-link
        tag="li"
        :to="{name:'CarPerceptionList',query:{tabIndex:1,xqCode:xqCode}}"
        class="li1"
      >
        <img src="@static/image/perception4.png" alt />
        <span class="name">车辆抓拍</span>
        <span class="num">{{info2.carCaptureNum}}</span>
      </router-link>
    </ul>
    <div class="switchSlect">
      <div class="header">
        <span @click="selectHouse">房屋</span>
        <span>|</span>
        <span @click="selectmonitoring">监控</span>
      </div>
      <div class="p">
        <p
          v-show="homeOrVideo"
          v-for="item in leftBoxHouseInfo"
          :key="item.index"
          @click="houseList(item)"
        >
          <img :src="item.iconPng" alt />
          <span>{{item.name}}</span>
        </p>
        <p
          v-show="!homeOrVideo"
          v-for="item in leftBoxMonitoringInfo"
          :key="item.index"
          @click="playVideo(item)"
        >
          <img :src="item.iconPng" alt />
          <span>{{item.name}}</span>
        </p>
      </div>
    </div>

    <!-- 小区房屋弹窗 -->
    <div class="house">
      <el-dialog :visible.sync="dialogHouseListVisible">
        <div class="houseInfo">
          <img src="@static/image/houseHeader.png" alt />
          <p class="tower">{{houseName}}</p>
          <li class="element">
            <p v-for="cell in cellList" :key="cell.index">
              <span
                :class="{active:cellId==cell.cellId}"
                @click="switchCell(cell.cellId)"
              >{{cell.cellName}}</span>
              <span>|</span>
            </p>
          </li>
          <div class="houseList">
            <ul class="clear" v-for="item in floorList" :key="item.floorNum">
              <li
                v-for="item2 in item.roomList"
                :key="item2.roomName"
                @click="openDetails(item2.roomId)"
              >
                <p
                  :class="{self:item2.purposeName=='自用',rent:item2.purposeName=='出租',Idle:item2.purposeName=='闲置'}"
                >{{item2.purposeName}}</p>
                <span>{{item2.roomName}}</span>
              </li>
              <li
                v-for="i in (4-(item.roomList.length%4==0?4:item.roomList.length%4))"
                :key="i.index"
              ></li>
              <!-- <li>
                <p class="Idle">自住</p>
                <span>1801</span>
              </li>
              <li class="noBorder">
                <p class="self">自住</p>
                <span>1801</span>
              </li>-->
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="tab-box">
      <el-dialog
        title
        :visible.sync="dialogTableVisible"
        width="910px"
        top="3vh"
        border="true"
        @open="dialogHouseListVisible = false"
        @close="dialogHouseListVisible = true"
      >
        <div class="title clear">
          <p></p>
          <span>一户一档</span>
        </div>
        <p class="tit-text">基础信息</p>
        <div class="info-box">
          <li class="info-item">
            <span>所在小区：</span>
            <span>{{roomData.xqName}}</span>
          </li>
          <li class="info-item">
            <span>楼号：</span>
            <span>{{roomData.buildingName}}</span>
          </li>
          <li class="info-item">
            <span>单元号：</span>
            <span>{{roomData.cellName}}</span>
          </li>
          <li class="info-item">
            <span>房屋类型：</span>
            <span>{{roomData.funcName}}</span>
          </li>
          <li class="info-item">
            <span>用途：</span>
            <span>{{roomData.purposeName}}</span>
          </li>
          <li class="info-item">
            <span>装修时间：</span>
            <span>{{roomData.decorationTime}}</span>
          </li>
          <li class="info-item">
            <span>房屋号：</span>
            <span>{{roomData.roomName}}</span>
          </li>
          <li class="info-item">
            <span>建筑面积：</span>
            <span>{{roomData.buildingArea}}m²</span>
          </li>
          <li class="info-item">
            <span>房产证号：</span>
            <span>{{roomData.housePropertyCardNo}}</span>
          </li>
          <li class="info-item">
            <span>认购证号：</span>
            <span>{{roomData.subscribeNo}}</span>
          </li>
        </div>
        <p class="tit-text">人员信息（{{peopleData.totalRows}}）</p>
        <div class="info-box people-box">
          <li
            class="people-item"
            v-for="(item,index) in peopleData.list"
            :key="index"
            @click="router(item.personId)"
          >
            <img class="people-img" :src="item.image ||src" alt />
            <div class="right-box">
              <div class="text-line">
                <span>名称:</span>
                <span>{{item.ownerName}}</span>
              </div>
              <div class="text-line">
                <span>性别:</span>
                <span>{{item.sex}}</span>
              </div>
              <div class="text-line">
                <span>居住身份:</span>
                <span>{{item.liveTypeName}}</span>
              </div>
              <div class="text-line">
                <span>身份证:</span>
                <span>{{item.paperNumber}}</span>
              </div>
              <div class="text-line">
                <span>手机号:</span>
                <span>{{item.phone}}</span>
              </div>
            </div>
          </li>
        </div>
        <p class="tit-text">车辆信息（{{carData.length}}）</p>
        <div class="info-box people-box">
          <li class="people-item" v-for="(item,index) in carData">
            <img class="car-img" :src="item.carImg || src2" alt />
            <div class="right-box">
              <div class="text-line">
                <span>车牌：</span>
                <span>{{item.carNum}}</span>
              </div>
              <div class="text-line">
                <span>车辆颜色：</span>
                <span>{{item.carNumColorName}}</span>
              </div>
              <div class="text-line">
                <span>汽车品牌：</span>
                <span>{{item.carBrandName}}</span>
              </div>
            </div>
          </li>
        </div>
        <p class="tit-text">缴费信息（近一年）</p>
        <el-table :data="gridData">
          <el-table-column property="year" label="年度" width="150"></el-table-column>
          <el-table-column property="month" label="月份" width="150"></el-table-column>
          <el-table-column property="propertyFee" label="物业费"></el-table-column>
          <el-table-column property="propertyFeeStatus" label="缴纳状态"></el-table-column>
          <el-table-column property="waterUse" label="用水量"></el-table-column>
          <el-table-column property="waterFee" label="水费"></el-table-column>
          <el-table-column property="waterFeeStatus" label="缴纳状态"></el-table-column>
        </el-table>
        <!-- <div class="bottom-btn">
          <el-button type="primary" @click="dialogTableVisible=false">确定</el-button>
        </div>-->
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Loading } from 'element-ui';
export default {
  computed: {
    ...mapState({
      url: state => state.commonData.url
    }),
    ...mapState({
      homeOrVideo: state => state.commonData.homeOrVideo
    }),
    ...mapState({
      leftBoxHouseInfo: state => state.commonData.leftBoxHouseInfo
    }),
    ...mapState({
      leftBoxMonitoringInfo: state => state.commonData.leftBoxMonitoringInfo
    })
  },
  data() {
    return {
      src: require("@static/image/person.png"),
      src2: require("@static/image/carNoImage.png"),
      dialogHouseListVisible: false,
      roomData: "", //弹窗基本信息
      peopleData: "", //弹窗人员信息
      carData: "", //弹窗车辆数据
      gridData: [], //弹窗内表格数据
      buildingCode: "",
      cellList: [], //单元列表
      cellId: "", //单元id
      roomId: "",
      floorList: [],
      houseName: "",
      dialogTableVisible: false,
      style: {
        left: "0px"
      },
      once: true,
      left: true,
      xqCode: "",
      info: {},
      info2: {}
    };
  },
  created() {
    this.xqCode = this.$route.query.xqCode;
    //console.log(this.$route.query.xqCode)
    this.listInfo1();
    this.listInfo2();
  },
  methods: {
    //新加需求跳转到详情页面
    router(id) {
      this.$router.push({ name: "PersonRecord", query: { id: id } });
    },
    houseList(e) {
      //点击楼号获取楼号基本信息
      if (e) {
        this.buildingCode = e.buildingCode;
        this.cellId = "";
      }
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/house/roomByBuilding/list",
        params: {
          areaId: 0,
          buildingCode: this.buildingCode,
          cellId: this.cellId
        },
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        console.log(res);
        if (res.data.code == 1000) {
          //this.roomData = res.data.data;
          this.floorList = res.data.data.floorList;
          this.cellList = res.data.data.cellList;
          this.houseName = res.data.data.xqName + res.data.data.buildingName;
          this.dialogHouseListVisible = true
          if (e) {
            this.cellId = res.data.data.cellList[0].cellId; //默认一单元
            //console.log(111)
          }
        }
        //console.log(e.target.customData.id);
      });
    }, 
    switchCell(cellId) {
      //切换单元
      this.cellId = cellId;
      this.houseList();
    },
    playVideo(e) {
      //拿着国标码再请求一遍接口
      //console.log(e.target.customData.gbCode);
      //this.$store.state.commonData.videoShow = true;
      let options = {
        spinner:"el-icon-loading",
        text:"正在请求视频",
        background:"rgba(0, 0, 0, 0.8)"
      };
      let loadingInstance = Loading.service(options);
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/capture/play",
        params: {
          areaId: 0,
          gbCode: e.gbCode,
          gbCodeseq: e.gbCodeseq
        },
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        console.log(res);
        loadingInstance.close();
        if (res.data.code == 1000) {
          this.$store.state.commonData.videoUrl = res.data.data.FLV;
          this.$store.state.commonData.videoShow = true;
        } else {
          this.$store.state.commonData.errorMsg.unshift(res.data.msg);
        }
      });
    },
    //打开详情页弹窗
    openDetails(id) {
      this.dialogTableVisible = true;
      this.getPopoverInfo(id);
      this.getPopoverPeople(id);
      this.getPopoverCar(id);
      this.getPopoverPayment(id);
    },
    // 获取弹窗中的基本信息
    getPopoverInfo(id) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi" + `/house/room/${id}/info`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        //console.log(res)
        if (res.data.code == 1000) {
          this.roomData = res.data.data;
        }
      });
    },
    // 获取弹窗中的人员信息
    getPopoverPeople(id) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${id}/persons`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data);
          this.peopleData = res.data.data;
        }
      });
    },
    // 获取弹窗中的车辆列表
    getPopoverCar(id) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi" + `/house/room/${id}/cars`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data)
          this.carData = res.data.data.list;
        }
      });
    },
    // 获取弹窗中的缴费信息列表
    getPopoverPayment(id) {
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${id}/payment`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data)
          this.gridData = res.data.data.list;
        }
      });
    },
    listInfo1() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/subdistrict/baseInfo",
        params: { areaId: 0, xqCode: this.xqCode }
      }).then(res => {
        if (res.data.code == 1000) {
          this.info = res.data.data;
        }
        //console.log(res)
      });
    },
    listInfo2() {
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi/subdistrict/statistics/todaySense",
        params: { areaId: 0, xqCode: this.xqCode }
      }).then(res => {
        if (res.data.code == 1000) {
          this.info2 = res.data.data;
        }
        console.log(res);
      });
    },
    selectHouse() {
      this.$store.state.commonData.homeOrVideo = true;
    },
    selectmonitoring() {
      this.$store.state.commonData.homeOrVideo = false;
    },
    hideOrshow() {
      if (this.once && this.style.left == "0px") {
        this.once = false;
        var left = 0;
        var timer = setInterval(() => {
          left -= 45;
          this.style.left = left + "px";
          if (left == -405) {
            clearInterval(timer);
            this.once = true;
            this.left = false;
          }
        }, 50);
      } else if (this.once && this.style.left == "-405px") {
        this.once = false;
        var left = -405;
        var timer = setInterval(() => {
          left += 45;
          this.style.left = left + "px";
          if (left == 0) {
            clearInterval(timer);
            this.once = true;
            this.left = true;
          }
        }, 50);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.leftBox {
  width: 395px;
  height: 970px;
  //overflow: hidden;
  position: absolute;
  margin-top: 10px;
  margin-left: 10px;
  z-index: 10000;
}
.hide {
  width: 30px;
  height: 100px;
  border-radius: 0 4px 4px 0;
  position: absolute;
  right: -30px;
  top: 430px;
  background: #0a1a6b;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  i {
    font-size: 30px;
  }
}
.switchSlect {
  width: 100%;
  height: 330px;
  //background: red;
  overflow: hidden;
  .header {
    width: 100%;
    margin-top: 15px;
    text-align: center;
    span {
      font-size: 16px;
      margin: 0 5px;
      cursor: pointer;
    }
  }
  .p {
    width: 100%;
    height: 280px;
    overflow: auto;
  }
  p {
    width: 50%;
    height: 30px;
    //background: gray;
    float: left;
    line-height: 30px;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    /* display: flex;
    justify-content: center; */
    img {
      margin-left: 20px;
      float: left;
    }
    span {
      margin-left: 20px;
      float: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 50%;
      overflow: hidden;
    }
  }
}
/* 公共样式 */
.title {
  margin-top: 10px;
  margin-left: 100px;
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
.leftBox > ul li {
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
/*列表弹窗  */
.houseInfo {
  width: 907px;
  height: 788px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0px;
  margin: auto;
  img {
    position: absolute;
    width: 907px;
    height: 63px;
  }
  .tower {
    width: 907px;
    height: 63px;
    text-align: center;
    line-height: 63px;
    font-size: 24px;
    position: relative;
    z-index: 100;
    color: #fff;
  }
  .element {
    width: 907px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url(../../../../static/image/houseHeader2.png);
    p {
      display: inline;
    }
    > p:last-child span:last-child {
      display: none;
    }
    .active {
      color: #a1cefe;
      font-weight: 900;
    }
    span {
      font-size: 24px;
      margin: 0 5px;
      color: #fff;
      cursor: pointer;
    }
  }
  .houseList {
    overflow: auto;
    width: 907px;
    height: 665px;
    background: linear-gradient(
      180deg,
      rgba(14, 125, 210, 1),
      rgba(4, 70, 179, 1)
    );
    ul {
      .noBorder {
        border-right: 0;
      }
      li {
        width: 225px;
        height: 111px;
        border-right: 2px solid #a1cefe;
        border-bottom: 2px solid #a1cefe;
        float: left;
        text-align: center;
        cursor: pointer;
        p {
          width: 96px;
          height: 36px;
          border-radius: 0 0 4px 4px;
          font-size: 24px;
          color: #fff;
          text-align: center;
          line-height: 36px;
          margin: 0 auto 1px;
          cursor: pointer;
        }
        span {
          font-size: 35px;
          font-weight: 900;
          color: #fff;
        }
        .self {
          background: #24cfcb;
        }
        .rent {
          background: #e57646;
        }
        .Idle {
          background: #4c535c;
        }
      }
    }
  }
}

/* 详情弹窗 */
.tab-box {
  .tit-text {
    font-size: 16px;
    padding-left: 8px;
    margin-bottom: 10px;
  }

  .info-box {
    display: flex;
    flex-wrap: wrap;
    padding: 14px 8px;
    margin-bottom: 10px;
    background: #4873d4;
    border-radius: 10px;

    .info-item {
      width: 33%;
      margin: 7px 0;
    }

    .people-item {
      display: flex;
      align-items: flex-start;
      /*flex-wrap: wrap;*/
      margin-bottom: 10px;
      font-size: 12px;
      width: 33.333%;
      cursor: pointer;
      .right-box {
        .text-line {
          margin: 6px 0;
        }
      }

      .people-img {
        width: 88px;
        height: 100px;
        object-fit: cover;
        margin: 10px 8px;
      }

      .car-img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 10px;
      }
    }
  }

  .people-box {
    justify-content: flex-start;
  }

  .bottom-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .title {
    margin-top: 13px;
    margin-bottom: 32px;
    margin-left: 10px;

    p {
      width: 6px;
      height: 16px;
      float: left;
      background: linear-gradient(
        0deg,
        rgba(59, 169, 230, 1),
        rgba(95, 201, 251, 1)
      );
      box-shadow: 0px 3px 7px 0px rgba(225, 238, 249, 0.12);
      border-radius: 2px;
      margin-right: 10px;
    }

    span {
      float: left;
      font-size: 16px;
      line-height: 16px;
      color: #fff;
    }
  }
}
</style>