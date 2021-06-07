import React, { Component } from 'react'
import { toast } from 'react-toastify';
import * as PaymentServiceAPI from '../../services/payment/PaymentServiceAPI'
import BankDetails from './BankDetails'
import Breadcrumb from './Breadcrumb'
import CompanyDetails from './CompanyDetails'
import SimpleModal from '../../shared/Modal/SimpleModal'
import Content from './Content'
import PersonalDetails from './PersonalDetails'
import BankDetailsSubmitted from './BankDetailsSubmitted'
import Activation from './Activation'
import { Fragment } from 'react'

export default class index extends Component {

    state = {
        email: '',
        property: '',
        username: '',
        profile: '',
        loading: false,
        account_id: '',
        account_status: false,
        applicationFeeType: '',

        // Stripe related variables
        is_account_not_initiated: false,
        is_acount_created: false,
        is_tos_acceptance_updated: false,
        is_person_details_updated: false,
        is_company_details_updated: false,
        is_bank_details_updated: false,

        //variables for document uploading 
        document_front: null,
        document_back: null,
        additional_document_back: null,
        additional_document_front: null,
        document_type: '',
        additional_doc: false,
        document: false,
        show: false,
        doc_front_loaded: false,
        doc_back_loaded: false,
        imagesPreviewDocFrontUrl: null,
        imagesPreviewFrontUrl: null,
        imagesPreviewBackUrl: null,
        doc_with_front_loaded: false,

        //MCC
        merchantCategoryCodesMap: [],
        termsAndCondition: {}
    }

    document = ['Driving License', 'National Id', 'Passport']

    componentDidMount = () => {

        const username = localStorage.getItem('username')
        const property = JSON.parse(localStorage.getItem('property_details'))
        const profile = JSON.parse(localStorage.getItem('user'))

        this.fetchMerchantCategoryCodes();
        this.fetchStripeTermsAndCondition();
        if (profile) {
            this.setState({ username: username, property: property, profile: profile, email: profile.email })
        }
        if (property) {

            const payload = {
                property_id: property.property_id,
                username: username
            }
            this.fetchAccountDetails(payload);
        } else {
            if (property) {
                this.fetchAccountId(property.property_id)
            } else {

                toast.error('There is no property associated with this user')
            }
        }

    }

    fetchMerchantCategoryCodes = () => {
        PaymentServiceAPI.fetchMerchantCategoryCodes().then(response => {
            if (response.data.status) {

                this.setState({
                    merchantCategoryCodesMap: response.data.data.merchant_category_details
                })
            } else {

                toast.error(response.data.message)
            }
        }).catch(error => {


        })
    }

    fetchStripeTermsAndCondition = () => {
        PaymentServiceAPI.fetchTermsAndCondition('GBR').then(response => {
            if (response.data.status) {

                this.setState({
                    termsAndCondition: response.data.data
                })
            } else {

                toast.error(response.data.message)
            }
        }).catch(error => {


        })
    }

    fetchAccountId = (property_id) => {
        PaymentServiceAPI.fetchAccountId(property_id).then(response => {
            if (response.data.status) {
                this.setState({
                    account_id: response.data.data.account_id,
                    account_status: response.data.data.account_status
                })
                this.fetchAccountDetails(response.data.data.account_id);
            } else {
                toast.error(response.data.message)
            }
        }).catch(error => {


        })
    }

