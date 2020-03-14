<template>
  <div>
    <div  v-if="videoShow" class="bg" @click.self="hide">
        <Flv/>
    </div>
    <Header/>
    <LeftBox />
    <div class="centerBox clear">
      <Map />
      <SwitchMap />
    </div>
    <Face />
    <Car />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LeftBox from "./leftBox";
import Map from "./map";
import SwitchMap from "./switchMap";
import Face from "./face";
import Car from "./car";
import Header from "../../common/header";
import Flv from "../../common/flv";
export default {
  components: {
    LeftBox,
    Map,
    SwitchMap,
    Face,
    Car,
    Header,
    Flv
  },
   computed: {
    ...mapState({
      videoShow: state => state.commonData.videoShow
    })
  },
  methods: {
      hide(){
          this.$store.state.commonData.videoShow=false
      }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.$store.state.commonData.animation = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.centerBox {
  float: left;
}
</style>