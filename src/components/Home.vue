<template>
  <div id="home">
    <Head></Head>
    <el-button @click="logout" style="z-index: 120 ; position: fixed; top:20px; right:40px" > 退出登录</el-button>
    <el-container>
      <el-aside width="220px">
        <nav-menu ></nav-menu>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>
<script>

import NavMenu from "./common/NavMenu";
import Head from  "./common/Head"
export default {
  components: {
    NavMenu,
    Head
  },
  methods: {
    logout() {
      this.$axios.get('/admin/logout', {headers: {Authorization: " Bearer " + this.$store.state.token}})
        .then(rep => {
          alert("已退出登录")
          this.$router.replace({path:'/login'})
        })
        .catch()
    }
  }
}
</script>

<style>
.nav-menu {
  /*margin-bottom: 40px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
}
</style>
