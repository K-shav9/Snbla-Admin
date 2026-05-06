/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import ApiClient from "../api-client/apiClient";
// @ts-ignore
import { getAccessToken, setAccessToken } from "../auth";

import { notification } from "antd";
import { handleIsLoading, handleLoading } from "../store/general";
import { createMerchantSuccess } from "../store/Auth/merchant";
import { loginSuccess } from "../store/Auth/user";
type NotificationType = "success" | "info" | "warning" | "error";

const apiUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_API_VERSION;

function openNotificationWithIcon(type: NotificationType, message: string) {
  notification[type]({
    message: message,
    placement: "topRight", // You can change the placement if needed
  });
}

export const adminLogin = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleLoading(true));
    ApiClient.post(`${apiUrl}${version}/auth/admin-login`, data).then((response: any) => {
      dispatch(handleLoading(false));
      if (response.status === 200 || response.status === 201) {


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

// **** get all Merchants list for super admin ************** //
export const getAllAdminMerchants = (data: any) => {
  return (dispatch: any) => {
    // Start loading
    dispatch(handleIsLoading(true));

    return new Promise<any>((resolve, reject) => {
      const tokenRaw: any = getAccessToken();
      const token = `Bearer ${tokenRaw}`;
      const { role, ...rest } = data;

      if (tokenRaw) {
        ApiClient.get(`${apiUrl}${version}/admin/get-all-users`, rest, token)
          .then((response: any) => {
            if (response.status === 200) {
              resolve(response); // Resolve with the response data
            } else {
              reject(new Error("Error fetching users"));
            }
          })
          .catch((error: any) => {
            reject(error); // Reject with the error
          })
          .finally(() => {
            // Stop loading once the request is completed (success or failure)
            dispatch(handleIsLoading(false));
          });
      } else {
        reject(new Error("No token available"));
        dispatch(handleIsLoading(false)); // Stop loading if no token
      }
    });
  };
};

// **** get Users Details by UserId for super admin ************** //
export const getMerchantByUserId = (data: any) => {
  return (dispatch: any) => {
    // Start loading
    dispatch(handleIsLoading(true));

    return new Promise<any>((resolve, reject) => {
      const tokenRaw: any = getAccessToken();
      const token = `Bearer ${tokenRaw}`;
      const { role, ...rest } = data;

      if (tokenRaw) {
        ApiClient.get(`${apiUrl}${version}/admin/get-all-users`, rest, token)
          .then((response: any) => {
            if (response.status === 200) {
              resolve(response); // Resolve with the response data
            } else {
              reject(new Error("Error fetching users"));
            }
          })
          .catch((error: any) => {
            reject(error); // Reject with the error
          })
          .finally(() => {
            // Stop loading once the request is completed (success or failure)
            dispatch(handleIsLoading(false));
          });
      } else {
        reject(new Error("No token available"));
        dispatch(handleIsLoading(false)); // Stop loading if no token
      }
    });
  };
};

// **** get all Users list for super admin ************** //
export const getAllUsers = (data: any) => {
  return (dispatch: any) => {
    // Start loading
    dispatch(handleIsLoading(true));

    return new Promise<any>((resolve, reject) => {
      const tokenRaw: any = getAccessToken();
      const token = `Bearer ${tokenRaw}`;
      const { role, ...rest } = data;

      if (tokenRaw) {
        ApiClient.get(`${apiUrl}${version}/admin/get-admin-user`, rest, token)
          .then((response: any) => {
            if (response.status === 200) {
              resolve(response); // Resolve with the response data
            } else {
              reject(new Error("Error fetching users"));
            }
          })
          .catch((error: any) => {
            reject(error); // Reject with the error
          })
          .finally(() => {
            // Stop loading once the request is completed (success or failure)
            dispatch(handleIsLoading(false));
          });
      } else {
        reject(new Error("No token available"));
        dispatch(handleIsLoading(false)); // Stop loading if no token
      }
    });
  };
};

// **** get Users Details by UserId for super admin ************** //
export const getUserByUserId = (data: any) => {
  return (dispatch: any) => {
    // Start loading
    dispatch(handleIsLoading(true));

    return new Promise<any>((resolve, reject) => {
      const tokenRaw: any = getAccessToken();
      const token = `Bearer ${tokenRaw}`;
      const { role, ...rest } = data;

      if (tokenRaw) {
        ApiClient.get(`${apiUrl}${version}/admin/get-admin-user`, rest, token)
          .then((response: any) => {
            if (response.status === 200) {
              resolve(response); // Resolve with the response data
            } else {
              reject(new Error("Error fetching users"));
            }
          })
          .catch((error: any) => {
            reject(error); // Reject with the error
          })
          .finally(() => {
            // Stop loading once the request is completed (success or failure)
            dispatch(handleIsLoading(false));
          });
      } else {
        reject(new Error("No token available"));
        dispatch(handleIsLoading(false)); // Stop loading if no token
      }
    });
  };
};

// **** update Users for super admin ************** //
export const updateUserDetails = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.patch(
      `${apiUrl}${version}/admin/update-user/${data?.id}`,
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
         return callback(response);
      }
    });
  };
};

