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


export const getNotifications = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;


ApiClient.get(
  `${apiUrl}${version}/notification/notification-list`,
  data, // This should contain { page, limit, search }
  token
)

      .then((response: any) => {
        
        if (response.status === 200 || response.status === 201) {
          // Handle success
          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
          callback(response);
        } else {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
          callback(response);
        }
      })
      .catch((error: any) => {
        openNotificationWithIcon("error", error.message || "Something went wrong.");
        dispatch(handleIsLoading(false));
      });
  };
};


export const createNotification = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // API call to create a notification
    ApiClient.postFormData(`${apiUrl}${version}/notification/admin-notification`, data, token)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
        
         
          dispatch(handleIsLoading(false));
          //  openNotificationWithIcon("success", response.message);
          return callback(response); 
        } else if (response.status === 404) {
          openNotificationWithIcon(
            "error",
            response.message || "Resource not found."
          );
          dispatch(handleIsLoading(false)); 
          return callback(response); 
        } else {
          openNotificationWithIcon(
            "error",
            response.message || "Failed to send notification."
          );
          dispatch(handleIsLoading(false));
          return callback(response);
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while sending the notification."
        );
        dispatch(handleIsLoading(false)); 
        return callback(error);
      });
  };
};
