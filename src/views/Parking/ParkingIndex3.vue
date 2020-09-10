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

    <!-- 表格数据 -->
    <el-table :data="tableData" border style="width: 100%" v-loading="table_loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="parkingName" label="停车场名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type | getType}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="区域"></el-table-column>
      <el-table-column prop="carsNumber" label="可停放车辆"></el-table-column>
      <!-- <el-table-column prop="carsNumber" label="车辆情况 已用/未用"></el-table-column> -->
      <el-table-column prop="disabled" label="禁启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="lnglat" label="查看位置">
        <template slot-scope="scoped">
          <el-button type="success" size="mini" @click="showMap(scoped.row)">查看地图</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scoped">
          <el-button type="danger" @click="edit(scoped.row.id)">编辑</el-button>
          <el-button @click="delate(scoped.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
    <MapLocation :dialogVisible="dialogVisible" @close="close" :parking_data="parking_data"></MapLocation>
  </div>
</template>

<script>
import MapLocation from "components/public/dialog/showMapLocation";
import CityArea from "components/public/cityArea/CityArea";
import { ParkingList, ParkingDelate } from "@/api/parking";
export default {
  name: "ParkingIndex",
  components: {
    CityArea,
    MapLocation
  },
  data() {
    return {
      // 页面是否显示加载动画
       table_loading: false,
      // 地图显示
      dialogVisible: false,
      //页码
      total: 0,
      // 当前页码
      currentPage: 1,
      // 请求api的页码
      pageSize: 10,
      pageNumber: 1,
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

      tableData: [],
      parking_data: {}
    };
  },
  beforeMount() {
    this.getParkingList();
  },
  methods: {
    // search
    search() {
      this.getParkingList();
    },
    // 获取列表
    getParkingList() {
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
      this.table_loading = true
      ParkingList(requestData).then(res => {
        const data = res.data.data;
        // 判断数据是否存在
        if (data) {
          this.tableData = data.data;
        }
        // 判断页码是否存在
        if (data.total) {
          this.total = data.total;
        }
        this.table_loading = false
      }).catch(err=>{
        this.table_loading = false
      })
    },
    getcity(value) {
      // 地址的获取
      this.form.area = value;
    },
    // 页码
    handleSizeChange(val) {
      this.pageSize = val;
      this.getParkingList();
    },
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getParkingList();
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
          ParkingDelate({ id: id }).then(res => {
          
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.getParkingList()
          });
        })
        .catch(() => {});
    },
    
  },
  // 过滤器
  filters: {
    // 返回类型文本
    // 类型
    getType(value) {
      return value == 1 ? "室内" : "室外";
    }
  }
};
</script>
