/* eslint-disable no-undef */
/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Maheshvar
 */
import axios from 'axios';
// import querystring from 'querystring';
import querystring from "querystring-es3";
import { setAuthorizationToken } from '../auth/index';
// import { toast } from 'react-toastify';
// toast.configure();
const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept-Language": "en",
    },
};

let logoutErrFlag = false;
const langHeaders = () => {
    // dbname:window.location.href.split('/')[3]
    const timeout = 5 * 60 * 1000; // response timeout set to 5 minute
    return {
        timeout,
        headers: {
            ...config.headers,
            lang: 'en',
            referrermodule: window.location.href,
        },
    };
};

const logout = (error, dispatch) => {
    logoutErrFlag = true;
    if (
        dispatch &&
        error.response.data &&
        error.response.data.statusCode === 403
    ) {
        dispatch({ type: 'SET_ACTIVE_MAIN_MENU', data: false });
        dispatch({ type: 'SET_ACTIVE_MENU_TITLE', data: '' });
        dispatch({ type: 'LOGOUT', data: {} });
    }
};
class ApiClient {
    static post(url, params, token = null, dispatch = null) {
        if (token) setAuthorizationToken(axios, token);
        // if (dispatch) dispatch({ type: 'SORT', data: {} }); // reset previous sorting when post any new records
        return new Promise((fulfill, reject) => {
            axios
                .post(url, JSON.stringify(params), langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    console.warn('Error :::::::', error);
                    if (error && error?.response) {
                        logout(error, dispatch);
                        fulfill(error?.response?.data);
                    } else {
                        // reject(error);
                        fulfill(error?.response?.data);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    static put(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);

        return new Promise(function (fulfill, reject) {
            axios
                .put(url, JSON.stringify(params), langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    static get(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        const query = querystring.stringify(params);
        url = query ? `${url}?${query}` : url;
        return new Promise(function (fulfill, reject) {
            axios
                .get(url, langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        // logout(error, dispatch);
                        const respData = {
                            ...error.response.data,
                            status: error?.status,
                        };
                        fulfill(respData);
                    } else {
                        // reject(error);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    static fetch(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        const query = querystring.stringify(params);
        url = query ? `${url}?${query}` : url;
        return new Promise(function (fulfill, reject) {
            axios
                .get(url, langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    static patch(url, params, token = null, dispatch = null) {
        return new Promise(function (fulfill, reject) {
            axios
                .patch(url, JSON.stringify(params), langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        fulfill(error.response.data);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    static delete(url, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        return new Promise(function (fulfill, reject) {
            axios
                .delete(url, langHeaders())
                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        fulfill(error.response.data);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }
    /*************** Form-Data Method without file for Create ***********/
    static _postFormData(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        if (dispatch) dispatch({ type: 'SORT', data: {} }); // reset previous sorting when post any new records
        return new Promise(function (fulfill, reject) {
            axios
                .post(url, params, {
                    ...langHeaders(),
                    ...{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            slug: localStorage.getItem('SLUG')
                                ? localStorage.getItem('SLUG')
                                : '',
                        },
                    },
                })

                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    /*************** Form-Data Method for Update ***********/
    static _putFormData(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        return new Promise(function (fulfill, reject) {
            // var body = new FormData();
            // body.append("file", params);
            axios
                .put(url, params, {
                    ...langHeaders(),
                    ...{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            slug: localStorage.getItem('SLUG')
                                ? localStorage.getItem('SLUG')
                                : '',
                        },
                    },
                })

                .then(function (response) {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        console.error('Error ::::::::::', error);
                    }
                });
        });
    }

    /*************** Form-Data post with file Method ***********/
    static postFormData(url, body, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        return new Promise((fulfill, reject) => {
            axios
                .post(url, body, {
                    // Merge langHeaders() with other headers
                    ...langHeaders(),
                    headers: {
                        ...langHeaders().headers, // Merge langHeaders with default config headers
                        "Content-Type": "multipart/form-data", // Set the content type for form data
                    },
                })

                .then((response) => {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch((error) => {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        console.error("Error ::::::::::", error);
                        if (error.response) {
                            fulfill(error.response?.data);
                        } else {
                            reject(error?.response?.data);
                            console.log("No error response available.");
                        }

                    }
                });
        });
    }

    /*************** Form-Data update with file Method ***********/
    static putFormData(url, body, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        return new Promise((fulfill, reject) => {
            axios
                .put(url, body, {
                    ...langHeaders(),
                    ...{
                        headers: {
                            ...langHeaders().headers,
                            "Content-Type": "multipart/form-data",
                        },
                    },
                })
                .then((response) => {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch((error) => {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        // reject(error);
                        console.error("Error ::::::::::", error);
                    }
                });
        });
    }

    /*************** Form-Data update with file Method ***********/
    static patchFormData(url, body, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
        return new Promise((fulfill, reject) => {
            axios
                .patch(url, body, {
                    // Merge langHeaders() with other headers
                    ...langHeaders(),
                    headers: {
                        ...langHeaders().headers, // Merge langHeaders with default config headers
                        "Content-Type": "multipart/form-data", // Set the content type for form data
                    },
                })
                .then((response) => {
                    const respData = {
                        ...response?.data,
                        status: response?.status,
                    };
                    fulfill(respData);
                })
                .catch((error) => {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error?.response?.data);
                        console.error("Error ::::::::::", error);
                    }
                });
        });
    }
}

export default ApiClient;
