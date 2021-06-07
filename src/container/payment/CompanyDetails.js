import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import PhoneInputField from '../signup/PhoneInputField';

const companyDetailsFormSchema = Yup.object().shape({
    company_name: Yup.string()
        .required('Company name is required'),
    merchant_category_code: Yup.string()
        .required('Business Type is required'),
    first_line: Yup.string()
        .required('Address is required'),
    second_line: Yup.string()
        .required('Address is required'),
    city: Yup.string()
        .required('City is required'),
    postal_code: Yup.string()
        .required('Postal code is required'),
    crn: Yup.string()
        .required('CRN id is required'),
});

const CompanyDetails = (props) => {
    return (
        <Fragment>
           
                <div className="row">
                    <div className="col-xl-6 col-md-6">
                        <h4>Payment Providers</h4>
                        <h6>Please fill your Company details </h6>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-header">
                                <h6>Company Details</h6>
                            </div>
                            <div className="ms-panel-body">
                            {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> :
                                <Formik
                                    initialValues={{
                                        company_name: '',
                                        merchant_category_code: '',
                                        first_line: '',
                                        second_line: '',
                                        city: '',
                                        country: 'United Kingdom',
                                        postal_code: '',
                                        crn: '',
                                    }}
                                    validateOnMount
                                    validationSchema={companyDetailsFormSchema}
                                    onSubmit={(values, status) => {
                                        // same shape as initial values
                                        props.updateCompanyDetails(values);

                                    }}
                                >
                                    {({ values, errors, status, touched }) => (
                                         
                                        <Form>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Legal Business Name</label>
                                                        <Field name="company_name" type="text" placeholder="Company legal name" className={'form-control' + (errors.company_name && touched.company_name ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="company_name" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Business Type</label>
                                                        <Field name="merchant_category_code" as="select" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} >
                                                        {props.state.merchantCategoryCodesMap.map((mcc)=>{
                                                             return <option value={mcc.category_code}>{mcc.category}</option>
                                                        })
                            
                                                        }
                                                        <option value="">Select</option>
                                                        </Field>
                                                        <ErrorMessage name="merchant_category_code" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom14"><strong>The name you provide must exactly match the name associated with your CRN and We need only your 7 or 8-digit Company number</strong></label>
                                                    </div>
                                                </div>


                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Registered Business Address</label>

                                                        <Field name="first_line" type="text" placeholder="Address line 1" className={'form-control' + (errors.first_line && touched.first_line ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="first_line" className="invalid-feedback" />

                                                        <Field name="second_line" type="text" placeholder="Address line 2" className={'form-control' + (errors.second_line && touched.second_line ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="second_line" className="invalid-feedback" />

                                                        <Field name="city" type="text" placeholder="City" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="city" className="invalid-feedback" />

                                                        <Field name="postal_code" type="text" placeholder="Postal Code" className={'form-control' + (errors.postal_code && touched.postal_code ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="postal_code" className="invalid-feedback" />

                                                        <Field name="country" type="text" disabled={true} className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="validationCustom14"><strong>This address must match the address filled with the UK tax authority</strong></label>
                                                        <label htmlFor="validationCustom14"><strong>You can use your home address if you don't have a business address</strong></label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 ">
                                                    <label htmlFor="phone" >Contact Number</label>
                                                    <div className="form-group">
                                                        <Field name="phone" country="gb" inputStyle={{ width: '100%' }} component={PhoneInputField} className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Business Website</label>
                                                        <Field name="business_website" type="text" placeholder="company.com" className={'form-control' + (errors.business_website && touched.business_website ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="business_website" className="invalid-feedback" />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Companies House Registration Number(CRN)</label>
                                                        <Field name="crn" type="text" placeholder="000000000" className={'form-control' + (errors.crn && touched.crn ? ' is-invalid' : '')} />
                                                        <ErrorMessage name="crn" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <button className="btn btn-primary float-right" type="submit">Submit Company Details</button>
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

export default CompanyDetails