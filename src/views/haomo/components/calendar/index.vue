<template>
  <div class="app-container calendar-list-container">
    <hm-full-calendar></hm-full-calendar>
  </div>
</template>

<script>
  import HmFullCalendar from './HmFullCalendar.vue'
  export default {
    name: 'HmFullCalendar',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-full-calendar': HmFullCalendar
    },
    data() {
      return {}
    },
    filters: {

    },
    created() {

    },
    methods: {}
  }
</script>

