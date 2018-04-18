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
          customButtons: {
            myCustomButton: {
              text: '自定义按钮',
              click: function() {
                alert('点击了自定义按钮!')
              }
            }
          },
          header: {
            left: 'title',
            center: '',
            right: 'today prev,next myCustomButton'
          },
          currentTimezone: 'Asia/Beijing',
          weekNumbersWithinDays: true,
          handleWindowResize: true,
          eventLimit: true,
          views: {
            agenda: {
              eventLimit: 3
            }
          },
          weekNumberCalculation: 'ISO',
          dayClick: function() {
            alert('a day has been clicked!')
          },
          events: [
            {
              title: 'event1',
              start: '2018-04-17'
            },
            {
              title: 'event2',
              start: '2018-04-17',
              end: '2018-04-18'
            },
            {
              title: 'event3',
              start: '',
              allDay: false // will make the time show
            }
          ]
        })
      })
    },
    methods: {

    }
  }
</script>
<style scoped>

</style>
<style>
  .fc-button-group, .fc button {
    display: block !important;
  }
</style>

