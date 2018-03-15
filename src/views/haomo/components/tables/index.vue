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
  import _ from 'lodash'

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
        showUserColumns: ['mobile', 'loginid', 'username', 'email'],
        userFilters: [
          { placeholder: '过滤手机号', 'mobile': { 'like': '' }, isShow: true },
          { placeholder: '过滤用户名', 'username': { 'equalTo': '' }, isShow: true }
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
        changeValue: {
          username: { 1: '是', 0: '否' }
        },
        newData: {
          isShow: true,
          showUserColumns: [{ name: 'username', widgetType: 1 }, { name: 'loginid', widgetType: 1 }, { name: 'type', widgetType: 1 }],
          formSchema: schema['HmUser'],
          showUserButtons: ['提交', '取消'],
          formConfirm() {
            console.log('提交')
          },
          formCancel() {
            console.log('取消')
          }
        },
        editData: {
          isShow: true,
          showUserColumns: [{ name: 'username', widgetType: 1 }],
          formSchema: schema['HmUser'],
          showUserButtons: ['提交', '取消'],
          formConfirm() {
            console.log('提交')
          },
          formCancel() {
            console.log('取消')
          }
        },
        showRefresh: true,
        showExport: true,
        showDeleteButton: true,
        buttonGroup: false,
        showDetail: {
          isShow: true,
          showColumns: ['mobile', 'loginid', 'username', 'email']
        },
        dataProcessing(value) {
          let list = []
          if (value[0].superior !== undefined && value[0].includes !== undefined &&
            value[0].refers !== undefined && value[0].relates !== undefined) {
            _.each(value, function(item, index) {
              list.push(item.superior)
            })
          } else {
            list = value
          }
          return list
        }
      }
    },
    methods: {}
  }
</script>
