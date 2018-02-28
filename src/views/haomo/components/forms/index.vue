<template>
  <div>
    <hm-complex-form :schema="schema['HmUser']" :columns="showUserColumns" :tableId="tableId">
    </hm-complex-form>
  </div>
</template>

<script>
  import HmComplexForm from './HmComplexForm.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexForm',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-form': HmComplexForm
    },
    data() {
      return {
        showUserColumns: ['username', 'loginid', 'password', 'mobile', 'email', 'securityLevel']
        // showUserColumns: []
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      this.tableId = '0e26566e953449a7a7500c34be39fd26'
    },
    methods: {}
  }
</script>
<style scoped>
</style>
