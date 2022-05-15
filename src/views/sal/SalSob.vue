<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <el-button size="small" type="primary" icon="el-icon-plus" @click="showAddSalaryView">添加工资账套</el-button>
      <el-button size="small" type="success" icon="el-icon-refresh"></el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
          :data="salaries"
          border
          stripe>
        <el-table-column
            type="selection"
            width="40">
        </el-table-column>
        <el-table-column
            prop="name"
            label="账套名称"
            width="120">
        </el-table-column>
        <el-table-column
            prop="basicSalary"
            label="基本工资"
            width="120">
        </el-table-column>
        <el-table-column
            prop="trafficSalary"
            label="交通补助"
            width="70">
        </el-table-column>
        <el-table-column
            prop="lunchSalary"
            label="午餐补助"
            width="70">
        </el-table-column>
        <el-table-column
            prop="bonus"
            label="奖金"
            width="70">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="启用时间"
            width="100">
        </el-table-column>
        <el-table-column
            label="养老金"
            align="center">
          <el-table-column
              prop="pensionPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="pensionBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="医疗保险"
            align="center">
          <el-table-column
              prop="medicalPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="medicalBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="公积金"
            align="center">
          <el-table-column
              prop="accumulationFundPer"
              label="比率"
              width="70">
          </el-table-column>
          <el-table-column
              prop="accumulationFundBase"
              label="基数"
              width="70">
          </el-table-column>
        </el-table-column>
        <el-table-column
            label="操作">
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="添加工资账套"
        :visible.sync="dialogVisible"
        width="50%">
      <div style="display: flex;justify-content: space-around;align-items: center">
        <el-steps direction="vertical" :active="activeItemIndex">
          <el-step :title="itemName" v-for="(itemName,index) in salaryItemName" :key="index"></el-step>
        </el-steps>
        <el-input :placeholder="'请输入'+itemName+'...'" v-for="(itemName,index) in salaryItemName"
                  :key="index" v-show="activeItemIndex==index" style="width: 200px"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="preStep">{{ activeItemIndex == 10 ? '取消' : '上一步' }}</el-button>
    <el-button size="small" type="primary" @click="nextStep">{{ activeItemIndex == 10 ? '完成' : '下一步' }}</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SalSob",
  data() {
    return {
      activeItemIndex: 0,
      salaries: [],
      dialogVisible: false,
      salaryItemName: [
        '账套名称',
        '基本工资',
        '交通补助',
        '午餐补助',
        '奖金',
        '养老金比率',
        '养老金基数',
        '医疗保险比率',
        '医疗保险基数',
        '公积金比率',
        '公积金基数'
      ],
    }
  },
  methods: {
    preStep() {
      if (this.activeItemIndex == 0) {
        return;
      } else if (this.activeItemIndex == 10) {
        this.dialogVisible = false;
        return;
      }
      this.activeItemIndex--;
    },
    nextStep() {
      if (this.activeItemIndex == 10) {
        alert(1)
        return;
      }
      this.activeItemIndex++;
    },
    showAddSalaryView() {
      this.activeItemIndex = 0;
      this.dialogVisible = true;
    },
    initSalaries() {
      this.getRequest('/salary/sob/').then(resp => {
        console.log(resp)
        if (resp) {
          this.salaries = resp;
        }
      })
    }
  },
  mounted() {
    this.initSalaries();
  }
}
</script>

<style scoped>

</style>