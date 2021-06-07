import React, { Component } from 'react';
import { Tooltip } from "react-bootstrap";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { connect } from 'react-redux';
import * as OrderServiceAPI from '../../../services/order/OrderServiceAPI';
import * as ProfileServiceAPI from '../../../services/profile/ProfileServiceAPI';
import * as SecurityServiceAPI from '../../../services/user/SecurityServiceAPI';
import Chart from './Chart';
import Recentorder from './Recentorder';
import Trendingorder from './Trendingorder';


const phonetip = (
    <Tooltip>
        Call
    </Tooltip>
);
const videotip = (
    <Tooltip>
        Video Call
    </Tooltip>
);
const invitetip = (
    <Tooltip>
        Add to Chat
    </Tooltip>
);

class Homecontent extends Component {

    state = {
        name: '',
        user: '',
        page: 0,
        order_details: [],
        current_page: 0,
        number_of_elements: 10,
        page_size: 10,
        total_elements: 0,
        total_pages: 0,
        property_id: '',
        property_details: false,
    }

    componentDidMount = () => {
        let prop_id;
        const username = localStorage.getItem('username')
        this.setState({ username: username })
        ProfileServiceAPI.fetchProfile(username).then(response => {
            console.log(response)
            if (response.data.status) {
                console.log(response)
                this.setState({ name: response.data.data.name, user: response.data.data })
                localStorage.setItem('user', JSON.stringify(response.data.data))
            }
        }).catch(error => {
            // throw new Error(error)
        })

        SecurityServiceAPI.fetchBusinessPlace(username).then(response => {
            console.log(response)
            if (response.data.status) {
                localStorage.setItem('property_details', JSON.stringify(response.data.data.property_details[0]))
                prop_id = response.data.data.property_details[0].property_id
                this.setState({ property_details: true, property_id:prop_id })
                const payload = {
                    page: 0,
                    property_id: prop_id,
                    size: 10,
                }
                this.fetchAllOrders(payload)
            }
        }).catch(error=>{
            // throw new Error(error)
        })
        
    }

    fetchOrderDetailsByOrderId = (order) => {
        this.props.history.push({
            pathname: '/orderdetails',
            state: {
                order: order
            }
        })
    }

    fetchAllOrders = (payload) => {
        OrderServiceAPI.fetchTodaysOrder(payload).then(response => {
            if (response.data.status) {
               console.log(response)
                if (response.data.data.order_Details) {
                    this.setState({
                        order_details: response.data.data.order_Details,
                        total_elements: response.data.data.total_elements,
                        total_pages: response.data.data.total_pages,
                        
                    })
                    localStorage.setItem('todays_order',response.data.data.total_elements)
                }
            }
        })
    }
    changeCurrentPage = (event, value) => {
        event.preventDefault();
        const page = value - 1;
        this.setState({ currentPage: value });
        const payload = {
            page: page,
            size: this.state.number_of_elements,
            property_id: this.state.property_id
        }
        this.fetchAllOrders(payload);
    }

    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="db-header-title">Welcome, {this.state.name}</h1>
                    </div>

                    {/* <div className="col-md-12">
                        <Chart />
                    </div> */}

                    {/* Recent Placed Orders< */}
                    <div className="col-12">
                        <div className="ms-panel">
                            <div className="ms-panel-body">
                                <Recentorder state={this.state} fetchOrderDetailsByOrderId={this.fetchOrderDetailsByOrderId} changeCurrentPage={this.changeCurrentPage} />
                            </div>
                        </div>
                    </div>
                    {/*Recent Placed Orders*/}



                    {/* Food Orders */}
                    <div className="col-md-12" style={{ marginTop: '5px', marginBottom: '25px' }}>
                        <Trendingorder />
                    </div>
                    {/* END/Food Orders */}

