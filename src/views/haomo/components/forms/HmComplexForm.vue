<template>
  <el-row type="flex" class="hm-form">
    <el-col :span="6">
      <div></div>
    </el-col>
    <el-col :span="12" style="border:1px solid orange">
      <div>
        <h2 class="title">表单页面</h2>
        <!--表单部分-->
        <el-form ref="form" :model="formModel" :rules="rules" label-width="110px"
                 style="width:80%;margin:0 auto">
          <el-form-item v-for="(column,index) in showFields" :key="index" :label="column.name" :prop="column.codeCamel">
            <el-input v-if="column.codeCamel==='password'" type="password" :placeholder="column.name"
                      v-model="formModel[column.codeCamel]"></el-input>
            <el-input v-if="column.codeCamel!=='password'" :placeholder="column.name"
                      v-model="formModel[column.codeCamel]"></el-input>
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
    <el-col :span="6">
      <div></div>
    </el-col>
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
    /**
     * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
     * 对于所有毫末科技的组件，必须传schema，以完成数据的交互
     */
    props: {
      schema: {
        type: Object,
        required: true
      },
      /**
       * 指定要显示的字段。默认为根据schema得到的所有字段。
       */
      fields: {
        type: Array,
        required: false,
        validator: function(value) {
          if (typeof value !== 'object') {
            console.warn(`传入的fields不符合要求，必须是数组`)
            return false
          }

          return true
        }
      }
    },
    data() {
      return {
        form: null,
        formModel: {}, // 双向绑定的数据变量
        showFields: [], // 要显示的字段
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
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          loginid: [
            { required: true, message: '请输入登陆ID', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码必须同时包含数字和字母 6-20位', trigger: 'change' }
          ],
          mobile: [
            { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话号码或手机号', trigger: 'blur&change' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur&change' }
          ]
        }
      }
    },

    created() {
      this.init()
      // console.log(this.schema)
    },
    methods: {
      init() {
        const self = this
        // 如果没有传fields，则全部显示
        if (!self.fields || !self.fields.length) {
          _.each(self.schema['columns'], function(column) {
            const tmp = JSON.parse(JSON.stringify(column))
            // self.$set(tmp, 'code', tmp.code.toLowerCase())
            self.showFields.push(tmp)
          })
          // console.log(self.showFields)
        } else { // 如果传入了fields，则只显示传入的字段
          self.showFields = JSON.parse(JSON.stringify(self.fields))
          console.log('1111111')
          // console.log(self.showFields)
          // 将字符串对象进行替换处理
          _.each(self.showFields, function (column, index) {
            if (typeof column === 'string') {
              // 生成一个新对象
              const tmp = _.keyBy(self.schema['columns'], 'code')[column.toUpperCase()]
              // console.log(tmp)
              // self.$set(tmp, 'code', tmp.code.toLowerCase())
              self.$set(self.showFields, index, tmp)
            }
          })
          console.log('2222222')
          console.log(self.showFields)
        }
        // 提取v-model绑定的变量
        _.each(self.showFields, function(item) {
          self.formModel[item.codeCamel] = ''
        })
        console.log(self.formModel)
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
        const self = this
        console.log(self.formModel)
        self.$refs.form.validate((valid) => {
          if (valid) {
            console.log('提交成功!')
            request(self.schema.modelUnderscorePlural + '/new', {
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
              data: self.formModel,
              transformRequest:
                function(obj) {
                  var str = []
                  for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                  }
                  return str.join('&')
                }
            }).then(resp => {
              console.log(resp.data)
              self.resetForm()
            })
          } else {
            console.log('提交失败!!')
            return false
          }
        })
        // paramsSerializer: function(data) {
        //   const keys = Object.keys(data)
        //   return encodeURI(keys.map(name => `${name}=${data[name]}`).join('&'))
        // }
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
  .title {
    line-height: 40px;
    background: orange;
    color: #fff;
    text-align: center;
    margin-top: 0;
  }

</style>
