<template>
  <div>
    <hm-panel :schema="schema['HmUser']" :hmTitle="titleBak" :hmContentClass="hmContentClass"
                      :hmStyle="styleBak" :hmPanelHeight="panelHeightBak" :hmCollapse="collapseBak">
      <hm-complex-detail :schema="schema['HmUser']" :tableId="userId">
      </hm-complex-detail>
    </hm-panel>
    <hm-panel :schema="schema['HmUser']" :hmTitle="hmTitle" :hmTitleClass="hmTitleClass"
                      :hmContentText="hmContentText" :hmStyle="hmStyle" :hmPanelHeight="hmPanelHeight" :hmCollapse="collapses">
      <hm-complex-form :schema="schema['HmUser']" :fields="showFields">
      </hm-complex-form>
    </hm-panel>
  </div>
</template>

<script>
  import HmPanel from './HmPanel.vue'
  import schema from '../../schemas/hm_org_schema'
  import HmComplexDetail from '../details/HmComplexDetail.vue'
  import HmComplexForm from '../forms/HmComplexForm.vue'

  export default {
    name: 'HmPanel',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-panel': HmPanel,
      'hm-complex-detail': HmComplexDetail,
      'hm-complex-form': HmComplexForm
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
        width: '80%',
        background: '#42b983',
        margin: '0 auto'
      }
      this.hmPanelHeight = {
        height: '400px'
      }
      this.collapses = 22
      this.showFields = ['username', 'loginid', 'password', 'mobile', 'email']
      this.showFields2 = ['mobile', 'loginid']
      this.titleBak = '测试面板'
      this.styleBak = {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
      }
      this.panelHeightBak = {
        height: '500px'
      }
      this.collapseBak = 22
    },
    methods: {}
  }
</script>
<style scoped>
</style>
