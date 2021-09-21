import React from 'react'
import './chart.css'

import { LineChart, Line, XAxis, Label, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart({title, data, dataKey, grid}) {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={3.5 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="dates" stroke="#D3D3D3"/>
                    <Line type="monotone" dataKey="value_in_m3m3" stroke="#5550bd" scale="scale1" dot={false}/>
                    <CartesianGrid />
                    <XAxis type="date" dataKey="time">
                      <Label
                        value={"Time"}
                        position="bottom"
                        style={{ textAnchor: "middle" }}
                      />
                    </XAxis>
                    <YAxis domain={[0.05, 0.75]}>
                      <Label
                        value={"Volumetric Water Content m³/m³"}
                        scaleToFit={true}
                        dx={8}
                        position="left"
                        angle={-90}
                        style={{ textAnchor: "middle" }}
                      />
                    </YAxis>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
