<template>
  <div>
    <hm-complex-detail>
    </hm-complex-detail>
  </div>
</template>

<script>
  import HmComplexDetail from './HmComplexDetail.vue'

  export default {
    name: 'HmComplexDetail',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-detail': HmComplexDetail
    },
    data() {
      return {}
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
