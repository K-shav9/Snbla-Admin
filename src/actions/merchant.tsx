/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from "../api-client/apiClient";
// @ts-ignore
import { getAccessToken, setAuthorizationToken } from "../auth";
// import config from "../environment/index";
// @ts-ignore
// import { PORT, apiUrl, version } from '../environment/index';
// const { PORT, apiUrl, version } = config;

import { notification } from "antd";
import { handleIsLoading, handleLoading } from "../store/general";
import axios from "axios";
import { storeMerchantPlan } from "../store/Auth/merchant";
type NotificationType = "success" | "info" | "warning" | "error";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

function openNotificationWithIcon(type: NotificationType, message: string) {
  notification[type]({
    message: message,
    placement: "topRight", // You can change the placement if needed
  });
}

// *********** Add offers by merchant ********************** //
export const createPlan = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // API call to create a merchant and user
    ApiClient.postFormData(
      `${apiUrl}${version}/plan/plans`,
      data,
      token,
      dispatch
    )
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Success response
          // openNotificationWithIcon("success", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon(
            "error",
            response.message || "Resource not found."
          );
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while creating the offer."
        );
        dispatch(handleIsLoading(false));
      });
  };
};

// *********** plans Listing for merchant ********************** //
export const getPlans = (
  params: { page: number; pageSize: number },
  callback: any
) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    // API call to fetch plans
    ApiClient.get(`${apiUrl}${version}/plan/plans`, params)
      .then((response: any) => {
        if (response.status === 200) {
          // Success response

          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          // Not found response
          openNotificationWithIcon(
            "error",
            response.message || "No plans found."
          );
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          // Other errors
          openNotificationWithIcon(
            "error",
            response.message || "Failed to fetch plans."
          );
          dispatch(handleIsLoading(false));
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while fetching plans."
        );
        dispatch(handleIsLoading(false));
      });
  };
};


// *********** update (Profile) details ********************** //
export const updateMerchantKey = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));
    const tokenRaw: any = getAccessToken();
    setAuthorizationToken(axios, `Bearer ${tokenRaw}`);

    ApiClient.patch(
      `${apiUrl}${version}/admin/update-merchant-key`,
      data,
      dispatch
    ).then((response: any) => {
      // dispatch({ type: 'ISLOADING', data: false });
      dispatch(handleLoading(false));
      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response?.message);
        dispatch(handleLoading(false));
        return callback(response);
      } else if (response.status === 404 || response.status === 400) {
        dispatch(handleLoading(false));
        openNotificationWithIcon("error", response.message);
        return callback(response);
      } else {
        dispatch(handleLoading(false));
        openNotificationWithIcon("error", response.message);
      }
    });
  };
};


