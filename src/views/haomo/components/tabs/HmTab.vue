<template>
  <!--<el-row :gutter="20" style="margin-top: 20px;padding: 0 20px;">
    <div width="1000px" height="500px">
      <el-col :span="12" v-for="column in schema['columns']">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane :label="column.name" name="first">
            <ul style="list-style: none;margin: 0;padding: 0;">
              <li>第1条数据</li>
              <li>第2条数据</li>
              <li>第3条数据</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
  </el-row> -->
  <swiper :options="swiperOption" style="padding: 20px 30px 0">
    <swiper-slide v-for="(column,index) in schema['columns']" :key="index">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane :label="column.name" name="first">
          <ul style="list-style: none;margin: 0;padding: 0;">
            <li>第1条数据</li>
            <li>第2条数据</li>
            <li>第3条数据</li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev" style="left: 1px;"></div>
    <div class="swiper-button-next" slot="button-next" style="right: 3px;"></div>
  </swiper>
</template>

<script>
  // import _ from 'lodash'
  // import request from '@/utils/request'
  // import schema from '../../schemas/hm_org_schema'

  /**
   * 毫末科技的选项卡组件.
   *
   *   demo地址: factory.haomo-studio.com/vue-element/#/haomo/components/tabs
   * @author 王康
   */
  export default {
    name: 'HmTab',
    // 集成其他组件
    extends: {},
    // 使用其它组件
    components: {},
    // 混入公共对象
    mixins: [],
    /**
     * 组件所使用的表定义schema。表定义schema，请使用 model2codejs 从pdm文件生成schema。
     * 对于所有毫末科技的组件，必须传schema，以完成数据的交互
     */
    props: {
      schema: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        activeName: 'first',
        swiperOption: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          // loop: true,
          spaceBetween: 30,
          grabCursor: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    created() {
      // this.validate()
      // console.log(this.schema)
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
        console.log(this.schema)
      }
    }
  }
</script>
<style scoped>

</style>
