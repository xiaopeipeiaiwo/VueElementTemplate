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
          // weekends: false
          header: {
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          views: {
            month: { titleFormat: 'YYYY, MM, DD' }
          }
        })
        $('#my-prev-button').click(function() {
          $('#calendar').fullCalendar('prev')
        })
      })
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>

