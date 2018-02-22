<template>
  <div>
    <hm-complex-panel :schema="schema['HmUser']" :userId="userId" :hmTitle="titleBak" :hmContentClass="hmContentClass" :showFields="showFields"
                      :hmStyle="styleBak" :hmPanelHeight="panelHeightBak" :hmCollapse="collapseBak">
    </hm-complex-panel>
    <hm-complex-panel :schema="schema['HmUser']" :userId="userId2" :hmTitle="hmTitle" :hmTitleClass="hmTitleClass" :showFields="showFields2"
                      :hmContentText="hmContentText" :hmStyle="hmStyle" :hmPanelHeight="hmPanelHeight" :hmCollapse="collapses">
    </hm-complex-panel>
  </div>
</template>

<script>
  import HmComplexPanel from './HmComplexPanel.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexPanel',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-panel': HmComplexPanel
    },
    data() {
      return {
        showFields: ['username', 'loginid', 'password', 'mobile', 'email']
      }
    },
    computed: {
    },
    filters: {
    },
    created() {
      this.schema = schema
      this.userId = '0e26566e953449a7a7500c34be39fd26'
      this.userId2 = '1efff63125954583b0ac5a9c252b9041'
      this.hmTitle = '面版名称'
      this.hmTitleClass = 'center'
      this.hmContentClass = 'center'
      this.hmContentText = '面板文字'
      this.hmStyle = {
        width: '50%',
        background: '#42b983',
        margin: '0 auto'
      }
      this.hmPanelHeight = {
        height: '100px'
      }
      this.collapses = 12
      this.showFields = ['username', 'loginid', 'password', 'mobile', 'email']
      this.showFields2 = ['mobile', 'loginid']
      this.titleBak = '测试面板'
      this.styleBak = {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
      }
      this.panelHeightBak = {
        height: '200px'
      }
      this.collapseBak = 22
    },
    methods: {}
  }
</script>
<style scoped>
</style>
