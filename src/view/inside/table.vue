<template>
  <div>
       <Table :columns="columns" :data="showdata" height="450" >
    <template slot-scope="{ row, index }" slot="gzl_name">
      <Input type="text" v-model="editName" v-if="editIndex === index" readonly />
      <span v-else>{{ row.gzl_name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gzl_bumen">
      <Input type="text" v-model="editBumen" v-if="editIndex === index"  />
      <span v-else>{{ row.gzl_bumen }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gzl_rated">
      <Input type="text" v-model="editRated" v-if="editIndex === index" />
      <span v-else>{{ row.gzl_rated }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gzl_dlxs1">
      <Input type="text" v-model="editDlxs1" v-if="editIndex === index" />
      <span v-else>{{ row.gzl_dlxs1 }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gzl_dlxs2">
      <Input type="text" v-model="editDlxs2" v-if="editIndex === index" />
      <span v-else>{{ row.gzl_dlxs2 }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="gzl_zhichen">
      <Input type="text" v-model="editZhichen" v-if="editIndex === index" />
      <span v-else>{{ row.gzl_zhichen }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="t_id">
      <Input type="text" v-model="editId" v-if="editIndex === index" />
      <span v-else>{{ row.t_id }}</span>
    </template>

    <template slot-scope="{ row }" slot="dabiao" >
      <span  v-if="status(row) > 0"> <Button type="success">{{status(row)}}</Button></span>
      <span  v-else-if="status(row) == 0"> <Button type="warning">{{status(row)}}</Button></span>
      <span v-else> <Button type="error">{{status(row)}}</Button> </span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button size="small" @click="handleEdit(row, index)"  type="info" ghost>修改</Button>
        <!-- <Button @click="handleAdd" type="success" ghost>添加</Button> -->
        <Poptip
        placement="left"
        confirm
        title="确认删除改记录？"
        @on-ok="handleDelete(row, index)"
        @on-cancel="cancel(1)">
        <Button size="small" type="error" ghost>删除</Button>
        </Poptip>
      </div>
    </template>
  </Table>
  <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
</div>  
 
  
</template> 
<script>

import { getData,Update,Delete} from '@/api/IN_data'

export default {
    data () {
        
      return {
        showdata:[],
        pageSize:10,
        dataCount: 0,
        tableData: [],
        search:'',
        columns: [
          {
            title: '姓名',
            slot: 'gzl_name'
          },
          {
            title: '工号',
            slot: 't_id'
          },
          {
            title: '职称',
            slot: 'gzl_zhichen'
          },
          {
            title: '部门',
            slot: 'gzl_bumen'
          },
          {
            title:'额定工作量',
            slot:'gzl_rated'
          },
          {
            title:'17-18第一学期当量学时',
            slot:'gzl_dlxs1'
          },
          {
            title:'18-19第二学期当量学时',
            slot:'gzl_dlxs2'
          },
          {
            title:'达标状态',
            slot:'dabiao'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        editBumen:'',
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editId: '',  // 第二列输入框
        editZhichen: '',  // 第三列输入框
        editDlxs2: '',  // 第四列输入框
        editDlxs1: '',
        editRated: '',
      }
    },
    props:['parms'],
    methods: {
    status(row){
      let tall_gzl = row.gzl_dlxs1+row.gzl_dlxs2
      let status_gzl = tall_gzl -row.gzl_rated 
      return  status_gzl.toFixed(2);
    },
    changepage(index){
        var _star = (index - 1)* this.pageSize
        var _end  = index * this.pageSize
        this.showdata = this.tableData.slice(_star,_end) 
    },
    cancel (val) {
        if (val === 1){
            this.$Message.info('你已取消删除');
        }else{
          this.$Message.info('你已取消添加');
        }
        
    },
    handleDelete (row,index) {
          let delete_id = {
            t_id:row.gzl_name
        }
          //console.log(delete_id)
          Delete(delete_id).then(res => {
            if (res.data === 1){
                this.$Message.success('删除成功')
            }else{
                this.$Message.error('删除失败')
            }
        })
      },
      handleEdit (row, index) {
        this.editBumen=row.gzl_bumen;
        this.editDlxs1 = row.gzl_dlxs1;
        this.editDlxs2 = row.gzl_dlxs2;
        this.editName = row.gzl_name;
        this.editId =    row.t_id;
        this.editZhichen = row.gzl_zhichen;
        this.editRated = row.gzl_rated;
        this.editIndex = index;
      },  
      handleSave (index) {
        let changedata = {
          t_id: this.editId,
          gzl_name: this.editName,
          gzl_zhichen: this.editZhichen,
          gzl_rated: this.editRated,
          gzl_bumen:this.editBumen,
          gzl_dlxs1:this.editDlxs1,
          gzl_dlxs2:this.editDlxs2
        };
        Update(changedata).then(res => {
          if (res.data === 1 ){
            this.$Message.success("修改成功")
            // 刷新页面
            // 接口修改成功再 将页面的数据变动 if
        this.showdata[index].gzl_name = this.editName;
        this.showdata[index].gzl_bumen = this.editBumen;
        this.showdata[index].gzl_zhichen = this.editZhichen;
        this.showdata[index].gzl_dlxs1 = this.editDlxs1;
        this.showdata[index].gzl_dlxs2 = this.editDlxs2;
        this.showdata[index].gzl_rated = this.editRated;
        this.showdata[index].t_id = this.editId;
        this.editIndex = -1;
          }else{
            this.$Message.error("修改失败")
          }
        })
      }
  
    },
    created () {
    let xueyuan = {
      gzl_bumen:this.parms
    }
    getData(xueyuan).then(res => {
      this.tableData = res.data
      // console.log(res.data)
      this.dataCount = this.tableData.length
      if(this.dataCount < this.pageSize ){
        this.showdata=this.tableData
      }else{
        this.showdata=this.tableData.slice(0,this.pageSize)
      }
    }).catch(err => {
  console.log(err)
})
  }
  }
</script>