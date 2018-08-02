<template>
  <div class="dashboard-editor-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="组织结构" name="first">
        <el-row :gutter="18">
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}" style="padding-right:8px;margin-bottom:30px;">
            <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
          </el-col>
          <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 16}" style="padding-right:8px;margin-bottom:30px;">
            <transaction-table @handleSetLineChartData="handleSetLineChartData" style="border-bottom: 1px solid #eee; padding-bottom: 6px"></transaction-table>
            <list-info style="padding-top: 10px"></list-info>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="自定义字段" name="second">
        <el-tabs v-model="activeSecond" @tab-click="secondClick">
          <el-tab-pane label="全部字段" name="all">
            <all-chart></all-chart>
          </el-tab-pane>
          <el-tab-pane label="分部字段" name="each">
            <part-chart></part-chart>
          </el-tab-pane>
          <el-tab-pane label="部门字段" name="part">
            <part-chart></part-chart>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>



  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import TransactionTable from './components/TransactionTable'
import ListInfo from './components/ListInfo'
import AllChart from './components/AllChart'
import PartChart from './components/PartChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    PartChart,
    AllChart,
    ListInfo,
    GithubCorner,
    PanelGroup,
    TransactionTable
  },
  data() {
    return {
      activeName: 'first',
      activeSecond: 'all'
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    secondClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
