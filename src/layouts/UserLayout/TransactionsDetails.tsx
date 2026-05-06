import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWalletsByUserId, getWalletTransactionsByUserId } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const TransactionsDetails = () => {
  const location = useLocation();
  const dispatch: any = useDispatch();
  const { merchant } = location.state || {};
  const [transactions, setTransactions] = useState([])
  const { isLoading } = useSelector((state: any) => state.General);
  const userId = merchant?.userId
  const walletId = merchant?.id
  console.log(transactions)
  const fetchWalletTransactions = () => {
    const data: any = { userId, walletId };
    dispatch(getWalletTransactionsByUserId(data)).then((response: any) => {
      setTransactions(response?.data || []);
    })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setTransactions([]);
      });
  };
  useEffect(() => {
    fetchWalletTransactions()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Function to mask the card number
  const maskCardNumber = (cardNumber) => {
    return `Visa **** ${cardNumber.slice(-4)}`;
  };
  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Transactions Details
          </h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-48">
            <Spin />
          </div>
        ) :
          transactions?.map((data) => (
            <div
              key={data.id} // Add a key for React to efficiently update the list
              className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-lg font-semibold text-black mb-3">
                    {/*Determine Heading based on date or status*/}
                    {data.status === "SETTLED"
                      ? formatDate(data.createdAt)
                      : formatDate(data.createdAt)}
                  </h2>
                  <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                    <div className="flex items-start gap-4">
                      <div className="size-10 bg-[#F1F3F7]  flex items-center justify-center rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                            fill="#686E7D"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-1 flex-col">
                        <h3 className="font-medium text-black ">
                          {/* Determine title based on transaction type*/}
                          Monthly deposit
                          <span
                            className={`ml-2 px-2 py-1 text-xs font-medium rounded 
    ${data.status === "SETTLED" || data.status === "OTHERS"
                                ? "text-[#166534] border border-[#BBF7D0] bg-[#DCFCE7]" /* Green */
                                : data.status === "REDIRECT"
                                  ? "text-[#A27607] border border-[#FEF08A] bg-[#FEFCE8]" /* Yellow */
                                  : "text-[#166534] border border-[#BBF7D0] bg-[#DCFCE7]" /* Default Green */
                              }`}
                          >
                            {data?.status}
                          </span>
                        </h3>
                        <p className="text-xs text-[#9FA5B2]">
                          {maskCardNumber(data.cardNumber)}
                        </p>
                        <p className="text-xs text-black ">Reward earned!</p>
                      </div>
                    </div>
                    <div className="sm:text-right text-left flex gap-1 flex-col">
                      <p className="text-lg font-semibold text-black">
                        SAR {data?.amount}.00
                      </p>
                      <p className="text-xs text-[#9FA5B2]">+SAR {data?.amount}.00
                      </p>
                      <p className="text-[#3A424D] text-xs text-medium flex items-center gap-1 bg-[#F1F3F7] border border-[#E9EBF0] rounded px-2 py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                            fill="#3A424D"
                          />
                        </svg>
                        <span>+SAR {data?.wallet?.reward}.00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default TransactionsDetails;

