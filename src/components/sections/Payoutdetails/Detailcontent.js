import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { toast } from 'react-toastify'
import * as PaymentServiceAPI from '../../../services/payment/PaymentServiceAPI'

class Detailcontent extends Component {

    state={
        payout_transactions:[],
        payout_summary:'',
        row:'',
        total:0,
        payout_id:'',
        origin:'',
        type:'',
        currency:'',
        today_date:new Date().toLocaleDateString(),
        application_fees:{
            count: 0,
            fee: 0,
            gross: 0,
            total: 0,
            
        },
        adjustments:{
            count: 0,
            fee: 0,
            gross: 0,
            total: 0,
        },
        refunds:{
            count: 0,
            fee: 0,
            gross: 0,
            total: 0,
        },
        transfers:{
            count: 0,
            fee: 0,
            gross: 0,
            total: 0,
        },
        charges:{
            count: 0,
            fee: 0,
            gross: 0,
            total: 0,
        }
    }

    componentDidMount=()=>{
        const state=this.props.history.location.state
        this.setState({
            property_id:this.props.history.location.state.property_id,
            row:this.props.history.location.state.row,
        })
        const payload={
            property_id:state.property_id,
            payout_id:state.row.payout_id
        }
        this.fetchPayoutDetails(payload)
    }

    fetchPayoutDetails=(payload)=>{
        PaymentServiceAPI.fetchPayoutDetails(payload).then(response=>{
            if(response.data.status){
                this.setState({payout_transactions:response.data.data.payout_transactions,
                    total:response.data.data.payout_transactions[0].total,
                    today_date:response.data.data.payout_transactions[0].created,
                    type:response.data.data.payout_transactions[0].type,
                    payout_id:response.data.data.payout_transactions[0].id,
                    payout_summary:response.data.data.payout_summary,
                    currency:response.data.data.payout_transactions[0].currency
                })
            }else{
                toast.error(response.data.message)
            }
        })
    }

    showOrderDetails=(value)=>{
    
        const payload={
            property_id:this.state.property_id,
            payment_id:value
        }
        PaymentServiceAPI.fetchOrderDetailsByPayoutId(payload).then(response=>{
            if(response.data.status){
                const order=response.data.data;
                this.props.history.push({
                    pathname: '/orderdetails',
                    state:{
                        order: order
                    }
                })
            }
        })
    }

    render() {
        const columns = [
            {
                name: "Type",
                selector: "type",
                sortable: true,
                cell: row => <div><div>{row.type}</div></div>
            },
            {
                name: "Gross",
                selector: "gross",
                sortable: true,
                cell: row => <div onClick={()=>this.showOrderDetails(row.source)}><div>{row.gross}</div></div>
            },
            {
                name: "Fee",
                selector: "fee",
                sortable: true,
                cell: row => <div onClick={()=>this.showOrderDetails(row.source)}><div>{row.fee}</div></div>
            },
            {
                name: "Transaction Id",
                selector: "id",
                sortable: true,
                cell: row => <div onClick={()=>this.showOrderDetails(row.source)}><div>{row.id}</div></div>
            },
            {
                name: "Payout Id",
                selector: "source",
                sortable: true,
                cell: row => <div onClick={()=>this.showOrderDetails(row.source)}><div>{row.source}</div></div>
            },
            {
                name: "Date",
                selector: "created",
                sortable: true,
                cell: row => <div onClick={()=>this.showOrderDetails(row.source)}><div>{row.created}</div></div>
            },


        ]
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                        <div className="ms-panel">
                            <div className="ms-panel-header header-mini">
                                <div className="d-flex justify-content-between">
                                    <h5>Payout:{this.state.today_date}</h5>
                                    <div className="invoice-buttons text-right"> <Link to="#" className="btn btn-primary mr-2">Print</Link>
                                        <Link to="#" className="btn btn-primary">Export</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-panel-body">


                                <div className="row align-items-center">

                                    <div className="col-md-3 payout_details">
                                        <div className="">

                                            <h4>Total</h4>
                                            <h4>£ {this.state.total} {this.state.currency.toUpperCase()}</h4>
                                            {/* <p className="mb-0">Piad</p> */}

                                        </div>
                                    </div>


                                    <div className="col-md-12 text-md-right">
                                        <div className=" table-heading">
                                            <h4>Account Details</h4>
                                        </div>
                                        <div className="ms-invoice-table table-responsive">

                                            <div className="table-wrapper">
                                                <table className="table table-hover text-right">
                                                    <thead>
                                                        <tr>
                                                            <th className="payout-summary__table-header type--right"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr><th>Type</th>
                                                            {<td> {this.state.type}</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Created Date</th>
                                                            {<td> {this.state.today_date}</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Origin</th>
                                                            {<td>united Kingdom</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Payout Id</th>
                                                            <td>{this.state.payout_id}</td>

                                                        </tr>

                                                    </tbody>
                                                    <tbody data-bind-show="showRetriedPayouts" className="hide">
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="table-wrapper">
                                                <div className=" table-heading">
                                                    <h4>Summary</h4>
                                                </div>
                                                <table className="table table-hover text-right">
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th className="payout-summary__table-header type--right">Count</th>
                                                            <th className="payout-summary__table-header type--right">Gross</th>
                                                            <th className="payout-summary__table-header type--right">Fees</th>
                                                            <th className="payout-summary__table-header type--right">Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th>Charges</th>
                                                            {this.state.payout_summary ? <td>{this.state.payout_summary.charges.count}</td> : <td>{this.state.charges.count}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.charges.gross}</td> : <td>£ {this.state.charges.gross}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.charges.fee}</td> : <td>£ {this.state.charges.fees}</td>}
                                                            {this.state.payout_summary ? <td>£{this.state.payout_summary.charges.total}</td> : <td>£ {this.state.charges.total}</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Refunds</th>
                                                            {this.state.payout_summary ? <td> {this.state.payout_summary.refunds.count}</td> : <td> {this.state.refunds.count}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.refunds.gross}</td> : <td>£ {this.state.refunds.gross}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.refunds.fee}</td> : <td>£ {this.state.refunds.fees}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.refunds.total}</td> : <td>£ {this.state.refunds.total}</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Adjustments</th>
                                                            {this.state.payout_summary ? <td> {this.state.payout_summary.adjustments.count}</td> : <td> {this.state.adjustments.count}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.adjustments.gross}</td> : <td>£ {this.state.adjustments.gross}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.adjustments.fee}</td> : <td>£ {this.state.adjustments.fees}</td>}
                                                            {this.state.payout_summary ? <td>£ {this.state.payout_summary.adjustments.total}</td> : <td>£ {this.state.adjustments.total}</td>}
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                             <td>£ {this.state.total}</td>
                                                        </tr>

                                                    </tbody>
                                                    <tbody data-bind-show="showRetriedPayouts" className="hide">
                                                    </tbody>
                                                </table>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <div className="ms-invoice-table table-responsive mt-5">
                                    <DataTable title="Transactions"
                                        columns={columns}
                                        data={this.state.payout_transactions}
                                    />
                                    {/* <div className="row" style={{ float: 'right', margin: '25px' }}>
                                        <Pagination currentPage={this.state.current_page} total_pages={this.state.total_pages} handleChange={this.props.changeCurrentPage} />
                                    </div>
                                    <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.state.total_elements}</div> */}


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Detailcontent;