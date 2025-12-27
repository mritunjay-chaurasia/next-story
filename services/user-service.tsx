import { objectToFormData } from "@/utils/helpers";
import { endpoint } from "../config/endpoints";
import { sendRequest } from "./http-service";

//user api call methods

export const profile = () => {
    return sendRequest(endpoint.user.PROFILE);
};

export const uploadMedia = (payload: any) => {
    return sendRequest(endpoint.user.UPLOAD_MEDIA, 'POST', payload, null, "multipart/form-data")
}

export const updateProfile = (payload: any) => {
    return sendRequest(endpoint.user.UPDATE_PROFILE, 'POST', payload)
}

export const changePassword = (payload: any) => {
    return sendRequest(endpoint.user.CHANGE_PASSWORD, 'POST', payload)
}

export const deleteAccount = (payload: any) => {
    return sendRequest(endpoint.user.DELETE_ACCOUNT, 'POST', payload)
}
