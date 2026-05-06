/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from '../api-client/apiClient';
// @ts-ignore
import { getAccessToken, setAccessToken } from '../auth';
// @ts-ignore
import { PORT, apiUrl, version } from '../environment';

import { notification } from 'antd';
import { handleIsLoading, handleLoading } from '../store/general';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

function openNotificationWithIcon(type: NotificationType, message: string) {
    notification[type]({
        message: message,
        placement: 'topRight', // You can change the placement if needed
    });
}

export const inviteReferrerAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleLoading(true));
        ApiClient.post(
            `${apiUrl}${PORT}${version}/admin/invite-referrer`,
            data
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleLoading(false));
            }
        });
    };
};

// ************** Pay referral ********************//
export const payReferralAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        // dispatch(handleIsLoading(true));
        ApiClient.post(
            `${apiUrl}${PORT}${version}/admin/pay-referral`,
            data
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
            }
        });
    };
};

// ************** Pay referrer ********************//
export const payReferrerAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        // dispatch(handleIsLoading(true));
        ApiClient.post(
            `${apiUrl}${PORT}${version}/admin/pay-referrer`,
            data
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
            }
        });
    };
};


export const sendReferralAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleLoading(true));
        ApiClient.post(
            `${apiUrl}${PORT}${version}/admin/send-referral`,
            data
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleLoading(false));
            }
        });
    };
};
export const sendEmailToTheReferrerAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleIsLoading(true));
        ApiClient.post(
            `${apiUrl}${PORT}${version}/admin/send-email-to-referrer`,
            data
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
            }
        });
    };
};


export const getMyRefferersAction = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        const adminRoute = role === 1 ? "super-admin" : "admin";
        const endpoint = role === 1 ? "referrer-listByAdminId" : "get-my-referrer-list";
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/${adminRoute}/${endpoint}`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

// **** get all referrers list for super admin ************** //
export const getAllSuperAdminRefferers = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/super-admin/get-all-SNBLA-referrers`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

// **** get all referrals list for super admin ************** //
export const getAllSuperAdminReferrals = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/super-admin/get-all-SNBLA-referrals`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};
// ************ Pay super admin referrals ******************* //
export const paySuperAdminReferrals = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        // dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.post(
                    `${apiUrl}${PORT}${version}/super-admin/mark-refererus-referral-successfull`,
                    data,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        // dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

// ************ Pay super admin referrers ******************* //
export const paySuperAdminReferrers = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        // dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.post(
                    `${apiUrl}${PORT}${version}/super-admin/pay-SNBLA-referral`,
                    data,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        // dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

export const uploadReferrerAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleIsLoading(true));
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        ApiClient._postFormData(
            `${apiUrl}${PORT}${version}/admin/bulk-invite-referrer`,
            data,
            token
        ).then((response: any) => {
            if (response.status === 200 || response.status === 201) {
                openNotificationWithIcon('success', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else if (response.status === 404) {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
                return callback(response);
            } else {
                openNotificationWithIcon('error', response.message);
                dispatch(handleIsLoading(false));
            }
        });
    };
};

// Get outstanding referrals
export const getOutstandingReferralsAction = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        // dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/admin/outstanding-referrals/${data?.referrerId}`,
                    {},
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};
// ********** get super admin outstanding payment list ************ //
export const getSuperAdminReferrersOutstanding = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        // dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/super-admin/get-all-outstanding-referrerus-referrals`,
                    data,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        // dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

// Get Send email reminder to referrer
export const sendEmailreminderToReferrerAction = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.post(
                    `${apiUrl}${PORT}${version}/admin/send-email-reminder-referrer/${data?.invite_id}`,
                    {},
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                        openNotificationWithIcon('success', response.message);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        openNotificationWithIcon('error', response.message);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        openNotificationWithIcon('error', response.message);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};


// *********** Get referrers payment list *********************** //
export const getRefferersPaymentList = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/admin/payment-referrer`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        callback(response);
                        dispatch(handleIsLoading(false))
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        callback(response);
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                callback(err);
            }
        }
    };
};

// ********** get notifications count ******************* //
export const getReferrerNotificationCount = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/admin/notification-count`,
                    data,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(businessIReferListFailed(response));
                        dispatch(handleIsLoading(false))
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(businessIReferListFailed(response));
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
};
// ********** update notifications count ******************* //
export const updateReferrerNotificationCount = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role } = data;
        const adminRoute = role === 1 ? "super-admin" : "admin";
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.post(
                    `${apiUrl}${PORT}${version}/${adminRoute}/notification-count-reset/${data?.resetType}`,
                    {},
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        // dispatch(businessIReferListFailed(response));
                        dispatch(handleIsLoading(false))
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(businessIReferListFailed(response));
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
};


