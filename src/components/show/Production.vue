<template>
  <div>
   <el-dialog
      title="修改产品基本信息"
      :visible.sync="dialogFormVisible"
      style="margin-top: -110px"
      :before-close="handleClose"
   >
      <el-form v-model="selectedProduction" style="text-align: left" ref="dataForm">
        <el-form-item label="id" label-width="120px" prop="username">
          <label>{{selectedProduction.id}}</label>
        </el-form-item>
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input v-model="selectedProduction.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可存款天数" label-width="120px" prop="phone">
          <el-input v-model="selectedProduction.period" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年利率" label-width="120px" prop="email">
          <el-input v-model="selectedProduction.annualRate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最小存款金额" label-width="120px" prop="email">
          <el-input v-model="selectedProduction.minAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大存款金额" label-width="120px" prop="email">
          <el-input v-model="selectedProduction.maxAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="递增存款金额" label-width="120px" prop="email">
          <el-input v-model="selectedProduction.incAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单日存款限额" label-width="120px" prop="email">
          <el-input v-model="selectedProduction.dailyAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存余量" label-width="120px" prop="surplus">
          <el-input v-model="selectedProduction.surplus" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedProduction)">确 定</el-button>
      </div>
    </el-dialog>
  <el-descriptions class="margin-top" title="产品基本信息" :column="3" ></el-descriptions>
    <el-card style="margin-left: -5px;width: 100%">
      <el-table
        :data="production"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :max-height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="id"
          sortable
          width="130">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          fit>
        </el-table-column>
        <el-table-column
          prop="period"
          label="可存款天数"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="annualRate"
          label="年利率"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="minAmount"
          label="最小存款金额"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="maxAmount"
          label="最大存款金额"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="incAmount"
          label="递增存款金额"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="dailyAmount"
          label="单日存款限额"
          sortable
          fit>
        </el-table-column>
        <el-table-column
          prop="surplus"
          label="库存余量"
          sortable
          fit>
        </el-table-column>


        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editProduction(scope.row)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="delete(scope.row)">
              删除
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="atom(scope.row)">
              原子信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
      </div>
    </el-card>
    <el-drawer
    title="原子服务详情"
    :visible.sync="AtomVisible"
    size="50%"
    :before-close="handleClose">
    <atoms :product="this.selectedProduction" ref="atom"></atoms>
  </el-drawer>
    <br>



  </div>
</template>

<script>

import Step2 from "../upload/step2";
import Atoms from "./atoms";

export default {
  name: "Production",
  components: {Atoms, Step2,},
  data(){
    return{
      production:[],
      dialogFormVisible: false,
      selectedProduction: [],
      selectedRolesIds: [],
      atoms:[],
      AtomVisible:false,
    }
  },
  mounted () {
    this.listProduct()
},
  computed: {
    tableHeight () {
      return window.innerHeight
    }
  },
  methods:{
    atom(production){
      this.AtomVisible=true

      this.selectedProduction =production,
      this.$refs.atom.load()
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    listProduct(){
      this.$axios.get('/product/productList',{headers:{Authorization:" Bearer "+this.$store.state.token}})
      .then(rep=>{
        console.log("200")
        if (rep && rep.data.code === 200) {
          this.production = rep.data.data
        }
      })
      .catch(rep=>{
        console.log(rep.response)
      })




  },
  editProduction(production){
    this.dialogFormVisible = true
    this.selectedProduction = production
},
    onSubmit(production){
      this.$confirm('确定提交修改吗')
        .then(_ => {
          console.log(production)
          this.$axios.post('/product/editProperty', {
            "id": production.id,
            "modification":production
          },{headers:{Authorization:" Bearer "+this.$store.state.token}})
            .then(rep=>{
              console.log(production)
              console.log(rep.data)
            })
            .catch(rep=>{
              console.log(rep.response)
            })
          this.dialogFormVisible=false
        })
        .catch(_ => {});

    }
},
delete(production){
    alert("暂无此功能")
}
}
</script>

<style scoped>

</style>
