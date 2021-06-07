import React, { Component } from 'react';

import Pagination from '../../../shared/Pagination/Pagination';
import DataTable from 'react-data-table-component';

class Recentorder extends Component {


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
        const order_list_columns = [
            {
                name: 'Order Number',
                selector:'order_number',
                sortable: true,
            },
            {
                name: 'Cutomer Name',
                selector: 'customer_name',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Date and Time',
                selector: 'order_date_time',
                sortable: true,
            },
            {
                name: 'Delivery Time',
                selector: 'handover_time',
                sortable: true,
            },
            {
                name: 'Order Type',
                selector: 'order_type',
                sortable: true,
            },
            {
                name: 'Total',
                selector: 'sub_total',
                sortable: true,
                cell: row => <div><div >£{row.sub_total}</div></div>
                
            },{
                name: 'Actions',
                sortable: true,
                cell: row => <div><div>
                    <i className="fas far fa-eye text-secondary text-success" onClick={() => this.props.fetchOrderDetailsByOrderId(row)} style={{ marginLeft: '25px', cursor: 'pointer', fontSize: '15px' }} />
                    {/* <i className="fas fa-pencil-alt text-secondary" /> */}
                    {/* <i className="far fa-trash-alt ms-text-danger" onClick={() => this.rejectTableRequest(row)} style={{ marginRight: '15px', cursor: 'pointer', fontSize: '15px' }} /> */}
                    </div></div>
            }];
        return (
            <div className="table-responsive">
                <div className="col-xl-12 col-md-6 col-sm-6">
                    <DataTable
                    title="Today's Order"
                        columns={order_list_columns}
                        data={this.props.state.order_details}
                        customStyles={customStyles}
                    />
                    <div className="row" style={{ float: 'right', margin: '25px' }}>
                        <Pagination currentPage={this.props.state.current_page} total_pages={this.props.state.total_pages} handleChange={this.props.changeCurrentPage} />
                    </div>
                    <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.props.state.total_elements}</div>
                </div>
            </div>
        );
    }
}

export default Recentorder;