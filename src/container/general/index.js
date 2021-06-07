import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI';
import Content from './Content';
import SimpleModal from '../../shared/Modal/SimpleModal'

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

export default class index extends Component {

    state = {
        property_name: '',
        property_trading_name: '',
        property_country_code: '',
        business_type: '',
        property_address: '',
        property_city: '',
        contact_name: '',
        contact_number: '',
        property_country: '',
        loading: false,
        postal_code: '',
        logo_image: '',
        logo_preview_url: null,
        cover_image: [],
        cover_preview_url: null,
        file: null,
        business_types: [],
        files: [null],
        main_image: null,
        cost_estimation: '100',
        parking_details: '',
        applicationFeeType: '',
        hasCoverImage: false,
        no_of_people: '2',
        rating: '',
        property_status: '',
        is_take_away_active: true,
        is_dine_in_active: true,
        is_table_reservation_active: true,
        is_business_type_not_editable: false,
        is_delivery_to_park: false,
        excerpt: '',
        description: '',
        show: false,
        crop: {
            x: 130,
            y: 50,
            width: 200,
            height: 200,
            aspect: 16 / 9,
        }

    }
    fileArray = [];
    fileObj = null;

    componentDidMount = () => {
        const username = localStorage.getItem('username')
        this.setState({ username: username })
        SecurityServiceAPI.fetchBusinessType().then(response => {
            if (response.data.status) {
                this.setState({ business_types: response.data.data.business_types })
            }
        })
        this.fetchBusinessPlace(username)
    }

