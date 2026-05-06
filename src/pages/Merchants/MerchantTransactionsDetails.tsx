import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/comman";
import riyal from "../../assets/img/riyal_icon.png";
import { formatAmount } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByPaymentId } from "../../actions/admin";
import { Spin } from "antd";

const MerchantTransactionsDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const [transactions, setTransactions] = useState<any>({});
  const { transactionsData } = location.state || {};
  const { isLoading } = useSelector((state: any) => state.General);

  const paymentId = transactionsData?.id || localStorage.getItem("paymentId");

  const ViewTransactionsDetails = (paymentId: string) => {
    if (!paymentId) return;

    dispatch(
      getTransactionsByPaymentId(paymentId, (response: any) => {
        if (response.success === true) {
          setTransactions(response?.data);
        } else {
          console.error("Failed to fetch notifications:", response);
        }
      })
    );
  };

  useEffect(() => {
    if (paymentId) {
      ViewTransactionsDetails(paymentId);
    }
  }, [paymentId]);

  return (
    <>
      <div className="d-flex align-items-center mb-6 mt-3 ">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn textAuthHeading"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="0.4"
              y="0.4"
              width="23.2"
              height="23.2"
              rx="11.6"
              stroke="#474df4"
              strokeWidth="0.8"
            />
            <path
              d="M14 8L10 12L14 16"
              stroke="#474df4"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>{" "}
        </button>
        <div></div>
        <h2 className="text-3xl font-bold text-left ms-2">
          Transactions Details
        </h2>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spin />
        </div>
      ) : (
        <>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Offer Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Goal Name:</span>{" "}
                  {transactionsData?.goalName || transactions?.goalName || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Category:</span>{" "}
                  {capitalizeFirstLetter(
                    transactionsData?.userPlan?.plan?.category ||
                      transactions?.user?.userPlan?.plan?.category
                  ) || "-"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Target Amount:</span>
                <img src={riyal} alt="currency" className="w-4 h-4" />
                <span>
                  {formatAmount(
                    transactionsData?.userPlan?.plan?.totalAmount ||
                      transactions?.totalAmount
                  ) || "-"}
                </span>
              </div>

              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Offer Percentage:</span>{" "}
                  {transactionsData?.userPlan?.plan?.offerPercentage ??
                    transactions?.user?.userPlan?.plan?.offerPercentage ??
                    "-"}
                  %
                </p>
              </div>

              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Frequency:</span>{" "}
                  {transactionsData?.userPlan?.frequency ||
                    transactions?.user?.userPlan?.frequency ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Goal Id:</span>{" "}
                  {transactionsData?.userPlan?.goalId ||
                    transactions?.goalId ||
                    "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              User Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {transactionsData?.user?.name ||
                    transactions?.user?.name ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {transactionsData?.user?.email ||
                    transactions?.user?.email ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Phone Number:</span>{" "}
                  {transactionsData?.user?.mobileNumber ||
                    transactions?.user?.mobileNumber ||
                    "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              Payment Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Order Id:</span>{" "}
                  {transactionsData?.orderId || transactions?.orderId || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Transaction Id:</span>{" "}
                  {transactionsData?.transactionId ||
                    transactions?.transactionId ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Payment Type:</span>{" "}
                  {transactionsData?.paymentType ||
                    transactions?.paymentType ||
                    "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Status:</span>{" "}
                  {transactionsData?.status || transactions?.status || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {transactionsData?.method || transactions?.method || "-"}
                </p>
              </div>
              <div>
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold">Reward:</span>
                  {(transactionsData?.reward &&
                    !isNaN(Number(transactionsData?.reward))) ||
                  (transactions?.reward &&
                    !isNaN(Number(transactions?.reward))) ? (
                    <>
                      <img
                        src={riyal}
                        alt="currency"
                        className="w-4 h-4 mx-1"
                      />
                      {Number(
                        transactionsData?.reward || transactions?.reward
                      ).toFixed(2)}
                    </>
                  ) : (
                    "-"
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MerchantTransactionsDetails;
