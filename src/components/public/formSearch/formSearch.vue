<template>
  <el-form ref="form" :model="form_data" inline>
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
        v-model.trim="form_data[item.prop]"
        :disabled="item.disabled"
      ></el-input>
      <!-- select -->
      <el-select
        filterable
        :style="{width:item.width}"
        v-if="item.type==='select'"
        :placeholder="item.placeholder"
        v-model.trim="form_data[item.prop]"
        :disabled="item.disabled"
      >
        <el-option
          v-for="selectItem in item.options"
          :key="selectItem.value || selectItem[item.select_vlaue]"
          :value="selectItem.value || selectItem[item.select_vlaue]"
          :label="selectItem.label || selectItem[item.select_label]"
        ></el-option>
      </el-select>

      <!-- city -->
      <div v-if="item.type=='city'">
        <CityArea ref="city" :cityAreaValue.sync="city_value"></CityArea>
      </div>
      <!-- keyword -->
      <div v-if="item.type=='keyword'">
        <keyWord :options="['parkingName','address']" :value.sync="keyword" ref="keyword"></keyWord>
      </div>

      <!-- 插槽 -->
      <slot v-if="item.type==='slot'" :name="item.slotName"></slot>
    </el-form-item>
    <!-- 按钮 -->
    <el-form-item>
      <el-button type="danger" @click="search">搜索</el-button>
      <el-button type="danger" @click="reset" v-if="config.resetButton">重置</el-button>
      <template v-for="item in formHandler" >
        <router-link v-if="item.element==='link'" :to="item.router" class="margin-l-10">
          <el-button :type="item.type" :key="item.label">{{item.label}}</el-button>
        </router-link>
        
        <el-button
          v-if="item.element=='button'"
          :type="item.type"
          :key="item.label"
          @click="item.handler&&item.handler()"
        >{{item.label}}</el-button>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
import CityArea from "components/public/cityArea/CityArea";
import keyWord from "components/public/keyWord/keyword";
export default {
  components: { CityArea, keyWord },
  data() {
    return {
      keyword: {},
      form_data: {},
      city_value: ""
    };
  },
  props: {
    formItem: {
      type: Array,
      default: () => []
    },
    formHandler: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    //   搜索
    search() {
      const searchData = {};
      //   过滤空数据
      for (let key in this.form_data) {
        if (this.form_data[key]) {
          searchData[key] = this.form_data[key];
        }
      }
      // 关键字
      if (this.keyword.key && this.keyword.value) {
        searchData[this.keyword.key] = this.keyword.value;
      }
      // 城市
      if (this.$refs.keyword && this.$refs.city && this.city_value) {
        searchData.area = this.city_value;
      }
      this.$emit("callbackComponent", {
        function: "search",
        data: searchData
      });
    },
    initFormData() {
      const formData = {};
      for (let item of this.formItem) {
        // 读取下拉选项的数据
        if (item.type == "select") {
          this.selectOption(item);
        }
      }
    },
    // 下拉选项
    selectOption(data) {
      const options = this.$store.state.config[data.options];
      if (options) {
        data.options = options;
      }
    },
    // 字段初始化
    initFormFelid(data) {
      const felid = {};
      this.formItem.forEach(item => {
        if (item.prop) {
          felid[item.prop] = "";
        }
      });
      this.form_data = felid;
    },
    // 重置
    reset() {
      this.$refs.form.resetFields();
      //城市组件
      if (this.$refs.city[0]) {
        this.$refs.city[0].clear();
      }
      //关键字
      if (this.$refs.keyword[0]) {
        this.$refs.keyword[0].clear();
      }
    }
  },
  watch: {
    formItem: {
      handler(newValue) {
        this.initFormData();
        // 读取字段
        this.initFormFelid();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
</style>

