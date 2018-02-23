<template>
  <div>
    <hm-panel :options="options">
      <hm-complex-detail :schema="schema['HmUser']" :tableId="userId">
      </hm-complex-detail>
    </hm-panel>
    <hm-panel :options="options2">
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
      this.options = {
        title: '面版名称',
        panel_class: 'center',
        title_class: 'weight',
        content_class: 'center',
        panel_style: {
          width: '100%',
          marginTop: '20px',
          marginBottom: '20px'
        },
        panel_span: 22,
        content_height: {
          height: '600px'
        },
        canCollapse: true
      }
      this.options2 = {
        title: '测试面板',
        panel_class: 'center',
        title_class: 'center',
        content_class: 'center',
        panel_style: {
          width: '80%',
          background: '#42b983',
          margin: '0 auto'
        },
        panel_span: 20,
        canCollapse: false
      }
      this.schema = schema
      this.userId = '0e26566e953449a7a7500c34be39fd26'
      this.showFields = ['username', 'loginid', 'password', 'mobile', 'email']
    },
    methods: {}
  }
</script>
<style scoped>
</style>
