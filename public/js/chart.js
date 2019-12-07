// var data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];



function chartxyz(data, title){
    var numItems = data.length;
    Highcharts.chart('chartabc', {
        title: {
            text: title
        },
        credits: {
            enabled: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        xAxis: [{
            title: {
                text: 'Data'
            },
            alignTicks: false
        }, {
            title: {
                text: ''
            },
            alignTicks: false,
            opposite: true
        }],
    
        yAxis: [{
            title: {
                text: null
            }
        }, {
            title: {
                text: null
            },
            opposite: true
        }],
    
        series: [{
            name: title,
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            zIndex: -1,
            color: '#1ABB9C'
        }, {
            name: 'User',
            type: 'scatter',
            data: data,
            id: 's1',
            marker: {
                radius: 1.5
            },
            color:'#000000'
        }]
    });
}

function chartabc(dataR, dataP){
    console.log(dataR)
    console.log(dataP)
    Highcharts.chart('chartxyz', {
        chart: {
          type: 'line'
        },
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        credits: {
            enabled: false
        },
        title: {
          text: 'Test Data'
        },
        yAxis: {
          title: {
            text: null
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: false
            },
            enableMouseTracking: false
          }
        },
        series: [{
          name: 'Real',
          data: dataR
        }, {
          name: 'Predict',
          data: dataP
        }]
      });
}