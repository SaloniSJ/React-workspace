import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';

const bankDetailsFormSchema = Yup.object().shape({
    account_holder_name: Yup.string()
        .required('Account holder name is required'),
    account_holder_type: Yup.string()
        .required('Account holder type is required'),
    account_number: Yup.string()
        .required('Account number is required'),
    routing_number: Yup.string()
        .required('Sort Code is required')
        .max(6,'Sort code cannot be more than 6 digit'),
});

const BankDetails = (props) => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <h4>Payment Providers</h4>
                    <h6>Please fill your Account details </h6>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Account Details</h6>
                        </div>
                            <div className="ms-panel-body">
                            {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> :
                                <Formik
                                    initialValues={{
                                        account_holder_name: '',
                                        account_holder_type: '',
                                        account_number: '',
                                        routing_number: '',
                                    }}
                                    validateOnMount
                                    validationSchema={bankDetailsFormSchema}
                                    onSubmit={values => {
                                        // same shape as initial values
                                        props.updateAccountDetails(values);

                                    }}
                                >
                                    {({ values, errors, status, touched }) => (
                                        <Form>

                                            <div className="form-row">

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom14">Bank Account Details</label><br/>
                                                        <label htmlFor="validationCustom14"><strong>Your earnings are deposited into this bank account.</strong></label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Account Holder Name</label>
                                                        <Field name="account_holder_name" type="text" placeholder="John Doe" className={'form-control' + (errors.account_holder_name && touched.account_holder_name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="account_holder_name" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <label htmlFor="validationCustom14">Account Holder Type</label>
                                                    <div>
                                                        <Field id="validationCustom07" name="account_holder_type" as="select" className={'form-control' + (errors.account_holder_type && touched.account_holder_type ? ' is-invalid' : '')}>
                                                            <option >Select</option>
                                                            <option key={"COMPANY"} value={"COMPANY"}>COMPANY</option>
                                                            <option key={"INDIVIDUAL"} value={"INDIVIDUAL"}>INDIVIDUAL</option>
                                                        </Field>
                                                        <ErrorMessage name="account_holder_type" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Account Number</label>
                                                        <Field name="account_number" type="text" placeholder="12345678" className={'form-control' + (errors.account_number && touched.account_number ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="account_number" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Sort Code</label>
                                                        <Field name="routing_number" type="text" placeholder="1234567" className={'form-control' + (errors.routing_number && touched.routing_number ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="routing_number" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <button className="btn btn-primary float-right" type="submit">Submit Account details</button>
                                            </div>

                                        </Form>
                                    )}
                                </Formik>}
                            </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )

}

export default BankDetails