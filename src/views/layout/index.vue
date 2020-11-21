<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="aside">
      <app-aside class="aside-menu"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入侧边栏菜单组件
import AppAside from './component/aside.vue'
export default {
  name: 'layout-homecontainer',
  components: {
    AppAside
  }

}
</script>

<style lang = "less" scoped>
.layout-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .aside {
    background-color: #001d35;
    .aside-menu {
      height: 100%;
    }
  }
  .header {
    background-color: rgb(150, 72, 9);
  }
  .main {
    background-color: rgba(146, 117, 117, 0.493);
  }
}
</style>