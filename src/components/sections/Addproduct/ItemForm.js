import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ItemForm = (props) => {
    const itemModalFormSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is mandatory'),
        description: Yup.string()
            .required('Description is mandatory'),
        quantity: Yup.number()
            .required('Quantity is mandatory'),
        cost: Yup.number()
            .required('Cost is mandatory'),
        sort_order: Yup.number()
            .required('Sort Order is mandatory.')
    });
    console.log(props)
    return (

        <Formik
            initialValues={{
                name: props.state.item_identifier,
                description: props.state.item_description,
                quantity: props.state.quantity,
                cost: props.state.item_cost,
                sort_order: props.state.item_sort_order,
            }}
            enableReinitialize
            validateOnMount
            validationSchema={itemModalFormSchema}
            onSubmit={values => {
                // same shape as initial values
                { props.state.item_update ? props.updateItemHandler(values) : props.addItemHandler(values) }
            }}
        >
            {({ values, errors, status, touched }) => (
                <Form>
                    <p>{console.log(props.is_buffet)}</p>
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="ms-panel ms-panel-fh">
                                <div className="ms-panel-header">
                                    <h6>Add Item Form</h6>
                                </div>

                                <div className="ms-panel-body">

                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom18">Item Name</label>
                                            <Field name="name" type="text" placeholder="Item name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                            <ErrorMessage name="name" className="invalid-feedback" />

                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom24">Quantity</label>
                                            <Field name="quantity" type="number" placeholder="01" className={'form-control' + (errors.quantity && touched.quantity ? ' is-invalid' : '')} />
                                            <ErrorMessage name="quantity" className="invalid-feedback" />

                                        </div>
                                       {props.state.is_buffet==='true'? null: <div className="col-md-6 ">

                                            <label htmlFor="validationCustom25">Price</label>
                                            <div className="input-group-append"> <span className="input-group-text"> £ </span>
                                                <Field name="cost" type="number" placeholder="01" className={'form-control' + (errors.cost && touched.cost ? ' is-invalid' : '')} />
                                                {/* <input type="text" disabled={props.state.isServiceTaxEditable} className="form-control" placeholder="12.5" /> */}


                                                <ErrorMessage name="cost" className="invalid-feedback" />
                                            </div>
                                        </div>}

                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom12">Description</label>
                                            <Field name="description" type="text" as="textarea" rows={5} placeholder="Description" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                            <ErrorMessage name="description" className="invalid-feedback" />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <label htmlFor="validationCustom25">Sort Order</label>
                                            <Field name="sort_order" type="number" placeholder="1" className={'form-control' + (errors.cost && touched.cost ? ' is-invalid' : '')} />

                                            <ErrorMessage name="sort_order" className="invalid-feedback" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="validationCustom12">Crop Item Image</label>
                                            <div className="custom-file">
                                                
                                                <input className="custom-file-input"
                                                    accept=".jpeg,.jpg,.png,.svg"
                                                    id="choose-profile"
                                                    onClick={()=>props.toggleHandler('showItemCropper')}
                                                />
                                                <label className="custom-file-label" htmlFor="validatedCustomFile">Crop Images...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="ms-panel-header new">
                                                <p className="medium">Available for Takeaway</p>
                                                <div>
                                                    <label className="ms-switch">
                                                        <input type="checkbox"
                                                            checked={props.state.is_take_away_active}
                                                            name="is_take_away_active"
                                                            onChange={() => props.toggleHandler('is_take_away_active')} />
                                                        <span className="ms-switch-slider round" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="ms-panel-header new">
                                                <p className="medium">Available for Dine In </p>
                                                <div>
                                                    <label className="ms-switch">
                                                        <input type="checkbox"
                                                            checked={props.state.is_dine_in_active}
                                                            name="is_dine_in_active"
                                                            onChange={() => props.toggleHandler('is_dine_in_active')} />
                                                        <span className="ms-switch-slider round" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="ms-panel-header new">
                                                <p className="medium">Available for Delivery</p>
                                                <div>
                                                    <label className="ms-switch">
                                                        <input type="checkbox"
                                                            checked={props.state.is_delivery_active}
                                                            name="is_delivery_active"
                                                            onChange={() => props.toggleHandler('is_delivery_active')} />
                                                        <span className="ms-switch-slider round" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="ms-panel-header new">
                                                <p className="medium">Kayana In Park</p>
                                                <div>
                                                    <label className="ms-switch">
                                                        <input type="checkbox"
                                                            checked={props.state.is_delivery_to_park_active}
                                                            name="is_delivery_to_park_active"
                                                            onChange={() => props.toggleHandler('is_delivery_to_park_active')} />
                                                        <span className="ms-switch-slider round"/>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="ms-panel">
                                        <div className="ms-panel-header">
                                            <h6>Item </h6>
                                        </div>
                                        <div className="ms-panel-body">
                                            {props.state.imagesPreviewUrl ? <img className="add-product-image" src={props.state.imagesPreviewUrl} alt="First slide" /> : <img className="add-product-image" src={props.state.item_image} alt="First slide" />}
                                        </div>
                                        <div className="ms-panel-header new">
                                            <p className="medium">Status Available</p>
                                            <div>
                                                <label className="ms-switch">
                                                    <input type="checkbox"
                                                        checked={props.state.item_status}
                                                        name="item_status"
                                                        onChange={props.statusItemHandler} />
                                                    <span className="ms-switch-slider round" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="ms-panel-header new">
                                            <Link to={`/menu-grid/${props.state.category_id}`} className="btn btn-primary d-block" type="reset">Cancel</Link>
                                            {props.state.item_update ? <button className="btn btn-secondary d-block">Update</button> : <button className="btn btn-secondary d-block" type="submit">Save</button>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ItemForm