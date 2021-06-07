import React, { Component, Fragment } from 'react'
import Sidenavigation from '../../components/layouts/Sidenavigation';
import Topnavigation from '../../components/layouts/Topnavigation';
import Quickbar from '../../components/layouts/Quickbar';
import { toast } from 'react-toastify'
import Content from './Content'
import * as PaymentServiceAPI from '../../services/payment/PaymentServiceAPI'
export default class index extends Component {

    state = {
        isVATEditable: true,
        isServiceTaxEditable: true,
        loading: false,
    }

    handleInputEnable = current => {
        this.setState({
            [current]: !this.state[current],
        });
    };

    updateTaxDetails = (values) => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        const payload = {
            property_id: property.property_id,
            service_tax: values.service_tax,
            vat: values.vat
        }
        PaymentServiceAPI.updateTaxDetails(payload).then(response => {
            if (response.data.status) {
                toast.success('Tax-details Successfully updated')
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
        })

    }

    render() {
        return (
            <Fragment>

                <Content state={this.state} updateTaxDetails={this.updateTaxDetails} handleInputEnable={this.handleInputEnable} />

            </Fragment>
        )
    }
}
