<template>
	<div class="calender">
    <i class="el-icon-date" @click="dialogTableVisible = true"></i>
    <el-dialog :visible.sync="dialogTableVisible" style="line-hight:16px;">
      <full-calendar 
      :events="fcEvents" 
      lang="zh"
      @change-month="changeMonth"
      @event-click="eventClick"
      @day-click="dayClick"
      ></full-calendar>
    </el-dialog>
	</div>
</template>

<script>
  import fullCalendar from 'vue-fullcalendar'
  import request from '@/utils/request'
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    name: 'calender',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'full-calendar': fullCalendar
    },
    props: {
      schema: {
        type: Object,
        required: true
      },
      demoEvents: {
        type: Object,
        required: false
      }
    },
    zh: {
      weekNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      titleFormat: 'yyyy年MM月'
    },
    data() {
      return {
        fcEvents: [],
        dialogTableVisible: false
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        const self = this
        request(self.schema.modelUnderscorePlural).then(resp => {
          console.log(resp.data)
          _.each(resp.data, function(item, index) {
            const test = {}
            test.title = item[self.demoEvents.title]
            if (item[self.demoEvents.end] == null) {
              item[self.demoEvents.end] = item[self.demoEvents.start]
            }
            test.start = moment(item[self.demoEvents.start]).format('YYYY-MM-DD')
            test.end = moment(item[self.demoEvents.end]).format('YYYY-MM-DD')
            self.fcEvents.push(test)
          })
          console.log(self.fcEvents)
        })
      },
      'changeMonth'(start, end, current) {
        console.log('changeMonth', start.format(), end.format(), current.format())
      },
      'eventClick'(event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      'dayClick'(day, jsEvent) {
        console.log('dayClick', day, jsEvent)
      }
    }
  }
</script>
<style scoped>
</style>

