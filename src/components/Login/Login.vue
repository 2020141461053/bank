<template>

  <body>
  <div id="paper"><Head></Head>
    <el-form :model="loginForm" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked"
                   label-position="left"><span style="color: #000102">记住密码</span></el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 40%;background: #000000;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
     </div>
  </body>
</template>
<script>
import Head from "../common/Head";
  export default{
    components: {Head},
    data () {
      return {

        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false
      }
    },
    methods: {
      login () {
        var _this = this
        this.$axios
          .post('/admin/login', {
            id: this.loginForm.username,
            password: this.loginForm.password
          })

          .then(rep => {

            if (rep.data.code === 200) {
              console.log(rep.headers)
             _this.$store.commit('login', rep.headers["authorization"])
             _this.$store.commit('initIdentity', rep.data.data)
              console.log("TOKEN="+rep.headers["authorization"])
             this.$router.replace({path:'/show'})
             }
            else {

            }

          })
          .catch(failResponse => {
           console.log(failResponse.response)

          })
      }

    }
    }
</script>
<style>
   #paper {
    background:url("../../assets/login.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
   body{
     margin: 0;
   }
  .login-container {

    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background:rgba(255,255,255,0.5);
    border: 1px solid #000000;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    font-size:30px;
    color: #3f3f3f;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

</style>
