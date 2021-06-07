import axios from 'axios';
import * as APIUrl from '../../APIUrl'

export const addCategory=(payload)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.ADD_CATEGORY,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const deleteCategory=(payload)=>{
    try{
        return axios({
            method: 'get',
            url: APIUrl.DELETE_CATEGORY+payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchCategory=(payload)=>{
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_CATEGORY+payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateCategory=(payload)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_CATEGORY,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}