<template>
  <!---->
  <div>
    <hm-complex-form :schema="schema['HmUser']"
                     :columns="showUserColumns"
                     :buttons="showUserButtons"
                     :layout="layout"
                     :tips="tips"
                     :tableId="tableId"
                     :refers="judgeRefers">
    </hm-complex-form>
  </div>
</template>

<script>
  import HmComplexForm from './HmComplexForm.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexFormIndex',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-form': HmComplexForm
    },
    data() {
      return {
        // widgetType值 1：普通input 2：下拉框 (如果是下拉框 再传一个options表示下拉框选项)3：复选框 4：文本域 5：富文本 6：日期 7：单选框 8: 文件上传
        showUserColumns: [
          // 1普通input
          { name: '选择类型', codeCamel: 'type', widgetType: 1, disabled: false,
            change: this.inputChange
            // rule: { required: true, message: '用户名不能为空', trigger: 'blur' }
            //  hide: true
          //  default: '默认值',
          },
          // 5富文本
          { name: '电子邮件', codeCamel: 'email', widgetType: 5, disabled: false,
            change: this.inputChange, hide: false
            // rule: [
            //   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            //   { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            // ]
          },
          // 2下拉框
          { name: '用户名称', codeCamel: 'username', widgetType: 2, multiple: false,
            change: this.inputChange, // default: [1], 如果开启多选，默认选中项用数组[1]、[1,2,3]
            options: [
              { value: '1', label: '企业' }, // 下拉框的label是选项文字，value是选中值
              { value: '2', label: '代理商' },
              { value: '3', label: '会员' },
              { value: '4', label: '访客' }
            ]
          },
          // 3多选 不支持默认值
          { name: '部门ID', codeCamel: 'departmentId', widgetType: 3, options: ['美女', '帅哥'], change: this.inputChange },
          // 4密码
          // { codeCamel: 'password', widgetType: 4, change: this.inputChange },
          'password',
          // 6日期
          { name: '新建时间', codeCamel: 'createTime', widgetType: 6, dateType: 'datetime',
            dateFormate: 'yyyy-MM-dd HH:mm:ss', change: this.inputChange
          // default: '2018-01-01 00:07:08'
          },
          // 7单选
          { name: '登陆id', codeCamel: 'loginid', widgetType: 7,
            options: [
              { label: 1, value: '会员' }, // 单选的value是选项文字，label是选中值
              { label: 2, value: '访客' }
            ], // default: 1
            change: this.inputChange },
          // 8文件
          { name: '选择头像', codeCamel: 'avatar', widgetType: 8, url: '/api/upload' } // url是后台接口地址
        ],
        showUserColumnss: [
          { name: '模板名称', codeCamel: 'name', widgetType: 1, rule: { required: true, message: '模板名称不能为空', trigger: 'blur' }},
          { name: '选择模板', codeCamel: 'template', widgetType: 8, url: '/zhangjiakouOA/upload_template', rule: { required: true, message: '模板不能为空', trigger: 'blur' }},
          { name: '使用科室', codeCamel: 'departmentId', widgetType: 2, multiple: true,
            options: [
              { value: '104', label: 'APP技术支持' },
              { value: '105', label: '党组成员' },
              { value: '106', label: '专职检委' },
              { value: '107', label: '正处级检察员' }
            ],
            rule: { required: true, message: '科室不能为空', trigger: 'blur' }}
        ],
        // 要显示按钮
        showUserButtons: [
          { text: '确定', type: 1, method: this.method1, beforeSubmit: this.processData },
          { text: '重置', type: 2, method: this.method2 },
          { text: '生成', method: this.method4 },
          { text: '取消', type: 3, method: this.method3 }
        ],
        // showUserButtons: []
        // 布局方式
        layout: { left: 2, middle: 20, right: 2 },
        // 自定义提示消息
        tips: {
          hidde: false, // 是否显示提示，默认false显示
          newSuccess: { text: '发布成功' }, // 新建成功的提示
          newError: { text: '发布失败' }, // 新建失败的提示
          editSuccess: { text: '编辑成功' }, // 编辑成功的提示
          editError: { text: '编辑失败' }, // 编辑失败的提示
          otherError: { text: '填写有误，不可以提交' } // processData中取消提交的提示
        },
        // 'cc_option': {
        //   includes: ['ccSubjectId']
        // }
        judgeRefers: { // 主查外
          'cc_hm_user': {
            includes: ['applicantId']
          }
        }
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      // console.log(this.schema)
      // this.tableId = '1efff63125954583b0ac5a9c252b9041'
      this.tableId = 'b08d2220d2574bf2ac09ec4f470ed999'
    },
    methods: {
      inputChange(val) {
        // console.log(event)
        console.log(val)
      },
      processData(object, isCancel) {
        isCancel.cancelSubmit = false // 如果要取消提交，设为true
        console.log(125, object)
        return object // 将数据返回
      },
      method1() {
        console.log('method1')
      },
      method2() {
        console.log('method2')
      },
      method3() {
        console.log('method3')
      },
      method4() {
        console.log('method4')
      }
    }
  }
</script>
<style scoped>
</style>
