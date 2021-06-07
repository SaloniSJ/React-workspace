import React, { Component } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import * as SecurityServiceAPI from '../../services/user/SecurityServiceAPI';
import '../login/style.css';
import BusinessPlaceForm from './BusinessPlaceForm';
import SignupForm from './SignupForm';
import './style.css';
import * as message from '../../utils/Message'
import SimpleModal from '../../shared/Modal/SimpleModal'

export default class index extends Component {

    state = {
        country_options: '',
        property_country: '',
        currency: '',
        currency_details: [],
        country: '',
        username: '',
        id1: '', id2: '',
        id3: '', id4: '',
        id5: '', id6: '',
        tnc_id: '',
        tnc_details: '',
        tnc_acceptance: false,
        loading: false,
        show: false,
        showPassword: false,
        confirmShowPassword: false,
        confirm_signup: false,
        business_place_form: false,
    }

    componentDidMount() {
        this.setState({ country_options: countryList().getData() })
        SecurityServiceAPI.fetchAllCurrencies().then(response => {
            if (response.data.status) {
                this.setState({ currency_details: Object.values(response.data.data.currency_details) })
            }
        })
        SecurityServiceAPI.fetchTermsAndCondition().then(response => {
            if (response.data.status) {
                this.setState({
                    tnc_id: response.data.data.tnc_id,
                    tnc_details: response.data.data
                })
            }
        })

    }

    handleCountryOnChange = value => {
        console.log(value);
        this.setState({
            country: value,
            property_country:value
        });
    };

    handleModal = () => {
        this.setState({ show: !this.state.show })
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClickShowPassword = current => {
        this.setState({
            [current]: !this.state[current],
        });
    };

    confirmSignupHandler = (event) => {
        event.preventDefault();
        const payload = {
            otp: this.state.id1 + this.state.id2 + this.state.id3 + this.state.id4 + this.state.id5 + this.state.id6,
            username: this.state.username
        }
        if (payload.otp !== '' && this.state.username !== '') {
            SecurityServiceAPI.confirmSignup(payload).then(response => {
                if (response.data.status) {
                    toast.success(message.SIGNUP_SUCCESS)
                    this.setState({ business_place_form: true, id1: '', id2: '', id3: '', id4: '', id5: '', id6: '', })
                } else {
                    toast.warn(response.data.message)
                    this.setState({ business_place_form: false })
                }
            }).catch(error => {
                toast.error(message.CATCH_ERROR_MESSAGE)
            })
        } else {
            toast.warn(message.OTP_VALIDATION_MESSAGE)
        }

    }

    reversePhoneNumber = (str) => {
        var splitString = str.split("");
        var reverseArray = splitString.reverse();
        var reverse_string = reverseArray.join("");
        return reverse_string;
    }

    splitString = (str) => {
        var reverse_number = str.substring(0, 10);
        var reverse_dialcode = str.substring(10)
        var phone_no = this.reversePhoneNumber(reverse_number);
        var dialcode = this.reversePhoneNumber(reverse_dialcode);
        const form = {
            phone_number: phone_no,
            dial_code: '+' + dialcode,
        }
        return form;
    }

    signupHandler = (payload) => {
        this.setState({ loading: true })
        var reverse_string = this.reversePhoneNumber(payload.phone);
        const phoneForm = this.splitString(reverse_string)
        const signupPayload = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            phone_number: phoneForm.phone_number,
            dial_code: phoneForm.dial_code,
            tnc_acceptance: payload.acceptTerms,
            tnc_id: this.state.tnc_id
        }
        SecurityServiceAPI.signup(signupPayload).then(response => {
            if (response.data.status) {
                toast.success(message.SIGN_UP_FIRST_STEP)
                this.setState({ username: response.data.data.username, confirm_signup: true, loading: false })
            } else {
                toast.warn(response.data.message)
                this.setState({ loading: false, })
            }
        }).catch(error => {
            this.setState({ loading: false, })
            toast.error(message.CATCH_ERROR_MESSAGE)
        })


    }

    businessPlaceFormHandler = (values) => {
        var getCountry = require("country-currency-map").getCountry;
        const currency = getCountry(this.state.country.label)
        this.setState({ loading: true })
        const businessPlaceForm = {
            property_name: values.property_name,
            property_address: values.property_address + ' , ' + values.second_line_address,
            property_country_code: this.state.country.value,
            currency_code: currency.currency,
            property_country: this.state.country.label,
            property_city: values.city,
            postal_code: values.postal_code,
            username: this.state.username
        }

        let formData = new FormData();
        formData.append('property_details ', JSON.stringify(businessPlaceForm))
        if (this.state.property_country !== '') {

            SecurityServiceAPI.addBusinessPlace(formData).then(response => {
                if (response.data.status) {
                    this.setState({ business_place_form: false, loading: false })
                    toast.success(message.BUSINESS_PLACE_SUCCESS_MESSAGE)
                    this.props.history.push('/login')
                } else {
                    toast.warn(response.data.message)
                    this.setState({
                        loading: false,
                    })
                }
            }).catch(error => {
                toast.error(message.CATCH_ERROR_MESSAGE)
                this.setState({
                    loading: false,
                })
            })
        } else {
            toast.warn(message.COUNTRY_VALIDATION)
            this.setState({
                loading: false,
            })
        }

    }

    resendOtp = () => {
        SecurityServiceAPI.resendOTP(this.state.username).then(response => {
            if (response.data.status) {
                toast.success(message.OTP_SUCCESS)
            } else {
                toast.error(message.OTP_FAILURE)
            }
        })
    }

   

    render() {
        const { business_place_form } = this.state
        return (

            <div className="ms-signup-content-wrapper ms-auth signup-page">
                <div className="">
                    <div className="ms-signup-auth-col ms-signup-auth-bg d-flex justify-content-center ">
                        <div className="ms-signup-auth-form ">
                            {
                                business_place_form ? <BusinessPlaceForm
                                    handleCountryOnChange={this.handleCountryOnChange}
                                    businessPlaceFormHandler={this.businessPlaceFormHandler}
                                    state={this.state} /> :
                                    <SignupForm
                                        resendOtp={this.resendOtp}
                                        handleModal={this.handleModal}
                                        handleClickShowPassword={this.handleClickShowPassword}
                                        state={this.state}
                                        confirmSignupHandler={this.confirmSignupHandler}
                                        onChange={this.onChangeHandler}
                                        signupHandler={this.signupHandler} />
                            }
                            <SimpleModal
                                state={this.state}
                                extraLarge
                                handleClose={this.handleModal}
                                Heading="Terms & Condition">
                                <div dangerouslySetInnerHTML={this.state.tnc_details}></div>
                            </SimpleModal>
                            
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}