<template>
  <div>
    <hm-complex-form :schema="schema['HmUser']" :fields="showFields">
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
        showFields: ['username', 'loginid', 'password', 'mobile', 'email']
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
    },
    methods: {}
  }
</script>
<style scoped>
</style>
