<template>
  <div>
    <Card>
    <tables  editable searchable search-place="top" v-model="showdata" :columns="columns" @on-delete="handleDelete"  />
    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getXWTableData } from '@/api/data'
export default {
  name: 'tables_pages',
  components: {
    Tables
  },
  data () {
    return {
      showdata:[],
      pageSize:10,
      dataCount: 0,
      columns: [
        { title:'姓名', key:'xw_name',sortable:true},
        { title: '单位', key: 'xw_danwei', sortable: true },
        { title: '生份证号', key: 'xw_idNumber' ,sortable:true},
        { title:'银行卡号', key: 'xw_cardNumber', sortable:true},
        { title:'开户名称', key: 'xw_cardName', sortable:true},
        { title:'职称', key: 'xw_zc', sortable:true},
        { title:'类别', key: 'xw_leibie', sortable:true},
        { title:'津贴', key: 'xw_jintie', sortable:true},
        { title:'课时', key: 'xw_keshi', sortable:true},
        { title:'金额', key: 'xw_jine', sortable:true},
        {
          title: '操作',
          key: 'handle',
          options: ['delete','add'],
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
    handleDelete (params) {
      //console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getXWTableData().then(res => {
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
