<template>
  <div class="app-container calendar-list-container">
    <hm-full-calendar
      :width="width"
      :schedules="schedules"
      @dateChange="datechange"
      @monthChange="monthchange"
      :show="show"
    ></hm-full-calendar>
    <!--<div v-if="show" class="incident">-->
      <!--<p>{{currentDate}}</p>-->
      <!--<span>{{event}}</span>-->
      <!--<span class="close" @click="closeEvent">X</span>-->
    <!--</div>-->
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
      return {
        show: false,
        width: '300px',
        currentDate: '',
        event: '',
        schedules: [{ date: 1524043625000, title: '个梵蒂是的舞蹈服可接受的看似简单计算的话束带结发会计师对海口市记得回复是框架的看就好山东矿机会计师发送的甲方是看得见看见的说法开始冈地方' }, { date: 1523955299000, title: '个梵蒂冈地方' }]
      }
    },
    filters: {

    },
    created() {

    },
    methods: {
      datechange(data) {
        this.show = true
        console.log(data)
        if (data.schedule) {
          const currentTime = this.timestampToTime(data.schedule.date)
          console.log(currentTime)
          this.currentDate = currentTime
          this.event = data.schedule.title
        }
      },
      monthchange(data) {
        console.log(data, '--------')
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '年'
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
        const D = date.getDate() + '日'
        return Y + M + D
      }
    }
  }
</script>
<style>

</style>

