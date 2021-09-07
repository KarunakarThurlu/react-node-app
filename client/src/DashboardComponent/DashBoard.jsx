import React, { useState } from 'react'
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
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [approvedQuestions, setApprovedQuestions] = useState(0);
  const [rejectedQuestions, setRejectedQuestions] = useState(0);
  const [pendingQuestions, setPendingQuestions] = useState(0);

  QuestionsApiCall.getQuestionsCountForDashBoard()
    .then(response => {
      setApprovedQuestions(response.data.approvedQuestionsCount);
      setRejectedQuestions(response.data.rejectedQuestionsCount);
      setPendingQuestions(response.data.pendingQuestionsCount);
      setTotalQuestions(response.data.totalQuestionsCount);
    })
    .catch(error => {
      console.log(error);
    })

  const bar = {
    chart: {
      type: "spline",
    },
    title: {
      text: 'QuestionsCount By QuestionsStatus',
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
      categories: ['Inproges', 'Approved','Rejected', 'Total',"foo","bar"],
      title: {
        text: 'Question Status',
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
        name: "Questions",
        data: [pendingQuestions, approvedQuestions,rejectedQuestions,  totalQuestions,10,23],
      }, 
    ],
  };

  return (
    <div className="dashboard">
      <Home />
      <h4>Questions DashBoard</h4>
      <Grid container spacing={5}>
        <Grid item xs={6} sm={3}>
          <Paper ><AccessAlarmsRoundedIcon style={{ color: "orange", fontSize: "3em" }} />InProgress <b> <h3>{pendingQuestions}</h3> </b>  </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper > <CheckRoundedIcon style={{ color: "green", fontSize: "3em" }} />Approved <b> <h3>{approvedQuestions}</h3> </b> </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper > <ClearRoundedIcon style={{ color: "red", fontSize: "3em" }} />Rejected <b> <h3>{rejectedQuestions}</h3> </b></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper ><BarChartRoundedIcon style={{ fontSize: "3em" }} />Total Questions <b> <h3>{totalQuestions}</h3> </b></Paper>
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