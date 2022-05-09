<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana">部门管理</el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana">职位管理</el-tab-pane>
      <el-tab-pane label="职称管理" name="JoblevelMana">职称管理</el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana">奖惩规则</el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana">权限组</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../components/sys/DepMana";
import EcMana from "../../components/sys/EcMana";
import JoblevelMana from "../../components/sys/JoblevelMana";
import PermissMana from "../../components/sys/PermissMana";
import PosMana from "../../components/sys/PosMana";

export default {
  name: "SysBasic",
  components: [
    DepMana,
    EcMana,
    JoblevelMana,
    PermissMana,
    PosMana
  ],
  data() {
    return {
      activeName: 'DepMana'
    }
  }
}
</script>

<style scoped>

</style>