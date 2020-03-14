<template>
  <div class="map">
    <div id="map"></div>
    <!-- 小区房屋弹窗 -->
    <div class="house">
      <el-dialog :visible.sync="dialogHouseListVisible">
        <div class="houseInfo">
          <img src="@static/image/houseHeader.png" alt />
          <p class="tower">{{houseName}}</p>
          <li class="element">
            <p v-for="cell in cellList" :key="cell.index" >
               <span :class="{active:cellId==cell.cellId}" @click="switchCell(cell.cellId)">{{cell.cellName}}</span>
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
              <li v-for="i in (4-(item.roomList.length%4==0?4:item.roomList.length%4))" :key="i.index">
                
              </li>
              <!-- <li>
                <p class="Idle">自住</p>
                <span>1801</span>
              </li>
              <li class="noBorder">
                <p class="self">自住</p>
                <span>1801</span>
              </li> -->
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
          <li class="people-item" v-for="(item,index) in peopleData.list" :key="index" @click="router(item.personId)">
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
      check: state => state.commonData.check
    }),
    ...mapState({
      url: state => state.commonData.url
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
      cellList:[],//单元列表
      cellId: "",//单元id
      roomId: "",
      floorList: [],
      houseName:"",
      dialogTableVisible: false,
      map: null,
      communityPolygon: [
        /* [120.229497, 35.964368],
        [120.232551, 35.965624],
        [120.234393, 35.962411],
        [120.230296, 35.960738] */
      ],
      houseListInfo: {
        houseMarker: [],
        buildingNo: [],
        buildingCode: []
      },
      monitoringListInfo: {
        monitoringMarker: [],
        gbCode: [],
        gbCodeseq:[]
      },
      FaceMarker: [
        /* [120.231869, 35.96339],
        [120.231042, 35.961914],
        [120.230979, 35.964514] */
      ],
      carMarker: [
       /*  [120.231869, 35.96339],
        [120.231042, 35.961914],
        [120.230979, 35.964514] */
      ]
    };
  },
  watch: {
    check() {
      switch (this.check) {
        case "小区":
          this.communityInfo();
          //this.community();
          //console.log(111);
          break;
        case "房屋":
          this.houseInfo();
          //this.house();
          break;
        case "监控":
          this.monitoringInfo();
          break;
        case "人脸":
          this.personMonitoringInfo();
          break;
        case "车辆":
          this.carMonitoringInfo();
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    /* this.communityInfo();
    this.houseInfo();
    this.monitoringInfo();
    this.personMonitoringInfo();
    this.carMonitoringInfo(); */
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    //新加需求跳转到详情页面
    router(id){
      this.$router.push({name:"PersonRecord",query:{id:id}})
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
    houseList(e) {
      //点击楼号获取楼号基本信息
      if(e){
        this.buildingCode = e.target.customData.buildingCode;
        this.cellId = ""
      }
     
      this.$axios({
        method: "get",
        url:
          "http://" + this.url + ":9000/sjwl/webapi/house/roomByBuilding/list",
        params: {
          areaId: 0,
          buildingCode:this.buildingCode,
          cellId:this.cellId
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
          this.houseName  = res.data.data.xqName+res.data.data.buildingName
          if(e){
            this.cellId = res.data.data.cellList[0].cellId;//默认一单元
            //console.log(111)
          }
          this.dialogHouseListVisible = true;
        }
      });
      // this.dialogHouseListVisible = true;
      //console.log(e.target.customData.id);
    },
    switchCell(cellId){
      //切换单元
      this.cellId = cellId;
      this.houseList()
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
        url:
          "http://" + this.url + ":9000/sjwl/webapi/capture/play",
        params: {
          areaId: 0,
          gbCode:e.target.customData.gbCode,
          gbCodeseq:e.target.customData.gbCodeseq,
        },
        headers: {
          Authorization: sessionStorage.getItem("Authorization")
        }
      }).then(res => {
        console.log(res);
        loadingInstance.close();
        if (res.data.code == 1000) {
          this.$store.state.commonData.videoUrl = res.data.data.FLV
          this.$store.state.commonData.videoShow = true;
        }else{
          this.$store.state.commonData.errorMsg.unshift(res.data.msg)
        }
      });
    },
    /* 高德坐标转百度 */
    bd_encrypt(gg_lng, gg_lat) {
      var X_PI = (Math.PI * 3000.0) / 180.0;
      var x = gg_lng,
        y = gg_lat;
      var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
      var bd_lng = (z * Math.cos(theta) + 0.0065).toFixed(6) - 0;
      var bd_lat = (z * Math.sin(theta) + 0.006).toFixed(6) - 0;
      return [bd_lng, bd_lat];
      /* {
        bd_lat: bd_lat,
        bd_lng: bd_lng
    }; */
    },
    communityInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/xq/list",
        params: {
          areaId: 0,
          page: 1,
          limit: 10000
        }
      }).then(res => {
        //console.log(res);
        if (res.data.code == 1000) {
          //this.info = res.data.data
          if (this.map.getOverlays()) {
            this.map.clearOverlays(); //添加之前先清空
          }
          /* 数据整合存储 */
          this.communityPolygon = []
          res.data.data.list.forEach(item => {
            var location = this.bd_encrypt(
              item.location.split(",")[0],
              item.location.split(",")[1]
            );
            this.communityPolygon.push({
              location: location,
              polygonArr: eval("(" + "[" + item.locationArea + "]" + ")"), //可以用json.parse
              xqName: item.xqName,
              xqCode: item.xqCode
            });
            //console.log(this.bd_encrypt(item.location.split(",")[0],item.location.split(",")[1]))
          });
          /* 循环渲染每个小区 */
          this.communityPolygon.forEach(item => {
            this.community(item);
          });
        }
      });
    },
    houseInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/house/building/list",
        limit: 1000000,
        page: 1
      }).then(res => {
        if (res.data.code == 1000) {
          //this.info = res.data.data
          this.houseMarker = []
          /* 坐标转换 */
          res.data.data.list.forEach(item => {
            var marker = this.bd_encrypt(
              item.buildingAddr.split(",")[0],
              item.buildingAddr.split(",")[1]
            );
            this.houseListInfo.houseMarker.push(marker);
            this.houseListInfo.buildingNo.push(item.buildingName);
            this.houseListInfo.buildingCode.push(item.buildingCode);
          });
          /* 一次性渲染所有楼栋 */
          this.house();
        }
        console.log(res);
      });
    },
    monitoringInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/capture",
        params: {
          areaId: 0,
          deviceType: ""
        }
      }).then(res => {
        console.log(res)
        if (res.data.code == 1000) {
          //this.info = res.data.data
          this.monitoringMarker = [];
          /* 坐标转换 */
          res.data.data.forEach(item => {
            var marker = this.bd_encrypt(
              item.deviceLocation.split(",")[0],
              item.deviceLocation.split(",")[1]
            );
            this.monitoringListInfo.monitoringMarker.push(marker);
            this.monitoringListInfo.gbCode.push(item.gbCode);
            this.monitoringListInfo.gbCodeseq.push(item.gbCodeseq);
          });
          /* 一次性渲染所有摄像头 */
          this.monitoring();
          
        }
       //console.log(res);
      });
    },
    personMonitoringInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/capture",
        params: {
          areaId: 0,
          deviceType: 0
        }
      }).then(res => {
        //console.log(res);
        if (res.data.code == 1000) {
          this.FaceMarker = [];
          /* 坐标转换 */
          res.data.data.forEach(item => {
            var marker = this.bd_encrypt(
              item.deviceLocation.split(",")[0],
              item.deviceLocation.split(",")[1]
            );
            this.FaceMarker.push(marker);
          });
          /* 一次性渲染所有摄像头 */
          this.mapFace();
          //this.info = res.data.data
        }
      });
    },
    carMonitoringInfo() {
      this.$axios({
        method: "get",
        url: "http://" + this.url + ":9000/sjwl/webapi/capture",
        params: {
          areaId: 0,
          deviceType: 1
        }
      }).then(res => {
        //console.log(res);
        if (res.data.code == 1000) {
           this.carMarker = [];
          /* 坐标转换 */
          res.data.data.forEach(item => {
            var marker = this.bd_encrypt(
              item.deviceLocation.split(",")[0],
              item.deviceLocation.split(",")[1]
            );
            this.carMarker.push(marker);
          });
          /* 一次性渲染所有摄像头 */
          this.mapCar();
          //this.info = res.data.data
        }
        
      });
    },
    /* 地图初始化 */
    initMap() {
      // 百度地图
      this.map = new BMap.Map("map", { minZoom: 8, maxZoom: 18 }); //实例化百度地图
      /* var point = new BMap.Point(120.23168,35.963083);//声明中心点
      this.map.centerAndZoom(point, 17);//设置中心位置，层级 */
      this.map.enableScrollWheelZoom(true); //允许拖动缩放
      this.communityInfo();
    },
    community(item) {
      /* 多边型框选小区 */
      //添加文本标签
      var point = new BMap.Point(...item.location);
      var opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-30, -20) //设置文本偏移量
      };
      var label = new BMap.Label(item.xqName, opts); // 创建文本标注对象
      label.setStyle({
        color: "#fff",
          fontSize: "18px",
          height: "48px",
          /* width: "80px", */
          lineHeight: "48px",
          border: 0,
          borderRadius: "10px",
          padding: "0 10px",
          background: "#24CFCB",
          zIndex: "100000",
          textAlign: "center",
          marginLeft:"-30px"
      });
      label.customData = { xqCode: item.xqCode }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
      label.addEventListener("click", this.communityRouter);
      this.map.addOverlay(label);
      var polygonArr = [];
      for (var i = 0; i < item.polygonArr.length; i++) {
        /* 坐标转换 */
        var BMapPolygonArr = this.bd_encrypt(
          item.polygonArr[i][0],
          item.polygonArr[i][1]
        );
        polygonArr.push(new BMap.Point(...BMapPolygonArr));
      }
      var polygon = new BMap.Polygon(polygonArr, {
        strokeColor: "blue",
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: "skyblue"
      }); //创建多边形
      polygon.customData = { xqCode: item.xqCode }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
      polygon.addEventListener("click", this.communityRouter);
      this.map.addOverlay(polygon); //增加多边形
      let mapViewObj = this.map.getViewport(polygonArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
      //this.map.setViewport(point);
    },
    communityRouter(e) {
      //小区覆盖物点击跳转事件
      //console.log(e.target.customData.id);
      this.$router.push({name:"SingleCommunity",query:{xqCode:e.target.customData.xqCode}});
    },
    house() {
      //先清空
      this.map.clearOverlays();
      var houseMarkerArr = [];
      for (var i = 0; i < this.houseListInfo.houseMarker.length; i++) {
        houseMarkerArr.push(new BMap.Point(...this.houseListInfo.houseMarker[i]));
        var pt = new BMap.Point(...this.houseListInfo.houseMarker[i]);
        var myIcon = new BMap.Icon(
          "./static/image/mapHome.png",
          new BMap.Size(38, 76)
        );
        var houseMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        houseMarker.customData = { buildingCode: this.houseListInfo.buildingCode[i] }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
        houseMarker.addEventListener("click", this.houseList);
        this.map.addOverlay(houseMarker); // 将标注添加到地图中
      }
      //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
      let mapViewObj = this.map.getViewport(houseMarkerArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
    },
    monitoring() {
      //先清空
      this.map.clearOverlays();
      var monitoringMarkerArr = [];
      for (
        var i = 0;
        i < this.monitoringListInfo.monitoringMarker.length;
        i++
      ) {
        monitoringMarkerArr.push(
          new BMap.Point(...this.monitoringListInfo.monitoringMarker[i])
        );
        var pt = new BMap.Point(...this.monitoringListInfo.monitoringMarker[i]);
        var myIcon = new BMap.Icon(
          "./static/image/mapMonitoring.png",
          new BMap.Size(38, 76)
        );
        var monitoringMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        monitoringMarker.customData = {
          gbCode: this.monitoringListInfo.gbCode[i],
          gbCodeseq:this.monitoringListInfo.gbCodeseq[i],
        }; //自定义参数id,很关键百度不支持直接传参，闭包策略不适用
        monitoringMarker.addEventListener("click", this.playVideo);
        this.map.addOverlay(monitoringMarker); // 将标注添加到地图中
      }
      //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
      let mapViewObj = this.map.getViewport(monitoringMarkerArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center, mapViewObj.zoom);
    },
    mapFace() {
      //先清空
      this.map.clearOverlays();
      var FaceMarkerArr = [];
      for (var i = 0; i < this.FaceMarker.length; i++) {
        FaceMarkerArr.push(new BMap.Point(...this.FaceMarker[i]));
        var pt = new BMap.Point(...this.FaceMarker[i]);
        var myIcon = new BMap.Icon(
          "./static/image/mapFace.png",
          new BMap.Size(38, 76)
        );
        var FaceMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        this.map.addOverlay(FaceMarker); // 将标注添加到地图中
      }
      //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
      let mapViewObj = this.map.getViewport(FaceMarkerArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
    },
    mapCar() {
      //先清空
      this.map.clearOverlays();
      var carMarkerArr = [];
      for (var i = 0; i < this.carMarker.length; i++) {
        carMarkerArr.push(new BMap.Point(...this.carMarker[i]));
        var pt = new BMap.Point(...this.carMarker[i]);
        var myIcon = new BMap.Icon(
          "./static/image/mapCar.png",
          new BMap.Size(38, 76)
        );
        var carMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        this.map.addOverlay(carMarker); // 将标注添加到地图中
      }
      //this.map.setViewport(houseMarkerArr);//两种方法都可自适应
      let mapViewObj = this.map.getViewport(carMarkerArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center,  mapViewObj.zoom);
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  //float: left;
  width: 1038px;
  height: 600px;
  //background:red;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  #map {
    width: 100%;
    height: 100%;
  }
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
    background:url(../../../../static/image/houseHeader2.png);
    p{
      display: inline;
    }
    >p:last-child span:last-child{
      display: none;
    }
    .active{
      color:#a1cefe;
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
  }
}
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