<template>
       <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
</template>
<script>
        export default {
            
            props: {
            data1: Array,
            data2: Array,
            text: String,
            subtext: String
             },
             data() {
                    return { 
                   }
              },
             //钩子函数
             mounted(){
                this.draw();
             },
             methods: {
                   draw(){
                       // 初始化echarts实例
                        let myChart = this.$echarts.init(document.getElementById('myChart'))
                       // 绘制图表
                       var option = {

    title: {
        left:'50%',
        text: this.text,
        subtext: this.subtext
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