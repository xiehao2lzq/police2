<template>
  <div class="popMap">
    <el-dialog :visible.sync="dialogMapVisible">
      <div id="map"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "popMap",
  props: ["locationArr"],
  data() {
    return {
      dialogMapVisible: false,
      map: null,
      linePoints: [
        [120.229497, 35.964368],
        [120.232551, 35.965624],
        [120.234393, 35.962411],
        [120.230296, 35.960738]
      ],
      person:true
    };
  },
  mounted() {},
  methods: {
    close(val) {
      this.dialogMapVisible = true;
      if(val){
        this.person = true
      }else{
        this.person = false
      }
      this.$nextTick(() => {
        this.initMap();
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
    /* 地图初始化 */
    initMap() {
      // 百度地图
      this.map = new BMap.Map("map", { minZoom: 14, maxZoom: 18 }); //实例化百度地图
      var point = new BMap.Point(120.23168, 35.963083); //声明中心点
      this.map.centerAndZoom(point, 18); //设置中心位置，层级
      this.map.enableScrollWheelZoom(true); //允许拖动缩放
      /* var driving = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});
      driving.search(this.linePoints[0], this.linePoints[3],{waypoints:[this.linePoints[1],this.linePoints[2]]});//waypoints表示途经点 */
      this.polyline();
    },

    polyline() {
      // console.log(this.locationArr);
      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: 2 //设置线宽
      });
      //sy.disableMassClear()//不允许清除
      var icons = new BMap.IconSequence(sy, "5%", "5%", false); //设置为true，可以对轨迹进行编辑
       //icons.disableMassClear()//不允许清除
      var PolylineArr = [];
      for (var i = 0; i < this.locationArr.length; i++) {
        /* 去重，字符串转数字 */
        this.locationArr[i][0] = this.locationArr[i][0] * 1;
        this.locationArr[i][1] = this.locationArr[i][1] * 1;
      }
      for (var i = 0; i < this.locationArr.length - 1; i++) {
        /* 去重，字符串转数字 */
        if (
          this.locationArr[i][0] == this.locationArr[i + 1][0] &&
          this.locationArr[i][1] == this.locationArr[i + 1][1]
        ) {
          this.locationArr.splice(i + 1, 1);
          i--;
        }
      }
      this.locationArr.forEach(item => {
        var point = this.bd_encrypt(...item);
        PolylineArr.unshift(new BMap.Point(...point));
      });
      /*  console.log( [
          new BMap.Point(120.229497, 35.964368),
          new BMap.Point(120.232551, 35.965624),
          new BMap.Point(120.234393, 35.962411),
          new BMap.Point(120.230296, 35.960738),
          new BMap.Point(120.229607, 35.994378)
        ]); */
      var polyline = new BMap.Polyline(PolylineArr, {
        strokeColor: "#18a45b", //设置颜色
        strokeWeight: 8, //宽度
        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
        enableEditing: false, //是否启用线编辑，默认为false
        enableClicking: false, //是否响应点击事件，默认为true
        icons: [icons]
      }); //创建折线
      polyline.disableMassClear(); //不被清除
      this.map.addOverlay(polyline);
      let mapViewObj = this.map.getViewport(PolylineArr); //视野自适应
      this.map.centerAndZoom(mapViewObj.center, mapViewObj.zoom);
      var i = 0;
      //console.log(PolylineArr);
      var timer = setInterval(() => {
        /* console.log(111);
        console.log(PolylineArr); */
        var pt = PolylineArr[i];
        if(this.person){
          var myIcon = new BMap.Icon(
          "./static/image/movePerson.png",
          new BMap.Size(56, 76)
        );
        }else{
          var myIcon = new BMap.Icon(
          "./static/image/moveCar.png",
          new BMap.Size(56, 76)
        );
        }
        var moveMarker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        this.map.addOverlay(moveMarker); // 将标注添加到地图中
        if (i == PolylineArr.length - 1) {
          clearInterval(timer);
          return false
        }
        setTimeout(() => {
          this.map.removeOverlay(moveMarker);
        }, 500);
        i++;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 1367px;
  height: 794px;
  margin: 50px auto;
  //background: rebeccapurple;
  border-radius: 10px;
}
</style>