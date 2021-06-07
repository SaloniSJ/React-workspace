import React, { Component, Fragment } from 'react'
import './style.css'
import OTP from '../../shared/Otp/OTP'

class MFASetup extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className=" col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h5>Authenticator app</h5>
                                        <div className="google-authenticator"></div>
                                        <h6>
                                            Use the Authenticator app to get free verification codes,
                                            even when your phone is offline. Available for Android and
                                            iPhone.
                                        </h6>
                                        <button type="submit" class="btn btn-primary">SET UP</button>
                                    </div>
                                    <div className="col-md-7">
                                        <form className="setup-div">
                                            <label className="ms-switch">
                                                <input type="checkbox" defaultChecked /> <span className="ms-switch-slider round" />
                                            </label><p>
                                                Please on this option to enable two factor authentication
                                                at login.</p>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className=" col-md-12">
                        <div className="ms-panel ms-panel-fh">
                            <div className="ms-panel-body">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h5>Authenticator app</h5>
                                        <div className=""></div>

                                        <button type="submit" class="btn btn-primary">SET UP</button>
                                    </div>
                                    <div className="col-md-7">
                                        <form >
                                            <div item xs={12} md={6}>
                                                <div className="subTitle">
                                                    Please scan and enter OTP for two factor authentication.
                                                </div>
                                                <form onSubmit={this.verifyMFACodeOTPHandler}>
                                                    <OTP onChange={this.ChangeHandler} id1={this.state.id1} id2={this.state.id2}
                                                        id3={this.state.id3} id4={this.state.id4} id5={this.state.id5} id6={this.state.id6} />
                                                    <button class="btn btn-lg btn-primary">Verify OTP</button>
                                                </form>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default MFASetup