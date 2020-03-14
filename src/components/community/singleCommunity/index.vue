<template>
  <div>
    <div  v-if="videoShow" class="bg" @click.self="hide">
        <Flv/>
    </div>
    <Header />
    <LeftBox />
    <Map />
    <Stranger />
    <ForeignerList />
  </div>
</template>

<script>
import { mapState } from "vuex";
import LeftBox from "./leftBox";
import Map from "./map";
import Stranger from "./stranger";
import ForeignerList from "./foreignerList";
import Header from "../../common/header";
import Flv from "../../common/flv";
export default {
  components: {
    LeftBox,
    Map,
    Stranger,
    ForeignerList,
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
  }
};
</script>

<style lang="scss" scoped>
    .bg{
        width: 100%;
        height: 1080px;
        background: rgba($color: #000000, $alpha: 0.3);
        position: fixed;
        z-index: 1000000;
    }
</style>