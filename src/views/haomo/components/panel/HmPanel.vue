<template>
  <el-row type="flex">
    <el-col :span="hmCollapse" class="detail-content" style="margin:0 auto">
      <!--<h2 class="title">面板页面</h2>-->
      <el-card class="box-card" :style="hmStyle">
        <div slot="header" class="clearfix" :class="hmTitleClass">
          <span>{{hmTitle}}</span>
        </div>
        <div :style="hmPanelHeight" :class="hmContentClass">
          <span>{{hmContentText}}</span>
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
       * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
       * 对于所有毫末科技的组件，必须传schema，以完成数据的交互
       */
      schema: {
        type: Object,
        required: true
      },
      /**
       * 指定要显示的列。默认为根据schema得到的所有列。完整示例为：
       *  [
       *    {
       *      "name": "姓名",
       *      "code": "username",
       *      "render": function(value){
       *        return "<a href='value'></a>"
       *      }
       *    },
       *    "mobile",
       *    "sexual"
       *  ]
       */
      columns: {
        type: Array,
        required: false,
        validator: function(value) {
          if (typeof value !== 'object') {
            console.warn(`传入的columns不符合要求，必须是数组`)
            return false
          }

          return true
        }
      },
      /**
       * 在面板页传入面板标题
       */
      hmTitle: {
        type: String,
        required: false
      },
      /**
       * 在面板页传入标题类名
       */
      hmTitleClass: {
        type: String,
        required: false
      },
      /**
       * 在面板页传入内容类名
       */
      hmContentClass: {
        type: String,
        required: false
      },
      /**
       * 在面板页传入内容
       */
      hmContentText: {
        type: String,
        required: false
      },
      /**
       * 在面板页传入面板样式
       */
      hmStyle: {
        type: Object,
        required: false
      },
      /**
       * 在面板页传入面板内容高度
       */
      hmPanelHeight: {
        type: Object,
        required: false
      },
      /**
       * 在面板页传入面板宽度
       */
      hmCollapse: {
        type: String,
        required: false
      },
      showFields: {
        type: Object,
        required: false
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
    created() {},
    methods: {
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
