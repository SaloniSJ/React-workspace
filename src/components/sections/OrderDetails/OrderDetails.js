import React, { Component, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as customerimg from '../../../assets/img/annonymous-user-images.jpg';
import * as OrderServiceAPI from '../../../services/order/OrderServiceAPI';
import CommonModal from '../../../shared/Modal/CommonModal';
import Pagination from '../../../shared/Pagination/Pagination';
import Breadcrumb from './Breadcrumb';
import CustomStepper from './Stepper';
import ItemStepper from './ItemStepper';

class Detailcontent extends Component {
    state = {
        data: '',
        order_Details: [],
        profileImagePreviewUrl: customerimg,
        profile_image_url: '',
        order_messages: [],
        order_status: '',
        user_username: '',
        show: false,
        loading: false,
        order_id: '',
        item_status: '',

        current_page: 0,
        number_of_elements: 10,
        page_size: 10,
        total_elements: 0,
        total_pages: 0,

    }
    componentDidMount = () => {
        console.log('third')
        const order = this.props.history.location.state.order;
        this.setState({ username: localStorage.getItem('username'), order_id: order.order_id, })
        const payload = {
            order_id: order.order_id,
            page: 0,
            size: 5
        }
        this.fetchOrderDetailsByOrderId(payload);
    }

    fetchOrderDetailsByOrderId = (payload) => {
        console.log("Fetch Order by Order Id :: ", payload)
        OrderServiceAPI.fetchOrderDetailsByOrderId(payload).then(response => {
            if (response.data.status) {
                console.log(response)
                if (response.data.data) {
                    this.setState({
                        data: response.data.data,
                        order_Details: response.data.data.order_Details[0],
                        user_username: response.data.data.username,
                        profile_image_url: response.data.data.customer_profile_photo
                    })
                    if (response.data.data.order_status === 'ORDER PLACED') this.setState({ current_step: 0 })
                    if (response.data.data.order_status === 'PREPARING') this.setState({ current_step: 1 })
                    if (response.data.data.order_status === 'PARTIALLY SERVED') this.setState({ current_step: 2 })
                    if (response.data.data.order_status === 'FULLY SERVED') this.setState({ current_step: 3 })
                }

            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Oops !! Something went wrong')
        })
    }

    pushOrderNotificationToUser = () => {
        this.setState({ loading: true })
        const payload = {
            message: this.state.order_status,
            username: this.state.user_username,
            order_id: this.state.order_id
        }
        console.log(payload)
        OrderServiceAPI.pushOrderNotificationToUser(payload).then(response => {
            if (response.data.status) {
                console.log(response)
                this.setState({ loading: false, show: false })
                toast.success('Message sent successfully!!')
            } else {
                toast.error(response.data.message)
                this.setState({ loading: false })
            }
        }).catch(error => {
            this.setState({ loading: false, show: false })
        })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeCurrentPage = (event, value) => {
        event.preventDefault();
        const page = value - 1;
        this.setState({ currentPage: value });
        const payload = {
            page: page,
            size: this.state.number_of_elements,
            property_id: this.state.property_id
        }
        this.fetchAllOrders(payload);
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({ number_of_elements: parseInt(event.target.value, 10) });
    };



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
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                    pointer: 'cursor'
                },
            },
        };

        const data = [{
            name: "Item Name",
            selector: "item_name",
            sortable: true,
        },
        {
            name: "Quantity",
            selector: "quantity",
            sortable: true,
            width: 200
        },
        {
            name: "Sub Total",
            selector: "sub_total",
            sortable: true,
        },
        {
            name: "Status",
            selector: "status",
            sortable: true,
            width: 100
        },

        ]

        const ExpandableComponent = ({ data }) => <ItemStepper order={this.props.history.location.state.order} order_status={this.state.order_status} 
        getSteps={this.getItemSteps} fetchOrderDetailsByOrderId={this.fetchOrderDetailsByOrderId} />;
        return (

            <Fragment>
                <p>{console.log('second')}</p>
                <Breadcrumb />

                <div className="ms-panel">
                    <div className="ms-panel-header header-mini">
                        <div className="d-flex justify-content-between">
                            <h3>Order Details</h3>
                            <div className="invoice-buttons text-right">

                                <Link to="#" className="btn btn-primary mr-2">Print</Link>
                                <Link to="#" className="btn btn-primary">Export</Link>
                            </div>
                        </div>
                    </div>

                    <div className="ms-panel-body">

                        <div className="row align-items-center">

                            <div className="col-md-6 payout_details">
                                <div className="">
                                    {this.state.profile_image_url ? <img className="ms-profile-img" src={this.state.profile_image_url} alt="people" /> : <img className="ms-profile-img" src={this.state.profileImagePreviewUrl} alt="people" />}


                                </div>
                            </div>
                            <div className="col-md-6 text-md-right">
                                <div className="ms-invoice-table table-responsive">
                                    <div className="table-wrapper">
                                        <table className="table table-hover text-right">

                                            <tbody>
                                                <tr>
                                                    <th>Name </th>
                                                    <td>{this.state.data.customer_name}</td>

                                                </tr>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <td>{this.state.data.order_id}</td>

                                                </tr>
                                                <tr>
                                                    <th>Date & Time</th>
                                                    <td>{this.state.order_Details.order_date_time}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Items</th>
                                                    <td>{this.state.data.total_elements}</td>
                                                </tr>
                                            </tbody>
                                            <tbody data-bind-show="showRetriedPayouts" className="hide">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 payout_details"></div>
                            <div className="col-md-8 text-md-right">
                                <CustomStepper order={this.props.history.location.state.order} order_status={this.state.order_status} fetchOrderDetailsByOrderId={this.fetchOrderDetailsByOrderId} />
                            </div>
                        </div>


                        <div className="ms-invoice-table table-responsive mt-5">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <DataTable
                                    customStyles={customStyles}
                                    columns={data}
                                    data={this.state.data.order_Details}
                                    expandableRows
                                    expandableRowsComponent={<ExpandableComponent />}
                                />
                                <div className="row" style={{ float: 'right', margin: '25px' }}>
                                    <Pagination currentPage={this.state.current_page} total_pages={this.state.total_pages} number_of_elements={this.state.number_of_elements}
                                        handleChangeRowsPerPage={this.handleChangeRowsPerPage} handleChange={this.changeCurrentPage} />
                                </div>
                                <div style={{ float: 'left', margin: '15px' }}>Total Records : {this.state.total_elements}</div>
                                {/* <MDBDataTable className="thead-primary" striped hover data={data} /> */}
                            </div>


                        </div>


                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary d-block float-right" onClick={this.handleModal}>Send Message</button>
                            </div>
                        </div>



                    </div>
                </div>

                <CommonModal state={this.state} onHide={this.handleModal} Heading="NOTIFY USER" show={this.state.show} handleClose={this.handleModal}>
                    <div>
                        <div className="col-md-12 ">
                            <name htmlFor="validationCustom03">Message</name>
                            <div className="input-group">
                                <input className="form-control" name="order_status" value={this.state.order_status} onChange={this.onChangeHandler} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <button className="btn btn-primary d-block float-right" onClick={this.pushOrderNotificationToUser}>Send Message</button>
                        </div>
                    </div>
                </CommonModal>
            </Fragment>
        );
    }

    getItemSteps() {
        return ['NEW', 'PREPARING ITEM', 'ITEM READY'];
    }

}

export default Detailcontent;