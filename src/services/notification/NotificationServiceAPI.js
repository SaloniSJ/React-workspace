import axios from 'axios';
import * as APIUrl from '../APIUrl';

export const fetchAllNotification=(payload)=>{    
    try{
        return axios({
            method: 'get',
            url: APIUrl.FETCH_ALL_NOTIFICATION+`${payload.page}&size=${payload.size}&username=${payload.username}`,
        })
    }catch(error){
        throw new Error(error)
    }
}

export const updateNotificationSetting=(payload)=>{    
    try{
        return axios({
            method: 'put',
            url: APIUrl.UPDATE_NOTIFICATION_SETTING,
            data: payload
        })
    }catch(error){
        throw new Error(error)
    }
}

export const fetchNotificationSettings=(property_id)=>{    
    try{
        return axios({
            method: 'get',
            url: APIUrl.GET_NOTIFICATION_SETTING+`${property_id}`,
        })
    }catch(error){
        throw new Error(error)
    }
}
