<template>
  <el-form ref="form" :model="formData" label-width="120px">
    <el-form-item
      v-for="item in formItem"
      :label="item.label"
      :prop="item.prop"
      :key="item.prop"
      :rules="item.rules"
    >
      <!-- Input -->
      <el-input
        v-if="item.type==='input'"
        :placeholder="item.placeholder"
        v-model.trim="formData[item.prop]"
        :disabled="item.disabled"
      ></el-input>
      <!-- select -->
      <el-select
        filterable
        v-if="item.type==='select'"
        :placeholder="item.placeholder"
        v-model.trim="formData[item.prop]"
        :disabled="item.disabled"
      >
        <el-option
          v-for="selectItem in item.options"
          :key="selectItem.value || selectItem[item.select_vlaue]"
          :value="selectItem.value || selectItem[item.select_vlaue]"
          :label="selectItem.label || selectItem[item.select_label]"
        ></el-option>
      </el-select>
      <!-- 插槽 -->
      <slot v-if="item.type==='slot'" :name="item.slotName"></slot>
      <!-- 单选框 -->
      <el-radio-group v-if="item.type==='radio'" v-model="formData[item.prop]">
        <el-radio
          v-for="radio in item.options"
          :label="radio.value"
          :key="radio.label"
        >{{radio.label}}</el-radio>
      </el-radio-group>
      <!-- 富文本编辑器 -->
      <template v-if="item.type == 'wangeditor'">       
        <Wangeditor :content.sync="formData[item.prop]" :value="formData[item.prop]" ref="wangeditor" :isClear="wangeditorClear"></Wangeditor>
      </template>
      <template v-if="item.type == 'upload'">
      <Upload></Upload>
      </template>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button
        :type="item.type"
        v-for="item in form_handler"
        :key="item.label"
        @click="item.handler&&item.handler()"
      >{{item.label}}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Wangeditor from "../wangeditor/wangeditor";
// upload
import Upload from "../upload/upload"
export default {
  components: { Wangeditor,Upload },
  data() {
    return {
      form: {},
      type_msg: {
        input: "请输入",
        radio: "请选择",
        select: "请选择"
      },
      // 清除富文本
      wangeditorClear:false
    };
  },
  props: {
    formItem: {
      type: Array,
      default: () => {}
    },
    form_handler: {
      type: Array,
      default: () => {}
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    initFormData() {
      const formData = {};
      for (let item of this.formItem) {
        if (item.prop) {
          formData[item.prop] = item.value || null;
        }
        // rules 规则
        if (item.required) {
          this.rules(item);
        }
        // 自定义检验规则
        if (item.validator) {
          item.rules = item.validator;
        }
      }
      this.form = formData;
    },
    rules(item) {
      const requiredRules = [
        {
          required: true,
          message:
            item.requiredMsg || `${this.type_msg[item.type]}${item.label}`,
          trigger: "blur"
        }
      ];
      // 其他的 rules 规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requiredRules.concat(item.rules);
      } else {
        item.rules = requiredRules;
      }
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
      // 清除富文本内容
     if(this.$refs.wangeditor) {
       this.wangeditorClear = !this.wangeditorClear
     }
    }
  },
  watch: {
    formItem: {
      handler(newValue) {
        this.initFormData();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
</style>

