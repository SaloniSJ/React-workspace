import React, { Component, Fragment } from 'react';
import Breadcrumb from './Breadcrumb';
import Piechart from './Piechart';
import $ from 'jquery';
import { toast } from 'react-toastify'
import DataTable from 'react-data-table-component';
import Pagination from '../../../shared/Pagination/Pagination';
import SimpleModal from '../../../shared/Modal/SimpleModal'

import * as TableManagementServiceAPI from '../../../services/product/table/TableManagementServiceAPI'
import AddTable from './AddTable';

export default class TableManagement extends Component {

    state = {
        show: false,
        table_request_list: [],
        vacant_table_info: [],

        page_of_request_data_table: 0,
        current_page_of_request_data_table: 0,
        number_of_elements_of_request_data_table: 10,
        page_size: 10,
        total_elements_of_request_data_table: 0,
        total_pages_of_request_data_table: 0,

        page_of_vacant_data_table: 0,
        current_page_of_vacant_data_table: 0,
        number_of_elements_of_vacant_data_table: 10,
        total_elements_of_vacant_data_table: 0,
        total_pages_of_vacant_data_table: 0,

        property_details: '',
        end_time: '',
        reserve_time_slot: 0,
        reserve_time_slot_unit: '',
        start_time: '',
        table_count: 0,
        tableNames: [{
            name: '',
        }],
        number_of_person_per_table: '',
        table_value: false,

    }

    componentDidMount = () => {
        const property_details = JSON.parse(localStorage.getItem('property_details'))
        this.setState({ property_details: property_details })
        const payload = {
            page: 0,
            size: 10,
            property_id: property_details.property_id
        }
        this.fetchTableDetails(payload);
        this.fetchVacantTableDetails(payload);
    }

    handleChange = (i, event) => {
        const names = [...this.state.tableNames];
        names[i].name = event.target.value;
        // setState(names);
    }

    handleAddTable() {
        const names = [...this.state.tableNames];
        names.push({ name: null });
        // setFields(names);
    }

