import React, { Fragment } from 'react';
import { Modal } from "react-bootstrap";
import OTP from '../../shared/Otp/OTP';

const ForgotPassword = (props) => {
    return (
        <Fragment>
            <Modal className="modal-min" show={props.state.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className="text-center">
                    <button type="button" className="close" onClick={props.handleClose}><span aria-hidden="true">×</span></button>
                    <i className="flaticon-secure-shield d-block" />
                    <h1>Forgot Password?</h1>
                    {props.state.showOTPBoxes ? <p>Enter your email to recover your password</p> : <p>Enter OTP sent on your registered mail Id</p>}

                    {props.state.showOTPBoxes ?

                        <div className="ms-form-group has-icon">
                            <form onSubmit={props.forgotPasswordHandler}>
                                <input type="text" placeholder="Email Address"
                                    className="form-control"
                                    name="email"
                                    value={props.state.email}
                                    onChange={props.onChangeHandler}
                                /> <i className="material-icons">email</i>
                                <button type="submit" className="btn btn-primary shadow-none">Reset Password</button>
                            </form>
                        </div> :
                        <div className="ms-form-group has-icon" >
                            <OTP state={props.state} onChange={props.onChangeHandler} />
                            <div className="mb-2">
                                <label htmlFor="validationCustom09">Password</label>
                                <div className="input-group">
                                    <input type="password"
                                        className="form-control"
                                        id="validationCustom09"
                                        name="new_password"
                                        value={props.state.new_password}
                                        onChange={props.onChangeHandler}
                                        placeholder="********"
                                        required />
                                    <div className="invalid-feedback">Please provide a password.</div>
                                </div>
                            </div>
                            <button type="button" onClick={props.confirmForgotPasswordHandler} className="btn btn-primary shadow-none">Reset Password</button>
                        </div>

                    }

                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default ForgotPassword
