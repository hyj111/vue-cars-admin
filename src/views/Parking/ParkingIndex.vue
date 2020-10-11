<template>
  <div class="home">
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
            default: { deleteButton: true, deleteKey: "carsLeaseTypeId" },
            buttonGroup:[
              {label:"编辑",type:"danger",event:"link",name:"ParkingAdd",key:"id"},
            ]
          }
        ],
        url: "parkingList",
        delete_url: "parkingDelete",
        data: { pageSize: 10, pageNumber: 1 },
        form_item: [
          {
            label: "区域",
            type: "city"
          },
          {
            label: "类型",
            prop: "type",
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
         { label: "关键字", type: "keyword",options:["parkingName","address"] }
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
        form_config: {
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
