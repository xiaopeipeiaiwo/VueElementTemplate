<template>
  <div>
    <hm-complex-panel :schema="schema['HmUser']" :userId="userId">
    </hm-complex-panel>
    <hm-complex-panel :schema="schema['HmUser']" :userId="userId" :columns="showUserColumns">
    </hm-complex-panel>
  </div>
</template>

<script>
  import HmComplexPanel from './HmComplexPanel.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexPanel',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-panel': HmComplexPanel
    },
    data() {
      return {
        showUserColumns: ['mobile', 'loginid']
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      this.userId = '0e26566e953449a7a7500c34be39fd26'
    },
    methods: {}
  }
</script>
<style scoped>
</style>
