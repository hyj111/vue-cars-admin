<template>
  <!-- dialog弹窗 -->
  <el-dialog title="车辆自定义属性添加" width="30%" :visible.sync="isShow" @close="close" @opened="opened" append-to-body>
    <VueForm :formItem="form_item" :form_handler="form_handler" ref="vuForm" :formData="form">
    </VueForm>
  </el-dialog>
</template>

<script>
import VueForm from "components/public/form/form";
import { CarsTypeAdd } from "@/api/carsAtts";
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
          label: "当前属性",
          prop: "typeValue",
          disabled:true
        },
        {
          type: "input",
          label: "字段",
          prop: "key"
        },
        {
          type: "input",
          label: "文本",
          prop: "value"
        },
      ],
      // 按钮配置
      form_handler: [
        { label: "确定", type: "danger", handler: () => this.submit() }
      ],
      // 弹窗的关闭和显示
      isShow: this.dialogVisible,
      form: {
        key: "",
        value: "",
        typeValue:""
      },
    };
  },
  watch: {
    dialogVisible(newvalue, oldvalue) {
      this.isShow = newvalue;
    },
    data: {
      handler(newValue){
       
        this.form.typeValue = newValue.value
      }
    }
  },
  methods: {
    // 反向修改父组件的数据
    close() {
      this.$emit("close");
    },
    // 打开弹窗时请求标志数据
    opened() {
     
    },   
    // 提交数据
    submit() {

     this.add();
    },
    add(){
      const requestData  = {
        typeId:this.data.id,
        key:this.form.key,
        value:this.form.value
      }
      CarsTypeAdd(requestData).then(res=>{
       
        this.$message({
          message:res.data.message,
          type:"success"
        })
        this.reset()
      })
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

