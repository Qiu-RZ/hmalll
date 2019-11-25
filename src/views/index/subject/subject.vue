<template>
  <div class="subject-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容 -->
    <el-card class="main-card">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="res">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button
              @click="status(scope.row)"
              type="text"
            >{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button>
            <el-button type="text" @click="reomveList(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :current-page="page"
        :page-sizes="pageSixes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-card>

    <!-- 新增对话框 -->
    <el-dialog title="新增学科" :visible.sync="addFormVisible" class="add-dialog">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
          <el-input v-model="addForm.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="addForm.intro" type="textarea" :rows="2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入接口
import { subject } from "../../../api/api.js";

export default {
  name: "subject",
  data() {
    return {
      //筛选的表格
      formInline: {},
      //数据
      tableData: [],
      //页码
      page: 1,
      //页容量
      limit: 10,
      //页码数组
      pageSixes: [5, 10, 15, 20],
      //总条数
      total: 0,
      //新增表单数据
      addForm: {},
      //新增表单是否显示
      addFormVisible: false,
      //label的宽度不设置不能再一起
      formLabelWidth: "100px",
      //表单验证规则
      addRules: {
        rid: [{ required: true, message: "学科编号能为空哦", trigger: "blur" }],
        name: [
          { required: true, message: "学科的科名不能为空哦", trigger: "blur" }
        ]
      }
    };
  },
  //生命钩子
  created() {
    subject
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        //赋值给table
        this.tableData = res.data.data.items;
        //保存总条数
        this.total = res.data.data.pagination.total;

        window.console.log(res);
      });
  },
  //方法
  methods: {
    //点击切换启用禁用
    status(data) {
      subject
        .status({
          id: data.id,
          status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
          }
        });
    },

    //把调用接口的事件直接封装成另一个函数,触发事件按钮的时候直接调用这个方法  getList()
    getList() {
      //调用接口 传递筛选条件
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          // // 赋值给table
          this.tableData = res.data.data.items;
          // // 重新设置页容量即可
          this.total = res.data.data.pagination.total;
          // window.console.log(res)
        });
    },

    //筛选搜索按钮
    search() {
      //点击筛选的时候改变页码起数,调用接口
      this.page = 1;
      this.getList();
    },

    //页容量改变
    handleSizeChange(size) {
      //直接存起来
      this.limit = size;
      //修改页码去第一页
      this.page = 1;
      this.getList();
    },
    //页码改变
    handleCurrentChange(current) {
      this.page = current;
      this.getList();
    },

    //点击新增按钮
    submitAdd() {
      //表单验证规则
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // alert("submit!");
          //调用接口
          subject.add(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.addFormVisible = false;
              //重新刷新一次
              this.getList();
              // this.$message.success("对啦");
              return;
            }
          });
        } else {
          this.$message.success("小老弟,你传的数据有点不对劲哦");
          return false;
        }
      });
    },

    //删除按钮
    reomveList(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subject.remove({ id: data.id }).then(res => {
            if (res.data.code === 200) {
              this.$message("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less">
.subject-container {
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
  //禁用的样式
  .res {
    color: red;
  }
  .add-dialog {
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
}
</style>
