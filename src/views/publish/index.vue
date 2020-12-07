<template>
  <div class="publishIndex">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--表单区域-->
      <el-form
        :model="Article"
        :rules="rules"
        ref="publishFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="Article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="Article.content"></el-input>
        </el-form-item>

        <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="Article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="Article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//加载频道模块进来
import { getArticlesChanels, addArticle, updataArticle, getArticle } from '@/api/article.js'

export default {
  name: 'publishIndex',
  data() {
    return {

      channels: [],
      Article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 10, max: 50, message: '长度在 10 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadChanels() {
      getArticlesChanels().then(res => {
        //把获取到的频道数据,渲染到单选框里面去
        this.channels = res.data.data.channels

      })
    },
    onPublish(draft = false) {
      //先进行表单验证， 然后发送数据请求接口
      this.$refs.publishFormRef.validate(valid => {
        //如果验证不通过，返回出去停止执行
        if (!valid) {
          return
        }
        //反之验证通过发送请求，处理响应结果
        addArticle(this.Article, draft).then(res => {
          //console.log(res)
        })

      })
    },
    loadArticle() {
      getArticle(this.$route.query.id).then(res => {
        console.log(res)
      })
    }

  },
  created() {
    this.loadChanels()

    //由于我们让发布和修改使用的同一个组件
    //所以这里要判断
    //如果路由路径参数中有 id 则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },

}
</script>

<style lang="less" scoped>
</style>