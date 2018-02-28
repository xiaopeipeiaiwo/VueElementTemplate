<template>
  <div>
    <hm-login></hm-login>
  </div>
</template>

<script>
  import HmLogin from './HmLogin.vue'
  export default {
    name: 'login',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-login': HmLogin
    },
    data() {
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