    fetchBusinessPlace = (username) => {
        SecurityServiceAPI.fetchBusinessPlace(username).then(response => {
            if (response.data.status) {
                console.log(response)
                const property_summary_details = response.data.data.property_details[0].property_summary_details;
                if (property_summary_details) {
                    this.setState({
                        cost_estimation: property_summary_details.cost_estimation,
                        parking_details: property_summary_details.parking_details,
                        no_of_people: property_summary_details.number_of_person
                    })
                }
                if (response.data.data.property_details[0].business_type) {
                    this.setState({ is_business_type_not_editable: true })
                }
                this.setState({
                    property_name: response.data.data.property_details[0].property_name,
                    property_trading_name: response.data.data.property_details[0].property_trading_name,
                    business_type: response.data.data.property_details[0].business_type,
                    property_address: response.data.data.property_details[0].property_address,
                    property_country: response.data.data.property_details[0].country,
                    property_country_code: response.data.data.property_details[0].country_code,
                    currency_code: response.data.data.property_details[0].currency_code,
                    property_city: response.data.data.property_details[0].city,
                    contact_name: response.data.data.property_details[0].contact_name,
                    contact_number: response.data.data.property_details[0].contact_number,
                    rating: response.data.data.property_details[0].rating,
                    postal_code: response.data.data.property_details[0].postal_code,
                    property_status: response.data.data.property_details[0].property_status,
                    logo_image: response.data.data.property_details[0].logo_image,
                    applicationFeeType: response.data.data.property_details[0].application_fee_value,
                    cover_images: response.data.data.property_details[0].cover_images,
                    is_take_away_active: response.data.data.property_details[0].is_take_away_active,
                    is_dine_in_active: response.data.data.property_details[0].is_dine_in_active,
                    is_table_reservation_active: response.data.data.property_details[0].is_table_reservation_active,
                    excerpt: response.data.data.property_details[0].excerpt,
                    description: response.data.data.property_details[0].description,
                    is_delivery_to_park: response.data.data.property_details[0].is_delivery_to_park
                })
            }
        })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleHandler = (current) => {
        console.log(current)
        this.setState({
            [current]: !this.state[current],
        });
    }

    handleOnChange = value => {
        this.setState({
            contact_number: '+' + value,
        });
    };

    handleLogoImageChange = e => {
        e.preventDefault();
        // FileList to Array
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    logo_preview_url: reader.result,
                    show:true
                });
            };
           
            toast.info('Please click on Update Business Profile to upload logo image.')
            reader.readAsDataURL(file);
        });
    }

    handleMultipleImageChange = e => {
        e.preventDefault();
        this.fileObj = []

        // FileList to Array
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            this.fileArray.push(file)
            const multipleImageReader = new FileReader();

            multipleImageReader.onloadend = () => {
                this.fileObj.push(multipleImageReader.result)
                this.setState({
                    files: file,
                    hasCoverImage: true
                });
            };

            multipleImageReader.readAsDataURL(file);
        });
        toast.info('Please click on Update Business Profile to upload cover images.')
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const property = JSON.parse(localStorage.getItem('property_details'))
        const property_summary_details = {
            parking_details: this.state.parking_details,
            cost_estimation: this.state.cost_estimation,
            number_of_person: this.state.no_of_people,
        }
        const businessPlaceForm = {
            property_name: this.state.property_name,
            property_trading_name: this.state.property_trading_name,
            property_country_code: this.state.property_country_code,
            business_type: this.state.business_type,
            property_address: this.state.property_address,
            property_country: this.state.property_country,
            currency_code: this.state.currency_code,
            property_city: this.state.property_city,
            contact_name: this.state.contact_name,
            contact_number: this.state.contact_number,
            postal_code: (this.state.postal_code).replace(/ /g, ''),
            property_rating: this.state.rating,
            property_id: property.property_id,
            username: this.state.username,
            property_summary_details: property_summary_details,
            property_status: this.state.property_status,
            is_take_away_active: this.state.is_take_away_active,
            is_dine_in_active: this.state.is_dine_in_active,
            is_table_reservation_active: this.state.is_table_reservation_active,
            excerpt: this.state.excerpt,
            description: this.state.description,
            is_delivery_to_park: this.state.is_delivery_to_park

        }
        console.log(businessPlaceForm)
        let formData = new FormData();
        if (this.state.file == null) {
            formData.append('property_details ', JSON.stringify(businessPlaceForm))
        } else {
            formData.append('logo_image', this.state.file)
            formData.append('property_details ', JSON.stringify(businessPlaceForm))
        }
        if (this.state.hasCoverImage) {
            for (let i = 0; i < this.fileArray.length; i++) {
                formData.append("cover_image", this.fileArray[i]);
            }
        }


        SecurityServiceAPI.updateBusinessPlace(formData).then(response => {
            if (response.data.status) {
                console.log(response)
                // this.fetchBusinessPlace(this.state.username)
                const property_summary_details = response.data.data.property_details[0].property_summary_details;
                if (property_summary_details) {
                    this.setState({
                        cost_estimation: property_summary_details.cost_estimation,
                        parking_details: property_summary_details.parking_details,
                        no_of_people: property_summary_details.number_of_person
                    })
                }
                if (response.data.data.property_details[0].business_type) {
                    this.setState({ is_business_type_not_editable: true })
                }
                this.setState({
                    property_name: response.data.data.property_details[0].property_name,
                    property_trading_name: response.data.data.property_details[0].property_trading_name,
                    business_type: response.data.data.property_details[0].business_type,
                    property_address: response.data.data.property_details[0].property_address,
                    property_country: response.data.data.property_details[0].country,
                    property_country_code: response.data.data.property_details[0].country_code,
                    currency_code: response.data.data.property_details[0].currency_code,
                    property_city: response.data.data.property_details[0].city,
                    contact_name: response.data.data.property_details[0].contact_name,
                    contact_number: response.data.data.property_details[0].contact_number,
                    rating: response.data.data.property_details[0].rating,
                    postal_code: response.data.data.property_details[0].postal_code,
                    property_status: response.data.data.property_details[0].property_status,
                    logo_image: response.data.data.property_details[0].logo_image,
                    applicationFeeType: response.data.data.property_details[0].application_fee_value,
                    cover_images: response.data.data.property_details[0].cover_images,
                    is_take_away_active: response.data.data.property_details[0].is_take_away_active,
                    is_dine_in_active: response.data.data.property_details[0].is_dine_in_active,
                    is_table_reservation_active: response.data.data.property_details[0].is_table_reservation_active,
                    excerpt: response.data.data.property_details[0].excerpt,
                    description: response.data.data.property_details[0].description,
                    is_delivery_to_park: response.data.data.property_details[0].is_delivery_to_park
                })
                toast.success('Business place updated successfully');
                this.setState({ loading: false })
            } else {
                toast.warn(response.data.message)
                this.setState({
                    loading: false,
                })
            }
        }).catch(error => {
            console.log('Update business profile ===> ', error)
            toast.error('Oops!! Something went wrong.')
            this.setState({
                loading: false,
            })
        })
    }

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    handleOnCrop = (crop) => {
        console.log(crop);
        this.setState({ crop })
        console.log(this.state)
    }

    onImageLoaded = image => {
        console.log('onCropComplete', image)
    }

    onCropComplete = (crop, pixelCrop) => {
        console.log('onCropComplete', crop, pixelCrop)
        const canvasRef=this.imagesrc.current

    }

    render() {

        return (
            <Fragment>

                <Content state={this.state} handleLogoImageChange={this.handleLogoImageChange}
                    handleMultipleImageChange={this.handleMultipleImageChange}
                    toggleHandler={this.toggleHandler} fileArray={this.fileArray}
                    fileObj={this.fileObj} handleOnChange={this.handleOnChange}
                    handleModal={this.handleModal}
                    onSubmitHandler={this.onSubmitHandler} onChangeHandler={this.onChangeHandler} />

                {/* <SimpleModal
                    state={this.state}
                    extraLarge
                    handleClose={this.handleModal}
                    Heading="CROPPER">
                    <div>
                        <ReactCrop
                            crop={this.state.crop}
                            src={this.state.logo_preview_url}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.handleOnCrop}
                        />
                        <canvas ref={this.imagesrc}></canvas>
                    </div>
                </SimpleModal> */}

            </Fragment>
        )
    }
}
