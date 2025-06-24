country = 'IT';

function request(country) {
    $.ajax({
        type: 'GET',
        url: 'https://corona-api.com/countries/'+country,
        success: function (response) {
            data = response.data;
            name = data.name;
            code = data.code;
            today = data.today;
            tillNow = data.latest_data;
            timeline = data.timeline;
            last_update = data.updated_at;
            last_update = last_update.split('T');
            last_date = last_update[0];
            last_time = last_update[1].split('.')[0];
            // Today
            $('#today-deaths').text(today.deaths.toLocaleString());
            $('#today-confirmed').text(today.confirmed.toLocaleString());
            // Till now
            $('#total-deaths').text(tillNow.deaths.toLocaleString());
            $('#total-confirmed').text(tillNow.confirmed.toLocaleString());
            $('#total-recovered').text(tillNow.recovered.toLocaleString());
            $('#total-critical').text(tillNow.critical.toLocaleString());
            // Timeline
            time_dates = [];
            deaths = [];
            confirmed = [];
            recovered = [];

            new_confirmed = [];
            new_recovered = [];
            new_deaths = [];

            timeline.forEach(element => {
                time_dates.push(element.date);
                deaths.push(element.deaths);
                confirmed.push(element.confirmed);
                recovered.push(element.recovered);

                new_confirmed.push(element.new_confirmed);
                new_recovered.push(element.new_recovered);
                new_deaths.push(element.new_deaths);
            });
            time_dates.reverse();
            deaths.reverse();
            confirmed.reverse();
            recovered.reverse();
            
            new_confirmed.reverse();
            new_recovered.reverse();
            new_deaths.reverse();

            startValue = time_dates[0];
            endValue = time_dates[time_dates.length - 1];
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        }
                    }
                },
                legend: {
                    data: labels,
                    textStyle: {
                            color: '#fff'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataView: {},
                    },
                    iconStyle: {
                        color: '#fff',
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
                        axisLabel: {
                            color: '#fff'
                        },
                        boundaryGap: false,
                        data: time_dates
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#fff'
                        },
                        }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        startValue: startValue,
                        endValue: endValue,
                        filterMode: 'filter'
                    },
                ],  
                series: [
                    {
                        name: labels[0],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: 'red'
                        },
                        smooth: true,
                        data: deaths
                    },
                    {
                        name: labels[1],
                        type: 'line',
                        areaStyle: {},
                            emphasis: { 
                        focus: 'series'
                        },
                        itemStyle: {
                            color: '#debc4e'
                        },
                        smooth: true,
                        data: confirmed
                    },
                    {
                        name: labels[2],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#3dba61'
                        },
                        smooth: true,
                        data: recovered
                    }
                ]
            };
            // Set to first graph
            myChart.setOption(option);

            optionNew = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        }
                    }
                },
                legend: {
                    data: new_labels,
                    textStyle: {
                            color: '#fff'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataView: {},
                    },
                    iconStyle: {
                        color: '#fff',
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
                        axisLabel: {
                            color: '#fff'
                        },
                        boundaryGap: false,
                        data: time_dates
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#fff'
                        },
                        }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        startValue: startValue,
                        endValue: endValue,
                        filterMode: 'filter'
                    },
                ],  
                series: [
                    {
                        name: new_labels[0],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: 'red'
                        },
                        smooth: true,
                        data: new_deaths
                    },
                    {
                        name: new_labels[1],
                        type: 'line',
                        areaStyle: {},
                            emphasis: { 
                        focus: 'series'
                        },
                        itemStyle: {
                            color: '#debc4e'
                        },
                        smooth: true,
                        data: new_confirmed
                    },
                    {
                        name: new_labels[2],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#3dba61'
                        },
                        smooth: true,
                        data: new_recovered
                    }
                ]
            };
            // Set to second graph
            myChartNew.setOption(optionNew);
        }
    });
}

