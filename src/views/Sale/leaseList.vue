<template>
  <div class="home">
    <tableData :config="table_config" ref="table">
    </tableData>
    <!-- dialog弹窗 -->
    <LeaseType :dialogVisible="dialogVisible" @close="close" :data="lease_data" />
  </div>
</template>

<script>
import tableData from "components/public/tableData/tableData";
import LeaseType from "components/public/dialog/leaseType";
import {LeaseStatus} from "@/api/lease"
export default {
  name: "ParkingIndex",
  components: {
    tableData,
    LeaseType
  },
  data() {
    return {
      // 弹窗是否显示
      dialogVisible: false,
      // 表格配置
      table_config: {
        //   是否要初始化加载
        search_form: true,
        checkbox: false,
        thead: [
          { label: "租车类型", prop: "carsLeaseTypeName" },
          {
            label: "禁启状态",
            prop: "carsLeaseStatus",
            type: "switch",
            handler: data => this.leaseStatus(data)
          },
          { label: "车辆列表", prop: "carsLeaseDesc", width: 500 },
          {
            label: "操作",
            type: "operation",
            default: { deleteButton: true, deleteKey: "carsLeaseTypeId" },
            buttonGroup:[
              {label:"编辑",type:"danger",event:"button",handler:(data) => this.edit(data)},
            ]
          }
        ],
        url: "leaseList",
        delete_url: "leaseDelete",
        data: { pageSize: 10, pageNumber: 1 },
        // 搜索配置
        form_item: [
          { label: "关键字", type: "keyword", options: ["carsLeaseTypeName", "carsNumber"] }
        ],
        form_handler: [
          {
            label: "新增",
            prop: "add",
            type: "success",
            element: "button",
            handler: () => {
              this.leaseTypeAddDialog();
            }
          }
        ],
        form_config: {
          resetButton: true
        }
      },
      // 点编辑传过去的数据
      lease_data:{}
    };
  },
  methods: {
    close() {    
      this.dialogVisible = false;
    },
    leaseTypeAddDialog() {
      this.dialogVisible = true;
    },
    // 禁启用
    leaseStatus(data) {
      const resquestData = {
        id:data.carsLeaseTypeId,
        status: data.carsLeaseStatus
      }    
      LeaseStatus(resquestData).then((res)=>{
          this.$message({
            type: "success",
            message: res.data.message
          });
      })
    },
    //编辑
    edit(data){
      // this.lease_data = JSON.parse(JSON.stringify(data));深拷贝
      this.lease_data = Object.assign({},data)
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scope>
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
