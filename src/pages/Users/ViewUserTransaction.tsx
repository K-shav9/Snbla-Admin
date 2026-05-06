// WalletDetails.tsx
import React, { useEffect, useState } from "react";
import WalletTable from "../Wallets/WalletTable";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Select } from "antd";
import TransactionTable from "../Transactions/TransactionTable";
import { getTransactionsByUserId } from "../../actions/user";
import { TransactionCsvDownload } from "../../actions/admin";
import Papa from "papaparse";

interface TransactionDetailsProps {
  transaction: any[];
  loading: boolean;
  pagination: any;
  onPageChange: (page: number, pageSize: number) => void;
}

export const ViewUserTransaction: React.FC<TransactionDetailsProps> = ({
  transaction,
  loading,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [transactions, setTransactions] = useState<any>([]);
  const [viewtransactionData, setViewTransactionData] = useState<any>([]);
   const { userData } = location.state;
  const [submitting, setSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10, // ✅ Default value
  });

  const [filters, setFilters] = useState({
    search: "",
  });
  const [searchInput, setSearchInput] = useState("");

   const userId = userData?.id || localStorage.getItem("userId");

  const fetchTransactionsList = (page: number, pageSize: number) => {
    const data = { userId, page, pageSize, search: filters.search };

    dispatch(getTransactionsByUserId(data))
      .then((response: any) => {
        setTransactions(response?.data || []);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.pagination?.currentPage || prev.currentPage,
          totalItems: response?.pagination?.totalItems || prev.totalItems,
          totalPages: response?.pagination?.totalPages || prev.totalPages,
          pageSize: response?.pagination?.pageSize || prev.pageSize,
        }));

        // setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching transactions", error);
        setTransactions([]);
      });
  };

  useEffect(() => {
    fetchTransactionsList(pagination.currentPage, pagination.pageSize);
  }, [filters, pagination.currentPage, pagination.pageSize]);

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: pageSize,
    }));
  };

  const handleViewTransaction = (record: any) => {
    setViewTransactionData(record);
    if (record?.id) {
      localStorage.setItem("paymentId", record?.id);
    }
    navigate("/admin/user/transaction/details", {
      state: { transactionsData: record },
    });
  };
    
     const handleDownloadCSV = () => {
       setSubmitting(true);
    
       const params = {
         userId,
         search: filters.search || "",
       };
    
       dispatch(TransactionCsvDownload(params))
         .then((response: any) => {
           setSubmitting(false);
    
           if (!response || !response.data || response.data.length === 0) {
             console.error("No data available for CSV export.");
             return;
           }
    
           
           // ✅ Ensure numeric values & proper column headers
           const csvData = response?.data?.map((transaction) => {
            // Ensure merchants exist before accessing businessName
            const userName = transaction["user.name"];
            const userEmail = transaction["user.email"];
            const totaAmount =
              (transaction["userPlan.plan.totalAmount"] ||
                transaction?.userPlan?.plan?.totalAmount) ??
              transaction?.totalAmount;
  
            return {
              Id: transaction?.id || "",
              "Order ID": transaction?.orderId || "",
              "Transaction ID": transaction?.transactionId || "",
              Name: userName,
              Email: userEmail,
              "Total Amount": totaAmount,
              "Reward (%)": transaction?.reward, 
              Status: transaction?.status || "",
              "Payment Date": transaction?.createdAt || "",
            };
          });
    
    
           // ✅ Convert JSON data to CSV format
           const csv = Papa.unparse(csvData, {
             header: true, 
           });
    
           // ✅ Create & download CSV file
           const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
           const link = document.createElement("a");
           const url = URL.createObjectURL(blob);
           link.href = url;
           link.setAttribute("download", "transaction_data.csv");
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
         })
         .catch((error) => {
           setSubmitting(false);
           console.error("Error downloading CSV:", error);
         });
     };

  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="flex gap-4 items-center">
          <Button
            className="btn-primary"
            onClick={handleDownloadCSV}
            loading={submitting}
          >
            Download CSV
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <TransactionTable
          data={transactions}
          onView={handleViewTransaction}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
