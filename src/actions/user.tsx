/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from "../api-client/apiClient";
// @ts-ignore
import {
  getAccessToken,
  getAccessTokenPlugin,
  setAccessToken,
  setAuthorizationToken,
} from "../auth/index";

import { notification } from "antd";
import axios from "axios";
import { handleIsLoading, handleLoading } from "../store/general";
import { loginFailed, loginSuccess, registerSuccess, storeMyProfile } from "../store/Auth/user";
type NotificationType = "success" | "info" | "warning" | "error";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

export function openNotificationWithIcon(type: NotificationType, message: string) {
  notification[type]({
    message: message,
    placement: "topRight", // You can change the placement if needed
  });
}


export const getAllMerchants = (data: any) => {
  return (dispatch: any) => {

    dispatch(handleIsLoading(true));

    return new Promise<any>((resolve, reject) => {
      const { role, ...rest } = data;
      ApiClient.get(
        `${apiUrl}${version}/admin/get-all-users`,
        rest)
        .then((response: any) => {
          if (response.status === 200) {
            resolve(response); // Resolve with the response data
            dispatch(handleIsLoading(false));

          } else {
            reject(new Error("Error fetching users"));
            dispatch(handleIsLoading(false));

          }
        })
        .catch((error: any) => {
          reject(error); // Reject with the error
          dispatch(handleIsLoading(false));

        });
    });
  }
};


export const adminAndMerchantLogin = (data: any, userType: "admin" | "merchant", callback: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));
    ApiClient.post(`${apiUrl}${version}/auth/login`, data).then((response: any) => {
      dispatch(handleLoading(false));
      if (response.status === 200 || response.status === 201) {
        const roleId = response?.data?.roleId;

        if ((userType === "admin" && roleId !== 1) || (userType === "merchant" && roleId !== 2)) {
          // openNotificationWithIcon("error", "Not authorized to access this portal");
          return;
        }

        // openNotificationWithIcon("success", response.message);
        dispatch(loginSuccess(response));
        setAccessToken(response?.token);

        // if (response?.token) {
        //   localStorage.setItem("token", response?.token);
        // }

        return callback(response);

      } else {
        openNotificationWithIcon("error", response.message);
        return callback(response);
      }
    }).catch((error: any) => {
      dispatch(handleLoading(false));
      openNotificationWithIcon("error", error?.message || "Login failed");
      return callback(error);
    });
  };
};


export const userLogout = (callback: any) => {
  return (dispatch: any) => {
    // dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();

    const token = `Bearer ${tokenRaw}`;


    ApiClient.post(
      `${apiUrl}${version}/auth/logout`,
      {},
      token,
      dispatch
    ).then((response: any) => {
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        localStorage.clear();
        // dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response.status === 404) {
        openNotificationWithIcon("error", response.message);
        // dispatch(handleIsLoading(false));
        callback(response);
      } else {
        openNotificationWithIcon("error", response.message);
        // dispatch(handleIsLoading(false));
        callback(response);
      }
    });
  };
};

// forgot-password
export const forgotPassword = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));
    ApiClient.post(
      `${apiUrl}${version}/auth/forgot-password`,
      data
    ).then((response: any) => {
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else if (response.status === 404) {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
      }
    });
  };
};

// Change-password after forgot
export const changePassword = (data: any, callback: any, token: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));

    // Set the Authorization header with Bearer token
    setAuthorizationToken(axios, `Bearer ${token}`);

    ApiClient.patch(
      `${apiUrl}${version}/auth/reset-password`,
      data,
      dispatch
    ).then((response: any) => {
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else if (response.status === 404) {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
      }
    });
  };
};

// change-password after login
export const changeAccountPassword = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `${tokenRaw}`;
    setAuthorizationToken(axios, `Bearer ${token}`);

    ApiClient.patch(
      `${apiUrl}${version}/auth/change-password`,
      data,
      token,
      dispatch
    ).then((response?: any) => {
      if (response?.status === 200 || response?.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response?.status === 404) {
        openNotificationWithIcon("error", response.message);
        dispatch(handleIsLoading(false));
        return callback(response);
      } else {
        openNotificationWithIcon("error", response.message);
        dispatch(handleIsLoading(false));
        return callback(response);
      }
    });
  };
};

