<template>
  <div>
    <el-table :data="table_data" border style="width: 100%" v-loading="table_loading">
      <el-table-column type="selection" width="55" v-if="table_config.checkbox"></el-table-column>
      <template v-for="item in table_config.thead">
        <!-- 回调 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-if="item.type==='function'"
        >
          <template slot-scope="scope">
            <span v-html="item.callback&&item.callback(scope.row,item.prop)"></span>
          </template>
        </el-table-column>
        <!-- 插槽 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type==='slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row" ></slot>
          </template>
        </el-table-column>
        <!-- 图片 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type==='image'"
        >
          <template slot-scope="scope">
            <img :src="scope.row[item.prop]" :width="item.imgWidth || 50" />
          </template>
        </el-table-column>
        <!-- type不是function就为纯文本渲染 -->
        <el-table-column v-else :prop="item.prop" :label="item.label" :key="item.prop"></el-table-column>
      </template>
    </el-table>
    <el-row class="padding-top-30">
      <el-col :span="4">
        <div style="padding:1px"></div>
      </el-col>
      <el-col :span="20">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetTableData } from "@/api/common";
import { ParkingList, ParkingDelate } from "@/api/parking";
export default {
  name: "tableData",
  data() {
    return {
      // tableData
      table_data: [],
      table_config: {
        thead: [],
        checkbox: true,
        url: "",
        data: {}
      },
      //页码
      total: 0,
      // 当前页码
      currentPage: 1,
      // 页面是否显示加载动画
      table_loading: false
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    // 配置
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
        // 配置完成后开始读取接口数据
      }
      this.loadData();
    },
    loadData() {
      this.table_loading = true;
      let requestData = {
        data: this.table_config.data,
        url: this.table_config.url
      };
      GetTableData(requestData)
        .then(res => {
          const data = res.data.data;
          // 判断数据是否存在
          if (data) {
            this.table_data = data.data;
          }
          this.total = data.total;
          this.table_loading = false;
        })
        .catch(err => {
          this.table_loading = false;
        });
    },
    // 页码
    handleSizeChange(val) {
      this.table_config.data.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.table_config.data.pageNumber = val;
      this.loadData();
    },
    requestData(params) {
      //处理业务逻辑;
      if (params) {
        this.table_config.data = params;
      }
      this.loadData();
    }
  },
  watch: {
    config: {
      handler(newValue) {
        this.initConfig();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" >
</style>

