import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { Bar, defaults } from 'react-chartjs-2'
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

function PollsChart({curPoll}) {

    const labelsArr = [
        curPoll.options[0][0],
        curPoll.options[1][0],
        curPoll.options[2][0],
        curPoll.options[3][0],
    ]
    const dataArr = [
        curPoll.options[0][1],
        curPoll.options[1][1],
        curPoll.options[2][1],
        curPoll.options[3][1],
    ]

  return (
    <div>


      <Bar
        data={{
         
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default PollsChart