import React, { Fragment } from 'react';
import { Modal } from "react-bootstrap";
import './CategoryModal.css';
import { FlapperSpinner } from "react-spinners-kit";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import * as Schema from '../../../utils/Schema'

const MenuModal = (props) => {
    return (
        <Fragment>
            <Modal className="modal-min" show={props.state.show} onHide={props.handleModal} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <div className="modal-header">
                    <h1>{props.title}</h1>
                    <button type="button" className="close" onClick={props.handleModal}><span aria-hidden="true">×</span></button>
                </div>
                <Modal.Body className="text-center">

                    {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> :
                        <Formik
                            initialValues={{
                                name: props.state.identifier,
                                description: props.state.description,
                                sort_order: props.state.sort_order,
                                total_selectable_items: props.state.total_selectable_items
                            }}
                            validateOnMount
                            validationSchema={Schema.categoryModalFormSchema}
                            onSubmit={(values, errors, status, touched) => {
                                // same shape as initial values
                                console.log(values, errors, status, touched);
                                props.onClickHandler(values);

                            }}
                        >
                            {({ values, errors, status, touched }) => (
                                <Form>


                                    <div className="form-row">
                                        <div className="col-md-12 ">
                                            <div className="ms-card-img">
                                                <img src={props.state.imagesPreviewUrl} alt="image_preview_url" />
                                                <button className="btn btn-primary uploadImage menu_product_image"> Upload an image
                                                            <input className="upload-image-input"
                                                        accept=".jpeg,.jpg,.png,.svg"
                                                        type="file"
                                                        id="choose-profile"
                                                        name="file"
                                                        onChange={props.handleImageChange}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 ">

                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <Field name="name" type="text" placeholder="Name" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom02">Description</label>
                                                <Field name="description" type="text" placeholder="Description" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                                <ErrorMessage name="description" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom02">Sort Order</label>
                                            <div className="input-group">
                                                <Field name="sort_order" type="number" className={'form-control' + (errors.sort_order && touched.sort_order ? ' is-invalid' : '')} />
                                                <ErrorMessage name="sort_order" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {props.state.is_buffet_category ? <div className="col-md-12">
                                            <label htmlFor="validationCustom02">Total Selectable Items</label>
                                            <div className="input-group">
                                                <Field name="total_selectable_items" type="number" className={'form-control' + (errors.total_selectable_items && touched.total_selectable_items ? ' is-invalid' : '')} />
                                                <ErrorMessage name="total_selectable_items" className="invalid-feedback" />
                                            </div>
                                        </div> : null}
                                        
                                    </div>

                                   

                                    <div className="ms-panel-header new">
                                        <button className="btn btn-secondary d-block" type="submit">Save</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>}
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default MenuModal
