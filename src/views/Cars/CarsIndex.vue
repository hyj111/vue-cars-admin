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
    </tableData>
  </div>
</template>

<script>
import tableData from "components/public/tableData/tableData";
import { CarsStatus } from "@/api/cars";
export default {
  name: "ParkingIndex",
  components: {
    tableData
  },
  data() {
    return {
      // 表格配置
      table_config: {
        search_form: true,
        thead: [
          { label: "车牌号", prop: "carsMode" },
          { label: "车辆品牌", prop: "nameCh" },
          { label: "车辆LOGO", prop: "imgUrl", type: "image", width: 100 },
          { label: "车辆图片", prop: "carsImg", type: "image", width: 100 },
          {
            label: "年检",
            prop: "yearCheck",
            type: "function",
            width: 100,
            callback: (row, prop) => {
              return row[prop] == 1 ? "已年检" : "未年检";
            }
          },
          {
            label: "能源类型",
            prop: "energyType",
            type: "function",
            width: 100,
            callback: (row, prop) => {
              if (row[prop] == 1) {
                return "电";
              } else if (row[prop] == 2) {
                return "油";
              }
              return "油电混合";
            }
          },
          {
            label: "禁启用",
            prop: "status",
            type: "slot",
            slotName: "status",
            width: 100
          },
          { label: "停车场", prop: "parkingName" },
          { label: "区域", prop: "address" },

          {
            label: "操作",
            type: "operation",
            default: {
              deleteButton: true,
              editButton: true,
              editButtonLink: "CarsAdd"
            }
          }
        ],
        url: "carList",
        delete_url: "carsDelete",
        data: { pageSize: 10, pageNumber: 1 },
        // 搜索配置
        form_item: [
          {
            label: "城市",
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
            options: "parking_status"
          },
          { label: "关键字", type: "keyword",options:["parkingName","address"] }
        ],
        form_handler: [
          {
            label: "新增",
            prop: "add",
            type: "success",
            element: "link",
            router: "/carsAdd"
          }
        ],
        form_config: {
          resetButton: true
        }
      },


      parking_data: {},
      // switch禁用
      switch_disable: ""
    };
  },
  methods: {
    // 禁启用
    switchChange(data) {
      const resquestData = {
        id: data.id,
        status: data.status
      };
      this.switch_disable = data.id;
      CarsStatus(resquestData)
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
