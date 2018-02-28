<template>
  <el-row type="flex">
    <el-col :span="10" class="detail-content" style="margin:0 auto" >
      <el-form style="border: 0.5px solid #e6ebf5">
        <el-row type="flex">
          <el-col style="height: 45px;background-color: #00BF8B" ></el-col>
        </el-row>
        <el-row type="flex" style="margin-top:35px">
          <el-col style="margin: 0 auto;height: 70px;width:433px;text-align: center;line-height: 70px;font-size: 35px;color:#586C8C;font-weight: bold" >
            <img />张家口人民检察院
          </el-col>
        </el-row>
        <el-form-item prop="pass">
          <el-input class="style" style="width:433px;margin: 0 auto;margin-top:25px;display: block;" prefix-icon="el-icon-search" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" style="width:433px;margin: 0 auto;display: block;border-width: 0px;border-bottom-width: 1px;border-radius: 0px;" prefix-icon="el-icon-search" suffix-icon="el-icon-view" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" style="width: 178px;height: 44px ;font-size:16px;background-color: #00BF8B;margin: 0 auto;display: block">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'HmLogin',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {},
    props: {
      options: {
        type: Object,
        required: false
      }
    },
    data() {

    },
    computed: {
    },
    filters: {
    },
    created() {
    },
    methods: {

    }
  }
</script>
<style scoped>
</style>
