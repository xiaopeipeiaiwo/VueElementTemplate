<template>
  <el-row type="flex">
    <el-col :span="options.panel_span" class="detail-content" style="margin:0 auto">
      <!--<h2 class="title">面板页面</h2>-->
      <el-card class="box-card" :style="options.panel_style">
        <div slot="header" class="clearfix" :class="options.title_class" @click="toggle()">
          <span>{{options.title}}</span>
        </div>
        <div :style="options.content_height" :class="options.content_class" v-show="collapse">
          <slot></slot>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'

  export default {
    name: 'HmPanel',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {},
    props: {
      /**
       * 在面板页传入面板对象
       */
      options: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        collapse: true
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
    },
    methods: {
      toggle() {
        if (this.options.canCollapse) {
          this.collapse = !this.collapse
          console.log('收起展开')
        } else {
          console.log('不可收起')
        }
      },
      validate() {
        const self = this
        // this.columns数组元素本身必须是string或者object. 且必须是schema中定义的列
        // 由于vue中不允许通过其他的props来验证当前props，只能在created里进行调用
        _.each(self.columns, function(item) {
          if (!item) {
            return 0
          }

          if (typeof item !== 'string' && typeof item !== 'object') {
            console.error(`传入的columns不符合要求，数组元素必须是字符串或对象`)
          }
          if (typeof item === 'string' && !_.keyBy(self.schema['columns'], 'code')[item.toUpperCase()]) {
            console.error(`传入的columns不符合要求，字符串元素[${item}]必须是schema中定义的列[code]`)
          }
          if (typeof item === 'object' && !_.keyBy(self.schema['columns'], 'code')[item['code'].toUpperCase()]) {
            console.error(`传入的columns不符合要求，元素的code属性[${item['code']}]必须是schema中定义的列[code]`)
          }
        })
      },
      init() {
        const self = this
        // 处理要显示的列
        if (!self.columns || !self.columns.length) {
          _.each(self.schema['columns'], function(column) {
            const tmp = JSON.parse(JSON.stringify(column))
            self.showColumns.push(tmp)
          })
        } else {
          self.showColumns = []
          // 将字符串对象进行替换处理
          _.each(self.schema['columns'], function(column) {
            _.each(self.columns, function(item) {
              if (column.codeCamel === item) {
                const tmp = JSON.parse(JSON.stringify(column))
                self.showColumns.push(tmp)
              }
            })
          })
        }
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
  .weight{
    font-weight: 700;
  }
  .center{
    text-align: center;
  }
</style>
