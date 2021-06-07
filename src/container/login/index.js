import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FlapperSpinner } from "react-spinners-kit";
import { toast } from 'react-toastify';

import logo from '../../assets/img/kayana/main-logo/logo-main.png';
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI';
import ForgotPassword from './ForgotPassword';
import CommonModal from '../../shared/Modal/CommonModal'
import './style.css';
import Password from '../../shared/Password/Password';
import * as message from '../../utils/Message'
import * as schema from '../../utils/Schema'

export default class index extends Component {

    state = {
        show: false,
        showOTPBoxes: true,
        loading: false,
        username: '',
        id1: '', id2: '',
        id3: '', id4: '',
        id5: '', id6: '',
        new_password: '',
        old_password:'',
        oldPasswordShow:false,
        need_password_change: false,
        passwordShow:false,
        confirmPasswordShow:false,
    }

    handleClickShowPassword = current => {
        this.setState({
            [current]: !this.state[current],
        });
    };

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    forgotPasswordModalHandler = (e) => {
        this.setState({ show: !this.state.show });
    }

    needPasswordChange = (value) => {
        this.setState({ loading: true, email:value.email})
        SecurityServiceAPI.needPasswordChange(value.email).then(response => {
            if (response.data.status) {
                if (response.data.data.need_password_change) {
                    toast.success(message.NEED_PASSWORD_CHANGE_SUCCESS)
                    this.setState({ need_password_change: true,loading:false, })
                } else {
                    this.loginHandler(value)
                }
            } else {
                toast.warn(response.data.message)
                this.setState({ loading: false })
            }
        }).catch(error => {
            this.setState({ loading: false })
        })
    }

    forgotPasswordHandler = (e) => {
        e.preventDefault();
        SecurityServiceAPI.forgotPassword(this.state.email).then(response => {
            if (response.data.status) {
                this.setState({ username: response.data.data.username, showOTPBoxes: false, email: '' })
            } else {
                this.setState({ showOTPBoxes: true, email: '' })
                toast.warn(response.data.message)
            }
        }).catch(error => {
            toast.warn(message.CATCH_ERROR_MESSAGE)
            this.setState({ showOTPBoxes: true, email: '' })
        })
    }
    confirmForgotPasswordHandler = e => {
        e.preventDefault();
        const payload = {
            new_password: this.state.new_password,
            otp: this.state.id1 + this.state.id2 + this.state.id3 + this.state.id4 + this.state.id5 + this.state.id6,
            username: this.state.username
        }

        SecurityServiceAPI.confirmForgotPassword(payload).then(response => {
            if (response.data.status) {
                toast.success(message.PASSWORD_CHANGE_SUCCESS)
                this.setState({ show: false, email: '', username: '', id1: '', id2: '', id3: '', id4: '', id5: '', id6: '', })
            } else {
                toast.warn(response.data.message)
                this.setState({ show: false, email: '', username: '', id1: '', id2: '', id3: '', id4: '', id5: '', id6: '', })
            }
        }).catch(error => {
            toast.warn(message.CATCH_ERROR_MESSAGE)
            this.setState({ show: false, email: '' })
        })
    }

    loginHandler = (form) => {
        this.setState({ loading: true })
        SecurityServiceAPI.signin(form).then(response => {
            if (response.data.status) {
                this.setState({ loading: false })
                localStorage.setItem('access_token', response.data.data.access_token)
                localStorage.setItem('refresh_token', response.data.data.refresh_token)
                localStorage.setItem('username', response.data.data.username)
                toast.success(message.LOGIN_SUCCESS)
                this.props.history.push('/dashboard')
            } else {
                toast.error(response.data.message)
                this.setState({loading: false})
            }
        })
    }

    needPasswordChangeUpdate=(form)=>{
        this.setState({loading : true})
        const payload={
            email:this.state.email,
            password:form.old_password,
            new_password:form.password,
        }
        SecurityServiceAPI.needPasswordChangeUpdate(payload).then(response=>{
            if(response.data.status){
                toast.success(message.PASSWORD_CHANGE_SUCCESS)
                this.setState({needPasswordChange:false,loading:false})
                localStorage.setItem('access_token', response.data.data.access_token)
                localStorage.setItem('refresh_token', response.data.data.refresh_token)
                localStorage.setItem('username', response.data.data.username)
                this.props.history.push('/dashboard')
            }else{
                this.setState({loading : false})
                toast.error(response.data.message)
            }
        }).catch(error=>{
            this.setState({loading : false})
            toast.error(message.CATCH_ERROR_MESSAGE)
        })
    }

    handleModal= ()=>{
        this.setState({show:!this.state.show})
    }

    handleCommonModal= ()=>{
        this.setState({need_password_change:!this.state.need_password_change})
    }

    render() {
        const {loading } = this.state
       
        return (
            <div className="ms-content-wrapper ms-auth login-page">
                <div className="ms-auth-container">
                    <div className="ms-auth-col ms-auth-bg">
                        <div className="ms-auth-form ">
                            <Formik
                                initialValues={{
                                    password: '',
                                    email: '',
                                }}
                                validationSchema={schema.loginSchema}
                                onSubmit={values => {
                                    this.needPasswordChange(values);
                                }}
                            >{({ errors, status, touched }) => (
                                    <Form >
                                        <div className="card commonCard login-top">
                                            <div className="card-header text-center">
                                                <img src={logo} className="logo_main" alt="logo"/>
                                            </div>

                                            {this.state.loading ? <div className="spinner cardBody card-body"><FlapperSpinner size={75} color="#233cad" loading={loading} /></div> :
                                                <div className="card-body cardBody">
                                                    <div className="mb-3">
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email</label>
                                                            <Field name="email" type="text" placeholder="john.doe@abc.com" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="email" className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="form-group password_group">
                                                            <label htmlFor="password">Password</label>
                                                            <Field name="password" type={this.state.passwordShow?'text':'password'} placeholder="******" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                            {this.state.passwordShow ? <i onClick={() => this.handleClickShowPassword('passwordShow')} className="far fa-eye" id="togglePassword"></i> :
                                                                <i onClick={() => this.handleClickShowPassword('passwordShow')} className="far fa-eye-slash" id="togglePassword"></i>}
                                                            <ErrorMessage name="password" className="invalid-feedback" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ float: 'right' }} className="d-block mt-3"><Link to='#' className="btn-link" onClick={this.forgotPasswordModalHandler}>Forgot Password?</Link>
                                                        </label>
                                                    </div>
                                                    <button className="btn btn-primary mt-4 d-block w-100" type="submit">Sign In</button>
                                                    <p className="mb-0 mt-3 text-center">Don't have an account? <Link className="btn-link" to="/register">Create Account</Link></p>
                                                </div>}
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>

                <CommonModal show={this.state.need_password_change} handleClose={this.handleCommonModal} Heading="FORCE PASSWORD CHANGE">
                {this.state.loading ? <div className="spinner cardBody card-body"><FlapperSpinner size={75} color="#233cad" loading={loading} /></div> :
                    <Password state={this.state} button_text="Sign In" handleClickShowPassword={this.handleClickShowPassword} needPasswordChangeUpdate={this.needPasswordChangeUpdate}/>}
                </CommonModal>

                <ForgotPassword state={this.state} handleClose={this.forgotPasswordModalHandler} forgotPasswordHandler={this.forgotPasswordHandler}
                    confirmForgotPasswordHandler={this.confirmForgotPasswordHandler} onChangeHandler={this.onChangeHandler} />
            </div >
        )
    }
}
