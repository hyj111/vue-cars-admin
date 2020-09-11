<template>
  <div class="parking-add">
    <VueForm :formItem="form_item" :form_handler="form_handler" ref="vuForm" :formData=form>
      <template v-slot:city>
        <CityArea @getcity="getcity" @callback="setMapCenter" :mapLocation="true" ref="cityArea"></CityArea>
      </template>
      <template v-slot:amap>
        <div class="addrss-map">
          <a-map @lnglat="lnglat" ref="amap" @mapLoad="mapLoad" :options="option_map" />
        </div>
      </template>
    </VueForm>
  </div>
</template>

<script>
import AMap from "../amap/amap";
import { ParkingAdd, ParkingDetailed, ParkingEdit } from "@/api/parking";
import CityArea from "components/public/cityArea/CityArea";
import VueForm from "components/public/form/form";
export default {
  name: "ParkingAdd",
  data() {
    let validateNumber = (rule, value, callback) => {
            const regNumber = /^[0-9]*$/;
            if(!value) {
                callback(new Error('请输入可停放车辆'));
            }else if(!regNumber.test(value)){
                callback(new Error('请输入数字'));
            }else{
                callback();
            }
        }
    return {
      // 表单配置
      form_item: [
        {
          type: "input",
          label: "停车场名称",
          placeholder: "停车场名称",
          prop: "parkingName",
          required:true,
          requiredMsg:"请输入停车场名称"
          
        },
        { type: "slot", slotName: "city", label: "区域", prop: "area",requiredMsg:"请选择省市区"},
        {
          type: "input",
          label: "详细地址",
          placeholder: "请输入详细地址",
          required:true,
          prop: "address"
        },
        {
          type: "radio",
          label: "类型",
          prop: "type",
          required:true,
          options: this.$store.state.config.parking_type
        },
        { type: "input", label: "可停放车辆", prop: "carsNumber",validator: [{ validator: validateNumber, trigger: 'change' }]},
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          required:true,
          options: this.$store.state.config.radio_disabled
        },
        { type: "slot", slotName: "amap", label: "位置" },
          {
          type: "input",
          label: "经纬度",
          prop: "lnglat",
          disabled:true
        },
      ],
      // 按钮配置
      form_handler: [
        {label:"确定",type:"danger",handler:()=>this.onSubmit()},
        {label:"重置",type:""}
      ],
      // id
      id: this.$route.query.id,
      // 地图配置
      option_map: {
        mapLoad: true
      },
      status: this.$store.state.config.radio_disabled,
      type: this.$store.state.config.parking_type,
      form: {
        parkingName: "",
        area: "",
        address: "",
        type: "",
        carsNumber: "",
        status: "",
        lnglat: ""
      },
      btn_loading: false
    };
  },
  components: {
    AMap,
    CityArea,
    VueForm
  },

  methods: {
    // 提交表单
    onSubmit() {
      this.$refs.vuForm.$refs.form.validate(valid => {
        if (valid) {
          this.id ? this.editParking() : this.addParking();
          this.message;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增停车场
    addParking() {
      this.btn_loading = true;
      ParkingAdd(this.form)
        .then(res => {
          this.btn_loading = false;
          this.$message({
            message: res.data.message,
            type: "success"
          });
          // 重置表单
           this.reset();
        })
        .catch(err => {
          this.btn_loading = false;
        });
    },
    // 修改停车场
    editParking() {
      let requestData = JSON.parse(JSON.stringify(this.form));
      requestData.id = this.id;
      this.btn_loading = true;
      ParkingEdit(requestData)
        .then(res => {
          this.btn_loading = false;
          this.$message({
            message: res.data.message,
            type: "success"
          });
          // 重置表单
          
          this.$router.push("/ParkingIndex");
        })
        .catch(err => {
          this.btn_loading = false;
        });
    },
    // 获取详情
    getDetail() {
      if (this.id) {
        const id = { id: this.id };
        ParkingDetailed(id).then(res => {
          const data = res.data.data;
          // Object.keys()取出对象中的key，放在一个数组中
          // 还原数据
          for (let key in data) {
            if (Object.keys(this.form).includes(key)) {
              this.form[key] = data[key];
            }
          }
          // 设置覆盖物
          const splitLnglat = data.lnglat.split(",");
          const lnglat = {
            lng: splitLnglat[0],
            lat: splitLnglat[1]
          };
          this.$refs.amap.setMarker(lnglat);
          // 初始化省市区
          this.$refs.cityArea.initDefault(data.region);
        });
      }
    },
    // 地图加载完成
    mapLoad() {
      this.getDetail();
    },
    getcity(value) {
      // 地址的获取
      this.form.area = value;
    },
    lnglat(value) {
      // 经纬度获取
     
      this.form.lnglat = value.value;
      console.log(this.form.lnglat);
    },
    setMapCenter(data) {
      // 中文地址的获取
      this.$refs.amap.setMapCenter(data);
    },
    // 表单重置
    reset() {
       this.$refs.vuForm.$refs.form.resetFields();
      // 清除cityArea的值
      this.$refs.cityArea.clear();
      // 清除地图覆盖物
      this.$refs.amap.clearMarker();
    }
  }
};
</script>

<style lang="scss">
.addrss-map {
  width: 100%;
  height: 500px;
}
</style>