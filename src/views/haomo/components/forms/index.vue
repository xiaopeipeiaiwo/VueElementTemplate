<template>
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
          { name: '姓名', codeCamel: 'username', widgetType: 1 },
          { name: '邮箱', codeCamel: 'email', widgetType: 5 },
          { name: '选择类型', codeCamel: 'type', widgetType: 2, options: ['选项1', '选项2'] },
          { name: '选择头像', codeCamel: 'avatar', widgetType: 3, options: ['美女', '帅哥'] },
          { codeCamel: 'password', widgetType: 4 },
          { name: '新建时间', codeCamel: 'createTime', widgetType: 6 },
          { name: '登陆id', codeCamel: 'loginid', widgetType: 7, options: ['会员', '访客'] }
        ],
        // 要显示按钮
        showUserButtons: [
          { text: '确定', type: 1, method: this.method1 },
          { text: '重置', type: 2, method: this.method2 },
          { text: '取消', type: 3, method: this.method3 }
        ],
        // showUserButtons: []
        // 布局方式
        layout: { left: 0, middle: 12, right: 12 }
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      // console.log(this.schema)
      this.tableId = '0e26566e953449a7a7500c34be39fd26'
    },
    methods: {
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
