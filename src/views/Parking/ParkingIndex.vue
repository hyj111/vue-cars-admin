<template>
  <div class="home">
    <el-row>
      <el-col :span="21">
        <el-form :inline="true" :model="form" class="demo-form-inline filter-form">
          <el-form-item label="区域">
            <CityArea @getcity="getcity" ref="cityArea"></CityArea>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="停车场" class="width-100">
              <el-option
                v-for="item in parking_type"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="禁启用">
            <el-select v-model="form.status" placeholder="请选择" class="width-100">
              <el-option
                v-for="item in parking_status"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关键字">
            <el-select placeholder="请选择" class="width-100" v-model="search_key">
              <el-option label="停车场" value="parkingName"></el-option>
              <el-option label="详细区域" value="address"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="请输入关键字按Enter搜索" v-model="keyword"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="3">
        <div class="pull-right">
          <router-link to="/parkingAdd">
            <el-button type="primary">新增停车场</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>

    <tableData :config="table_config" ref="table">
      <!-- 禁启用 -->
      <template v-slot:status="slotData">
        <el-switch
          @change="switchChange(slotData.data)"
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="slotData.data.id===switch_disable"
        ></el-switch>
      </template>
      <!-- 查看地图 -->
      <template v-slot:lnglat="slotData">
        <el-button type="success" size="mini" @click="showMap(slotData.data)">查看地图</el-button>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger" @click="edit(slotData.data.id)" size="small">编辑</el-button>
        <el-button
          @click="delate(slotData.data.id)"
          size="small"
          :loading="slotData.data.id===delate_disable"
        >删除</el-button>
      </template>
    </tableData>

    <!-- 表格数据 -->

    <MapLocation :dialogVisible="dialogVisible" @close="close" :parking_data="parking_data"></MapLocation>
  </div>
</template>

<script>
import { address, parkingType } from "@/utils/common";
import MapLocation from "components/public/dialog/showMapLocation";
import CityArea from "components/public/cityArea/CityArea";
import tableData from "components/public/tableData/tableData";
import { ParkingDelate, ParkingStatus } from "@/api/parking";
export default {
  name: "ParkingIndex",
  components: {
    CityArea,
    MapLocation,
    tableData
  },
  data() {
    return {
      // 表格配置
      table_config: {
        thead: [
          { label: "停车场名称", prop: "parkingName" },
          {
            label: "类型",
            prop: "type",
            type: "function",
            callback: (row, prop) => {
              return row[prop] == 1 ? "室内" : "室外";
            }
          },
          {
            label: "区域",
            prop: "address",
            type: "function",
            callback: (row, prop) => {
              return parkingType(row[prop]);
            }
          },
          { label: "可停放车辆", prop: "carsNumber" },
          { label: "禁启用", prop: "status", type: "slot", slotName: "status" },
          {
            label: "查看位置",
            prop: "lnglat",
            type: "slot",
            slotName: "lnglat"
          },
          { label: "操作", type: "slot", slotName: "operation" }
        ],
        url: "parkingList",
        data: { pageSize: 10, pageNumber: 1 }
      },
      // 页面是否显示加载动画
      table_loading: false,
      // 地图显示
      dialogVisible: false,

      // 筛选
      form: {
        parking_name: "",
        area: "",
        type: "",
        status: ""
      },
      keyword: "",
      search_key: "",
      // 禁启用
      parking_status: this.$store.state.config.parking_status,
      // 停车场类型
      parking_type: this.$store.state.config.parking_type,

      parking_data: {},
      // switchj禁用
      switch_disable: "",
      // 删除禁用
      delate_disable:""
    };
  },
  methods: {
    // search
    search() {
      const requestData = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      // 过滤筛选
      const filterData = JSON.parse(JSON.stringify(this.form));
      for (let key in filterData) {
        if (filterData[key]) {
          requestData[key] = filterData[key];
        }
      }
      //  关键字
      if (this.keyword && this.search_key) {
        requestData[this.search_key] = this.keyword;
      }
      // 调用子组件的方法
      this.$refs.table.requestData(requestData);
    },

    getcity(value) {
      // 地址的获取
      this.form.area = value;
    },

    // 展示地图
    showMap(data) {
      this.parking_data = data;
      this.dialogVisible = true;
    },
    // 关闭弹窗
    close() {
      this.dialogVisible = false;
    },
    // 编辑
    edit(id) {
      this.$router.push({
        name: "ParkingAdd",
        query: {
          id
        }
      });
    },
    // 删除
    delate(id) {
      this.$confirm("确定删除此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delate_disable = id
          ParkingDelate({ id: id }).then(res => {
            this.$message({
              type: "success",
              message: res.data.message
            });
            // 调用子组件的方法
            this.$refs.table.requestData();
             this.delate_disable = ""
          });
        })
        .catch(() => {this.delate_disable = ""});
    },
    // 禁启用
    switchChange(data) {
      const resquestData = {
        id: data.id,
        status: data.status
      };
      this.switch_disable = data.id;
      ParkingStatus(resquestData)
        .then(res => {
          this.$message({
            type: "success",
            message: res.data.message
          });
          this.switch_disable = "";
        })
        .catch(err => {
          this.switch_disable = "";
        });
    }
  }
};
</script>
<style lang="scss" scope>
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
