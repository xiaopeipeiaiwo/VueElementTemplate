<template>
  <div class="app-container calendar-list-container">
    <hm-complex-table :schema="schema['HmUser']"
                      :columns="showUserColumns"
                      :filters="userFilters"
                      :options="userOptions"></hm-complex-table>
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
        showUserColumns: ['mobile', 'loginid', 'username', 'email'],
        userFilters: [
          { placeholder: '过滤手机号', 'mobile': { 'like': '' }},
          { placeholder: '过滤用户名', 'username': { 'equalTo': '' }}
        ]
      }
    },
    filters: {
    },
    created() {
      this.schema = schema
      this.userOptions = {
        changeValue: {
          username: { 1: '是', 0: '否' }
        }

      }
    },
    methods: {}
  }
</script>
