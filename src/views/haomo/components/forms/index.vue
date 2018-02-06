<template>
  <div>
    <hm-complex-form>
    </hm-complex-form>
  </div>
</template>

<script>
  import HmComplexForm from './HmComplexForm.vue'

  export default {
    name: 'HmComplexForm',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-form': HmComplexForm
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