    fetchAccountDetails = (payload) => {

        if (payload) {

            PaymentServiceAPI.fetchAccountStatus(payload).then(response => {
                if (response.data.status) {

                    if (response.data.data.account_status === "ACCOUNT NOT INITIATED") {

                        this.setState({
                            is_account_not_initiated: true,
                            is_acount_created: false,
                            is_tos_acceptance_updated: false,
                            is_person_details_updated: false,
                            is_company_details_updated: false,
                            is_bank_details_updated: false,
                        })
                    } if (response.data.data.account_status === "ACCOUNT CREATED") {

                        this.setState({
                            is_acount_created: true, is_account_not_initiated: false,
                            is_tos_acceptance_updated: false,
                            is_person_details_updated: false,
                            is_company_details_updated: false,
                            is_bank_details_updated: false,
                        })
                    } if (response.data.data.account_status === "COMPANY DETAILS UPDATED") {

                        this.setState({
                            is_company_details_updated: true, is_account_not_initiated: false,
                            is_acount_created: false,
                            is_tos_acceptance_updated: false,
                            is_person_details_updated: false,
                            is_bank_details_updated: false,
                        })
                    } if (response.data.data.account_status === "BANK DETAILS UPDATED") {

                        this.setState({
                            is_bank_details_updated: true, is_account_not_initiated: false,
                            is_acount_created: false,
                            is_tos_acceptance_updated: false,
                            is_person_details_updated: false,
                            is_company_details_updated: false,
                        })
                    } if (response.data.data.account_status === "PERSONS DETAILS UPDATED") {

                        this.setState({
                            is_person_details_updated: true, is_account_not_initiated: false,
                            is_acount_created: false,
                            is_tos_acceptance_updated: false,
                            is_company_details_updated: false,
                            is_bank_details_updated: false,
                        })
                    } if (response.data.data.account_status === "TOS ACCEPTANCE UPDATED") {

                        this.setState({
                            is_tos_acceptance_updated: true, is_account_not_initiated: false,
                            is_acount_created: false,
                            is_person_details_updated: false,
                            is_company_details_updated: false,
                            is_bank_details_updated: false,
                        })
                    }
                }
            }).catch(error => {


            })
        } else {
            toast.error('Email cannot be empty')
        }
    }

