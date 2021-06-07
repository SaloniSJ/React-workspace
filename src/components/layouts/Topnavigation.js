import $ from 'jquery';
import React, { Component } from 'react';
import { Dropdown, NavLink } from 'react-bootstrap';
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';
import { Link } from 'react-router-dom';
import admin_image from '../../assets/img/costic/customer-6.jpg';
import logo from '../../assets/img/kayana/main-logo/logo.svg';
import * as ProfileServiceAPI from '../../services/profile/ProfileServiceAPI';
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI';
import { withRouter } from "react-router";

import Notification from './Notification'

import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/user.action'
class Topnavigation extends Component {

    state = {
        name: '',
        profile_image_url: admin_image
    }

    signout = () => {
        SecurityServiceAPI.signout().then(response => {
            console.log(response)
            if (response.data.status) {
                localStorage.clear();
                this.props.history.push('/login')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    addsidenavigation = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    topbaropen = () => {
        $('#ms-nav-options').toggleClass('ms-slide-down');
    }

    componentDidMount = () => {
        const {setCurrentUser} = this.props;
        const username = localStorage.getItem('username')
        this.setState({ username: username })

        ProfileServiceAPI.fetchProfile(username).then(response => {
            console.log("ProfileServiceAPI :: ",response)
            if (response.data.status) {
                console.log(response)
                if (response.data.data) {
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    this.setState({ name: response.data.data.name, profile_image_url: response.data.data.profile_image_url })
                    // this.props.setCurrentUser(response.data.data)
                }
            }
        }).catch(error => {
            // throw new Error(error)
        })
    }

    subscribeNotification = () => {
    }

    render() {

        const pubnub = new PubNub({
            publishKey: 'pub-c-1ccdf009-7e0e-4d78-912b-4bc2fe415dee',
            subscribeKey: 'sub-c-d6de1d24-2e2f-11eb-9713-12bae088af96',
            uuid: '31c274e9-55f5-49a5-8705-5301045a7c89'
        });
        return (
            <nav className="navbar ms-navbar">
                <div className="ms-aside-toggler ms-toggler pl-0" onClick={this.addsidenavigation}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>
                <div className="logo-sn logo-sm ms-d-block-sm">
                    <Link className="pl-0 ml-0 text-center navbar-brand mr-0" to="/dashboard"><img src={logo} alt="logo" /> </Link>
                </div>
                <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
                    {/* SEARCH INPUT BOX STARTS HERE */}
                    {/* <li className="ms-nav-item ms-search-form pb-0 py-0">
                        <form className="ms-form" method="post">
                            <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                                <input type="search" className="ms-form-input" name="search" placeholder="Search here..." /> <i className="flaticon-search text-disabled" />
                            </div>
                        </form>
                    </li> */}
                    {/* SEARCH INPUT BOX ENDS HERE */}

                    {/* MAIL DROPDOWN STARTS FROM HERE */}
                    {/* <li className="ms-nav-item dropdown">
                        <Dropdown className="custom-dropdown">

                            <Dropdown.Toggle as={NavLink} className="text-disabled ms-has-notification p-0" ><i className="flaticon-mail" /></Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right" aria-labelledby="mailDropdown">
                                <div className="dropdown-menu-header">
                                    <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Mail</span></h6><span className="badge badge-pill badge-success">3 New</span>
                                </div>
                                <div className="dropdown-divider" />
                                <Scrollbar className="ms-scrollable ms-dropdown-list">
                                    <Link className="media p-2" to="#">
                                        <div className="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
                                            <img src="assets/img/costic/customer-3.jpg" className="ms-img-round" alt="people" />
                                        </div>
                                        <div className="media-body"> <span>Hey man, looking forward to your new project.</span>
                                            <p className="fs-10 my-1 text-disabled"><i className="material-icons">access_time</i> 30 seconds ago</p>
                                        </div>
                                    </Link>
                                    
                                </Scrollbar>
                                <div className="dropdown-divider" />
                                <div className="dropdown-menu-footer text-center"> <Link to="/email">Go to Inbox</Link>
                                </div>
                            </Dropdown.Menu>

                        </Dropdown>
                    </li> */}
                    {/* MAIL DROPDOWN ENDS HERE */}

                    {/* nOTIFICATION STARTS HERE */}
                    {/* <PubNubProvider client={pubnub}>
                        <Notification />
                    </PubNubProvider> */}
                    {/* NOTIFICATION PART ENDS HERE */}

                    <li className="ms-nav-item ms-nav-user dropdown">
                        <Dropdown className="custom-dropdown">
                            <Dropdown.Toggle as={NavLink} id="userDropdown" className="p-0">
                                {this.state.profile_image_url ? <img className="ms-user-img ms-img-round" src={this.state.profile_image_url} alt="people" /> : <img className="ms-user-img ms-img-round" src={admin_image} alt="people" />}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                                <div className="dropdown-menu-header">
                                    <h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Welcome,{this.state.name}</span></h6>
                                </div>
                                <div className="dropdown-divider" />
                                <div className="ms-dropdown-list">
                                    <Link className="media fs-14 p-2" to="/user-profiles"> <span><i className="flaticon-user mr-2" />User Profile</span>
                                    </Link>
                                    {/* <Link className="media fs-14 p-2" to="/email"> <span><i className="flaticon-mail mr-2" /> Inbox</span> <span className="badge badge-pill badge-info">3</span>
                                    </Link> */}
                                    <Link className="media fs-14 p-2" to="/setting"> <span><i className="flaticon-gear mr-2" /> Account Settings</span>
                                    </Link>
                                </div>
                                <div className="dropdown-divider" />
                                {/* <div className="dropdown-menu-footer">
                                    <Link className="media fs-14 p-2" to="/lockscreen"> <span><i className="flaticon-security mr-2" /> Lock</span>
                                    </Link>
                                </div> */}
                                <div className="dropdown-menu-footer">
                                    <p className="media fs-14 p-2" onClick={this.signout}> <span><i className="flaticon-shut-down mr-2" /> Logout</span>
                                    </p>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler" onClick={this.topbaropen}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>
            </nav >
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null,)(withRouter(Topnavigation));