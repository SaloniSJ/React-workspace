import React, { Component, Fragment } from 'react'
import AppTiming from './AppTiming'
import Breadcrumb from './Breadcrumb'
import { toast } from 'react-toastify'
import * as SettingServiceAPI from '../../services/setting/SettingServiceAPI'

export default class index extends Component {

    state = {
        delivery_timings: [],
        dine_in_timings: [],
        property_timing: [],
        take_away_timing: [],
        property: ''
    }

    componentDidMount = () => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        this.setState({ property: property })
        SettingServiceAPI.fetchBusinessTiming(property.property_id).then(response => {
            if (response.data.status) {
                console.log(response)
                this.setState({
                    delivery_timings: response.data.data.delivery_timings,
                    dine_in_timings: response.data.data.dine_in_timings,
                    property_timing: response.data.data.property_timings,
                    take_away_timing: response.data.data.take_away_timings,
                })
            }
        })
    }

    updateDeliveryTime = (value) => {
        const payload={
            property_id:this.state.property.property_id,
            property_timing_details: value,
        }
        console.log(value)
        SettingServiceAPI.updateDeliveryTiming(payload).then(response => {
            if (response.data.status) {
                toast.success('Delivery timing updated successfully!')
            }
        })
    }

    updateTakeAwayTime = (value) => {
        
        console.log(value)
        const payload={
            property_id:this.state.property.property_id,
            property_timing_details: value,
        }
        SettingServiceAPI.updateTakeAwayTiming(payload).then(response => {
            if (response.data.status) {
                toast.success('Take-away timing updated successfully!')
                
            }
        })
    }

    updatePropertyTime = (value) => {
        const payload={
            property_id:this.state.property.property_id,
            property_timing_details: value,
        }
        console.log(payload)
        SettingServiceAPI.updatePropertyTiming(payload).then(response => {
            if (response.data.status) {
                toast.success("Property timing updated successfully!")
            }
        })
    }

    updateDineInTime = (value) => {
        console.log(value)
        const payload={
            property_id:this.state.property.property_id,
            property_timing_details: value,
        }
        console.log(payload)
        SettingServiceAPI.updateDineInTiming(payload).then(response => {
            if (response.data.status) {
                toast.success("Dine-in timing updated successfully!")
            }
        })
    }

    onPropertyTimingChange = (value, name, index) => {
        console.log(value,":",name, " : ", index);
        let newTimings = [...this.state.property_timing]
        if (name === "close_time") newTimings[index].close_time = value
        if (name === "open_time") newTimings[index].open_time = value
        if (name === "status") newTimings[index].status = value
        this.setState({
            property_timing: newTimings
        })
    }

    onDeliveryTimingChange = (value, name, index) => {
        console.log(value, " : ", index);
        let newTimings = [...this.state.delivery_timings]
        if (name === "close_time") newTimings[index].close_time = value
        if (name === "open_time") newTimings[index].open_time = value
        this.setState({
            delivery_timings: newTimings
        })
    }

    onTakeAwayTimingChange = (value, name, index) => {
        console.log(value, " : ", index);
        let newTimings = [...this.state.take_away_timing]
        if (name === "close_time") newTimings[index].close_time = value
        if (name === "open_time") newTimings[index].open_time = value
        this.setState({
            take_away_timing: newTimings
        })
    }

    onDineInTimingChange = (value, name, index) => {
        console.log(value, " : ", index);
        let newTimings = [...this.state.dine_in_timings]
        if (name === "close_time") newTimings[index].close_time = value
        if (name === "open_time") newTimings[index].open_time = value
        this.setState({
            dine_in_timings: newTimings
        })
    }
    

    render() {
        return (
            <Fragment>
                <div className="ms-content-wrapper Dashboard general_setting_page">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    <AppTiming state={this.state}
                        updateDeliveryTime={this.updateDeliveryTime}
                        updateDineInTiming={this.updateDineInTime}
                        updatePropertyTime={this.updatePropertyTime}
                        updateTakeAwayTime={this.updateTakeAwayTime}
                        
                        onPropertyChange={this.onPropertyTimingChange} 
                        onDineInChange={this.onDineInTimingChange}
                        onDeliveryTimingChange={this.onDeliveryTimingChange}
                        onTakeAwayTimingChange={this.onTakeAwayTimingChange}/>
                </div>

            </Fragment>
        )
    }
}
