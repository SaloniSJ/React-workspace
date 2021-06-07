import $ from 'jquery';
import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/kayana/main-logo/logo.svg';


class Sidenavigation extends React.PureComponent {

    state={
      is_charity:false
      

    }

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    componentDidMount() {
        const username=localStorage.getItem('username')
        if(username){
            // SecurityServiceAPI.fetchBusinessPlace(username).then(response => {
            //     if (response.data.status) {
            //         this.setState({ is_charity: response.data.data.property_details[0].is_charity})
            //     }
            // })
        }
        function setActiveMenuItem() {
            $('.ms-main-aside .menu-item>a').on('click', function () {
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('active')) {
                    element.removeClass('active');
                    element.find('li').removeClass('active');
                    element.find('.collapse').slideUp();
                } else {
                    element.addClass('active');
                    element.children('.collapse').slideDown();
                    element.siblings('li').children('.collapse').slideUp();
                    element.siblings('li').removeClass('active');
                    element.siblings('li').find('li').removeClass('active');
                    element.siblings('li').find('.collapse').slideUp();
                }
            });
        }
        setActiveMenuItem();
    }
    render() {
        return (
            <div>
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" onClick={this.removeoverlay}></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler"></div>
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/dashboard">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/* Navigation */}
                    <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
                        {/* Dashboard */}
                        <li className="menu-item">
                            <Link to="/dashboard"> <span><i className="material-icons fs-16" >dashboard</i>Kayana Dashboard </span>
                            </Link>
                        </li>
                        {/* /Dashboard */}
                        {/* product */}
                        <li className="menu-item">
                            <Link to="/menu-catalogue"> <span><i className="fa fa-archive fs-16" />Menu </span></Link>
                        </li >
                        {/* product end */}
                        {/* orders */}

                       {this.state.is_charity ? <li className="menu-item">
                            <Link to="/donation-order"> <span><i className="fas fa-clipboard-list fs-16" />Orders</span>
                            </Link>
                        </li > :
                         <li className="menu-item">
                         <Link to="#" className="has-chevron"> <span><i className="fas fa-user-friends fs-16" />Orders </span>
                            </Link>
                            <ul id="customer" className="collapse" aria-labelledby="customer" data-parent="#side-nav-accordion">
                                <li> <Link to={`/orders-takeaway`} >Take Away Orders</Link>
                                </li>
                                <li> <Link to={`/orders-dine-in`} >Dine In Orders</Link>
                                </li>
                                <li> <Link to={`/orders-delivery/${this.state.delivery}`} >Delivery Orders</Link>
                                </li>
                                <li> <Link to={`/orders-delivery-to-park`} >Delivery To Park Orders</Link>
                                </li>                                
                            </ul >
                        </li >}
                        {/* orders end */}
                        {/* restaurants */}
                        <li className="menu-item">
                            <Link to="/payout"> <span><i className="fa fa-file-invoice fs-16" />Transactions</span>
                            </Link>
                        </li >

                        <li className="menu-item">
                            <Link to="/notification"> <span><i className="fa flaticon-bell fs-16" />Notification</span>
                            </Link>
                        </li >

                        {/* Settings  start */}
                        <li className="menu-item ms-configure-qa settings_link">
                            <Link to="/setting" > <span><i className="flaticon-gear" />Account Settings</span>
                            </Link>
                        </li >
                        {/* Settings  end */}

                    </ul >
                </Scrollbar >
            </div >
        );
    }
}

export default Sidenavigation;