// Get Profile 
export const checkuser = (callback: any) => {
  return (dispatch: any, getState: any) => {
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    try {
      if (tokenRaw) {
        ApiClient.get(
          `${apiUrl}${version}/auth/my-profile`,
          {},
          token,
          dispatch
        )
          .then((response: any) => {
            if (response?.status === 200) {
              const actionData = {
                ...response,
                data: response?.data, // Change response.user to data from here

              };
              dispatch(loginSuccess(actionData));
              return callback(response);
            } else if (response?.status === 404 || response.status === 401) {
              dispatch(loginFailed(response));
              return callback(response);
            } else {
              dispatch(loginFailed(response));
              return callback(response);
            }
          })
          .catch((error: any) => {
            dispatch(loginFailed(error));
            return callback(error);
          });
      }
    } catch (err) {
      if (err) {
        dispatch(loginFailed(err));
      }
    }
  };
};


export const checkMobileUser = (tokenRaw: any, callback: any) => {
  return (dispatch: any, getState: any) => {
    const token = `Bearer ${tokenRaw}`;
    try {
      if (tokenRaw) {
        ApiClient.get(
          `${apiUrl}${version}/auth/my-profile`,
          {},
          token,
          dispatch
        )
          .then((response: any) => {
            if (response.status === 200) {
              const actionData = {
                ...response,
                data: response?.data, // Change response.user to data from here

              };
              dispatch(loginSuccess(actionData));
              return callback(response);
            } else if (response.status === 404 || response.status === 401) {
              dispatch(loginFailed(response));
              return callback(response);
            } else {
              dispatch(loginFailed(response));
              return callback(response);
            }
          })
          .catch((error: any) => {
            dispatch(loginFailed(error));
            return callback(error);
          });
      }
    } catch (err) {
      if (err) {
        dispatch(loginFailed(err));
      }
    }
  };
};