function requestWorld() {
    $.ajax({
        type: 'GET',
        url: 'https://corona-api.com/timeline',
        success: function (response) {
            data = response.data;
            mondial_time_dates = [];
            mondial_deaths = [];
            mondial_confirmed = [];
            mondial_recovered = [];

            mondial_new_confirmed = [];
            mondial_new_recovered = [];
            mondial_new_deaths = [];

            data.forEach(element => {
                mondial_time_dates.push(element.date);
                mondial_deaths.push(element.deaths);
                mondial_confirmed.push(element.confirmed);
                mondial_recovered.push(element.recovered);

                mondial_new_confirmed.push(element.new_confirmed);
                mondial_new_recovered.push(element.new_recovered);
                mondial_new_deaths.push(element.new_deaths);
            });
            mondial_time_dates.reverse();
            mondial_deaths.reverse();
            mondial_confirmed.reverse();
            mondial_recovered.reverse();
            
            mondial_new_confirmed.reverse();
            mondial_new_recovered.reverse();
            mondial_new_deaths.reverse();

            startValue = mondial_time_dates[0];
            endValue = mondial_time_dates[mondial_time_dates.length - 1];
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        }
                    }
                },
                legend: {
                    data: mondial_labels,
                    textStyle: {
                            color: '#fff'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataView: {},
                    },
                    iconStyle: {
                        color: '#fff',
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
                        axisLabel: {
                            color: '#fff'
                        },
                        boundaryGap: false,
                        data: mondial_time_dates
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#fff'
                        },
                        }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        startValue: startValue,
                        endValue: endValue,
                        filterMode: 'filter'
                    },
                ],  
                series: [
                    {
                        name: mondial_labels[0],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: 'red'
                        },
                        smooth: true,
                        data: mondial_deaths
                    },
                    {
                        name: mondial_labels[1],
                        type: 'line',
                        areaStyle: {},
                            emphasis: { 
                        focus: 'series'
                        },
                        itemStyle: {
                            color: '#debc4e'
                        },
                        smooth: true,
                        data: mondial_confirmed
                    },
                    {
                        name: mondial_labels[2],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#3dba61'
                        },
                        smooth: true,
                        data: mondial_recovered
                    }
                ]
            };
            // Set to first graph
            mondial.setOption(option);

            optionNew = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                        }
                    }
                },
                legend: {
                    data: new_mondial_labels,
                    textStyle: {
                            color: '#fff'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        dataView: {},
                    },
                    iconStyle: {
                        color: '#fff',
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
                        axisLabel: {
                            color: '#fff'
                        },
                        boundaryGap: false,
                        data: mondial_time_dates
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            color: '#fff'
                        },
                        }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        startValue: startValue,
                        endValue: endValue,
                        filterMode: 'filter'
                    },
                ],  
                series: [
                    {
                        name: new_mondial_labels[0],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: 'red'
                        },
                        smooth: true,
                        data: mondial_new_deaths
                    },
                    {
                        name: new_mondial_labels[1],
                        type: 'line',
                        areaStyle: {},
                            emphasis: { 
                        focus: 'series'
                        },
                        itemStyle: {
                            color: '#debc4e'
                        },
                        smooth: true,
                        data: mondial_new_confirmed
                    },
                    {
                        name: new_mondial_labels[2],
                        type: 'line',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            color: '#3dba61'
                        },
                        smooth: true,
                        data: mondial_new_recovered
                    }
                ]
            };
            // Set to second graph
            mondialNew.setOption(optionNew);
        }
    });
}

function changeLang(code) {
    window.location.href = 'index.php?lcode=' + code;
}

$( document ).ready(function() {
    $('#country-list').append('<option value="IT">Italy</option>');


    $.ajax({
        dataType: 'json',
        url: 'data/iso-3166-1.txt',
        success: function (data) {
            data.forEach(el => {
                code = el.Code;
                name = el.Name;
                $('#country-list').append('<option value="'+code+'">'+name+'</option>');
            })
        }
    });

    $('#country-list').change(function() {
        country = $(this).val();
        request(country);
    });

    $('#lang').change(function() {
        lang_code = $(this).val();
        changeLang(lang_code);
    });

    request(country);
    requestWorld();
    setInterval(request(country), 60000);
});