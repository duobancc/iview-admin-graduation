<template>
  <div>
    <Card>
    <tables ref="tabless" :alldata="tableData" @on-save-edit="handleEdit" editable searchable search-place="top" v-model="showdata" :columns="columns" @on-delete="handleDelete"  />
    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUser,deleteUser,postUpdateUser } from '@/api/data'
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
        { title:'工号', key:'t_id',sortable:true ,editable:true },
        { title: '姓名', key: 't_name', sortable: true,editable:true },
        { title: '职称', key: 't_jobtitle' ,sortable:true,editable:true},
        { title:'部门', key: 't_department', sortable:true,editable:true},
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          width: 150,
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
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.doEdit(params.row)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.doDelete(params.row)
                    }
                  }
                }, '删除')
              ])
            }
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
        postUpdateUser(changdata).then(res =>{
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
    deleteUser(delete_id).then(res => {
          if (res.data === 1){
            this.$Message.success('删除成功')
          }else{
            this.$Message.error('删除失败')
          }
      })
      console.log(delete_id)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    // https://www.jianshu.com/p/15e7a3eeff6b
    getUser().then(res => {
      this.tableData = res.data
      //console.log( res.data)
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
