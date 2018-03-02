<template>
  <el-row type="flex" class="hm-form" style="margin-top: 50px">
    <el-col :span="6">
      <div></div>
    </el-col>
    <el-col :span="12">
      <div>
        <!--表单部分-->
        <el-form ref="form" :model="formModel" :rules="rules" label-width="110px"
                 style="width:80%;margin:0 auto">
          <el-form-item v-for="(column,index) in showUserColumns" :key="index" :label="column.name" :prop="column.codeCamel">
            <!--el-input<el-input v-if="column.codeCamel==='password'" type="password"
                      v-model="formModel[column.codeCamel]"></el-input>-->

            <!-- 富文本 -->
            <quill-editor v-if="column.codeCamel==='securityLevel'" class="editor-example bubble"
                          ref="textEditor"
                          v-model="formModel[column.codeCamel]"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
            <!-- 日期选择 -->
            <el-date-picker v-else-if="column.codeCamel === 'createTime' || column.codeCamel === 'lastUpdateTime' || column.codeCamel === 'lastLoginTime'"
                            v-model="formModel[column.codeCamel]"
                            type="datetime"
                            align="right"
                            @change="logTimeChange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions">
            </el-date-picker>
            <!-- 下拉框 -->
            <el-select v-else-if="column.codeCamel === 'type'" v-model="formModel[column.codeCamel]">
              <el-option v-for="item in selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
              </el-option>
            </el-select>
            <!-- 文本域 -->
            <el-input v-else-if="column.codeCamel === 'departmentId'" v-model="formModel[column.codeCamel]"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 5}"
                      :rows="2">
            </el-input>
            <!-- 普通input -->
            <el-input v-else v-model="formModel[column.codeCamel]"></el-input>
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
  // import { parseTime } from '@/utils/index'

  /**
   * 毫末科技的表单组件.
   *
   *   demo地址: factory.haomo-studio.com/vue-element/#/haomo/components/forms
   * @author 王康
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
      /**
       * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
       * 对于所有毫末科技的组件，必须传schema，以完成数据的交互
       */
      schema: {
        type: Object,
        required: true
      },
      /**
       * 指定要显示的字段。默认为根据schema得到的所有字段。
       */
      columns: {
        type: Array,
        required: false,
        validator: function(value) {
          if (typeof value !== 'object') {
            console.warn(`传入的columns不符合要求，必须是数组`)
            return false
          }

          return true
        }
      },
      /**
       * 传入用户的id用来修改用户信息
       */
      tableId: {
        type: String,
        required: false
      }
    },
    data() {
      var validateUsername = (rule, value, callback) => {
        // console.log(value.length)
        if (!value) {
          callback(new Error('请输入用户名'))
        } else if ((value.length < 2 || value.length > 10)) {
          callback(new Error('用户名长度在 2 到 10 个字符'))
        } else {
          callback()
        }
      }
      var validatePassword = (rule, value, callback) => {
        if (value.length > 0 && !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value))) {
          callback(new Error('密码必须同时包含数字和字母 6-20位'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (value.length > 0 && !(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value))) {
          callback(new Error('请输入正确的电话号码或手机号'))
        } else {
          callback()
        }
      }
      // var validateEmail = (rule, value, callback) => {
      //   if (value.length > 0) {
      //     if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
      //       callback(new Error('请输入正确的邮箱'))
      //     } else {
      //       callback()
      //     }
      //   }
      // }
      return {
        requestUrl: '',
        form: null,
        formModel: {}, // 双向绑定的数据变量
        showUserColumns: [], // 要显示的字段
        rules: {
          username: [
            { validator: validateUsername, trigger: 'change' }
            // { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          loginid: [
            // { required: true, message: '请输入登陆ID', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'change' }
            // { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码必须同时包含数字和字母 6-20位', trigger: 'change' }
          ],
          mobile: [
            { validator: validateMobile, trigger: 'change' }
            // { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话号码', trigger: 'change' }
          ],
          email: [
            // { validator: validateEmail, trigger: 'change' }
            { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
          ]
        },
        editorOption: { // 富文本选项配置
          placeholder: '',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'color': [] }, { 'background': [] }],
              ['image']
            ]
          }
        },
        pickerOptions: { // 日期选项配置
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        selectOptions: [{
          value: '1',
          label: '企业'
        }, {
          value: '2',
          label: '代理商'
        }]
      }
    },
    created() {
      // this.validate()
      this.init()
      // console.log(this.schema)
    },
    methods: {
      logTimeChange(value) {
        // value = parseTime(value)
        console.log(value)
      },
      validate() {
        const self = this
        // this.columns数组元素本身必须是string或者object. 且必须是schema中定义的列
        // 由于vue中不允许通过其他的props来验证当前props，只能在created里进行调用
        _.each(self.columns, function(item) {
          if (!item) {
            return 0
          }

          if (typeof item !== 'string' && typeof item !== 'object') {
            console.error(`传入的columns不符合要求，数组元素必须是字符串或对象`)
          }
          if (typeof item === 'string' && !_.keyBy(self.schema['columns'], 'code')[item.toUpperCase()]) {
            console.error(`传入的columns不符合要求，字符串元素[${item}]必须是schema中定义的列[code]`)
          }
          if (typeof item === 'object' && !_.keyBy(self.schema['columns'], 'code')[item['code'].toUpperCase()]) {
            console.error(`传入的columns不符合要求，元素的code属性[${item['code']}]必须是schema中定义的列[code]`)
          }
        })
      },
      onEditorBlur(editor) {
        console.log('editor blur!')
      },
      onEditorFocus(editor) {
        console.log('editor focus!')
      },
      onEditorReady(editor) {
        console.log('editor ready!')
      },
      init() {
        const self = this
        // 如果没有传columns，则全部显示
        if (!self.columns || !self.columns.length) {
          _.each(self.schema['columns'], function(column) {
            const tmp = JSON.parse(JSON.stringify(column))
            self.$set(tmp, 'code', tmp.code.toLowerCase())
            self.showUserColumns.push(tmp)
          })
          // console.log(self.showUserColumns)
        } else { // columns，则只显示传入的字段
          self.showUserColumns = JSON.parse(JSON.stringify(self.columns))
          // console.log('1111111')
          console.log(self.showUserColumns)
          // 将字符串对象进行替换处理
          _.each(self.showUserColumns, function(column, index) {
            if (typeof column === 'string') {
              // 生成一个新对象
              // const tmp = _.keyBy(self.schema['columns'], 'code')[column.toUpperCase()]
              const tmp = _.keyBy(self.schema['columns'], 'codeCamel')[column]
              self.$set(tmp, 'code', tmp.code.toLowerCase())
              self.$set(self.showUserColumns, index, tmp)
            }
          })
          // console.log('2222222')
          // console.log(self.showUserColumns)
        }
        // 提取v-model绑定的变量
        _.each(self.showUserColumns, function(item) {
          // self.formModel[item.codeCamel] = ''  这样写有问题
          self.$set(self.formModel, item.codeCamel, '')
        })
        // 修改请求地址
        self.requestUrl = self.schema.modelUnderscore.slice(0, -1) + 's'

        // console.log(self.formModel)
        if (!request.defaults.baseURL) {
          request.defaults.baseURL = '/org/api'
        }
        console.log(request.defaults)
      },
      // 提交
      /**
       * 确定提交函数。
       *
       * 所有选项输入并验证通过，正确提交
       * 验证失败，禁止提交并给出提示
       */
      onSubmit() {
        const self = this
        console.log('点击了提交函数')
        self.$refs.form.validate((valid) => {
          console.log(valid)
          if (valid) {
            console.log('提交成功!')
            // 存在tableId 则修改信息
            if (self.tableId) {
              request(self.requestUrl + '/' + self.tableId + '/edit', {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                data: self.formModel,
                transformRequest:
                  function(obj) {
                    var str = []
                    // 删除空值的属性
                    obj = _.omitBy(obj, function(value) {
                      return !value
                    })
                    for (var p in obj) {
                      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                    }
                    return str.join('&')
                  }
              }).then(resp => {
                console.log('修改成功')
                self.resetForm()
              })
            } else { // 不存在tableId 则创建一条数据
              request(self.requestUrl + '/new', {
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
                console.log('创建成功')
                self.resetForm()
              })
            }
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
        console.log('chongzhi')
        this.$refs.form.resetFields()
      }
    }

  }
</script>
<style scoped>

</style>
