<template>
  <div class="video">
    <video
      class="video-component"
      ref="videoElement"
      controls
      autoplay
    >Your browser is too old which doesn't support HTML5 video.</video>
  </div>
</template>
<script>
import flvjs from "flv.js";
import {mapState} from "vuex"
export default {
  name: "Video",
  props: {
    types: {
      type: String,
      default: "flv"
    },
    /* url: {
      types: String,
      default: "http://10.10.5.150:8090/sms/34020000002020000001/flv/hls/34020000001320000001_34020000001320000001.flv"
    } */
  },
  computed: {
    ...mapState({
      url:state=>state.commonData.videoUrl
    })
  },
  data() {
    return {
      flvPlayer: null
    };
  },
  watch: {
    url() {
      if (this.flvPlayer) {
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
      }
      this.createVideo();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo();
    });
  },
  methods: {
    createVideo() {
      const videoElement = this.$refs.videoElement;
      this.flvPlayer = flvjs.createPlayer({
        type: this.types,
        url: this.url
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
    }
  }
};
</script>
<style lang="scss" scoped>
    .video{
        width: 1000px;
        height: 600px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 1000000;
        overflow: hidden;
        video{
            width: 100%;
            height: 100%;
        }
    }
</style>