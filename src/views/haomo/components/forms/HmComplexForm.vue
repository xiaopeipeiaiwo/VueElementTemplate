<template>
  <el-row type="flex" class="hm-form">
    <el-col :span="6"><div></div></el-col>
    <el-col :span="12" style="border:1px solid orange"><div>
        <!--标题-->
        <h2 class="title">表单页面</h2>
        <!--表单部分-->
        <!--<el-form :model="form" ref="form" :rules="rules"  label-width="110px" status-icon style="width:80%;margin:0 auto">
          <el-form-item label="姓名" prop="name">
            <el-input type="text" v-model="form.name" autofocus placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input type="age" v-model.number="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="date">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="照片" prop="img">
            <input type="file">
          </el-form-item>
          &lt;!&ndash;选择学历&ndash;&gt;
          <el-form-item label="学历" prop="education">
            <el-select v-model="form.education" placeholder="请选择学历">
              <el-option label="博士" value="doctor"></el-option>
              <el-option label="硕士" value="master"></el-option>
              <el-option label="本科" value="bachelor"></el-option>
              <el-option label="专科" value="professional"></el-option>
              <el-option label="其他" value="others"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="最常用的网站" prop="website">
            <el-input type="url" v-model="form.url" placeholder="请输入网址"></el-input>
          </el-form-item>
          <el-form-item label="最喜欢的颜色" prop="color" class="color">
            <input type="color" v-model="form.color" style="width:200px;height:36px;border:none;outline:0"/>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="住址" prop="address">
            <el-input type="textarea" placeholder="请填写地址" :autosize="{ minRows: 2, maxRows: 4}" resize="none" v-model="form.address"></el-input>
          </el-form-item>
          &lt;!&ndash;确定提交和重置&ndash;&gt;
          <el-form-item>
            <el-col :span="12">
              <el-button type="primary" @click="onSubmit()">确定</el-button>
            </el-col>
            <el-col :span="12">
              <el-button @click="resetForm()">重置</el-button>
            </el-col>
          </el-form-item>
        </el-form>-->
      <el-form label-width="110px" status-icon style="width:80%;margin:0 auto">
        <el-form-item v-for="column in showColumns" :label="column.name">
          <el-input :placeholder="column.codeCamel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-button type="primary" @click="onSubmit()">确定</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="resetForm()">重置</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      </div>
    </el-col>
    <el-col :span="6"><div></div></el-col>
  </el-row>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'
  /**
   * 表单页面。
   */
  export default {
    name: 'HmComplexForm',
    // 集成其他组件
    extends: {},
    // 使用其它组件
    components: {},
    // 混入公共对象
    mixins: [],
    props: {
      schema: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        list: null,
        form: null,
        showColumns: [] // 要显示的列数据
        // form: {
        //   name: '',
        //   gender: '男',
        //   age: '',
        //   password: '',
        //   website: '',
        //   img: '',
        //   date: '',
        //   education: '',
        //   color: '#ff0000',
        //   phone: '',
        //   email: '',
        //   address: ''
        // },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入姓名', trigger: 'blur' },
        //     { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        //   ],
        //   age: [
        //     { required: true, message: '请输入年龄', trigger: 'blur' },
        //     { type: 'number', message: '年龄必须为数字', trigger: 'change' }
        //   ],
        //   website: [
        //     { required: true, message: '请输入网址', trigger: 'blur' },
        //     { pattern: /[a-zA-z]+:\/\/[^\s]*/, message: '请输入正确的网址', trigger: 'change' }
        //   ],
        //   password: [
        //     { required: true, message: '请输入密码', trigger: 'blur' },
        //     { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码必须同时包含数字和字母 6-20位', trigger: 'change' }
        //   ],
        //   phone: [
        //     { type: 'number', required: true, message: '请输入手机号', trigger: 'blur' },
        //     { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
        //   ],
        //   email: [
        //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        //   ]
        // }
      }
    },

    created() {
      this.init()
      // console.log(this.schema)
    },
    methods: {
      init() {
        const self = this
        _.each(self.schema['columns'], function(column) {
          const tmp = JSON.parse(JSON.stringify(column))
          self.showColumns.push(tmp)
        })
        console.log(self.showColumns)
        if (!request.defaults.baseURL) {
          request.defaults.baseURL = '/org/api'
        }
        console.log(request.defaults)
      },
      // 提交
      /**
       * 确定提交函数。
       *
       * 所有选项输入正并验证通过，正确提交
       * 验证失败，禁止提交并给出提示
       */
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log('提交成功!')
          } else {
            console.log('提交失败!!')
            return false
          }
        })
      },
      // 重置
      /**
       * 表单重置函数。
       *
       * 清空所有输入及提示信息。
       */
      resetForm() {
        this.$refs.form.resetFields()
      }
    }

  }
</script>
<style scoped>
  .title{
    line-height: 40px;
    background:orange;
    color:#fff;
    text-align:center;
    margin-top:0;
  }

</style>
