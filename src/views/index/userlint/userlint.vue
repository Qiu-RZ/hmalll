<template>
  <div class="user-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="more-width">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="more-width">
          <el-select v-model="formInline.role" placeholder="请选择状态">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addEnter">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号" width="60px"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button type="text" @click="editForms(scope.row)">编辑</el-button>
            <el-button type="text" @click="status(scope.row)">{{ scope.row.status === 1?"禁用":"启用" }}</el-button>
            <el-button type="text" @click="reomveEnter(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSize"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>

    <!-- 新增模块 -->
    <el-dialog title="编辑用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 角色-->
        <el-form-item label="角色" class="more-width">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框 状态 -->
        <el-form-item label="状态" class="more-width">
          <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑模块 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="addRules">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="editForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 角色-->
        <el-form-item label="角色" class="more-width">
          <el-select v-model="editForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <!-- 下拉框 状态 -->
        <el-form-item label="状态" class="more-width">
          <el-select v-model="editForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { user } from "../../../api/api";
//导入接口
// import { user } from '../../../api/api.js'
export default {
  name: "userlint",
  data() {
    //自定义手机验证规则
    const checkAge = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号不能为空"));
      } else {
        const res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (res.test(value)) {
          callback();
        } else {
          callback(new Error("手机号格式不对哦"));
        }
      }
    };
    //检验邮箱格式
    const checkEmail = (rules, value, callback) => {
      // value是值
      if (!value) {
        callback(new Error("邮箱不能为空"));
      } else {
        // 格式验证
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对的
          callback();
        } else {
          // 错误
          callback(new Error("邮箱格式不对哦"));
        }
      }
    };
    return {
      formInline: {},
      //表格数据
      tableData: [],
      //页码数
      page: 1,
      //页容量
      limit: 5,
      //页码数组
      pageSize: [5, 10, 15, 20],
      //总条数
      total: 0,
      //新增弹框显示
      addFormVisible: false,
      //输入框宽度
      formLabelWidth: "100px",
      //新增数据
      addForm: {},
      //新增验证规则和编辑验证规则
      addRules: {
        name: [
          { required: true, message: "用户名不能为空哦", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, required: true }],
        phone: [{ validator: checkAge, required: true }]
      },

      //编辑弹框是否显示
      editFormVisible: false,
      //编辑数据
      editForm: {}
    };
  },
  //生命周期钩子
  created() {
    user
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        // window.console.log(res)
        //总条数
        this.total = res.data.data.pagination.total;
        //表单数据赋值
        this.tableData = res.data.data.items;
      });
  },
  //方法
  methods: {
    //重新刷新页面
    getlist() {
      user
        .list({
          page: this.page,
          limit: this.limit,
          ...this.formInline
        })
        .then(res => {
          // window.console.log(res)
          //总条数
          this.total = res.data.data.pagination.total;
          //表单数据赋值
          this.tableData = res.data.data.items;
        });
    },
    //点击搜索
    search() {
      this.page = 1;
      this.getlist();
    },
    //页容量
    handleSizeChange(size) {
      this.limit = size;
      this.page = 1;
      this.getlist();
    },
    //页码数
    handleCurrentChange(current) {
      this.page = current;
      this.getlist();
    },

    //点击切换状态
    status(data) {
      // window.console.log(data)
      user
        .status({
          id: data.id,
          status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          if (res.data.code === 200) {
            this.tableData.status = res.data.data.status;
            this.getlist();
          }
        });
    },
    //新增按钮
    addEnter() {
      this.addFormVisible = true;
    },
    //新增确认按钮
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          user.add(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.$message.success("新增成功");
              this.addFormVisible = false;
              this.getlist();
            }
          });
        } else {
          this.$message.error("数据不对劲呢");
          return;
        }
      });
    },
    //编辑按钮
    editForms(data) {
      this.editFormVisible = true;
      this.editForm = JSON.parse(JSON.stringify(data));
    },
    //编辑确认按钮
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          user.edit(this.editForm).then(res => {
            if (res.data.code === 200) {
              this.editFormVisible = false;
              this.$message.success("编辑成功");
              this.getlist();
            }
          });
        } else {
          this.$message.error("数据不对哦");
          return;
        }
      });
    },
    //删除按钮
    reomveEnter(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          user.remove({id:data.id}).then(res=>{
            window.console.log(res)
            if (res.data.code === 200) {
              this.$message.success('删除成功');
              this.getlist();
            } 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }

  }
};
</script>

<style lang="less">
.user-container {
  .el-input__inner {
    width: 100px;
  }
  .more-width {
    .el-input__inner {
      width: 150px;
    }
  }
  // 分页器的样式
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  // card的样式
  .main-card {
    margin-top: 20px;
  }
  .red {
    color: red;
  }
  //弹框样式
  .el-dialog__header {
    background-color: deepskyblue;
    text-align: center;
    .el-dialog__title {
      color: white;
    }
  }
  .el-input__inner {
    width: 100%;
  }
}
</style>