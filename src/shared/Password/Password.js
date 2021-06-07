import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import './style.css'

const Password = (props) => {
    const passwordSchema = Yup.object().shape({
        old_password: Yup.string()
            .required('Old Password is mandatory'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    return (
        <Formik
            initialValues={{
                password: '',
                old_password:'',
                confirmPassword: '',
            }}
            validationSchema={passwordSchema}
            onSubmit={values => {
                // same shape as initial values
                props.needPasswordChangeUpdate(values);
            }}
        >
            {({ errors, status, touched }) => (

                <Form >
                    <div className="col-md-12 ">
                        <div className="form-group password_group">
                            <label htmlFor="oldPasswordShow">Old Password</label>
                            <Field name="old_password" type={props.state.oldPasswordShow ? 'text' : 'password'} placeholder="******" className={'form-control' + (errors.old_password && touched.old_password ? ' is-invalid' : '')} />
                            {/* {props.state.oldPasswordShow ? <i onClick={() => props.handleClickShowPassword('oldPasswordShow')} className="far fa-eye" id="togglePassword"></i> :
                                <i onClick={() => props.handleClickShowPassword('oldPasswordShow')} className="far fa-eye-slash" id="togglePassword"></i>} */}
                            <ErrorMessage name="old_password" className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12 ">
                        <div className="form-group password_group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type={props.state.passwordShow ? 'text' : 'password'} placeholder="******" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            {/* {props.state.passwordShow ? <i onClick={() => props.handleClickShowPassword('passwordShow')} className="far fa-eye" id="togglePassword"></i> :
                                <i onClick={() => props.handleClickShowPassword('passwordShow')} className="far fa-eye-slash" id="togglePassword"></i>} */}
                            <ErrorMessage name="password" className="invalid-feedback" />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group password_group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field name="confirmPassword" placeholder="******" type={props.state.confirmPasswordShow ? 'text' : 'password'} className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            {/* {props.state.confirmPasswordShow ? <i onClick={() => props.handleClickShowPassword('confirmPasswordShow')} className="far fa-eye" id="togglePassword"></i> :
                                <i onClick={() => props.handleClickShowPassword('confirmPasswordShow')} className="far fa-eye-slash" id="togglePassword"></i>} */}
                            <ErrorMessage name="confirmPassword" className="invalid-feedback" />
                        </div>
                    </div>

                            <button className="btn btn-primary mt-4 d-block w-100" type="submit">{props.button_text}</button>
                </Form>
            )}
        </Formik>
    )


}
export default Password;