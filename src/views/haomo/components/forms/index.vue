<template>
  <!--:tableId="tableId"-->
  <div>
    <hm-complex-form :schema="schema['HmUser']"
                     :columns="showUserColumns"
                     :buttons="showUserButtons"
                     :layout="layout"
                     >
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
        // widgetType值 1：普通input 2：下拉框 (如果是下拉框 再传一个options表示下拉框选项)3：复选框 4：文本域 5：富文本 6：日期 7：单选框
        showUserColumns: [
          { name: '用户名称', codeCamel: 'username', widgetType: 1, disabled: false,
            change: this.inputChange
            // rule: { required: true, message: '用户名不能为空', trigger: 'blur' }
          },
          { name: '电子邮件', codeCamel: 'email', widgetType: 5, disabled: false,
            change: this.inputChange
            // rule: [
            //   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            //   { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            // ]
          },
          { name: '选择类型', codeCamel: 'type', widgetType: 2, multiple: false,
            change: this.inputChange,
            options: [
              { value: 1, label: '企业' },
              { value: 3, label: '代理商' }
            ]
          },
          { name: '部门ID', codeCamel: 'departmentId', widgetType: 3, options: ['美女', '帅哥'], change: this.inputChange },
          { codeCamel: 'password', widgetType: 4, change: this.inputChange },
          { name: '新建时间', codeCamel: 'createTime', widgetType: 6, dateType: 'datetime', dateFormate: 'yyyy-MM-dd HH:mm:ss', change: this.inputChange },
          { name: '登陆id', codeCamel: 'loginid', widgetType: 7, options: ['会员', '访客'], change: this.inputChange },
          { name: '选择头像', codeCamel: 'avatar', widgetType: 8, change: this.inputChange }
        ],
        // 要显示按钮
        showUserButtons: [
          { text: '确定', type: 1, method: this.method1, beforeSubmit: this.processData },
          { text: '重置', type: 2, method: this.method2 },
          { text: '取消', type: 3, method: this.method3 }
        ],
        // showUserButtons: []
        // 布局方式
        layout: { left: 6, middle: 12, right: 6 }
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      // console.log(this.schema)
      this.tableId = '1efff63125954583b0ac5a9c252b9041'
    },
    methods: {
      inputChange(val) {
        // console.log(event)
        console.log(val)
      },
      processData(object) {
        console.log(object)
        return object
      },
      method1() {
        console.log('method1')
      },
      method2() {
        console.log('method2')
      },
      method3() {
        console.log('method3')
      }
    }
  }
</script>
<style scoped>
</style>
