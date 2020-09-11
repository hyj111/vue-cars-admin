<template>
  <!-- dialog弹窗 -->
  <el-dialog title="新增车辆品牌" :visible.sync="isShow" @close="close" @opened="opened" append-to-body>
    <VueForm :formItem="form_item" :form_handler="form_handler" ref="vuForm" :formData="form">
      <template v-slot:logo>
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
      </template>
    </VueForm>
  </el-dialog>
</template>

<script>
import VueForm from "components/public/form/form";
import { BrandLogo, BrandAdd, BrandDetailed, BrandEdit } from "@/api/brand";
export default {
  name: "CarsBrandAdd",
  components: { VueForm },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 表单配置
      form_item: [
        {
          type: "input",
          label: "品牌中文",
          prop: "nameCh"
        },
        {
          type: "input",
          label: "品牌英文",
          prop: "nameEn"
        },
        {
          type: "slot",
          label: "LOGO",
          slotName: "logo"
        },
        {
          type: "radio",
          label: "禁启用",
          prop: "status",
          required: true,
          options: this.$store.state.config.radio_disabled
        }
      ],
      // 按钮配置
      form_handler: [
        { label: "确定", type: "danger", handler: () => this.submit() }
      ],
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
      this.form = this.data;
      this.logo_current = this.data.imgUrl;
      this.form.imgUrl = this.logo_current;
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
      this.form.imgUrl = this.logo_current;
      BrandAdd(this.form).then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.$emit("refresh")
        this.reset();
        this.close()
      });
    },
    // 修改
    edit() {
      this.form.imgUrl = this.logo_current;
      const requestData = JSON.parse(JSON.stringify(this.form));

      BrandEdit(requestData).then(res => {
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.$emit("refresh")
        this.reset();
        this.close()
      });
    },
    // 表单重置
    reset() {    
      this.$refs.vuForm.$refs.form.resetFields();
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

