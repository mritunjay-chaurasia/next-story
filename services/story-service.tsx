import { endpoint } from "../config/endpoints";
import { sendRequest } from "./http-service";

export const myStories = (params: any = {}) => {
  return sendRequest(endpoint.story.LIST, "GET", params);
};

export const getStory = (id: any, params: any = {}) => {
  return sendRequest(endpoint.story.VIEW + "/" + id, "GET", params);
};

export const createStory = (payload: any) => {
  return sendRequest(endpoint.story.CREATE, "POST", payload);
};

export const updateStory = (id: string, payload: any = {}) => {
  return sendRequest(endpoint.story.UPDATE + "/" + id, "POST", payload);
};

export const payForStory = (id: string, payload: any = {}) => {
  return sendRequest(endpoint.story.PAY + "/" + id, "POST", payload);
};

export const generateNewAIImage = (id: string, payload: any = {}) => {
  return sendRequest(endpoint.story.IMAGE + "/" + id, "POST", payload);
};

export const regenerateCharacter = (id: string, payload: any = {}) => {
  return sendRequest(endpoint.story.CHARACTER + "/" + id, "POST", payload);
};
export const updateCoverImage = (id: string, payload: any = {}) => {
  return sendRequest(endpoint.story.UPDATE_COVER_IMAGE + "/" + id, "POST", payload);
};

export const regenrateStory = (id: any, payload: any = {}) => {
  return sendRequest(endpoint.story.REGENERATE + "/" + id, "POST", payload);
};

export const regenrateStoryCover = (id: any, payload: any = {}) => {
  return sendRequest(endpoint.story.REGENERATE_COVER + "/" + id, "POST", payload);
};

export const fetchUserCharactersReq = (params: any = {}) => {
  return sendRequest(endpoint.character.LIST, "GET", params);
};

export const getStoryFrontCoverEditor = (id: any) => {
  return sendRequest(endpoint.story.COVER_EDITOR + "/" + id, "GET");
};

