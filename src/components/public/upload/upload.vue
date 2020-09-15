<template>
  <el-upload
    class="avatar-uploader"
    action="https://up-z2.qiniup.com"
    :show-file-list="false"
    :data="uploadData"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { GetQiniuToken } from "@/api/common";
export default {
  name: "upload",
  data() {
    return {
      imageUrl: "",
      // 上传文件配置
      uploadData: {
      }
    };
  },
  props:{
    imgUrl:{
      type:String,
      default:""
      
    }
  },
  beforeMount() {
    this.getQiniuToken();
  },
  methods: {
    // 获取七牛云token
    getQiniuToken() {
      const requestData = {
        ak: "rzsDUpG79OCse-0uFl3ZCKOQgoiIKLJQL-XBJA7g",
        sk: "c0OrwxQ_Ykh7TFAulc5Pxh0LKiD_IhsuFadupluW",
        buckety: "cars-admin-hyj"
      };
      GetQiniuToken(requestData).then(res => {
        const data = res.data.data;
      
        if (data.token) {
          this.uploadData.token = data.token;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = `http://qgkn5e9ts.hn-bkt.clouddn.com/${res.key}`
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit("update:value",this.imageUrl)
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      
      let fileName = file.name;
      let key = encodeURI(fileName);
      this.uploadData.key = key
      return isJPG && isLt2M;
    }
  },
  watch:{
    imgUrl:{
      handler(newValue){
        if(newValue){ this.imageUrl = newValue}         
      },
      immediate:true
    }
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

