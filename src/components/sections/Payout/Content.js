import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import Breadcrumb from './Breadcrumb';
import * as PaymentServiceAPI from '../../../services/payment/PaymentServiceAPI'
import { toast } from 'react-toastify'
class Content extends Component {

    state = {
        property: '',
        payouts: [],
    }

    componentDidMount = () => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        this.setState({ property: property })
        if (property) {
            const payload = {
                property_id: property.property_id,
            }
            PaymentServiceAPI.fetchPayouts(payload).then(response => {
                if (response.data.status) {
                    if (response.data.data) {
                        this.setState({ payouts: response.data.data.payouts })
                    } else {
                        toast.error('Please Activate Payment Service')
                    }
                } else {
                    toast.error(response.data.message)
                }
            })
        }

    }

    fetchPayoutDetailsOnRowClick = (row) => {
        const payload = {
            property_id: this.state.property.property_id,
            row: row
        }
        this.props.history.push({
            pathname: '/payoutdetails',
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
                minHeight:'65px',
                textAlign:'center',
                backgroundColor:'#5773ff',
                fontSize:'14px',
                color:'white'
                
              },
            },
            cells: {
              style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                pointer:'cursor'
              },
            },
          };

        const columns = [
            {
                name: "Amount",
                selector: "amount",
                sortable: true,
                cell: row => <div><div style={{ cursor: 'pointer' }} onClick={() => this.fetchPayoutDetailsOnRowClick(row)}>{row.amount}</div></div>
            },
            {
                name: "Bank/Card",
                selector: "bank_name",
                sortable: true,
                cell: row => <div><div style={{ cursor: 'pointer' }} onClick={() => this.fetchPayoutDetailsOnRowClick(row)}>{row.bank_name}</div></div>
            },
            {
                name: "Date",
                selector: "created",
                sortable: true,
                cell: row => <div><div style={{ cursor: 'pointer' }} onClick={() => this.fetchPayoutDetailsOnRowClick(row)}>{row.created}</div></div>
            },
        ]


        return (

            <div className="ms-content-wrapper">
                <Breadcrumb />
                {/* <div className="row">
                    <div className="col-xl-4 col-md-6">
                        <div className="ms-card card-success ms-widget ms-infographics-widget">
                            <div className="ms-card-body media">
                                <div className="media-body">
                                    <h6>Previous Payout</h6>
                                    <p className="ms-card-change"> £ 4567</p>
                                    <p className="fs-12"><a  className="text-white" href={"/payoutdetails"} >View transaction</a></p>
                                </div>
                            </div>
                            <i className="fa fa-expand" />
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
                            <div className="ms-card-body media">
                                <div className="media-body">
                                    <h6>Next Payout</h6>
                                    <p className="ms-card-change">£ 2533.00 <span className="badge-pill ms-chart-label bg-success">Scheduled</span></p>
                                    <p className="fs-12"><a className="text-white" href={"/payoutdetails"} >View transaction</a>  <span className="ml-4 text-white">Est. on Nov 26, 2020</span></p>
                                </div>
                            </div>

                            <i className="fa fa-chart-line" />

                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="ms-card card-primary ms-widget ms-infographics-widget">
                            <div className="ms-card-body media">
                                <div className="media-body">
                                    <h6>Balance</h6>
                                    <p className="ms-card-change"> £ 0</p>
                                    <p className="fs-12">&nbsp;</p>
                                </div>
                            </div>
                            <i className="fa fa-chart-line" />
                        </div>
                    </div>

                </div>
                 */}

                <div className="row">
                    <div className="col-md-12">

                        <div className="ms-panel">
                            {/* <div className="ms-panel-header">
                                <h6>Payouts</h6>
                            </div> */}
                            <div className="ms-panel-body">
                                <div className="table-responsive">

                                    {/* <MDBDataTable className="thead-primary" striped onClick={this.state.fetchPayoutDetailsOnRowClick} hover data={data} /> */}
                                    <DataTable
                                        title={<div>Payouts</div>}
                                        columns={columns}
                                        data={this.state.payouts}
                                        customStyles={customStyles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;