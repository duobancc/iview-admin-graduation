<template>
    <Tabs type="card">
        <TabPane :label="bumen[0]">
          <TB :parms="bumen[0]" ></TB>
        </TabPane>
        <TabPane :label="bumen[1]"> 
          <TB :parms="bumen[1]" ></TB>
        </TabPane>
        <TabPane :label="bumen[2]">
          <TB :parms="bumen[2]" ></TB>
          </TabPane>
        <TabPane :label="bumen[3]"> 
           <TB :parms="bumen[3]" ></TB>
           </TabPane>
        <TabPane :label="bumen[4]"> 
            <TB :parms="bumen[4]"></TB>
        </TabPane>
    </Tabs>
</template>
<script>
import TB from '@/view/inside/table.vue'
    export default {
      components:{
        TB  
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
