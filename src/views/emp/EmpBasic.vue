<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input size="small" prefix-icon="el-icon-search" placeholder="请输入员工姓名进行搜索..."
                  style="width: 300px;margin-right: 10px"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" size="small">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success" size="small"><i class="fa fa-level-up"></i>导入数据</el-button>
        <el-button type="success" size="small"><i class="fa fa fa-level-down"></i>导出数据</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus">添加员工</el-button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "EmpBasic"
}
</script>

<style scoped>

</style>