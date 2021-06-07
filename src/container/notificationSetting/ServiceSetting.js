import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import './style.css';
import PhoneInputField from '../signup/PhoneInputField';
import * as Schema from '../../utils/Schema'
const ServiceSetting = (props) => {

    const {
        
        service_email,
        is_service_email_active,
        is_service_in_software_active,
        is_service_push_notification_active,
        is_service_sms_active,
        service_phone_number,
    } = props.state
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>Service Settings</h6>
                        </div>
                        <div className="ms-panel-body">

                            <Formik
                                initialValues={{
                                    service_email_setting: service_email,
                                    service_phone_number: service_phone_number,
                                }}
                                enableReinitialize
                                validationSchema={Schema.serviceSettingSchema}
                                onSubmit={(values, errors, status, touched) => {
                                    console.log(values, errors, status, touched)
                                    const property=JSON.parse(localStorage.getItem('property_details'))
                                    const payload = {
                                        email: values.service_email_setting,
                                        is_email_active: is_service_email_active,
                                        is_in_software_active: is_service_in_software_active,
                                        is_push_notification_active:  is_service_push_notification_active,
                                        is_sms_active: is_service_sms_active,
                                        phone_number: '+'+values.service_phone_number,
                                        type:'SERVICE SETTINGS',
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
                                                        <input type="checkbox" name="is_service_email_active" onChange={()=>props.toggleHandler('is_service_email_active')} checked={is_service_email_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>


                                           {is_service_email_active? <div className="col-md-4">
                                                <div className="form-group">
                                                    <Field name="service_email_setting" type="text" placeholder="John Doe" className={'form-control' + (errors.service_email_setting && touched.service_email_setting ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="service_email_setting" className="invalid-feedback" />
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
                                                        <input type="checkbox" name="is_service_sms_active" onChange={()=>props.toggleHandler('is_service_sms_active')} checked={is_service_sms_active}/>
                                                        <span className="ms-switch-slider round" />
                                                    </label>

                                                </div>
                                            </div>


                                            {is_service_sms_active?<div className="col-md-4">
                                            <div className="form-group">
                                                    <Field name="service_phone_number" country="gb" inputStyle={{ width: '100%' }} component={PhoneInputField} className={'form-control' + (errors.service_phone_number && touched.service_phone_number ? ' is-invalid' : '')} />
                                                </div>
                                                {/* <div className="form-group">
                                                    <Field name="service_phone_number" type="number" placeholder="9090900009" className={'form-control' + (errors.service_phone_number && touched.service_phone_number ? ' is-invalid' : '')} />
                                                    <ErrorMessage name="service_phone_number" className="invalid-feedback" />
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
                                                        <input type="checkbox" name="is_service_in_software_active" onChange={()=>props.toggleHandler('is_service_in_software_active')} checked={is_service_in_software_active}/>
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
                                                        <input type="checkbox" name=" is_service_push_notification_active" onChange={()=>props.toggleHandler('is_service_push_notification_active')} checked={is_service_push_notification_active}/>
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

export default ServiceSetting
