<template>
    <Tabs type="card">
        <TabPane label="2018年-2019年不同部门工作量情况">
          <example style="height: 310px;" text=""/>
        </TabPane>
         <TabPane label="同年份不同部门工作量情况">
          
        </TabPane>
         <TabPane label="总工作量不同部门工作量情况">
        </TabPane>
    </Tabs>
</template>
<script>
import Example from './example.vue'
    export default {
      components:{
         Example
      },
      methods:{
         
      } ,
      data() {
        return {
            bumen:['信工','医学院','经管','艺术设计','机电']
        }
      } 
    }
</script>
