import React from 'react'
import "./widget.css"

export default function Widget() {

    const Button = ({type}) => {
        return <button className={"widgetButton " + type}>{type}</button>
    }

    return (
        <div className="widget">
            <h3 className="widgetTitle"> Registered Devices</h3>
            <table className="widgetTable">
                <tr className="widgetTr">
                    <th className="widgetTh">Device Id</th>
                    <th className="widgetTh">Register date</th>
                    <th className="widgetTh">Status</th>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetDevice">
                        <span className="widgetId">eui-70b3d57ed0043cf5</span>
                    </td>
                    <td className="widgetDate"> 20/08/2021 - 17:52</td>
                    <td className="widgetStatus"><Button type="Online"/></td>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetDevice">
                        <span className="widgetId">eui-hkgn12455nq9d12n4r</span>
                    </td>
                    <td className="widgetDate"> 20/08/2021 - 17:52</td>
                    <td className="widgetStatus"><Button type="Offline"/></td>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetDevice">
                        <span className="widgetId"eui->klhg034jnc13n00c9</span>
                    </td>
                    <td className="widgetDate"> 20/08/2021 - 17:52</td>
                    <td className="widgetStatus"><Button type="Repair"/></td>
                </tr>
                <tr className="widgetTr">
                    <td className="widgetDevice">
                        <span className="widgetId">eui-tefdv93mdc0321md0m</span>
                    </td>
                    <td className="widgetDate"> 20/08/2021 - 17:52</td>
                    <td className="widgetStatus"><Button type="Maintenance"/></td>
                </tr>
            </table>
        </div>
    )
}
