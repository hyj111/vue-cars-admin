<template>
  <div class="home">
    <tableData :config="table_config" :searchFormConfig="search_form_config" ref="table">
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
              return row[prop];
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
          {
            label: "操作",
            type: "operation",
            default: {
              deleteButton: true,
              editButton: true,
              editButtonLink: "ParkingAdd"
            }
          }
        ],
        url: "parkingList",
        delete_url: "parkingDelete",
        data: { pageSize: 10, pageNumber: 1 }
      },
      // 搜索配置
      search_form_config: {
        form_item: [
          {
            label: "区域",
            type: "city"
          },
          {
            label: "类型",
            prop: "parkingType",
            type: "select",
            width: "100px",
            options: "parking_type"
          },
          {
            label: "禁启用",
            prop: "status",
            type: "select",
            width: "100px",
            options: "radio_disabled"
          },
          { label: "关键字", type: "keyword" }
        ],
        form_handler: [
          {
            label: "新增停车场",
            prop: "add",
            type: "success",
            element: "link",
            router: "/ParkingAdd"
          }
        ],
        config: {
          resetButton: true
        }
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
      // switch禁用
      switch_disable: ""
    };
  },
  methods: {
    // search
    search() {
      const requestData = {
        pageSize: 10,
        pageNumber: 1
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
