<template>
  <div class="airicle-container">
    <!--商品规格-->
    <el-card class="box-card-detail">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="状态">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="全部" name="type"></el-checkbox>
              <el-checkbox label="草稿" name="type"></el-checkbox>
              <el-checkbox label="待审核" name="type"></el-checkbox>
              <el-checkbox label="审核通过" name="type"></el-checkbox>
              <el-checkbox label="审核失败" name="type"></el-checkbox>
              <el-checkbox label="已删除" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="频道">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="马保国武术圣地" value="shanghai"></el-option>
              <el-option label="蔡徐坤养鸡大队" value="beijing"></el-option>
              <el-option label="华农的毙鼠山庄" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!--商品列表-->
    <el-card class="box-card-info">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查到46578条数据</span>
      </div>
      <div class="text item">
        <el-table :data="articles" stripe style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <img
                v-if="scope.row.cover.images[0]"
                class="articles-cover"
                :src="scope.row.cover.images[0]"
                alt=""
              />
              <img v-else class="articles-cover" src="./no-image.png" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
              <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
              <el-tag v-else-if="scope.row.status === 2" type="success"
                >审核通过</el-tag
              >
              <el-tag v-else-if="scope.row.status === 3" type="danger"
                >审核失败</el-tag
              >
              <el-tag v-else-if="scope.row.status === 4" type="info"
                >已删除</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column prop="options" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页区域-->
        <el-pagination
          @current-change="onCurrentChange"
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
//加载文章列表进来
import { getArticles } from '@/api/article.js'
export default {
  name: 'airicle-container',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value1: [new Date(2020, 10, 10, 10, 10), new Date(2020, 10, 11, 10, 10)],
      articles: [],
      totalCount: 0, //总数据条数
      pageSize: 10

    }

  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    //获取文章数据列表
    loadArticles(page = 1) {
      getArticles({
        page,
        per_page: this.pageSize

      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.$message.success('获取文章列表成功！')



      })
    },
    onCurrentChange(page) {
      this.loadArticles(page)
    }
  },
  created() {
    //在页面初始化的时候加载数据进来
    this.loadArticles(1)
  }
}
</script>

<style lang="less" scoped>
.box-card-info {
  margin-top: 18px;
}
.el-pagination {
  margin-top: 20px;
}
.articles-cover {
  width: 100px;
  background-size: cover;
  height: 100px;
}
</style>