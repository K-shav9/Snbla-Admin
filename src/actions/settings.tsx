import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../api-client/apiClient";

import { handleIsLoading, handleLoading } from "../store/general";
import { getAccessToken, setAuthorizationToken } from "../auth";
type NotificationType = "success" | "info" | "warning" | "error";
import { notification } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

function openNotificationWithIcon(type: NotificationType, message: string) {
  notification[type]({
    message: message,
    placement: "topRight", // You can change the placement if needed
  });
}

export const createSettings=(data:any,callback:any)=>{
   return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    ApiClient.post(`${apiUrl}${version}/setting/add-settings`, data, token)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(handleIsLoading(false));
          openNotificationWithIcon('success', 'Referral bonus settings saved successfully.');
          return callback(response); 
        } else if (response.status === 404) {
          openNotificationWithIcon('error', response.message || 'Resource not found.');
          dispatch(handleIsLoading(false));  
          return callback(response); 
        } else {
          // Other errors
          openNotificationWithIcon('error', response.message || 'Failed to save referral bonus settings.');
          dispatch(handleIsLoading(false));  
          return callback(response);
        }
      })
      .catch((error: any) => {
        console.error('API Error:', error);
        openNotificationWithIcon('error', 'An error occurred while saving the referral bonus settings.');
        dispatch(handleIsLoading(false));  
        return callback(error);
      })
      .finally(()=>{
        dispatch(handleIsLoading(false))
      })
  };
}

export const fetchSettings = (callback: any) => {
  return async (dispatch: any) => {
     dispatch(handleIsLoading(true));


    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

     ApiClient.get(`${apiUrl}${version}/setting/get-settings`, token)
     .then((response:any)=>{
      console.log("response++++",response.data)
       if (response.status === 200) {
        dispatch(handleIsLoading(false));
        return callback(response.data); // Send settings data to callback
      } else {
        openNotificationWithIcon("error", "Failed to fetch settings.");
        dispatch(handleIsLoading(false));
        return callback([]);
      }

     })
      .catch ((error:any)=>{
         console.error("API Error:", error);
      openNotificationWithIcon("error", "An error occurred while fetching settings.");
      dispatch(handleIsLoading(false));
      return callback([]);
      }) 
   
  };
};