import React, { Fragment, useState, useEffect } from 'react';
import { Dropdown, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePubNub } from 'pubnub-react';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Notification = () => {

    const pubnub = usePubNub();

    // const channel_name="NOTIFICATION_BUSINESS_USER."+
    // const [channel_]=useState('');
    const [channels] = useState('NOTIFICATION_BUSINESS_USER.9f6afaf829b24c47983c75dd47fd0a3b');
    const [messages, addMessage] = useState([]);

    // const handleMessage = event => {
    //     console.log("message from admin==>",event)
    //     const message = event.message.pn_apns.data.messageBody;
    //     console.log(event.message.pn_gcm.data.messageBody)
        
        
    //         addMessage(messages => [...messages, message]);
    // };

    useEffect(() => {
        // const channel_name
        // pubnub.addListener({ message: handleMessage });
        // pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    return (
        <Fragment>
            <li className="ms-nav-item dropdown">
                <Dropdown className="custom-dropdown">
                    <Dropdown.Toggle as={NavLink} className="text-disabled ms-has-notification p-0"><i className="flaticon-bell" /></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-right" aria-labelledby="notificationDropdown">
                        <div className="dropdown-menu-header">
                            <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Notifications</span></h6><span className="badge badge-pill badge-info">4 New</span>
                        </div>
                        <div className="dropdown-divider" />
                        <Scrollbar className="ms-scrollable ms-dropdown-list">
                            {messages.map((message, index) => {
                                return (
                                    <div className="media-body" key={`message-${index}`}>
                                        <span>{message}</span>
                                        {/* <p className="fs-10 my-1 text-disabled">{message.body}</p> */}
                                    </div>
                                )
                            })}
                            {/* <Link className="media p-2" to="#">
                                <div className="media-body"> <span>12 ways to improve your crypto dashboard</span>
                                    <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 30 seconds ago</p>
                                </div>
                            </Link> */}

                        </Scrollbar>
                        <div className="dropdown-divider" />
                        <div className="dropdown-menu-footer text-center"> <Link to="#">View all Notifications</Link>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </li>
        </Fragment>
    )

}

export default Notification;