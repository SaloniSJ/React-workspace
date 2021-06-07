import $ from 'jquery';
import React, { Component } from 'react';
import * as NotificationServiceAPI from '../../services/notification/NotificationServiceAPI';
import Breadcrumb from './Breadcrumb';
import TableSetting from './TableSetting';
import OrderSetting from './OrderSetting';
import ServiceSetting from './ServiceSetting';
import { toast } from 'react-toastify';

class index extends Component {

    state = {
        table_email: '',
        is_table_email_active: true,
        is_table_in_software_active: true,
        is_table_push_notification_active: true,
        is_table_sms_active: true,
        table_phone_number: '',

        order_email: '',
        is_order_email_active: true,
        is_order_in_software_active: true,
        is_order_push_notification_active: true,
        is_order_sms_active: true,
        order_phone_number: '',

        service_email: '',
        is_service_email_active: true,
        is_service_in_software_active: true,
        is_service_push_notification_active: true,
        is_service_sms_active: true,
        service_phone_number: '',

        property_id: '',
        type: ''
    }

    componentDidMount = () => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        this.setState({ property_id: property.property_id })
        this.getNotificationSetting(property.property_id)
    }

    updateNotificationSetting = (payload) => {
        console.log(payload)
        NotificationServiceAPI.updateNotificationSetting(payload).then(response => {
            if (response.data.status) {
                console.log(response)
                this.getNotificationSetting(this.state.property_id)
                toast.success('Setting updated successfully.')
            } else {
                toast.error(response.message)
            }
        })
    }

    getNotificationSetting = (property_id) => {
        NotificationServiceAPI.fetchNotificationSettings(property_id).then(response => {
            if (response.data.status) {
                console.log(response)
                if (response.data.data.table_reservation_notification_setting) {
                    const table_reservation_notification_setting=response.data.data.table_reservation_notification_setting
                    console.log("Table :: ",table_reservation_notification_setting)
                    this.setState({
                        table_email: table_reservation_notification_setting.email,
                        is_table_email_active: table_reservation_notification_setting.is_email_active,
                        is_table_in_software_active: table_reservation_notification_setting.is_in_software_active,
                        is_table_push_notification_active: table_reservation_notification_setting.is_push_notification_active,
                        is_table_sms_active: table_reservation_notification_setting.is_sms_active,
                        table_phone_number: table_reservation_notification_setting.phone_number,
                    })
                }
                if (response.data.data.order_notification_setting) {
                    const order_notification_setting=response.data.data.order_notification_setting;
                    console.log("Order :: ",order_notification_setting)
                    this.setState({
                        order_email:order_notification_setting.email,
                        is_order_email_active:order_notification_setting.is_email_active,
                        is_order_sms_active:order_notification_setting.is_sms_active,
                        is_order_in_software_active:order_notification_setting.is_in_software_active,
                        is_order_push_notification_active:order_notification_setting.is_push_notification_active,
                        order_phone_number:order_notification_setting.phone_number,
                    })

                } if (response.data.data.service_notification_setting) {
                    const service_notification_setting=response.data.data.service_notification_setting
                    console.log("Service :: ",service_notification_setting)
                    this.setState({
                        service_email:service_notification_setting.email,
                        is_service_email_active:service_notification_setting.is_email_active,
                        is_service_sms_active:service_notification_setting.is_sms_active,
                        is_service_in_software_active:service_notification_setting.is_in_software_active,
                        is_service_push_notification_active:service_notification_setting.is_push_notification_active,
                        service_phone_number:service_notification_setting.phone_number,
                    })
                } 

            }
        })
    }

    toggleHandler = (current) => {
        console.log(current)
        this.setState({
            [current]: !this.state[current],
        });
    }

    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                </div>
                <div className="ms-content-wrapper">
                    <TableSetting state={this.state} toggleHandler={this.toggleHandler}
                        updateNotificationSetting={this.updateNotificationSetting} />
                </div>

                <div className="ms-content-wrapper">
                    <OrderSetting state={this.state} toggleHandler={this.toggleHandler}
                        updateNotificationSetting={this.updateNotificationSetting} />
                </div>

                <div className="ms-content-wrapper">
                    <ServiceSetting state={this.state} toggleHandler={this.toggleHandler}
                        updateNotificationSetting={this.updateNotificationSetting} />
                </div>
            </div>

        );
    }
}

export default index;