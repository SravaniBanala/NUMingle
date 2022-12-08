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
          labels: labelsArr,
          datasets: [
            {
              label: '# of votes',
              data: dataArr,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
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