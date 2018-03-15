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
                  v-if="filter.isShow"
                  v-model="listQuery.filters[schema['modelUnderscore']][getFilterColumn(filter)][getFilterOper(filter)]">
        </el-input>
      </span>
      <!-- end 过滤条件 -->

      <el-button-group v-if="buttonGroup">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" v-if="isShowExport" @click="handleDownload">导出</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-plus" v-if="isShowNewButton" @click="openDialog('newData')">新建</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-refresh" v-if="isShowRefresh" @click="refreshList">刷新</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-close" v-if="multipleSelection.length" @click="BatchRemove">批量删除</el-button>
      </el-button-group>
      <span v-if="!buttonGroup">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" v-if="isShowExport" @click="handleDownload">导出</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-plus" v-if="isShowNewButton" @click="openDialog('newData')">新建</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-refresh" v-if="isShowRefresh" @click="refreshList">刷新</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-close" v-if="multipleSelection.length" @click="BatchRemove">批量删除</el-button>
      </span>


    </div>
    <!-- end 过滤 -->

    <!-- 表格 -->
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="index" :index="indexMethod" label="序号" width="50px"></el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column v-for="(column,index) in showColumns" :key="index" align="center" :label="column.name">
        <template slot-scope="scope">
          <span>{{ scope.row[column.codeCamel] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" :width="operationWidth" v-if="isShowEditDataButton || isShowDeleteButton">
        <template slot-scope="scope">
          <el-button @click="openDialog('editData',scope.row)" v-if="isShowEditDataButton" type="text" size="small">编辑</el-button>
          <el-button @click="deleteData(scope.row)" type="text" v-if="isShowDeleteButton" size="small">删除</el-button>
          <el-button @click="openDialog('detail',scope.row)" type="text" v-if="isShowDetail" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- end 表格 -->

    <!-- 翻页 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo"
                     :page-sizes="[10,20,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- end翻页 -->

    <!-- 弹窗 -->
    <!-- @TODO 补充弹窗 -->

    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" :close-on-click-modal="closeOnClickModal" width="dialogWidth">
      <el-form v-if="dialogName == '详情'">
        <el-form-item :label="dialog.name" :label-width="formLabelWidth" v-for="dialog in dialogForm">
          <el-input v-model="dialog.value" disabled auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <hm-complex-form :schema="formSchema"
                       :columns="showUserColumns"
                       :buttons="showUserButtons"
                       :confirmFunction="formConfirm"
                       :cancelFunction="formCancel"
                       :tableId="tableId" v-if="dialogName != '详情'">
      </hm-complex-form>
    </el-dialog>

    <!-- end 弹窗 -->

  </div>
</template>

<script>
  import _ from 'lodash'
  import request from '@/utils/request'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime, param } from '@/utils'
  import * as excel from '@/vendor/Export2Excel'
  import { Button, Table, TableColumn, Pagination, Loading } from 'element-ui'
  import HmComplexForm from '../forms/HmComplexForm.vue'

  /**
   * 毫末科技的表格组件.
   *
   *   demo地址: factory.haomo-studio.com/vue-element/#/haomo/components/table
   * @author 胡小根 hxg@haomo-studio.com
   */
  export default {
    name: 'HmComplexTable',
    // 集成其他组件
    extends: {
    },
    // 使用其它组件
    components: {
      'el-button': Button,
      'el-table': Table,
      'el-table-column': TableColumn,
      'el-pagination': Pagination,
      'hm-complex-form': HmComplexForm
    },
    // 混入公共对象
    mixins: [],
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
       * 搜索过滤选项。默认没有过滤功能。完整的示例为：
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
       *      "codeCamel": "username",
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
       * 表格的选项，包括：pageSize。完整的示例为：
       *  {
       *    "pageSize": 10, // 默认为10条数据/页
       *    "showExport": false,  // 默认为不显示导出按钮
       *    "sortItem": "create_time", // 默认为create_time字段的desc排序
       *    "sortOrder": "desc",
       *    "showRefresh": false, //默认不显示刷新按钮
       *    "showDeleteButton": false,  //默认不显示删除按钮
       *    "buttonGroup": false  //默认不以按钮组的方式呈现button
       *    showDetail: false // 默认不显示详情
       *    "changeValue": {      // 数据库字段转化显示，例如(0=否,1=是)
       *      username: {1: '是', 0: '否'}
       *    },
       *    "newData": {  // 新建按钮的配置
       *      isShow: false,  // 默认不显示新建按钮
       *      showUserColumns: [], // 新建表单的Columns配置,详情参考Form组件
       *      formSchema: {}, // 新建表单的schema配置
       *      showUserButtons: ['提交', '取消'],  // 新建表单的显示按钮
       *      formConfirm() {}, // 新建的提交回调
       *      formCancel() {}  // 新建的取消回调
       *    },
       *    "editData": { // 编辑按钮的配置
       *      isShow: false,  // 默认不显示编辑按钮
       *      showUserColumns: [], // 编辑表单的Columns配置,详情参考Form组件
       *      formSchema: {}, // 编辑表单的schema配置
       *      showUserButtons: ['提交', '取消'], // 编辑表单的显示按钮
       *      formConfirm() {}, // 编辑的提交回调
       *      formCancel() {} // 编辑的取消回调
       *    }
       *  }
       */
      options: {
        type: Object,
        required: false
      }
    },
    directives: {
      waves,
      Loading
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 20,
          sortItem: 'create_time',
          sortOrder: 'desc',
          filters: {}
        },
        downloadLoading: false,
        dialogFormVisible: false, // 是否显示弹窗
        dialogForm: [], // 弹窗数据
        showColumns: [], // 要显示的列数据
        formLabelWidth: '120px',
        closeOnClickModal: false,
        multipleSelection: [], // 选择的数组
        dialogName: '',

        isShowNewButton: false, // 是否显示新建
        isShowEditDataButton: false, // 是否显示编辑
        isShowDeleteButton: false, // 是否显示删除
        isShowExport: false, // 是否显示导出按钮
        formSchema: {}, // form弹窗的Schema定义
        showUserColumns: [], // form弹窗的Columns定义
        showUserButtons: [], // from弹窗显示按钮
        tableId: '',

        isShowRefresh: false,
        buttonGroup: false,
        operationWidth: 0, // 操作栏的宽度
        isShowDetail: false // 是否显示详情按钮
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
      indexMethod(index) {
        return this.listQuery.pageSize * (this.listQuery.pageNo - 1) + index + 1
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
            self.$set(tmp, 'code', tmp.code.toLowerCase())
            self.showColumns.push(tmp)
          })
        } else {
          self.showColumns = JSON.parse(JSON.stringify(self.columns))
          // 将字符串对象进行替换处理
          _.each(self.showColumns, function(column, index) {
            if (typeof column === 'string') {
              // const tmp = _.keyBy(self.schema['columns'], 'code')[column.toUpperCase()]
              // 王康 修改 2018年02月25日22:58:23
              const tmp = _.keyBy(self.schema['columns'], 'codeCamel')[column]
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
          _.each(_.cloneDeep(self.filters), function(filter) {
            filters[tableName] = Object.assign(filters[tableName], filter)
          })
          delete filters[tableName]['placeholder']
          delete filters[tableName]['isShow']
          self.$set(self.listQuery, 'filters', filters)
        }

        if (!request.defaults.baseURL) {
          request.defaults.baseURL = '/org/api'
        }
        if (self.options.newData && self.options.newData.isShow) { // 判断是否显示新建按钮
          self.isShowNewButton = self.options.newData.isShow
        }
        if (self.options.editData && self.options.editData.isShow) { // 判断是否显示编辑按钮
          self.isShowEditDataButton = self.options.editData.isShow
          self.operationWidth += 50
        }
        if (self.options.showRefresh) { // 判断是否显示刷新按钮
          self.isShowRefresh = self.options.showRefresh
        }
        if (self.options.showExport) { // 判断是否显示导出按钮
          self.isShowExport = self.options.showExport
        }
        if (self.options.showDeleteButton) { // 判断是否显示删除按钮
          self.isShowDeleteButton = self.options.showDeleteButton
          self.operationWidth += 50
        }
        if (self.options.buttonGroup) { // 设置按钮是否以按钮组呈现
          self.buttonGroup = self.options.buttonGroup
        }
        if (self.options.showDetail && self.options.showDetail.isShow) { // 设置按钮是否以按钮组呈现
          self.isShowDetail = self.options.showDetail.isShow
          self.operationWidth += 50
        }
        console.log(request.defaults)
        console.log(`request.defaults.baseURL: ${request.defaults.baseURL}`)
      },
      getList() {
        const self = this
        self.listLoading = true

        // 处理过滤条件
        const params = JSON.parse(JSON.stringify(self.listQuery))
        params.filters = self.filterParams
        params.filters = this.deleteFilter(params.filters)

        request(self.schema.modelUnderscorePlural, {
          params: params
        }).then(resp => {
          if (self.options.changeValue) {
            resp.data = self.changeValue(resp.data)
          }
          self.list = resp.data
          self.total = parseInt(resp.headers.total)
          self.listLoading = false
        })
      },
      // 数据库字段转化显示，例如(0=否,1=是)
      changeValue(data) {
        const self = this
        _.map(data, function(item, index) {
          _.forEach(item, function(listValue, listKey) {
            if (self.options.changeValue[listKey] && self.options.changeValue[listKey][listValue]) {
              item[listKey] = self.options.changeValue[listKey][listValue]
            }
          })
        })
        return data
      },
      // 添加一条数据
      openDialog(type, data) {
        const self = this
        self.dialogFormVisible = true
        if (type === 'editData') {
          self.dialogName = '编辑'
          self.showUserColumns = self.options.editData.showUserColumns
          self.formSchema = self.options.editData.formSchema
          self.showUserButtons = self.options.editData.showUserButtons
          self.tableId = data.id
        }
        if (type === 'newData') {
          self.dialogName = '新建'
          self.showUserColumns = self.options.newData.showUserColumns
          self.formSchema = self.options.newData.formSchema
          self.showUserButtons = self.options.newData.showUserButtons
        }
        if (type === 'detail') {
          self.dialogName = '详情'
          self.dialogForm = []
          _.each(self.options.showDetail.showColumns, function(columns) {
            _.each(self.schema.columns, function(item, index) {
              if (columns === item.codeCamel) {
                self.dialogForm.push(item)
              }
            })
          })

          _.map(self.dialogForm, function(item, index) {
            item.value = data[item.code]
            item.id = data.id
          })
        }
      },
      // 表单的提交
      formConfirm() {
        this.options.newData.formConfirm()
        this.dialogFormVisible = false
        this.getList()
      },
      // 表单的取消
      formCancel() {
        this.options.newData.formCancel()
        this.dialogFormVisible = false
        this.getList()
      },
      // 删除过滤条件为空的filter
      deleteFilter(filters) {
        const newFilters = filters
        _.forEach(newFilters, function(columns, columnsKey) {
          _.forEach(newFilters[columnsKey], function(column, columnKey) {
            if (columns[columnKey][Object.keys(column)] === '%%' || columns[columnKey][Object.keys(column)] === '' ||
              columns[columnKey][Object.keys(column)] === null) {
              delete (columns[columnKey])
            }
          })
        })
        return JSON.stringify(newFilters[Object.keys(newFilters)]) === '{}' ? null : newFilters
      },
      // 删除一条数据
      deleteData(data) {
        const self = this
        self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request(self.schema.modelUnderscorePlural + '/' + data.id + '/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
          }).then(data => {
            if (data.data.message === 'delete success') {
              self.$message({
                message: data.data.message,
                type: 'success'
              })
              self.getList()
            }
          })
        }).catch(() => {
          self.$message({
            message: '已取消删除',
            type: 'success'
          })
        })
      },
      refreshList() {
        this.listQuery = {
          pageNo: 1,
          pageSize: 20,
          sortItem: 'create_time',
          sortOrder: 'desc',
          filters: {}
        }
        this.init()

        this.getList()
      },
      // 批量删除
      BatchRemove() {
        const self = this
        const datas = {
          ids: []
        }
        if (!self.multipleSelection) return false
        _.each(self.multipleSelection, function(item, index) {
          datas.ids.push(item.id)
        })
        datas.ids = JSON.stringify(datas.ids)
        self.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request(self.schema.modelUnderscorePlural + '/delete/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            data: datas,
            transformRequest: param
          }).then(data => {
            if (data.data.message === 'delete success') {
              self.$message({
                message: data.data.message,
                type: 'success'
              })
              self.getList()
            }
          })
        }).catch(() => {
          self.$message({
            message: '已取消删除',
            type: 'success'
          })
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val
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
        // @TODO 修改下载excel的功能，请求所有的数据
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel(tHeader, data, 'table-list')
        this.downloadLoading = false
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
          if (key !== 'placeholder' && key !== 'isShow') {
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
  .el-table__body tr.current-row>td{
    background-color: #ecf5ff;
  }
</style>
