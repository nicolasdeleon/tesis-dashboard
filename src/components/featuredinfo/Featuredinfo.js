import { Assessment, Language, Timeline } from '@material-ui/icons'
import React from 'react'
import "./featuredinfo.css"

export default function Featuredinfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Devices <Timeline/></span>
                <div className="featuredDescriptionContainer">
                    <span className="featuredDescription">
                        You now have 5 active devices. Click here to monitor their status
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Analytics <Assessment/></span>
                <div className="featuredDescriptionContainer">
                    <span className="featuredDescription">
                        With our analytics you can get an insight of your soils humidity forecast
                    </span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Latest News  <Language/></span>
                <div className="featuredDescriptionContainer">
                    <span className="featuredDescription">
                        Check to see the latest news in weather and climate. Don't let it suprise you!
                    </span>
                </div>
            </div>
        </div>
    )
}
