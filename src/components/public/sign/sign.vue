<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm login-form"
      size="midele"
    >
      <el-form-item label="邮箱" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          minlength="6"
          maxlength="12"
        ></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass" v-if="currentIndex!=0">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <el-row :gutter="0">
          <el-col :span="14">
            <el-input v-model="ruleForm.code"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button
              type="success"
              class="verification"
              :disabled="codeButtonStatus"
              @click="getSms"
            >{{codeButtonText}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          @click="submitForm('ruleForm')"
          class="block"
          :disabled="loginButton"
        >{{currentIndex==0?'登录':'注册'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入加密方式
import sha1 from "js-sha1";
import { GetSms, Register, Login } from "@/api/login.js";
import { stripscript } from "@/utils/validate";
export default {
  name: "Sign",
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    //验证码规则
    var alidateCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      let reg = /^[a-z0-9]{6}$/;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };

    //账户规则
    var validateUsername = (rule, value, callback) => {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };

    //密码规则
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式不对"));
      } else {
        callback();
      }
    };
    //验证2次密码word
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "1069234622@qq.com",
        password: "a123456",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: alidateCode, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      // 验证码按钮状态
      codeButtonStatus: false,
      codeButtonText: "获取验证码",

      //登录注册按钮状态
      loginButton: true,

      // 定时器
      timer: null
    };
  },
  watch: {
    currentIndex() {
      clearInterval(this.timer);
      this.codeButtonStatus = false;
      this.codeButtonText = "获取验证码";
    }
  },
  methods: {
    // 登录注册按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.currentIndex == 0 ? this.login() : this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    login() {     
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
      };
      Login(requestData)
        .then(res => {
          //登录成功之后
   
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.$store.commit('setUsername',res.data.data.username)
          this.$store.commit('setToken',res.data.data.token)
          this.$router.push('/ParkingIndex')
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 注册
    register() {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
      };
      Register(requestData)
        .then(res => {
          //注册成功之后
          this.$emit('changeLogin')
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取验证码
    getSms() {
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空");
        return false;
      } else if (reg.test(this.ruleForm.username) == false) {
        this.$message.error("邮箱格式错误");
        return false;
      }
      let requestData = { username: this.ruleForm.username, module: "login" };
      // 改变请求验证码的模式分为注册和登录
      if (this.currentIndex != 0) {
        requestData.module = "register";
      } else {
        requestData.module = "login";
      }

      this.codeButtonStatus = true;
      this.codeButtonText = "发送中";
        GetSms(requestData)
          .then(res => {
            this.loginButton = false;
            this.$message({
              message: res.data.message,
              type: "success"
            });
            // 调定时器，倒计时60s
            this.countDown(60);
          })
          .catch(err => {
          this.codeButtonStatus = false;
          this.codeButtonText="再次获取";
            console.log(err);
          });
    },

    // 倒计时方法
    countDown(number) {
      let time = number;
      // 判断定时器是否存在，存在的话清除
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        time--;
        if (time == 0) {
          clearInterval(this.timer);
          this.codeButtonStatus = false;
          this.codeButtonText = "再次获取";
        } else {
          this.codeButtonText = `倒计时${time}秒`;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  margin: 15px auto;
}
.verification {
  position: absolute;
  right: 0;
  top: 0;
}
.block {
  width: 100%;
}
</style>

