<template>
  <div class="amap-wrap">
    <el-amap vid="amapContainer"  :events="events" class="amap-demo"></el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { getLngLat, amapsetMarker, amapClearMarker } from "./common";
import { addressSetMapCenter } from "./location";
export default {
  name: "amap",
  data() {
    return {
      // 经纬度
      lnglat: {},
      map: null,
      zoom: 15,
      events: {}
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },

  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      // your code ...
      this.mapCreate();
      this.map.on("click", e => {
        this.lnglat = getLngLat(e);
        this.$emit("lnglat", this.lnglat);
        // 设置点覆盖物
        this.setMarker();
      });
    });
  },
  methods: {
    setMapCenter(value) {
      addressSetMapCenter(value, this.map);
    },
    // 设置点覆盖物
    setMarker(lnglat) {
      amapsetMarker(lnglat || this.lnglat, this.map);
    },
    // 清除点覆盖物
    clearMarker() {
      amapClearMarker(this.map);
    },
    //地图的销毁
    mapDestory() {
      this.map && this.map.destroy();
    },
    // 创建地图
    mapCreate(params) {
      this.map = new AMap.Map("amapContainer", {
        center: [116.404765, 39.918052],
        zoom: this.zoom //初始化地图层级
      });
      this.map.on("complete", () => {
        this.mapLoad();
      });
    },
    mapLoad() {
      
      if (this.options.mapLoad) {
        this.$emit("mapLoad");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-wrap {
  height: 100%;
}
</style>

