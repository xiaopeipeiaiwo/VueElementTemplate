<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </div>
    <!-- end 过滤 -->

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column v-for="" align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- end 表格 -->

    <!-- 翻页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
       * 搜索过滤选项。默认没有过滤功能
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
       *    }
       *  ]
       */
      columns: {
        type: Array,
        required: false
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
          sort_order: 'desc'
        },
        downloadLoading: false
      }
    },
    created() {
      // @TODO init

      this.getList()
    },
    methods: {
      init() {
        let self = this
        if(!self.columns || !self.columns.length){
          self.columns =
        }
      },
      getList() {
        const self = this
        self.listLoading = true
        request(self.schema.modelUnderscorePlural).then(resp => {
          console.log(resp)
          self.list = resp.data
          self.total = resp.headers.total
          self.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
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
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'table-list')
          this.downloadLoading = false
        })
      }
    }
  }
</script>