    handleRemove(i) {
        const names = [...this.state.tableNames];
        names.splice(i, 1);
        // setFields(names);
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addTable = (event) => {
        event.preventDefault();
        const payload = {
            end_time: this.state.end_time + ':00',
            property_id: this.state.property_details.property_id,
            reserve_time_slot: this.state.reserve_time_slot,
            reserve_time_slot_unit: "Minutes",
            start_time: this.state.start_time + ':00',
            table_count: this.state.table_count,
            number_of_person_per_table: this.state.number_of_person_per_table,
            // table_names: this.state.tableNames
        }
        TableManagementServiceAPI.addTable(payload).then(response => {
            if (response.data.status) {
                this.setState({ show: false })
                toast.success('Table Added Successfully !!')
                const payload = {
                    page: 0,
                    size: 10,
                    property_id: this.state.property_details.property_id
                }
                this.fetchVacantTableDetails(payload);
            } else {
                toast.error(response.data.message)
            }
        })
    }


    fetchVacantTableDetails = (payload) => {
        TableManagementServiceAPI.fetchVacantTableDetails(payload).then(response => {
            if (response.data.status) {
                if (response.data.data) {
                    this.setState({
                        vacant_table_info: response.data.data.table_info,
                        current_page_of_vacant_data_table: response.data.data.current_page,
                        total_elements_of_vacant_data_table: response.data.data.total_elements,
                        total_pages_of_vacant_data_table: response.data.data.total_pages
                    })
                } else {
                    toast.warn(response.data.message)
                }
            }
        })
    }

    fetchTableDetails = (payload) => {
        TableManagementServiceAPI.fetchTableInfo(payload).then(response => {
            if (response.data.status) {
                if (response.data.data) {
                    this.setState({
                        table_request_list: response.data.data.requested_table_info,
                        current_page_of_request_data_table: response.data.data.current_page,
                        total_elements_of_request_data_table: response.data.data.total_elements,
                        total_pages_of_request_data_table: response.data.data.total_pages
                    })
                } else {
                    toast.warn(response.data.message)
                }
            }
        })
    }

    approveTableRequest = (table) => {
        TableManagementServiceAPI.approveTableRequest(table.table_request_id).then(response => {
            if (response.data.status) {
                const payload = { page: 0, size: 10, property_id: this.state.property_details.property_id }
                this.fetchTableDetails(payload);
                toast.success("Table Request Approved Successfully!!")
            } else {
                toast.warn(response.data.message)
            }
        })
    }

    rejectTableRequest = (table) => {
        TableManagementServiceAPI.rejectTableRequest(table.table_request_id).then(response => {
            if (response.data.status) {
                const payload = { page: 0, size: 10, property_id: this.state.property_details.property_id }
                this.fetchTableDetails(payload);
                toast.success("Table Request Rejected Successfully!!")
            } else {
                toast.warn(response.data.message)
            }
        })
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    changeCurrentPageOfRequestDataTable = (event, value) => {
        event.preventDefault();
        const page = value - 1;
        this.setState({ current_page_of_request_data_table: value });
        const payload = {
            page: page,
            size: this.state.number_of_elements_of_request_data_table,
            property_id: this.state.property_details.property_id
        }
        this.fetchTableDetails(payload);
    }

    changeCurrentPageOfVacantDataTable = (event, value) => {
        event.preventDefault();
        const page = value - 1;
        this.setState({ current_page_of_request_data_table: value });
        const payload = {
            page: page,
            size: this.state.number_of_elements_of_request_data_table,
            property_id: this.state.property_details.property_id
        }
        this.fetchVacantTableDetails(payload);
    }

    naviagteToTableReservationUpdatePage=(data)=>{
        const payload = {
            property_id: this.state.property_details.property_id,
            row: data
        }
        this.props.history.push({
            pathname: '/table-reservation-update-page',
            state: payload
        })
    }

    render() {
        const customStyles = {

            rows: {
                style: {
                    minHeight: '70px', // override the row height
                }
            },
            headCells: {
                style: {
                    minHeight: '65px',
                    textAlign: 'center',
                    backgroundColor: '#5773ff',
                    fontSize: '14px',
                    color: 'white'

                },
            },
            cells: {
                style: {
                    textAlign: 'center',
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                },
            },
        };


        const coloumns = [
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Number Of Person',
                selector: 'number_of_people',
                sortable: true,
            },
            {
                name: 'Table Request time',
                selector: 'table_request_time',
                sortable: true,
            },
            {
                name: 'Table Request Date',
                selector: 'table_request_date',
                sortable: true,
            },
            {
                name: 'Table Status',
                selector: 'table_status',
                sortable: true,
            }, {
                name: 'Request',
                sortable: true,
                cell: row => <div><div>
                    <i className="fas fa-check-circle text-secondary text-success" onClick={() => this.approveTableRequest(row)} style={{ marginRight: '15px', cursor: 'pointer', fontSize: '15px' }} />
                    {/* <i className="fas fa-pencil-alt text-secondary" /> */}
                    <i className="far fa-trash-alt ms-text-danger" onClick={() => this.rejectTableRequest(row)} style={{ marginRight: '15px', cursor: 'pointer', fontSize: '15px' }} /></div></div>
            }];

        const vacant_table_coloumns = [

            {
                name: 'Table Name',
                selector: 'table_identifier',
                sortable: true,
            },
            {
                name: 'Number Of Person',
                selector: 'number_of_person_per_table',
                sortable: true,
            },
            {
                name: 'Start Time',
                selector: 'start_time',
                sortable: true,
            },
            {
                name: 'End time',
                selector: 'end_time',
                sortable: true,
            },
            {
                name: 'Reserve Time Slot',
                selector: 'reserve_time_slot',
                sortable: true,
            },{
                name:'Minimum Spend On Table',
                selector:'minimum_spend_on_table_reservation',
                sortable:true
            },
            {
                name: 'Table Status',
                selector: 'table_status',
                sortable: true,
            },{
                name: 'Request',
                sortable: true,
                cell: row => <div><div>
                    <i className="fas far fa-eye text-secondary text-success" onClick={() => this.naviagteToTableReservationUpdatePage(row)} style={{ marginLeft: '25px', cursor: 'pointer', fontSize: '15px' }} />
                    {/* <i className="fas fa-pencil-alt text-secondary" /> */}
                    {/* <i className="far fa-trash-alt ms-text-danger" onClick={() => this.rejectTableRequest(row)} style={{ marginRight: '15px', cursor: 'pointer', fontSize: '15px' }} /> */}
                    </div></div>
            }];
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-10">
                        <Breadcrumb />
                    </div>
                    <div className="col-md-2">
                        <button type="button" style={{ float: 'right' }} onClick={this.handleModal} className="btn btn-primary">Add Table</button>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="row">
                                <div className="col-xl-12 col-md-12 col-sm-6">
                                    <DataTable
                                        customStyles={customStyles}
                                        title="Requested Table"
                                        columns={coloumns}
                                        data={this.state.table_request_list}
                                    />
                                    <div className="row" style={{ float: 'right', margin: '25px' }}>
                                        <Pagination currentPage={this.state.current_page_of_request_data_table} total_pages={this.state.total_pages_of_request_data_table} handleChange={this.changeCurrentPageOfRequestDataTable} />
                                    </div>
                                    <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.state.total_elements_of_request_data_table}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="row">
                                <div className="col-xl-12 col-md-12 col-sm-6">
                                    <DataTable
                                        customStyles={customStyles}
                                        title="Vacant Table"
                                        columns={vacant_table_coloumns}
                                        data={this.state.vacant_table_info}
                                    />
                                    <div className="row" style={{ float: 'right', margin: '25px' }}>
                                        <Pagination currentPage={this.state.current_page_of_vacant_data_table} total_pages={this.state.total_pages_of_vacant_data_table} handleChange={this.changeCurrentPageOfVacantDataTable} />
                                    </div>
                                    <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.state.total_elements_of_vacant_data_table}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <SimpleModal state={this.state} handleClose={this.handleModal} Heading="Add Tables">
                    <AddTable state={this.state} onChange={this.onChange} addTable={this.addTable} />
                </SimpleModal>

            </Fragment >
        );
    }
}