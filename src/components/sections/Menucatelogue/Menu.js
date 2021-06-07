import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/image.css';
import default_img from '../../../assets/img/upload_image.png';
import * as MenuServiceAPI from '../../../services/product/menu/MenuServiceAPI';
// import MenuModal from '../../../shared/Modal/MenuModal';
import MenuModal from './MenuModal'
import Breadcrumbs from './Breadcrumb';
import './style.css';
import { toast } from 'react-toastify';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Swal from 'sweetalert2'

class Menu extends Component {

    state = {
        menuboxes: [],
        show: false,
        property_id: '',
        menu_id: '',
        total_category_count: '',
        identifier: '',
        description: '',
        imagesPreviewUrl: default_img,
        file: null,
        update_menu: false,
        sort_order: 1,
        delete: false,
        menu_to_be_removed: '',
        is_buffet: false,
        total_cost: 0,
        is_menu:true,
    }

    handleModal = (e) => {
        this.setState({
            name: '', description: '', imagesPreviewUrl: default_img,
            show: !this.state.show
        })
    }

    deleteModalShow = (id) => {
        console.log('Menu id', id)
        this.setState({
            delete: true,
            menu_to_be_removed: id
        })
    }
    deleteModalClose = () => {
        this.setState({
            delete: false,
            menu_to_be_removed: ''
        })
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImageChange = e => {
        e.preventDefault();
        // FileList to Array
        const files = Array.from(e.target.files);
        console.log(e.target.files)
        files.forEach((file, i) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagesPreviewUrl: reader.result,
                });
            };
            reader.readAsDataURL(file);
        });
    }

    toggleHandler = (current) => {
        console.log(current)
        this.setState({
            [current]: !this.state[current],
        });
    }

    componentDidMount = (event) => {
        const property_details = JSON.parse(localStorage.getItem('property_details'))
        if (property_details) { this.setState({ property_id: property_details.property_id }) }
        this.fetchMenuHandler()
    }

    fetchMenuHandler = (event) => {
        const property = JSON.parse(localStorage.getItem('property_details'))
        if (property) {
            MenuServiceAPI.fetchMenu(property.property_id).then(response => {
                if (response.data.status) {
                    if (response.data.data) {
                        this.setState({ menuboxes: response.data.data })
                    }
                } else {
                    toast.error(response.data.message)
                }
            }).catch(error => {
                toast.error('Oops!! Something went wrong, Please try again later.')
            })
        }

    }

    removeMenuHandler = () => {
        console.log(this.state.menu_to_be_removed)
        MenuServiceAPI.deleteMenu(this.state.menu_to_be_removed).then(response => {
            if (response.data.status) {
                this.deleteModalClose();
                Swal.fire('Deleted!', 'Your Menu has been deleted.', 'success');
                this.fetchMenuHandler()
            } else {
                this.deleteModalClose();
                toast.error(response.data.message)
            }
        }).catch(error => {
            this.deleteModalClose();
            toast.error('Oops!! Something went wrong, Please try again later.')
        })
    }

    editMenuHandler = (menu) => {
        console.log("Update Menu==>",menu)
        this.setState({
            show: true,
            description: menu.menu_description,
            menu_id: menu.menu_id,
            identifier: menu.menu_identifier,
            imagesPreviewUrl: menu.menu_image,
            total_category_count: menu.total_category_count,
            sort_order: menu.menu_sort_order,
            update_menu: true,
            is_buffet: menu.is_buffet,
        })
        if(menu.total_cost){
            this.setState({total_cost: menu.total_cost,})
        }
    }

    updateMenuHandler = (value) => {
        console.log('Update Menu==>', value)
        let formData = new FormData();
        if (this.state.file === null) {
            formData.append('menu_description', value.description)
            formData.append('menu_identifier', value.name)
            formData.append('menu_sort_order', value.sort_order)
            formData.append('menu_id', this.state.menu_id)
            formData.append('total_cost', value.total_cost)
            formData.append('is_buffet', this.state.is_buffet)
        } else {
            formData.append('menu_image', this.state.file)
            formData.append('menu_description', value.description)
            formData.append('menu_identifier', value.name)
            formData.append('menu_sort_order', value.sort_order)
            formData.append('menu_id', this.state.menu_id)
            formData.append('total_cost', value.total_cost)
            formData.append('is_buffet', this.state.is_buffet)
        }


        MenuServiceAPI.updateMenu(formData).then(response => {
            if (response.data.status) {
                toast.success('Menu updated successfully!!')
                this.setState({ update_menu: false, show: false, menuboxes: response.data.data, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
            } else {
                toast.error(response.data.message)
                this.setState({ show: false, description: '', menu_id: '', identifier: '', file: null, total_category_count: '' })
            }
        }).catch(error => {
            this.handleModal()
            toast.error('Oops!! Something went wrong, Please try again later.')
            this.setState({ update_menu: false, show: false, description: '', menu_id: '', identifier: '', file: null, total_category_count: '' })
        })


    }

    addMenu = (formData) => {
        MenuServiceAPI.addMenu(formData).then(response => {
            if (response.data.status) {
                toast.success('Menu added sucessfully!!')
                this.setState({ menuboxes: response.data.data, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
                this.handleModal()
            } else {
                this.handleModal()
                toast.error(response.data.message)
            }
        }).catch(error => {
            this.handleModal()
            toast.error('Oops!! Something went wrong, Please try again later.')
        })
    }

    addMenuHandler = (value) => {
        console.log(value)
        let formData = new FormData();
        formData.append('menu_image', this.state.file)
        formData.append('menu_description', value.description)
        formData.append('menu_identifier', value.name)
        formData.append('menu_sort_order', value.sort_order)
        formData.append('property_id', this.state.property_id)
        formData.append('total_cost', value.total_cost)
        formData.append('is_buffet', this.state.is_buffet)
        this.addMenu(formData);
    }

    duplicateMenu = (menu) => {
        console.log("Duplicate Menu===>", menu)

        let formData = new FormData();
        formData.append('menu_image', menu.menu_image)
        formData.append('menu_description', menu.menu_description)
        formData.append('menu_identifier', menu.menu_identifier)
        formData.append('menu_sort_order', menu.menu_sort_order)
        formData.append('property_id', this.state.property_id)
        MenuServiceAPI.addMenu(formData).then(response => {
            if (response.data.status) {
                toast.success('Menu added sucessfully!!')
                this.setState({ menuboxes: response.data.data, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Oops!! Something went wrong, Please try again later.')
        })

    }



    render() {
        return (
            <Fragment>
                <div className="ms-content-wrapper box">
                    <div className="row product_page">
                        <div className="col-md-9">
                            <Breadcrumbs show={this.handleModal} />
                        </div>
                        <div className="col-md-3">
                            <button type="button" style={{ float: 'right' }} onClick={this.handleModal} className="btn grid-btn mt-0 btn-primary">Add Menu</button>
                        </div>

                        {this.state.menuboxes.map((menu, i) => (
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card">
                                    <div className="ms-card-img">
                                        <img src={menu.menu_image} alt="card_img" />
                                    </div>
                                    <div className="ms-card-body ">
                                        <div className="new">
                                            <h6 className="mb-0">{menu.menu_identifier} </h6>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h6>{menu.menu_description}</h6>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h6>Total Categories</h6>
                                            <span className="white">{menu.total_category_count}</span>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h6>Sort Order</h6>
                                            <span className="white">{menu.menu_sort_order}</span>
                                        </div>
                                        <div className="wrapper-new2">
                                            <h6>Buffet</h6>
                                            <span className="white">{menu.is_buffet?'YES':'NO'}</span>
                                            {/* <div className="col-md-12">
                                                <span>
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_buffet" checked={menu.is_buffet} />
                                                        <span className="ms-switch-slider round" />
                                                    </label>
                                                </span>
                                            </div> */}
                                        </div>
                                        {menu.is_buffet ? <div className="wrapper-new2 ">
                                            <h6>Total Cost</h6>
                                            <span className="white">{menu.total_cost}</span>
                                        </div> : null}
                                        <div className="new mb-0">
                                            <button type="button" onClick={() => this.deleteModalShow(menu.menu_id)} className="btn grid-btn mt-0 btn-sm btn-square btn-danger">Remove</button>
                                            <button type="button" onClick={() => this.editMenuHandler(menu)} className="btn grid-btn mt-0 btn-sm  btn-square btn-primary">Edit</button>
                                        </div>
                                        <Link to={`/menu-list/${menu.menu_id}`} className="btn btn-primary btn-md btn-block">View</Link>
                                       
                                        <SweetAlert
                                            show={this.state.delete}
                                            title="Delete"
                                            html
                                            text="Do you want to delete ?"
                                            type='error'
                                            onConfirm={this.removeMenuHandler}
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

                {this.state.update_menu ? <MenuModal state={this.state} onClickHandler={this.updateMenuHandler} handleModal={this.handleModal} title="Update Menu" toggleHandler={this.toggleHandler} handleImageChange={this.handleImageChange} />
                    : <MenuModal state={this.state} onClickHandler={this.addMenuHandler} handleModal={this.handleModal} title="Add Menu" toggleHandler={this.toggleHandler} handleImageChange={this.handleImageChange} />
                }
            </Fragment>
        );
    }
}

export default Menu;