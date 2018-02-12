<template>
  <el-row type="flex">
    <el-col :span="6"><div></div></el-col>
    <el-col :span="12" class="detail-content">
      <h2 class="title">详情页面</h2>
      <el-form :data="detail" label-width="110px" status-icon style="width:80%;margin:0 auto">
        <el-form-item v-for="(column,index) in showColumns" :key="index" :label="column.name">
          <div>{{detail[column.codeCamel]}}</div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6"><div ></div></el-col>
  </el-row>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'

  export default {
    name: 'HmComplexDetail',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {},
    props: {
      /**
       * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
       * 对于所有毫末科技的组件，必须传schema，以完成数据的交互
       */
      schema: {
        type: Object,
        required: true
      },
      /*
      * 在详情页需要传入用户的id用来带出用户信息
      * */
      userId: {
        type: null,
        required: true
      }
    },
    data() {
      return {
        list: null,
        detail: null,
        showColumns: [] // 要显示的列数据
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.init()
      this.getList()
    },
    methods: {
      init() {
        const self = this
        _.each(self.schema['columns'], function(column) {
          const tmp = JSON.parse(JSON.stringify(column))
          self.showColumns.push(tmp)
        })

        if (!request.defaults.baseURL) {
          request.defaults.baseURL = '/org/api'
        }
        console.log(request.defaults)
        console.log(`request.defaults.baseURL: ${request.defaults.baseURL}`)
      },
      getList: function() {
        const self = this
        self.listLoading = true
        const params = {}
        // 拿到所有的用户
        request(self.schema.modelUnderscorePlural, {
          params: params
        }).then(resp => {
          console.log('=============')
          console.log(self.schema.modelUnderscorePlural)
          self.list = resp.data
          // 匹配需要展示的用户
          _.each(self.list, function(item) {
            if (item.id === self.userId) {
              self.detail = item
            }
          })
        })
      }
    }
  }
</script>
<style scoped>
  .title{
    text-align: center;
  }
  .detail-content{
    background-color: #F8F8F8;
  }
</style>
