import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import './style.css';
import * as Schema from '../../utils/Schema'
import PhoneInputField from '../signup/PhoneInputField';

const OrderSetting = (props) => {

    const {
        order_email,
        is_order_email_active,
        is_order_in_software_active,
        is_order_push_notification_active,
        is_order_sms_active,
        order_phone_number,
    } = props.state
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>Order Settings</h6>
                        </div>
                        <div className="ms-panel-body">

                            <Formik
                                initialValues={{
                                    order_email: order_email,
                                    order_phone_number: order_phone_number,
                                }}
                                enableReinitialize
                                validationSchema={Schema.orderSettingSchema}
                                onSubmit={(values, errors, status, touched) => {
                                  console.log(values)
                                    const property=JSON.parse(localStorage.getItem('property_details'))
                                    const payload = {
                                        email: values.order_email,
                                        is_email_active: is_order_email_active,
                                        is_in_software_active: is_order_in_software_active,
                                        is_push_notification_active: is_order_push_notification_active,
                                        is_sms_active: is_order_sms_active,
                                        phone_number: '+'+values.order_phone_number,
                                        type:'ORDER SETTINGS',
                                        property_id:property.property_id
                                    }
                                    console.log(payload)
                                    props.updateNotificationSetting(payload);

                                }}
                            >
                                {({ values, errors, status, touched }) => (
                                    <Form>
                                       {/* <p>{console.log(props.state)}</p> */}
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="validationCustom14">Email</label>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    {/* <label htmlFor="validationCustom14">Email</label><br /> */}
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_order_email_active" onChange={()=>props.toggleHandler('is_order_email_active')} checked={is_order_email_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>


                                           {is_order_email_active? <div className="col-md-4">
                                                <div className="form-group">
                                                    <Field name="order_email" type="text"  placeholder="John Doe" className={'form-control' + (errors.order_email && touched.order_email ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="order_email" className="invalid-feedback" />
                                                </div>
                                            </div>:null}


                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="validationCustom14">SMS</label>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_order_sms_active" onChange={()=>props.toggleHandler('is_order_sms_active')} checked={is_order_sms_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>


                                           {is_order_sms_active? <div className="col-md-4">
                                          
                                                {/* <label htmlFor="phone" > Number</label> */}
                                                <div className="form-group">
                                                    <Field name="order_phone_number" country="gb" inputStyle={{ width: '100%' }} component={PhoneInputField} className={'form-control' + (errors.order_phone_number && touched.order_phone_number ? ' is-invalid' : '')} />
                                                </div>
                                                {/* <div className="form-group">
                                                    <Field name="order_phone_number" type="number" placeholder="9090900009" className={'form-control' + (errors.order_phone_number && touched.order_phone_number ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="order_phone_number" className="invalid-feedback" />
                                                </div> */}
                                            </div>:null}


                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="validationCustom14">In Software</label>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    {/* <label htmlFor="validationCustom14">Email</label><br /> */}
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_order_in_software_active" onChange={()=>props.toggleHandler('is_order_in_software_active')} checked={is_order_in_software_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="validationCustom14">Push Notification</label>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    {/* <label htmlFor="validationCustom14">Email</label><br /> */}
                                                    <label className="ms-switch">
                                                        <input type="checkbox" name="is_order_push_notification_active" onChange={()=>props.toggleHandler('is_order_push_notification_active')} checked={is_order_push_notification_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button className="btn btn-primary d-block float-right" type="submit">Update</button>
                                                </div>
                                            </div>
                                        </div>

                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>

            </div>




        </Fragment >
    )
}

export default OrderSetting
