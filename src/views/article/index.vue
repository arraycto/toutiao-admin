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
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="频道">
            <el-select v-model="channelId" placeholder="请选择频道">
              <el-option label="全部" :value="null"> </el-option>
              <el-option
                v-for="(channel, index) in channels"
                :label="channel.name"
                :value="channel.id"
                :key="index"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="日期">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <!--button按钮的click事件有个默认参数，当你没有指定参数的时候，它会传递一个默认的数据-->
            <el-button
              type="primary"
              @click="loadArticles(1)"
              :disabled="loading"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!--商品列表-->
    <el-card class="box-card-info">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查到 {{ totalCount }} 条数据</span>
      </div>
      <div class="text item">
        <el-table
          :data="articles"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
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
              <el-button
                type="primary"
                @click="$router.push('/publish?id=' + scope.row.id)"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="onDeleteArticle(scope.row.id)"
              ></el-button>
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
          :disabled="loading"
          :current-page.sync="page"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
//加载文章列表进来
import { getArticles, getArticlesChanels, deleteArticle } from '@/api/article.js'
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
      pageSize: 10,
      status: null,//查询文章的状态
      channels: [],//频道数据
      channelId: null,//查询文章的频道
      rangeDate: null,//范围日期
      loading: true,
      page: 1

    }

  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    //获取文章数据列表
    loadArticles(page = 1) {
      //请求之前展示loading
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {

        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false

      })
    },
    onCurrentChange(page) {
      this.loadArticles(page)
    },
    loadChanels() {
      getArticlesChanels().then(res => {
        //把频道数据保存到data中

        this.channels = res.data.data.channels

      })
    },
    /* 
     
     删除功能未完成
     异常：400 
     报错信息：400（bad request）
    
    */
    onDeleteArticle(articleId) {
      //先弹框确认是否删除 再做调用接口删除数据

      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId.toString()).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    //把频道列表加载进来
    this.loadChanels()
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
  width: 50px;
  background-size: cover;
  height: 50px;
}
</style>