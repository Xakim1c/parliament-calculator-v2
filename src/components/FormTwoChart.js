import React, {Component} from 'react';
import ReactEcharts from "echarts-for-react";
import 'echarts-gl';
import EChartsStat from 'echarts-stat'

import * as d3 from 'd3'

class FormTwoChart extends Component {
    constructor(props, context) {
        super(props, context);

        console.log('FORM TWO')   
        console.log(props)

        this.voteResults = []
        this.bins = []

        this.state = {graphOption : {
            title : {
                text: '',
                subtext: ' '
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {// Axis indicator, axis trigger is valid
                  type : 'line'// default is a straight line, optional: 'line' | 'shadow'
                }
              },
              legend: {
                data:['volume']
              },
              toolbox: {
                show : true,
                feature : {
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                }
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  data : [],
                  minInterval: -50
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                  {
                      name:'volume',
                      type:'bar',
                      data:[],
                      barWidth: '100%',
                      color : "#2874A6"

                  }
              ]
            }
        }
    }

    loadElectionsResultsData = () => {
        d3.csv(require('../data/PARTIES_RESULTS_REACT.csv')).then(data => {
            data.forEach(function(d) {
                d.form2_percent = parseFloat(d.form2_percent)
                d.total = parseFloat(d.total)
                //d.uic_number= parseFloat(d.uic_number)
                d['«АТА МЕКЕН» саясий социалисттик партиясы'] = parseFloat(d['«АТА МЕКЕН» саясий социалисттик партиясы'])
                d['«АФГАНИСТАН СОГУШУНУН АРДАГЕРЛЕРИ ЖАНА УШУЛ СЫЯКТУУ КАГЫШУУЛАРГА КАТЫШКАНДАРДЫН САЯСИЙ ПАРТИЯСЫ»'] = parseFloat(d['«АФГАНИСТАН СОГУШУНУН АРДАГЕРЛЕРИ ЖАНА УШУЛ СЫЯКТУУ КАГЫШУУЛАРГА КАТЫШКАНДАРДЫН САЯСИЙ ПАРТИЯСЫ»'])
                d['«БИР БОЛ»'] = parseFloat(d['«БИР БОЛ»']) 
                d['«БИРИМДИК»'] = parseFloat(d['«БИРИМДИК»'])
                d['«БҮТҮН КЫРГЫЗСТАН» саясий партиясы'] = parseFloat(d['«БҮТҮН КЫРГЫЗСТАН» саясий партиясы'])
                d['«ЗАМАНДАШ»'] = parseFloat(d['«ЗАМАНДАШ»'])
                d['«КЫРГЫЗСТАН»'] = parseFloat(d['«КЫРГЫЗСТАН»'])
                d['«МЕКЕН ЫНТЫМАГЫ»'] = parseFloat(d['«МЕКЕН ЫНТЫМАГЫ»'])
                d['«МЕКЕНИМ КЫРГЫЗСТАН»'] = parseFloat(d['«МЕКЕНИМ КЫРГЫЗСТАН»'])
                d['«МЕКЕНЧИЛ»'] = parseFloat(d['«МЕКЕНЧИЛ»'])
                d['«ОРДО»'] = parseFloat(d['«ОРДО»'])
                d['«РЕФОРМА» партиясы'] = parseFloat(d['«РЕФОРМА» партиясы'])
                d['«ЧОҢ КАЗАТ»'] = parseFloat(d['«ЧОҢ КАЗАТ»'])
                d['«ЫЙМАН НУРУ»'] = parseFloat(d['«ЫЙМАН НУРУ»'])
                d['БААРЫНА КАРШЫ'] =  parseFloat(d['БААРЫНА КАРШЫ'])
                d['РЕСПУБЛИКА'] = parseFloat(d['РЕСПУБЛИКА'])
                d['СОЦИАЛ-ДЕМОКРАТТАР'] = parseFloat(d['СОЦИАЛ-ДЕМОКРАТТАР'])
                });

            return data                 
            
            }).then((resultsData) => {

            if(typeof(resultsData) !== undefined){
                console.log("MOUNT")
                this.voteResults = resultsData
                console.log(this.voteResults);      
                console.log(resultsData);   
                
                let formTwoPercents = []
                resultsData.forEach(result => {
                    formTwoPercents.push(result.form2_percent)
                })

                //this.bins = EChartsStat.histogram(formTwoPercents).customData.slice(1, 12);

                 // set the parameters for the histogram
                 console.log('D#')
 
                 let histogram = d3.histogram().thresholds([0,5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115]);
                 this.bins = histogram(formTwoPercents);
                
                this.updateGraph()
            }                  
            });           
            
    }

    getCutoffByIndex(index){
        return this.bins[index].x1
    }

