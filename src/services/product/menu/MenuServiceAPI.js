import axios from 'axios';
import * as APIUrl from '../../APIUrl';

export const addMenu=(payload)=>{
  
    try{
        return axios({
            method: 'post',
            url: APIUrl.ADD_MENU,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateMenu=(payload)=>{
   
    try{
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_MENU,
            data:payload
        })
    }catch(error){
        throw new Error(error)
    }
}

export const deleteMenu=(payload)=>{
    
    try{
        return axios({
            method: 'get',
            url: APIUrl.DELETE_MENU+payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchMenu=(payload)=>{
   
    try{

        return axios({
            method: 'get',
            url: APIUrl.FETCH_ALL_MENU+payload,
        })
    }catch(error){
        throw new Error(error)
    }
}