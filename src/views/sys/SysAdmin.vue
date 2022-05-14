<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 10px">
      <el-input v-model="keywords" size="small" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px;margin-right: 10px"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="doSearch">搜索</el-button>
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(admin,index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ admin.name }}</span>
          <el-button style="float: right; padding: 3px 0;color: red" type="text" icon="el-icon-delete"
                     @click="deleteAdmin(admin)"></el-button>
        </div>
        <div>
          <div class="img-container">
            <img :src="admin.userFace" :alt="admin.name" :title="admin.name" class="userFace-img">
          </div>
        </div>
        <div class="userInfo-container">
          <div>用户名：{{ admin.name }}</div>
          <div>手机号码：{{ admin.phone }}</div>
          <div>电话号码：{{ admin.telephone }}</div>
          <div>地址：{{ admin.address }}</div>
          <div>用户状态：
            <el-switch
                @change="enabledChange(admin)"
                v-model="admin.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用">
            </el-switch>
          </div>
          <div>用户角色：
            <el-tag size="small" style="margin-right: 10px" type="success" v-for="(role,indexj) in admin.roles"
                    :key="indexj">{{ role.nameZh }}
            </el-tag>
            <el-popover
                @hide="hidePop(admin)"
                @show="showPop(admin)"
                placement="right"
                title="角色列表"
                width="200"
                trigger="click"
            >
              <el-select size="small" v-model="selectRoles" multiple placeholder="请选择">
                <el-option
                    v-for="(r,index) in allRoles"
                    :key="index"
                    :label="r.nameZh"
                    :value="r.id">
                </el-option>
              </el-select>
              <el-button slot="reference" type="text" icon="el-icon-more"></el-button>
            </el-popover>
          </div>
          <div>
            备注：{{ admin.remark }}
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysAdmin",
  data() {
    return {
      admins: [],
      keywords: '',
      allRoles: [],
      selectRoles: []
    }
  },
  methods: {
    hidePop(admin) {
      let roles = [];
      Object.assign(roles, admin.roles);
      let flag = false;
      if (roles.length != this.selectRoles.length) flag = true;
      else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectRoles.length; j++) {
            let sr = this.selectRoles[j];
            if (role.id == sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length != 0) flag = true;
      }
      if (flag) {
        let url = '/system/admin/role?adminId=' + admin.id;
        this.selectRoles.forEach(r => {
          url += '&rids=' + r;
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.initAdmins();
          }
        })
      }
    },
    showPop(admin) {
      this.initAllRoles();
      let roles = admin.roles;
      this.selectRoles = [];
      roles.forEach(r => {
        this.selectRoles.push(r.id);
      })
    },
    initAllRoles() {
      this.getRequest('/system/admin/roles').then(resp => {
        if (resp) {
          this.allRoles = resp;
        }
      })
    },
    enabledChange(admin) {
      this.putRequest('/system/admin/', admin).then(resp => {
        if (resp) {
          this.initAdmins();
        }
      })
    },
    deleteAdmin(admin) {
      this.$confirm('此操作将永久删除【' + admin.name + '】操作员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/admin/' + admin.id).then(resp => {
          if (resp) {
            this.initAdmins();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doSearch() {
      this.initAdmins();
    },
    initAdmins() {
      this.getRequest('/system/admin/?keywords=' + this.keywords).then(resp => {
        if (resp) {
          this.admins = resp;
        }
      })
    }
  },
  mounted() {
    this.initAdmins();
  }
}
</script>

<style scoped>
.admin-card {
  width: 350px;
  margin-bottom: 20px;

}

.admin-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
}

.userFace-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.img-container {
  width: 100px;
  display: flex;
  justify-content: center;
}

.userInfo-container {
  font-size: 12px;
  color: #409eff;
}
</style>