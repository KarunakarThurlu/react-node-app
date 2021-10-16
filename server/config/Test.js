
//Specifying profiles in Springboot  gradle project

import React, { useEffect, useRef } from 'react';
import Home from "../HomeComponent/Home";
import { Link } from "react-router-dom"
import 'gridstack/dist/gridstack.min.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GridStack } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';



const GridStackJsDashBoard = (props) => {
  const spline = {
    chart: {
      type: 'spline',
      reflow: true,
      spacingBottom: 3,
      spacingTop: 3,
      marginRight: 30,
      height: 320,
      width: 450,
        
     
    },
    yAxis: [
      {
        gridLineWidth: 0,
        yAxis: 1,
        title: {
          color: ["#112233"],
          text: 'Questions Count',
        },
      }
    ],
    xAxis: {
      categories: ["f", "v", "b", "h", "l", "c", "d", "s", "m", "e", "g", "p", "q", "t", "u", "w", "x", "y", "z"],
      title: {
        text: 'TopicName ',
      },
    },
    title: {
      text: 'My chart'
    },
    events: {
      load() {
        setTimeout(this.reflow.bind(this), 0);
      },
    },
    series: [{
      data: [1, 12, 33, 145, 5, 16, 7, 108, 9, 110,1, 12, 33, 45, 5, 16, 7, 108, 9, 10,1, 12, 3, 15, 5, 16, 7, 108, 9, 10]
    }]
  }
  const column = {
    yAxis: [
      {
        gridLineWidth: 0,
        yAxis: 1,
        title: {
          color: ["#115233"],
          text: 'Questions Count',
        },
      }
    ],
    xAxis: {
      categories: ["f", "v", "b", "h", "l"],
      title: {
        text: 'TopicName',
      },
    },
    title: {
      text: 'My chart'
    },
    series: [{
      type: 'column',
      data: [10, 12, 3, 14, 5, 16, 7, 18, 9, 10]
    }]
  }
  const bar = {
    yAxis: [
      {
        gridLineWidth: 0,
        yAxis: 1,
        title: {
          color: ["#115233"],
          text: 'Questions Count',
        },
      }
    ],
    xAxis: {
      categories: ["f", "v", "b", "h", "l"],
      title: {
        text: 'TopicName',
      },
    },
    title: {
      text: 'My chart'
    },
    series: [{
      type: 'pie',
      data: [10, 12, 33, 145, 5, 16, 7, 108, 9, 100]
    }]
  }

  const firstChart = useRef(null);
  const secondChart = useRef(null);
  const thirdChart = useRef(null);
  const fourthdChart = useRef(null);

  useEffect(() => {
    let grid = GridStack.init({
      resizable: {
        handles: 'e,se,s,n,w'
      },
    column:3
    });
   //Reflow chart ondrag or onresize
   grid.on('dragstop', (event, items) => {
    if (items.length) {
      items.forEach(item => {
        const chart = item.el.querySelector('.highcharts-container');
        if (chart) {
          chart.highcharts().reflow();
        }
      });
    }
  });
  grid.on('resizestop', (event, items) => {
    if (items.ddElement) {
       //get chart using .highcharts-container div chartHeight
      // console.log(chartComponent.current.chart);
       //let chart = chartComponent.current.chart;
      //setting chart height and width
       //chart.setSize(chart.chartHeight,chart.chartWidth);
      // chartComponent.current.chart.reflow(); //data-highcharts-chart
        const chart = items.ddElement.el.querySelector('.highcharts-container').parentElement.dataset.highchartsChart;
       if(chart==="0"){
        firstChart.current.chart.reflow();
        }
        else if(chart==="1"){
          secondChart.current.chart.reflow();
        }
        else if(chart==="2"){
          thirdChart.current.chart.reflow();
        }
        else if(chart==="3"){
          fourthdChart.current.chart.reflow();
        }
        //chart.reflow();
        //get chart using .highcharts-container div

        
          //Highcharts.charts.forEach(chart => chart.reflow());
        
    }
  });



  });

  /*
 Highcharts.charts.forEach(chart => chart.reflow());
  if (chart) {
        chart.setSize(ui.width, ui.height, false);
      }

       draggable: {
        handle: '.panel-heading',
      }
  */

  return (
    <div className="dashboard">
      <Home />
      <div className="header">
        <ul>
          <Link to="/questionsdashboard">Questions</Link>
          <Link>Users</Link>
          <Link>Exams</Link>
        </ul>
      </div>
      <div class="grid-stack">
        <div class="grid-stack-item" gs-w="4" gs-h="4"  gs-x="0"   gs-y="1"  >
          <div class="grid-stack-item-content">
            <HighchartsReact
              highcharts={Highcharts}
              options={spline}
             ref={firstChart}
             
            />
          </div>
        </div>
        <div class="grid-stack-item" gs-w="4" gs-h="4" gs-x="1"   gs-y="1">
          <div class="grid-stack-item-content">
            <HighchartsReact highcharts={Highcharts} 
            options={column}   
            ref={secondChart}
            className="foo" />
            
          </div>
        </div>
        <div class="grid-stack-item" gs-w="4" gs-h="4" gs-x="0"   gs-y="2" >
          <div class="grid-stack-item-content" >
            <HighchartsReact highcharts={Highcharts}
             ref={thirdChart} 
             options={bar}  />
          </div>
        </div>
        <div class="grid-stack-item"  gs-w="4" gs-h="4" gs-x="3"   gs-y="0"  >
          <div class="grid-stack-item-content" >
          <HighchartsReact highcharts={Highcharts}
          ref={fourthdChart}
           options={bar}  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GridStackJsDashBoard;

    

