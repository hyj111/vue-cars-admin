<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-select placeholder="请选择" v-model="search_key" @change="inputEnter">
        <el-option v-for="item in search_options" :label="item.label" :value="item.value" :key="item.value"></el-option>
      </el-select>
    </el-col>
    <el-col :span="16">
      <el-input v-model="search_value" @input="inputEnter"></el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
        return {
            search_value:"",
            search_key:"",
            search_options:[],
            keyword_options:this.$store.state.config.keyword_options
        }
    },
    props :{
        options :{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        initOptions(){
            let optionsItem = [];
            this.options.forEach(item=>{
                const data = this.keyword_options.filter(elem => elem.value == item)
                optionsItem = optionsItem.concat(data)
            })
            this.search_options = optionsItem
        },
        // 输入时
        inputEnter(){
            
            let keyword = {}
            keyword.key = this.search_key
            keyword.value = this.search_value
            this.$emit("update:value",keyword)
        },
        // 清除
        clear(){
            this.search_key = "",
            this.search_value =""
        }
    },
    watch:{
        options:{
            handler(newValue){
                this.initOptions()
            },
            immediate:true
        }
    }
};
</script>

<style>
</style>