<template>
  <el-tree :data="data" :props="defaultProps" default-expanded-keys="[1]" node-key="id" @node-click="handleNodeClick"></el-tree>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      data: [{
        label: '鸿合科技',
        id: '1',
        children: [{
          id: '12',
          label: '鸿合科技子1',
          children: [{
            id: '113',
            label: '鸿合科技子子1'
          }, {
            id: '114',
            label: '鸿合科技子子2'
          }]
        }, {
          label: '鸿合科技子2',
          id: '2',
          children: [{
            id: '15',
            label: '鸿合科技1'
          }]
        }, {
          label: '鸿合科技子3',
          id: '6',
          children: [{
            id: '16',
            label: '鸿合科技1'
          }]
        }, {
          label: '鸿合科技子4',
          id: '7',
          children: [{
            id: '17',
            label: '鸿合科技1'
          }]
        }, {
          label: '鸿合科技子5',
          id: '8',
          children: [{
            label: '鸿合科技1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
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
