import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

import Breadcrumb from './Breadcrumb'

export default class Content extends Component {
    render() {
        const tabs = [
            {
                title: 'General',
                link: '/general',
                description: 'View and update your store details',
                icon_name: 'ac_unit'
            },
            {
                title: 'App Setting',
                link: '/app-setting',
                description: 'Update your business settings here.',
                icon_name: 'build'
            },
            {
                title: 'Payments',
                link: '/payment',
                description: 'Enable and payments made on your store',
                icon_name: 'account_balance_wallet'
            },
            {
                title: 'Taxes',
                link: '/tax',
                description: 'Manage how your store charges tax',
                icon_name: 'text_snippet'
            },
            {
                title: 'Notification',
                link: '/notification-setting',
                description: 'Manage Notification sent to you and your customers',
                icon_name: 'announcement'
            },
            {
                title: 'Plan and permissions',
                link: '#',
                description: 'View plan information and manage what stuff can see or do in your store',
                icon_name: 'assignment'
            },
        ]
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
}
