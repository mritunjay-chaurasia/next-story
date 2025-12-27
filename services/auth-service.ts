import { sendRequest } from "./http-service";
import { endpoint } from "@/config/endpoints";

export const login=async(payload:any)=>{
  return sendRequest(endpoint.auth.LOGIN,'POST',payload);
}

export const signUp=async(payload:any)=>{
  return sendRequest(endpoint.auth.REGISTER,'POST',payload)
}

export const verifyUser=async(payload:any)=>{
  return sendRequest(endpoint.auth.VERIFY_USER,'POST',payload);
}

export const forgetPassword=async(payload:any)=>{
  return sendRequest(endpoint.auth.FORGOT_PASSWORD,'POST',payload);
}

export const resetPassword=async(payload:any)=>{
  return sendRequest(endpoint.auth.RESET_PASSWORD,'POST',payload);
}

export const resendOtp=async(payload:any)=>{
  return sendRequest(endpoint.auth.RESEND_OTP,'POST',payload);
}

export const googleLogin=async()=>{
  return sendRequest(endpoint.auth.GOOGLE_LOGIN,'GET')
}

export const googleAuthCallback=async(payload:any)=>{
  return sendRequest(endpoint.auth.GOOGLE_CALLBACK,'POST',payload)
}