import React, { Fragment } from 'react';
import amazonpay from '../../assets/img/payment/amazonpay.svg';
import appple from '../../assets/img/payment/appple.svg';
import gpay from '../../assets/img/payment/gpay.svg';
import master from '../../assets/img/payment/master.svg';
import mistro from '../../assets/img/payment/mistro.svg';
import visa from '../../assets/img/payment/visa.svg';


const BankDetails = (props) => {
    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Kayana Payment</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>Accept payments on your store in the mobile app using Kayana Payments</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Kayana Payments</h6>
                        </div>
                        <div className="mms-panel-body p-0">
                            <div className="ms-quick-stats">
                                <div className="ms-stats-grid3">
                                    <p className="ms-text-dark">Credit card rate</p> 
                                    {/* <span>As low as 1.9% + £0.20</span> */}
                                </div>
                                <div className="ms-stats-grid3">
                                    <p className="ms-text-dark">Transaction fee</p> <span>0%</span>
                                </div>
                                <div className="ms-stats-grid3">
                                    <p className="ms-text-dark">Payout bank account</p> <span>****** 10 (GBP)</span>
                                </div>
                            </div>
                        </div>

                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <h6>Accepted payments</h6>
                                <img className={"payment"} src={visa} alt="Visa card" />
                                <img className={"payment"} src={master} alt="Master card" />
                                <img className={"payment"} src={mistro} alt="Mistro card" />
                                {/* <img className={"payment"} src={appple} alt="Apple Pay" />
                                <img className={"payment"} src={gpay} alt="Gpay" /> */}
                            </div>
                            <div className="payout-buttons text-right">
                                <a className="btn btn-primary" href="/payout">View Payout</a>
                            </div>
                        </div>




                    </div>
                </div>

                {/* <div className="col-xl-6 col-md-12 offset-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <img className={"amazonpay"} src={amazonpay} alt="amazonpay" />
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>A button on your store checkout that enables customers to use the payment and shipping information stored in their Amazon account. Learn more about Amazon Pay .</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-6 col-md-12 offset-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Third-party providers</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>Providers that enable you to accept payment methods at a rate set by the third-party. </p>
                                <div className="payout-buttons text-right">
                                    <a className="btn btn-primary disabled" href="#">Choose third-party provider</a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


                <div className="col-xl-6 col-md-12 offset-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Alternative payment methods</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>External payment methods that can be used in addition to either a third-party provider or Shopify Payments. </p>
                                <div className="payout-buttons text-right">
                                    <a className="btn btn-primary disabled" href="#">Choose alternative payment</a>
                                </div>
                            </div>

                        </div>

                        <div className="ms-card-footer">
                            <div className="wrapper-new2 "><h5>Coinbase Commerce is active</h5><a className="btn btn-primary disabled" href="#">Edit</a></div>

                        </div>

                    </div>
                </div>



                <div className="col-xl-6 col-md-12 offset-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Manual payment methods</h6>
                        </div>
                        <div className="ms-panel-body">
                            <div className="col-xl-12 col-md-12">
                                <p>Payments that are processed outside your online store. When a customer makes a manual payment, you need to approve their order before fulfilling. </p>
                                <div className="payout-buttons text-right">
                                    <select name="data-table-1_length" aria-controls="data-table-1"
                                        className="custom-select custom-select-sm form-control form-control-sm">
                                        <option value="Manual Payment Method">Manual Payment Method</option>
                                        <option value="Manual Payment Method">Manual Payment Method</option>

                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <hr />
            <div className="row">
                <div className="col-xl-6 col-md-6">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-header">
                            <h6>Payment capture</h6>
                        </div>
                        <div className="ms-panel-body">
                            <h6>After a customer's payment method is authorized, it needs to be captured so that the sale can be processed. Choose between </h6>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-md-12">
                    <div className="ms-panel ms-panel-fh">
                        <div className="ms-panel-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="ms-list ms-list-display">
                                            <li>
                                                <label className="ms-checkbox-wrap ms-checkbox-primary">
                                                    <input type="radio" defaultValue name="radioExample2" defaultChecked /> <i className="ms-checkbox-check" />
                                                </label> <span> <strong>Automatically capture payment for orders.</strong></span>
                                                <p>The customer’s payment method is authorized and charged automatically. </p>
                                            </li>
                                            <li>
                                                <label className="ms-checkbox-wrap ms-checkbox-primary">
                                                    <input type="radio" defaultValue name="radioExample2" /> <i className="ms-checkbox-check" />
                                                </label> <span> <strong>Manually capture payment for orders.</strong></span>
                                                <p>The customer’s payment method is authorized at the time of their order. You’ll need to manually capture payment within the authorization period. </p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="col-xl-12 col-md-12">
                    <div className="invoice-buttons text-right">
                        <a className="btn btn-primary" href="#">Save</a>
                    </div>
                </div> */}
            </div>

        </Fragment >
    )

}

export default BankDetails