<template>
  <div class="home">
    <!-- 表格数据 -->
    <tableData :config="table_config" ref="table">
      <template v-slot:status="slotData">
        <el-switch
          @change="switchChange(slotData.data)"
          v-model="slotData.data.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="slotData.data.id===switch_disable"
        ></el-switch>
      </template>
      <!-- 操作 -->
      <template v-slot:operation="slotData">
        <el-button type="danger" @click="edit(slotData.data)" size="small">编辑</el-button>
      </template>
    </tableData>

    <!-- dialog弹窗 -->
    <cars-brand-add
      :dialogVisible="dialogVisible"
      @close="close"
      :data="data_brand"
      @refresh="refresh"
    />
    <!-- 父组件往子组件传数据是一个单向数据流 -->
  </div>
</template>

<script>
import tableData from "components/public/tableData/tableData";
import CarsBrandAdd from "components/public/dialog/CarsBrandAdd";
import { BrandStatus } from "@/api/brand";
export default {
  name: "CarsBrandIndex",
  components: {
    CarsBrandAdd,
    tableData
  },
  data() {
    return {
      // 表格配置
      table_config: {
        thead: [
          {
            label: "Logo",
            prop: "imgUrl",
            type: "image",
            imgWidth: 50,
            width: 200
          },
          {
            label: "车辆品牌",
            prop: "nameCh",
            type: "function",
            callback: (row, prop) => {
              return `${row.nameCh}/${row.nameEn}`;
            }
          },
          { label: "禁启用", prop: "status", type: "slot", slotName: "status" },

            {
            label: "操作",
            type: "operation",
            default: { deleteButton: true },
            buttonGroup:[
              {label:"编辑",type:"danger",event:"button",handler:(data) => this.edit(data)},
            ]
          }
        ],
        // 搜索配置
        form_item: [
          {
            label: "车辆品牌",
            prop: "brand",
            type: "input",
            placeholder: "请输入车辆品牌"
          }
        ],
        form_handler: [
          {
            label: "新增车辆品牌",
            prop: "add",
            type: "success",
            element: "button",
            handler: () => {
              this.dialogVisible = true;
            }
          }
        ],
        url: "brandList",
        delete_url: "brandDelete",
        data: { pageSize: 10, pageNumber: 1 }
      },

      // switch禁用
      switch_disable: "",
      dialogVisible: false,
      form: {
        brand: ""
      },

      data_brand: {}
    };
  },
  methods: {
    // 刷新
    refresh() {
      this.$refs.table.requestData();
    },
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
      BrandStatus(resquestData)
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
    },
    // 编辑
    edit(data) {
      this.data_brand = JSON.parse(JSON.stringify(data));
      this.dialogVisible = true;
    }
  }
};
</script>
