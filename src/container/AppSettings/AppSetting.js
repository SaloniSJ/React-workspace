import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb'

const tabs=[
    {
        title: 'App Timing',
        link: '/app-timing',
        description: 'Manage your store timing',
        icon_name: 'access_time'
    },
    {
        title: 'Promotions',
        link: '/promotions',
        description: 'Manage image and videos of your store',
        icon_name: 'add_a_photo'
    },
    {
        title: 'Other Setting',
        link: '#',
        description: 'Lorem epsum',
        icon_name: 'build'
    },
]

export const AppSetting = () => {
    return (
        <Fragment>
            <div className="ms-content-wrapper Dashboard">
                <div className="col-md-12">
                    <Breadcrumb />
                </div>
                <div className="ms-panel">
                        <div className="ms-panel-body">
                            <div className="row">
                                {tabs.map((tab, i)=> (
                                    <div key={i} className="col-md-4">
                                        <Link to={tab.link}> <div className="ms-panel-body media ms-panel-hoverable has-border ms-widget ms-has-new-msg ms-notification-widget">
                                            <i className="material-icons">{tab.icon_name}</i>
                                            <div className="media-body" >
                                                <h6>{tab.title}</h6>
                                                <span>{tab.description}</span>
                                            </div>
                                        </div></Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}
