import React, { useEffect, useState } from "react";
import Button from "../common-components/buttons/Button";
import avtar from "../../assets/img/Avataaar.png";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import TransactionListing from "../../components/AuthMerchant/Transactions/TransactionListing";
import UserTransactionListing from "../../components/AuthUser/UserTransations/UserTransactionListing";
import { getTransactionsByUserId } from "../../actions/user";

const Transactions = () => {
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state?.Auth);
  const { isLoading } = useSelector((state: any) => state.General);
  const [usersTransactions, setUsersTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  const userId = user?.user?.data?.id;

  const fetchTransactionsList = (page: number, pageSize: number) => {
    setLoading(true);

    const data = { userId, page, pageSize };

    dispatch(getTransactionsByUserId(data))
      .then((response: any) => {
        setTransactions(response?.data || []);
        setPagination((prev) => ({
          ...prev,
          totalItems:
            response?.pagination?.totalItems || response?.wallets?.length || 0,
          totalPages: response?.pagination?.totalPages || 1,
        }));
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setTransactions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactionsList(pagination.currentPage, pagination.pageSize);
  }, [pagination.currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const exportCSV = () => {
    if (!transactions || transactions?.length === 0) {
      console.warn("No data available to export.");
      return;
    }

    // Define headers for the CSV file
    const headers = [
      "Order ID",
      "Transaction ID",
      "Business Name",
      "Contact Name",
      "Email",
      "Amount",
      "Status",
      "Payment Date",
    ];

    // Convert each transaction into a CSV row
    const rows = transactions?.map((transaction) => {
      return [
        transaction.orderId,
        transaction.transactionId,
        transaction.merchant?.businessName || "",
        transaction.user?.name || "",
        transaction.user?.email || "",
        transaction.amount,
        transaction.status,
        transaction.createdAt,
      ].join(",");
    });

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Create a Blob and generate a download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_transactions.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    document.title = "Transactions | Snbla";
  }, []);

  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Financial Transactions
          </h1>
          <Button
            type="primary"
            onClick=""
            className="border border-bordercolor size-[40px] p-0 hover:bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.99967 6.66683C10.9163 6.66683 11.6663 5.91683 11.6663 5.00016C11.6663 4.0835 10.9163 3.3335 9.99967 3.3335C9.08301 3.3335 8.33301 4.0835 8.33301 5.00016C8.33301 5.91683 9.08301 6.66683 9.99967 6.66683ZM9.99967 8.3335C9.08301 8.3335 8.33301 9.0835 8.33301 10.0002C8.33301 10.9168 9.08301 11.6668 9.99967 11.6668C10.9163 11.6668 11.6663 10.9168 11.6663 10.0002C11.6663 9.0835 10.9163 8.3335 9.99967 8.3335ZM9.99967 13.3335C9.08301 13.3335 8.33301 14.0835 8.33301 15.0002C8.33301 15.9168 9.08301 16.6668 9.99967 16.6668C10.9163 16.6668 11.6663 15.9168 11.6663 15.0002C11.6663 14.0835 10.9163 13.3335 9.99967 13.3335Z"
                fill="#1F242E"
              />
            </svg>
          </Button>
        </div>

        <div className="flex flex-col justify-between md:p-8 p-4 gap-4 tab:mb-8 mb-4 border border-borderlight bg-white rounded-xl">
          <div className="flex items-center justify-between w-full">
            <button className="border border-bordercolor px-3 flex gap-1 font-medium items-center rounded-lg text-sm h-[40px] text-black justify-center hover:bg-transparent hover:text-black  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.33333 15H11.6667V13.3333H8.33333V15ZM2.5 5V6.66667H17.5V5H2.5ZM5 10.8333H15V9.16667H5V10.8333Z"
                  fill="#1F242E"
                />
              </svg>{" "}
              Add Filter
            </button>
            <Button type="secondry" onClick={exportCSV}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16699 17.0832H15.8337V15.4165H4.16699V17.0832ZM15.8337 7.9165H12.5003V2.9165H7.50033V7.9165H4.16699L10.0003 13.7498L15.8337 7.9165Z"
                  fill="white"
                />
              </svg>
              Export All
            </Button>
          </div>
          {/* <div className="overflow-x-auto w-full">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Date{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Type{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Amount{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg>
                    </div>
                  </th>

                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Wallet{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Payment Method{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-[#F1F3F7] border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Oct 17
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Spare Cash Deposit
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    +50.00
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center">
                      <img
                        src={avtar}
                        alt="Wallet Icon"
                        className="w-8 h-8 rounded mr-2"
                      />
                      <span>Elago Travel Package</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="24"
                        viewBox="0 0 34 24"
                        fill="none"
                      >
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          fill="white"
                        />
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          stroke="#F1F3F7"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.7501 15.8583H8.69031L7.14576 9.79247C7.07245 9.51344 6.91679 9.26676 6.68782 9.1505C6.11639 8.85833 5.48672 8.6258 4.7998 8.50853V8.27499H8.11789C8.57583 8.27499 8.91929 8.6258 8.97653 9.03323L9.77793 13.4087L11.8367 8.27499H13.8392L10.7501 15.8583ZM14.9838 15.8583H13.0386L14.6404 8.27496H16.5856L14.9838 15.8583ZM19.1023 10.3758C19.1596 9.96738 19.503 9.73384 19.9037 9.73384C20.5334 9.6752 21.2193 9.79248 21.7917 10.0836L22.1352 8.45091C21.5628 8.21737 20.9331 8.1001 20.3617 8.1001C18.4737 8.1001 17.0998 9.1505 17.0998 10.6083C17.0998 11.7174 18.073 12.2997 18.7599 12.6505C19.503 13.0003 19.7892 13.2338 19.732 13.5836C19.732 14.1083 19.1596 14.3419 18.5881 14.3419C17.9012 14.3419 17.2143 14.167 16.5856 13.8748L16.2422 15.5086C16.9291 15.7997 17.6723 15.917 18.3592 15.917C20.4762 15.9746 21.7917 14.9252 21.7917 13.3501C21.7917 11.3666 19.1023 11.2503 19.1023 10.3758ZM28.6 15.8583L27.0554 8.27496H25.3964C25.0529 8.27496 24.7095 8.5085 24.595 8.8583L21.7349 15.8583H23.7374L24.1371 14.7503H26.5975L26.8265 15.8583H28.6ZM25.6822 10.3172L26.2537 13.1752H24.6519L25.6822 10.3172Z"
                          fill="#172B85"
                        />
                      </svg>
                      <span>Ends in 4354</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr className="border-[#F1F3F7] border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Oct 17
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Spare Cash Deposit
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    +50.00
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center">
                      <img
                        src={avtar}
                        alt="Wallet Icon"
                        className="w-8 h-8 rounded mr-2"
                      />
                      <span>Elago Travel Package</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="24"
                        viewBox="0 0 34 24"
                        fill="none"
                      >
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          fill="white"
                        />
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          stroke="#F1F3F7"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.7501 15.8583H8.69031L7.14576 9.79247C7.07245 9.51344 6.91679 9.26676 6.68782 9.1505C6.11639 8.85833 5.48672 8.6258 4.7998 8.50853V8.27499H8.11789C8.57583 8.27499 8.91929 8.6258 8.97653 9.03323L9.77793 13.4087L11.8367 8.27499H13.8392L10.7501 15.8583ZM14.9838 15.8583H13.0386L14.6404 8.27496H16.5856L14.9838 15.8583ZM19.1023 10.3758C19.1596 9.96738 19.503 9.73384 19.9037 9.73384C20.5334 9.6752 21.2193 9.79248 21.7917 10.0836L22.1352 8.45091C21.5628 8.21737 20.9331 8.1001 20.3617 8.1001C18.4737 8.1001 17.0998 9.1505 17.0998 10.6083C17.0998 11.7174 18.073 12.2997 18.7599 12.6505C19.503 13.0003 19.7892 13.2338 19.732 13.5836C19.732 14.1083 19.1596 14.3419 18.5881 14.3419C17.9012 14.3419 17.2143 14.167 16.5856 13.8748L16.2422 15.5086C16.9291 15.7997 17.6723 15.917 18.3592 15.917C20.4762 15.9746 21.7917 14.9252 21.7917 13.3501C21.7917 11.3666 19.1023 11.2503 19.1023 10.3758ZM28.6 15.8583L27.0554 8.27496H25.3964C25.0529 8.27496 24.7095 8.5085 24.595 8.8583L21.7349 15.8583H23.7374L24.1371 14.7503H26.5975L26.8265 15.8583H28.6ZM25.6822 10.3172L26.2537 13.1752H24.6519L25.6822 10.3172Z"
                          fill="#172B85"
                        />
                      </svg>
                      <span>Ends in 4354</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}

          {/* <div className="flex items-center justify-between px-6 py-3 md:flex-row flex-col gap-4 w-full">
            <span className="text-sm">Showing 1 to 10 of 480 results</span>
            <nav className="inline-flex rounded-md shadow-sm border border-bordercolor overflow-hidden">
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.0871 6.175L11.9121 5L6.91211 10L11.9121 15L13.0871 13.825L9.27044 10L13.0871 6.175Z"
                    fill="#4E5663"
                  />
                </svg>
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue">
                2
              </button>
              <span className="px-3 py-1 border-blue border text-sm font-medium text-gray-500 bg-[#ECF2FF] text-blue">
                ...
              </span>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                10
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.08711 5L6.91211 6.175L10.7288 10L6.91211 13.825L8.08711 15L13.0871 10L8.08711 5Z"
                    fill="#4E5663"
                  />
                </svg>
              </button>
            </nav>
          </div> */}

          {user?.user?.data?.roleId === 4 && (
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead>
                  <tr className="">
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Name{" "}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Email
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Offer Name
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Price{" "}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Amount{" "}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Payment Method{" "}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                      <div className="flex items-center justify-between">
                        Payment Status{" "}
                        {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M13.3337 7.99984L12.3937 7.05984L8.66699 10.7798V2.6665H7.33366V10.7798L3.61366 7.05317L2.66699 7.99984L8.00033 13.3332L13.3337 7.99984Z"
                          fill="#1F242E"
                        />
                      </svg> */}
                      </div>
                    </th>
                    <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]"></th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spin />
                  </div>
                ) : (
                  <tbody>
                    {usersTransactions?.length > 0 ? (
                      usersTransactions?.map((transaction, index) => (
                        <tr
                          className="border-[#F1F3F7] border-b hover:bg-gray-50"
                          key={index}
                        >
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            {transaction?.user?.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            {transaction?.user?.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            {transaction?.stack?.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            <div className="flex items-center">
                              {/* <img
                          src={avtar}
                          alt="Wallet Icon"
                          className="w-8 h-8 rounded mr-2"
                        /> */}
                              {transaction?.stack?.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium flex items-center">
                            <div className="flex items-center gap-1">
                              {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="34"
                          height="24"
                          viewBox="0 0 34 24"
                          fill="none"
                        >
                          <path
                            d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                            fill="white"
                          />
                          <path
                            d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                            stroke="#F1F3F7"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.1789 16.8293C15.9948 17.8273 14.459 18.4298 12.7807 18.4298C9.03582 18.4298 6 15.4301 6 11.7298C6 8.02948 9.03582 5.02979 12.7807 5.02979C14.459 5.02979 15.9948 5.63225 17.1789 6.63025C18.3629 5.63225 19.8988 5.02979 21.5771 5.02979C25.3219 5.02979 28.3578 8.02948 28.3578 11.7298C28.3578 15.4301 25.3219 18.4298 21.5771 18.4298C19.8988 18.4298 18.3629 17.8273 17.1789 16.8293Z"
                            fill="#ED0006"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.1797 16.8291C18.6375 15.6002 19.5619 13.7717 19.5619 11.7298C19.5619 9.68791 18.6375 7.85937 17.1797 6.63047C18.3638 5.63234 19.8997 5.02979 21.5781 5.02979C25.323 5.02979 28.3588 8.02948 28.3588 11.7298C28.3588 15.4301 25.323 18.4298 21.5781 18.4298C19.8997 18.4298 18.3638 17.8272 17.1797 16.8291Z"
                            fill="#F9A000"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.1794 16.8294C18.6374 15.6005 19.5619 13.7719 19.5619 11.7299C19.5619 9.68791 18.6374 7.85927 17.1794 6.63037C15.7214 7.85927 14.7969 9.68791 14.7969 11.7299C14.7969 13.7719 15.7214 15.6005 17.1794 16.8294Z"
                            fill="#FF5E00"
                          />
                        </svg> */}
                              {transaction?.stack?.amount}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            {transaction?.stack?.method}
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium">
                            {transaction?.stack?.status}
                          </td>
                          <td className="px-6 py-4 text-sm text-black font-medium text-right">
                            {/* <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-4 text-center text-sm text-gray-500 font-medium"
                        >
                          No data available
                        </td>
                      </tr>
                    )}

                    {/* <tr className="border-[#F1F3F7] border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Oct 17
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    Spare Cash Deposit
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    +50.00
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center">
                      <img
                        src={avtar}
                        alt="Wallet Icon"
                        className="w-8 h-8 rounded mr-2"
                      />
                      <span>Elago Travel Package</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="24"
                        viewBox="0 0 34 24"
                        fill="none"
                      >
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          fill="white"
                        />
                        <path
                          d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4Z"
                          stroke="#F1F3F7"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.7501 15.8583H8.69031L7.14576 9.79247C7.07245 9.51344 6.91679 9.26676 6.68782 9.1505C6.11639 8.85833 5.48672 8.6258 4.7998 8.50853V8.27499H8.11789C8.57583 8.27499 8.91929 8.6258 8.97653 9.03323L9.77793 13.4087L11.8367 8.27499H13.8392L10.7501 15.8583ZM14.9838 15.8583H13.0386L14.6404 8.27496H16.5856L14.9838 15.8583ZM19.1023 10.3758C19.1596 9.96738 19.503 9.73384 19.9037 9.73384C20.5334 9.6752 21.2193 9.79248 21.7917 10.0836L22.1352 8.45091C21.5628 8.21737 20.9331 8.1001 20.3617 8.1001C18.4737 8.1001 17.0998 9.1505 17.0998 10.6083C17.0998 11.7174 18.073 12.2997 18.7599 12.6505C19.503 13.0003 19.7892 13.2338 19.732 13.5836C19.732 14.1083 19.1596 14.3419 18.5881 14.3419C17.9012 14.3419 17.2143 14.167 16.5856 13.8748L16.2422 15.5086C16.9291 15.7997 17.6723 15.917 18.3592 15.917C20.4762 15.9746 21.7917 14.9252 21.7917 13.3501C21.7917 11.3666 19.1023 11.2503 19.1023 10.3758ZM28.6 15.8583L27.0554 8.27496H25.3964C25.0529 8.27496 24.7095 8.5085 24.595 8.8583L21.7349 15.8583H23.7374L24.1371 14.7503H26.5975L26.8265 15.8583H28.6ZM25.6822 10.3172L26.2537 13.1752H24.6519L25.6822 10.3172Z"
                          fill="#172B85"
                        />
                      </svg>
                      <span>Ends in 4354</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-black font-medium text-right">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                          fill="#686E7D"
                        />
                      </svg>
                    </button>
                  </td>
                </tr> */}
                  </tbody>
                )}
              </table>
            </div>
          )}

          {user?.user?.data?.roleId === 3 && (
            <div className="mb-10">
              <UserTransactionListing />
            </div>
          )}
          {user?.user?.data?.roleId === 2 && (
            <div className="mb-10">
              <TransactionListing />
            </div>
          )}
          {/* <div className="flex items-center justify-between mt-4 md:flex-row flex-col gap-4 w-full">
            <span className="text-sm">Showing 1 to 10 of 480 results</span>
            <nav className="inline-flex rounded-md shadow-sm border border-bordercolor overflow-hidden">
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.0871 6.175L11.9121 5L6.91211 10L11.9121 15L13.0871 13.825L9.27044 10L13.0871 6.175Z"
                    fill="#4E5663"
                  />
                </svg>
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue">
                2
              </button>
              <span className="px-3 py-1 border-blue border text-sm font-medium text-gray-500 bg-[#ECF2FF] text-blue">
                ...
              </span>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue border-r border-bordercolor">
                10
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:bg-[#ECF2FF] hover:text-blue">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M8.08711 5L6.91211 6.175L10.7288 10L6.91211 13.825L8.08711 15L13.0871 10L8.08711 5Z"
                    fill="#4E5663"
                  />
                </svg>
              </button>
            </nav>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Transactions;
