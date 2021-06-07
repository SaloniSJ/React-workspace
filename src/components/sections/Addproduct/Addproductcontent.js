import React, { Component } from 'react';

import { toast } from 'react-toastify';
import '../../../assets/css/image.css';
import ItemForm from './ItemForm'
import * as addItem from '../../../assets/img/costic/add-product-1.jpg'
import * as ItemServiceAPI from '../../../services/product/item/ItemServiceAPI';
import ImageCropper from '../../../shared/Cropper/ImageCropper'
import Breadcrumb from './Breadcrumb';


class Addproductcontent extends Component {

    state = {
        file: null,
        category_id: '',
        item_identifier: '',
        item_description: '',
        quantity: 1000,
        item_cost: 0,
        item_status: true,
        item_id: '',
        is_discountable: false,
        item_update: false,
        menu_id: '',
        imagesPreviewUrl:null,
        item_image: addItem,
        item_sort_order: 1,
        is_take_away_active: true,
        is_dine_in_active: true,
        is_delivery_active: true,
        is_buffet: false,
        is_delivery_to_park_active: true,

        showItemCropper: false,
        itemCropperLoader:false,
    }

    componentDidMount = () => {
        this.setState({
            category_id: this.props.match.params.category_id, menu_id: this.props.match.params.menu_id,
            is_buffet: this.props.match.params.is_buffet
        })
        if (this.props.match.params.item_id) {
            this.setState({ item_id: this.props.match.params.item_id })
            ItemServiceAPI.fetchItemByItemId(this.props.match.params.item_id).then(response => {
                if (response.data.status) {
                    this.setState({
                        item_update: true,
                        item_identifier: response.data.data.item_identifier,
                        item_description: response.data.data.item_description,
                        quantity: response.data.data.quantity,
                        item_cost: response.data.data.item_cost,
                        item_sort_order: response.data.data.item_sort_order,

                        item_id: response.data.data.item_id,
                        category_id: response.data.data.category_id,
                        is_discountable: this.state.is_discountable,
                        item_image: response.data.data.item_image,
                        is_take_away_active: response.data.data.is_take_away_active,
                        is_dine_in_active: response.data.data.is_dine_in_active,
                        is_delivery_active: response.data.data.is_delivery_active,
                        is_delivery_to_park_active: response.data.data.is_delivery_to_park_active
                    })
                    if (response.data.data.item_status === "UNAVAILABLE") {
                        this.setState({ item_status: false, })
                    } else {
                        this.setState({ item_status: true, })
                    }
                } else {
                    toast.warn(response.data.message)
                }
            }).catch(error => {
                toast.warn('Oops!! Something went wrong, Please try again later.')
            })
        }
    }

    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImageChange = file => {
        console.log(file)
        this.setState({itemCropperLoader:true})
        // const files = Array.from(file);
        // files.forEach((file, i) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagesPreviewUrl: reader.result,
                    showItemCropper:false,
                    itemCropperLoader:false
                });
            };
            reader.readAsDataURL(file);
            this.setState({itemCropperLoader:false})
        console.log(this.state.imagesPreviewUrl )
        // this.toggleHandler('showItemCropper');

    }

    addItemHandler = value => {
        const payload = {
            file: this.state.file,
            category_id: this.state.category_id,
            item_identifier: value.name,
            item_description: value.description,
            quantity: value.quantity,
            item_cost: value.cost,
            item_sort_order: value.sort_order,
            item_status: this.state.item_status,
            is_discountable: this.state.is_discountable,
            is_take_away_active: this.state.is_take_away_active,
            is_dine_in_active: this.state.is_dine_in_active,
            is_delivery_active: this.state.is_delivery_active,
            is_delivery_to_park_active: this.state.is_delivery_to_park_active
        }

        let formData = new FormData();
        formData.append('item_details', JSON.stringify(payload))
        formData.append('item_image', this.state.file)

        ItemServiceAPI.addItem(formData).then(response => {

            if (response.data.status) {

                this.setState({
                    item_identifier: '',
                    item_description: '',
                    quantity: '',
                    item_cost: '',
                    item_status: false,
                    is_discountable: false,
                    file: null,
                    imagePreviewUrl: null,
                    item_sort_order: '',

                })
                this.props.history.push(`/menu-grid/${this.state.category_id}`);
                toast.success('Item added Successfully!!')
            } else {
                toast.warn(response.data.message)
                this.setState({
                    item_identifier: '',
                    item_description: '',
                    quantity: '',
                    item_cost: '',
                    item_status: false,
                    is_discountable: false,
                    imagePreviewUrl: null,
                    item_sort_order: '',

                })
            }
        }).catch(error => {
            toast.warn('Oops!! Something went wrong, Please try again later.')
        })

    }

    updateItemHandler = (value) => {
        // e.preventDefault();
        let formData = new FormData();

        if (this.state.file === null) {
            const payload = {
                item_id: this.state.item_id,
                item_identifier: value.name,
                item_description: value.description,
                quantity: value.quantity,
                item_cost: value.cost,
                item_status: this.state.item_status,
                is_discountable: this.state.is_discountable,
                item_sort_order: value.sort_order,
                is_take_away_active: this.state.is_take_away_active,
                is_dine_in_active: this.state.is_dine_in_active,
                is_delivery_active: this.state.is_delivery_active,
                is_delivery_to_park_active: this.state.is_delivery_to_park_active
            }

            formData.append('item_details', JSON.stringify(payload))

        } else {
            const payload = {
                file: this.state.file,
                item_id: this.state.item_id,
                item_identifier: value.name,
                item_description: value.description,
                quantity: value.quantity,
                item_cost: value.cost,
                item_status: this.state.item_status,
                is_discountable: this.state.is_discountable,
                item_sort_order: value.sort_order,
                is_take_away_active: this.state.is_take_away_active,
                is_dine_in_active: this.state.is_dine_in_active,
                is_delivery_active: this.state.is_delivery_active,
                is_delivery_to_park_active: this.state.is_delivery_to_park_active
            }

            formData.append('item_details', JSON.stringify(payload))
            formData.append('item_image', this.state.file)
        }
        ItemServiceAPI.updateItem(formData).then(response => {

            if (response.data.status) {

                this.setState({
                    item_identifier: '',
                    item_description: '',
                    quantity: '',
                    item_cost: '',
                    item_status: false,
                    is_discountable: false,
                    file: null,
                    imagePreviewUrl: null,
                    item_sort_order: ''
                })
                this.props.history.push(`/menu-grid/${this.state.category_id}`);
                toast.success('Item updated Successfully!!')
            } else {
                toast.warn(response.data.message)
            }
        }).catch(error => {
            toast.warn('Oops!! Something went wrong, Please try again later.')
        })

    }

    discountItemHandler = e => {
        this.setState({
            is_discountable: !this.state.is_discountable
        })
    }

    statusItemHandler = e => {
        this.setState({
            item_status: !this.state.item_status
        })
    }

    toggleHandler = (current) => {
        console.log(current)
        this.setState({
            [current]: !this.state[current],
        });
    }

    render() {

        return (
            <div className="ms-content-wrapper">


                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb state={this.state} item={this.props.match.params.item_id} menu_id={this.props.match.params.menu_id} category_id={this.props.match.params.category_id} />
                    </div>
                </div>
                <ItemForm state={this.state} addItemHandler={this.addItemHandler} updateItemHandler={this.updateItemHandler}
                    handleImageChange={this.handleImageChange} toggleHandler={this.toggleHandler} discountItemHandler={this.discountItemHandler} statusItemHandler={this.statusItemHandler} onChangeHandler={this.onChangeHandler} />

                <ImageCropper show={this.state.showItemCropper}
                    loading={this.state.itemCropperLoader}
                    uploadImageHandler={this.handleImageChange}
                    modalChange={()=>this.toggleHandler('showItemCropper')} />
            </div>

        );
    }
}

export default Addproductcontent;