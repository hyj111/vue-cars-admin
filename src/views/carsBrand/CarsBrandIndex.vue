<template>
  <div class="home">
    <el-row>
      <el-col :span="18">
        <el-form :inline="true" :model="form" class="demo-form-inline filter-form">
          <el-form-item label="车辆品牌：">
            <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <div class="pull-right">
          <el-button type="primary" @click="add">新增车辆品牌</el-button>
        </div>
      </el-col>
    </el-row>

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
        <el-button
          @click="delate(slotData.data.id)"
          size="small"
          :loading="slotData.data.id===delate_disable"
        >删除</el-button>
      </template>
    </tableData>

    <!-- dialog弹窗 -->
    <cars-brand-add :dialogVisible="dialogVisible" @close="close" :data="data_brand" @refresh="refresh"/>
    <!-- 父组件往子组件传数据是一个单向数据流 -->
  </div>
</template>

<script>
import tableData from "components/public/tableData/tableData";
import CarsBrandAdd from "components/public/dialog/CarsBrandAdd";
import { BrandDelate, BrandStatus } from "@/api/brand";
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
          { label: "操作", type: "slot", slotName: "operation" }
        ],
        url: "brandList",
        data: { pageSize: 10, pageNumber: 1 }
      },
      // 删除禁用
      delate_disable: "",
      // switch禁用
      switch_disable: "",
      dialogVisible: false,
      form: {
        brand:""
      },

      data_brand: {}
    };
  },
  methods: {
    // 刷新
    refresh(){
      this.$refs.table.requestData();
    },
    // 搜索
    search(){
      const requestData = {
        pageSize: 10,
        pageNumber: 1
      };
      if(this.form.brand){
        requestData.brand = this.form.brand
      }
      // 调用子组件的方法
       this.$refs.table.requestData(requestData);
    },
    handleChange() {},
    add() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    // 删除
    delate(id) {
      this.$confirm("确定删除此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delate_disable = id;
          BrandDelate({ id: id }).then(res => {
            this.$message({
              type: "success",
              message: res.data.message
            });
            // 调用子组件的方法
            this.$refs.table.requestData();
            this.delate_disable = "";
          });
        })
        .catch(() => {
          this.delate_disable = "";
        });
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
