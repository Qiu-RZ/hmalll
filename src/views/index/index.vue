<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <!-- 左边 -->
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse" :class="{rotate:isCollapse}"></i>
        <img class="logo" src="../../assets/index-logo.png" alt />
        <span class="font">黑马面面</span>
      </div>
      <!-- 右边 -->
      <div class="right">
        <img class="index-icon" src="../../assets/index-icon.jpg" alt />
        <span class="index-name">近来可好</span>
        <el-button type="primary" size="mini">退出2</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="auto" class="aside">
        <el-menu default-active="/index/datalint" class="el-menu-vertical-demo" router :collapse="isCollapse">
          <el-menu-item index="/index/datalint">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/userlint">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main class="Main">
       
       <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      isCollapse: false
    };
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    // background-color: yellowgreen;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 24px;
        margin-right: 22px;
        transition: 0.5s;
      }
      .rotate {
        transform: rotate(-90deg);
        
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .font {
        font-size: 22px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .index-icon {
        width: 43px;
        height: 43px;
        background-color: red;
        border-radius: 50%;
        margin-right: 9px;
      }
      .index-name {
        display: block;
        margin-right: 38px;
      }
    }
  }
  .aside {
    background-color: pink;
  }
  .Main {
    background-color: rgb(135, 203, 235);
  }
  //左侧动画
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>