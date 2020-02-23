<template>
  <div>
    <Card>
    <tables :alldata="tableData" @on-save-edit="handleEdit" ref="tables" editable searchable search-place="top" v-model="showdata" :columns="columns" @on-delete="handleDelete"/>
    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
    <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>

import Tables from '_c/tables'
import { getUserInfoData,deleteUser,UpdateUser } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      showdata:[],
      pageSize:10,
      dataCount: 0,
      columns: [
        { title:'工号', key:'t_id',sortable:false,editable:false},
        { title: '姓名', key: 't_name', sortable: true,editable:false },
        { title: '职称', key: 't_jobtitle' ,sortable:false,editable:false},
        { title:'部门', key: 'dep_name', sortable:false,editable:false},
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }
              )
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    
    changepage(index){
        var _star = (index - 1)* this.pageSize
        var _end  = index * this.pageSize
        this.showdata = this.tableData.slice(_star,_end) 
    },
    handleEdit (params){
      console.log(params)
       let changdata = {}
      if(params.column.key === "t_name"){
        changdata = {
            t_name: params.value,
            t_id:params.row.t_id
        }
      }else if(params.column.key === "t_jobtitle"){
        changdata = {
            t_jobtitle: params.value,
            t_id:params.row.t_id
        }
      }else if (params.column.key === "t_department"){
            changdata = {
            t_department: params.value,
            t_id:params.row.t_id
        }
      } 
        UpdateUser(changdata).then(res =>{
          if(res.data === 1){
            this.$Message.success('修改成功')
          }else{
            this.$Message.error('修改失败')
          }
        }) 
        console.log(changdata)
    },
    handleDelete (params) {
     let delete_id = {
          t_id:params.row.t_id
      }
      console.log(delete_id)
      deleteUser(delete_id).then(res => {
          if (res.data === 1){
            this.$Message.success('删除成功')
            this.showdata=this.tableData.slice(0,this.pageSize)
          }else{
            this.$Message.error('删除失败')
          }
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  created () {
    getUserInfoData().then(res => {
      this.tableData = res.data
      this.dataCount = this.tableData.length
      if(this.dataCount < this.pageSize ){
        this.showdata=this.tableData
      }else{
        this.showdata=this.tableData.slice(0,this.pageSize)
      }
    })
  }
  
  
}
</script>

<style>

</style>
