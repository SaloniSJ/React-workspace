import axios from 'axios';
import * as APIUrl from '../APIUrl'

export const signup = (payload) => {

    try {
        return axios({
            method: 'post',
            url: APIUrl.SIGNUP,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const confirmSignup = (payload) => {

    try {
        return axios({
            method: 'post',
            url: APIUrl.CONFIRM_SIGNUP,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const addBusinessPlace = (payload) => {
 
    try {
        return axios({
            method: 'post',
            url: APIUrl.ADD_BUSINESS_PROPERTY,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateBusinessPlace = (payload) => {

    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_BUSINESS_PROPERTY,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchBusinessPlace = (username) => {

    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_BUSINESS_PROPERTY + username,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const signin = (payload) => {

    try {
        return axios({
            method: 'post',
            url: APIUrl.SIGNIN,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchAllCurrencies = () => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ALL_CURRENCIES,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const forgotPassword = (email) => {

    try {
        return axios({
            method: 'get',
            url: APIUrl.FORGOT_PASSWORD + email,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchGoogleAPIKey = () => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_GOOGLE_API_KEY,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchLatitudeAndLongitudeByAddress = (payload) => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_LATITUDE_AND_LONGITUDE_BY_ADDRESS + `${payload.property_address}&city=${payload.property_city}&country=${payload.property_country}`,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchBusinessType = () => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_BUSINESS_TYPE,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const confirmForgotPassword = (payload) => {

    try {
        return axios({
            method: 'post',
            url: APIUrl.CONFIRM_FORGOT_PASSWORD,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const resendOTP = (username) => {

    try {
        return axios({
            method: 'get',
            url: APIUrl.RESEND_OTP + username
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const isMFAActivated = (email) => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_MFA_DETAILS_BY_EMAIL + email,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const needPasswordChange = (email) => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.NEED_PASSWORD_CHANGE_BY_EMAIL + email,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const needPasswordChangeUpdate = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.NEED_PASSWORD_CHANGE_UPDATE,
            data:payload
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchTermsAndCondition = () => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_TERMS_AND_CONDITION,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const verifyToken = () => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.VERIFY_TOKEN,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const resetPassword = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.RESET_PASSWORD,
            data:payload
        })
    }catch (error) {
        throw new Error(error)
    }
}

export const signout = () => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.SIGNOUT,
        })
    }catch (error) {
        throw new Error(error)
    }
}