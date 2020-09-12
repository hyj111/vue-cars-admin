<template>
  <div>
    <el-cascader
      v-model="value"
      :options="cascader_options"
      :props="cascader_props"
      @change="changeValue"
      ref="cascaderAddr"
      :placeholder="initValue"
    ></el-cascader>
  </div>
</template>

<script>
import { GetCity } from "@/api/common";
export default {
  name: "CityArea",
  data() {
    const _this = this
    return {
      addressDate:{},
      address:[],
      value: "",
      cascader_options: [],
      cascader_props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          // 请求参数
          const requestData = {};
          // 声明自定义配置
          const jsonType = {
            0: { type: "province" },
            1: { type: "city", code: "province" },
            2: { type: "area", code: "city" }
          };

          //   type
          requestData.type = jsonType[level].type;
          // code
          if (jsonType[level].code) {
            requestData[`${jsonType[level].code}_code`] = node.value;
          }

          // 省市区的接口
          GetCity(requestData).then(res => {
            const data = res.data.data.data;

            const type = jsonType[level].type.toUpperCase()

            for(let item of data) {
              item.value = item[`${type}_CODE`]
              item.label = item[`${type}_NAME`]
               // 给这个节点添加了leaf属性就不会往下请求了
                // item.leaf = true
                item.leaf = level >= 2;
            }
            // 返回节点数据
            resolve(data);
          })
          // 获取address
 
         
        }
      },
      initValue:"请选择省市区"
    };
  },
  methods: {
    // 初始化默认值
    initDefault(value){
      if(value){
        this.initValue = value.split(",").join(" / ")
      }
    },
    changeValue(value) {
      this.$emit("getcity", value.join());
      this.$emit("update:cityAreaValue", value.join());
      // 获取中文地址
      if(this.mapLocation){
        this.address = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels
      this.$emit("callback",this.address.join(""))
      }
      
    },
    clear(){
      this.value = ""
    }
  },
  props:{
    mapLocation:{
      type:Boolean,
      default:false
    }
  }
};
</script>

<style>
</style>