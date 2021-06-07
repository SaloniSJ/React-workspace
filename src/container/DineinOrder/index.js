import React, { Component, Fragment } from 'react'
import DataTable from 'react-data-table-component';
import Pagination from '../../shared/Pagination/Pagination';
import Breadcrumb from './Breadcrumb'

import * as OrderServiceAPI from '../../services/order/OrderServiceAPI'
import CustomStepper from '../../components/sections/OrderDetails/Stepper'

export default class index extends Component {

    state = {
        page: 0,
        order_details: [],
        current_page: 0,
        number_of_elements: 10,
        page_size: 10,
        total_elements: 0,
        total_pages: 0,
        property_id: '',
        order_type: ''
    }
    componentDidMount = () => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        this.setState({ property_id: property.property_id })
        const payload = {
            page: 0,
            size: this.state.number_of_elements,
            search_text: '',
            order_type:'DINE IN',
            property_id: property.property_id,
        }
        this.fetchAllOrdersByOrderType(payload)
    }

    searchOrder = (event) => {
        event.preventDefault();
        const payload = {
            page: 0,
            size: this.state.number_of_elements,
            search_text: event.target.value,
            property_id: this.state.property_id
        }
        this.fetchAllOrdersByOrderType(payload)
    }

    changeCurrentPage = (event, value) => {
        event.preventDefault();
        console.log(value)
        const page = value;
        this.setState({ currentPage: value });
        const payload = {
            page: page,
            size: this.state.number_of_elements,
            search_text: '',
            order_type:'DINE IN',
            property_id: this.state.property_id
        }
        this.fetchAllOrdersByOrderType(payload);
    }

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({number_of_elements:parseInt(event.target.value, 10)});
    };

    fetchAllOrdersByOrderType = (payload) => {
        OrderServiceAPI.searchOrder(payload).then(response => {
            if (response.data.status) {
                if (response.data.data.order_Details) {
                    this.setState({
                        order_details: response.data.data.order_Details,
                        total_elements: response.data.data.total_elements,
                        total_pages: response.data.data.total_pages,
                        current_page:response.data.data.current_page,
                        page_size:response.data.data.page_size
                    })
                }
            }
        })
    }
    
    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({number_of_elements:parseInt(event.target.value, 10)});
      };

    fetchOrderDetailsByOrderId = (order) => {
        this.props.history.push({
            pathname: '/orderdetails',
            state: {
                order: order
            }
        })
    }

    render() {
        console.log(this.props)
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
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                    pointer: 'cursor'
                },
            },
        };
        const order_list_columns = [

            {
                name: 'Order Number',
                selector:'order_number',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.order_number}</div></div>
            },{
                name: 'Customer Name',
                selector: 'customer_name',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.customer_name}</div></div>
            },
            {
                name: 'Order Status',
                selector: 'status',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.status}</div></div>
            },
            {
                name: 'Payment Status',
                selector: 'payment_status',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.payment_status}</div></div>
            },
            {
                name: 'Date and Time',
                selector: 'order_date_time',
                sortable: true,

            },
            {
                name: 'Schedule Pick Up Time',
                selector: 'handover_time',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.handover_time}</div></div>
            },
            {
                name: 'Order Type',
                selector: 'order_type',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>{row.order_type}</div></div>
            },
            {
                name: 'Total',
                selector: 'sub_total',
                sortable: true,
                cell: row => <div><div onClick={() => this.fetchOrderDetailsByOrderId(row)}>£{row.sub_total}</div></div>
            },{
                name: 'Actions',
                sortable: true,
                cell: row => <div><div>
                    <i className="fas far fa-eye text-secondary text-success" onClick={() => this.fetchOrderDetailsByOrderId(row)} style={{ marginLeft: '25px', cursor: 'pointer', fontSize: '15px' }} />
                    {/* <i className="fas fa-pencil-alt text-secondary" /> */}
                    {/* <i className="far fa-trash-alt ms-text-danger" onClick={() => this.rejectTableRequest(row)} style={{ marginRight: '15px', cursor: 'pointer', fontSize: '15px' }} /> */}
                    </div></div>
            }
            ];

        return (
            <Fragment>
                <Breadcrumb />
                <div className="col-md-12">


                    <div className="row">
                        <div className="col-md-12">
                            <div className="ms-panel">
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 col-sm-12">

                                        <DataTable
                                            title={<div style={{ marginTop: '1em', marginBottom: '0.5em', marginLeft: '730px' }}>

                                                <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                                                    <input type="search" className="ms-form-input" name="search" onChange={this.searchOrder} placeholder="Search here..." /> <i className="flaticon-search text-disabled" />
                                                </div>
                                            </div>}
                                            customStyles={customStyles}
                                            columns={order_list_columns}
                                            data={this.state.order_details}
                                        />
                                        <div className="row" style={{ float: 'right', margin: '25px' }}>
                                        <Pagination currentPage={this.state.current_page} total_pages={this.state.total_pages} number_of_elements={this.state.number_of_elements}
                                            handleChangeRowsPerPage={this.handleChangeRowsPerPage} handleChange={this.changeCurrentPage} />
                                        </div>
                                        <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.state.total_elements}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment >
        )
    }
}
