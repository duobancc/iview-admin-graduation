<template>
     <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="50" :lg="25" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="不同学院的校外总工作量比例"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="50" :lg="25" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="barData" text="不同学院的校外总工资支出情况"></chart-pie>
        </Card>
      </i-col>
    </Row>
</template>

<script>
import {ChartPie} from '_c/charts'
import {getPieData,getBarData} from '@/api/OUT_data'
export default {
    data(){
        return{
            pieData:[],
            barData:[]
        }
    },
    components:{
        ChartPie
    },
    methods:{
    },
    created(){
         
    },
    mounted(){
        getBarData().then(res => {
            console.log(res.data);
            this.barData = res.data;
        }).catch(err =>{
            console.log(err)
        });
        getPieData().then(res => {
          console.log(res.data);
            this.pieData = res.data;
        }).catch(err => {
            console.log(err)
            })
    },
}
</script>