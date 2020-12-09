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
          <el-tiptap
            lang="zh"
            height="500"
            v-model="Article.content"
            :extensions="extensions"
          ></el-tiptap>
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
//局部引入tiptapj富文本编辑器
import { ElementTiptap } from 'element-tiptap'
//加载el-tiptap样式文件
import 'element-tiptap/lib/index.css';
//加载上传用户图片素材
import { uploadImage } from '@/api/image.js'
//引入element-tiptap相关组件
import {
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  CodeView,
  Print,
  CodeBlock,
  Image,
  FontType,
  Fullscreen,
  Link
} from 'element-tiptap';


export default {
  name: 'publishIndex',
  components: {
    'el-tiptap': ElementTiptap,
  },
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new CodeView(),
        new Print(),
        new CodeBlock(),
        new Image({
          uploadRequest(file) {
            const fd = new FormData()
            fd.append('image', file)
            //第一个是返回promise对象
            return uploadImage(fd).then(res => {
              //第二个是返回最后的结果
              return res.data.data.url
            })
          }
        }),
        new FontType(),
        new Fullscreen(),
        new Link()
      ],
      content: `
        <h1>Heading</h1>
        <p>This Editor is awesome!</p>
      `,
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
      },

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