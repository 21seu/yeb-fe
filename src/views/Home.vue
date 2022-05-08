<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">
          云E办
        </div>
        <el-dropdown class="userInfo">
        <span class="el-dropdown-link">
          {{ user.name }}<i><img :src="user.userFace"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu index="1"
                        v-for="(item,index) in routes"
                        :key="index"
                        v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
                {{ item.name }}
              </template>
              <el-menu-item :index="children.path"
                            v-for="(children,indexj) in item.children">{{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>

export default {
  name: 'Home',

  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    routes() {
      console.log(this.$store.state.routes)
      return this.$store.state.routes;
    }
  },
  methods: {
    // menuClick(index) {
    //   this.$router.push(index);
    // }
  },
  created() {
  }
}
</script>
<style scoped lang="less">
.homeHeader {
  background: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: content-box;
}

.title {
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}

.homeHeader.userInfo {
  cursor: pointer;
}

.el-dropdown-link {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-right: 8px;
}
</style>
