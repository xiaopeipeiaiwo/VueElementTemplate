<template>
	<div class="calender">
	  <full-calendar :events="fcEvents" locale="en"></full-calendar>
	</div>
</template>

<script>
  import fullCalendar from 'vue-fullcalendar'
  export default {
    name: 'calender',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'full-calendar': fullCalendar
    },
    data() {
      return {
        fcEvents: [
          {
            title: 'Sunny Out of Office',
            start: '2018-03-8',
            end: '2018-03-8',
            cssClass: 'aaa'
          }
        ]
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

