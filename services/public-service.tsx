import { endpoint } from "../config/endpoints";
import { sendRequest } from "./http-service";

export const getConfigurations = () => {
    return sendRequest(endpoint.public.CONFIGURATIONS);
};

export const getPublicStory = () => {
    return sendRequest(endpoint.public.PUBLIC_STORY);
};