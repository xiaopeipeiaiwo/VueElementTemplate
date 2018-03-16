<template>
  <div class="app-container documentation-container">
    <el-row type="flex" class="hm-form" style="margin-top: 50px">
      <el-col :span="6">
        <div></div>
      </el-col>
      <el-col :span="12">
        <div>
          <!--表单部分-->
          <el-form ref="form"
                   :model="formModel"
                   :rules="rules"
                   label-width="110px"
                   style="width:80%;margin:0 auto">
            <el-form-item v-for="column in showUserColumns"
                          :key="column.id"
                          :label="column.name"
                          :prop="column.codeCamel">
              <!--el-input<el-input v-if="column.codeCamel==='password'" type="password"
                        v-model="formModel[column.codeCamel]"></el-input>-->

              <!-- 1 普通input -->
              <el-input v-if="column.widgetType === 1" v-model="formModel[column.codeCamel]"></el-input>
              <!-- 2 日期选择 -->
              <el-date-picker v-else-if="column.widgetType === 6 || column.type === 'datetime' || column.type === 'date'"
                              v-model="formModel[column.codeCamel]"
                              type="datetime"
                              align="right"
                              @change="logTimeChange"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <!-- 3 下拉框 -->
              <el-select v-else-if="column.widgetType === 2" v-model="formModel[column.codeCamel]" clearable>
                <el-option v-for="(item,key) in column.options"
                           :key="key"
                           :label="item"
                           :value="key">
                </el-option>
              </el-select>
              <!-- 4 文本域 -->
              <el-input v-else-if="column.widgetType === 4"
                        v-model="formModel[column.codeCamel]"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 5}"
                        :rows="2">
              </el-input>
              <!-- 5 复选框 -->
              <el-checkbox v-else-if="column.widgetType === 3 && !column.options" v-model="formModel[column.codeCamel]" true-label="1" false-label="0"></el-checkbox>
              <el-checkbox-group v-else-if="column.widgetType === 3 && column.options" v-model="formModel[column.codeCamel]">
                <el-checkbox v-for="option in column.options" :label="option" :key="option">{{option}}</el-checkbox>
              </el-checkbox-group>
              <!-- 6 富文本 -->
              <quill-editor v-else-if="column.widgetType === 5"
                            ref="textEditor"
                            v-model="formModel[column.codeCamel]"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
              <!-- 7 单选框 -->
              <el-radio-group v-else-if="column.widgetType === 7" v-model="formModel[column.codeCamel]">
                <el-radio v-for="(option,key) in column.options" :key="key" :label="key">{{option}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--按钮-->
            <el-form-item v-if="buttons && buttons.length > 0">
              <el-col :span="12" v-for="(btn,key) in buttons" :key="key">
                <el-button v-if="btn === '确定' || btn === '提交' || btn === '保存' || btn === '发布'" type="primary" @click="onSubmit()">{{btn}}</el-button>
                <el-button v-if="btn === '重置'" type="primary" @click="resetForm()">{{btn}}</el-button>
                <el-button v-if="btn === '取消'" type="primary" @click="cancelFunction?cancelFunction():''">{{btn}}</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'

  /**
   * 毫末科技的表单组件.
   *
   *   demo地址: factory.haomo-studio.com/vue-element/#/haomo/components/forms
   * @author 王康 wk@lingdao-tech.com
   */
  export default {
    name: 'HmComplexForm',
    // 集成其他组件
    extends: {},
    // 使用其它组件
    components: {
    },
    // 混入公共对象
    mixins: [],
    props: {
      /**
       * 必传，组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
       * 对于所有毫末科技的组件，必传schema，以完成数据的交互
       */
      schema: {
        type: Object,
        required: true
      },
      /**
       * 必传，指定要显示的表单字段及类型。数组的每个元素包含name、codeCamel和widgetType三个字段，codeCamel表示要显示的表单字段,name表示自定义的字段名，如果不传，默认为数据库中的字段名，widgetType表示该字段要显示的表单类型(普通输入框、文本域、富文本、下拉框...)，取值1-7(1表示普通输入框,2表示下拉框,3表示复选框,4表示文本域,5表示富文本,6表示日期格式，7表示单选框)，若表单类型为下拉框/复选框/单选框，还需传入options字段，值为数组(数组元素是下拉框/复选框/单选框的选项），对于复选框，如果只有一个备选项则不必传options
       * 示例：[
       *        { name: '姓名', codeCamel: 'username', widgetType: 1 },
       *        { name: '安全级别', codeCamel: 'securityLevel', widgetType: 5 },
       *        { name: '选择类型', codeCamel: 'type', widgetType: 2, options: ['选项1', '选项2'] },
       *        { name: '选择头像', codeCamel: 'avatar', widgetType: 3, options: ['美女', '帅哥'] },
       *        { name: '部门', codeCamel: 'departmentId', widgetType: 4 },
       *        { name: '新建时间', codeCamel: 'createTime', widgetType: 6 },
       *        { name: '登陆地址', codeCamel: 'loginid', widgetType: 7, options: ['会员', '访客'] },
       *      ]
       */
      columns: {
        type: Array,
        required: true,
        validator: function(value) {
          if (typeof value !== 'object') {
            console.warn(`传入的columns不符合要求，必须是数组`)
            return false
          }

          return true
        }
      },
      /**
       * 非必传，指定要显示的按钮(确定、保存、取消、提交、重置)，默认不显示。
       * 如果要传入了确定/取消的回调函数，请先传入对应的按钮
       * 示例：['确定', '取消']
       */
      buttons: {
        type: Array,
        required: false
      },
      /**
       * 非必传，传入用户的id用来修改用户信息
       */
      tableId: {
        type: String,
        required: false
      },
      /**
       * 非必传，传入点击'确定'后的回调函数，该回调函数会在form组件onSubmit函数的成功回调中调用
       * 如果要传入该函数，请先传入对应的按钮
       */
      confirmFunction: {
        type: Function,
        required: false
      },
      /**
       * 非必传，传入点击'取消'后的回调函数，该回调函数会在点击'取消'后直接调用
       * 如果要传入该函数，请先传入对应的按钮
       */
      cancelFunction: {
        type: Function,
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
        }
      }
    },
    created() {
      // this.validate()
      this.init()
      console.log(this.buttons)
    },
    methods: {
      // 判断是否一个对象的所有属性都为空
      isEmpty(obj) {
        _.forEach(obj, function(val) {
          if (val) return false
        })
        return true
      },
      logTimeChange(value) {
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
        // console.log('editor blur!')
      },
      onEditorFocus(editor) {
        // console.log('editor focus!')
      },
      onEditorReady(editor) {
        // console.log('editor ready!')
      },
      init() {
        const self = this
        // 如果没有传columns，则全部显示
        // if (!self.columns || !self.columns.length) {
        //   _.each(self.schema['columns'], function(column) {
        //     const tmp = JSON.parse(JSON.stringify(column))
        //     self.$set(tmp, 'code', tmp.code.toLowerCase())
        //     self.showUserColumns.push(tmp)
        //   })
        // } else
        if (self.columns && self.columns.length) {
          self.showUserColumns = JSON.parse(JSON.stringify(self.columns))
          // console.log(self.showUserColumns)
          // 将字符串对象进行替换处理
          _.each(self.showUserColumns, function(column, index) {
            if (typeof column === 'object') {
              // 生成一个新对象
              const tmp = _.keyBy(self.schema['columns'], 'codeCamel')[column.codeCamel]
              // console.log(tmp)
              // self.$set(tmp, 'code', tmp.code.toLowerCase())
              column.name && self.$set(tmp, 'name', column.name) // 自定义字段名
              self.$set(tmp, 'widgetType', column.widgetType || 1)
              column.options && self.$set(tmp, 'options', column.options)
              self.$set(self.showUserColumns, index, tmp) // 顺序
              // console.log(self.showUserColumns)
            }
          })
          // 提取v-model绑定的变量
          _.each(self.showUserColumns, function(item) {
            if (item.widgetType === 3 && item.options && item.options.length > 0) {
              self.$set(self.formModel, item.codeCamel, [])
            } else {
              self.$set(self.formModel, item.codeCamel, '')
            }
          })
          console.log(self.formModel)
          if (!request.defaults.baseURL) {
            request.defaults.baseURL = '/org/api'
          }
        } else {
          console.log('columns为必传字段!!')
        }
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
        console.log(self.formModel)
        // if (self.isEmpty(self.formModel)) return
        self.$refs.form.validate((valid) => {
          if (valid) {
            console.log('valid通过!')
            // 存在tableId 则修改信息
            if (self.tableId) {
              request(self.schema.modelUnderscorePlural + '/' + self.tableId + '/edit', {
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
                self.confirmFunction && self.confirmFunction()
              })
            } else { // 不存在tableId 则创建一条数据
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
                console.log('创建成功')
                self.resetForm()
                self.confirmFunction && self.confirmFunction()
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
        console.log('重置')
        this.$refs.form.resetFields()
      }
    }

  }
</script>
<style scoped>

</style>
