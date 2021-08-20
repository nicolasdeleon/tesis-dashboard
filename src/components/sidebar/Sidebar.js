import React from 'react'
import "./sidebar.css"

import { Assessment, AttachMoney, Help, Language, LineStyle, Message, Timeline } from "@material-ui/icons"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon"/>
                            Home
                        </li>
                    </u1>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Devices
                        </li>
                    </u1>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <Assessment className="sidebarIcon"/>
                            Analytics
                        </li>
                    </u1>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <Language className="sidebarIcon"/>
                            Last news
                        </li>
                    </u1>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <Message className="sidebarIcon"/>
                            Messages
                        </li>
                    </u1>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon"/>
                            Account - Payment
                        </li>
                    </u1>
                    <u1 className="sidebarList">
                        <li className="sidebarListItem">
                            <Help className="sidebarIcon"/>
                            Contact
                        </li>
                    </u1>
                </div>
            </div>
        </div>
    )
}
