import React, { Fragment } from 'react';
import { Modal } from "react-bootstrap";
import './Modal.css';
import { FlapperSpinner } from "react-spinners-kit";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const menuModalFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    description: Yup.string()
        .required('Description is required'),
    sort_order: Yup.string()
        .required('Total selectable items is required'),
    total_selectable_items: Yup.string()
        .required('Total selectable items is required'),
    total_cost: Yup.string()
    .required('Total Cost is required'),
});
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
                                total_cost: props.state.total_cost,
                                total_selectable_items: props.state.total_selectable_items
                            }}
                            validateOnMount
                            validationSchema={menuModalFormSchema}
                            onSubmit={(values, errors, status, touched) => {
                                // same shape as initial values
                                console.log(values, errors, status, touched);
                                props.addHandler(values);

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
                                                <label htmlFor="name">{props.label2}</label>
                                                <Field name="name" type="text" placeholder={props.name_placeholder} className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                <ErrorMessage name="name" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="validationCustom02">{props.label1}</label>
                                                <Field name="description" type="text" placeholder={props.description_placeholder} className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                                <ErrorMessage name="description" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom02">{props.label3}</label>
                                            <div className="input-group">
                                                <Field name="sort_order" type="number" placeholder={props.sort_order_placeholder} className={'form-control' + (errors.sort_order && touched.sort_order ? ' is-invalid' : '')} />
                                                <ErrorMessage name="sort_order" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {props.state.is_buffet_category ? <div className="col-md-12">
                                            <label htmlFor="validationCustom02">Total Selectable Items</label>
                                            <div className="input-group">
                                                <Field name="total_selectable_items" type="number" placeholder={props.total_selectable_items} className={'form-control' + (errors.total_selectable_items && touched.total_selectable_items ? ' is-invalid' : '')} />
                                                <ErrorMessage name="total_selectable_items" className="invalid-feedback" />
                                            </div>
                                        </div> : null}
                                        {props.state.is_menu ? 
                                            <div className="col-md-12">
                                            <div className="ms-panel-header new">
                                                <p className="medium">{props.label4}</p>
                                                <div className="col-md-6" style={{ float: 'right' }}>
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_buffet" onChange={() => props.toggleHandler('is_buffet')} checked={props.state.is_buffet} />
                                                        <span className="ms-switch-slider round" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>:null}
                                    </div>

                                    {props.state.is_buffet ? <div className="col-md-12">
                                        <label htmlFor="validationCustom02">{props.label5}</label>
                                        <div className="input-group">
                                            <Field name="total_cost" type="number" placeholder={props.total_cost_placeholder} className={'form-control' + (errors.total_cost && touched.total_cost ? ' is-invalid' : '')} />
                                            <ErrorMessage name="total_cost" className="invalid-feedback" />
                                        </div>
                                    </div> : null}

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
