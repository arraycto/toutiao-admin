<template>
  <div class="aside">
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      background-color="#001d35"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      router
      :collapse-transition="false"
    >
      <el-menu-item index="home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-s-custom"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  props: ['is-collapse']

}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  border-right: none;
}
</style>