    updateGraph = (markPointIndex) => {

        console.log('UPDATE')
        console.log(this.bins)

        let markPointX = 0
        let markPointY = 0
        let markPointLabel = ''
        let drawMarkPoint = false

        if (typeof(markPointIndex) !== "undefined"){
            
            markPointX = this.bins[markPointIndex].x0.toString() + '-' + this.bins[markPointIndex].x1.toFixed(0).toString() + '%'
            markPointY = this.bins[markPointIndex].length + 10
            markPointLabel = '< ' + this.bins[markPointIndex].x1.toFixed(0).toString() + '%'

            drawMarkPoint = true
        }

        let yData = []
        this.bins.forEach(binData => {
            yData.push(binData.length)
        })

        let xData = []
        this.bins.forEach(binData => {
            xData.push(binData.x0.toString() + '-' + binData.x1.toFixed(0).toString() + '%')
        })

        let graphOption = {
            title : {
                text: '',
                subtext: ' '
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {// Axis indicator, axis trigger is valid
                  type : 'line'// default is a straight line, optional: 'line' | 'shadow'
                }
              },
              legend: {
                data:['Количество УИК']
              },
              toolbox: {
                show : true,
                feature : {
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar']},
                }
              },
              calculable : true,
              xAxis : [
                {
                  type : 'category',
                  data : xData
                }
              ],
              yAxis : [
                {
                  type : 'value'
                }
              ],
              series : [
                  {
                    name:'Количество УИК',
                    type:'bar',
                    data:yData,
                    barWidth: '100%',
                    color : "#2874A6",
                    markPoint : {                            
                            symbol: 'pin',
                            symbolSize: 75,
                            itemStyle: {
                                opacity: drawMarkPoint,
                                color: '#ff4000'
                            },
                            label: {
                                show: true,
                                formatter: '{b}'

                            },
                            data : [{
                                name: markPointLabel,
                                coord: [markPointX, this.bins[0].length], // The number 5 represents xAxis.data[5], that is, '33'.
                                // coord: ['5', 33.4] // The string '5' represents the '5' in xAxis.data.
                                }
                            ]
                        },
                    markArea: {
                        "silent": true,
                        "data": [
                            [
                                {
                                    //name: 'УИКи в которых форма 2 меньше',
                                    coord: ['0-5%', 0]
                                },
                                {
                                    coord: [markPointX, this.bins[0].length]
                                }
                            ]
                        ]
                    }
                    //   markPoint : {
                    //       data : [
                    //           {type : 'max', name: 'maximum'},
                    //           {type : 'min', name: 'minimum'}
                    //       ]
                    //   }
                    //   markLine : {
                    //       data : [
                    //           {type : 'average', name: 'average value'}
                    //       ]
                    //   }
                  }
              ]
            }

            this.setState({graphOption: graphOption})
    }

    componentDidMount() {

        this.echartsInstance = this.echartsReactRef.getEchartsInstance();
        this.zr = this.echartsInstance.getZr();

        this.zr.on('click', this.onChartClick);     

        this.loadElectionsResultsData()               
    }

    onChartClick = (...rest) => {
        //console.log('App:onClickChart', rest);
        console.log('CLICK')
        console.log(this.voteResults)
        console.log(rest)

        console.log('PERCENT')
        
        console.log(this.bins)

        if (typeof(rest[0].target) !== 'undefined'){
            let cutoff = this.getCutoffByIndex(rest[0].target.dataIndex)        

            //Расчеты
            let filteredResults =  this.voteResults.filter(function(result) {
                return result.form2_percent < cutoff;
            });

            let resultsSummary = {}

            filteredResults.forEach(result => {
                Object.keys(result).map((key) => {

                    if (resultsSummary.hasOwnProperty(key)){
                        resultsSummary[key] += result[key]
                    }else{
                        resultsSummary[key] = result[key]
                    }            
                })  

            })         

            // console.log('TEST FILTER')
            // console.log(this.voteResults)
            // console.log(filteredResults)
            console.log('RESULT SUMMARY')
            console.log(resultsSummary)

            this.props.clickOnBar(resultsSummary)

            //Потом покрасить
            this.updateGraph(rest[0].target.dataIndex) 
        }

        
    };

    render() {
        
        let isAllowedRender = true
        if(this.state.graphOption === undefined) {
          isAllowedRender = false
        }   

        return (    
            
            <div>
            {isAllowedRender
                ? <ReactEcharts
                    //style={{height: '100vh', width: '100vw'}}
                    ref={(e) => {this.echartsReactRef = e}}
                    option={this.state.graphOption}
                />
                : <div></div>
              }
            </div>                    
        );
    }
}

export default FormTwoChart;