export const user = (params: any) => {
  return (dispatch: any, getState: any) => {
    const {
      user: { token },
    } = getState();
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}/users`, params, token, dispatch).then(
      (response: any) => {
        dispatch({ type: "ISLOADING", data: false });

        if (response.messageID === 200) {
          dispatch({ type: "LIST_USERS", data: response.data });
        } else if (response.messageID === 404) {
          // toast.warn(response.message);
        } else {
          // toast.error(response.message);
        }
      }
    );
  };
};

// *********** register referrer **********************
export const userRegister = (data: any, callback: any) => {
  return (dispatch: any) => {
    ApiClient.post(`${apiUrl}${version}/admin/register`, data).then(
      (response: any) => {
        // dispatch({ type: 'ISLOADING', data: false });
        if (response.status === 200 || response.status === 201) {
          // openNotificationWithIcon('success', response.message);
          dispatch(registerSuccess(response.data));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon('error', response.message);
          return callback(response);
        } else {
          openNotificationWithIcon('error', response.message);
        }
      }
    );
  };
};

// *********** update acount(Profile) details **********************
export const updateAdminAndMerchantProfileDetails = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.patchFormData(
      `${apiUrl}${version}/auth/profile`,
      data,
      token,
      dispatch
    ).then((response: any) => {
      // dispatch({ type: 'ISLOADING', data: false });
      dispatch(handleIsLoading(false));
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(storeMyProfile(response?.data))
        dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response.status === 404 || response.status === 400) {
        dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
        return callback(response);
      } else {
        dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
      }
    })
      .catch((error: any) => {
        dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", error?.message || `An error occurred while updating the profile. ${error}`);
      });
  };
};


export const updateBasicDetails = (data: any, callback: any) => {
  return (dispatch: any) => {
    // dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.patchFormData(
      `${apiUrl}${version}/auth/profile`,
      data,
      token,
      dispatch
    ).then((response: any) => {
      // dispatch({ type: 'ISLOADING', data: false });
      // dispatch(handleIsLoading(false));
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(storeMyProfile(response?.data))
        // dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response.status === 404 || response.status === 400) {
        // dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
        return callback(response);
      } else {
        // dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
      }
    })
      .catch((error: any) => {
        // dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", error?.message || `An error occurred while updating the profile. ${error}`);
      });
  };
};




export const forgot_password = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(`${apiUrl}/auth/forgot-password`, data).then(
      (response: any) => {
        dispatch({ type: "ISLOADING", data: false });

        if (response.messageID === 200) {
          // toast.success(response.message);
          dispatch({ type: "FORGOTPASSWORD", data });
          return callback(response);
        } else if (response.messageID === 404) {
          // toast.warn(response.message);
          return callback(response);
        } else {
          // toast.error(response.message);
        }
      }
    );
  };
};

export const check_password_token = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch({ type: "ISLOADING", data: true });
    ApiClient.get(
      `${apiUrl}/auth/check-password-token/${data.token}`,
      dispatch
    ).then((response: any) => {
      dispatch({ type: "ISLOADING", data: false });

      if (response.messageID === 200) {
        // toast.success(response.message);
        dispatch({ type: "PASSWORDTOKEN", data: response.data });
        // return callback(response);
      } else if (response.messageID === 404) {
        // toast.warn(response.message);
        // return callback(response);
      } else {
        // toast.error(response.message);
      }
    });
  };
};

export const logout = (data: any, callback: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: "ISLOADING", data: true });
    const {
      user: { token },
    } = getState();
    localStorage.setItem("LOGOUT", JSON.stringify(true));
    ApiClient.get(`${apiUrl}/auth/logout`, data, token, dispatch).then(
      (response: any) => {
        dispatch({ type: "ISLOADING", data: false });

        if (response.messageID === 200) {
          // toast.success(response.message);
          dispatch({ type: "LOGOUT", data: {} });
          dispatch({ type: "DETAILS_GROUP", data: {} });
          return callback(response);
        } else if (response.messageID === 404) {
          return callback(response);
        } else {
          dispatch({ type: "LOGOUT", data: {} });
          // toast.error(response.message);
        }
      }
    );
  };
};

export const loader = (flag: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: "ISLOADING", data: flag });
  };
};

export const set_active_tab = (tab: any) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: "SET_ACTIVE_TAB", data: tab });
  };
};


export const requestOtp = (data: any, callback: any) => {
  return (dispatch: any) => {
    ApiClient.post(`${apiUrl}${version}/auth/request-otp`, data).then(
      (response: any) => {
        // dispatch({ type: 'ISLOADING', data: false });
        if (response.status === 200 || response.status === 201) {
          dispatch(registerSuccess(response.data));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon('error', response.message);
          return callback(response);
        } else {
          openNotificationWithIcon('error', response.message);
        }
      }
    );
  };
};

export const resendOtp = (data: any, callback: any) => {
  return (dispatch: any) => {
    ApiClient.post(`${apiUrl}${version}/auth/resend-otp`, data)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(registerSuccess(response.data));
        } else if (response.status === 404) {
          openNotificationWithIcon('error', response.message);
        } else {
          openNotificationWithIcon('error', response.message);
        }
        return callback(response);
      })
      .catch((error: any) => {
        openNotificationWithIcon('error', 'Failed to resend OTP');
        console.error("Resend OTP error:", error);
        return callback({ status: 500, message: 'Failed to resend OTP' });
      });
  };
};

// export const registerUser = (data: any, callback: any) => {
//   return (dispatch: any) => {
//     // Send register user request
//     ApiClient.post(`${apiUrl}${version}/auth/register-user`, data)
//       .then((response: any) => {
//         // if (response.status === 200 || response.status === 201) {
//         //     openNotificationWithIcon('success', response.message);
//         //     dispatch(registerSuccess(response.data));
//         //     return callback(response);
//         // } else if (response.status === 404) {
//         //     openNotificationWithIcon('error', response.message);
//         //     return callback(response);
//         // } else {
//         //     openNotificationWithIcon('error', response.message);
//         // }
//         if (response.success === true) {
//           openNotificationWithIcon('success', response.message);
//           dispatch(registerSuccess(response.data));
//           return callback(response);
//         }
//         else {
//           openNotificationWithIcon('error', response.message);
//           return callback(response);
//         }
//       })
//       .catch((error: any) => {
//         openNotificationWithIcon('error', 'Failed to Register');
//         console.error(error);
//       });
//   };
// };

// export const loginUser = (data: any, callback: any) => {
//   return (dispatch: any) => {
//     dispatch(handleLoading(true));
//     // Send Login request
//     ApiClient.post(`${apiUrl}${version}/auth/login-user`, data)
//       .then((response: any) => {

//         if (response.status === 200 || response.status === 201) {
//           console.log("navigate in user")

//           openNotificationWithIcon('success', response.message);
//           dispatch(loginSuccess(response));
//           // setAccessToken(response?.token);
//           const tokenKey = data?.isPlugin ? "web-token" : "token";

//           if (response?.token) {
//             localStorage.setItem(tokenKey, JSON.stringify(response?.token));
//           } else {
//             console.log("No token received");
//           }


//           dispatch(handleLoading(false));
//           return callback(response);
//         } else if (response.status === 404) {
//           openNotificationWithIcon('error', response.message);
//           dispatch(handleLoading(false));
//           return callback(response);
//         } else {
//           openNotificationWithIcon('error', response.message);
//           dispatch(handleLoading(false));

//         }
//       })
//       .catch((error: any) => {
//         openNotificationWithIcon('error', 'Login Failed');
//         console.error(error);
//       });
//   };
// };

// get merchant-package in pick goal

export const registerUser = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading only if isPlugin is not true
    // if (!data?.isPlugin) {
    //   dispatch(handleLoading(true));
    // }
    // Send register user request
    const tokenKey = data?.isPlugin ? "web-token" : "token";
    ApiClient.post(`${apiUrl}${version}/auth/register-user`, data)
      .then((response: any) => {

        if (response.success === true) {
          // openNotificationWithIcon('success', response.message);
          // dispatch(registerSuccess(response.data));
          // console.log("response---", response)
          dispatch(loginSuccess(response));
          // console.log(tokenKey, data, response, "response");

          if (response?.token) {
            localStorage.setItem(tokenKey, JSON.stringify(response?.token));
          } else {
            console.log("No token received");
          }
          return callback(response);
        }
        else {
          openNotificationWithIcon('error', response.message);
          return callback(response);
        }
      })
      .catch((error: any) => {
        openNotificationWithIcon('error', 'Failed to Register');
        console.error(error);
      });
  };
};

export const loginUser = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading only if isPlugin is not true
    if (!data?.isPlugin) {
      dispatch(handleLoading(true));
    }

    // Send Login request
    ApiClient.post(`${apiUrl}${version}/auth/login-user`, data)
      .then((response: any) => {
        const { status, message, token } = response;

        // Handle success (status 200 or 201)
        if (status === 200 || status === 201) {

          // openNotificationWithIcon('success', message);
          dispatch(loginSuccess(response));

          // Set token in localStorage
          const tokenKey = data?.isPlugin ? "web-token" : "token";
          if (token) {
            localStorage.setItem(tokenKey, JSON.stringify(token));
          } else {
            console.log("No token received");
          }

          // Call callback with response
          callback(response);
        } else {
          // Handle other statuses (e.g., 404)
          openNotificationWithIcon('error', message || 'Login Failed');
          callback(response);
        }
      })
      .catch((error: any) => {
        // Handle network or API errors
        openNotificationWithIcon('error', 'Login Failed');
        console.error(error);
      })
      .finally(() => {
        // Stop loading only if isPlugin is not true
        if (!data?.isPlugin) {
          dispatch(handleLoading(false));
        }
      });
  };
};

export const getPackageByMerchant = (data: { merchantId?: number, userId?: number }, callback: (response: any) => void) => {
  return async (dispatch: any) => {
    try {
      dispatch(handleIsLoading(true));

      const response: any = await ApiClient.get(`${apiUrl}${version}/package/merchant-package/${data?.merchantId}`, { userId: data?.userId })

      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.data.message || "Merchant data retrieved successfully.");
        dispatch(handleIsLoading(false));
        callback(response);
      } else {
        // openNotificationWithIcon("error", response.data.message || "Failed to fetch merchant data.");
        dispatch(handleIsLoading(false));
        callback(response);
      }
    } catch (error: any) {
      // openNotificationWithIcon("error", error?.response?.data?.message || "Something went wrong.");
      dispatch(handleIsLoading(false));
    }
  };
};


// For creating goal
export const updateUserOffer = (data: any, callback: any) => {
  return async (dispatch: any) => {
    // dispatch(handleIsLoading(tclg
    // rue)); // Start loading indicator
    console.log("update data---", data)
    try {
      const tokenRaw: any = getAccessToken();
      const token = `Bearer ${tokenRaw}`;

      // console.log("Token:", token);

      setAuthorizationToken(axios, `Bearer ${tokenRaw}`);


      const response: any = await ApiClient.patch(
        `${apiUrl}${version}/plan/update`,
        data,
        // token
      );

      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon(
        //   "success",
        //   response.message || "Plan updated successfully."
        // );
        // dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response.status === 404) {
        openNotificationWithIcon(
          "error",
          response.message || "Plan not found."
        );
      } else {
        openNotificationWithIcon(
          "error",
          response.message || "Failed to update the plan."
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      openNotificationWithIcon(
        "error",
        "An error occurred while updating the plan."
      );
    } finally {
      // dispatch(handleIsLoading(false)); // Stop loading
    }
  };
};

// **** get all User Wallets For User ************** //
export const getTransactionsByUserId = (params: { page: number; pageSize: number, userId: string },
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;


    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/payment/payment-list`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // Resolve the response
          } else {
            const errorMsg = response.message || "Failed to fetch wallets.";
            // openNotificationWithIcon("error", errorMsg);
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); // Reject with an error
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while fetching wallets.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // Reject with the error
        });
    });
  };
};

