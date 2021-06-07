import React, { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { FlapperSpinner } from "react-spinners-kit";

const BankDetails = (props) => {
    return (
        <Fragment>

            <div className="row">

                <div className="col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h5>Stripe Services Agreement - United Kingdom</h5>
                        </div>
                        <div className="ms-panel-body">
                            <form onSubmit={props.updateTermsAndCondition}>
                                {props.state.loading ? <FlapperSpinner size={90} color="#233cad" loading={props.state.loading} /> : <div className="row">

                                    <div className="col-md-12">
                                        <Scrollbar className="ms-scrollable ms-dropdown-list">
                                            <div dangerouslySetInnerHTML={props.state.termsAndCondition} />
                                            <div className="form-group">
                                                <label className="ms-checkbox-wrap">
                                                    <input className="form-check-input" type="checkbox" defaultValue />
                                                    <i className="ms-checkbox-check" />
                                                </label>
                                                <span>I Agree</span>
                                            </div>
                                        </Scrollbar>
                                    </div>

                                    <div className="ms-panel-header new">
                                        <div className="row">
                                            <div className="col-md-6"> <button className="btn btn-primary d-block" type="submit">Decline</button></div>
                                            <div className="col-md-6"><button className="btn btn-secondary d-block float-right" type="submit">Accept</button></div>
                                        </div>

                                    </div>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )

}

export default BankDetails