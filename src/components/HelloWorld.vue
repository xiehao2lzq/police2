<template>
  <div id="map">
    <div class="test"></div>
    <div class="test1"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  mounted() {
    /* this.$nextTick(() => {
      // 百度地图
      var map = new BMap.Map("map",{minZoom:1,maxZoom:18});
      var point = new BMap.Point(120.231788, 35.963083);
      map.centerAndZoom(point, 14);
      // map.addControl(new BMap.NavigationControl());
      map.enableScrollWheelZoom(true);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      var polygon = new BMap.Polygon(
        [
          new BMap.Point(120.047994, 36.000467),
          new BMap.Point(120.121009, 35.996262),
          new BMap.Point(120.182525, 35.955136),
          new BMap.Point(120.12762, 35.923109),
          new BMap.Point(120.039946, 35.922875)
        ],
        { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 ,fillColor:"skyblue"}
      ); //创建多边形
      map.addOverlay(polygon); //增加多边形
     // map.setMapStyle({style:'darkgreen'})
    }); */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.test1 {
  width: 1200px;
  height: 900px;
  /* background: #000; */
  background: linear-gradient(-135deg, transparent 30px, #000 0); //切角效果
  position: absolute;
  z-index: 1;
}
/* .test{
  width: 1200px;
  height: 900px;
  position: absolute;
  background:linear-gradient(to right,#0B4CEB,#193173);
} */
</style>>

