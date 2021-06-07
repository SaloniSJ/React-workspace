import axios from 'axios';
import * as APIUrl from '../../APIUrl'

export const addTable=(payload)=>{
   
    try{
        return axios({
            method: 'post',
            url:APIUrl.ADD_TABLE,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchTableInfo=(payload)=>{
   
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_TABLE_DETAILS+`${payload.page}&property_id=${payload.property_id}&size=${payload.size}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchVacantTableDetails=(payload)=>{
   
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_VACANT_TABLE_DETAILS+`${payload.page}&property_id=${payload.property_id}&size=${payload.size}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const approveTableRequest=(table_id)=>{
  
    try{
        return axios({
            method: 'get',
            url: APIUrl.APPROVE_TABLE_REQUEST+table_id,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const rejectTableRequest=(table_id)=>{
   
    try{
        return axios({
            method: 'get',
            url: APIUrl.REJECT_TABLE_REQUEST+table_id,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateTableReservationDetails=(payload)=>{
   
    try{
        return axios({
            method: 'post',
            url:APIUrl.UPDATE_TABLE_RESERVATION_DETAILS,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}