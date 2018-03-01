<template>
  <div class="app-container calendar-list-container">
    <hm-complex-table :schema="schema['HmUser2']"
                      :columns="showUserColumns"
                      :filters="userFilters"></hm-complex-table>
    <hm-complex-table :schema="schema['Department']"></hm-complex-table>
    <hm-complex-table :schema="schema['Role']"></hm-complex-table>
  </div>
</template>

<script>
  import HmComplexTable from './HmComplexTable.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexTableIndex',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-table': HmComplexTable
    },
    data() {
      return {
        showUserColumns: ['mobile', 'loginid'],
        userFilters: [
          { placeholder: '过滤手机号', 'mobile': { 'like': '' }},
          { placeholder: '过滤登录Id', 'loginid': { 'like': '3001' }}
        ]
      }
    },
    filters: {
    },
    created() {
      this.schema = schema
    },
    methods: {}
  }
</script>
