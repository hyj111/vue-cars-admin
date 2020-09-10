import Vue from 'vue'
import VueAMap from 'vue-amap';
//引入高德地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    // 高德key
    key: '9435ee7e9b38fab55953ada90889b98c', // 自己到官网申请，我随便写的
    // 插件集合 （插件按需引入）
    plugin: ['AMap.Marker','AMap.Geocoder'],
    v: '1.4.15', // 我也不知道为什么要写这个，不写项目会报错，而且我随便写的，跟我下载的版本对应不了
    uiVersion: '1.0.11' // ui版本号，也是需要写
})