                    {this.state.property_details ? <div className="col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-body">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h4>Pending Table Request</h4>
                                        <h6>You can accept or delete table request based on your availablity.</h6>
                                    </div>
                                    <div className="col-md-3">
                                        <a href='/table-management' style={{ float: 'right' }} className="btn btn-primary">Manage Table</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}



                    {/* Recent Orders Requested */}
                    {/* <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center align-left">
                                        <h6>Recent Support Tickets</h6>
                                    </div>
                                    <Link to="#" className="btn btn-primary"> View All</Link>
                                </div>
                            </div>
                            <div className="ms-panel-body p-0">
                                <ul className="ms-list ms-feed ms-twitter-feed ms-recent-support-tickets">

                                    <li className="ms-list-item">
                                        <Link to="#" className="media clearfix">
                                            <img src="assets/img/costic/customer-1.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                            <div className="media-body">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                    <span className="badge badge-success"> Open </span>
                                                </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2020</span>
                                                <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                <div className="d-flex justify-content-between align-items-end">
                                                    <div className="ms-feed-controls"> <span>
                                                        <i className="material-icons">chat</i> 11
                      </span>
                                                        <span>
                                                            <i className="material-icons">attachment</i> 1
                      </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div> */}
                    {/* Recent Support Tickets */}
                    {/* <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header new">
                                <h6>Ticket details</h6>

                            </div>
                            <div className="ms-panel-body"> */}
                    {/* Ticket details */}
                    {/* </div>
                        </div>
                    </div> */}


