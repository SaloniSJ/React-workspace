import $ from 'jquery';
import React, { Component } from 'react';
import * as NotificationServiceAPI from '../../services/notification/NotificationServiceAPI';
import Breadcrumb from './Breadcrumb';
import ImageCropper from '../../shared/Cropper/ImageCropper';

class index extends Component {
    
    state = {
        notifications: [],
        show:false,
    }

    componentDidMount = () => {
        const username = localStorage.getItem('username');
        const payload = { page: 0, size: 10, username: username }
        NotificationServiceAPI.fetchAllNotification(payload).then(response => {
            if (response.data.status) {
                this.setState({ notifications: response.data.data.notifications })
            }
        })
    }

    handleCommonModal= ()=>{
        this.setState({show:!this.state.show})
    }
    // Ratings
    addstars = (e) => {
        var elem = e.target,
            parentTask = elem.closest('.ms-rating-item');
        $(parentTask).prevAll().removeClass('rated');
        $(parentTask).addClass('rated');
        $(parentTask).nextAll().addClass('rated');
    }
    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    {/* <div className="col-md-2">
                    <button className="btn grid-btn mt-0 btn-primary cover-image-button" onClick={this.handleCommonModal}>Open Modal</button>
                    </div> */}
                </div>
                <div className="ms-content-wrapper">
                    {/* <ImageCropper state={this.state} handleClose={this.handleCommonModal}/> */}
                    <div className="row">
                        {/* Recent Support Tickets */}
                        <div className="col-xl-12 col-md-12">
                            <div className="ms-panel ms-panel-fh">
                                <div className="ms-panel-body p-0">
                                    <ul className="ms-list ms-feed ms-twitter-feed ms-recent-support-tickets">
                                        {this.state.notifications.map((nft, i) => (
                                            <li key={i} className="ms-list-item">
                                                <div className="media clearfix">
                                                    {/* <img src={item.photo} className="ms-img-round ms-img-small" alt="This is another feature" /> */}
                                                    <div className="media-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="new">
                                                                <h5 className="ms-feed-user mb-0"></h5>
                                                                <h6 className="ml-4 mb-0 text-red"></h6>
                                                            </div>
                                                            <ul className="ms-star-rating rating-fill rating-circle ratings-new">
                                                               
                                                            </ul>
                                                        </div>
                                                        <span className="my-2 d-block"> <i className="material-icons">date_range</i> {nft.ago}</span>
                                                        <p className="d-block">{nft.message}</p>
                                                        
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default index;