<template>
<div>

  <el-collapse v-model="activeName" accordion>
    <el-collapse-item v-for="atom in atoms" :key="atom.id" :title="atom.name">
      <label>{{atom.detail}}</label>
      <el-switch
        style="display: block"
        v-model="atom.choice"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="使用"
        inactive-text="不使用"
        @change='changeStatus(atom)'
      >
      </el-switch>
      <el-checkbox-group v-model="atom.allow" @change="change(atom)" >
        <el-checkbox-button v-for="element in atom.params.constraints" :label="element" :key="element" >{{element}}</el-checkbox-button>
      </el-checkbox-group>
    </el-collapse-item>

  </el-collapse>
<br><br><el-card >
  <p>原子服务排序</p>
  <br><br>
  <draggable v-model="list" style="margin-top: 10px">
    <transition-group>

      <div v-for="element in list" :key="element.id">
        <el-card>
          {{element.name}}
        </el-card>
      </div>

    </transition-group>
  </draggable>
  <el-button @click="submit()">提交</el-button>
</el-card>
</div>
</template>

<script>
import Atom_choose from "./Atom_choose";
import draggable from 'vuedraggable';
export default {
  name: "atoms",
  components: {Atom_choose,draggable},
  props:[
    'product'
  ],
  data() {
    return {
      activeName: '1',
      list: [],
      atoms:[],
      idNum: 0,
      MyAtom:[]
    };
  },
  methods: {
    changeStatus(data){
      if(data.choice){
        this.list.push(data)
      }
      else {
        for (let i=0; i<this.list.length; i++){
          if (this.list[i].id === data.id){
            this.list.splice(i, 1)
          }
        }
      }
    },
    get(){
      this.$axios.get('/product/allServices',{headers:{Authorization:" Bearer "+this.$store.state.token}})
        .then(rep=>{
          this.atoms = rep.data.data
          let atoms=this.atoms
          for(let i=0;i<atoms.length;i++)
          {
            this.$set(this.atoms[i],'choice',false)
            this.$set(this.atoms[i],'allow',[])
            if(atoms[i].params!==null)
            {//获取enName然后创建键值
              let enName = atoms[i].params
              enName=enName[0].enName
              this.atoms[i].params=atoms[i].params[0]
              this.$set(this.atoms[i].params,enName,'')
              this.atoms[i].show=true
            }
            else{
              let params={}
              params.constraints=[]
              this.atoms[i].params=params
              this.atoms[i].show=false
            }

          }


        })
        .catch(rep=>{
          console.log("ERROR=:"+rep.response)
        })



    },
    load(){
      this.list=[]
      this.MyAtom=[]
      this.MyAtom=this.$props.product.serviceJson
      this.MyAtom=JSON.parse(this.MyAtom)
      let atom=this.MyAtom
      for(let i=0;i<atom.length;i++){
       for(let k=0;k<this.atoms.length;k++){

         if(atom[i].id===this.atoms[k].id)
          {
            this.atoms[k].choice=true
            if(atom[i].params!==undefined){
              console.log(atom[i])
              for (let key in  this.atoms[k].params){
                if(key==="enName"){

                  this.atoms[k].allow=atom[i].params[this.atoms[k].params[key]]
                  console.log(this.atoms[k])
                }
              }
            }
            this.changeStatus(this.atoms[k])
          }
        }

      }
    },
    change(data){
      if(data.choice){
        for (let i=0; i<this.list.length; i++){
          if (this.list[i].id === data.id){
            this.list.splice(i, 1)
          }
        }
        this.list.push(data)
      }

    },
    submit(){
      let atom=this.list;
      let tem;
      for(let i=0;i<atom.length;i++){
        for (let key in  atom[i].params){
          if(key==="enName"){
            tem=atom[i].params[key]

            atom[i].params[tem]=atom[i].allow
          }
        }
      }
      this.$axios.post('/product/editService',{
        "id":this.$props.product.id,
        "services":this.list
      },{headers:{Authorization:" Bearer "+this.$store.state.token}})
        .then(rep=>{


        })
    }
  },
  mounted() {
    this.get()
  }
}
</script>

<style scoped>
tittle{
  font-size: 15px ;
  margin-left: 20px;
}
tittle2{
  font-size: 17px ;
}
</style>
