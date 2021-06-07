import React, { Fragment } from 'react'
import { FlapperSpinner } from "react-spinners-kit"
import { Link } from 'react-router-dom';
import OTP from '../../shared/Otp/OTP'

const ConfirmSignupForm = (props) => {
    console.log(props)
    return (
        <Fragment>
            <form className="needs-validation" onSubmit={props.confirmSignupHandler} noValidate>

                <div className="card confirmSignupCardBody ">
                    <div className="card-header">
                        <h3>Verify Account</h3>
                        <p className="subheading">We have sent a code to your email <strong>{props.state.email}</strong> please check and insert this code </p>
                    </div>

                    {props.state.loading ? <div className="signupSpinner cardBody card-body">
                        <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} />
                    </div> : <div className="confirmSignupCard">
                            <OTP state={props.state} onChange={props.onChange} />
                           
                                <label style={{ float: 'right' }} className="d-block mt-3"><Link to='#' className="btn-link" onClick={props.resendOtp}>Resend OTP</Link>
                                </label>
                         
                            <button className="btn btn-primary mt-4 d-block w-100" type="submit">Verify Account</button>
                        </div>}
                </div>
            </form>
        </Fragment>
    )
}

export default ConfirmSignupForm
