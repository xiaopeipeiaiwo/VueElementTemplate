<template>
  <div>
    <el-col :span="10"><el-button icon="el-icon-plus" @click="dialogFormVisible = true">添加字段</el-button></el-col>
    <el-dialog title="添加字段" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="字段类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="字段描述" :label-width="formLabelWidth">
          <el-input v-model="form.easy" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序" :label-width="formLabelWidth">
          <el-input-number v-model="form.num" controls-position="right" @change="handleChange" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="最大长度" :label-width="formLabelWidth">
          <el-input v-model="form.easy" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="字段类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="字段名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="字段描述">
      </el-table-column>
      <el-table-column
        prop="address"
        label="字段描述">
      </el-table-column>
      <el-table-column
        prop="address"
        label="顺序">
      </el-table-column>
      <el-table-column
        prop="address"
        label="最大长度">
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    components: {
      CountTo
    },
    data() {
      return {
        list: null,
        dialogFormVisible: false,
        form: {
          code: '',
          name: '',
          easy: '',
          order: '',
          desc: '',
          num: 1
        },
        formLabelWidth: '150px',
        centerDialogVisible: false,
        tableData: [{}]
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      },
      handleChange(value) {
        console.log(value)
      },
      saveIt() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>

