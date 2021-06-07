import React, { Component, Fragment } from 'react';
import { Carousel } from 'react-bootstrap';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Breadcrumb from './Breadcrumb';
import './style.css';
import { FlapperSpinner } from "react-spinners-kit";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'

export default class Content extends Component {

    render() {
        
        return (
            <Fragment>
                <div className="Dashboard general_setting_page">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    <div className="ms-content-wrapper">
                        {this.props.state.loading ?
                            <FlapperSpinner size={75} color="#233cad" loading={this.props.state.loading} /> :
                            <div className="row">


                                <div className="col-xl-6 col-md-12">
                                    <div className="ms-panel ms-panel-fh">
                                        <div className="ms-panel-header">
                                            <h6>Business Info</h6>
                                        </div>
                                        <div className="ms-panel-body">
                                            <form onSubmit={this.props.onSubmitHandler} className="needs-validation clearfix" noValidate>

                                                <div className="form-row">
                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom01">Business Name</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom01"
                                                                name="property_name"
                                                                placeholder="Property name"
                                                                value={this.props.state.property_name}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom04">Business Trading Name</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom04"
                                                                placeholder="Property trading name"
                                                                name="property_trading_name"
                                                                value={this.props.state.property_trading_name}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <label htmlFor="validationCustom02">Business Address</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom02"
                                                                placeholder="First Line"
                                                                name="property_address"
                                                                value={this.props.state.property_address}
                                                                onChange={this.props.onChangeHandler}
                                                                required />

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-row">

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Postal Code</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="postal_code"
                                                                placeholder="123456"
                                                                value={this.props.state.postal_code}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">City</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="property_city"
                                                                placeholder="City"
                                                                value={this.props.state.property_city}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom04">Country</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="property_country"
                                                                value={this.props.state.property_country}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Currency</label>

                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="currency_code"
                                                                value={this.props.state.currency_code}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom03">Business Type</label>
                                                        <div className="input-group">
                                                            <select className="form-control" id="validationCustom05" disabled={this.props.state.is_business_type_not_editable} name="business_type" value={this.props.state.business_type} onChange={this.props.onChangeHandler}>
                                                                {this.props.state.business_types.map(businessType =>

                                                                    <option key={businessType} value={businessType}>{businessType}</option>
                                                                )}
                                                                <option value="">Select</option>
                                                            </select>
                                                        </div>
                                                    </div>


                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Contact Name</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="contact_name"
                                                                placeholder="Contact name"
                                                                value={this.props.state.contact_name}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Contact Number</label>

                                                        <div className="input-group">
                                                            <ReactPhoneInput
                                                                inputExtraProps={{
                                                                    name: 'contact_number',
                                                                    required: true,
                                                                    autoFocus: false,
                                                                }}
                                                                inputStyle={{ width: '14em' }}
                                                                searchPlaceholder="Search Country Code"
                                                                enableSearchField
                                                                country="gb"
                                                                placeholder="9090909090"
                                                                name="contact_number"
                                                                value={this.props.state.contact_number}
                                                                onChange={this.props.handleOnChange}
                                                            />

                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Parking Availabity</label>
                                                        <div className="input-group">
                                                            <select className="form-control" name="parking_details" value={this.props.state.parking_details}
                                                                onChange={this.props.onChangeHandler}>
                                                                <option value="">Select</option>
                                                                <option value="Parking Available">Yes</option>
                                                                <option value="No Parking Available">No</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Cost Approx</label>
                                                        <div className="input-group">
                                                            <div className="input-group-append"> <span className="input-group-text"> £ </span></div>
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="cost_estimation"
                                                                placeholder="100"
                                                                value={this.props.state.cost_estimation}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">No Of People</label>
                                                        <div className="input-group">
                                                            <input type="text"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="no_of_people"
                                                                placeholder="2"
                                                                value={this.props.state.no_of_people}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Application Fee</label>
                                                        <div className="input-group">
                                                            <input type="text" disabled
                                                                className="form-control"
                                                                value={this.props.state.applicationFeeType}
                                                                required />
                                                            <div className="input-group-append"> <span className="input-group-text">%</span></div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <label htmlFor="validationCustom05">Rating</label>
                                                        <div className="input-group">
                                                            <input type="number"
                                                                className="form-control"
                                                                id="validationCustom05"
                                                                name="rating"
                                                                placeholder="2"
                                                                min='1'
                                                                max='5'
                                                                maxLength='1'
                                                                value={this.props.state.rating}
                                                                onChange={this.props.onChangeHandler}
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 ">
                                                        <label htmlFor="validationCustom05">Excerpt</label>
                                                        <div className="input-group">
                                                            <textarea type="text"
                                                                className="form-control"
                                                                name="excerpt"
                                                                row="3"
                                                                value={this.props.state.excerpt}
                                                                onChange={this.props.onChangeHandler}
                                                                required ></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12 ">
                                                        <label htmlFor="validationCustom05">Description</label>
                                                        <div className="input-group">
                                                            <textarea type="text"
                                                                className="form-control"
                                                                name="description"
                                                                row="3"
                                                                value={this.props.state.description}
                                                                onChange={this.props.onChangeHandler}
                                                                required ></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="ms-panel-header new">
                                                            <p className="medium">Take Away</p>
                                                            <div className="col-md-6">
                                                                <label className="ms-switch">
                                                                    <input type="checkbox" name="is_take_away_active" onChange={() => this.props.toggleHandler('is_take_away_active')} checked={this.props.state.is_take_away_active} />
                                                                    <span className="ms-switch-slider round" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="ms-panel-header new">
                                                            <p className="medium">Dine In</p>
                                                            <div className="col-md-6">
                                                                <label className="ms-switch">
                                                                    <input type="checkbox" name="is_dine_in_active" checked={this.props.state.is_dine_in_active}
                                                                        onChange={() => this.props.toggleHandler('is_dine_in_active')} />
                                                                    <span className="ms-switch-slider round" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="ms-panel-header new">
                                                            <p className="medium">Table Reservation</p>
                                                            <div className="col-md-6">
                                                                <label className="ms-switch">
                                                                    <input type="checkbox" name="is_table_reservation_active" onChange={() => this.props.toggleHandler('is_table_reservation_active')} checked={this.props.state.is_table_reservation_active} />
                                                                    <span className="ms-switch-slider round" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="ms-panel-header new">
                                                            <p className="medium">Kayana In Park</p>
                                                            <div className="col-md-6">
                                                                <label className="ms-switch">
                                                                    <input type="checkbox" name="is_delivery_to_park" onChange={() => this.props.toggleHandler('is_delivery_to_park')} checked={this.props.state.is_delivery_to_park} />
                                                                    <span className="ms-switch-slider round" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <button className="btn btn-primary d-block float-right" type="submit">Update Business Profile</button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-xl-6 col-md-12">
                                    <div className="ms-panel ms-panel-fh">
                                        <div className="ms-panel-body">
                                            <h6>Logo</h6>
                                            {this.props.state.logo_preview_url ? <img className="add-product-image" src={this.props.state.logo_preview_url} alt="logo_preview_url" /> : <img src={this.props.state.logo_image} className="add-product-image settting_img" alt="card_img" />}
                                            <button className="btn btn-primary ">Select Logo
                                                    <input className="hide_browse"
                                                    accept=".jpeg,.jpg,.png,.svg"
                                                    type="file"
                                                    name="cover"
                                                    onChange={this.props.handleLogoImageChange}
                                                />
                                            </button>

                                            {/* <ReactCrop
                                                crop={this.state.crop}
                                                src={this.props.state.logo_preview_url}
                                                onImageLoaded={this.onImageLoaded}
                                                onComplete={this.onCropComplete}
                                                onChange={this.handleOnCrop}
                                            /> */}

                                            <h6 className="mt-5">Cover Image</h6>
                                            <Carousel id="imagesSlider" className="ms-image-slider carousel slide" data-ride="carousel" indicators={false}>
                                                {this.props.fileObj ? (this.props.fileObj).map((url, i) => (
                                                    <Carousel.Item key={i}>
                                                        <img className="d-block c_img w-100" src={url} alt="First slide" />
                                                    </Carousel.Item>
                                                )) : ((this.props.state.cover_images || []).map((url, i) =>
                                                    <Carousel.Item key={i}>
                                                        <img className="d-block c_img w-100" src={url} alt="First slide" />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                            <button className="btn btn-primary">Select Cover
                                                    <input className="hide_browse"
                                                    accept=".jpeg,.jpg,.png,.svg"
                                                    type="file"
                                                    name="cover"
                                                    onChange={this.props.handleMultipleImageChange}
                                                    multiple
                                                />
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>}
                    </div>

                </div>
            </Fragment>
        )
    }
}
