import React from 'react'
import './chart.css'

import { LineChart, Line, XAxis, Label, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart({title, data, dataKey, grid}) {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="date" stroke="#5550bd"/>
                    <Line type="monotone" dataKey="value_in_m3m3" stroke="#5550bd" scale="scale"/>
                    <CartesianGrid />
                    <XAxis type="date" dataKey="time">
                      <Label
                        value={"Time"}
                        position="bottom"
                        style={{ textAnchor: "middle" }}
                      />
                    </XAxis>
                    <YAxis domain={[0, 1]}>
                      <Label
                        value={"Volumetric Water Content m³/m³"}
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
