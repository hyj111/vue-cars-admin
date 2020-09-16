<template>
  <div>
    <el-button
      :type="cars_list_type_id == item.id?'danger':''"
      size="small"
      v-for="item in cars_list_basis_item"
      :key="item.id"
      @click="getTypeList(item)"
    >{{item.value}}</el-button>
  </div>
</template>

<script>
import { GetCarsTypeBasis, GetCarsTypeList } from "@/api/carsAtts";
export default {
  name: "carsBasisAttr",
  data() {
    return {
      //   车辆公用属性列表
      cars_list_basis_item: [],
      //   车辆公用属性id
      cars_list_type_id: "",
      //   当前公用属性数据
      current_cars_type_data: {}
    };
  },
  beforeMount() {
    this.getCarsTypeBasis();
  },
  methods: {
    // 获取车辆公用属性
    getCarsTypeBasis() {
      GetCarsTypeBasis().then(res => {
        const data = res.data.data.data;
        this.cars_list_basis_item = data;
      
      });
    },
    // 点击时候触发
    getTypeList(data) {
      this.cars_list_type_id = data.id;
      //   存储当前数据
      this.current_cars_type_data = data;
      // 获取自定义属性
      this.getAttrList()
    },
    // 获取自定义属性
    getAttrList(){
      GetCarsTypeList({typeId:this.current_cars_type_data.id}).then(res=>{
       this.$emit("getAttrList",{
         attr_data:res.data.data.data,//公用属性下面的自定义属性
         attr_basis_data: this.current_cars_type_data //公用属性
       })
      })
    }
  }
};
</script>

<style>
</style>
