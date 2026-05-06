/*
 * @file: index.js
 * @description: It Contain rest functions for api call .
 * @author: Maheshvar
 */
import axios from 'axios';
import querystring from 'querystring';
import { setAuthorizationToken } from '../auth';
// import { toast } from 'react-toastify';
// toast.configure();
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

let logoutErrFlag = false;
const langHeaders = () => {
    // dbname:window.location.href.split('/')[3]
    return {
        headers: {
            ...config.headers,
            lang: 'en',
            referrermodule: window.location.href,
            slug: localStorage.getItem('SLUG')
                ? localStorage.getItem('SLUG')
                : '',
        },
    };
};

const logout = (error, dispatch) => {
    logoutErrFlag = true;
    // toast.dismiss();
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
class ApiBrokerFirm {
    static post(url, params, token = null, dispatch = null) {
        if (token) setAuthorizationToken(axios, token);
        return new Promise((fulfill, reject) => {
            axios
                .post(url, JSON.stringify(params), langHeaders())
                .then(function (response) {
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    static patch(url, params, token = null, dispatch = null) {
        return new Promise(function (fulfill, reject) {
            axios
                .patch(url, JSON.stringify(params), langHeaders())
                .then(function (response) {
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }
    /*************** Form-Data Method without file for Create ***********/
    static _postFormData(url, params, token = null, dispatch = null) {
        setAuthorizationToken(axios, token);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch(function (error) {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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

                .then((response) => {
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch((error) => {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
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
                            'Content-Type': 'multipart/form-data',
                            slug: localStorage.getItem('SLUG')
                                ? localStorage.getItem('SLUG')
                                : '',
                        },
                    },
                })
                .then((response) => {
                    // toast.dismiss();
                    fulfill(response.data);
                })
                .catch((error) => {
                    if (error && error.response && !logoutErrFlag) {
                        logout(error, dispatch);
                        fulfill(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }
}

export default ApiBrokerFirm;
