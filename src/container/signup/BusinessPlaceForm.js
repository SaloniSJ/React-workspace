import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import './style.css';
import * as Schema from '../../utils/Schema'

const BusinessPlaceForm = (props) => {
    return (
        <Fragment>
            <div className="needs-validation" noValidate>

                <div className="card businessPlaceCard login-top">
                    <div className="card-header">
                        <h3>Create Business Account</h3>
                        <p className="subheading">Complete your Kayana Partners details</p></div>
                    <div className="card-body cardBody">
                        <Formik
                            initialValues={{
                                property_name: '',
                                property_address: '',
                                second_line_address: '',
                                postal_code: '',
                                city: '',
                                country: '',
                            }}
                            validateOnMount
                            validationSchema={Schema.businessPlaceSchema}
                            onSubmit={values => {
                                props.businessPlaceFormHandler(values);

                            }}>
                            {({ values, errors, status, touched }) => (
                                <Form >
                                    {props.state.loading ? <div className="signupSpinner cardBody card-body"><FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /></div> :
                                        <div className="test">
                                            <div className="form-row">
                                                <div className="col-md-12 ">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Business Trading Name</label>
                                                        <Field name="property_name" type="text" placeholder="Business trading name" className={'form-control' + (errors.property_name && touched.property_name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="property_name" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 ">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Property Address</label>
                                                        <Field name="property_address" type="text" placeholder="Address 1" className={'form-control' + (errors.property_address && touched.property_address ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="property_address" className="invalid-feedback" />
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <Field name="second_line_address" type="text" placeholder="Address 2" className={'form-control' + (errors.second_line_address && touched.second_line_address ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="second_line_address" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row">

                                                <div className="col-md-6 ">
                                                    <div className="form-group">
                                                        <label htmlFor="name">City</label>
                                                        <Field name="city" type="text" placeholder="City" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="city" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 ">
                                                    <label htmlFor="country_options">Country</label>
                                                    <Select
                                                        id="validationCustom04"
                                                        name="property_country"
                                                        options={props.state.country_options}
                                                        value={props.state.property_country}
                                                        onChange={props.handleCountryOnChange}
                                                    />
                                                </div>
                                                <div className="col-md-12 ">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Post Code</label>
                                                        <Field name="postal_code" type="text" placeholder="123456" className={'form-control' + (errors.postal_code && touched.postal_code ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="postal_code" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                               
                                                <button className="btn btn-primary mt-4 d-block w-100" type="submit">Add Business Details</button>
                                            </div>

                                        </div>
                                    }
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default BusinessPlaceForm
