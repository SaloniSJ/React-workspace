import React, { Component, Fragment } from 'react';
// import {AddInputField} from './AddInputField'
export class AddTable extends Component {

    render() {
        const {
            end_time,
            reserve_time_slot,
            reserve_time_slot_unit,
            start_time,
            table_count,
            number_of_person_per_table
        }=this.props.state
        return (
            <Fragment>
                <form onSubmit={this.props.addTable}>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Table Available From</label>
                            <div className="input-group">
                                <input type="time" className="form-control" name="start_time" value={start_time} onChange={this.props.onChange} placeholder="start_time" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Table Available Until</label>
                            <div className="input-group">
                                <input type="time" className="form-control" name="end_time" value={end_time} onChange={this.props.onChange} placeholder="end_time" />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Reserve Time Slot</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="reserve_time_slot" value={reserve_time_slot} onChange={this.props.onChange} placeholder="reserve_time_slot" />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Reserve Time Slot Unit</label>
                            <input type="text" className="form-control" disabled defaultValue="Minutes" />
                            {/* <select className="form-control" name="reserve_time_slot_unit" value={reserve_time_slot_unit} onChange={this.props.onChange}>
                                <option value="hours">Hours</option>
                                <option value="minutes">Minutes</option>
                                <option value="seconds">Seconds</option>
                            </select> */}
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Table Count</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="table_count" onChange={this.props.onChange} value={table_count} placeholder="0" />
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Person Per Table</label>
                            <div className="input-group">
                                <input type="number" className="form-control" name="number_of_person_per_table" onChange={this.props.onChange} value={number_of_person_per_table} placeholder="0" />
                            </div>
                        </div>

                        {/* <AddInputField/> */}

                        <div>
                            <button className="btn btn-primary" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

}

export default AddTable;