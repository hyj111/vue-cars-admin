<template>
  <!-- dialog弹窗 -->
  <el-dialog title="新增车辆品牌" :visible.sync="isShow" @close="close" @opened="opened" append-to-body>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="品牌中文" prop="nameCh">
        <el-input v-model="form.nameCh"></el-input>
      </el-form-item>
      <el-form-item label="品牌英文" prop="nameEn">
        <el-input v-model="form.nameEn"></el-input>
      </el-form-item>
      <el-form-item label="LOGO" prop="imgUrl">
        <div class="upload-img-wrap">
          <div class="upload-img">
            <img :src="logo_current" v-show="logo_current" />
          </div>

          <ul class="img-list">
            <li v-for="item in logo" :key="item.id" @click="selectLogo(item)">
              <img :src="item.img" alt="item.name" />
            </li>
          </ul>
        </div>
      </el-form-item>

      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="item.value" v-for="item in status" :key="item.label">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="描述" prop="content">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { BrandLogo, BrandAdd, BrandDetailed, BrandEdit } from "@/api/brand";
export default {
  name: "CarsBrandAdd",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      // 弹窗的关闭和显示
      isShow: this.dialogVisible,
      form: {
        nameCh: "",
        nameEn: "",
        imgUrl: "",
        status: "",
        content: ""
      },
      logo_current: "",
      // logo
      logo: [],
      status: this.$store.state.config.radio_disabled
    };
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      this.isShow = newvalue;
    }
  },
  methods: {
    // 反向修改父组件的数据
    close() {
      this.$emit("close");
    },
    // 打开弹窗时请求标志数据
    opened() {
      this.getBrandLogo();
      this.getDetailed();
    },
    // 获取详情
    getDetailed() {
     this.form = this.data
     this.logo_current = this.data.imgUrl
      this.form.imgUrl = this.logo_current
    },
    // 获取Logo
    getBrandLogo() {
      // 不存在数据时候才请求接口
      if (this.logo.length == 0) {
        BrandLogo().then(res => {
          const data = res.data.data;
          if (data) {
            this.logo = data;
          }
        });
      }
    },
    // 选择Logo
    selectLogo(value) {
      this.logo_current = value.img;
    },
    // 提交数据
    submit() {
      this.data.id ? this.edit() : this.add();
    },
    // 添加
    add() {
      this.form.imgUrl = this.logo_current
      BrandAdd(this.form).then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.reset("form");
      });
    },
    // 修改
    edit() {
      this.form.imgUrl = this.logo_current
      const requestData = JSON.parse(JSON.stringify(this.form))
  
      BrandEdit(requestData).then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.reset("form");
      });
    
    },
    // 表单重置
    reset(formName) {
      console.log("重置");
      this.$refs[formName].resetFields();
      this.logo_current = "";
    }
  }
};
</script>

<style lang="scss">
body .el-table th.gutter {
  display: table-cell !important;
}
</style>

