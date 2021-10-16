import CommonConstants from "./CommonConstants"

const ChartUtils = (chartdata) => {

    switch (chartdata.chartType) {
        case CommonConstants.PIE_CHART:
            return {
                chart: {
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                },
                title: {
                    text: 'Users By Status'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                colors: ["green", "blue", "orange", "#ee609c"],
                series: [{
                    name: 'Users',
                    colorByPoint: true,
                    data: chartdata && chartdata.data,
                    color: {
                        radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
                        stops: [
                            [0, '#003399'],
                            [1, '#3366AA']
                        ]
                    }
                }]
            }
        case CommonConstants.SEMI_CIRCLE:
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,

                },
                title: {
                    text: 'Users By Role',
                    y: 10
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '100%'
                    }
                },
                colors: ["green", "blue", "orange", "#ee609c"],
                series: [{
                    type: 'pie',
                    name: 'Role',
                    innerSize: '50%',
                    data: chartdata && chartdata.data,
                }]
            }
        case CommonConstants.BAR_CAHRT:
            return {
                chart: {
                    type: 'column',
                    immutable: true
                },
                title: {
                    text: chartdata && chartdata.title
                },
                //colors: ["#001177"],
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    gridLineWidth: 0,
                    yAxis: 1,
                    title: {
                        text: chartdata.yaxistitle
                    }

                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
                series: [
                    {
                        name: chartdata.xaxistitle,
                        colorByPoint: true,
                        data: chartdata && chartdata.seriesData,
                    }
                ],
                drilldown: {
                    series: chartdata && chartdata.drilldowndata
                }
            }
        case CommonConstants.VARIABLE_RADIUS_PIE:
            return {
                chart: {
                    type: 'variablepie',
                    immutable: true
                },
                title: {
                    text: 'Countries compared by population density and total area.'
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                        'Area (square km): <b>{point.y}</b><br/>' +
                        'Population density (people per square km): <b>{point.z}</b><br/>'
                },
                series: [{
                    minPointSize: 10,
                    innerSize: '20%',
                    zMin: 0,
                    name: 'countries',
                    data: [{
                        name: 'Spain',
                        y: 505370,
                        z: 92.9
                    }]
                }]
            }

        case CommonConstants.SPLINE:
            return {
                chart: {
                    type: 'spline',
                    immutable: true
                },
                title: {
                    text: chartdata && chartdata.title
                },
                yAxis: [
                    {
                      gridLineWidth: 0,
                      yAxis: 1,
                      title: {
                        color: ["#112233"],
                        text: chartdata && chartdata.yaxistitle,
                      },
                    }
                  ],
                xAxis: {
                    categories:  chartdata && chartdata.xaxis,
                    
                  },
                colors: ["#001177"],
                series: [{
                    name: chartdata && chartdata.yaxistitle,
                    data: chartdata && chartdata.seriesData,
                }]
            }
        default:
            return {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'column'
                },
                title: {
                    text: 'Users By Status'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                colors: [ "#e3a210", "#d610e3"],
                series: [{
                    name: 'Users',
                    colorByPoint: true,
                    data: chartdata && chartdata.seriesData
                }]
            }
    }
}

export default ChartUtils;