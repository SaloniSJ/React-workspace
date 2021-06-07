import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Addproduct from '../../components/sections/Addproduct/Addproductcontent';

// Routes of component
import Homecontent from '../../components/sections/Dashboard/Homecontent';
import Menu from '../../components/sections/Menucatelogue/Menu';
import Menugrid from '../../components/sections/Menugrid/Gridcontent';
import Menulist from '../../components/sections/Menulist/Listcontent';
import OrderDetails from '../../components/sections/OrderDetails/OrderDetails';
import Orders from '../../components/sections/Orders/Ordertable';
import Payout from '../../components/sections/Payout/Content';
import Payoutdetails from '../../components/sections/Payoutdetails/Detailcontent';
import Tax from '../../container/tax/index';
import General from '../general/index';
import TableManagement from '../../components/sections/TableManagement/TableManagement'
import Notification from '../../container/notifications/index'
import NotificationSetting from '../../container/notificationSetting/index'
import Promotions from '../../container/promotions/index'
import TakeAwayOrder from '../../container/TakeAwayOrder'
import DineinOrder from '../../container/DineinOrder'
import DeliveryToPark from '../../container/DeliveryToPark'
import DonationOrder  from '../../container/DonationOrder'

//PUBLIC ROUTE
import login from '../login/index';
import Payment from '../payment/index';
import Userprofile from '../Profile/index';
import Settings from '../settings/Content';
import register from '../signup/index';
import PrivateRoutes from '../_PrivateRoutes';
import PublicRoutes from '../_PublicRoute';
import { AppSetting } from '../AppSettings/AppSetting';
import AppTiming from '../AppTiming/index';
import TableReservationUpdatePage from '../TableReservationUpdatePage/index'

export default class index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoutes
                        path="/dashboard"
                        component={Homecontent} />
                    <PrivateRoutes
                        path="/table-management"
                        component={TableManagement} />
                    <PrivateRoutes
                        path="/setting"
                        component={Settings} />
                    <PrivateRoutes
                        path="/general"
                        component={General} />
                    <PrivateRoutes
                        path="/payment"
                        component={Payment} />
                    <PrivateRoutes
                        path="/payout"
                        component={Payout} />
                    <PrivateRoutes
                        path="/payoutdetails"
                        component={Payoutdetails} />
                    <PrivateRoutes
                        path="/orders-dine-in"
                        component={DineinOrder} />
                    <PrivateRoutes
                        path="/orders-takeaway"
                        component={TakeAwayOrder} />
                    <PrivateRoutes
                        path="/orders-delivery/:type"
                        component={Orders} />
                    <PrivateRoutes
                        path="/orderdetails"
                        component={OrderDetails} />
                    <PrivateRoutes
                        path="/donation-order"
                        components={DonationOrder} />
                      <PrivateRoutes
                        path="/orders-delivery-to-park"
                        component={DeliveryToPark} />
                    <PrivateRoutes
                        path="/tax"
                        component={Tax} />
                    <PrivateRoutes
                        path="/notification"
                        component={Notification} />
                    <PrivateRoutes
                        path="/notification-setting"
                        component={NotificationSetting} />
                    <PrivateRoutes
                        path="/user-profiles"
                        component={Userprofile} />
                    <PrivateRoutes
                        path="/add-product/:category_id"
                        component={Addproduct} />
                    <PrivateRoutes
                        path="/addproduct/:menu_id/:category_id/:is_buffet"
                        component={Addproduct} />
                    <PrivateRoutes
                        path="/editProduct/:menu_id/:category_id/:item_id/:is_buffet"
                        component={Addproduct} />
                    <PrivateRoutes
                        path="/menu-catalogue"
                        component={Menu} />
                    <PrivateRoutes
                        path="/menu-grid/:category_id"
                        component={Menugrid} />
                    <PrivateRoutes
                        path="/menuGrid/:menu_id/:category_id"
                        component={Menugrid} />
                    <PrivateRoutes
                        path="/menu-list/:menu_id"
                        component={Menulist} />
                    <PrivateRoutes
                        path='/promotions'
                        component={Promotions} />
                    <PrivateRoutes
                        path='/app-setting'
                        component={AppSetting} />
                    <PrivateRoutes
                        path='/app-timing'
                        component={AppTiming} />
                    <PrivateRoutes
                        path='/table-reservation-update-page'
                        component={TableReservationUpdatePage} />

                    <PublicRoutes exact path="/" component={login} />
                    <PublicRoutes path="/login" component={login} />
                    <PublicRoutes path="/register" component={register} />
                </Switch>
            </BrowserRouter >
        )
    }
}
