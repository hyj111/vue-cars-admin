<template>
  <div id="nav-wrap">
    <div class="logo"><img src="~@/assets/logo.png" alt=""></div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#32495f"
      text-color="#fff"
      
      active-text-color="#fff" 
      :default-active="this.$route.path"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu :index="index+''" v-if="!item.hidden"  :key="item.path">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.meta.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routers: null,
      // defalutActive:""
    };
  },
 
  mounted() {
    this.routers = this.$router.options.routes;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #263445;
  .el-menu-vertical-demo {
    width: 250px!important;
  }
}
.logo {
  
  img {
    width: 240px;
    margin: 28px auto 25px;
  }
}
</style>