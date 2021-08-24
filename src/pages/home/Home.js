import Chart from '../../components/chart/Chart';
import Featuredinfo from '../../components/featuredinfo/Featuredinfo';
import './home.css';
import {dummyData} from "../../dummyData";
import Widget from '../../widget/Widget';
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import "@firebase/database";

export default function Home() {

  const [sensorData, setSensorData] = useState()
  const [Time, setTime] = useState();

  useEffect(() => {
      // Gets called every time Time changes value. This is set by set Interval to be every 15s
      // This way we get sensorData updated every 15s
        const getSensorData = async () => {
            const dbRef = firebase.database().ref();
            await dbRef.child("testing-gateway-bsas").child("eui-70b3d57ed0043cf5").limitToLast(10).get().then((snapshot) => {
            if (snapshot.exists()) {
                // console.log("Setting sensor data to component");
                // console.log(snapshot.val());
                var tempArray = [];
                for(var key in snapshot.val()) {
                    var value = Object.values(snapshot.val()[key])
                    var date = Object.keys(snapshot.val()[key])
                    // console.log(date)
                    let obj = {...value[0]}
                    obj.date = date
                    tempArray.push(obj);
                }
                // console.log("temp array", tempArray)
                setSensorData(tempArray);
            } else {
                // console.log("No data available");
            }
            }).catch((error) => {
                // console.error(error);
            });
            // console.log("sensor data", sensorData);
        }
        getSensorData();
        const interval = setInterval(() => setTime(Date.now()), 15000);
        return () => {
            clearInterval(interval);
        };
    }, [Time]);

    return (
        <div className="home">
            <Featuredinfo/>
            <Chart data={sensorData} title="Device Data" grid/>
            <Widget/>
        </div>
    )
}
