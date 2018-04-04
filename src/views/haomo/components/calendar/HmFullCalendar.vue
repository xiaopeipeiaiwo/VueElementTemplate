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
          defaultView: 'month'
        })
      })
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>

