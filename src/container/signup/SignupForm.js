import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import { FlapperSpinner } from "react-spinners-kit";
import * as Yup from 'yup';
import ConfirmSignupForm from './ConfirmSignupForm';
import PhoneInputField from './PhoneInputField';
import * as Schema from '../../utils/Schema'

const SignupForm = (props) => {
    return (
        <Fragment>
            {props.state.confirm_signup ? <ConfirmSignupForm {...props} /> : <div>

                <div className="card signupCard login-top">
                    <div className="card-header">
                        <h3>Create Account</h3>
                        <p className="subheading">Please enter personal information</p></div>
                    <div className="card-body cardBody">
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                            name: '',
                            confirmPassword: '',
                            acceptTerms: false,
                            phone: '',
                        }}
                        validationSchema={Schema.signupSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            props.signupHandler(values);

                        }}
                    >
                        {({ errors, status, touched }) => (

                            <Form >
                                {props.state.loading ? <div className="signupSpinner cardBody card-body"><FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /></div> :
                                    <div className="form">

                                        <div className="form-row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="name">Contact Name</label>
                                                    <Field name="name" type="text" placeholder="John Doe" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="name" className="invalid-feedback" />
                                                </div>
                                                {/* </div> */}
                                            </div>
                                            <div className="col-md-12 ">
                                                <label htmlFor="phone" >Contact Number</label>
                                                <div className="form-group">
                                                    <Field name="phone" country="gb" inputStyle={{ width: '100%' }} component={PhoneInputField} className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-12 ">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <Field name="email" type="text" placeholder="john@example.com" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="email" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-md-12 ">
                                                <div className="form-group password_group">
                                                    <label htmlFor="password">Password</label>
                                                    <Field name="password" type={props.state.passwordShow?'text':'password'} placeholder="******" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                    {props.state.passwordShow?<i onClick={()=>props.handleClickShowPassword('passwordShow')} className="far fa-eye" id="togglePassword"></i>:
                                                    <i onClick={()=>props.handleClickShowPassword('passwordShow')} className="far fa-eye-slash" id="togglePassword"></i>}
                                                    <ErrorMessage name="password" className="invalid-feedback" />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group password_group">
                                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                                    <Field name="confirmPassword" placeholder="******" type={props.state.confirmPasswordShow?'text':'password'} className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                    {props.state.confirmPasswordShow?<i onClick={()=>props.handleClickShowPassword('confirmPasswordShow')} className="far fa-eye" id="togglePassword"></i>:
                                                    <i onClick={()=>props.handleClickShowPassword('confirmPasswordShow')} className="far fa-eye-slash" id="togglePassword"></i>}
                                                    <ErrorMessage name="confirmPassword" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>



                                        <div className="form-group">
                                            <div className="form-check pl-0">
                                                <div className="form-group form-check">
                                                    <Field type="checkbox" onClick={props.handleModal} name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                                    <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                                                    <br />
                                                    <ErrorMessage name="acceptTerms" className="invalid-feedback" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <button className="btn btn-primary mt-4 d-block w-100" type="submit">Create Account</button></div>
                                        <p className="mb-0 mt-3 text-center">Already have an account? <Link className="btn-link" to="/login">Login</Link> </p>
                                    </div>}
                            </Form>
                        )}
                    </Formik>
                    </div>
                </div>
            </div>}
        </Fragment >
    )
}

export default SignupForm
