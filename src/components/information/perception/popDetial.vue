<template>
  <div class="map">
    <div class="tab-box">
        <el-dialog title :visible.sync="dialogTableVisible" width="910px" top="3vh" border="true">
      <div class="title clear">
        <p></p>
        <span>一房一档</span>
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
        <li class="people-item" v-for="(item,index) in peopleData.list" :key="index" @click="personRecord(item.ownerId)">
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
import {mapState} from "vuex";
export default {
 name:"popDetial",
 computed: {
   ...mapState({
       url:state=>state.commonData.url
   })  
 },
  data() {
    return {
      src: require("@static/image/person.png"),
      src2: require("@static/image/carNoImage.png"),
      houseStatus: "", //房屋状态选中值
      roomData: "", //弹窗基本信息
      peopleData: "", //弹窗人员信息
      carData: "", //弹窗车辆数据
      gridData: [], //弹窗内表格数据
      dialogTableVisible:false
    };
  },
  methods: {
    personRecord(id) {
      //console.log(row);
      this.$router.push({ name: "PersonRecord", query: { id: id } });
    },
      //打开详情页弹窗
    openDetails(row) {
      this.dialogTableVisible = true;
      this.getPopoverInfo(row);
      this.getPopoverPeople(row);
      this.getPopoverCar(row);
      this.getPopoverPayment(row);
    },
    // 获取弹窗中的基本信息
    getPopoverInfo(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/info`,
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
    getPopoverPeople(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/persons`,
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
    getPopoverCar(row) {
      // 基本信息
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/cars`,
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
    getPopoverPayment(row) {
      this.$axios({
        method: "get",
        url:
          "http://" +
          this.url +
          ":9000/sjwl/webapi" +
          `/house/room/${row.roomId}/payment`,
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code == 1000) {
          //console.log(res.data.data)
          this.gridData = res.data.data.list;
        }
      });
  }
}
}
</script>

<style lang="scss" scoped>
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
    background: #4873D4;
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