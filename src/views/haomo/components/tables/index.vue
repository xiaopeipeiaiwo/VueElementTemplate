<template>
  <div class="app-container calendar-list-container">
    <hm-complex-table :schema="schema['HmUser']"
                      :columns="showUserColumns"
                      :filters="userFilters"
                      :includes="userIncludes"
                      :refers="userRefers"
                      :options="userOptions"></hm-complex-table>
  </div>
</template>

<script>
  import HmComplexTable from './HmComplexTable.vue'
  import schema from '../../schemas/hm_org_schema'

  export default {
    name: 'HmComplexTableIndex',
    // 继承其他组件
    extends: {},
    // 使用其它组件
    components: {
      'hm-complex-table': HmComplexTable
    },
    data() {
      return {
        showUserColumns: ['mobile', 'loginid', 'username', 'email', 'createTime'],
        userFilters: [
          { placeholder: '过滤手机号', 'mobile': { 'like': '' }, isShow: true },
          { placeholder: '过滤用户名', 'username': { 'equalTo': '' }, isShow: true },
          { placeholder: ['安全级别大于', '安全级别小于'], 'create_time': { 'greaterThanOrEqualTo': '', 'lessThanOrEqualTo': '' }, isShow: true }
        ],
        userIncludes: {
          'hm_user': {
            includes: ['user_id']
          }
        },
        userRefers: {
          'auth_token': {
            includes: ['userId']
          }
        }
      }
    },
    filters: {
    },
    created() {
      this.schema = schema
      this.userOptions = {
        pageSize: 10,
        sortItem: 'create_time',
        sortOrder: 'desc',
        changeValue: {
          username: { 1: '是', 0: '否' }
        },
        newData: {
          isShow: true,
          showUserColumns: [
            { name: '姓名', codeCamel: 'username', widgetType: 1 },
            { name: '登录ID', codeCamel: 'loginid', widgetType: 1 },
            { name: '类型', codeCamel: 'type', widgetType: 1 }
          ],
          formSchema: schema['HmUser'],
          layout: { left: 0, middle: 24, right: 0 }
        },
        editData: {
          isShow: true,
          showUserColumns: [{ name: '姓名', codeCamel: 'username', widgetType: 1 }],
          formSchema: schema['HmUser'],
          layout: { left: 0, middle: 24, right: 0 }
        },
        showRefresh: true,
        showExport: true,
        showDeleteButton: true,
        buttonGroup: false,
        showDetail: {
          isShow: true,
          showColumns: ['mobile', 'loginid', 'username', 'email']
        }
        // dataProcessing(value) {}
      }
    },
    methods: {
      method1() {
        this.dialogFormVisible = false
        console.log('method1')
      }
    }
  }
</script>
