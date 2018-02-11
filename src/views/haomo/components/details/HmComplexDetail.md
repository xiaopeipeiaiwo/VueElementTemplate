### 基本使用

```jsx
    <hm-complex-table   :userId="0e26566e953449a7a7500c34be39fd26"   
                        :schema="{
                                   'model': 'Role',
                                   'modelPlural': 'Roles',
                                   'modelCamel': 'role',
                                   'modelCamelPlural': 'roles',
                                   'modelUnderscore': 'role',
                                   'modelUnderscorePlural': 'roles',
                                   'columns': [
                                     {
                                       'id': 'o121',
                                       'objectId': 'E9AC3A9C-D43B-4384-A7EE-05E60BF711A7',
                                       'name': '姓名',
                                       'code': 'NAME',
                                       'creationDate': '1498990741',
                                       'creator': 'hm20160509',
                                       'modificationDate': '1498997012',
                                       'modifier': 'xjq',
                                       'dataType': 'VARCHAR2(128CHAR)',
                                       'length': '128',
                                       'codeCamel': 'name',
                                       'codeCamelPlural': 'names',
                                       'codeUnderscore': 'name',
                                       'codeUnderscorePlural': 'names',
                                       'type': 'string'
                                     },
                                     {
                                       'id': 'o122',
                                       'objectId': 'A99D5EAB-FE49-4D56-94EE-0CAB2FEC3788',
                                       'name': '描述',
                                       'code': 'DESCRIPTION',
                                       'creationDate': '1498990741',
                                       'creator': 'hm20160509',
                                       'modificationDate': '1498997012',
                                       'modifier': 'xjq',
                                       'dataType': 'CLOB',
                                       'codeCamel': 'description',
                                       'codeCamelPlural': 'descriptions',
                                       'codeUnderscore': 'description',
                                       'codeUnderscorePlural': 'descriptions',
                                       'type': 'string'
                                     },
                                     {
                                       'id': 'o123',
                                       'objectId': '4B3D418C-C2C3-4785-A68A-C54918DE9160',
                                       'name': '创建时间',
                                       'code': 'CREATE_TIME',
                                       'creationDate': '1498990741',
                                       'creator': 'hm20160509',
                                       'modificationDate': '1498997012',
                                       'modifier': 'xjq',
                                       'dataType': 'DATE',
                                       'codeCamel': 'createTime',
                                       'codeCamelPlural': 'createTimes',
                                       'codeUnderscore': 'create_time',
                                       'codeUnderscorePlural': 'create_times',
                                       'type': 'datetime'
                                     },
                                     {
                                       'id': 'o124',
                                       'objectId': '06523D0E-DAF6-4172-AF06-B3B6240EB8CB',
                                       'name': '等级',
                                       'code': 'RANK',
                                       'creationDate': '1498990741',
                                       'creator': 'hm20160509',
                                       'modificationDate': '1498997012',
                                       'modifier': 'xjq',
                                       'dataType': 'NUMBER',
                                       'codeCamel': 'rank',
                                       'codeCamelPlural': 'ranks',
                                       'codeUnderscore': 'rank',
                                       'codeUnderscorePlural': 'ranks',
                                       'type': 'number'
                                     }
                                   ]
                                 }"></hm-complex-table>
```
