<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/logo.png" alt="" width="90px" style="float: left;margin-top: -27px;margin-left: -10px">
    </a>
    <span style="font-size: 30px;font-weight: bold;position:absolute;left: 150px;color: #070000">    三湘银行</span>
   </el-card>
</template>

<script>
  /*import {createRouter} from '../../router'

  export default {
    name: 'Header',
    methods: {
      logout () {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/index')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {})
      }
    }
  }*/
</script>

<style scoped>


  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
    color: white;
    margin:0;
    padding:0;
    border:0px solid #000000;
    position: sticky;
    top:10px;
    z-index: 110;
  }

</style>
