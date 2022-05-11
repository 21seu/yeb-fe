<template>
  <div>
    <div>
      <el-input class="addPosInput" size="small"
                placeholder="添加职位..."
                suffix-icon="el-icon-plus"
                v-model="pos.name">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table border stripe size="small"
                :data="positions"
                style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位"
            width="120">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="enabled"
            label="是否启用"
            width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      positions: []
    }
  }
}
</script>

<style scoped>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}
.posManaMain{
  margin-top: 10px;
}
</style>