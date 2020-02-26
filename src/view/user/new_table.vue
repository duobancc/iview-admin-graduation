<template>
  <div>
       <Table :columns="columns" :data="showdata" >
    <template slot-scope="{ row, index }" slot="t_name">
      <Input type="text" v-model="editName" v-if="editIndex === index" />
      <span v-else>{{ row.t_name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="t_id">
      <Input type="text" v-model="editId" v-if="editIndex === index" readonly />
      <span v-else>{{ row.t_id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="t_jobtitle">
      <Input type="text" v-model="editJobtitle" v-if="editIndex === index" />
      <span v-else>{{ row.t_jobtitle }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="dep_name">
      <!-- <Input type="text" v-model="editDepName" v-if="editIndex === index" /> -->
      <Select v-model="editDepName" v-if="editIndex === index">
                <Option value=10>信息工程学院</Option>
                <Option value=20>经济管理学院</Option>
                <Option value=30>医学院</Option>
                <Option value=40>艺术设计学院</Option>
                <Option value=50>机电工程学院</Option>
                <Option value=60>文化旅游学院</Option>
                <Option value=70>公共基础部</Option>
                <Option value=80>社会科学部</Option>
      </Select>
      <span v-else>{{ row.dep_name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)"  type="info" ghost>修改</Button>
        <Button @click="handleAdd" type="success" ghost>添加</Button>
        
        <Poptip
        placement="left"
        confirm
        title="确认删除改记录？"
        @on-ok="handleDelete(row, index)"
        @on-cancel="cancel(1)">
        <Button type="error" ghost>删除</Button>
        </Poptip>
        <Modal
        draggable 
        v-model="modal1"
        title="添加新教师"
        @on-ok="handleSubmit(formInline)"
        @on-cancel="cancel">
        <Form ref="formInline" :model="formInline">
        <FormItem prop="t_name" label="教师名">
            <Input type="text" v-model="formInline.t_name">
            </Input>
        </FormItem>
        <FormItem prop="t_jobtitle" label="教师职称">
            <Input type="text" v-model="formInline.t_jobtitle">
            </Input> 
        </FormItem>
         <FormItem label="部门" prpo="t_depno">
            <Select v-model="formInline.t_depno">
                <Option value=10>信息工程学院</Option>
                <Option value=20>经济管理学院</Option>
                <Option value=30>医学院</Option>
                <Option value=40>艺术设计学院</Option>
                <Option value=50>机电工程学院</Option>
                <Option value=60>文化旅游学院</Option>
                <Option value=70>公共基础部</Option>
                <Option value=80>社会科学部</Option>
            </Select>
        </FormItem>
    </Form>
    </Modal>
      </div>
    </template>
  </Table>
  <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
</div>  
 
  
</template>
<script>
import { getUserInfoData,deleteUser,UpdateUser,AddNewTeacher } from '@/api/data'

  export default {
    data () {
        
      return {
        showdata:[],
        pageSize:10,
        dataCount: 0,
        tableData: [],
        search:'',
        modal1:false,
        
        formInline: {
          // t_id:'',
          t_name: '',
          t_jobtitle: '',
          t_depno:''
      },
        columns: [
          {
            title: '姓名',
            slot: 't_name'
          },
          {
            title: '工号',
            slot: 't_id'
          },
          {
            title: '职称',
            slot: 't_jobtitle'
          },
          {
            title: '部门',
            slot: 'dep_name'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editId: '',  // 第二列输入框
        editJobtitle: '',  // 第三列输入框
        editDepName: '',  // 第四列输入框
      }
    },
    methods: {
    changepage(index){
        var _star = (index - 1)* this.pageSize
        var _end  = index * this.pageSize
        this.showdata = this.tableData.slice(_star,_end) 
    },

    handleAdd(){
        this.modal1 = true
    },
    cancel (val) {
        if (val === 1){
            this.$Message.info('你已取消删除');
        }else{
          this.$Message.info('你已取消添加');
        }
        
    },
    handleSubmit(fromdata){
       AddNewTeacher(fromdata).then(res => {
              if (res.data === 1){
                this.$Message.success('添加成功')
              }else{
                this.$Message.error('添加失败')
              }
       })
    },
      handleDelete (row,index) {
          let delete_id = {
            t_id:row.t_id
        }
          console.log(delete_id)
          deleteUser(delete_id).then(res => {
            if (res.data === 1){
                this.$Message.success('删除成功')
            }else{
                this.$Message.error('删除失败')
            }
        })
      },
      handleEdit (row, index) {
        this.editName = row.t_name;
        this.editId = row.t_id;
        this.editJobtitle = row.t_jobtitle;
        this.editDepName = row.dep_name;
        this.editIndex = index;
      },  
      handleSave (index) {
        let changedata = {
          t_id: this.editId,
          t_name: this.editName,
          t_jobtitle: this.editJobtitle,
          t_depno:this.editDepName
        };
        UpdateUser(changedata).then(res => {
          if (res.data === 1 ){
            this.$Message.success("添加成功")
            // 刷新页面
            // 接口修改成功再 将页面的数据变动 if
        this.showdata[index].t_name = this.editName;
        this.showdata[index].t_id = this.editId;
        this.showdata[index].t_jobtitle = this.editJobtitle;
        this.showdata[index].dep_name = this.editDepName;
        this.editIndex = -1;
          }else{
            this.$Message.error("添加失败")
          }
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