// **** Delete Merchant & User for Super Admin ************** //
export const deleteMerchantAndUser = (id: number, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    if (token) {
      ApiClient.delete(
        `${apiUrl}${version}/admin/delete/${id}`,
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

// **** Create User for Super Admin ************** //
export const createUser = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleLoading(true));

    // API call to create a merchant and user
    ApiClient.post(`${apiUrl}${version}/admin/add-user`, data)
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Success response
          // openNotificationWithIcon('success', response.message || 'Merchant and User created successfully.');
          dispatch(handleLoading(false)); // Stop loading
          return callback(response); // Execute callback after success
        } else if (response.status === 404) {
          // Not found response
          openNotificationWithIcon('error', response.message || 'Resource not found.');
          dispatch(handleLoading(false)); // Stop loading
          return callback(response); // Execute callback
        } else {
          // Other errors
          openNotificationWithIcon('error', response.message || 'Failed to create merchant and user.');
          dispatch(handleLoading(false)); // Stop loading
        }
      })
      .catch((error: any) => {
        console.error('API Error:', error);
        openNotificationWithIcon('error', 'An error occurred while creating the merchant and user.');
        dispatch(handleLoading(false)); // Stop loading
      });
  };
};



// **** Create Merchant for Super Admin ************** //
export const createMerchant = (data: any, callback: any) => {
  return (dispatch: any) => {
    // Start loading indicator
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // API call to create a merchant and user
    ApiClient.postFormData(
      `${apiUrl}${version}/admin/create-merchant`,
      data,
      token
    )
      .then((response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Success response
          // openNotificationWithIcon(
          //   "success",
          //   response.message || "Merchant and User created successfully."
          // );
          dispatch(createMerchantSuccess(response?.data));
          dispatch(handleIsLoading(false)); // Stop loading
          return callback(response); // Execute callback after success
        } else if (response.status === 404) {
          // Not found response
          openNotificationWithIcon(
            "error",
            response.message || "Resource not found."
          );
          dispatch(handleIsLoading(false)); // Stop loading
          return callback(response); // Execute callback
        } else {
          // Other errors
          openNotificationWithIcon(
            "error",
            response.message || "Failed to create merchant and user."
          );
          dispatch(handleIsLoading(false)); // Stop loading
          return callback(response);
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while creating the merchant and user."
        );
        dispatch(handleIsLoading(false)); // Stop loading
        return callback(error);
      });
  };
};

// **** Update Merchant for Super Admin ************** //
export const updateMerchantDetails = (
  data: any,
  merchantId: string,
  callback: any
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    console.log("data", data);

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;
    ApiClient.patchFormData(
      `${apiUrl}${version}/admin/activate-merchant/${merchantId}`,
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
        return callback(response);
      }
    });
  };
};

