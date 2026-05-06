/******** Get User from store  ***********/
export const User = (store) => {
    return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Auth = (store) => {
    return User(store).loggedIn;
};
/******** Set Authorization token in header ***********/
export const setAuthorizationToken = (axios: any, token: any) => {
    const tokenLatest = getAccessToken()
    if (token) {
        axios.defaults.headers.common.Authorization = token || tokenLatest;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

/******** Set Access token from session ***********/
export const setAccessToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

/******** Get Access token from session ***********/
// export const getAccessToken = () => {
//     const localToken = JSON.parse(localStorage.getItem('token'))
//     return localToken;
// };

export const getAccessToken = () => {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const webToken = JSON.parse(localStorage.getItem('web-token'));

    return localToken || webToken || null; // Return whichever is found first, otherwise null
};


export const getAccessTokenPlugin = () => {
    const localToken = JSON.parse(localStorage.getItem('token') as string);
    const webToken = JSON.parse(localStorage.getItem('web-token') as string);

    if (localToken) {
        return { token: localToken, key: "token" };
    } else if (webToken) {
        return { token: webToken, key: "web-token" };
    }

    return null; // Return null if neither token is found
};
