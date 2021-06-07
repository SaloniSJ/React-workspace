import axios from 'axios';
import * as APIUrl from '../APIUrl'

export const createPaymentAccount = (payload) => {
   
    try {
        return axios({
            method: 'post',
            url: APIUrl.CREATE_PAYMENT_ACCOUNT,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateCompanyDetails = (payload) => {
   
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_COMPANY_DETAILS,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updatePersonalDetailsWithDocument = (payload) => {
   
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_PERSONAL_DETAILS,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateBankDetails = (payload) => {
    
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_BANK_DETAILS,
            data: payload
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateTermsAndCondition = (property_id) => {
    
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_TERMS_AND_CONDITION+ property_id,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateTaxDetails = (payload) => {
   
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_TAX_DETAILS,
            data: payload
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchAccountStatus = (payload) => {
    
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ACCOUNT_DETAILS + `${payload.property_id}&username=${payload.username}`,
        })
    } catch (error) {
        throw new Error(error)
    }
}



export const fetchMerchantCategoryCodes = () => {
    
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_MCC_MERCHANT_CATEGORY_CODE,
        })
    } catch (error) {
        throw new Error(error)
    }
}



export const fetchAccountId = (property_id) => {
    
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ACCOUNT_ID + property_id,
        })
    } catch (error) {
        throw new Error(error)
    }
}
export const fetchTermsAndCondition = (country_code) => {
    
    try {
        return axios({
            method: 'get',
            url:APIUrl.FETCH_STRIPE_TERMS_AND_CONDITION + country_code,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchPayouts = (payload) => {
    
    try {
        return axios({
            method: 'get',
            url:APIUrl.FETCH_PAYOUT + payload.property_id
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchPayoutDetails = (payload) => {
    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_PAYOUT_DETAILS + `${payload.payout_id}&property_id=${payload.property_id}`
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchOrderDetailsByPayoutId = (payload) => {
    try {
        return axios({
            method: 'get',
            url:APIUrl.FETCH_ORDER_DETAILS_BY_PAYOUT_ID + `${payload.payment_id}&property_id=${payload.property_id}`,
        })
    } catch (error) {

    }
}