                    {/* Recent Support Tickets */}
                    {/* <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center align-left">
                                        <h6>Recent Support Tickets</h6>
                                    </div>
                                    <Link to="#" className="btn btn-primary"> View All</Link>
                                </div>
                            </div>
                            <div className="ms-panel-body p-0">
                                <ul className="ms-list ms-feed ms-twitter-feed ms-recent-support-tickets">
                                    <li className="ms-list-item">
                                        <Link to="#" className="media clearfix">
                                            <img src="assets/img/costic/customer-4.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                            <div className="media-body">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                    <span className="badge badge-success"> Open </span>
                                                </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2020</span>
                                                <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                <div className="d-flex justify-content-between align-items-end">
                                                    <div className="ms-feed-controls"> <span>
                                                        <i className="material-icons">chat</i> 16
                      </span>
                                                        <span>
                                                            <i className="material-icons">attachment</i> 3
                      </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="ms-list-item">
                                        <Link to="#" className="media clearfix">
                                            <img src="assets/img/costic/customer-1.jpg" className="ms-img-round ms-img-small" alt="This is another feature" />
                                            <div className="media-body">
                                                <div className="d-flex justify-content-between">
                                                    <h6 className="ms-feed-user mb-0">Lorem ipsum dolor</h6>
                                                    <span className="badge badge-success"> Open </span>
                                                </div> <span className="my-2 d-block"> <i className="material-icons">date_range</i> February 24, 2020</span>
                                                <p className="d-block">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus lectus a facilisis bibendum. Duis quis convallis sapien ...</p>
                                                <div className="d-flex justify-content-between align-items-end">
                                                    <div className="ms-feed-controls"> <span>
                                                        <i className="material-icons">chat</i> 11
                      </span>
                                                        <span>
                                                            <i className="material-icons">attachment</i> 1
                      </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div> */}
                    {/* Recent Support Tickets */}
                    {/* client chat */}
                    {/* <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh ms-widget ms-chat-conversations">
                            <div className="ms-panel-header">
                                <div className="ms-chat-header justify-content-between">
                                    <div className="ms-chat-user-container media clearfix">
                                        <div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
                                            <img src="assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                        </div>
                                        <div className="media-body ms-chat-user-info mt-1">
                                            <h6>Heather Brown</h6>
                                            <span className="text-disabled fs-12">
                                                Active Now
                </span>
                                        </div>
                                    </div>
                                    <ul className="ms-list ms-list-flex ms-chat-controls">
                                        <OverlayTrigger placement="top" overlay={phonetip}>
                                            <li data-toggle="tooltip" data-placement="top" title="Call"> <i className="material-icons">local_phone</i>
                                            </li>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={videotip}>
                                            <li data-toggle="tooltip" data-placement="top" title="Video Call"> <i className="material-icons">videocam</i>
                                            </li>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="top" overlay={invitetip}>
                                            <li data-toggle="tooltip" data-placement="top" title="Add to Chat"> <i className="material-icons">person_add</i>
                                            </li>
                                        </OverlayTrigger>
                                    </ul>
                                </div>
                            </div>
                            <Scrollbar className="ms-panel-body ms-scrollable">
                                <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                    <div className="ms-chat-status ms-status-online ms-chat-img">
                                        <img src="assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body">
                                        <div className="ms-chat-text">
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                        <p className="ms-chat-time">10:33 pm</p>
                                    </div>
                                </div>
                                <div className="ms-chat-bubble ms-chat-message ms-chat-incoming media clearfix">
                                    <div className="ms-chat-status ms-status-online ms-chat-img">
                                        <img src="assets/img/costic/customer-2.jpg" className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body">
                                        <div className="ms-chat-text">
                                            <p>I'm doing great, thanks for asking</p>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</p>
                                        </div>
                                        <p className="ms-chat-time">11:01 pm</p>
                                    </div>
                                </div>
                                <div className="ms-chat-bubble ms-chat-message ms-chat-outgoing media clearfix">
                                    <div className="ms-chat-status ms-status-online ms-chat-img">
                                        <img src="assets/img/costic/customer-1.jpg" className="ms-img-round" alt="people" />
                                    </div>
                                    <div className="media-body">
                                        <div className="ms-chat-text">
                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                            <p>There are many variations of passages of Lorem Ipsum available</p>
                                        </div>
                                        <p className="ms-chat-time">11:03 pm</p>
                                    </div>
                                </div>
                                <div className="ms-panel-footer">
                                    <div className="ms-chat-textbox">
                                        <ul className="ms-list-flex mb-0">
                                            <li className="ms-chat-vn"><i className="material-icons">mic</i>
                                            </li>
                                            <li className="ms-chat-input">
                                                <input type="text" name="msg" placeholder="Enter Message" />
                                            </li>
                                            <li className="ms-chat-text-controls ms-list-flex"> <span> <i className="material-icons">tag_faces</i> </span>
                                                <span> <i className="material-icons">attach_file</i> </span>
                                                <span> <i className="material-icons">camera_alt</i> </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Scrollbar>
                        </div>
                    </div> */}
                    {/* client chat */}


