<template>
  <div>
    <div class="premissManaTool">
      <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" v-model="role.nameZh" placeholder="请输入角色中文名"></el-input>
      <el-button size="small" type="primary" icon="el-icon-plus">添加角色</el-button>
    </div>
    <div class="premissManaMain">
      <el-collapse accordion v-model="activeName" @change="change">
        <el-collapse-item :title="r.nameZh" name="r.id" v-for="(r,index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0;color: red" type="text" icon="el-icon-delete"></el-button>
            </div>
            <div>
              <el-tree show-checkbox :data="allMenus" :props="defaultProps"></el-tree>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data() {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      activeName: '2',
      roles: [],
      allMenus: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    change(rid) {
      if (rid) {
        this.initAllMenus();
      }
    },
    initAllMenus() {
      this.getRequest('/system/basic/permiss/menus').then(resp => {
        if (resp) {
          this.allMenus = resp;
        }
      })
    },
    initRoles() {
      this.getRequest('/system/basic/permiss/').then(resp => {
        if (resp) {
          this.roles = resp;
        }
      })
    }
  },
  mounted() {
    this.initRoles();
  }
}
</script>

<style scoped>
.premissManaTool {
  /*搞到一行*/
  display: flex;
  justify-content: flex-start;
}

.premissManaTool .el-input {
  width: 300px;
  margin-right: 6px;
}

.premissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>