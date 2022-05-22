<template>
  <div>
    <div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-input clearable @clear="initEmps" size="small" prefix-icon="el-icon-search" placeholder="请输入员工姓名进行搜索..."
                    v-model="empName"
                    @keydown.enter.native="initEmps"
                    :disabled="showAdvanceSearchVisible"
                    style="width: 300px;margin-right: 10px"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" @click="initEmps"
                     :disabled="showAdvanceSearchVisible">搜索
          </el-button>
          <el-button type="primary" size="small" @click="showAdvanceSearchVisible=!showAdvanceSearchVisible">
            <i :class="showAdvanceSearchVisible?'fa fa-angle-double-up':'fa fa-angle-double-down'"
               aria-hidden="true"></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <!--        <el-button type="success" size="small"><i class="fa fa-level-up"></i>导入数据</el-button>-->
          <!--        <el-button type="success" size="small"><i class="fa fa fa-level-down"></i>导出数据</el-button>-->
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-show="showAdvanceSearchVisible"
           style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px">
        <el-row>
          <el-col :span="5">
            政治面貌：
            <el-select v-model="searchValue.politicId" size="mini" style="width: 130px" placeholder="政治面貌">
              <el-option
                  v-for="item in politicsstatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            民族：
            <el-select v-model="searchValue.nationId" size="mini" style="width: 130px" placeholder="民族">
              <el-option
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            职位：
            <el-select v-model="searchValue.posId" size="mini" style="width: 130px" placeholder="职位">
              <el-option
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            职称：
            <el-select v-model="searchValue.jobLevelId" size="mini" style="width: 130px" placeholder="职称">
              <el-option
                  v-for="item in joblevels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            聘用形式：
            <el-radio-group v-model="searchValue.engageForm" size="mini">
              <el-radio label="劳动合同">劳动合同</el-radio>
              <el-radio label="劳务合同">劳务合同</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="5">
            所属部门：
            <el-popover
                placement="bottom"
                title="请选择部门"
                width="200"
                trigger="manual"
                v-model="visible2">
              <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                       @node-click="searchHandleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 130px;display: inline-flex;border: 1px solid #dedede;height: 24px; border-radius: 5px;cursor: pointer; align-items: center;font-size: 13px;padding-left: 8px;box-sizing: border-box"
                   @click="showDevView2">{{ inputDepName }}
              </div>
            </el-popover>
          </el-col>
          <el-col :span="10">
            入职日期：
            <el-date-picker
                v-model="searchValue.beginDateScope"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="5" :offset="4">
            <el-button size="mini">取消</el-button>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="initEmps('advanced')">搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </transition>


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
            <el-button style="padding: 3px" size="mini" @click="showEditEmp(scope.row)">编辑</el-button>
            <el-button style="padding: 3px" type="primary" size="mini">查看高级资料</el-button>
            <el-button style="padding: 3px" type="danger" size="mini" @click="deleteEmp(scope.row)">删除</el-button>
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
          :title="title"
          :visible.sync="dialogVisible"
          width="80%">
        <div>
          <el-form ref="empForm" :model="emp" :rules="rules">
            <el-row>
              <el-col :span="6">
                <el-form-item field="name" label="姓名:" prop="name">
                  <el-input size="mini" prefix-icon="el-icon-edit" style="width: 150px" v-model="emp.name"
                            placeholder="员工名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="gender" label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender" size="mini" style="margin-top: 8px">
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
                        v-for="item in politicsstatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
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
                        v-for="item in nations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
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
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="jobLevel" label="职称:" prop="jobLevel">
                  <el-select v-model="emp.jobLevelId" size="mini" style="width: 150px" placeholder="职称">
                    <el-option
                        v-for="item in joblevels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item field="departmentId" label="部门:" prop="departmentId">
                  <el-popover
                      placement="bottom"
                      title="请选择部门"
                      width="200"
                      trigger="manual"
                      v-model="visible">
                    <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                             @node-click="handleNodeClick"></el-tree>
                    <div slot="reference"
                         style="width: 150px;display: inline-flex;border: 1px solid #dedede;height: 24px; border-radius: 5px;cursor: pointer; align-items: center;font-size: 13px;padding-left: 8px;box-sizing: border-box"
                         @click="showDevView">{{ inputDepName }}
                    </div>
                  </el-popover>
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
                <el-form-item field="workID" label="工号:" prop="workID">
                  <el-input size="mini" prefix-icon="el-icon-phone" style="width: 200px" v-model="emp.workID"
                            placeholder="工号" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item field="tiptopDegree" label="学历:" prop="tiptopDegree">
                  <el-select v-model="emp.tiptopDegree" size="mini" style="width: 150px" placeholder="学历">
                    <el-option
                        v-for="item in tiptopDegree"
                        :key="item"
                        :label="item"
                        :value="item">
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
                  <el-radio-group v-model="emp.engageForm" size="mini" style="margin-top: 8px">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio label="劳务合同">劳务合同</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item field="wedlock" label="婚姻状况:" prop="wedlock">
                  <el-radio-group v-model="emp.wedlock" size="mini" style="margin-top: 8px">
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
            <el-button type="primary" @click="doAddEmp">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerEmp",
  data() {
    return {
      visible2: false,
      searchValue: {
        politicId: null,
        nationId: null,
        posId: null,
        jobLevelId: null,
        engageForm: "",
        departmentId: null,
        beginDateScope: null
      },
      showAdvanceSearchVisible: false,
      title: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      allDeps: [],
      visible: false,
      loading: false,
      inputDepName: '',
      emps: [],
      total: 0,
      currentPage: 1,
      size: 10,
      empName: '',
      dialogVisible: false,
      emp: {
        id: null,
        name: "",
        gender: "",
        birthday: '',
        idCard: "",
        wedlock: "",
        nationId: null,
        nativePlace: "",
        politicId: null,
        email: "",
        phone: "",
        address: "",
        departmentId: null,
        jobLevelId: null,
        posId: null,
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: '',
        workState: '在职',
        workID: '',
        conversionTime: '',
        notWorkDate: '',
        beginContract: '',
        endContract: '',
        workAge: "",
        salaryId: 1
      },
      nations: [],
      politicsstatus: [],
      joblevels: [],
      positions: [],
      tiptopDegree: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学'],
      rules: {
        name: [{required: true, message: '请输入员工姓名', trigger: 'blur'}],
        gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
        birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
        idCard: [{required: true, message: '请输入身份证', trigger: 'blur'}],
        wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
        nationId: [{required: true, message: '请输入民族', trigger: 'blur'}],
        nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
        politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
          type: 'email',
          message: '邮箱地址格式不正确',
          trigger: 'blur'
        }],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        departmentId: [{required: true, message: '请输入部门', trigger: 'blur'}],
        jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
        posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
        tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
        specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
        school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
        beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
        workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
        workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
        conversionTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
        conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
        beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
        endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
        notWorkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}]
      }
    }
  },
  methods: {
    searchHandleNodeClick(data) {
      this.inputDepName = data.name;
      this.searchValue.departmentId = data.id;
      this.visible2 = !this.visible2;
    },
    showEditEmp(data) {
      this.title = '编辑员工信息';
      this.emp = data;
      this.inputDepName = data.department.name;
      this.initPositions();
      this.dialogVisible = true;
    },
    deleteEmp(data) {
      this.$confirm('此操作将永久删除' + data.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/employee/basic/' + data.id).then(resp => {
          if (resp) {
            this.initEmps();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doAddEmp() {
      if (this.emp.id) {
        console.log(this.emp)
        this.$refs['empForm'].validate(valid => {
          if (valid) {
            this.putRequest('/employee/basic/', this.emp).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initEmps();
              }
            });
          }
        });
      } else {
        this.$refs['empForm'].validate(valid => {
          if (valid) {
            this.postRequest('/employee/basic/', this.emp).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initEmps();
              }
            });
          }
        });
      }
    },
    handleNodeClick(data) {
      this.emp.departmentId = data.id;
      this.inputDepName = data.name;
      this.visible = !this.visible;
    },
    showDevView() {
      this.visible = !this.visible;
    },
    showDevView2() {
      this.visible2 = !this.visible2;
    },
    getMaxWorkId() {
      this.getRequest('/employee/basic/maxWorkID').then(resp => {
        if (resp) {
          this.emp.workID = resp.obj;
        }
      })
    },
    initPositions() {
      this.getRequest('/employee/basic/positions').then(resp => {
        if (resp) {
          this.positions = resp;
        }
      })
    },
    initData() {
      if (!window.sessionStorage.getItem('nations')) {
        this.getRequest('/employee/basic/nations').then(resp => {
          if (resp) {
            this.nations = resp;
            window.sessionStorage.setItem('nations', JSON.stringify(resp));
          }
        })
      } else {
        this.nations = JSON.parse(sessionStorage.getItem('nations'));
      }

      if (!window.sessionStorage.getItem('joblevel')) {
        this.getRequest('/employee/basic/joblevel').then(resp => {
          if (resp) {
            this.joblevels = resp;
            window.sessionStorage.setItem('joblevel', JSON.stringify(resp));
          }
        })
      } else {
        this.joblevels = JSON.parse(sessionStorage.getItem('joblevel'));
      }
      if (!window.sessionStorage.getItem('politicsstatus')) {
        this.getRequest('/employee/basic/politicsstatus').then(resp => {
          if (resp) {
            this.politicsstatus = resp;
            window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp));
          }
        })
      } else {
        this.politicsstatus = JSON.parse(sessionStorage.getItem('politicsstatus'));
      }

      if (!window.sessionStorage.getItem('allDeps')) {
        this.getRequest('/employee/basic/deps').then(resp => {
          if (resp) {
            this.allDeps = resp;
            window.sessionStorage.setItem('allDeps', JSON.stringify(resp));
          }
        })
      } else {
        this.allDeps = JSON.parse(sessionStorage.getItem('allDeps'));
      }
    },
    showAddEmpView() {
      this.title = '添加员工信息';
      this.emp = {
        id: null,
        name: "",
        gender: "",
        birthday: '',
        idCard: "",
        wedlock: "",
        nationId: 4,
        nativePlace: "",
        politicId: 2,
        email: "",
        phone: "",
        address: "",
        departmentId: 6,
        jobLevelId: 1,
        posId: 1,
        engageForm: "",
        tiptopDegree: "",
        specialty: "",
        school: "",
        beginDate: '',
        workState: '在职',
        workID: '',
        conversionTime: '',
        notWorkDate: '',
        beginContract: '',
        endContract: '',
        workAge: "",
        salaryId: 1
      };
      this.inputDepName = '';
      this.getMaxWorkId();
      this.initPositions();
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
    initEmps(type) {
      this.loading = true;

      let url = '/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size;
      if (type && type === 'advanced') {
        if (this.searchValue.politicId) {
          url += '&politicId=' + this.searchValue.politicId;
        }
        if (this.searchValue.nationId) {
          url += '&nationId=' + this.searchValue.nationId;
        }
        if (this.searchValue.posId) {
          url += '&posId=' + this.searchValue.posId;
        }
        if (this.searchValue.jobLevelId) {
          url += '&jobLevelId=' + this.searchValue.jobLevelId;
        }
        if (this.searchValue.engageForm) {
          url += '&engageForm=' + this.searchValue.engageForm;
        }
        if (this.searchValue.departmentId) {
          url += '&departmentId=' + this.searchValue.departmentId;
        }
        if (this.searchValue.beginDateScope) {
          url += '&beginDateScope=' + this.searchValue.beginDateScope;
        }
      } else {
        url += '&name=' + this.empName;
      }

      this.getRequest(url).then(resp => {
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
    this.initData();
    this.initPositions();
  }
}
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .8s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */
{
  transform: translateX(10px);
  opacity: 0;
}
</style>