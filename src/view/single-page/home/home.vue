<template>
  <div>
    <!-- <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row> -->
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="50" :lg="15" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="2019年当量学时总计"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="2013-2018绩效评分"/>
        </Card>
      </i-col>
    </Row>
    <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import {chartData} from '@/api/IN_data'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      pieData: [],
      temp:{name:'',value:''},
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      pieData: [
        { value: 10139.18, name: '公共基础部' },
        { value: 3747.345, name: '社会科学部' },
        { value: 14173.978, name: '信工' },
        { value: 22242.38, name: '医学院' },
        { value: 9247.18, name: '文旅学院'},
          { value: 11315.42, name: '经管'},
            { value: 7783.97, name: '艺术设计'},
              { value: 15823.28, name: '机电'}

      ],
      barData: {
        '2013-2014学年': 852.35,
        '2014-2015学年': 793.35,
        '2015-2016学年': 866.45,
        '2016-2017学年': 855.09,
        '2017-2018学年': 803.43
      }
    }
  },
  // mounted () {
  //   chartData().then(res => {
  //              let data = res.data;
  //              for (var i=0;i<data.length;i++)
  //                     { 
  //                       this.temp.name = data[i]['gzl_bumen']
  //                       this.temp.value = data[i]['ngzl'].toFixed(2)
  //                       this.pieData.push(this.temp)
  //                     }
  //          })
  // }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
