import axios from 'axios';
import * as APIUrl from '../APIUrl';

export const searchOrder=(payload)=>{
    
    try{
        return axios({
            method: 'get',
            url: APIUrl.SEARCH_ORDER+`${payload.page}&property_id=${payload.property_id}&search_text=${payload.search_text}&size=${payload.size}&order_type=${payload.order_type}`,
        })
    }catch(error){
        console.log("Error in search order ::", error)
        throw new Error(error)
    }
}

export const updateOrderStatus=(payload)=>{
    
    try{
        return axios({
            method: 'put',
            url: APIUrl.UPDATE_ORDER_STATUS+`${payload.order_id}&order-status=${payload.order_status}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateOrderItemStatus=(payload)=>{
    
    try{
        return axios({
            method: 'put',
            url: APIUrl.UPDATE_ORDER_ITEM_STATUS+`${payload.order_id}&item-id=${payload.item_id}&order-item-status=${payload.order_item_status}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchTodaysOrder=(payload)=>{
   
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_TODAYS_ORDER+`${payload.page}&property_id=${payload.property_id}&size=${payload.size}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchOrder=(payload)=>{

    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ORDER+`${payload.page}&property_id=${payload.property_id}&size=${payload.size}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchOrderDetailsByOrderId=(payload)=>{
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ORDER_DETAILS_BY_ORDER_ID+`${payload.order_id}&page=${payload.page}&size=${payload.size}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const pushOrderNotificationToUser=(payload)=>{
    try{
        return axios({
            method:'get',
            url: APIUrl.PUSH_ORDER_NOTIFICATION_TO_USER+`?message=${payload.message}&order_id=${payload.order_id}&username=${payload.username}`
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchOrderMessages=()=>{
    try{
        return axios({
            method:'',
            url: APIUrl.FETCH_ORDER_MESSAGES
        })
    }catch(error){
        throw new Error(error)
    }
}