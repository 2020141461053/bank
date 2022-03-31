<template>
<div  style="text-align:center">
  <el-card   style=" width: 1300px;margin-left:50px ">
  <div  ></div>
  <el-form  label-width="120px" :model="form" style="margin-left:190px ; margin-right: 240px" rel="s1":rules="rules" >
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="可存款天数" prop="period">
      <el-input v-model="form.period"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="年利率" prop="annualRate">
      <el-input v-model="form.annualRate"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="最小存款金额" prop="minAmount">
      <el-input v-model="form.minAmount"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="最大存款金额" prop="maxAmount">
      <el-input v-model="form.maxAmount"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="递增存款金额" prop="incAmount">
      <el-input v-model="form.incAmount"style="width: 500px"></el-input>
    </el-form-item>
    <el-form-item label="单日存款限额" prop="dailyAmount">
      <el-input v-model="form.dailyAmount"style="width: 500px"></el-input>
    </el-form-item>

  </el-form>
  </el-card>
</div>
</template>

<script>
export default {
  name: "step1",
  data() {
    return {
      labelPosition: 'right',
      form: {
        name: '',
        period: '',
        annualRate: '',
        minAmount: '',
        maxAmount: '',
        incAmount: '',
        dailyAmount: ''

      },
      rules: {
        name: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        period: [{required: true, message: '可存天数为整数', trigger: 'blur',pattern:/^[1-9]\d*$/}],
        annualRate: [{required: true, message: '年利率不为空', trigger: 'blur'}],
        minAmount: [{required: true, message: '最小存款金额为整数', trigger: 'blur',pattern:/^[1-9]\d*$/}],
        maxAmount: [{required: true, message: '最大存款金额为整数', trigger: 'blur',pattern:/^[1-9]\d*$/}],
        incAmoun: [{required: true, message: '递增存款金额为整数', trigger: 'blur',pattern:/^[1-9]\d*$/}],
        dailyAmount: [{required: true, message: '单日存款金额为整数', trigger: 'blur',pattern:/^[1-9]\d*$/}],

      },
    }

  }
}



</script>

<style scoped>

</style>
