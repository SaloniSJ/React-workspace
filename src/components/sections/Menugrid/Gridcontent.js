import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';
import { Link } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Swal from 'sweetalert2'
import * as ItemServiceAPI from '../../../services/product/item/ItemServiceAPI'
import { toast } from 'react-toastify';

class Gridcontent extends Component {

    state = {
        gridboxes: [],
        category_id: '',
        menu_id: '',
        delete:false,
        item_to_be_deleted:'',
        is_buffet:false,
    }
    componentDidMount = event => {
        const id = this.props.match.params.category_id;
        this.setState({ category_id: id, menu_id: this.props.match.params.menu_id })
        this.fetchAllItem(id)
    }

    deleteModalShow = (id) => {
        console.log(id)
        this.setState({
            delete: true,
            item_to_be_deleted:id
        })
    }
    deleteModalClose = () => {
        this.setState({
            delete: false,
            item_to_be_deleted:''
        })
    }

    removeItemHandler = (id) => {
        console.log(this.state.item_to_be_deleted)
        ItemServiceAPI.deleteItem(this.state.item_to_be_deleted).then(response => {
            if (response.data.status) {
                this.deleteModalClose();
                Swal.fire('Deleted!', 'Your Item has been deleted.', 'success');
                this.fetchAllItem(this.state.category_id)
            } else {
                toast.warn(response.data.message)
            }
        }).catch(error => {
            toast.warn('Oops!! Something went wrong, Please try again later.')
        })
    }

    fetchAllItem = (category_id) => {
        ItemServiceAPI.fetchItem(category_id).then(response => {
            if (response.data.status) {
                if (response.data.data) {
                    this.setState({ is_buffet:response.data.data.is_buffet,gridboxes: response.data.data.item_response_bean_list })
                }
            }else{
                toast.warn(response.data.message)
            }
        }).catch(error => {
            toast.warn('Oops!! Something went wrong, Please try again later.')
        })
    }

    duplicateItem=(item)=>{
        console.log(item)
        ItemServiceAPI.duplicateItem(item.item_id).then(response => {
            if (response.data.status) {
                toast.success('Item Duplicated Successfully !!')
                    this.fetchAllItem(this.state.category_id)
            }else{
                toast.warn(response.data.message)
            }
        }).catch(error => {
            toast.warn('Oops!! Something went wrong, Please try again later.')
        })
    }

    render() {
        const { gridboxes } = this.state
        return (
            <div className="ms-content-wrapper ">
            <div className="row ">
                <div className="col-md-10">
                    <Breadcrumb category_id={this.props.match.params.category_id} menu_id={this.props.match.params.menu_id}/></div>
                    <div className="col-md-2">
                    <Link to={`/addproduct/${this.props.match.params.menu_id}/${this.props.match.params.category_id}/${this.state.is_buffet}`} style={{float:'right'}} className="btn btn-primary btn-md">Add Item</Link>
                    </div>
                    </div>
                    <div className="row product_page">
                        {(gridboxes || []).map((item, i) => (
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card">
                                    <div className="ms-card-img">
                                        <img src={item.item_image} alt="card_img" />
                                    </div>
                                    <div className="ms-card-body ">
                                        <div className="new ">
                                            <h6 className="mb-0">{item.item_identifier}</h6>
                                            <span style={{color:'blue'}}>{item.item_status}</span>
                                        </div>
                                        
                                        <div className="wrapper-new2 ">
                                            <h6>{item.item_description}</h6>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h6>Sort Order</h6>
                                            <span className="white">{item.item_sort_order}</span>
                                        </div>
                                       
                                    
                                        <div className="new meta">
                                            <p>Qty:{item.qyt} </p>
                                            <span className="white">{item.total_items}</span>
                                        </div>
                                        
                                        <p>{item.para}</p>
                                        <div className="new mb-0">
                                            <button type="button" onClick={()=>this.deleteModalShow(item.item_id)} className="btn grid-btn mt-0 btn-sm btn-square btn-danger">Remove</button>
                                            <Link to={`/editProduct/${this.props.match.params.menu_id}/${this.props.match.params.category_id}/${item.item_id}/${this.state.is_buffet}`} className="btn grid-btn mt-0 btn-sm btn-secondary">Edit</Link>
                                        </div>
                                        <div className="new mb-0">
                                            <button type="button" onClick={()=>this.duplicateItem(item)} className="btn btn-primary btn-md btn-block">Duplicate Item</button>
                                        </div>
                                        <SweetAlert
                                                show={this.state.delete}
                                                title="Delete"
                                                html
                                                text="Do you want to delete ?"
                                                type='error'
                                                onConfirm={this.removeItemHandler}
                                                onCancel={this.deleteModalClose}
                                                showCancelButton={true}
                                                showLoaderOnConfirm={true}
                                                confirmButtonText="Delete"
                                            />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           
        );
    }
}

export default Gridcontent;