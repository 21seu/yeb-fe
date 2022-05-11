<template>
  <div>
    <div>
      <el-input class="addPosInput" size="small"
                placeholder="添加职位..."
                suffix-icon="el-icon-plus"
                @keydown.enter.native="addPosition"
                v-model="pos.name">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>
    </div>
    <div class="posManaMain">
      <el-table border stripe size="small"
                :data="positions"
                @selection-change="handlerSelectionChange"
                style="width: 70%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
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
            width="150px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
            <el-tag v-else type="danger">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button size="small" style="margin-top: 8px" type="danger"
               :disabled="this.multipleSelection.length == 0"
               @click="deleteMany">批量删除
    </el-button>
    <el-dialog
        title="编辑职位"
        :visible.sync="dialogVisible"
        width="30%">
      <table>
        <tr>
          <td><el-tag>职位名称</el-tag></td>
          <td><el-input size="small" v-model="updatePos.name" class="updatePosInput"></el-input></td>
        </tr>
        <tr>
          <td>
            <el-tag>是否启用</el-tag>
          </td>
          <td>
            <el-switch
                style="margin-left: 6px"
                v-model="updatePos.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="已启用"
                inactive-text="未启用">
            </el-switch>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
    </el-dialog>
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
      positions: [],
      dialogVisible: false,
      updatePos: {
        name: '',
        enabled: false
      },
      multipleSelection: []
    }
  },
  methods: {
    deleteMany() {
      this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '';
        this.multipleSelection.forEach(item => {
          // ids += 'ids=' + item.id + '&';
          ids += item.id + ','
        });
        ids = ids.substring(0, ids.length - 1)
        this.getRequest('/system/basic/pos/batchDel?ids=' + ids).then(resp => {
          if (resp) {
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handlerSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    doUpdate() {
      this.putRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.initPositions();
          this.dialogVisible = false;
        }
      })
    },
    addPosition() {
      if (!this.pos.name) {
        this.$message.error("职位名称不能为空")
      } else {
        this.postRequest('/system/basic/pos/', this.pos).then(resp => {
          if (resp) {
            this.initPositions();
            this.pos.name = '';
          }
        })
      }
    },
    showEditView(index, data) {
      //数据拷贝，防止页面上的表单数据也同步修改
      Object.assign(this.updatePos, data);
      this.updatePos.createDate = '';
      this.dialogVisible = true;

    },
    handleDelete(index, data) {
      // this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
      this.$confirm('此操作将永久删除【' + data.name + '】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/' + data.id).then(resp => {
          if (resp) {
            this.initPositions();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    initPositions() {
      this.getRequest('/system/basic/pos/').then(resp => {
        if (resp) {
          this.positions = resp;
        }
      })
    }
  },
  mounted() {
    this.initPositions();
  }
}
</script>

<style scoped>
.addPosInput {
  width: 300px;
  margin-right: 8px;
}

.posManaMain {
  margin-top: 10px;
}

.updatePosInput {
  width: 200px;
  margin-left: 8px;
}
</style>