<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "log",
  data() {
    return {
      tableData: [{
        date: '2022-16-17',
        name: '100000',
        address: '购买00000号产品'
      }]
    }
  }
}
</script>

<style scoped>

</style>
