<template>
  <div>
    <el-form :model="form">
      <el-col :span="18">
        <el-form-item  label="分部编码" :label-width="formLabelWidth">
          <el-input  v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="分部名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="18">
        <el-form-item label="分部简称" :label-width="formLabelWidth">
          <el-input v-model="form.easy"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="18">
        <el-form-item label="显示顺序" :label-width="formLabelWidth">
          <el-input v-model="form.order"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="18">
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="4"><el-button icon="el-icon-document" @click="">保存</el-button></el-col>
    </el-form>
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
          desc: ''
        },
        formLabelWidth: '150px',
        centerDialogVisible: false
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
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