export const getBusinessIReferAction = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/admin/get-businesses-refer-list`,
                    data,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
};

export const getMyRefferalAction = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        const adminRoute = role === 1 ? "super-admin" : "admin";
        const endpoint = role === 1 ? "referreral-listByAdminId" : "get-my-referral-list";
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/${adminRoute}/${endpoint}`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        const actionData = {
                            ...response,
                            data: response?.user,
                        };
                        // dispatch(loginSuccess(actionData));
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(loginFailed(response));
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(loginFailed(response));
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
};

// *********** Refer SNBLA action **********************
export const referSNBLAAction = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleLoading(true));
        ApiClient.post(`${apiUrl}${PORT}${version}/refer/refer-SNBLA`, data).then(
            (response: any) => {
                // dispatch({ type: 'ISLOADING', data: false });
                if (response.status === 200 || response.status === 201) {
                    openNotificationWithIcon('success', response.message);
                    // dispatch(registerSuccess(response.data));
                    dispatch(handleLoading(false));
                    return callback(response);
                } else if (response.status === 404) {
                    openNotificationWithIcon('error', response.message);
                    dispatch(handleLoading(false));
                    return callback(response);
                } else {
                    openNotificationWithIcon('error', response.message);
                    dispatch(handleLoading(false));
                }
            }
        );
    };
};

// ********** Add Refer Us Network ***********************//
export const addSNBLANetwork = (data: any, callback: any) => {
    return (dispatch: any) => {
        dispatch(handleLoading(true));
        ApiClient.post(`${apiUrl}${PORT}${version}/blog/addBlog`, data).then(
            (response: any) => {
                if (response.status === 200 || response.status === 201) {
                    openNotificationWithIcon('success', response.message);
                    dispatch(handleLoading(false));
                    return callback(response);
                } else if (response.status === 404) {
                    openNotificationWithIcon('error', response.message);
                    dispatch(handleLoading(false));
                    return callback(response);
                } else {
                    openNotificationWithIcon('error', response.message);
                    dispatch(handleLoading(false));
                }
            }
        );
    };
};

// ********** Get Refer Us Network ***********************//
export const getSNBLANetwork = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/blog/getBlog`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        dispatch(handleIsLoading(false))
                        callback(response?.data);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
}

export const getAllSNBLA = (data: any, callback: any) => {
    return (dispatch: any, getState: any) => {
        const tokenRaw: any = getAccessToken();
        const token = `Bearer ${tokenRaw}`;
        const { role, ...rest } = data;
        dispatch(handleIsLoading(true))
        try {
            if (tokenRaw) {
                ApiClient.get(
                    `${apiUrl}${PORT}${version}/super-admin/refer-SNBLA-list`,
                    rest,
                    token,
                    dispatch
                ).then((response: any) => {
                    if (response.status === 200) {
                        const actionData = {
                            ...response,
                            data: response?.user,
                        };
                        // dispatch(loginSuccess(actionData));
                        dispatch(handleIsLoading(false))
                        callback(response);
                    } else if (response.status === 404) {
                        console.error('Error 404:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(loginFailed(response));
                    } else {
                        console.error('Error:::::::::::::', response);
                        dispatch(handleIsLoading(false))
                        // dispatch(loginFailed(response));
                    }
                });
            }
        } catch (err) {
            if (err) {
                console.error('Error catched::::::::::', err);
                // dispatch(loginFailed(err));
            }
        }
    };
};

export const getAllAdminNotificationCount = (data: any, callback: any) => {
    // return (dispatch: any, getState: any) => {
    //     const tokenRaw: any = getAccessToken();
    //     const token = `Bearer ${tokenRaw}`;
    //     dispatch(handleIsLoading(true))
    //     try {
    //         if (tokenRaw) {
    //             ApiClient.get(
    //                 `${apiUrl}${PORT}${version}/super-admin/dashboard-count`,
    //                 {},
    //                 token,
    //                 dispatch
    //             ).then((response: any) => {
    //                 if (response.status === 200) {
    //                     dispatch(handleIsLoading(false));
    //                     callback(response);
    //                 } else if (response.status === 404) {
    //                     console.error('Error 404:::::::::::::', response);
    //                     dispatch(handleIsLoading(false))
    //                     // dispatch(loginFailed(response));
    //                 } else {
    //                     console.error('Error:::::::::::::', response);
    //                     dispatch(handleIsLoading(false))
    //                     // dispatch(loginFailed(response));
    //                 }
    //             });
    //         }
    //     } catch (err) {
    //         if (err) {
    //             console.error('Error catched::::::::::', err);
    //             // dispatch(loginFailed(err));
    //         }
    //     }
    // };
};