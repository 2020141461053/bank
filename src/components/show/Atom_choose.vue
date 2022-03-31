<template>
  <div>
    <el-switch
      style="display: block;margin-left:-600px"
      v-model="choice"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="使用"
      inactive-text="不使用"
      @change='changeStatus'
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  name: "Atom_choose",
  data() {
    return {
      choice:false
    }
  },
  methods: {
    //该参数为当前的value值
    changeStatus: function (callback) {
      this.$emit("SendChange",callback);

    }
  }
}
</script>

<style scoped>

</style>
