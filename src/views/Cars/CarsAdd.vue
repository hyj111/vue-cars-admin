<template>
  <div>
    <VueForm :formItem="form_item" :form_handler="form_handler" ref="vuForm" :formData="form"></VueForm>

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="车辆品牌">
        <el-cascader v-model="form.area" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      </el-form-item>

      <el-form-item label="车辆型号">
        <el-cascader v-model="form.area" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      </el-form-item>

      <el-form-item label="停车场">
        <el-cascader v-model="form.area" :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
      </el-form-item>

      <el-form-item label="车牌号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="车架号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="发动机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="年检">
        <el-radio-group v-model="form.resource">
          <el-radio label="已检"></el-radio>
          <el-radio label="未检"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="保养日期">
        <el-row :gutter="30">
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="16">下次保养日期：2020-11-11</el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="档位">
        <el-radio-group v-model="form.resource">
          <el-radio label="自动挡"></el-radio>
          <el-radio label="手动档位"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="能源类型">
        <el-radio-group v-model="form.energy">
          <el-radio :label="1">电</el-radio>
          <el-radio :label="2">油</el-radio>
          <el-radio :label="3">混合动力</el-radio>
        </el-radio-group>
        <div class="progress-bar-wrap" v-if="form.energy==1||form.energy==3">
          <span class="label-text">电量</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width:50%">
                  <label>90%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="small" value="100"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="progress-bar-wrap" v-if="form.energy==2||form.energy==3">
          <span class="label-text">油量</span>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="progress-bar">
                <span style="width:50%">
                  <label>90%</label>
                </span>
              </div>
            </el-col>
            <el-col :span="2">
              <el-input size="small" value="100"></el-input>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="禁启用">
        <el-radio-group v-model="form.resource">
          <el-radio label="禁用"></el-radio>
          <el-radio label="启用"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="车辆属性">
        <div class="cars-attr-list" v-for="(item, index) in cars_attr" :key="item.key">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-input value="100"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input value="100"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-if="index == 0" @click="addCarsAttr">+</el-button>
              <el-button v-else>-</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="座位">
        <el-radio-group v-model="form.resource">
          <el-radio label="2人座"></el-radio>
          <el-radio label="4人座"></el-radio>
          <el-radio label="7人座"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="车辆描述">
        <div ref="editorDom" style="text-align: left;"></div>
      </el-form-item>

      <el-form-item>
        <el-button>确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCarsBrand,getParking} from "@/api/common"
import VueForm from "components/public/form/form";
// 富文本编辑器
import Editor from "wangeditor";
export default {
  name: "CarsAdd",
  components: { VueForm },
  data() {
    return {
      // 富文本对象
      editor: null,

      cars_attr: [
        { key1: 111, value1: 222 },
        { key2: 111, value2: 222 },
        { key3: 111, value3: 222 },
        { key4: 111, value4: 222 }
      ],
      // 表单配置
      form_item: [
        {
          type: "select",
          label: "车辆品牌",
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          select_vlaue: "id", // 自有的私有属性
          select_label: "nameCh",
          options: []
        },
         { 
          type: "select", 
          label: "停车场", 
          placeholder: "请选择停车场",
          select_vlaue: "id",   // 自有的私有属性
          select_label: "parkingName",
          prop: "parkingId",
          options: []
        },
        { 
          type: "input", 
          label: "车辆型号", 
          placeholder: "请输入车辆型号",
          prop: "carsMode"
        },
        { 
          type: "input", 
          label: "车牌号", 
          placeholder: "请输入车牌号",
          prop: "carsNumber"
        },
        { 
          type: "input", 
          label: "车架号", 
          placeholder: "请输入车架号",
          prop: "carsFrameNumber"
        },
        { 
          type: "input", 
          label: "发动机号", 
          placeholder: "请输入发动机号",
          prop: "engineNumber"
        },
        { 
          type: "radio", 
          label: "年检", 
          placeholder: "请选择年检",
          prop: "yearCheck",
          options: this.$store.state.config.year_check
        },
        { 
          type: "slot", 
          slotName: "maintain", 
          prop:"maintainDate", 
          label: "保养日期"
        },
        { 
          type: "radio", 
          label: "档位", 
          placeholder: "请选择档位",
          prop: "gear",
          options: this.$store.state.config.gear
        },
        { 
          type: "slot", 
          slotName: "energy", 
          prop:"energyType", 
          label: "能源类型"
        },
        { 
           type: "radio",
          label: "禁启用",
          prop: "status",
          required:true,
          options: this.$store.state.config.radio_disabled
        },
        { 
          type: "slot", 
          slotName: "carsAttr", 
          prop:"carsAttr", 
          label: "车辆属性"
        },
        { 
          type: "Slot", 
          slotName: "content", 
          prop:"content", 
          label: "车辆描述"
        },
      
      ],
      // 按钮配置
      form_handler: [
        { label: "确定", type: "danger", handler: () => this.onSubmit() },
        { label: "重置", type: "" }
      ],
      form: {
        parkingId: "",
        carsBrandId: "",
        carsMode: "",
        carsNumber: "",
        carsFrameNumber: "",
        engineNumber: "",
        yearCheck: true,
        gear: 1,
        energyType: 2,
        electric: 100,
        oil: 100,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: true
      },
      // 车辆品牌列表
      carsBrandList:[],
      options: []
    };
  },
  beforeMount(){
    this.GetCarsBrandList(),
    this.GetParking()
  },
  mounted() {
    this.createEditor();
  },
  methods: {
    addCarsAttr() {
      this.cars_attr.push({ key4: 111, value4: 222 });
    },
    onSubmit() {
      console.log("submit!");
    },
    // 创建富文本对象
    createEditor() {
      this.editor = new Editor(this.$refs.editorDom);
      this.editor.customConfig.onchange = html => {};
      this.editor.create(); // 创建富文本实例
    },
    // 获取车辆品牌
    GetCarsBrandList(){
      getCarsBrand().then(res=>{
        const data = res.data.data.data
        if(data){
          const carsBrand = this.form_item.filter(item => item.prop == "carsBrandId");
         
          if(carsBrand.length > 0) {
            carsBrand[0].options = data;
          }
          
        }
      })
    },
    // 获取停车场
    GetParking(){
       getParking().then(res=>{
        const data = res.data.data.data
       if(data) {
          const parking = this.form_item.filter(item => item.prop == "parkingId");
          if(parking.length > 0) {
            parking[0].options = data;
          }
          console.log(parking);
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>

