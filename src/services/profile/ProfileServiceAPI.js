import axios from 'axios';
import * as APIUrl from '../APIUrl'

export const addProfile = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.ADD_PROFILE_DETAILS,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadProfilePhoto = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPLOAD_PROFILE_PHOTO,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadCoverPhoto = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPLOAD_COVER_PHOTO,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const editProfileData = (payload) => {
    try {
        return axios({
            method: 'post',
            url: APIUrl.UPDATE_PROFILE_DETAILS,
            data: payload,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const updateEmail = (payload) => {
    try {
        return axios({
            method: 'put',
            url: APIUrl.UPDATE_EMAIL + `${payload.new_email}&old_email=${payload.old_email}`,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const verifyEmail = (payload) => {
    try {
        return axios({
            method: 'put',
            url: APIUrl.VERIFY_EMAIL + `${payload.otp}&username=${payload.username}`,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchProfile = (username) => {

    try {
        return axios({
            method: 'get',
            url: APIUrl.FETCH_PROFILE_DETAILS + username
        })
    }catch(error){
        console.log("Error in fetchProfile (service) :: ",error);
        throw new Error(error)
    }
}

export const fetchLoginSession = (username) => {
    return axios({
        method: 'get',
        url: APIUrl.FETCH_LOGIN_SESSION + username
    })
}