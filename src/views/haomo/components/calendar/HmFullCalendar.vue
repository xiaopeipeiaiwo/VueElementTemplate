7<template>
	<div class="calender">
    <i class="el-icon-date" @click="dialogTableVisible = true"></i>
    <el-dialog :visible.sync="dialogTableVisible">
      <full-calendar :events="fcEvents" locale="en"></full-calendar>
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
        console.log(self.schema)
        request(self.schema.modelUnderscorePlural).then(resp => {
          console.log(resp.data)
          _.each(resp.data, function(item, index) {
            const test = _.cloneDeep(self.demoEvents)
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
      }
    }
  }
</script>
<style scoped>
</style>

