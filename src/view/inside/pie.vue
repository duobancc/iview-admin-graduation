<template>
       <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
</template>
<script>
import {pieData} from '@/api/IN_data'
        export default {
             data() {
                    return {
                       data1:[],
                       data2: [],
                   }
              },
             //钩子函数
             mounted(){
                  pieData().then(res => {

                    let  data  = res.data
                    for (let i in data) {
                        this.data1.push(data[i]['name'])
                        this.data2.push(data[i])
                    }
                    this.draw();
                }).catch(err => {
  console.log(err)
})
             },
             methods: {
                   draw(){
                       // 初始化echarts实例
                        let myChart = this.$echarts.init(document.getElementById('myChart'))
                       // 绘制图表
                       var option = {

    title: {
        left:'50%',
        text: '2018年各部门工作量情况',
        subtext: '衢州职业技术学院'
    },
    tooltip: {
         trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    // 左上角图例
    legend: {
       orient: 'vertical',
        left: '10%',
        data:this.data1
    },
// 柱状图形修改
 series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data:this.data2,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
                       }
                       //防止越界，重绘canvas
                       window.onresize = myChart.resize;
                       myChart.setOption(option);//设置option
                   }
              }
         }
</script>