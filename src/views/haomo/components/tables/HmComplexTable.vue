<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤 -->
    <div class="filter-container">
      <!-- 过滤条件 -->
      <span v-for="filter in filters" class="hm-complex-table__filter-span">
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  :placeholder="filter.placeholder"
                  v-model="listQuery.filters[schema['modelUnderscore']][getFilterColumn(filter)][getFilterOper(filter)]">
        </el-input>
      </span>
      <!-- end 过滤条件 -->

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <!-- end 过滤 -->

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column v-for="column in showColumns" align="center" :label="column.name">
        <template slot-scope="scope">
          <span>{{ scope.row[column.code] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- end 表格 -->

    <!-- 翻页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page_no"
                     :page-sizes="[10,20,50]" :page-size="listQuery.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- end翻页 -->

    <!-- 弹窗 -->
    <!-- @TODO 补充弹窗 -->
    <!-- end 弹窗 -->

  </div>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'

  export default {
    name: 'HmComplexTable',
    // 集成其他组件
    extends: {},
    // 使用其它组件
    components: {},
    // 混入公共对象
    mixins: [],
    props: {
      /**
       * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
       * 对于所有毫末科技的组件，必须传schema，已完成数据的交互
       */
      schema: {
        type: Object,
        required: true
      },
      /**
       * 搜索过滤选项。默认没有过滤功能。完整的实力为：
       *  {
       *    "column1": {
       *      like: '%abc%',                 模糊查询,包含字符”abc”
       *      notLike: ''                    模糊查询,不包含字符
       *      between: [1, 10],              取值在[1,10]之间,包含1与10
       *      notBetween: [1, 10],           取值小于1大于10
       *      isNull: true,     // 只能为true 判断字段是否为空
       *      isNotNull: true,  // 只能为true 判断字段是否不为空
       *      equalTo: "abc",                相等于
       *      notEqualTo: "abc",             不等于
       *      greaterThan: 10,               大于
       *      greaterThanOrEqualTo: Í10,      大于等于
       *      lessThan: 10,                  小于
       *      lessThanOrEqualTo: 10,         小于等于
       *      in: [],                        包含[]中字段
       *      notIn: []                      不包含[]中字段
       *    }
       *  }
       */
      filters: {
        type: Array,
        required: false
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
       * 修改行数据的Hook函数。参数为行数据 rowData
       */
      rowHook: {
        type: Function,
        required: false
      },
      /**
       * 表格的选项，包括：page_size。完整的示例为：
       *  {
       *    "page_size": 10, // 默认为10条数据/页
       *    "showExport": false,  // 默认为不显示导出按钮
       *    "sort_item": "create_time", // 默认为create_time字段的desc排序
            "sort_order": "desc"
       *  }
       */
      options: {
        type: Object,
        required: false
      }
    },
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page_no: 1,
          page_size: 20,
          sort_item: 'create_time',
          sort_order: 'desc',
          filters: {}
        },
        downloadLoading: false,

        showColumns: [] // 要显示的列数据
      }
    },
    computed: {
      filterParams: function() {
        const self = this
        const ret = JSON.parse(JSON.stringify(self.listQuery.filters))
        if (!ret) {
          return ret
        }

        if (!ret[self.schema['modelUnderscore']]) {
          return ret
        }

        _.each(Object.keys(ret[self.schema['modelUnderscore']]), function(column) {
          const operValue = ret[self.schema['modelUnderscore']][column]
          if (Object.keys(operValue)[0] === 'like') {
            ret[self.schema['modelUnderscore']][column]['like'] = '%' + ret[self.schema['modelUnderscore']][column]['like'] + '%'
          }
        })

        return ret
      }
    },
    created() {
      // this.validate()

      this.init()

      this.getList()
    },
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
            self.$set(tmp, 'code', tmp.code.toLowerCase())
            self.showColumns.push(tmp)
          })
        } else {
          self.showColumns = JSON.parse(JSON.stringify(self.columns))
          // 将字符串对象进行替换处理
          _.each(self.showColumns, function(column, index) {
            if (typeof column === 'string') {
              const tmp = _.keyBy(self.schema['columns'], 'code')[column.toUpperCase()]
              self.$set(tmp, 'code', tmp.code.toLowerCase())
              self.$set(self.showColumns, index, tmp)
            }
          })
        }

        // 处理过滤条件
        if (self.filters) {
          const tableName = self.schema['modelUnderscore']
          const filters = {}
          filters[tableName] = {}
          _.each(self.filters, function(filter) {
            filters[tableName] = Object.assign(filters[tableName], filter)
          })
          delete filters[tableName]['placeholder']
          self.$set(self.listQuery, 'filters', filters)
        }
      },
      getList() {
        const self = this
        self.listLoading = true

        // 处理过滤条件
        const params = JSON.parse(JSON.stringify(self.listQuery))
        params.filters = self.filterParams

        request(self.schema.modelUnderscorePlural, {
          params: params
        }).then(resp => {
          self.list = resp.data
          self.total = parseInt(resp.headers.total)
          self.listLoading = false
        })
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page_no = val
        this.getList()
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          // @TODO 修改下载excel的功能，请求所有的数据
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'table-list')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },

      getFilterColumn(filter) {
        const keys = Object.keys(filter)
        let column = null
        _.each(keys, function(key) {
          if (key !== 'placeholder') {
            column = key
            return 0
          }
        })
        return column.toLowerCase()
      },

      getFilterOper(filter) {
        return Object.keys(filter[this.getFilterColumn(filter)])[0]
      }
    }
  }
</script>

<style>
  .hm-complex-table__filter-span {
    margin-right: 5px;
  }
</style>
