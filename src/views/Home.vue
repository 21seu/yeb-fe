<template>
  <div>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router>
          <el-submenu index="1"
                      v-for="(item,index) in this.$router.options.routes"
                      :key="index"
                      v-if="!item.hidden">
            <template slot="title"><i class="el-icon-location"></i>{{item.name}}</template>
            <el-menu-item index="children.path"
                          v-for="(children,indexj) in item.children">{{ children.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>

</template>

<script>

export default {
  name: 'Home',

  data() {
    return {}
  },
  computed: {},
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

</style>
