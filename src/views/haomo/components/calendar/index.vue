<template>
  <div class="app-container calendar-list-container">
    <hm-full-calendar
      :width="width"
      :schedules="schedules"
      :schema="schema['CcDuty']"
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
        schedules: [{ date: 1524043625000, title: '个梵蒂是的舞蹈服可接受的看似简单计算的话束带结发会计师对海口市记得回复是框架的看就好山东矿机会计师发送的甲方是看得见看见的说法开始冈地方' }, { date: 1523955299000, title: '个梵蒂冈地方' }]
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

