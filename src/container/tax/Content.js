import { Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import Breadcrumb from './Breadcrumb';

const taxDetailsFormSchema = Yup.object().shape({

    vat: Yup.number()
        .required('VAT is required')
        .min(0, 'VAT cannot be less than 0')
        .max(100,'VAT cannot be more then 100'),
    service_tax: Yup.number()
        .required('Service Tax is required')
        .min(0, 'Service Tax cannot be less than 0')
        .max(100,'Service Tax cannot be more then 100'),
});

const Content = (props) => {
    return (
        <Fragment>
            <div className="ms-content-wrapper">
                <Breadcrumb />
                <div className="row">
                    <div className="col-md-6">

                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Tax Regions</h6>
                            </div>
                            <div className="ms-panel-body">
                                Kayana and Your Customer will use the information to contact you
                            </div>
                        </div>


                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Tax Calculation</h6>
                            </div>
                            <div className="ms-panel-body">
                                Kayana and Your Customer will use the information to contact you
                            </div>
                        </div>


                    </div>
                    <div className="col-md-6">

                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Edit Tax</h6>
                            </div>
                            <div className="ms-panel-body">
                                Manage how your store charges sales tax
                                <div className="wrapper-new2">
                                    <div className="col-md-5">
                                        <label htmlFor="country_options">Country</label>
                                        <input type="text" disabled="true" value="United Kingdom" className="form-control" placeholder="12.5" />
                                        {/* <div className="input-group-append"> <span className="input-group-text">%</span></div> */}
                                    </div>
                                    {/* <div className="col-md-6">
                                        <button type="button"
                                            className="btn btn-pill btn-success mr-5">Collecting
                                    </button>
                                        <button type="button"
                                            className="btn btn-pill btn-outline-info">Edit
                                    </button>
                                    </div> */}
                                </div>


                            </div>
                        </div>



                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Tax Calculation</h6>
                                <div>
                                    <label className="ms-checkbox-wrap ms-checkbox-success">

                                        <input type="checkbox" defaultValue defaultChecked /> <i className="ms-checkbox-check" />
                                    </label> <span> Show all Prices with tax included </span>
                                    <p className="mt-1 ml-4"> If taxes are charged on shipping rates, then taxes are included in the shipping price.</p>


                                </div>
                            </div>
                            <div className="ms-panel-body">

                                {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> :
                                    <Formik
                                        initialValues={{
                                            service_tax:'',
                                            vat:''
                                        }}
                                        validateOnMount
                                        validationSchema={taxDetailsFormSchema}
                                        onSubmit={(values) => {
                                            // same shape as initial values
                                            props.updateTaxDetails(values);

                                        }}
                                    >
                                        {({ values, errors, status, touched }) => (
                                            <Form>
                                                <div>
                                                    <label className="ms-checkbox-wrap ms-checkbox-success">
                                                        <input type="checkbox" onChange={() => props.handleInputEnable('isServiceTaxEditable')} /> <i className="ms-checkbox-check" />
                                                    </label> <span> Charge Service Tax </span>
                                                    <p className="mt-1 ml-4"> This creates a collection for you to add your digital products. Products in this collection will have VAT applied checkout for European customers. Learn more. Learn more</p>

                                                </div>

                                                <label htmlFor="servicet">Service Tax In %</label>
                                                <div className="input-group input-group col-6">
                                                <Field name="service_tax" disabled={props.state.isServiceTaxEditable} type="text" className={'form-control' + (errors.service_tax && touched.service_tax ? ' is-invalid' : '')} />
                                                    {/* <input type="text" disabled={props.state.isServiceTaxEditable} className="form-control" placeholder="12.5" /> */}
                                                    <div className="input-group-append"> <span className="input-group-text">%</span>
                                                    </div>
                                                </div>


                                                <label className="ms-checkbox-wrap ms-checkbox-success">

                                                    <input type="checkbox" onChange={() => props.handleInputEnable('isVATEditable')} /> <i className="ms-checkbox-check" />
                                                </label> <span> Charge VAT</span>
                                                <p className="mt-1 ml-4"> This creates a collection for you to add your digital products. Products in this collection will have VAT applied checkout for European customers. Learn more</p>
                                                <div>
                                                    <label htmlFor="servicet">VAT Tax In %</label>
                                                    <div className="input-group input-group col-6">
                                                    <Field name="vat" disabled={props.state.isVATEditable} type="text" className={'form-control' + (errors.vat && touched.vat ? ' is-invalid' : '')} />
                                                        {/* <input type="text" className="form-control"  placeholder="12.5" /> */}
                                                        <div className="input-group-append"> <span className="input-group-text">%</span></div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary">Save</button>
                                            </Form>
                                        )}
                                    </Formik>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Content;