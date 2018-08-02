<template>
  <div>
    <el-button icon="el-icon-plus" @click="dialogFormVisible = true">创建分部</el-button>
    <el-dialog title="添加分部" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分部编码" :label-width="formLabelWidth">
          <el-input v-model="form.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分部名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分部简称" :label-width="formLabelWidth">
          <el-input v-model="form.easy" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" :label-width="formLabelWidth">
          <el-input v-model="form.order" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc">
        </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      form: {
        code: '',
        name: '',
        easy: '',
        order: '',
        desc: ''
      },
      formLabelWidth: '100px',
      centerDialogVisible: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 7)
      })
    }
  }
}
</script>
