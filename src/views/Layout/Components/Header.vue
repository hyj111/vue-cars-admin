<template>
  <div id="header-wrap">
     <i class="el-icon-menu header-left-icon"></i>
   <el-button type="danger" plain class="header-right-btn" @click="back">退出登录</el-button>
   <div class="user-info">
    {{username}}
   </div>
   <div class="head-portrait"><img src="~@/assets/giao.jpg" alt=""></div>
  </div>
</template>

<script>
import  {getUsername,removeToken,removeUsername} from "@/utils/app"
export default {
   name:"Header",
   data() {
     return {
       username:null
     }
   },
   mounted() {
     this.username = getUsername()
   },
   methods: {
     back(){
       removeToken();
      removeUsername();
       this.$router.push('/')
     }
   },
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  padding: 0 30px;
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  box-shadow: 0 3px 16px 0 rgba(0,0,0,.1);
  background-color: #fff;
  z-index: 50;
}
.header-left-icon {
  float: left;
  line-height: 75px;
  font-size: 40px;
}
.header-right-btn {
  float: right;
  right: 0;
  height: 100%;
}
.user-info {
  float: right;
  margin-right:20px;
  line-height: 75px;
}
.head-portrait {
  width: 50px;
  height: 50px;
  overflow: hidden;
  float: right;
  border-radius: 100px;
  margin-top: 12px;
  margin-right: 18px;
  img{
    width: 50px;
  
    
  }
}
</style>