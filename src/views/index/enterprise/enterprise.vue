<template>
  <div class="enterprise-container">
    <!-- 头部 -->
    <el-card>
      <!-- 行内 表单 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" class="more-width">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.creater"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="more-width">
          <el-select v-model="formInline.tag" placeholder="请选择状态">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
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
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="red">禁用</span>
            <span v-else>启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
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

    <!-- 新增弹框 -->
    <el-dialog title="新增企业" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
          <el-input v-model="addForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 下拉框的 所属领域 -->
        <el-form-item label="所属领域" class="more-width">
          <el-select v-model="addForm.tag" placeholder="请选择状态">
            <el-option label="金融" value="金融"></el-option>
            <el-option label="互联网" value="互联网"></el-option>
            <el-option label="电商" value="电商"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth">
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
//导入企业接口
import { enterprise } from "../../../api/api.js";
export default {
  name: "enterprise",
  data() {
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
      //新增弹框
      addForm: {},
      //弹框是否显示
      addFormVisible: false,
      //输入框宽度
      formLabelWidth: "100px",
      //表单验证规则
      addRules: {
        eid: [
          { required: true, message: "企业编号不能为空哦", trigger: "blur" }
        ],
        name: [
          { required: true, message: "企业名称不能为空哦", trigger: "blur" }
        ]
      }
    };
  },
  //生命周期钩子
  created() {
    enterprise
      .list({
        page: this.page,
        limit: this.limit
      })
      .then(res => {
        // window.console.log(res);
        //表格数据赋值
        (this.tableData = res.data.data.items),
          //总条数
          (this.total = res.data.data.pagination.total);
      });
  },

  //方法
  methods: {
    //重新获取数据刷新页面
    getlist() {
      enterprise
        .list({
          page: this.page,
          limit: this.limit,
          ...this.formInline
        })
        .then(res => {
          // window.console.log(res);
          //表格数据赋值
          this.tableData = res.data.data.items;
          //总条数
          this.total = res.data.data.pagination.total;
        });
    },

    //点击切换状态
    status(data) {
      enterprise
        .status({
          id: data.id,
          status: data.status === 1 ? 0 : 1
        })
        .then(res => {
          if (res.data.code === 200) {
            this.getlist();
          }
        });
    },
    //点击搜索按钮
    search() {
      this.page = 1;
      this.getlist();
    },
    //新增按钮
    addEnter() {
      this.addFormVisible = true;
    },
    //新增确定按钮
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        //判断
        if (valid) {
          enterprise.add(this.addForm).then(res => {
            if (res.data.code === 200) {
              this.addFormVisible = false;
              this.getlist();
            } else {
              this.$message.success("小老弟你的数据有点对劲哦");
            }
          });
        }
      });
    },
    //页容量
    handleSizeChange(size) {
      (this.limit = size), (this.page = 1), this.getlist();
    },
    //页码
    handleCurrentChange(current) {
      (this.page = current), this.getlist();
    },
    
    //删除
    // reomveEnter(data) {
    //   enterprise.remove({ id: data.id }).then(res => {
    //      if(res.data.code === 200 ){
    //        this.getlist()
    //      }
    //   });
    // }
  }
};
</script>

<style lang="less">
.enterprise-container {
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
