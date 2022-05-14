<template>
  <div>
    <div style="width: 500px">
      <el-input
          placeholder="请输入部门名称进行搜索..."
          prefix-icon="el-icon-search"
          v-model="filterText">
      </el-input>

      <el-tree
          :data="deps"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          ref="tree">
        <span class="custom-tree-node"
              slot-scope="{ node, data }"
              style="display: flex;justify-content: space-between;width: 100%"
        >
        <span>{{ node.label }}</span>
        <span>
          <el-button
              type="primary"
              size="mini"
              class="depBtn"
              @click="() => showAddDep(data)">
            添加部门
          </el-button>
          <el-button
              type="danger"
              size="mini"
              class="depBtn"
              @click="() => deleteAddDep(data)">
            删除部门
          </el-button>
        </span>
      </span>
      </el-tree>
      <el-dialog
          title="添加部门"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <table>
            <tr>
              <td>
                <el-tag>上级部门</el-tag>
              </td>
              <td>
                {{ pname }}
              </td>
            </tr>
            <tr>
              <td>
                <el-tag>部门名称</el-tag>
              </td>
              <td>
                <el-input v-model="dep.name" placeholder="请输入部门名称..."></el-input>
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDep">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "DepMana",
  data() {
    return {
      filterText: '',
      deps: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      dialogVisible: false,
      dep: {
        name: '',
        parentId: -1
      },
      pname: '',
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.initDeps();
  },
  methods: {
    initDep() {
      this.dep = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    addDep2Deps(deps, dep) {
      for (let i = 0; i < deps.length; i++) {
        let d = deps[i];
        if (d.id == dep.parentId) {
          // if (d.children == null) {
          //   d.children = []
          // }
          d.children = d.children.concat(dep);
          return;
        } else {
          this.addDep2Deps(d.children, dep);
        }
      }
    },
    doAddDep() {
      this.postRequest('/system/basic/department/', this.dep).then(resp => {
        if (resp) {
          // this.initDeps();
          this.addDep2Deps(this.deps, resp.obj);
          this.dialogVisible = false;
          this.initDep();
        }
      })
    },
    showAddDep(data) {
      this.dep.parentId = data.id;
      this.pname = data.name
      this.dialogVisible = true;
    },
    deleteAddDep() {

    },
    initDeps() {
      this.getRequest('/system/basic/department/').then(resp => {
        if (resp) {
          this.deps = resp;
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
}
</script>

<style scoped>
.depBtn {
  padding: 2px;
}
</style>