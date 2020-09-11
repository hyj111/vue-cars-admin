<template>
  <div class="parking-add">
    <VueForm :formItem="form_item" :form_handler="form_handler" ref="vuForm" :formData="form">
      <!-- 保养日期 -->
      <template v-slot:maintain>
        <el-row>
          <el-col :span="6">
            <el-date-picker
              v-model="form.maintainDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">下次保养日期：2020-11-11</el-col>
        </el-row>
      </template>
      <!-- 能源动力 -->
      <template v-slot:energy>
        <el-radio-group v-model="form.energyType" @change="changeEnergyType">
          <el-radio
            v-for="item in energyType"
            :key="item.value"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>

        <div class="progress-bar-wrap" v-if="form.energyType==1||form.energyType==3">
          <span class="label-text">电量</span>
          <el-row>
            <el-col :span="10">
              <el-slider v-model="form.electric" show-input></el-slider>
            </el-col>
          </el-row>
        </div>
        <div class="progress-bar-wrap" v-if="form.energyType==2||form.energyType==3">
          <span class="label-text">油量</span>
          <el-row>
            <el-col :span="10">
              <el-slider v-model="form.oil" show-input></el-slider>
            </el-col>
          </el-row>
        </div>
      </template>
      <!-- 添加汽车属性 -->
      <template v-slot:carsAttr>
        <el-button type="primary" @click="addCarsAttr">添加汽车属性</el-button>
        <div class="cars-attr-list" v-for="(item, index) in cars_attr" :key="item.key">
          <el-row :gutter="10">
            <el-col :span="2">
              <el-input v-model="item.attr_key"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input v-model="item.attr_value"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button @click="delCarsAttr(index)">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </VueForm>
  </div>
</template>

<script>
import { getCarsBrand, getParking } from "@/api/common";
import VueForm from "components/public/form/form";
// 富文本编辑器
import Editor from "wangeditor";
import { CarsAdd,CarsEdit,CarsDetailed } from "@/api/cars";
export default {
  name: "CarsAdd",
  components: { VueForm },
  data() {
    return {
      // 富文本对象
      editor: null,
      // 车辆属性
      cars_attr: [],
      // 表单配置
      form_item: [
        {
          type: "select",
          label: "车辆品牌",
          placeholder: "请选择车辆品牌",
          prop: "carsBrandId",
          select_vlaue: "id", // 自有的私有属性
          select_label: "nameCh",
          required: true,
          options: []
        },
        {
          type: "select",
          label: "停车场",
          placeholder: "请选择停车场",
          select_vlaue: "id", // 自有的私有属性
          select_label: "parkingName",
          prop: "parkingId",
          required: true,
          options: []
        },
        {
          type: "input",
          label: "车辆型号",
          placeholder: "请输入车辆型号",
          required: true,
          prop: "carsNumber"
        },
        {
          type: "input",
          label: "车牌号",
          placeholder: "请输入车牌号",
          required: true,
          prop: "carsMode"
        },
        {
          type: "input",
          label: "车架号",
          placeholder: "请输入车架号",
          required: true,
          prop: "carsFrameNumber"
        },
        {
          type: "input",
          label: "发动机号",
          placeholder: "请输入发动机号",
          required: true,
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
          prop: "maintainDate",
          label: "保养日期",
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
          prop: "energyType",
          label: "能源类型"
        },
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          required: true,
          options: this.$store.state.config.radio_disabled
        },
        {
          type: "slot",
          slotName: "carsAttr",
          prop: "carsAttr",
          label: "车辆属性"
        },
        {
          type: "wangeditor",
          prop: "content",
          label: "车辆描述"
        }
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
        energyType: 1,
        electric: 100,
        oil: 100,
        carsAttr: "",
        content: "",
        maintainDate: "",
        status: true
      },
      // 车辆品牌列表
      carsBrandList: [],
      // 能源类型
      energyType: this.$store.state.config.energyType,
     
      // id
      id: this.$route.query.id,
    };
  },
  beforeMount() {
    this.GetCarsBrandList();
    this.GetParking();
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // 添加车辆属性
    addCarsAttr() {
      this.cars_attr.push({ attr_key: "", attr_value: "" });
    },
    // 删除车辆属性
    delCarsAttr(index) {
      this.cars_attr.splice(index, 1);
    },
    // 提交表单信息
    onSubmit() {  
      this.formatCarsAttr()
      this.$refs.vuForm.$refs.form.validate(valid => {
        if (valid) {
          this.id ? this.editCars() : this.addCars();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取车辆品牌
    GetCarsBrandList() {
      getCarsBrand().then(res => {
        const data = res.data.data.data;
        if (data) {
          const carsBrand = this.form_item.filter(
            item => item.prop == "carsBrandId"
          );

          if (carsBrand.length > 0) {
            carsBrand[0].options = data;
          }
        }
      });
    },
    // 获取停车场
    GetParking() {
      getParking().then(res => {
        const data = res.data.data.data;
        if (data) {
          const parking = this.form_item.filter(
            item => item.prop == "parkingId"
          );
          if (parking.length > 0) {
            parking[0].options = data;
          }
        }
      });
    },
    //切换清零
    changeEnergyType(value) {
      (this.form.oil = 0), (this.form.electric = 0);
    },
    // 车辆属性格式化
    formatCarsAttr() {
      const data = this.cars_attr;
      const carsAttr = {};
      if (data && data.length != 0) {
        data.forEach(item => {
          if (item.attr_key) {
            carsAttr[item.attr_key] = item.attr_value;
          }
        });
        this.form.carsAttr = JSON.stringify(carsAttr);
      }
    },
    // 新增车辆
    addCars(){
      CarsAdd(this.form)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          
          // 重置表单
           this.reset();
        })
    },
    // 车辆修改
    editCars(){
      let requestData = JSON.parse(JSON.stringify(this.form));
      requestData.id = this.id;
      this.btn_loading = true;
      CarsEdit(requestData)
        .then(res => {
          this.btn_loading = false;
          this.$message({
            message: res.data.message,
            type: "success"
          });
       
        })
    },
    // 获取详情
    getDetail() {
      if (this.id) {
        const id = { id: this.id };
        CarsDetailed(id).then(res => {
          const data = res.data.data;
          // Object.keys()取出对象中的key，放在一个数组中
          // 还原数据
          
          for (let key in data) {
            if (Object.keys(this.form).includes(key)) {
              this.form[key] = data[key];             
            }
          }
          const carsAttr = JSON.parse(data.carsAttr);
          const arr = []
          for(let key in carsAttr){
            const json = {}
            json.attr_key = key;
            json.attr_value = carsAttr[key]
            arr.push(json)
          }
          this.cars_attr = arr
          console.log(this.cars_attr);
       
        });
      }
    },
     // 表单重置
    reset() {
       this.$refs.vuForm.resetForm();
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>

