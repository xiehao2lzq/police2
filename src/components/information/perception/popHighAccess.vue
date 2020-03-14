<template>
  <div class="popHighAccess">
    <el-dialog :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="capTime" label="时间" ></el-table-column>
        <el-table-column property="xqName" label="小区"></el-table-column>
        <el-table-column property="capAddress" label="抓拍位置"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"popHighAccess",
  props: ["gridData"],
  data() {
    return {
        dialogTableVisible:false,
    };
  },
  methods: {
      show(){
          console.log(321)
          this.dialogTableVisible = true
      }
  }
};
</script>

<style lang="scss" scoped>
</style>