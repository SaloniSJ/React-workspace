import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import * as img1 from '../../../assets/img/kayana/dashboard-images/create_menu.png';
import img2 from '../../../assets/img/kayana/dashboard-images/add_business_info.png';
import img3 from '../../../assets/img/kayana/dashboard-images/add_payment_method.png';
import img4 from '../../../assets/img/kayana/dashboard-images/add_social_media_accounts.png';

const trendfood = [
    {
        photo: img1,
        title: "Create menu",
        detail: "Lets start by creating menu for your business",
        buttonTitile:'Create',
        link:'/menu-catalogue',
        resposnivecls: "col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-lg-20",
    },
    {
        photo: img2,
        title: "Update business details",
        detail: "Update your business information for better reach",
        buttonTitile:'Update',
        link:'/general',
        resposnivecls: "col-xl-3 col-lg-6 col-md-6 col-sm-6 mb-lg-20",
    },
    {
        photo: img3,
        title: "Add payment mode",
        detail: "Add your preferred payment mode to recieve payouts",
        buttonTitile:'Add',
        link:'/payment',
        resposnivecls: "col-xl-3 col-lg-6 col-md-6 col-sm-6",
    },
    {
        photo: img4,
        title: "Add social media accounts",
        detail: "Link social media account to get stats all in one place",
        buttonTitile:'Coming soon!',
        link:'#',
        resposnivecls: "col-xl-3 col-lg-6 col-md-6 col-sm-6",
    },
]

class Trendingdetail extends Component {
    render() {
        return (
            <Fragment>
                <h6>Complete your Business details</h6>

                <div className="row">
                    {trendfood.map((item, i) => (
                        <div key={i} className={item.resposnivecls}>
                            <div className="ms-card no-margin">
                                <div className="ms-card-img">
                                    <img src={item.photo} alt="card_img" />
                                </div>
                                <div className="ms-card-body">
                                    <div className="ms-card-heading-title">
                                        <h6>{item.title}</h6>
                                        <span className="green-text"><strong>{item.price}</strong></span>
                                    </div>
                                    <div className="ms-card-heading-title">
                                        <span className="red-text">{item.detail}</span>
                                    </div>
                                    <Link to={item.link} className="btn btn-primary mt-4 d-block w-100" type="submit">{item.buttonTitile}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default Trendingdetail;