    createAccount = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        const payload = {
            country_code: "GB",
            email: this.state.email,
            property_id: this.state.property.property_id,
            username: this.state.username
        }
        if (payload.email !== '') {
            PaymentServiceAPI.createPaymentAccount(payload).then(response => {
                if (response.data.status) {
                    localStorage.setItem('account_id', response.data.data.account_id)

                    this.setState({ account_id: response.data.data.account_id, loading: false })
                    toast.success('Account created successful.. !!')
                    const payload = {
                        property_id: this.state.property.property_id,
                        username: this.state.username
                    }
                    this.fetchAccountDetails(payload)
                } else {
                    toast.error(response.data.message)
                    this.setState({ loading: false })
                }
            }).catch(error => {

                this.setState({ loading: false })
            })
        } else {
            toast.error('Email cannot be empty')
            this.setState({ loading: false })

        }
    }

    updateCompanyDetails = (values) => {

        const payload = {
            address_line_1: values.first_line,
            address_line_2: values.second_line,
            business_name: values.company_name,
            city: values.city,
            company_name: values.company_name,
            company_phone: '+' + values.phone,
            country: 'GB',
            mcc: values.merchant_category_code,
            postal_code: values.postal_code,
            product_description: values.industry,
            property_id: this.state.property.property_id,
            state: values.state,
            business_url: values.business_website,
            crn: values.crn
        }
        PaymentServiceAPI.updateCompanyDetails(payload).then(response => {
            if (response.data.status) {

                toast.success('Company Details added successful.. !!')
                const payload = {
                    property_id: this.state.property.property_id,
                    username: this.state.username
                }
                this.fetchAccountDetails(payload)
            } else {

            }
        }).catch(error => {

        })

    }

    formatDate(input) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0), // get only two digits
            month = datePart[1], day = datePart[2];

        return day + '-' + month + '-' + year;
    }
    updatePersonalInformation = (values) => {
        this.setState({ loading: true })

        const payload = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: '+' + values.phone,
            email: values.email,
            date_of_birth: this.formatDate(values.dateOfBirth),
            address_line_1: values.address_line_1,
            address_line_2: values.address_line_2,
            city: values.city,
            country: 'GB',
            state: values.state,
            postal_code: values.postal_code,
            title: values.title,
            ownership_percent: values.ownership,

            is_owner: true,
            is_representative: true,
            is_executive: false,
            is_director: false,
        }


        let formData = new FormData()
        formData.append('person_details', JSON.stringify(payload))
        formData.append('additional_document_front', this.state.additional_document_front)
        // formData.append('additional_document_back', this.state.additional_document_back)
        formData.append('document_front', this.state.document_front)
        formData.append('document_back', this.state.document_back)
        formData.append('property_id', this.state.property.property_id)
        if (this.state.additional_document_front && this.state.document_front && this.state.document_back) {
            PaymentServiceAPI.updatePersonalDetailsWithDocument(formData).then(response => {
                if (response.data.status) {

                    toast.success('Personal Details added successful.. !!')
                    const payload = {
                        property_id: this.state.property.property_id,
                        username: this.state.username
                    }
                    this.setState({ loading: false })
                    this.fetchAccountDetails(payload)
                } else {

                    toast.warn(response.data.message)
                    this.setState({ loading: false })
                }
            }).catch(error => {

                this.setState({ loading: false })
            })
        } else {
            toast.error('Please upload document... !!')
            this.setState({ loading: false })
        }
    }


    updateAccountDetails = (values) => {

        this.setState({ loading: true })
        const payload = {
            account_holder_name: values.account_holder_name,
            account_holder_type: values.account_holder_type,
            account_number: values.account_number,
            property_id: this.state.property.property_id,
            routing_number: values.routing_number,
            username: this.state.username
        }

        PaymentServiceAPI.updateBankDetails(payload).then(response => {
            if (response.data.status) {
                this.setState({ loading: false })

                toast.success('Account details updated sucessfully!!')
                const payload = {
                    property_id: this.state.property.property_id,
                    username: this.state.username
                }
                this.fetchAccountDetails(payload)
            } else {
                toast.error(response.data.message)
                this.setState({ loading: false })
            }
        }).catch(error => {

            this.setState({ loading: false })
        })
    }

    updateTermsAndCondition = (e) => {

        e.preventDefault();
        this.setState({ loading: true })
        PaymentServiceAPI.updateTermsAndCondition(this.state.property.property_id).then(response => {
            if (response.data.status) {
                this.setState({ loading: false })

                toast.success('Account Setup sucessfully!!')
                const payload = {
                    property_id: this.state.property.property_id,
                    username: this.state.username
                }
                this.fetchAccountDetails(payload)
            } else {
                toast.error(response.data.message)
                this.setState({ loading: false })
            }
        }).catch(error => {

            this.setState({ loading: false })
        })

    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    showModalWindow = (event) => {

        if ([event.target.name][0] === "additional_doc") {
            this.setState({ document_type: 'addtional_docuement', show: true })
        } if ([event.target.name][0] === "document") {
            this.setState({ document_type: 'document', show: true })
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }


    handleFrontImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            const reader = new FileReader();
            if (this.state.document_type === "document") {
                reader.onloadend = () => {
                    this.setState({
                        document_front: file,
                        imagesPreviewFrontUrl: reader.result,
                        doc_front_loaded: true
                    })
                };
            } else {
                reader.onloadend = () => {
                    this.setState({
                        additional_document_front: file,
                        imagesPreviewDocFrontUrl: reader.result,
                        doc_with_front_loaded: true
                    })
                };
            }
            reader.readAsDataURL(file);
        });
    }

    handleBackImageChange = (e) => {
        e.preventDefault();

        const files = Array.from(e.target.files);
        files.forEach((file, i) => {
            const reader = new FileReader();


            reader.onloadend = () => {
                this.setState({
                    document_back: file,
                    imagesPreviewBackUrl: reader.result,
                    doc_back_loaded: true
                })
            };

            reader.readAsDataURL(file);
        });

    }

    saveImage = (event) => {
        event.preventDefault();
        this.setState({ show: false })
    }

    render() {
        const { is_account_not_initiated, is_acount_created, is_tos_acceptance_updated, is_person_details_updated, is_company_details_updated,
            is_bank_details_updated, } = this.state

        return (
            <Fragment>
                <Breadcrumb />

                {is_account_not_initiated ? <Content state={this.state} createStripeAccount={this.createAccount} /> : null}
                {is_acount_created ? <CompanyDetails state={this.state} updateCompanyDetails={this.updateCompanyDetails} /> : null}
                {is_company_details_updated ? <PersonalDetails state={this.state} showModalWindow={this.showModalWindow} updatePersonalDetails={this.updatePersonalInformation} /> : null}
                {is_person_details_updated ? <BankDetails state={this.state} onChange={this.onChangeHandler} updateAccountDetails={this.updateAccountDetails} /> : null}
                {is_bank_details_updated ? <BankDetailsSubmitted state={this.state} updateTermsAndCondition={this.updateTermsAndCondition} /> : null}
                {is_tos_acceptance_updated ? <Activation updateTermsAndCondition={this.updateTermsAndCondition} /> : null}


                <SimpleModal state={this.state} handleClose={this.handleClose} handleFrontImageChange={this.handleFrontImageChange} handleBackImageChange={this.handleBackImageChange} >
                    <div>
                        <form>

                            {this.state.document_type === 'document' ?
                                <div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom14"><strong>Please upload the Document for Address Verification </strong></label>
                                            <div className="input-group">
                                                <select className="form-control">
                                                    <option value="driving_license">Driving License</option>
                                                    <option value="identity_card">Identity Card</option>
                                                    <option value="passport">Passport</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <img className="add-product-image settting_img" src={this.state.imagesPreviewFrontUrl} alt="image_front_URL" />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom12">Front Image</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input"
                                                    accept=".jpeg,.jpg,.png,.svg"
                                                    id="choose-profile"
                                                    name="file"
                                                    onChange={this.handleFrontImageChange}
                                                />
                                                {this.state.doc_front_loaded ? <label className="custom-file-label" htmlFor="validatedCustomFile"> Image Uploaded...</label> : <label className="custom-file-label" htmlFor="validatedCustomFile">Select Image...</label>}
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <img className="add-product-image settting_img" src={this.state.imagesPreviewBackUrl} alt="image_preview_back_url" />
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom12">Back Image</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input"
                                                    accept=".jpeg,.jpg,.png,.svg"
                                                    id="choose-profile"
                                                    name="file"
                                                    onChange={this.handleBackImageChange}
                                                />
                                                {this.state.doc_back_loaded ? <label className="custom-file-label" htmlFor="validatedCustomFile"> Image Uploaded...</label> : <label className="custom-file-label" htmlFor="validatedCustomFile">Select Image...</label>}
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                    </div>

                                </div> : <div>

                                    <div className="form-group">
                                        <div className="col-md-12">
                                            <label htmlFor="validationCustom14"><strong>Please upload the Document for Address Verification </strong></label>
                                            <div className="input-group">
                                                <select className="form-control">
                                                    <option value="driving_license">Utility Bill</option>
                                                    <option value="identity_card">Government_approved letter</option>
                                                    <option value="passport">Statement from a financial institution</option>
                                                    <option value="passport">NHS Medical Card/Solicitors letter</option>
                                                    <option>Solicitors letter</option>
                                                    <option>Electrol Registry Entry</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <img className="add-product-image settting_img" src={this.state.imagesPreviewDocFrontUrl} alt="image_preview_doc_front_url" />
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label htmlFor="validationCustom12">Front Image</label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input"
                                                        accept=".jpeg,.jpg,.png,.svg"
                                                        id="choose-profile"
                                                        name="file"
                                                        onChange={this.handleFrontImageChange}
                                                    />
                                                    {this.state.doc_with_front_loaded ? <label className="custom-file-label" htmlFor="validatedCustomFile"><strong>Image Uploaded.</strong></label> : <label className="custom-file-label" htmlFor="validatedCustomFile"><strong>Select Image...</strong></label>}
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>}
                            <button class="btn btn-primary" onClick={this.saveImage}>Save</button>
                        </form>
                    </div>
                </SimpleModal>
            </Fragment>
        )
    }
}