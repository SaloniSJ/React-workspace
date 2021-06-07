import React, { Component, Fragment } from 'react';
import Breadcrumbs from './Breadcrumb';
import { Link } from 'react-router-dom';
import default_img from '../../../assets/img/upload_image.png';
// import MenuModal from '../../../shared/Modal/MenuModal'
import CategoryModal from './CategoryModal'
import * as CategoryServiceAPI from '../../../services/product/category/CategoryServiceAPI'
import { toast } from 'react-toastify';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import Swal from 'sweetalert2'

class index extends Component {

    state = {
        menuboxes: [],
        show: false,
        menu_id: '',
        category_id: '',
        identifier: '',
        description: '',
        imagesPreviewUrl: default_img,
        file: null,
        update_category: false,
        sort_order: 1,
        delete: false,
        is_buffet_category:false,
        is_category:false,
        category_to_be_deleted: '',
        total_selectable_items:0,
        is_buffet:false,
    }

    componentDidMount = () => {
        const id = this.props.match.params.menu_id
        this.setState({ menu_id: id })
        this.fetchAllCategories(id)
    }

    deleteModalShow = (id) => {
        console.log('category_to_be_deleted', id)
        this.setState({
            delete: true,
            category_to_be_deleted: id
        })
    }
    deleteModalClose = () => {
        this.setState({
            delete: false,
            category_to_be_deleted: ''
        })
    }

