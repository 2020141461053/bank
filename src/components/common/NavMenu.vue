<template>


<div>
 <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :default-active="currentPath"
      router
 >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
</el-menu>


</div>

</template>

<script>
import Head from "../common/Head"
  export default {
    name: 'NavMenu',
    comments:{Head},
    data () {
      return {
        navList: [
          {name: '/show', navItem: '产品管理'},
          {name: '/upload', navItem: '发布管理'},
        ],
        keywords: ''
      }
    },
    computed: {
      hoverBackground () {
        return '#ffd04b'
      },
      currentPath () {
        var x = this.$route.path.indexOf('/', 1)
        if (x !== -1) {
          return this.$route.path.substring(0, x)
        } else {
          return this.$route.path
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

   .el-menu-vertical-demo:not(.el-menu--collapse) {
     width: 200px;
     min-height: 400px;
     position: fixed;
     top:90px;
   }


</style>