// **** get  transactions for specific wallet ************** //
export const getWalletTransactionsByUserId = (params: {
  walletId: string
  userId: string;
}) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/payment/payment-list`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // Resolve the response
          } else {
            const errorMsg = response.message || "Failed to fetch wallets.";
            // openNotificationWithIcon("error", errorMsg);
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); // Reject with an error
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while fetching wallets.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // Reject with the error
        });
    });
  };
};

// **** get all Wallets For User ************** //
export const getWalletsByUserId = (params: { page: number; pageSize: number, userId: string },
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;


    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/wallet/get-all`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // Resolve the response
          } else {
            const errorMsg = response.message || "Failed to fetch wallets.";
            // openNotificationWithIcon("error", errorMsg);
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); // Reject with an error
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while fetching wallets.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // Reject with the error
        });
    });
  };
};



// export const getIp = () => {



//   return (dispatch: any) => {
//     return new Promise<any>((resolve, reject) => {
//       axios.get(`https://ipinfo.io/json`)
//         .then((response: any) => {
//           console.log("getresp---", response);

//           if (response.status === 200) {
//             resolve(response.data); // Resolve with the actual response data
//           } else {
//             reject(new Error("Error fetching IP details"));
//           }
//         })
//         .catch((error: any) => {
//           reject(error); // Reject in case of error
//         });
//     });
//   };
// };


