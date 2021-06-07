import React, { Component, Fragment } from 'react'
import Breadcrumb from './Breadcrumb'
import { toast } from 'react-toastify'
import * as TableManagementServiceAPI from '../../services/product/table/TableManagementServiceAPI'
import * as Message from '../../utils/Message';

export default class index extends Component {

    state = {
        end_time: '',
        minimum_spend_on_table_reservation: 0,
        number_of_person_per_table: 0,
        reserve_time_slot: 0,
        reserve_time_slot_unit: '',
        start_time: '',
        table_id: '',
        table_identifier: '',
        table_status: '',
        property_id: ''
    }

    componentDidMount = () => {
        const property_id = this.props.history.location.state.property_id
        const data = this.props.history.location.state.row
        this.setState({
            end_time: data.end_time,
            minimum_spend_on_table_reservation: data.minimum_spend_on_table_reservation,
            number_of_person_per_table: data.number_of_person_per_table,
            reserve_time_slot: data.reserve_time_slot,
            reserve_time_slot_unit: "MINUTES",
            start_time: data.start_time,
            table_id: data.table_id,
            table_identifier: data.table_identifier,
            table_status: data.table_status,
            property_id: property_id,
        })
    }

    updateTableReservationDetails = event => {
        event.preventDefault();
        const payload = {
            end_time: this.state.end_time,
            minimum_spend_on_table_reservation:  this.state.minimum_spend_on_table_reservation,
            number_of_person_per_table:  this.state.number_of_person_per_table,
            reserve_time_slot:  this.state.reserve_time_slot,
            reserve_time_slot_unit: "MINUTES",
            start_time:  this.state.start_time,
            table_id:  this.state.table_id,
            table_identifier:  this.state.table_identifier,
            table_status:  this.state.table_status,
        }
        TableManagementServiceAPI.updateTableReservationDetails(payload).then(response => {
            if (response.data.status) {
                toast.success(Message.UPDATE_TABLE_RESERVATION_DETAILS_SUCCESS_MESSAGE);
            }
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {
            end_time,
            reserve_time_slot,
            reserve_time_slot_unit,
            start_time,
            table_count,
            table_identifier,
            number_of_person_per_table,
            minimum_spend_on_table_reservation
        } = this.state
        return (
            <Fragment>
                <div className="ms-content-wrapper Dashboard general_setting_page">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header">
                                        <h6>Business Info</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                        <form onSubmit={this.updateTableReservationDetails}>
                                            <div className="form-row">
                                                <div className="col-md-6 mb-3">
                                                    <label>Table Available From</label>
                                                    <div className="input-group">
                                                        <input type="time" className="form-control" name="start_time" value={start_time} onChange={this.onChange} placeholder="start_time" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label>Table Available Until</label>
                                                    <div className="input-group">
                                                        <input type="time" className="form-control" name="end_time" value={end_time} onChange={this.onChange} placeholder="end_time" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6 mb-3">
                                                    <label>Reserve Time Slot</label>
                                                    <div className="input-group">
                                                        <input type="number" className="form-control" name="reserve_time_slot" value={reserve_time_slot} onChange={this.onChange} placeholder="reserve_time_slot" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label>Reserve Time Slot Unit</label>
                                                    <input type="text" className="form-control" disabled defaultValue="Minutes" />

                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Table Name</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="table_identifier" onChange={this.onChange} value={table_identifier} placeholder="0" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Minimum Spend On Table</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" name="minimum_spend_on_table_reservation" onChange={this.onChange} value={minimum_spend_on_table_reservation} placeholder="0" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <label>Person Per Table</label>
                                                    <div className="input-group">
                                                        <input type="number" className="form-control" name="number_of_person_per_table" onChange={this.onChange} value={number_of_person_per_table} placeholder="0" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3"></div>
                                                <div>
                                                    <button className="btn btn-primary" type="submit">Update</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
