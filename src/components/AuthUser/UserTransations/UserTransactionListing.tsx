import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import UserTransactionTable from "./UserTransactionTable";
import { getTransactionsByUserId } from "../../../actions/user";

const UserTransactionListing = () => {
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state?.Auth);
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

  return (
    <div className="w-full">
      <div className="relative">
        {/* Loader */}
        {/* {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Spin  />
          </div>
        )} */}
        <div className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <Spin />
            </div>
          ) : (
            <table className="w-full">

              <thead>
                <tr className="">
                  <th className="px-6 py-3 font-medium text-xs bg-[#F9FAFC]">
                    <div className="flex items-center justify-between">
                      Order ID
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
                      Transaction ID
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
                      Business Name
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
                      Contact Name
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
                      Email
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
                      Amount
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
                      Status
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
                      Payment Date
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
                {transactions.length > 0 ? (
                  transactions.map((transaction: any, index: number) => (
                    <tr
                      className="border-[#F1F3F7] border-b hover:bg-gray-50"
                      key={index}
                    >
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.orderId
                          ? String(transaction.orderId).length > 6
                            ? `${String(transaction.orderId).slice(
                              0,
                              3
                            )}...${String(transaction.orderId).slice(-3)}`
                            : transaction.orderId
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.transactionId
                          ? String(transaction.transactionId).length > 6
                            ? `${String(transaction.transactionId).slice(
                              0,
                              3
                            )}...${String(transaction.transactionId).slice(-3)}`
                            : transaction.transactionId
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.merchant?.businessName}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.user?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.user?.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.amount}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {transaction?.status}
                      </td>
                      <td className="px-6 py-4 text-sm text-black font-medium">
                        {new Date(transaction?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          )}

        </div>
        <div className="flex justify-end mt-4">
          {pagination?.totalItems > 10 && (
            <Pagination
              current={pagination.currentPage}
              pageSize={pagination.pageSize}
              total={pagination.totalItems}
              onChange={handlePageChange}
            // showSizeChanger
            // pageSizeOptions={["10", "20", "50", "100"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTransactionListing;
