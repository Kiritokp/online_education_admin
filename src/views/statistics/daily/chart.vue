<template>
  <div class="app-container">
    <!--表单-->
    <el-form :inline="true" class="demo-form-inline">

      <!-- <el-form-item>
        <el-select v-model="searchObj.type" clearable placeholder="请选择">
          <el-option label="全部数据" value="All"/>
          <el-option label="学员登录数统计" value="login_num"/>
          <el-option label="学员注册数统计" value="register_num"/>
          <el-option label="课程播放数统计" value="video_view_num"/>
          <el-option label="每日课程数统计" value="course_num"/>
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd" />
      </el-form-item>     
    <el-button 
        :disabled="btnDisabled"
        type="primary"
        icon="el-icon-search"
        @click="showChart()">查询</el-button>
    </el-form>

    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import daily from '@/api/edu/sta'

export default {
  data() {
    return {
      searchObj: {
        //type: '',
        begin: '',
        end: ''
      },
      btnDisabled: false,
      chart: null,
      title: '',
      xData: [],
      //yData: [],
      y1Data:[],
      y2Data:[],
      y3Data:[],
      y4Data:[],
    //   defalutStartTime:'',
    //   defalutEndTime:''
    }
  },
  methods: {
    //默认时间
    timeDefault(){
        //开始时间默认值
        var defalutStartTime='1949-10-01'
        //结束时间默认值
        var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var defalutEndTime = year + seperator1 + month + seperator1 + strDate;
        
        return{defalutStartTime,defalutEndTime}
    },
    showChart() {
            this.initChartDataAll()
            this.setChartAll()
        
        //this.statisticalCategory()
        // if(this.searchObj.type=='All'){
        //     this.initChartDataAll()
        //     this.setChartAll()
        //     console.log(this.searchObj.type)
        // }else{
        //     this.initChartData()
        //     this.setChart()
        //     console.log(123)
        //     console.log(this.searchObj.type)
        // }      
    },

    //当前统计类别
    // statisticalCategory(){
    //     switch (this.searchObj.type) {
    //     case 'register_num':
    //         this.title = '学员注册数统计'
    //         break
    //     case 'login_num':
    //         this.title = '学员登录数统计'
    //         break
    //     case 'video_view_num':
    //         this.title = '课程播放数统计'
    //         break
    //     case 'course_num':
    //         this.title = '每日课程数统计'
    //         break
    //     case 'All':
    //         this.title='全部数据'
    //     }
    // },

    // 准备图表数据
    initChartData() {
        daily.showChart(this.searchObj).then(response => {
            // 数据
            this.yData = response.data.dataList
            // 横轴时间
            this.xData = response.data.dateList
            this.setChart()
        })
    },
    // 设置图标参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: 'category',
          data: this.xData
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: 'value'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          // 系列中的数据内容数组
          data: this.yData,
          // 折线图
          type: 'line'
        }],
        title: {  //显示标题
            text: this.title
        },
        tooltip: { //x坐标轴触发提示
            trigger: 'axis'
        },
        dataZoom: [{ //区域缩放
            show: true,
            height: 30,
            xAxisIndex: [
                0
            ],
            bottom: 30,
            start: 10,
            end: 80,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                color: '#d3dee5'

            },
            textStyle: {
                color: '#fff'
            },
            borderColor: '#90979c'
            },
            {
            type: 'inside',
            show: true,
            height: 15,
            start: 1,
            end: 35
        }]
      }

      this.chart.setOption(option)
    },
    // 准备All图表数据
    initChartDataAll() {
        daily.showChart(this.searchObj).then(response => {
            // 横轴时间
            this.xData = response.data.dateList
            // 数据
            //注册人数
            this.y1Data = response.data.registerList
            //登录人数
            this.y2Data = response.data.loginList
            //每日播放视频数
            this.y3Data = response.data.videoList
            //每日新增课程数
            this.y4Data = response.data.courseList
            
            this.setChartAll()
        })
    },
    setChartAll(){
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      // console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
            title: {
                text: this.title
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['注册人数', '登录人数', '每日播放视频数', '每日新增课程数']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '注册人数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: this.y1Data
                },
                {
                    name: '登录人数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: this.y2Data
                },
                {
                    name: '每日播放视频数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: this.y3Data
                },
                {
                    name: '每日新增课程数',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: true,
                        position: 'top'
                    },
                    data: this.y4Data
                }
            ],
                dataZoom: [{ //区域缩放
                show: true,
                height: 30,
                xAxisIndex: [
                    0
                ],
                bottom: 30,
                start: 10,
                end: 80,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: '#d3dee5'

                },
                textStyle: {
                    color: '#fff'
                },
                borderColor: '#90979c'
                },
                {
                type: 'inside',
                show: true,
                height: 15,
                start: 1,
                end: 35
            }]           
        }

      this.chart.setOption(option)

    }
  }
}
</script>