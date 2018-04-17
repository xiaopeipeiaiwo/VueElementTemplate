<template>
	<div class="showcalender">
      <div id='calendar'></div>
	</div>
</template>
<script>
  import $ from 'jquery'
  import 'fullcalendar'
  export default {
    name: 'calender',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {

    },
    props: {

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
      $(function() {
        $('#calendar').fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
          },
          eventLimit: true,
          weekNumberCalculation: 'ISO',
          dayClick: function() {
            alert('a day has been clicked!')
          },
          views: {
            month: { titleFormat: 'YYYY, MM, DD' }
          }
        })
      })
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>

