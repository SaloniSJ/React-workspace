import React, { Component, Fragment } from 'react';
import { FlapperSpinner } from "react-spinners-kit";
export default class Content extends Component {


    render() {
        return (
            <Fragment>
                    
                        <div className="row">

                            <div className="col-xl-6 col-md-6">
                                <h4>Payment Providers</h4>
                                <h6>Accept payments on your store using Kayana Payments Services.</h6>
                            </div>

                            <div className="col-xl-6 col-md-12">
                                <div className="ms-panel ms-panel-fh">
                                    <div className="ms-panel-header">
                                        <h6>Payment Integration</h6>
                                    </div>
                                    <div className="ms-panel-body">
                                    {this.props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={this.props.state.loading} /> :
                                        <form className="needs-validation clearfix" onSubmit={this.props.createStripeAccount} noValidate>
                                            <h6>Activate Kayana Payment Services for your business</h6>
                                            <div className="form-row">
                                                <div className="col-xl-6 col-md-12 mb-3">
                                                    <label htmlFor="validationCustom13">Email</label>
                                                    <div className="input-group">
                                                        <input type="email" className="form-control" id="validationCustom13" value={this.props.state.email} onChange={this.props.onChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-12">
                                                    <label htmlFor="validationCustom14">Country Code</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" id="validationCustom14" value="GB" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-primary float-right" type="submit">Activate KPS Account</button>
                                        </form>}
                                    </div>
                                </div>
                            </div>
                        </div>
                
            </Fragment>
        )
    }
}
