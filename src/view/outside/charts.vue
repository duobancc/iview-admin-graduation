<template>
       <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
</template>
<script>
import {chartData} from '@/api/IN_data'
        export default {
             data() {
                    return {
                      S1data:[],
                      S2data:[],
                      Xdata:[],
                      Seriesdata:[]
                   }
              },
             //钩子函数
             mounted(){
                  chartData().then(res => {
                  let data  = res.data
                  for (var i=0;i<data.length;i++)
                      { 
                         this.Xdata.push(data[i]['gzl_bumen'])
                         this.S1data.push(data[i]['d1xq'].toFixed(2))
                         this.S2data.push(data[i]['d2xq'].toFixed(2))
                      }
                      this.draw();
                })
             },
             methods: {
                   draw(){
                       // 初始化echarts实例
                        let myChart = this.$echarts.init(document.getElementById('myChart'))
                       // 绘制图表
                       var option = {

    title: {
        left:'30%',
        text: '2018年各部门工作量情况',
        subtext: '衢州职业技术学院'
    },
    tooltip: {
        trigger: 'axis'
    },
    // 左上角图例
    legend: {
        data: ['第一学期','第二学期'],//与series的name对应
       left: '70%',//图例的离左边位置，可以用像素，可以用百分比，也可以用center，right等
       top:  '5%' ,//图例离顶部的位置
       itemWidth: 10,//图例图标的宽
       itemHeight: 10,//图例图标的高
       textStyle: {
             color: '#878787',//文字的具体的颜色
        }
    },

// 右上角切换图形处
    toolbox: {
       show : true,//显示
       feature : {
              dataView: {show: true, readOnly: false}, //数据视图
              magicType : {show: true, type: ['line', 'bar']},
              restore: {show: true}, // 还原
              saveAsImage: {show: true} // 保存图片
       },//柱形图和折线图切换
       right: '1%',//离右边的距离
       top:'10%'
  },
    calculable: true,
//x轴
xAxis: {
        type: 'category',
        data: this.Xdata,//x轴的数据
        splitLine: {show: false},//去除网格分割线
        // splitArea: {show: true},//保留网格区域
        axisLine: {//坐标线
               lineStyle: {
                     type: 'solid',
                     color: '#d8d8d8',//轴线的颜色
                     width:'3'//坐标线的宽度
               }
        },
        axisTick: {//刻度
              show: false//不显示刻度线
        },
        axisLabel: {
              textStyle: {
                    color: '#878787',//坐标值的具体的颜色
              }
        },
        splitLine: {
              show: false//去掉分割线
        },
 },
 // Y轴
    yAxis: {
      name: '单位：小时',//轴的名字，默认位置在y轴上方显示,也可不写
      max: 15000,//最大刻度
      type: 'value',
      axisLine: {//线
              show: false
      },
      axisTick: {//刻度
              show: false
      },
      axisLabel: {
              textStyle: {
                     color: '#878787',//坐标值得具体的颜色
              }
      },
      minInterval: 5,//标值的最小间隔
      splitLine: {
              lineStyle: {
                      color: ['#f6f6f6'],//分割线的颜色
              }
      }
},
// 柱状图形修改
series : [
                    {
                        name:'第一学期',
                        type:'bar',//柱状图
                        barWidth: 20,//设置柱子宽度，单位为px
                        data: this.S1data,//数据
                        itemStyle: {
                            normal: {
                                color: '#00abf7',//设置柱子颜色
                                label: {
                                    show: true,//柱子上显示值
                                    position: 'top',//值在柱子上方显示
                                    textStyle: {
                                        color: '#00abf7',//值的颜色
                                        fontSize:16,
                                    }
                                }
                            }
                        },
                    },
                    {
                        name:'第二学期',
                        type:'bar',
                        barWidth: 20,
                        data: this.S2data,//数据
                        itemStyle: {
                            normal: {
                                color: '#ff4f76',//设置柱子颜色
                                label: {
                                    show: true,//柱子上显示值
                                    position: 'top',//值在柱子上方显示
                                    textStyle: {
                                        color: '#ff4f76',//值的颜色
                                        fontSize:16,
                                    }
                                }
                            }
                        },
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