<template>
  <div>
    <hm-complex-form :schema="schema['HmUser2']" :columns="showUserColumns" :tableId="tableId">
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
        // showUserColumns: ['username', 'loginid', 'password', 'mobile', 'email', 'createTime']
        // widgetType值 1：普通input 2：下拉框 (如果是下拉框 再传一个options表示下拉框选项)3：复选框 4：文本域 5：富文本 6：日期
        showUserColumns: [{ name: 'username', widgetType: 1 }, { name: 'securityLevel', widgetType: 5 }, { name: 'type', widgetType: 2, options: ['企业', '代理商'] }, { name: 'avatar', widgetType: 3 }, { name: 'departmentId', widgetType: 4 }, { name: 'createTime', widgetType: 6 }]
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      console.log(this.schema)
      this.tableId = '0e26566e953449a7a7500c34be39fd26'
    },
    methods: {}
  }
</script>
<style scoped>
</style>
