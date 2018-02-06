<template>
  <div class="app-container calendar-list-container">
    <hm-complex-table :schema="schema">
    </hm-complex-table>
  </div>
</template>

<script>
  import HmComplexTable from './HmComplexTable.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexTable',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-table': HmComplexTable
    },
    data() {
      return {}
    },
    filters: {
    },
    created() {
      this.schema = schema['HmUser']
    },
    methods: {}
  }
</script>
