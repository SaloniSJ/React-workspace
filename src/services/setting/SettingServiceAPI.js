import axios from 'axios';
import * as APIUrl from '../APIUrl'

export const uploadFeaturedImages =(payload)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.UPLOAD_FEATURED_IMAGE,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchBusinessTiming =(property_timing)=>{
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_BUSINESS_TIMING+property_timing,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updatePropertyTiming=(payload)=>{
    console.log(payload)
    try{
        return axios({
            method: 'put',
            url:APIUrl.UPDATE_PROPERTY_TIMING,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateDeliveryTiming=(payload)=>{
    console.log(payload)
    try{
        return axios({
            method: 'put',
            url:APIUrl.UPDATE_DELIVERY_TIMING,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateTakeAwayTiming=(payload)=>{
    console.log(payload)
    try{
        return axios({
            method: 'put',
            url:APIUrl.UPDATE_TAKEAWAY_TIMING,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateDineInTiming=(payload)=>{
    console.log(payload)

    try{
        return axios({
            method: 'put',
            url:APIUrl.UPDATE_DINE_IN_TIMING,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}
