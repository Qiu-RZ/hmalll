<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold"></i>
        <img class="logo" src="../../assets/index-logo.png" alt />
        <span class="font">黑马面面</span>
      </div>
      <div class="right"></div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="less">
.index-container {
  height: 100%;
    background-color: skyblue;
    height: 100%;
    .header {
      background-color: yellowgreen;
      display: flex;
      
    justify-content: space-between;
      .left{
     display:flex;
    justify-content: space-between;
    .el-icon-s-fold{
        width:24px;
        height:20px;
    }
    .logo{
        width: 33px;
        height:28px;
    }
    .font{
        font-size: 22px
    }
      }
    }
    .aside {
      background-color: pink;
    }
 
}
</style>