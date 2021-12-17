import CustomChart from '../../components/chart/Chart';
import Featuredinfo from '../../components/featuredinfo/Featuredinfo';
import './home.css';
import {dummyData} from "../../dummyData";
import Widget from '../../widget/Widget';
import React, { useState, useEffect } from 'react';
import firebase from "../../firebase";
import "@firebase/database";
import { useAlert } from 'react-alert'

require('dotenv').config()

export default function Home() {

  const alert = useAlert()

  const [sensorData, setSensorData] = useState()
  const [Time, setTime] = useState();
  const [umbralSeco, setUmbralSeco] = useState(process.env.REACT_APP_lowMoistureCalibration)
  const [umbralHumedo, setUmbralHumedo] = useState(process.env.REACT_APP_highMoistureCalibration)
  const [canTriggerAlert, setCanTriggerAlert] = useState(false)
  const [lastMess, setLastMess] = useState(null)

  useEffect(() => {
      // Gets called every time Time changes value. This is set by set Interval to be every 15s
      // This way we get sensorData updated every 15s
        const getSensorData = async () => {
            const dbRef = firebase.database().ref();
            await dbRef.child("testing-gateway-bsas").child("eui-70b3d57ed0043cf5").limitToLast(200).get().then((snapshot) => {
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
                    // Curva para non mineral soils (sustratos que tienen aire como potting soils)
                    //obj.value_in_m3m3 = 5.439e-10 * value[0].rawHumidity**3 - 2.731e-6 * value[0].rawHumidity**2 + 4.868e-3 * value[0].rawHumidity - 2.683
                    // Curva para mineral soils (sustratos mayormente tierra)
                    obj.value_in_m3m3 = 4.824e-10 * value[0].rawHumidity**3 - 2.278e-6 * value[0].rawHumidity**2 + 3.898e-3 * value[0].rawHumidity - 2.154
                    //console.log(value[0].rawHumidity, obj.value_in_m3m3)
                    tempArray.push(obj);
                }
                // console.log("temp array", tempArray)
                setLastMess(tempArray[tempArray.length-1])
                if (lastMess.date[0] !== tempArray[tempArray.length-1].date[0]) {
                    setCanTriggerAlert(true)
                } else {
                    setCanTriggerAlert(false)
                }
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

    useEffect(() => {
        // Alert if necessary
        if(canTriggerAlert) {
            if( sensorData && sensorData.length > 2 &&
                sensorData[sensorData.length - 1].value_in_m3m3 > umbralHumedo && 
                sensorData[sensorData.length - 2].value_in_m3m3 < umbralHumedo) {
                alert.show("We have detected an increase in the humidity of the soil")
            }
            else if(
                sensorData && sensorData.length > 2 &&
                sensorData[sensorData.length - 1].value_in_m3m3 < umbralSeco && 
                sensorData[sensorData.length - 2].value_in_m3m3 > umbralSeco) {
                alert.show("We have detected a significant decrease in the humidity of the soil")
            }
            setCanTriggerAlert(false)
        }
    }, [sensorData, umbralHumedo, umbralSeco])

    return (
        <div className="home">
            <Featuredinfo/>
            {sensorData && 
                <div>
                <CustomChart data={sensorData} title="Device Data" grid umbralSeco={umbralSeco} umbralHumedo={umbralHumedo}/>
                <form>
                <div className="form">
                    <div className="configUmbral">
                        <p>Configurar Umbral de Escasa Humedad</p>
                        <label>
                            <input type="text" value={umbralSeco} onChange={e => setUmbralSeco(e.target.value)} />
                        </label>
                    </div>
                    <div className="configUmbral">
                        <p>Configurar Umbral de Excesiva Humedad</p>
                        <label>
                        <input type="text" value={umbralHumedo} onChange={e => setUmbralHumedo(e.target.value)} />
                        </label>
                    </div>
                </div>
              </form>  
                </div>}
            <Widget/>
        </div>
    )
}
