<template>
  <div class="login">
    <div class="form-wrap">
    <ul class="menu-tab">
      <li
        v-for="(item,index) in menuTab"
        :key="item"
        @click="check(index)"
        :class="{current:currentIndex==index}"    
      >{{item}}</li>  
    </ul>
     <sign :currentIndex="currentIndex" ref="newForm" @changeLogin="changeLogin"/>
  </div>
   </div>
</template>

<script>
import sign from 'components/public/sign/sign.vue'
export default {
  data() {  
    return {
      menuTab: ["登录", "注册"],
      currentIndex: 0,     
    }
  },
  components :{
      sign
  },
 
  methods: {
    check(index) {
      // console.log(formName);
      //  this.$refs[formName].resetFields();
      if(index!=this.currentIndex) {
         this.$refs.newForm.$refs['ruleForm'].resetFields() 
      } 
     this.currentIndex = index;
    },  
    changeLogin() {
      this.currentIndex=0
      this.$refs.newForm.$refs['ruleForm'].resetFields() 
    }
     
  }
};
</script>
<style lang="scss" scoped>
.login {
 height: 100vh;
  background-color: #344a5f;
  .menu-tab {
    // width: 330px;
    margin: auto;
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      font-style: 14px;
      line-height: 36px;
      cursor: pointer;
      color: #fff;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
.form-wrap {
  width: 400px;
  padding-top: 100px;
  margin: auto;
}
</style>