                    {/* Recent Orders Requested */}
                    {/* <div className="col-xl-7 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <div className="d-flex justify-content-between">
                                    <div className="ms-header-text">
                                        <h6>Order Timing Chart</h6>
                                    </div>
                                </div>
                            </div>
                            <Orderchart />
                        </div>
                    </div> */}
                    {/* Favourite Products */}
                    {/* <div className="col-xl-5 col-md-12">
                        <div className="ms-panel ms-widget ms-crypto-widget">
                            <div className="ms-panel-header">
                                <h6>Favourite charts</h6>
                            </div>
                            <div className="ms-panel-body p-0">
                                <Tab.Container defaultActiveKey="mon">
                                    <Nav variant="tabs" className="nav nav-tabs nav-justified has-gap px-4 pt-4">
                                        <Nav.Item>
                                            <Nav.Link eventKey="mon">Mon</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tue">Tue</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="wed">Wed</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="thu">Thu</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fri">Fri</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="mon">
                                            <div className="table-responsive">
                                                <table className="table table-hover thead-light">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Restaurant Names</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Orders</th>
                                                            <th scope="col">Profit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Hunger House</td>
                                                            <td>8528</td>
                                                            <td className="ms-text-success">+17.24%</td>
                                                            <td>7.65%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Food Lounge</td>
                                                            <td>4867</td>
                                                            <td className="ms-text-danger">-12.24%</td>
                                                            <td>9.12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delizious</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Netherfood</td>
                                                            <td>1614</td>
                                                            <td className="ms-text-danger">-20.75%</td>
                                                            <td>12.25%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Rusmiz</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="tue">
                                            <div className="table-responsive">
                                                <table className="table table-hover thead-light">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Restaurant Name</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Orders</th>
                                                            <th scope="col">Profit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Hunger House</td>
                                                            <td>8528</td>
                                                            <td className="ms-text-success">+17.24%</td>
                                                            <td>7.65%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Food Lounge</td>
                                                            <td>4867</td>
                                                            <td className="ms-text-danger">-12.24%</td>
                                                            <td>9.12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delizious</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Netherfood</td>
                                                            <td>1614</td>
                                                            <td className="ms-text-danger">-20.75%</td>
                                                            <td>12.25%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Rusmiz</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="wed">
                                            <div className="table-responsive">
                                                <table className="table table-hover thead-light">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Restaurant Name</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Orders</th>
                                                            <th scope="col">Profit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Hunger House</td>
                                                            <td>8528</td>
                                                            <td className="ms-text-success">+17.24%</td>
                                                            <td>7.65%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Food Lounge</td>
                                                            <td>4867</td>
                                                            <td className="ms-text-danger">-12.24%</td>
                                                            <td>9.12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delizious</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Netherfood</td>
                                                            <td>1614</td>
                                                            <td className="ms-text-danger">-20.75%</td>
                                                            <td>12.25%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Rusmiz</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="thu">
                                            <div className="table-responsive">
                                                <table className="table table-hover thead-light">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Restaurant Name</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Orders</th>
                                                            <th scope="col">Profit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Hunger House</td>
                                                            <td>8528</td>
                                                            <td className="ms-text-success">+17.24%</td>
                                                            <td>7.65%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Food Lounge</td>
                                                            <td>4867</td>
                                                            <td className="ms-text-danger">-12.24%</td>
                                                            <td>9.12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delizious</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Netherfood</td>
                                                            <td>1614</td>
                                                            <td className="ms-text-danger">-20.75%</td>
                                                            <td>12.25%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Rusmiz</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="fri">
                                            <div className="table-responsive">
                                                <table className="table table-hover thead-light">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Restaurant Name</th>
                                                            <th scope="col">Qty</th>
                                                            <th scope="col">Orders</th>
                                                            <th scope="col">Profit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Hunger House</td>
                                                            <td>8528</td>
                                                            <td className="ms-text-success">+17.24%</td>
                                                            <td>7.65%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Food Lounge</td>
                                                            <td>4867</td>
                                                            <td className="ms-text-danger">-12.24%</td>
                                                            <td>9.12%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delizious</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Netherfood</td>
                                                            <td>1614</td>
                                                            <td className="ms-text-danger">-20.75%</td>
                                                            <td>12.25%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Rusmiz</td>
                                                            <td>7538</td>
                                                            <td className="ms-text-success">+32.04%</td>
                                                            <td>14.29%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Tab.Container>
                            </div>
                        </div> */}
                    {/* Favourite Products */}
                    {/* Total Earnings */}
                    {/* <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Total Earnings</h6>
                            </div>
                            <div className="ms-panel-body p-0">
                                <div className="ms-quick-stats">
                                    <div className="ms-stats-grid">
                                        <i className="fa fa-star" />
                                        <p className="ms-text-dark">$8,033</p>
                                        <span>Today</span>
                                    </div>
                                    <div className="ms-stats-grid">
                                        <i className="fa fa-university" />
                                        <p className="ms-text-dark">$3,039</p>
                                        <span>Yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* Total Earnings */}
                    {/* Recent Orders< */}


                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Homecontent)