<template>
  <div class="app-container calendar-list-container">
    <hm-complex-table></hm-complex-table>
  </div>
</template>

<script>
  import HmComplexTable from './HmComplexTable.vue'

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
    created() {},
    methods: {}
  }
</script>
