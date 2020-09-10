<template>
  <div class="parking-add">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="停车场名称" prop="parkingName">
        <el-input v-model="form.parkingName"></el-input>
      </el-form-item>
      <!-- 区域级联选择器 -->
      <el-form-item label="区域" prop="area">
        <CityArea @getcity="getcity" @callback="setMapCenter" :mapLocation="true" ref="cityArea"></CityArea>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="item.value" v-for="item in type" :key="item.label">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="可停放车辆" prop="carsNumber">
        <el-input v-model.number="form.carsNumber"></el-input>
      </el-form-item>

      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="item.value" v-for="item in status" :key="item.label">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="位置">
        <div class="addrss-map">
          <a-map @lnglat="lnglat" ref="amap" @mapLoad="mapLoad" :options="option_map" />
        </div>
      </el-form-item>

      <el-form-item label="经纬度" prop="lnglat">
        <el-input v-model="form.lnglat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('form')" :loading="btn_loading">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AMap from "../amap/amap";
import { ParkingAdd, ParkingDetailed,ParkingEdit } from "@/api/parking";
import CityArea from "components/public/cityArea/CityArea";
export default {
  name: "ParkingAdd",
  data() {
    return {
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
      // 表单验证规则
      rules: {
        parkingName: [
          { required: true, message: "请输入停车场名称", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择省市区", trigger: "blur" }],
        lnglat: [
          { required: true, message: "经纬度不能为空", trigger: "blur" }
        ],
        carsNumber: [
          { required: true, message: "数量不能为空", trigger: "blur" },
          { type: "number", message: "请输入数字" }
        ],
        address: [
          { required: true, message: "详情地址不能为空", trigger: "change" }
        ]
      },
      btn_loading: false
    };
  },
  components: {
    AMap,
    CityArea
  },

  methods: {
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.id?this.editParking():this.addParking();
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
          this.reset("form");
        })
        .catch(err => {
          this.btn_loading = false;
        });
    },
    // 修改停车场
    editParking() {
      let requestData = JSON.parse(JSON.stringify(this.form))
      requestData.id = this.id
      this.btn_loading = true;
      ParkingEdit(requestData)
        .then(res => {
          this.btn_loading = false;
          this.$message({
            message: res.data.message,
            type: "success"
          });
          // 重置表单
          this.reset("form");
          this.$router.push('/ParkingIndex')
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
    },
    setMapCenter(data) {
      // 中文地址的获取
      this.$refs.amap.setMapCenter(data);
    },
    // 表单重置
    reset(formName) {
      this.$refs[formName].resetFields();
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