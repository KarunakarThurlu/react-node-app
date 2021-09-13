import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Home from '../HomeComponent/Home'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccessAlarmsRoundedIcon from '@material-ui/icons/AccessAlarmsRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import BarChartRoundedIcon from '@material-ui/icons/BarChartRounded';

import "./dashboard.scss"

import QuestionsApiCall from '../ApiCalls/QuestionsApiCall';

function DashBoard() {
  const [questions, setQuestions] = useState({});
  const [xaxisData, setXaxisData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDataForDashBoard();
  }, []);
  const fetchDataForDashBoard = () => {
    QuestionsApiCall.getQuestionsCountForDashBoard()
      .then((response) => {
        if (response.data.statusCode === 200) {
          setQuestions(response.data.data);
          let xaxis = [];
          let series = [];
          response.data.data.topics.map((v, i) => {
            xaxis.push(v.topicName);
            let topic = response.data.data.topicCount.find(x => x._id === v._id);
            if (topic) {
              series.push(topic.count);
            } else {
              series.push(0);
            }
          });
          setXaxisData(xaxis);
          setChartData(series);
        } else {
          console.log("Error in getting questions count for dashboard");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  const bar = {
    chart: {
      type: "spline",
    },
    title: {
      text: 'QuestionsCount By TopicName',
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
      categories: xaxisData,
      title: {
        text: 'TopicName',
      },
    },
    style: {
      width: "100px",
    },
    legend: {
      enabled: true,
      align: "right",
    },
    colors: ["#001177"],
    series: [
      {
        name: "QuestionsCount",
        data: chartData,
      },
    ],
  };

  return (
    <div className="dashboard">
      <Home />
      <h4>Questions DashBoard</h4>
      <Grid container spacing={5}>
        <Grid item xs={6} sm={3}>
          <Paper ><AccessAlarmsRoundedIcon style={{ color: "orange", fontSize: "3em" }} />InProgress <b> <h3>{questions.PENDING}</h3> </b>  </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper > <CheckRoundedIcon style={{ color: "green", fontSize: "3em" }} />Approved <b> <h3>{questions.APPROVED}</h3> </b> </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper > <ClearRoundedIcon style={{ color: "red", fontSize: "3em" }} />Rejected <b> <h3>{questions.REJECTED}</h3> </b></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper ><BarChartRoundedIcon style={{ fontSize: "3em" }} />Total Questions <b> <h3>{questions.totalCount}</h3> </b></Paper>
        </Grid>
        <Grid item xs={12} className="chart" >
          <HighchartsReact
            highcharts={Highcharts}
            options={bar}
          />
        </Grid>
      </Grid>
    </div >
  )
}

export default DashBoard