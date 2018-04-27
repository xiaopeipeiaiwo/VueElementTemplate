<template>
  <div class="app-container calendar-list-container">
    <hm-full-calendar
      :width="width"
      :schedules="schedules"
      :schema="schema['HmUser']"
      :title="title"
      :date="date"
      @dateChange="datechange"
      @monthChange="monthchange"
    ></hm-full-calendar>
  </div>
</template>

<script>
  import HmFullCalendar from './HmFullCalendar.vue'
  import schema from '../../schemas/hm_org_schema'
  export default {
    name: 'HmFullCalendar',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-full-calendar': HmFullCalendar
    },
    data() {
      return {
        show: false,
        width: '300px',
        title: 'username',
        date: 'createTime'
      }
    },
    filters: {

    },
    created() {
      this.schema = schema
    },
    methods: {
      datechange(data) {
        console.log(data)
      },
      monthchange(data) {
        console.log(data)
      }
    }
  }
</script>
<style>

</style>

