<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input clearable @clear="initEmps" size="small" prefix-icon="el-icon-search" placeholder="请输入员工姓名进行搜索..."
                  v-model="empName"
                  @keydown.enter.native="initEmps"
                  style="width: 300px;margin-right: 10px"></el-input>
        <el-button type="primary" size="small" icon="el-icon-search" @click="initEmps">搜索</el-button>
        <el-button type="primary" size="small">
          <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          高级搜索
        </el-button>
      </div>
      <div>
        <el-button type="success" size="small"><i class="fa fa-level-up"></i>导入数据</el-button>
        <el-button type="success" size="small"><i class="fa fa fa-level-down"></i>导出数据</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
      </div>
    </div>

    <div style="margin-top: 10px">
      <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          size="small"
          :data="emps"
          border
          stripe
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            fixed
            align="left"
            width="90">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="身份证号"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻状况"
            width="85">
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            width="50">
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            width="80">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            width="100">
        </el-table-column>
        <el-table-column
            prop="email"
            label="电子邮箱"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="联系地址"
            align="left"
            width="270">
        </el-table-column>
        <el-table-column
            prop="department.name"
            label="部门"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="joblevel.name"
            label="职称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="position.name"
            label="职位"
            width="100">
        </el-table-column>
        <el-table-column
            prop="engageForm"
            label="聘用形式"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            width="80">
        </el-table-column>
        <el-table-column
            prop="school"
            label="学校"
            width="150">
        </el-table-column>
        <el-table-column
            prop="specialty"
            label="专业"
            width="150">
        </el-table-column>
        <el-table-column
            prop="workState"
            label="在职状态"
            width="70">
        </el-table-column>
        <el-table-column
            prop="beginDate"
            label="入职日期"
            width="95">
        </el-table-column>
        <el-table-column
            prop="conversionTime"
            label="转正日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="beginContract"
            label="合同起始日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            prop="endContract"
            label="合同截止日期"
            align="left"
            width="95">
        </el-table-column>
        <el-table-column
            label="合同期限"
            align="left"
            width="100">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.contractTerm }}</el-tag>
            年
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button style="padding: 3px" size="mini">编辑</el-button>
            <el-button style="padding: 3px" type="primary" size="mini">查看高级资料</el-button>
            <el-button style="padding: 3px" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex;justify-content: flex-end">
        <el-pagination
            background
            layout="sizes, prev, pager, next, jumper, ->, total"
            @current-change="currentChange"
            @size-change="sizeChange"
            :total="total">
        </el-pagination>
      </div>
    </div>

    <div>
      <el-dialog
          title="添加员工"
          :visible.sync="dialogVisible"
          width="80%">
        <div>
          <el-form ref="empForm" :model="emp">
            <el-row>
              <el-col :span="6">
                <el-form-item field="name" label="姓名:" prop="name">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px" v-model="emp.name"
                            placeholder="员工名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="gender" label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender" size="mini">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="birthday" label="出生日期:" prop="birthday">
                  <el-date-picker
                      size="mini"
                      style="width: 150px"
                      v-model="emp.birthday"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item field="politicId" label="政治面貌:" prop="politicId">
                  <el-select v-model="emp.politicId" size="mini" style="width: 150px" placeholder="政治面貌">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item field="nationId" label="民族:" prop="nationId">
                  <el-select v-model="emp.nationId" size="mini" style="width: 150px" placeholder="民族">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="nativePlace" label="籍贯:" prop="nativePlace">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px" v-model="emp.nativePlace"
                            placeholder="籍贯"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="email" label="邮箱:" prop="email">
                  <el-input size="mini" prefix-icon="el-icon-message" style="width: 150px" v-model="emp.email"
                            placeholder="邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item field="address" label="联系地址:" prop="address">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px" v-model="emp.address"
                            placeholder="联系地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item field="posId" label="职位:" prop="posId">
                  <el-select v-model="emp.posId" size="mini" style="width: 150px" placeholder="职位">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="jobLevel" label="职称:" prop="jobLevel">
                  <el-select v-model="emp.jobLevel" size="mini" style="width: 150px" placeholder="职称">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="departmentId" label="部门:" prop="departmentId">
                  <el-select v-model="emp.departmentId" size="mini" style="width: 150px" placeholder="部门">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item field="phone" label="电话号码:" prop="phone">
                  <el-input size="mini" prefix-icon="el-icon-phone" style="width: 200px" v-model="emp.phone"
                            placeholder="电话号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item field="workId" label="工号:" prop="workId">
                  <el-input size="mini" prefix-icon="el-icon-phone" style="width: 200px" v-model="emp.workId"
                            placeholder="工号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="tiptopDegree" label="学历:" prop="tiptopDegree">
                  <el-select v-model="emp.tiptopDegree" size="mini" style="width: 150px" placeholder="学历">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="school" label="毕业院校:" prop="school">
                  <el-input size="mini" prefix-icon="el-icon-school" style="width: 150px" v-model="emp.school"
                            placeholder="毕业院校"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item field="specialty" label="专业名称:" prop="specialty">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 200px" v-model="emp.specialty"
                            placeholder="专业名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item field="beginDate" label="入职日期:" prop="beginDate">
                  <el-date-picker
                      size="mini"
                      style="width: 130px"
                      v-model="emp.beginDate"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="conversionTime" label="转正日期:" prop="conversionTime">
                  <el-date-picker
                      size="mini"
                      style="width: 130px"
                      v-model="emp.conversionTime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="beginContract" label="合同起始日期:" prop="beginContract">
                  <el-date-picker
                      size="mini"
                      style="width: 130px"
                      v-model="emp.beginContract"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item field="endContract" label="合同截至日期:" prop="endContract">
                  <el-date-picker
                      size="mini"
                      style="width: 170px"
                      v-model="emp.endContract"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item field="idCard" label="身份证号码:" prop="idCard">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 180px" v-model="emp.idCard"
                            placeholder="身份证号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item field="engageForm" label="聘用形式:" prop="engageForm">
                  <el-radio-group v-model="emp.engageForm" size="mini">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio label="劳务合同">劳务合同</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item field="wedlock" label="婚姻状况:" prop="wedlock">
                  <el-radio-group v-model="emp.wedlock" size="mini">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚">未婚</el-radio>
                    <el-radio label="离异">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      loading: false,
      emps: [],
      total: 0,
      currentPage: 1,
      size: 10,
      empName: '',
      dialogVisible: false,
      emp: {
        name: "",
        gender: "女",
        birthday: '',
        idCard: "410xxx19xx0101xxxx",
        wedlock: "未婚",
        nationId: 4,
        nativePlace: "郑州",
        politicId: 2,
        email: "xxxx@qq.com",
        phone: "1300000xxxx",
        address: "地址",
        departmentId: 6,
        jobLevelId: 1,
        posId: 1,
        engageForm: "全职",
        tiptopDegree: "高中",
        specialty: "某专业",
        school: "某学校",
        beginDate: '',
        workState: "在职",
        workId: '10000000',
        conversionTime: '',
        notWorkDate: '',
        beginContract: '',
        endContract: '',
        workAge: "无限",
        salaryId: 1
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  methods: {
    showAddEmpView() {
      this.dialogVisible = true;
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initEmps();
    },
    sizeChange(size) {
      this.size = size;
      this.initEmps();
    },
    initEmps() {
      this.loading = true;
      this.getRequest('/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.empName).then(resp => {
        this.loading = false;
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
        }
      })
    },
  },
  mounted() {
    this.initEmps();
  }
}
</script>

<style scoped>

</style>