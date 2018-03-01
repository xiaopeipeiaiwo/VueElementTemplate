<template>
  <div>
    <hm-tab></hm-tab>
  </div>
</template>

<script>
  import HmTab from './HmTab.vue'
  // import schema from '../../schemas/hm_org_schema'
  export default {
    name: 'HmTab',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-tab': HmTab
    },
    data() {
      return {
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
    },
    methods: {}
  }
</script>
<style scoped>
</style>
