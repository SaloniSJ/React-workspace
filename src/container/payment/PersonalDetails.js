import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import PhoneInputField from '../signup/PhoneInputField';
import differenceInYears from "date-fns/differenceInYears";
const personalDetailsFormSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required'),
    last_name: Yup.string()
        .required('Last name is required'),
    email: Yup.string()
        .required('Email is required'),
    job_description: Yup.string()
        .required('Job description is required'),
    address_line_1: Yup.string()
        .required('address is required'),
    phone: Yup.string()
        .required('Contact number is required'),
    address_line_2: Yup.string()
        .required('address is required'),
    city: Yup.string()
        .required('city is required'),
    postal_code: Yup.string()
        .required('State is required'),
    dateOfBirth: Yup.string()
        .required('Date of birth is required')
        .nullable()
        .test("dob", "You must be 18 years old", function (value) {
            return differenceInYears(new Date(), new Date(value)) >= 18;
        }),
    ownership: Yup.number()
        .required('Ownership percentage is mandatory')
        .min(1, 'The min percentage should be 1')
        .max(100, 'The max percentage can be 100')
});

const PersonalDetails = (props) => {
    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <h4>Payment Providers</h4>
                    <h6>Please fill your Personal details </h6>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Personal Details</h6>
                        </div>
                        <div className="ms-panel-body">
                            {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> :
                                <Formik
                                    initialValues={{
                                        title: '',
                                        first_name: '',
                                        last_name: '',
                                        email: '',
                                        job_description: '',
                                        address_line_1: '',
                                        address_line_2: '',
                                        city: '',
                                        postal_code: '',
                                        dateOfBirth: '',
                                        ownership: ''
                                    }}
                                    validateOnMount
                                    validationSchema={personalDetailsFormSchema}
                                    onSubmit={(values) => {
                                        // same shape as initial values
                                        props.updatePersonalDetails(values);
                                    }}>
                                    {({ values, errors, status, touched }) => (
                                        <Form>
                                            <div className="form-row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom14">Business Beneficiary Details</label>
                                                        <label htmlFor="validationCustom14"><strong>This account must be activated by an executive, senior manager or someone who otherwise has significant control for the control and management of the business.
                                                            If that person is not you, please ask the right person to complete the form.</strong></label>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Title</label>
                                                        <Field name="title" as="select" placeholder="Mr./Mrs./Miss" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} >
                                                            <option >Select</option>
                                                            <option key={"Mr."} value={"Mr."}>Mr.</option>
                                                            <option key={"Mrs."} value={"Mrs."}>Mrs.</option>
                                                            <option key={"Miss"} value={"Miss"}>Miss.</option>
                                                        </Field>
                                                        <ErrorMessage name="title" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label htmlFor="name">First Name</label>
                                                        <Field name="first_name" type="text" placeholder="john" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="first_name" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">

                                                    <label htmlFor="validationCustom14">Last Name</label>
                                                    <div>
                                                        <Field type="text" name="last_name" placeholder="doe" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="last_name" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Email</label>
                                                        <Field name="email" type="email" placeholder="abc@xyz.com" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="email" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Job Description</label>
                                                        <Field name="job_description" type="text" placeholder="CEO/Manager/Partner" className={'form-control' + (errors.job_description && touched.job_description ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="job_description" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Date Of Birth</label>
                                                        <Field name="dateOfBirth" type="date" placeholder="dateOfBirth" className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="dateOfBirth" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 ">
                                                    <label htmlFor="phone" >Contact Number</label>
                                                    <div className="form-group">
                                                        <Field name="phone" country="gb" inputStyle={{ width: '100%' }} component={PhoneInputField} className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Address</label>
                                                        <Field name="address_line_1" type="text" placeholder="Address line 1" className={'form-control' + (errors.address_line_1 && touched.address_line_1 ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="address_line_1" className="invalid-feedback" />

                                                        <Field name="address_line_2" type="text" placeholder="Address line 2" className={'form-control' + (errors.address_line_2 && touched.address_line_2 ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="address_line_2" className="invalid-feedback" />

                                                        <Field name="city" type="text" placeholder="City" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="city" className="invalid-feedback" />

                                                        <Field name="postal_code" type="text" placeholder="postal_code" className={'form-control' + (errors.postal_code && touched.postal_code ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="postal_code" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Ownership</label>
                                                        <Field name="ownership" type="text" placeholder="0-100%" className={'form-control' + (errors.ownership && touched.ownership ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="ownership" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6"></div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="ms-checkbox-wrap">
                                                            <input type="radio" name="document" checked={props.state.document} onChange={props.showModalWindow} /> <i className="ms-checkbox-check" />
                                                        </label> <span>You'll need a government issued Photo-ID </span>
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="ms-checkbox-wrap">
                                                            <input type="radio" name="additional_doc" checked={props.state.additional_doc} onChange={props.showModalWindow} /> <i className="ms-checkbox-check" />
                                                        </label> <span>Proof of Address document</span>
                                                    </div>
                                                </div>
                                                <div className="form-group" style={{ marginTop: '25px' }}>
                                                    <div className="row">
                                                        <div className="col-md-12" style={{ textAlign: 'left' }}>
                                                            <button className="btn btn-primary" type="submit">Submit Personal details</button>
                                                        </div>
                                                    </div>
                                                </div>
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

export default PersonalDetails