import React from 'react'
import Chart from '../../components/chart/Chart'
import Featuredinfo from '../../components/featuredinfo/Featuredinfo'
import './home.css'
import {dummyData} from "../../dummyData"
import Widget from '../../widget/Widget'

export default function Home() {
    return (
        <div className="home">
            <Featuredinfo/>
            <Chart data={dummyData} title="Device Data" grid/>
            <Widget/>
        </div>
    )
}