    removeCategoryHandler = () => {
        CategoryServiceAPI.deleteCategory(this.state.category_to_be_deleted).then(response => {
            if (response.data.status) {
                this.deleteModalClose();
                Swal.fire('Deleted!', 'Your Category has been deleted.', 'success');
                this.fetchAllCategories(this.state.menu_id)
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Oops!! Something went wrong, Please try again later.')

        })
    }

    editCategoryHandler = (category) => {

        this.setState({
            show: true,
            description: category.category_description,
            category_id: category.category_id,
            identifier: category.category_identifier,
            imagesPreviewUrl: category.category_image,
            total_category_count: category.total_category_count,
            sort_order: category.category_sort_order,
            total_selectable_items:category.total_selectable_items,
            update_category: true
        })
    }

    updateCategoryHandler = (value) => {
        let formData = new FormData();
        if (this.state.file === null) {
            formData.append('category_description', value.description)
            formData.append('category_identifier', value.name)
            formData.append('category_sort_order', value.sort_order)
            formData.append('category_id', this.state.category_id)
            formData.append('total_selectable_items',value.total_selectable_items)
        } else {
            formData.append('category_image', this.state.file)
            formData.append('category_description', value.description)
            formData.append('category_identifier', value.name)
            formData.append('category_sort_order', value.sort_order)
            formData.append('category_id', this.state.category_id)
            formData.append('total_selectable_items',value.total_selectable_items)
        }


        CategoryServiceAPI.updateCategory(formData).then(response => {
            if (response.data.status) {
                toast.success('Category updated successfully!!')
                this.setState({ update_category: false, show: false, menuboxes: response.data.data.category_response_bean_list, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
            } else {
                toast.error(response.data.message)
                this.setState({ update_category: false, show: false, description: '', menu_id: '', identifier: '', file: null, total_category_count: '' })
            }
        }).catch(error => {
            this.handleModal()
            this.setState({ show: false, description: '', menu_id: '', identifier: '', file: null, total_category_count: '' })
        })


    }

    fetchAllCategories = (menu_id) => {
        CategoryServiceAPI.fetchCategory(menu_id).then(response => {
            if (response.data.status) {
                console.log(response)
                if (response.data.data) {
                    if(response.data.data.category_response_bean_list){
                        this.setState({menuboxes: response.data.data.category_response_bean_list })
                    }
                    this.setState({is_buffet_category:response.data.data.is_buffet})
                }
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Oops!! Something went wrong, Please try again later.')
        })
    }

    handleModal = (e) => {
        this.setState({
            identifier: '',
            description: '',
            imagesPreviewUrl: default_img,
            show: !this.state.show
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

    addCategoryHandler = (value) => {
        let formData = new FormData();
        formData.append('category_image', this.state.file)
        formData.append('category_description', value.description)
        formData.append('category_identifier', value.name)
        formData.append('category_sort_order', value.sort_order)
        formData.append('menu_id', this.state.menu_id)
        formData.append('total_selectable_items',value.total_selectable_items)
        CategoryServiceAPI.addCategory(formData).then(response => {

            if (response.data.status) {
                toast.success('Category added successfully!!')
                this.setState({ menuboxes: response.data.data.category_response_bean_list, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
                this.handleModal()
            } else {
                toast.error(response.data.message)
                this.handleModal()
            }
        }).catch(error => {
            toast.error('Oops!! Something went wrong, Please try again later.')
            this.handleModal()
        })

    }

    duplicateCategory = (category) => {
        let formData = new FormData();
        formData.append('category_image', category.category_image)
        formData.append('category_description', category.category_description)
        formData.append('category_identifier', category.category_identifier)
        formData.append('category_sort_order', category.category_sort_order)

        CategoryServiceAPI.addCategory(formData).then(response => {

            if (response.data.status) {
                toast.success('Category added successfully!!')
                this.setState({ menuboxes: response.data.data, identifier: '', description: '', imagesPreviewUrl: null, file: null, })
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {
            toast.error('Oops!! Something went wrong, Please try again later.')
        })

    }

    render() {
        const { menuboxes } = this.state
        return (
            <Fragment>
                <div className="ms-content-wrapper box product_page">
                    <div className="row">
                        <div className="col-md-10">
                            <Breadcrumbs />
                        </div>
                        <div className="col-md-2">
                            <button type="button" style={{ float: 'right' }} onClick={this.handleModal} className="btn btn-primary">Add Category</button>
                        </div>
                        {(menuboxes || []).map((category, i) => (
                            <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                <div className="ms-card">
                                    <div className="ms-card-img">
                                        <img src={category.category_image} alt="card_img" />
                                    </div>
                                    <div className="ms-card-body ">
                                        <div className="wrapper-new2 ">
                                            <h6>{category.category_identifier}</h6>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h5>{category.category_description}</h5>
                                        </div>
                                        <div className="wrapper-new2 ">
                                            <h6>Total Items</h6>
                                            <span className="white">{category.total_item_count}</span>
                                        </div>
                                        {this.state.is_buffet_category ? <div className="wrapper-new2 ">
                                            <h6>Total Selectable Items</h6>
                                            <span className="white">{category.total_selectable_items}</span>
                                        </div> : null}
                                       
                                        <div className="wrapper-new2 ">
                                            <h6>Sort Order</h6>
                                            <span className="white">{category.category_sort_order}</span>
                                        </div>
                                        <div className="new mb-0">
                                            <button type="button" onClick={() => this.deleteModalShow(category.category_id)} className="btn grid-btn mt-0 btn-sm btn-square btn-danger">Remove</button>
                                            <button type="button" onClick={() => this.editCategoryHandler(category)} className="btn grid-btn mt-0 btn-sm  btn-square btn-primary">Edit</button>
                                        </div>

                                        {/* <div className="new mb-0">
                                            
                                            <span><button type="button" onClick={()=>this.removeCategoryHandler(category.category_id)} className="bbtn grid-btn mt-0 btn-sm btn-square btn-danger">Remove</button> </span>
                                            <span><button type="button" onClick={() => this.editCategoryHandler(category)} className="btn grid-btn mt-0 btn-success">Edit</button></span>
                                        </div> */}
                                        <Link to={`/menuGrid/${this.state.menu_id}/${category.category_id}`} className="btn btn-primary btn-md btn-block">View</Link>

                                        {/* <div className="new mb-0">
                                            <button type="button" onClick={()=>this.duplicateCategory(category)} className="btn btn-primary btn-md btn-block">Duplicate Category</button>
                                        </div> */}
                                        <SweetAlert
                                            show={this.state.delete}
                                            title="Delete"
                                            html
                                            text="Do you want to delete ?"
                                            type='error'
                                            onConfirm={this.removeCategoryHandler}
                                            onCancel={this.deleteModalClose}
                                            showCancelButton={true}
                                            showLoaderOnConfirm={true}
                                            confirmButtonText="Delete"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-xl-12 col-md-12">
                            <div className="load">
                                <i className="fas fa-redo alt  space text-muted" aria-hidden="true" /><span className="more">Load More</span>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.update_category ? <CategoryModal state={this.state} onClickHandler={this.updateCategoryHandler} handleModal={this.handleModal} title="Update Category" handleImageChange={this.handleImageChange} />
                    : <CategoryModal state={this.state} onClickHandler={this.addCategoryHandler} handleModal={this.handleModal} title="Add Category" handleImageChange={this.handleImageChange} />

                }

            </Fragment>

        );
    }
}

export default index;