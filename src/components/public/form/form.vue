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
        v-else-if="item.type==='select'"
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
      <slot v-else-if="item.type==='slot'" :name="item.slotName"></slot>
      <!-- 单选框 -->
      <el-radio-group v-else-if="item.type==='radio'" v-model="formData[item.prop]">
        <el-radio
          v-for="radio in item.options"
          :label="radio.value"
          :key="radio.label"
        >{{radio.label}}</el-radio>
      </el-radio-group>
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
export default {
  data() {
    return {
      form: {},
      type_msg: {
        input: "请输入",
        radio: "请选择"
      }
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