export const payWithCard = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));
    ApiClient.post(
      `${apiUrl}${version}/payment/pay-with-card`,
      data
    ).then((response: any) => {
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else if (response.status === 404) {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else {
        openNotificationWithIcon("error", response.message);
        dispatch(handleLoading(false));
        return callback(response);
      }
    });
  };
};


export const getPaymentStatus = (data: any, callback: any) => {
  return (dispatch: any) => {
    const token = getAccessToken();
    setAuthorizationToken(axios, `Bearer ${token}`);

    ApiClient.post(`${apiUrl}${version}/payment/payment-status`, data).then(
      (response: any) => {
        console.log("raction-", response)

        if (response.status === 201) {
          // toast.success(response.message);
          return callback(response);
        } else if (response.messageID === 404) {
          // toast.warn(response.message);
          return callback(response);
        } else {
          return callback(response);
          // toast.error(response.message);
        }
      }
    );
  };
};

export const createUserWallet = (data: any, callback: any) => {
  return (dispatch: any) => {
    const token = getAccessToken();
    setAuthorizationToken(axios, `Bearer ${token}`);

    ApiClient.post(`${apiUrl}${version}/wallet/create`, data).then(
      (response: any) => {
        console.log("wallet", response)

        if (response.status === 201) {
          // toast.success(response.message);
          return callback(response);
        } else if (response.messageID === 404) {
          // toast.warn(response.message);
          return callback(response);
        } else {
          return callback(response);
          // toast.error(response.message);
        }
      }
    );
  };
};



export const captureRediectPayment = (data: any, callback: any) => {
  return (dispatch: any) => {
    const token = getAccessToken();
    setAuthorizationToken(axios, `Bearer ${token}`);

    ApiClient.post(`${apiUrl}${version}/payment/capture-redirect-payment`, data).then(
      (response: any) => {
        console.log("captureRediectPayment-", response)

        if (response.status === 201) {
          // toast.success(response.message);
          return callback(response);
        } else if (response.messageID === 404) {
          // toast.warn(response.message);
          return callback(response);
        } else {
          // toast.error(response.message);
        }
      }
    );
  };
};

export const createCustomGoal = (
  data: any,
  callback: any
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.postFormData(
      `${apiUrl}${version}/package/packages`,
      data,
      token,
      dispatch
    ).then((response: any) => {
      dispatch(handleIsLoading(false));
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.message);
        dispatch(handleIsLoading(false));
        return callback(response);
      } else if (response.status === 404 || response.status === 400) {
        dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
        return callback(response);
      } else {
        dispatch(handleIsLoading(false));
        openNotificationWithIcon("error", response.message);
      }
    });
  };
};


// **** get all Dashboard Stats For Admin ************** //
export const getActiveUsers = (data: any) => {
  return new Promise((resolve, reject) => {
    ApiClient.get(`${apiUrl}${version}/admin/get-active-users`, {})
      .then((response: any) => {
        if (response.status === 200) {
          resolve(response); // Resolve the response
        } else {
          const errorMsg = response.message || "Failed to fetch wallets.";
          openNotificationWithIcon("error", errorMsg);
          reject(new Error(errorMsg)); // Reject with an error
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        const errorMsg =
          error.message || "An error occurred while fetching wallets.";
        openNotificationWithIcon("error", errorMsg);
        reject(error); // Reject with the error
      });
  });
};