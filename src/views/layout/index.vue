<template>
  <el-container class="layout-container">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <app-aside class="aside-menu" :is-collapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="floder">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            style="margin-right: 8px"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>新闻管理系统</span>
        </div>
        <div class="userinfo">
          <div style="margin-right: 8px">
            <el-avatar :src="user.photo"></el-avatar>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-minus" @click.native="onLogout"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main"><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入侧边栏菜单组件
import AppAside from './component/aside.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'layout-homecontainer',
  data() {
    return {
      isCollapse: false,
      user: {}
    }
  },
  created() {
    this.loadUserProfile()
  },
  components: {
    AppAside
  },

  methods: {
    loadUserProfile() {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout() {
      //清除用户token
      window.localStorage.removeItem('user')
      //把代码push到登录界面
      this.$router.push('/login')
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .floder {
      font-size: 18px;
      cursor: pointer;
    }
    .userinfo {
      display: flex;
      align-items: center;
    }
  }
}
</style>