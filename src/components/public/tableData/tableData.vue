<template>
  <div>
    <formSearch
      v-if="table_config.search_form"
      :formItem="table_config.form_item"
      :formHandler="table_config.form_handler"
      :formConfig="table_config.form_config"
      @callbackComponent="callbackComponent"
    ></formSearch>
    <slot name="content"></slot>

    <el-table
      :data="table_data"
      border
      style="width: 100%"
      v-loading="table_loading"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="table_config.checkbox"
      ></el-table-column>
      <template v-for="item in table_config.thead">
        <!-- 回调 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-if="item.type === 'function'"
        >
          <template slot-scope="scope">
            <span
              v-html="item.callback && item.callback(scope.row, item.prop)"
            ></span>
          </template>
        </el-table-column>
        <!-- 插槽 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type === 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- switch -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type === 'switch'"
        >
          <template slot-scope="scope">
            <el-switch
              @change="item.handler && item.handler(scope.row)"
              v-model="scope.row[item.prop]"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 图片 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type === 'image'"
        >
          <template slot-scope="scope">
            <img :src="scope.row[item.prop]" :width="item.imgWidth || 50" />
          </template>
        </el-table-column>

        <!-- 按钮 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          :width="item.width"
          v-else-if="item.type === 'operation'"
        >
          <template slot-scope="scope">
            <!-- 编辑 -->
            <!-- <router-link
              :to="{
                name: item.default.editButtonLink,
                query: { id: scope.row[item.default.id || 'id'] }
              }"
            >
              <el-button type="danger" size="small" class="ma-r10"
                >编辑</el-button
              >
            </router-link> -->

            <template v-if="item.buttonGroup && item.buttonGroup.length > 0">
              <template v-for="button in item.buttonGroup">
                <!-- 事件 -->
                <el-button
                  v-if="button.event === 'button'"
                  :key="button.id"
                  @click="button.handler && button.handler(scope.row)"
                  size="small"
                  :type="button.type">
                  {{ button.label }}
                </el-button>
                <!-- 路由跳转 -->
                <router-link
                :key="button.id"
                  v-if="button.event === 'link'"
                  :to="{
                    name: button.name,
                    query: { [button.key]: scope.row[button.value || 'id'] }
                  }">
                  
                  <el-button type="danger" size="small" class="ma-r10">{{button.label}}</el-button>
                </router-link>
              </template>
            </template>
            <!-- 删除 -->
            <el-button v-if="item.default && item.default.deleteButton" @click="delate(scope.row[item.default.deleteKey || 'id'])"size="small">
              删除
            </el-button>
            <!-- 额外的按钮 -->
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- type不是function就为纯文本渲染 -->
        <el-table-column
          v-else
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
        ></el-table-column>
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
// 组件
import formSearch from "../formSearch/formSearch";
import { GetTableData, Delete } from "@/api/common";
// import { ParkingList, ParkingDelate } from "@/api/parking";
// import { CarsStatus, CarsDelate } from "@/api/cars";
export default {
  name: "tableData",
  components: { formSearch },
  data() {
    return {
      // tableData
      table_data: [],
      table_config: {
        // 初始化是否请求接口
        isRequest: true,
        thead: [],
        checkbox: true,
        url: "",
        data: {},
        delete_url: "",
        search_form: true,
        form_item: [],
        form_handler: [],
        form_config: {
          resetButton: false
        }
      },
      //页码
      total: 0,
      // 当前页码
      currentPage: 1,
      // 页面是否显示加载动画
      table_loading: false,
      // 删除禁用
      delate_disable: "",
      form_data: {}
    };
  },
  mounted() {
    // 刷新页面
    this.$bus.$on("dataRefresh", () => {
      // A发送来的消息
      this.requestData();
    });
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    searchFormConfig: {
      type: Object,
      default: () => ({})
    },
    // 按钮
    formHandler: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    callbackComponent(params) {
      this[params.function](params.data);
    },
    search(data) {
      const searchData = data;
      searchData.pageNumber = 1;
      searchData.pageSize = 10;
      this.requestData(searchData);
    },
    // 配置
    initConfig() {
      for (let key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key];
        }
        // 配置完成后开始读取接口数据
      }

      this.table_config.isRequest && this.loadData();
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
    },
    // 删除
    delate(id) {
      this.$confirm("确定删除此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let requestData = {
            data: { id: id },
            url: this.table_config.delete_url
          };
          this.delate_disable = id;
          Delete(requestData).then(res => {
            this.$message({
              type: "success",
              message: res.data.message
            });
            // 调用子组件的方法
            this.requestData();
            this.delate_disable = "";
          });
        })
        .catch(() => {
          this.delate_disable = "";
        });
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
.ma-r10 {
  margin-right: 10px;
}
</style>

