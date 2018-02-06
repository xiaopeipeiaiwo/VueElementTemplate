<template>
  <el-row type="flex">
    <el-col :span="6"><div></div></el-col>
    <el-col :span="12" class="detail-content">
      <h2 class="title">详情页面</h2>
      <el-form :model="detail" ref="detail"  label-width="110px" status-icon style="width:80%;margin:0 auto">
        <el-form-item label="姓名" prop="name">
          <a href="#">{{detail.name}}</a>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <div>{{detail.gender}}</div>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <div>{{detail.age}}</div>
        </el-form-item>
        <el-form-item label="出生日期" prop="date">
          <div>{{detail.date}}</div>
        </el-form-item>
        <el-form-item label="照片" prop="img">
          <img style="width: 50px;" :src=detail.img alt="...">
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <div>{{detail.education}}</div>
        </el-form-item>
        <el-form-item label="最常用的网站" prop="website">
          <a :href="detail.website">{{detail.website}}</a>
        </el-form-item>
        <el-form-item label="最喜欢的颜色" prop="color" class="color">
          <input type="color" v-model="detail.color" style="width:200px;height:36px;border:none;outline:0"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <div>{{detail.phone}}</div>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <div>{{detail.email}}</div>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <div>{{detail.address}}</div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6"><div ></div></el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'HmComplexDetail',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {},
    data() {
      return {
        detail: {
          name: 'haomokeji',
          gender: '男',
          age: '18',
          password: '123456',
          website: 'https://www.baidu.com',
          img: 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=936c94db60600c33e474d69a7b253a6a/5243fbf2b21193134871a87f6e380cd790238dcb.jpg',
          date: '2018/02/06',
          education: '本科',
          color: '#ff0000',
          phone: '18034935566',
          email: '18034935566@gmail.com',
          address: '北京市海淀区文思海辉大厦'
        }
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
    },
    methods: {}
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
