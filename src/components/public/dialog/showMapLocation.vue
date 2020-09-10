<template>
  <!-- dialog弹窗 -->
  <el-dialog
    :title="parking_data.parkingName"
    :visible.sync="isShow"
    @close="close"
    @opened="opened"
    append-to-body
  >
    <div style="height:500px">
      <AMap ref="aMap" :options="option_map"></AMap>
    </div>
  </el-dialog>
</template>

<script>
import AMap from "@/views/amap/amap";
export default {
  name: "showMapLocation",
  components: {
    AMap
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    parking_data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
       // 地图配置
      option_map: {
        mapLoad: false
      },
      // 弹窗的关闭和显示
      isShow: this.dialogVisible,
      form: {
        parking_name: "",
        area: "",
        type: ""
      }
    };
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      // console.log("新的"+newvalue);
      // console.log("旧的"+oldvalue);
      this.isShow = newvalue;
    }
  },
  methods: {
    // 反向修改父组件的数据
    close() {
      this.$refs.aMap.mapDestory();
      this.$emit("close");
    },
    // 弹窗开启触发事件
 opened(){
      this.$refs.aMap.mapCreate();
      // 调DOM元素的方法时，要确保DOM元素已被加载完成
      this.$nextTick(() => { // DOM元素渲染完成后执行
        const splitLnglat = this.parking_data.lnglat.split(",");
        const lnglat = {
            lng: splitLnglat[0],
            lat: splitLnglat[1]
        }
        this.$refs.aMap.setMarker(lnglat);
      })
    },
    
  }
};
</script>

<style scoped>
</style>

