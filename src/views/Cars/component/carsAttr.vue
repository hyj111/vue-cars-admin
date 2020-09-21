<template>
  <div>
    <carsBasisAttr @getAttrList="getAttrList"></carsBasisAttr>
    {{countKm}}
    <el-row :gutter="15">
      <el-col :span="4" v-for="item in attr_data" :key="item.key">
        <span>{{item.value}}</span>
        <el-input :placeholder="item.value" v-model="attr_item[attr_basis_data.key][item.key]"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import carsBasisAttr from "./carsBasisAttr";
export default {
  name: "CarsAttr",
  data() {
    return {
      //   自定义属性数据
      attr_data: [],
      attr_basis_data: {},
      //   数据集合
      attr_item: {}
    };
  },

  components: { carsBasisAttr },
  computed: {
    // 计算公里数
    countKm(){   
      if(this.attr_item.basics&&this.attr_item.carsBody){ 
        // 剩余油量=当前油量百分比*邮箱容积  
        console.log(this.attr_item.carsBody[`Tank volume`]);   
         const surPlusOil = this.oil*this.attr_item.carsBody[`Tank volume`] / 100
        //  公里数=剩余油量/实测消耗油量*100 单位是km
         const Km = surPlusOil/ this.attr_item.basics.true_oli_consume * 100
        // 返回值
        this.$emit('update:countKm',Km.toFixed(2))
      }   
      
    }
  },
  props:{
    initValue: {
      type:String,
      default:""
    },
    oil:{
      type:Number,
      default:0
    }
  },
  watch:{
    initValue:{
      handler(newValue){
        newValue&&  (this.attr_item = JSON.parse(newValue))
      },
      immediate:true
    }
  },
  methods: {
    getAttrList(data) {
      this.attr_basis_data = data.attr_basis_data;
      this.attr_data = data.attr_data;
      this.attrFormat();
    },
    //   数据格式化
    attrFormat() {
      // 自定义属性为空不执行
      if (this.attr_data.length == 0) {
        return false;
      }
      // 公共属性的key
      const attrBasisKey = this.attr_basis_data.key;
      //   判断属性集合是否存在公共属性的key
      if (this.attr_item[attrBasisKey]) {
        return false;
      }
      // 处理自定义属性
      const attrJson = {};
      this.attr_data.forEach(item => {
          attrJson[item.key] = ""
      });
    //   更新属性集合 
    // 典型问题动态绑定数据后，视图不渲染
    // this.attr_item[attrBasisKey] = attrJson
    // 使用下面这方法可解决
    // this.$set(对象，key，value)
    this.$set(this.attr_item,attrBasisKey,attrJson)
    },
    callbackValue(){
        this.$emit('update:value',JSON.stringify(this.attr_item))
    }
  }
};
</script>

<style>
</style>