export const getMerchants = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    ApiClient.get(
      `${apiUrl}${version}/admin/get-all-users?roleId=${data?.roleId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // openNotificationWithIcon("success", response.message);
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

export const merchantRequest = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleLoading(true));
    // API call to request merchant access
    ApiClient.post(`${apiUrl}${version}/admin/request-merchant`, data)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Success response
          // openNotificationWithIcon('success', response.message || 'Request sent successfully.');
          dispatch(handleLoading(false)); // Stop loading
          return callback(response); // Execute callback after success
        } else {
          // Handle other error statuses
          openNotificationWithIcon('error', response.message || 'Request failed.');
          dispatch(handleLoading(false)); // Stop loading
          return callback(response);
        }
      })
      .catch((error: any) => {
        console.error('API Error:', error);
        openNotificationWithIcon('error', 'An error occurred while processing the request.');
        dispatch(handleLoading(false)); // Stop loading
      });
  };
};


// **** get all User Wallets For Merchant ************** //
export const getWalletsByMerchantId = (params: { page: number; pageSize: number, merchantId: string },
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

// **** get all User Wallets For Merchant ************** //
export const getTransactionsByMerchantId = (params: { page: number; pageSize: number, merchantId: string },
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

// **** get all User Wallets For Merchant ************** //
export const getAllUsersTransactions = (data: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // Construct query parameters from `data`
    const queryParams = new URLSearchParams(data).toString();

    return new Promise((resolve, reject) => {
      ApiClient.get(
        `${apiUrl}${version}/payment/payment-list?${queryParams}`,
        {},
        token
      )
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // Resolve the response
          } else {
            const errorMsg = response.message || "Failed to fetch wallets.";
            openNotificationWithIcon("error", errorMsg);
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

// **** get all Dashboard Stats For Merchant ************** //
export const getDashboardStats = (data: any) => {
  const tokenRaw: any = getAccessToken();
  const token = `Bearer ${tokenRaw}`;

  return new Promise((resolve, reject) => {
    ApiClient.get(`${apiUrl}${version}/user/dashboard-stats`, {}, token)
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


// **** Add packages by merchant ************** //
export const addPackage = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // API call to create a merchant and user
    ApiClient.postFormData(
      `${apiUrl}${version}/package/packages`,
      data,
      token,
      dispatch
    )
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Success response
          // openNotificationWithIcon("success", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon(
            "error",
            response.message || "Resource not found."
          );
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while creating the merchant and user."
        );
        dispatch(handleIsLoading(false));
      });
  };
};

// ****  All Packages Listing ************** //
export const getAllPackages = (
  params: { page: number; pageSize: number },
  callback: any
) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    // API call to fetch packages
    ApiClient.get(`${apiUrl}${version}/package/packages`, params)
      .then((response: any) => {
        if (response.status === 200) {
          // Success response

          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          // Not found response
          openNotificationWithIcon(
            "error",
            response.message || "No packages found."
          );
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          // Other errors
          openNotificationWithIcon(
            "error",
            response.message || "Failed to fetch packages."
          );
          dispatch(handleIsLoading(false));
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while fetching packages."
        );
        dispatch(handleIsLoading(false));
      });
  };
};

// **** get Packages for merchant by id ************** //
export const getPackagesByMerchantId = (
  params: { page: number; pageSize: number },
  data: { merchantId: number },
  callback: any
) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    // API call to fetch packages
    ApiClient.get(
      `${apiUrl}${version}/package/merchant-package/${data?.merchantId}`,
      params
    )
      .then((response: any) => {
        if (response.status === 200) {
          // Success response

          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          // Not found response
          // openNotificationWithIcon(
          //   "error",
          //   response.message || "No packages found."
          // );
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          // Other errors
          // openNotificationWithIcon(
          //   "error",
          //   response.message || "Failed to fetch packages."
          // );
          dispatch(handleIsLoading(false));
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while fetching packages."
        );
        dispatch(handleIsLoading(false));
      });
  };
};

// **** Update Package details for super admin & merchant ************** //
export const updatePackage = (
  data: any,
  packageId: string,
  callback: any
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.putFormData(
      `${apiUrl}${version}/package/packages/${packageId}`,
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

// **** Delete Package for super admin & merchant ************** //
export const deletePackage = (id: number, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    if (token) {
      ApiClient.delete(
        `${apiUrl}${version}/package/packages/${id}`,
        token,
        dispatch
      )
        .then((response: any) => {
          dispatch(handleIsLoading(false));

          if (response.status === 200 || response.status === 204) {
            // openNotificationWithIcon(
            //   "success",
            //   response.message || "Successfully deleted."
            // );
            callback(response); // Pass the response back via the callback
          } else if (response.status === 404 || response.status === 400) {
            openNotificationWithIcon(
              "error",
              response.message || "Failed to delete."
            );
            callback(response); // Pass the response back via the callback
          } else {
            openNotificationWithIcon(
              "error",
              response.message || "An error occurred."
            );
          }
        })
        .catch((error: any) => {
          dispatch(handleIsLoading(false));
          openNotificationWithIcon(
            "error",
            error.message || "Failed to delete."
          );
          callback({ status: 500, message: error.message }); // Pass the error back via the callback
        });
    } else {
      dispatch(handleIsLoading(false));
      openNotificationWithIcon("error", "No token available");
      callback({ status: 401, message: "No token available" });
    }
  };
};

// **** get offer for merchant by id ************** //
export const getMerchantPlan = (data: { merchantId: number }, callback: (response: any) => void) => {
  return async (dispatch: any) => {
    try {
      dispatch(handleIsLoading(true));

      const response: any = await ApiClient.get(`${apiUrl}${version}/plan/merchant-plan/${data?.merchantId}`, {})

      if (response.status === 200 || response.status === 201) {
        // openNotificationWithIcon("success", response.data.message || "Merchant data retrieved successfully.");
        dispatch(storeMerchantPlan(response?.data))
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

// **** Delete Plan for super admin & merchant ************** //
export const deletePlan = (id: number, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    if (token) {
      ApiClient.delete(
        `${apiUrl}${version}/plan/plans/${id}`,
        token,
        dispatch
      )
        .then((response: any) => {
          dispatch(handleIsLoading(false));

          if (response.status === 200 || response.status === 204) {
            // openNotificationWithIcon(
            //   "success",
            //   response.message || "Successfully deleted."
            // );
            callback(response); // Pass the response back via the callback
          } else if (response.status === 404 || response.status === 400) {
            openNotificationWithIcon(
              "error",
              response.message || "Failed to delete."
            );
            callback(response); // Pass the response back via the callback
          } else {
            openNotificationWithIcon(
              "error",
              response.message || "An error occurred."
            );
          }
        })
        .catch((error: any) => {
          dispatch(handleIsLoading(false));
          openNotificationWithIcon(
            "error",
            error.message || "Failed to delete."
          );
          callback({ status: 500, message: error.message }); // Pass the error back via the callback
        });
    } else {
      dispatch(handleIsLoading(false));
      openNotificationWithIcon("error", "No token available");
      callback({ status: 401, message: "No token available" });
    }
  };
};

// **** Update Offer details for Super Admin ************** //
export const updatePlan = (
  data: any,
  planId: string,
  callback: any
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.putFormData(
      `${apiUrl}${version}/plan/plans/${planId}`,
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


export const addVoucherToWallet = (data:any, callback:any) => {
  return (dispatch:any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    ApiClient.post(`${apiUrl}${version}/wallet/add-voucher`, data, token)
      .then((response:any) => {
        if (response.status === 200 || response.status === 201) {
          localStorage.setItem("voucherCode",response.data)
          dispatch(handleIsLoading(false));
          // openNotificationWithIcon("success", response.message);
          return callback(response);
        } else {
          openNotificationWithIcon("error", response.message || "Failed to add voucher.");
          dispatch(handleIsLoading(false));
          return callback(response);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        openNotificationWithIcon("error", "An error occurred while adding the voucher.");
        dispatch(handleIsLoading(false));
        return callback(error);
      });
  };
};