// **** get all Dashboard Stats For Admin ************** //
export const getAdminDashboardStats = (data: any) => {
  const tokenRaw: any = getAccessToken();
  const token = `Bearer ${tokenRaw}`;

  return new Promise((resolve, reject) => {
    ApiClient.get(`${apiUrl}${version}/admin/dashboard-stats`, {}, token)
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

// **** get all Merchant Packages For Admin ************** //
export const getPackagesByMerchandId = (
  params: { page: number; pageSize: number, merchantId: string },
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

// **** get all User Wallets For Admin ************** //
export const getUserWalletsByUserId = (params: { page: number; pageSize: number, userId: string },
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

// **** get all User Wallets For Admin ************** //
export const getAllTransactions = (params: { page: number; pageSize: number },
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

// **** get all User Wallets For Admin ************** //
export const getAllWallets = (params: { page: number; pageSize: number },
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


// **** get all transactions of the merchants for admin************** //

export const getAllAdminMerchantTransaction = (params: { page: number; pageSize: number },
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;


    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/admin/merchant-payment`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); 
          } else {
            const errorMsg = response.message || "Failed to fetch transactions.";
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); 
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while fetching transaction.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); 
        });
    });
  };
};

// Action to create a new merchant payment by admin
export const createMerchantPayment = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    return new Promise((resolve, reject) => {
      ApiClient.post(`${apiUrl}${version}/admin/merchant-payment`, data, token)
        .then((response: any) => {
          console.log("response", response);
          if (response.status === 200 || response.status === 201) {
            openNotificationWithIcon("success", response.message);
            dispatch(handleIsLoading(false));
            callback(response);
            resolve(response);
          } else {
            openNotificationWithIcon("error", response.message);
            dispatch(handleIsLoading(false));
            callback(response);
            reject(response);
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg = error.message || "An error occurred while creating transaction.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error);
        });
    });
  };
};


// **** to update transactions of the merchants for admin************** //

export const manageMerchantPaymentDataService = (data: any,callback:any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`; // Bearer token

       return new Promise((resolve, reject) => {
      ApiClient.patch(`${apiUrl}${version}/admin/merchant-payment`, data, token)
        .then((response: any) => {
          console.log("response", response);
           if (response.status === 200 || response.status === 201) {
          openNotificationWithIcon("success", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
        }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while updating transaction.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // Reject with the error
        });
    });
  }
  }


// ****  Reset-password for Merchant Listing Mail Goes to Merchant ************** //
export const adminResetPasswordMerchantFromList = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    ApiClient.post(`${apiUrl}${version}/auth/forgot-password`, data).then(
      (response: any) => {
        if (response.status === 200 || response.status === 201) {
          // openNotificationWithIcon("success", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
          return callback(response);
        } else {
          openNotificationWithIcon("error", response.message);
          dispatch(handleIsLoading(false));
        }
      }
    );
  };
};

// ****  Download csv file of wallets in Admin ************** //
export const WalletCsvDownload = (params: {
  search?: string;
}) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/wallet/export-wallet`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // ✅ Resolve response for further handling
          } else {
            const errorMsg = response.message || "Failed to download CSV.";
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); // ✅ Reject with error message
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while downloading CSV.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // ✅ Reject with error
        });
    });
  };
};

// ****  Download csv file of transactions in Admin ************** //
export const TransactionCsvDownload = (params: {
  search?: string;
}) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));

    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    return new Promise((resolve, reject) => {
      ApiClient.get(`${apiUrl}${version}/payment/export-payment`, params, token)
        .then((response: any) => {
          if (response.status === 200) {
            dispatch(handleIsLoading(false));
            resolve(response); // ✅ Resolve response for further handling
          } else {
            const errorMsg = response.message || "Failed to download CSV.";
            dispatch(handleIsLoading(false));
            reject(new Error(errorMsg)); // ✅ Reject with error message
          }
        })
        .catch((error: any) => {
          console.error("API Error:", error);
          const errorMsg =
            error.message || "An error occurred while downloading CSV.";
          openNotificationWithIcon("error", errorMsg);
          dispatch(handleIsLoading(false));
          reject(error); // ✅ Reject with error
        });
    });
  };
};



// **** get Transactions Details by Payment Id in Admin ************** //
export const getTransactionsByPaymentId = (
  paymentId: string,
  callback: any
) => {
  return (dispatch: any) => {
    dispatch(handleIsLoading(true));
    const tokenRaw: any = getAccessToken();
    const token = `Bearer ${tokenRaw}`;

    // Correct API call using ApiClient.get()
    ApiClient.get(
      `${apiUrl}${version}/payment/payment/${paymentId}`,
      {},
      token,
      dispatch
    )
      .then((response: any) => {
        dispatch(handleIsLoading(false));

        if (response.status === 200) {
          return callback(response);
        } else if (response.status === 404) {
          openNotificationWithIcon(
            "error",
            response.message || "Transaction not found."
          );
          return callback(null);
        } else {
          openNotificationWithIcon(
            "error",
            response.message || "Failed to fetch transaction."
          );
        }
      })
      .catch((error: any) => {
        console.error("API Error:", error);
        openNotificationWithIcon(
          "error",
          "An error occurred while fetching the transaction."
        );
      })
      .finally(() => {
        dispatch(handleIsLoading(false));
      });
  };
};
