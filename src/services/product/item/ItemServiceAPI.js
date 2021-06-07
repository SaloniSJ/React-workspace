import axios from 'axios';
import * as APIUrl from '../../APIUrl'

export const addItem=(payload)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.ADD_ITEM,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateItem=(payload)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_ITEM,
            data:payload,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchItemByItemId=(id)=>{
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ITEM_BY_ITEM_ID+id,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const deleteItem=(id)=>{
   
    try{
        return axios({
            method: 'get',
            url: APIUrl.DELETE_ITEM+id,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchItem=(id)=>{
    
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ITEM+id,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const duplicateItem=(id)=>{
    try{
        return axios({
            method: 'post',
            url: APIUrl.DUPLICATE_ITEM+id,
        })
    }catch(error){
        throw new Error(error)
    }

}