<template>
  <!-- dialog弹窗 -->
  <el-dialog
    title="新增租车类型"
    width="30%"
    :visible.sync="isShow"
    @close="close"
    @opened="opened"
    append-to-body
  >
    <VueForm
      :formItem="form_item"
      :form_handler="form_handler"
      ref="vuForm"
      :formData="form"
    >
    </VueForm>
  </el-dialog>
</template>

<script>
import VueForm from "components/public/form/form";
import { LeaseAdd,LeaseEdit } from "@/api/lease";

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
          label: "租车类型",
          required: true,
          prop: "carsLeaseTypeName"
        },
        {
          type: "radio",
          label: "禁启用状态",
          prop: "carsLeaseStatus",
          required: true,
          options: this.$store.state.config.radio_disabled
        },
        {
          type: "textarea",
          label: "描述",
          prop: "carsLeaseDesc",
          row: 5
        }
      ],
      // 按钮配置
      form_handler: [
        { label: "确定", type: "danger", handler: () => this.submit() }
      ],
      // 弹窗的关闭和显示
      isShow: false,
      form: {
        carsLeaseTypeName: "",
        carsLeaseStatus: "",
        carsLeaseDesc: ""
      }
    };
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      this.isShow = newvalue;
    },
    data: {
      handler(newValue) {
        this.form = newValue;
      }
    }
  },
  methods: {
    // 反向修改父组件的数据
    close() {
      this.reset()
      delete this.form.carsLeaseTypeId;
      this.isShow = false
      this.$emit("close");
    },
    // 打开弹窗时请求标志数据
    opened() {},
    // 提交数据
    submit() {

        this.$refs.vuForm.$refs.form.validate(valid => {
        if (valid) {
          this.form.carsLeaseTypeId?this.edit():this.add()         
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加
    add() {
      LeaseAdd({...this.form}).then(res => { //扩展指定对象的key
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.reset();
        // 添加完成后让页面进行刷新
        this.$bus.$emit("dataRefresh");
        this.close()
      });
    },
    // 编辑
    edit() {
      LeaseEdit({...this.form}).then(res => { //扩展指定对象的key
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.reset();
        // 添加完成后让页面进行刷新
        this.$bus.$emit("dataRefresh");
        this.close()
      });
    },

    // 表单重置
    reset() {
      this.$refs.vuForm.resetForm();
    }
  }
};
</script>

<style lang="scss">
body .el-table th.gutter {
  display: table-cell !important;
}
</style>

