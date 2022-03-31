<template>
  <div >
    <el-dialog
      title="原子服务流程预览"
      :visible.sync="atomVisible"
      style="text-align: left"
    >

      <el-steps  :active="1"  >
        <el-step  v-for="atom in this.atom" :key="atom"  :title=atom.name> </el-step>
      </el-steps>

      <div  class="dialog-footer"  style="text-align: right">
        <el-button @click="atomVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确定创建</el-button>
      </div>
    </el-dialog>
  <div style="z-index: 20" >
    <el-steps :active="active" finish-status="success"  align-center>
      <el-step
        v-for="(item,index) of stepTitle"
        :key="index"
        :title="item"
        :class="stepClassObj(index)"
        @click.native="handleStep(index)"

      />
    </el-steps>
  </div>
    <!-- 内容展示区 -->
<div >
    <step-content1  v-show="active === 0 ">
      <step1 ref="step1"> </step1>
      <el-button @click="handleNextStep()"  >下一步</el-button>
    </step-content1>
    <step-content2 v-show="active === 1 ">
      <step2 ref="step2"></step2>
      <el-button @click="handleLastStep()" >上一步</el-button>
      <el-button @click="sure()">提交</el-button>
    </step-content2>

    </div>
  </div>
</template>


<script>
import step1 from "./step1";
import step2 from "./step2";

export default {
  name: "step",
  components:{step1,step2},
  data() {
    return {
      // 步骤
      active: 0,
      // 已选步骤
      stepSuc: [0],
      // 步骤标题
      stepTitle: ['填写基本信息', '原子服务及排序'],
      atomVisible:false,
      form:[],
      atom:[]
    }
  },
  methods: {
    // 点击步骤条
    handleStep(val) {
      if (this.stepSuc.includes(val) === true) {
        this.active = val
      }
    },
    // 组件点击上一步
    handleLastStep() {
      if(--this.active === 0) { this.active = 0 }
    },
    // 组件点击下一步
    handleNextStep() {
      this.stepSuc.push(++this.active)
    },

    submit(){

      this.$axios.put('/product/create',{
        "properties":this.form,
        "services":this.atom
      },{headers:{Authorization:" Bearer "+this.$store.state.token}})
        .then(rep=>{
          if(rep.data.code==="200") {
            alert(" 提交成功")
            this.$refs.step1.form = []
            this.$refs.step2.list = []
          }
          else{
           alert(rep.data.msg)
          }

        })

},
    sure(){
      let form=this.$refs.step1.form

      for (let key in form)
      {
        if (key === "name"){
          continue
        }
        form[key] = parseInt(form[key])
      }
      let atom=this.$refs.step2.list;
      let tem;
      for(let i=0;i<atom.length;i++){
        for (let key in  atom[i].params){
        if(key==="enName"){
          tem=atom[i].params[key]

        atom[i].params[tem]=atom[i].allow
        }
        }
      }
      this.atom=atom
      this.form=form
      this.atomVisible=true
    },


  },
    computed: {
    // 动态给步骤加样式
    stepClassObj(val){
      return (val) =>{
        return{
          stepSuc: this.stepSuc.includes(val),
          stepErr: !this.stepSuc.includes(val)
        }
      }
    }
  },




}
</script>

<style scoped>
.stepSuc :hover{
  cursor: pointer;
}
.stepErr :hover{
  cursor: not-allowed;
}
.el-button{
  margin-top: 50px ;
  margin-right: 100px

}
 .el-step{
   height: 97px !important;
 }
</style>
