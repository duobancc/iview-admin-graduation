

<template>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                 <List header="当量学时总计"  border>
                           <ListItem>信息工程学院：14173.978 </ListItem>
                           <ListItem>医学院：22242.38</ListItem>
                           <ListItem>文化旅游学院： 9247.18</ListItem>
						   <ListItem>艺术设计学院：7783.79</ListItem>
						   <ListItem>经济管理学院：11315.42</ListItem>
						   <ListItem>机电工程学院： 15823.28</ListItem>
						   <ListItem>公共基础部：10139.18</ListItem>
						   <ListItem>社会科学部：3747.345</ListItem>
						
                       </List>
            </div>
            <div slot="right" class="demo-split-pane">
               <div class="chart-container">
                 <chart height="75%" width="75%" />
               </div>
            </div>
        </Split>
    </div>
</template>

<script>
	import Chart from '@/components/charts/Piexyk.vue'
	
    export default {
		name: 'LineChart',
		components: { Chart },
        data () {
            return {
                split1: 0.5
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 1000px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
	.chart-container{
	  position: relative;
	  width: 100%;
	  height: calc(100vh - 84px);
	}
</style>

