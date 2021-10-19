import React from 'react'
import './chart.css'
import Chart from "react-apexcharts";

import { Area, LineChart, Line, XAxis, Label, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function CustomChart({title, data, dataKey, grid, umbralSeco, umbralHumedo}) {

    const dataSets = [];

    let previousColor = null;

    function extractColor(m3m3) {
      if(m3m3 < umbralSeco)
        return "yellow"
      else if(m3m3 > umbralHumedo)
        return "blue"
      else
        return "transparent"
    }
  
    for(const [i, element] of data.entries()) {
      const color = extractColor(element.value_in_m3m3)

      let dataSet;
      if (dataSets.length === 0 || previousColor !== color) {
        const previousDataSet = dataSets.length !== 0 ? dataSets[dataSets.length - 1] : null;
        dataSet = {
          name: "Volumetric water content m³/m³",
          color: color,
          // copy ending point from previous dataset
          data:
            previousDataSet === null
              ? []
              : [previousDataSet.data[previousDataSet.data.length - 1]]
        };
        dataSets.push(dataSet);
      } else {
        dataSet = dataSets[dataSets.length - 1];
      }

      // add point
      const element_date = Date.parse(element.date[0].split(',')[0] + '.' + element.date[0].split(',')[1]);
      const dateObject = new Date(element_date)
      const humanDateFormat = dateObject.toLocaleDateString("en-US", {hour: '2-digit', minute: '2-digit'});
      console.log("date", humanDateFormat)
      dataSet.data.push([humanDateFormat, element.value_in_m3m3]);

      // update previous element's color
      previousColor = color;
    }
    console.log(dataSets)
    const options = {
      chart: {
        type: "area",
        toolbar: {
          show: true
        },
        animations: {
          enabled: true
        }
      },
      title: {
        text: "eui-70b3d57ed0043cf5",
        align: "center"
      },
      tooltip: {
        shared: true
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: "smooth",
        colors: ["silver"],
        width: 1
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.25,
          opacityTo: 0.01,
          stops: [0, 100]
        }
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: "Volumetric water content m³/m³",
          rotate: -90
        },
        min: -0.05,
        max: 0.45,
        decimalsInFloat: 3
      }
    }

    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={3.5 / 1}>
                <Chart type="area" series={dataSets} options={options}/>
            </ResponsiveContainer>
            <div className="calibraciones">
            <hr className="hair"/>
            <p className="textoCalibraciones">Low moisture calibration: <b>{umbralSeco}</b></p>
            <p className="textoCalibraciones">High moisture calibration: <b>{umbralHumedo}</b></p>
            </div>
        </div>
    )
}
