<template>
  <div class="app-container documentation-container">
    <!--v-loading="Loading"-->
    <el-row type="flex" class="hm-form" style="margin-top: 20px" >
      <el-col :span="layout ? layout.left : 6">
        <div></div>
      </el-col>
      <el-col :span="layout ? layout.middle : 12">
        <div>
          <!--表单部分-->
          <el-form ref="form"
                   :label-position="formStyle && formStyle.formOptions && formStyle.formOptions.labelPosition || 'right'"
                   element-loading-text="加载中"
                   :label-width="formStyle && formStyle.formOptions && formStyle.formOptions.labelWidth || '170px'"
                   :model="formModel"
                   :rules="rules"
                   :style=" formStyle && formStyle.formOptions && formStyle.formOptions.style || {width:'80%',margin:'0 auto'}">
            <el-form-item v-for="column in showUserColumns"
                          v-show="!column.hide"
                          :key="column.id"
                          :label="column.name"
                          :rules="column.rule?column.rule:null"
                          :prop="column.codeCamel">
              <!--el-input<el-input v-if="column.codeCamel==='password'" type="password"
                        v-model="formModel[column.codeCamel]"></el-input>-->
              <!-- 2 日期选择 -->
              <!-- -->
              <el-date-picker v-if="column.widgetType === 6 || column.type === 'datetime' || column.type === 'date'"
                              v-model="formModel[column.codeCamel]"
                              :style="formStyle && formStyle.datePicker && formStyle.datePicker.style || {width: '65%'}"
                              :ref="column.ref || ''"
                              :readonly="column.readonly"
                              :type="column.dateType || 'date'"
                              align="right" :disabled="column.disabled"
                              @change="column.change && column.change($event)"
                              :value-format="column.dateFormate || 'yyyy-MM-dd'"
                              :picker-options="pickerOptions">
              </el-date-picker>
              <!-- 3 下拉框 -->
              <el-select v-else-if="column.widgetType === 2"
                         :ref="column.ref || ''"
                         v-model="formModel[column.codeCamel]"
                         @change="column.change && column.change($event)"
                         :style="formStyle && formStyle.select && formStyle.select.style || {width: '65%'}"
                         :multiple="column.multiple"
                         :disabled="column.disabled"
                         style="width: 50%"
                         clearable>
                <el-option v-for="(item,key) in column.options"
                           :key="key"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <!-- 4 文本域 -->
              <el-input v-else-if="column.widgetType === 4"
                        :ref="column.ref || ''"
                        :readonly="column.readonly"
                        :style="formStyle && formStyle.textarea && formStyle.textarea.style || {width: '65%'}"
                        v-model="formModel[column.codeCamel]"
                        type="textarea" :disabled="column.disabled"
                        :resize="formStyle && formStyle.textarea && formStyle.textarea.resize || 'vertical'"
                        :autosize="formStyle && formStyle.textarea && formStyle.textarea.autosize || { minRows: 4, maxRows: 6}"
                        :rows="formStyle && formStyle.textarea && formStyle.textarea.rows || 4" @change="column.change && column.change($event)">
              </el-input>
              <!-- 5 复选框 -->
              <el-checkbox v-else-if="column.widgetType === 3 && !column.options"
                           v-model="formModel[column.codeCamel]"
                           :ref="column.ref || ''"
                           :disabled="column.disabled"
                           @change="column.change && column.change($event)"
                           true-label="1" false-label="0"></el-checkbox>
              <el-checkbox-group v-else-if="column.widgetType === 3 && column.options"
                                 v-model="formModel[column.codeCamel]"
                                 :ref="column.ref || ''"
                                 :disabled="column.disabled"
                                 @change="column.change && column.change($event)">
                <el-checkbox v-for="option in column.options"
                             :label="option" :key="option">{{option}}</el-checkbox>
              </el-checkbox-group>
              <!-- 6 富文本 -->
              <quill-editor v-else-if="column.widgetType === 5"
                            :ref="column.ref || ''" :disabled="column.disabled"
                            v-model="formModel[column.codeCamel]"
                            :style="formStyle && formStyle.quillEditor && formStyle.quillEditor.style || {width:'65%'}"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @change="column.change && column.change($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
              <!-- 7 单选框 -->
              <el-radio-group v-else-if="column.widgetType === 7"
                              :disabled="column.disabled"
                              @change="column.change && column.change($event)"
                              v-model="formModel[column.codeCamel]">
                <el-radio v-for="option in column.options"
                          :key="option.label" :label="option.label">{{option.value}}</el-radio>
              </el-radio-group>
              <!-- 8 文件 -->
              <el-upload v-else-if="column.widgetType === 8"
                         name="picture"
                         :action=" column.url || '/api/upload'"
                         :on-remove="handleRemove"
                         :file-list="fileList"
                         :multiple="column.multiple"
                         :ref="column.ref || ''"
                         :on-success="uploadSuccess">
                <el-button slot="trigger" size="small" type="primary"
                           :disabled="column.disabled">选取文件</el-button>
              </el-upload>
              <!-- 1 普通input -->
              <el-input v-else
                        :style="formStyle && formStyle.input && formStyle.input.style || {width:'65%'}"
                        v-model="formModel[column.codeCamel]"
                        :disabled="column.disabled"
                        :readonly="column.readonly"
                        :ref="column.ref || ''"
                        @change="column.change && column.change($event,formModel)"></el-input>
            </el-form-item>
            <!--按钮-->
            <el-form-item v-if="buttons && buttons.length > 0">
              <el-col :span="24/buttons.length" v-for="(btn,key) in buttons" :key="key">
                <el-button v-if="btn.type === 1"
                           type="primary"
                           @click="onSubmit(btn.method,btn.beforeSubmit)">{{btn.text}}</el-button>
                <el-button v-if="btn.type === 2"
                           type="primary"
                           @click="resetForm(btn.method)">{{btn.text}}</el-button>
                <el-button v-if="btn.type === 3"
                           type="primary"
                           @click="cancel(btn.method)">{{btn.text}}</el-button>
                <el-button v-if="!btn.type"
                           type="primary"
                           @click="cancel(btn.method)">{{btn.text}}</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="layout ? layout.left : 6">
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
       * 必传，指定要显示的表单字段及类型。数组的元素为对象类型，对象的属性有name、codeCamel、widgetType、disabled、
       * options、multiple、dateType等，不同的表单类型需配置的属性不同，
       * codeCamel属性，表示要显示的表单字段, 如果其他字段都不需要传，可以只写codeCamel的值，比如['username','departmentId']
       * name属性可选，表示自定义的字段名，如果不传，默认为数据库中的字段名，
       * change属性可选，值为函数类型，表示input的change事件的执行方法，参数即为input输入内容
       * default属性可选(复选框不支持)，设置默认值，取值规范参考form/index.vue
       * hide属性可选，设置该表单字段是否显示,值为boolean
       * ref属性可选，用来获取当前表单dom节点
       * widgetType属性可选，表示该字段要显示的表单类型(普通输入框、文本域、富文本、下拉框...)，不传默认为普通input
       * 取值1-8(1表示普通输入框,2表示下拉框,3表示复选框,4表示文本域,5表示富文本,6表示日期，7表示单选框，8表示文件上传)，
       * 若表单类型为下拉框/复选框/单选框，还需传入options字段，值为数组(数组元素是下拉框/复选框/单选框的选项），
       * 对于复选框，如果只有一个备选项则不必传options,
       * 若表单类型为下拉框，还可传入multiple字段，取值boolean类型，true/false，表示是否多选，默认false
       * 若表单类型为时间日期，可传入dateType字段，值为'date'（只显示日期）或'datetime'（显示日期和时间），如果不传，
       * 默认只显示日期; 可传入dateFormate字段，为日期格式，取值遵循elementUI DatePicker组件中的日期格式，
       * 比如 只显示日期取值'yyyy-MM-dd'，显示日期和时间取值'yyyy-MM-ddHH:mm:ss'，
       * 如果不传默认为只显示日期取值'yyyy-MM-dd'，date字段和dateFormate字段取值须对应
       * disabled属性可选，取值boolean类型,true/false，表示是否禁用，默认不禁用
       * rule属性可选，进行自定义验证规则，rule取值规范参照elementUI，下面有简单示例
       * 示例：[
       { name: '用户名称', codeCamel: 'username', widgetType: 1, disabled: true,
         rule: { required: true, message: '用户名不能为空', trigger: 'blur' }
       },
       { name: '电子邮件', codeCamel: 'email', widgetType: 5, disabled: false,
         rule: [
           { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
         ]
       },
       { name: '选择类型', codeCamel: 'type', widgetType: 2, multiple: false,
         options: [
                     { value: 0, label: '选项1' },
                     { value: 1, label: '选项2' },
                     { value: 2, label: '选项3' },
                     { value: 3, label: '选项4' },
                     { value: 4, label: '选项5' }
                   ]
       },
       { name: '部门ID', codeCamel: 'departmentId', widgetType: 3, options: ['美女', '帅哥'] },
       { codeCamel: 'password', widgetType: 4 },
       { name: '新建时间', codeCamel: 'createTime', widgetType: 6, dateType: 'datetime', dateFormate: 'yyyy-MM-dd HH:mm:ss' },
       { name: '登陆id', codeCamel: 'loginid', widgetType: 7, options: ['会员', '访客'] },
       { name: '选择头像', codeCamel: 'avatar', widgetType: 8 }
       ]
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
       * 非必传，指定要显示的按钮及类型，默认不显示。
       * 类型（type）关系到按钮要执行的方法，type=1，执行组件的提交方法，还可以传入了method字段，值为函数，
       * 该函数会作为提交方法的回调函数执行，函数接受一个参数为新建或修改的数据,
       * 同时还可以传入beforeSubmit字段，值为函数，函数接受两个参数(value,isCancel)
       * value为包含表单数据的对象，{username: 'name', loginid: 'id'},其中键为调用者传入的codeCamel
       * 该函数可以在提交之前对表单数据进行处理，并返回数据；对象isCancel包含一个值为false的属性cancelSubmit
       * 如果需要取消提交，将cancelSubmit值改为true
       * type=2，执行组件的重置方法,如果用户传入了method，会作为重置方法的回调函数执行
       * type=3，直接执行用户传入的方法
       * 如果要传入了确定/取消的回调函数，请先传入对应的按钮
       * 示例：[
       *        {text: '确定', type: 1, method: method1, beforeSubmit: this.processData},
       *        {text: '重置', type: 2, method: method2},
       *        {text: '取消', type: 3, method: method3}
       *      ]
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
       * 非必传，布局方式，form组件布局分三栏，左右为留白，中间是form，
       * 通过传参可以控制各部分所占份数，遵循elementUi24分栏，默认居中布局(left：6，middle：12，right：6)
       * 示例：{ left: 0, middle: 12, right: 12 }
       */
      layout: {
        type: Object,
        required: false
      },
      /**
       * 用来将本表的外链字段(table_id类似的字段)指向的外链表相关联, 格式为:
       *  {
       *    "hm_user": {    //外链表 表名 本表所对应的主键表）
       *      includes:['user_id'] // 与主表所对应的外键
       *    }
       *  }
       *
       */
      includes: {
        type: Object,
        required: false
      },
      /**
       * 用来将其他表的外链字段指向本表关联，同时返回数据, 格式为:
       *  {
       *    'auth_token': {          //主键id所对应的外键表 表名1 （本表所对应的外键表）
       *      includes: ['user_id']   //外键表的外键字段
       *    }
       *  }
       */
      refers: {
        type: Object,
        required: false
      },
      /**
       * 要写入或修改的外表字段codeCamel值, 第一个元素为外键字段，格式为:
       *  [ ccSubjectId, description, correct, serialNumber]
       */
      foreignFormFields: {
        type: Array,
        required: false
      },
      /**
       * 用来将其他有间接关系的表(所谓间接关系, 一定是跟本表的某个字段名一致, 且指向同一张表),
       * 两张表中非主键的两个字段相等 格式为:
       *  {
       *    'relate_table1': ['column1', 'column2'], //’关联的另一张表名’:[‘一致的字段名’]
       *    'relate_table1': ['column3', 'column4']
       *    }
       *  }
       */
      relates: {
        type: Array,
        required: false
      },
      /**
       * 请求成功或失败时的提示信息,格式为:
       *  tips: {
       *     hidde: false, // 是否显示提示，默认false显示
       *     newSuccess: { text: '发布成功' }, // 新建成功的提示
       *     newError: { text: '发布失败' }, // 新建失败的提示
       *     editSuccess: { text: '编辑成功' }, // 编辑成功的提示
       *     editError: { text: '编辑失败' } // 编辑失败的提示
       *     otherError: { text: '没有传ID，不可以提交' }
       *  }
       */
      tips: {
        type: Object,
        required: false
      },
      /**
       * 表单样式设置,格式为:
       *  formStyle: {
       *   formOptions: { labelWidth: '170px', labelPosition: 'right' },
       *   datePicker: { style: { width: '100px' }},
       *   input: { style: { width: '60%' }},
       *   select: { style: { width: '100px' }},
       *   textarea: {
       *      style: { width: '100px' },
       *      resize: 'none',
       *      autosize: { minRows: 3, maxRows: 5 },
       *      rows: 3
       *   },
       *  quillEditor: { style: { width: '65%' }}
       * },
       */
      formStyle: {
        type: Object,
        required: false
      }
    },
    data() {
      // var validateUsername = (rule, value, callback) => {
      //   // console.log(value.length)
      //   if (!value) {
      //     callback(new Error('请输入用户名'))
      //   } else if ((value.length < 2 || value.length > 10)) {
      //     callback(new Error('用户名长度在 2 到 10 个字符'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validatePassword = (rule, value, callback) => {
      //   if (value.length > 0 && !(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value))) {
      //     callback(new Error('密码必须同时包含数字和字母 6-20位'))
      //   } else {
      //     callback()
      //   }
      // }
      // var validateMobile = (rule, value, callback) => {
      //   if (value.length > 0 && !(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value))) {
      //     callback(new Error('请输入正确的电话号码或手机号'))
      //   } else {
      //     callback()
      //   }
      // }
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
        foreignArray: [], // 批量创建或删除的多条外表数据
        nativeFormModel: {}, // 有外表时 本表数据  从formModel中提取
        foreignFormModel: {}, // 字段相同的多条外表数据 从formModel中提取
        foreignForm: {}, // 单条外表数据 只包含键，值为空 从foreignFormFields中提取
        partPropModel: {}, // 外表中从属于foreignFormModel的属性 从formModel中提取
        indirectData: '', // 间接关联表数据
        relateData: {}, // 中间表数据
        Loading: true, // 加载等待
        form: null,
        formModel: {}, // 双向绑定的数据变量
        showUserColumns: [], // 要显示的字段
        rules: {
          // username: [
          //   { validator: validateUsername, trigger: 'change' }
          // { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          // ],
          // loginid: [
          // { required: true, message: '请输入登陆ID', trigger: 'blur' }
          // ],
          // password: [
          //   { validator: validatePassword, trigger: 'change' }
          // { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '密码必须同时包含数字和字母 6-20位', trigger: 'change' }
          // ],
          // mobile: [
          //   { validator: validateMobile, trigger: 'change' }
          // { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入正确的电话号码', trigger: 'change' }
          // ]
          // email: [
          // { validator: validateEmail, trigger: 'change' }
          // { type: 'email', message: '请输入正确的邮箱', trigger: 'change' }
          // ]
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
        // 日期选项配置
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now()
          // },
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
        fileList: [], // 上传文件列表
        fileCode: '', // 上传组件对应的数据库字段
        isCancel: { cancelSubmit: false } // 主动取消提交（processData中）
      }
    },
    created() {
      // this.validate()
      this.init()
      this.getData()
      this.getList()
      // setTimeout(function() {
      //   var url = _.keys(self.refers)[0] + 's' + '/create/batch'
      //   console.log(url)
      // }, 3000)
      // console.log(this.buttons)
    },
    methods: {
      // 上传成功的回调函数
      uploadSuccess(response, file, fileList) {
        const self = this
        // console.log('上传成功')
        // console.log(response)
        // console.log('fileList', fileList)
        // console.log(self.fileList)
        _.each(self.columns, function(item, index) {
          if (item.widgetType === 8) {
            _.forEach(self.formModel, function(value, key) {
              if (item.codeCamel === key) {
                // self.formModel[key] = response.message || response.visitName
                self.formModel[key] = response.visitName + '/' + response.saveName
              }
            })
          }
        })
        console.log('formModel', self.formModel)
      },
      // inputChange(val) {
      //   // console.log(event)
      //   // console.log(val)
      // },
      // checkboxChange(val) {
      //   console.log(val)
      // },
      // checkboxsChange(val) {
      //   console.log(val)
      // },
      // selectChange(val) {
      //   console.log(val)
      // },
      // radioChange(val) {
      //   console.log(val)
      // },
      // logTimeChange(val) {
      //   console.log(val)
      // },
      // textareaChange(val) {
      //   console.log(val)
      // },
      // onEditorChange({ quill, html, text }) {
      //   console.log(quill)
      //   console.log(html)
      //   console.log(text)
      //   // this.content = html
      // },
      onEditorBlur(val) {
        // console.log(val)
      },
      onEditorFocus(val) {
        // console.log('editor focus!')
      },
      onEditorReady(val) {
        // console.log('editor ready!')
      },
      handleRemove(file, fileList) {
        // console.log(self.formModel)
      },
      // 判断是否一个对象的所有属性都为空
      // 可判断空对象或者属性值为null、空数组、空字符串，属性值为空对象无法判断
      isEmpty(obj) {
        for (var key in obj) {
          if (obj[key] && _.trim(obj[key])) {
            return false
          }
        }
        return true
      },
      // 判断一个对象是否为空对象，没有属性
      isEmptyObject(e) {
        var t
        for (t in e) {
          return !1
        }
        return !0
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
      // 获取间接关联表数据
      getData() {
        const self = this
        if (!self.relates || !self.relates.length || !self.relates[0].indirectTable) return
        // console.log(534, self.relates)
        var params = {}
        params.filters = self.relates[0].filters || { }
        // console.log('url', typeof (self.relates[0].indirectTable))
        request(self.relates[0].indirectTable, {
          params: params
        }).then(resp => {
          // 设置中间表与间接关联表对应字段
          if (resp.data && resp.data.length) {
            // console.log(resp.data)
            self.$set(self.relateData, self.relates[1].relateKeys[1], resp.data[0].id)
          }
          // console.log(548, self.relateData)
        })
      },
      // 创建中间表数据
      newRelateData() {
        const self = this
        if (self.tableId || !self.relates || !self.relates.length || !self.relates[1].relateTable) return
        var data = self.relateData
        if (self.isEmpty(data)) {
          console.error('不能创建空数据')
          return
        }
        request(self.relates[1].relateTable + '/new', {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          data: data,
          transformRequest:
            function(obj) {
              var str = []
              for (var p in obj) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
              }
              return str.join('&')
            }
        }).then(resp => {
          console.log('创建中间表成功')
          console.log(resp.data)
        })
      },
      // 批量创建的参数处理
      transformRequest(arr) {
        var str = []
        _.each(arr, function(obj, i) {
          for (var k in obj) {
            str.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
          }
        })
        console.log(str.join('&'))
        return str.join('&')
      },
      // 存在tableId，编辑数据前先获取数据
      getList() {
        const self = this
        if (!self.tableId) return
        // 获取数据
        request(self.schema.modelUnderscorePlural + '/' + self.tableId).then(resp => {
          self.Loading = false
          // console.log(self.formModel)
          var formArray = _.keys(self.formModel) // 提取formModel的属性到数组
          // console.log(formArray)
          self.formModel = _.pick(resp.data, formArray) // 根据数组中的属性提取出data中对应的数据

          // 下拉框多选时将字符串转为数组 column.widgetType === 3 && !column.options
          _.each(self.columns, function(item, index) {
            if (item.widgetType === 2 && item.multiple === true) {
              _.forEach(self.formModel, function(value, key) {
                if (item.codeCamel === key) {
                  // console.log(11111, self.formModel[key])
                  self.formModel[key] = self.formModel[key].split(',')
                }
              })
            }
            // 单个复选框时，将请求回来的1和0转为'1'和'0'
            if (item.widgetType === 3 && !item.options) {
              _.forEach(self.formModel, function(value, key) {
                if (item.codeCamel === key) {
                  // console.log(11111, self.formModel[key])
                  self.formModel[key] = self.formModel[key] + ''
                }
              })
            }
          })
          // console.log('getList', self.formModel)
          // console.log(typeof self.formModel.isUsed)
        })
      },
      // 初始化
      init() {
        const self = this
        if (self.columns && self.columns.length) {
          self.showUserColumns = _.cloneDeep(self.columns)
          // console.log(504, self.showUserColumns)
          // console.log(514, self.formModel)
          // 处理传来的表单字段
          _.each(self.showUserColumns, function(column, index) {
            if (typeof column === 'string') {
              // 生成一个新对象
              const tmp = _.keyBy(self.schema['columns'], 'codeCamel')[column]
              /* self.$set(tmp, 'code', tmp.code.toLowerCase())
              column.name && self.$set(tmp, 'name', column.name) // 自定义字段名
              column.rule && self.$set(tmp, 'rule', column.rule) // 设置表单校验规则
              column.disabled && self.$set(tmp, 'disabled', column.disabled) // 设置是否禁用
              column.options && self.$set(tmp, 'options', column.options) // 设置下拉框或者多选的选项
              column.multiple && self.$set(tmp, 'multiple', column.multiple) // 设置下拉框是否多选
              column.dateType && self.$set(tmp, 'dateType', column.dateType) // 设置日期表单显示类型
              column.dateFormate && self.$set(tmp, 'dateFormate', column.dateFormate) // 设置日期格式
              column.change && self.$set(tmp, 'change', column.change) // 设置change函数
              column.url && self.$set(tmp, 'url', column.url) // 设置文件上传地址 */
              self.$set(tmp, 'widgetType', 1) // 设置表单类型
              self.$set(self.showUserColumns, index, tmp) // 顺序
            }
          })
          console.log('self.showUserColumns', self.showUserColumns)
          // 提取v-model绑定的变量
          _.each(self.showUserColumns, function(item) {
            if (item.widgetType === 8 || (item.widgetType === 3 && item.options && item.options.length > 0)) {
              self.$set(self.formModel, item.codeCamel, [])
            } else {
              item.default ? self.$set(self.formModel, item.codeCamel, item.default) : self.$set(self.formModel, item.codeCamel, '')
            }
          })
          console.log('self.formModel', self.formModel)
          if (!request.defaults.baseURL) {
            request.defaults.baseURL = '/org/api'
          }
          // console.log(request.defaults.baseURL)
          // 加载等待
          if (self.tableId) {
            self.Loading = true
          } else {
            self.Loading = false
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
      onSubmit(callback, processData) {
        const self = this
        console.log('点击了提交函数')
        console.log(self.formModel)
        // 对表单数据进行处理
        self.formModel = processData ? processData(self.formModel, self.isCancel) : self.formModel
        // 如果在processData中禁止提交了，显示提示信息
        if (self.isCancel.cancelSubmit) {
          console.log('取消提交')
          if (self.tips && !self.tips.hidde) {
            self.$message({
              message: self.tips.otherError.text,
              type: 'error'
            })
          }
          return
        }
        // self.formModel = JSON.stringify(self.formModel)
        // var params = _.cloneDeep(self.formModel)
        // params = JSON.stringify(params)
        // console.log(self.formModel)
        // 如果所有值都为空 禁止提交
        if (self.isEmpty(self.formModel)) {
          self.$message({
            message: '不能都为空',
            type: 'error'
          })
          return
        }
        // 验证、提交
        self.$refs.form.validate((valid) => {
          if (valid) {
            // console.log('valid通过!')
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
                      return value === null // 删除value=null的属性，剩下的返回给新对象
                    })
                    for (var p in obj) {
                      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
                    }
                    return str.join('&')
                  }
              }).then(resp => {
                console.log('修改成功')
                // self.resetForm()
                if (self.tips && !self.tips.hidde) {
                  self.$message({
                    message: self.tips.editSuccess.text,
                    type: 'success'
                  })
                }
                // self.formModel = {} // 新建完成清空数据
                if (typeof (callback) === 'function') {
                  callback(resp.data)
                }
              }).catch(err => {
                console.log(err)
                if (self.tips && !self.tips.hidde) {
                  self.$message({
                    message: self.tips.editError.text,
                    type: 'error'
                  })
                }
              })
            } else {
              // 不存在tableId 则创建一条数据
              console.log(self.formModel)
              if (self.refers && self.foreignForm) {
                // 遍历foreignFormFields 生成外表数据对象
                _.each(self.foreignFormFields, function(val, key) {
                  self.$set(self.foreignForm, val, '')
                })
                _.each(self.showUserColumns, function(item, index) {
                  // 提取本表数据以提交
                  if (!item.isForeign) {
                    for (const key in self.formModel) {
                      if (item.codeCamel === key) {
                        self.nativeFormModel[key] = self.formModel[key]
                        break
                      }
                    }
                  }
                  // 提取字段相同的多条外表数据 到foreignFormModel
                  if (item.isForeign && !item.partProp) {
                    for (const key in self.formModel) {
                      if (item.codeCamel === key) {
                        self.foreignFormModel[key] = self.formModel[key]
                        break
                      }
                    }
                  }
                  // 提取外表中从属于foreignFormModel的属性到partPropModel
                  if (item.partProp) {
                    for (const key in self.formModel) {
                      if (item.codeCamel === key) {
                        self.partPropModel[key] = self.formModel[key]
                        break
                      }
                    }
                  }
                })
                console.log('本表', self.nativeFormModel)
                console.log('外表', self.foreignFormModel)
                console.log('部分属性', self.partPropModel)
              }
              // 发送新建请求
              request(self.schema.modelUnderscorePlural + '/new', {
                method: 'post',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                data: self.refers ? self.nativeFormModel : self.formModel,
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
                // 设置中间表与本表(主表)对应字段
                console.log(resp.data)
                // if (!self.relates || !self.relates.length) return
                // 创建中间表数据
                if (resp.data && self.relates && self.relates.length && self.relates[1].relateTable) {
                  self.$set(self.relateData, self.relates[1].relateKeys[0], resp.data.id)
                  self.newRelateData()
                  // console.log(self.relateData)
                }
                // 将返回的id写入foreignForm
                if (!self.isEmptyObject(self.foreignForm)) {
                  self.$set(self.foreignForm, self.foreignFormFields[0], resp.data.id)
                }
                // 从foreignFormModel和单条外表foreignForm中提取多条数据到foreignArray
                if (!self.isEmptyObject(self.foreignFormModel)) {
                  _.each(self.foreignFormModel, function(val, key) {
                    var temp = _.cloneDeep(self.foreignForm)
                    var idx = key.slice(0, -1)
                    temp[idx] = val
                    // temp = Object.assign(temp, self.partProp)
                    self.foreignArray.push(temp)
                  })
                }

                // 提取serialNumber: 'A'之类，属于外表写入/修改的数据
                if (!self.isEmptyObject(self.foreignForm)) {
                  _.each(self.showUserColumns, function(item, index) {
                    if (item.isForeign && !item.partProp) {
                      _.each(item, function(val, key) {
                        if (_.has(self.foreignForm, key)) {
                          for (let i = 0, len = self.foreignArray.length; i < len; i++) {
                            if (!self.foreignArray[i][key]) {
                              self.foreignArray[i][key] = val
                              break
                            }
                          }
                        }
                      })
                    }
                  })
                }

                // 把外表公共属性partProp的值写入foreignArray的每条数据对象
                if (self.foreignArray.length > 0) {
                  _.each(self.foreignArray, function(item, key) {
                    var tem = _.cloneDeep(self.partPropModel)
                    if (_.includes(item, _.values(self.partPropModel)[0])) {
                      tem[_.keys(self.partPropModel)[0]] = 1 // 可能出问题
                    } else {
                      tem[_.keys(self.partPropModel)[0]] = 0 // 可能出问题
                    }
                    item = Object.assign(item, tem)
                  })
                  console.log('外表数据', self.foreignArray)
                  // 批量创建信息
                  const url = _.keys(self.refers)[0] + 's' + '/create/batch'
                  // const string = self.transformRequest(self.foreignArray)
                  const string = JSON.stringify(self.foreignArray)
                  request.post(url + '?params=' + string, {
                    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
                  }).then(resp => {
                    console.log('批量创建成功')
                    console.log(resp.data)
                  }).catch(error => {
                    console.log('批量创建失败', error)
                  })
                }
                // 提示信息
                if (self.tips && !self.tips.hidde) {
                  self.$message({
                    message: self.tips.newSuccess.text,
                    type: 'success'
                  })
                }
                // self.resetForm()
                if (typeof (callback) === 'function') {
                  callback(resp.data)
                }
              }).catch(err => {
                console.log(err)
                if (self.tips && !self.tips.hidde) {
                  self.$message({
                    message: self.tips.newError.text,
                    type: 'error'
                  })
                }
              })
            }
          } else {
            console.log('提交失败!!')
            self.$message({
              message: '验证未通过',
              type: 'error'
            })
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
      resetForm(callback) {
        // const self = this
        console.log('重置')
        this.$refs.form.resetFields()
        // console.log(self.formModel)
        // // 清空
        // _.each(self.formModel, function(value, index) {
        //   self.formModel[index] = ''
        // })
        // 执行回调
        if (typeof (callback) === 'function') {
          callback()
        }
      },
      // 取消的回调函数
      cancel(callback) {
        const self = this
        if (typeof (callback) === 'function') {
          callback(self.formModel)
        }
      }
    }

  }
</script>
<style scoped>

</style>
