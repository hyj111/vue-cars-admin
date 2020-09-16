<template>
  <div class="home">
    <tableData :config="table_config" ref="table">
      <!-- 车辆公共属性 -->
      <template v-slot:content>
        <div style="margin-bottom:25px;">
          <el-button
            :type="cars_list_type_id == item.id?'danger':''"
            size="small"
            v-for="item in cars_list_basis_item"
            :key="item.id"
            @click="getTypeList(item)"
          >{{item.value}}</el-button>
        </div>
      </template>
    </tableData>
    <!-- dialog弹窗 -->
    <addCarsAttr :dialogVisible="dialogVisible" @close="close" :data="current_cars_type_data" />
  </div>
</template>

<script>
import tableData from "components/public/tableData/tableData";
import { GetCarsTypeBasis, GetCarsTypeList } from "@/api/carsAtts";
import addCarsAttr from "components/public/dialog/addCarsAttr";
export default {
  name: "ParkingIndex",
  components: {
    tableData,
    addCarsAttr
  },
  data() {
    return {
      // 弹窗是否显示
      dialogVisible: false,
      // 表格配置
      table_config: {
        //   是否要初始化加载
        isRequest: false,
        search_form: true,
        checkbox: false,

        thead: [
          { label: "文本", prop: "value" },
          { label: "字段", prop: "key" }
        ],
        url: "carsAttrList",
        delete_url: "carsDelete",
        data: { pageSize: 10, pageNumber: 1 },
        // 搜索配置
        form_item: [
          { label: "关键字", type: "keyword", options: ["key", "value"] }
        ],
        form_handler: [
          {
            label: "新增",
            prop: "add",
            type: "success",
            element: "button",
            handler: () => {
              this.carsTypeAddDialog();
            }
          }
        ],
        form_config: {
          resetButton: true
        }
      },
      //   车辆公用属性列表
      cars_list_basis_item: [],
      //   车辆公用属性id
      cars_list_type_id: "",
      //   当前公用属性数据
      current_cars_type_data: {}
    };
  },
  beforeMount() {
    //   第一种方法
    // this.getCarsTypeBasis();
    // 第二种方法
    this.getCarsType();
  },
  methods: {
    close() {
      this.dialogVisible = false;
    },
    // 获取车辆公用属性
    getCarsTypeBasis() {
      return GetCarsTypeBasis().then(res => {
        const data = res.data.data.data;
        this.cars_list_basis_item = data;
        return data;
        //   第一种做法
        // this.current_cars_type_data.id = data[0].id
        // this.getCarsTypeList()
      });
    },

    // 点击后触发的事件
    getTypeList(data) {
      this.cars_list_type_id = data.id;
      //   存储当前数据
      this.current_cars_type_data = data;
      //   点击之后调用这个方法获取车辆自定义属性
      this.getCarsTypeList();
    },

    // 第二种做法async\await
    async getCarsType() {
      //    第一个接口
      const data = await this.getCarsTypeBasis(); //等待这个代码处理完后再往下走
      this.current_cars_type_data.id = data[0].id;
      this.cars_list_type_id =  data[0].id;
      // 第二个接口
      this.getCarsTypeList();
    },
    // 获取车辆自定义属性
    getCarsTypeList() {
      this.$refs.table.requestData({ typeId: this.current_cars_type_data.id });
    },
    // 弹窗
    carsTypeAddDialog() {
      if (!this.current_cars_type_data.id) {
        this.$message({
          message: "请选择车辆公共属性",
          type: "error"
        });
        return false;
      }
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
