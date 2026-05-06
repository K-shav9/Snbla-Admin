/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from '../api-client/apiClient';
// @ts-ignore
import { PORT, apiUrl, version } from '../environment';
// @ts-ignore
import { getAccessToken } from '../auth';


import { notification } from 'antd';
import { handleIsLoading } from '../store/general';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

function openNotificationWithIcon(type: NotificationType, message: string) {
    notification[type]({
        message: message,
        placement: 'topRight', // You can change the placement if needed
    });
}

// *********** bussiness Details **********************
export const businessDetailsAction = (data: any, callback: any) => {
    // return (dispatch: any) => {
    //     dispatch(handleIsLoading(true));
    //     const tokenRaw: any = getAccessToken();
    //     const token = `Bearer ${tokenRaw}`;
    //     ApiClient.get(`${apiUrl}${PORT}${version}/admin/business-details`, data, token, dispatch).then(
    //         (response: any) => {
    //             // dispatch({ type: 'ISLOADING', data: false });
    //             if (response.status === 200 || response.status === 201) {
    //                 dispatch(handleIsLoading(false));
    //                 return callback(response);
    //             } else if (response.status === 404) {
    //                 dispatch(handleIsLoading(false));
    //                 return callback(response);
    //             } else {
    //                 // openNotificationWithIcon('error', response.message);
    //                 dispatch(handleIsLoading(false));
    //                 return callback(response);
    //             }
    //         }
    //     );
    // };
};
