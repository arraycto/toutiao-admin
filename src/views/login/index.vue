<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form
        class="demo-ruleForm"
        :model="user"
        :rules="rules"
        ref="loginFormRef"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="user.mobile"
            prefix-icon="el-icon-mobile"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="user.code" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>

        <el-form-item prop="checked">
          <el-checkbox v-model="user.checked"
            >我已阅读并同意协议规则</el-checkbox
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login-btn" @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

//导入封装请求的request
import request from '@/utils/request.js'
export default {
  name: 'HomeContainer',
  data() {
    //自定义手机验证规则
    /*
    var checkTelphone = (rule, value, callback) => {
      const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error('手机不合法'))
    }
    */

    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        checked: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码', trigger: 'blur' }
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议！'))
              }
            },
            trigger: 'change'
          }
        ]
      },

    }
  },
  methods: {
    onLogin() {

      this.$refs.loginFormRef.validate(valid => {

        //不通过返回出去
        if (!valid) {
          return
        }
        //通过就发请求
        request({
          method: 'POST',
          url: '/mp/v1_0/authorizations',
          data: this.user
        }).then(res => {


          this.$message.success('登录成功！')
          //获取登录接口的数据并保存到本地存储
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          this.$router.push('/home')

        }).catch(err => {
          this.$message.error('手机号或验证码错误！')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-image: url(./bgc.jpg);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-card {
    width: 450px;
    height: 350px;
    position: relative;

    .demo-ruleForm {
      position: absolute;
      bottom: -10px;
      padding: 20px;
      width: 80%;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>