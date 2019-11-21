<template>
  <div class="content-login">
    <!-- 左侧登录框 -->
    <div class="user-login">
      <div class="top-login">
        <img class="logo-login" src="../../assets/login_icon.png" alt />
        <span class="litle-login">黑马面面</span>
        <span class="usx-login"></span>
        <span class="uesr-login">用户登录</span>
      </div>
      <!-- 输入框 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        status-icon
        class="demo-ruleForm"
      >
        <el-form-item label prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            class="phone-input"
          ></el-input>
        </el-form-item>

        <el-form-item label prop="passwrd">
          <el-input
            v-model="loginForm.passwrd"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            class="password-input"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="captcha">
          <el-row class="captcha-row">
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.captcha"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="changeCaptcha" class="captcha" :src="captchaURL" alt />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- 协议 -->
      <el-checkbox class="checkbox" v-model="checked">
        我已阅读并同意
        <el-link type="primary">用户协议</el-link>和
        <el-link type="primary">隐私条款</el-link>
      </el-checkbox>
      <!-- 登录 注册按钮 -->
      <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button class="reg-btn" type="primary" @click="dialogFormVisible=true">注册</el-button>
    </div>

    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />

    <!-- 模态框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="imgs">
      <el-form :model="form">
        <!-- 上传文件 -->
        <el-form :model="registerForm">
          <!-- 头像 -->
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item label="手机" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 图形码 -->
          <el-row>
            <el-col :span="16">
              <el-form-item label="图形码" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="registerURL" alt class="imgsheig" @click = "regURL" />
            </el-col>
          </el-row>

          <!-- 验证码 -->

          <el-row>
            <el-col :span="16">
              <el-form-item label="验证码" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button type="primary" class="btn-width">获取短信信息</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//导入axios
import axios from "axios";
export default {
  name: "login",

  data() {
    //自定义规则
    const checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        const res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (res.test(value)) {
          callback();
        } else {
          callback(new Error("手机号格式不对哦"));
        }
      }
    };
    return {
      loginForm: {
        //手机
        phone: "",
        //密码
        passwrd: "",
        //验证码
        captcha: ""
      },
      //登录验证规则
      loginRules: {
        //手机号
        phone: [{ validator: checkAge, required: true }],
        //密码
        passwrd: [
          { required: true, message: "密码不能为空" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符" }
        ],
        //验证码:
        captcha: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "4个字符噢" }
        ]
      },
      //获取验证码地址
      captchaURL: "http://183.237.67.218:3002/captcha?type=login",
      //复选框按钮
      checked: true,
      //模态框
      imageUrl: "",
      dialogFormVisible: false,
      registerForm: "",
      form: {
        name: ""
      },
      formLabelWidth: "67px",
      //注册获取验证码
      registerURL:"http://183.237.67.218:3002/captcha?type=sendsms",
    };
  },

  methods: {
    //点击获取验证码
    changeCaptcha() {
      this.captchaURL = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
    },
    //点击登录按钮:
    submitForm(formName) {
      if (!this.checked) {
        this.$message.warning("协议还没勾选哦,必须要勾选");
        return;
      }
      // this.$refs['ruleForm']==> 获取饿了么的表单
      // 饿了么的表单.validate()
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证成功
          // alert("submit!");
          // 接口调用
          axios({
            url: "http://183.237.67.218:3002/login",
            method: "post",
            data: {
              phone: this.loginForm.phone,
              password: this.loginForm.password,
              code: this.loginForm.captcha
            },
            withCredentials: true
          }).then(res => {
            window.console.log(res);
            // if (res.data.code == 200) {
            //   // 成功
            //   this.$message.success("你可算回来啦！");
            // } else {
            //   // 失败
            //   this.$message.warning("登录失败了哦");
            // }
          });
        } else {
          // 验证失败
          window.console.log("error submit!!");
          return false;
        }
      });
    },

    //模态框
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //点击冲洗获取注册验证码
    regURL(){
      this.registerURL = `http://183.237.67.218:3002/captcha?type=sendsms&${Date.now()}`;
    },
  }
};
</script>

<style lang = "less">
.content-login {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 150, 250, 1)
  );
  height: 100%;
  .user-login {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 40px;
    padding-left: 43px;
    padding-right: 41px;
    box-sizing: border-box;
    .top-login {
      display: flex;
      align-items: center;
    }
    .logo-login {
      width: 22px;
      height: 17px;
      margin-right: 14px;
    }
    .litle-login {
      font-size: 24px;
      margin-right: 14px;
    }
    .use-login {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
      margin-right: 12px;
    }
    .user-login {
      font-size: 22px;
    }
    .phone-input {
      margin-top: 30px;
    }
    .password-input {
      margin-top: 25px;
    }
    .captcha-row {
      margin-top: 25px;
      .captcha {
        // width: 110px;
        width: 100%;
        height: 42px;
      }
    }

    // 协议
    .checkbox {
      color: #999;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-top: 32px;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }
    // 按钮
    .login-btn,
    .reg-btn {
      width: 100%;
      margin-left: 0;
      margin-top: 27px;
    }
  }

  /* 模态框中的样式 */
  /* 图片 */
  .imgsheig {
    height: 40px;
    width: 100%;
  }

  .btn-width {
    width: 100%;
  }
  .dialog-footer {
    text-align: center;
  }
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c5fa, #1394fa);
  }

  .el-dialog__title {
    color: white;
  }

  .imgs .el-dialog {
    width: 602px;
  }

  .el-form {
    padding-left: 0;
  }
  /* 上传文件 */

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
    /* margin: 0 auto; */
    margin-top: 20px;
  }

  .avatar-uploader {
    text-align: center;
  }
}
</style>