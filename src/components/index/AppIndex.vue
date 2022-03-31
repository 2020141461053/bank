<template xmlns="http://www.w3.org/1999/html">
  <div>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: bold;font-size: 20px">公告</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2022" placement="top">
          <el-card>
            <h4>实现后台管理</h4>
            <p> 提交于 2022/2/17 14:49</p>
          </el-card>
        </el-timeline-item>
       </el-timeline>
    </div>
  </el-card>
  </div>
</template>

<script>import Head from "../common/Head";
export default {
  name: 'index',
  comments:{Head}
}
</script>

<style scoped>
.box-card {
  margin-top: 5px;
  width: 988px;
  height: 1050px;
  text-align: left;
}
</style>
