/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from '../api-client/apiClient';
// @ts-ignore
import { getAccessToken } from '../auth';
// @ts-ignore
import { PORT, apiUrl, version } from '../environment';

import { notification } from 'antd';
// import { loginSuccess, registerSuccess, loginFailed } from '@store/Auth/user';
import axios from 'axios';
import { handleIsLoading } from '../store/general';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

function openNotificationWithIcon(type: NotificationType, message: string) {
    notification[type]({
        message: message,
        placement: 'topRight',
    });
}

export const submitBusinessForm = (data: any, callback: any) => {
    // return (dispatch: any) => {
    //     const tokenRaw: any = getAccessToken();
    //     const token = `Bearer ${tokenRaw}`;
    //      dispatch(handleIsLoading(true));     
    //     let formData = new FormData();
    //     !data.isSetupCompleted && formData.append('logo', data?.profilePic);
    //     data?.businessName && formData.append('businessName', data?.businessName);
    //     !data.isSetupCompleted && data?.backgroundColor && formData.append('backgroundColor', data?.backgroundColor);
    //     data?.businessCategory && formData.append('category', data?.businessCategory);
    //     data?.businessDescription && formData.append('description', data?.businessDescription);
    //     data?.services && formData.append('services', data?.services);
    //     data?.banner && formData.append('banner', data?.banner);
    //     data?.selectedKey && formData.append('selectedKey', data?.selectedKey);
    //     data?.contactPerson && formData.append('contactPerson', data?.contactPerson);
    //     data?.contactNumber && formData.append('isSetupCompleted', data?.isSetupCompleted);
    //     data?.contactNumber && formData.append('contactNumber', data?.contactNumber);
    //     data?.address && formData.append('address', data?.address);
    //     data?.city && formData.append('city', data?.city);
    //     data?.state && formData.append('state', data?.state);
    //     data?.country && formData.append('country', data?.country);
    //     data?.link && formData.append('link', data?.link);
    //     data?.pinCode && formData.append('pinCode', data?.pinCode);
    //     data?.lat && formData.append('lat', data?.lat || 0);
    //     data?.long && formData.append('long', data?.long || 0);

    //     ApiClient.patchFormData(`${apiUrl}${PORT}${version}/admin/setup-business`, formData, token, dispatch)
    //         .then((response: any) => {
    //             if (response.status === 200 || response.status === 201) {
    //                 openNotificationWithIcon('success', response.message);
    //                 dispatch(handleIsLoading(false));
    //                 return callback(response);
    //             } else if (response.status === 404 || response.status === 413 || response.status === 403) {
    //                 openNotificationWithIcon('error', response.message);
    //                 dispatch(handleIsLoading(false));
    //                 return callback(response);
    //             } else {
    //                 openNotificationWithIcon('error', response.message);
    //                 dispatch(handleIsLoading(false));
    //             }
    //         })
    //         .catch((error: any) => {
    //             openNotificationWithIcon('error', error?.message);
    //             console.error(error);
    //             dispatch(handleIsLoading(false));
    //         });
    // };
};
