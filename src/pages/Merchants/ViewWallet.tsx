// WalletDetails.tsx
import React, { useEffect, useState } from "react";
import WalletTable from "../Wallets/WalletTable";
import { useDispatch, useSelector } from "react-redux";
import { addVoucherToWallet, getWalletsByMerchantId } from "../../actions/merchant";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Modal, Select } from "antd";
import MerchantWalletTable from "./MerchantWalletTable";
import { WalletCsvDownload } from "../../actions/admin";
import Papa from "papaparse";

interface WalletDetailsProps {
  wallet: any[];
  loading: boolean;
  pagination: any;
  onPageChange: (page: number, pageSize: number) => void;
}

export const ViewWallet: React.FC<WalletDetailsProps> = ({
  wallet,
  loading,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [wallets, setWallets] = useState<any>([]);
   const [viewWalletData, setViewWalletData] = useState<any>([]);
  const { merchantData } = location.state;
  const user = useSelector((state: any) => state?.Auth);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    search: "",
  });
  const [searchInput, setSearchInput] = useState("");
    const [newVoucher, setNewVoucher] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
      const [isAddVoucherModalVisible, setIsAddVoucherModalVisible] =
        useState(false);
  const [voucherError, setVoucherError] = useState(""); // State for error message
    const [submitting, setSubmitting] = useState(false);

  const merchantId = merchantData?.merchant?.id || localStorage.getItem("merchantId");
  const fetchWalletsList = (page: number, pageSize: number) => {
    const data = { merchantId, page, pageSize, search: filters.search };

    dispatch(getWalletsByMerchantId(data))
      .then((response: any) => {
        setWallets(response?.data || []);
        setPagination({
          currentPage: response?.pagination?.currentPage || 1, // ✅ Use API response or fallback to 1
          totalItems: response?.pagination?.total || 0, // ✅ Fix incorrect `totalItems`
          totalPages: response?.pagination?.totalPages || 1, // ✅ Ensure correct `totalPages`
          pageSize: pagination.pageSize, // ✅ Keep the existing `pageSize`
        });
        // setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setWallets([]);
      });

  };


  useEffect(() => {
    fetchWalletsList(pagination.currentPage, pagination.pageSize);
  }, [filters, pagination.currentPage, pagination.pageSize]);

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: pageSize,
    }));
  };


  const handleView = (record: any) => {
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/merchant/Wallet/details", { state: { walletData: record } }); // Passing data via state
  };

  const handleNavigateUser = (record: any) => {
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    localStorage.setItem("userId", record?.userId);
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/user/details", { state: { tab: "1" } }); // Passing data via state
  };

   const handleVoucherChange = (e) => {
         const value = e.target.value;
    
         const isOnlyNumbers = /^[0-9]+$/.test(value);
         const isOnlyLetters = /^[A-Za-z]+$/.test(value);
    
         if (/^[A-Za-z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]{0,12}$/.test(value)) {
           setNewVoucher(value); 
           setVoucherError(""); 
         }
    
         if (isOnlyNumbers) {
           setVoucherError("Voucher must include both letters and numbers.");
         }
         else if (isOnlyLetters) {
           setVoucherError("Voucher must include both letters and numbers.");
         }
       };
    
      
      const handleAddVoucher = () => {
        // Set submitting state to true when API is called
        setIsSubmitting(true);
        if (!newVoucher.trim()) return;
    
        const data = {
          walletId: viewWalletData?.id, // Get selected wallet ID
          merchantId: viewWalletData?.merchantId,
          voucherCode: newVoucher,
        };
    
        dispatch(
          addVoucherToWallet(data, (response) => {
            setIsSubmitting(false); 
            setIsAddVoucherModalVisible(false); // Close modal
            if (response?.success) {
              setWallets((prevWallets) =>
                prevWallets.map((wallet) =>
                  wallet?.id === viewWalletData?.id
                    ? { ...wallet, voucherCode: newVoucher }
                    : wallet
                )
              );
    
              setNewVoucher(""); // Clear input
              fetchWalletsList(pagination.currentPage, pagination.pageSize); // Refresh the list
            }
          })
        );
      };
  
     const handleVoucher = (record: any) => {
       setNewVoucher(record?.voucherCode || ""); // Reset input before opening modal
       setViewWalletData(record); // Store the selected wallet
       setIsAddVoucherModalVisible(true); // Open the modal
     };
  
     const handleDownloadCSV = () => {
       setSubmitting(true);
    
       const params = {
         merchantId,
         search: filters.search || "",
       };
    
       dispatch(WalletCsvDownload(params))
         .then((response: any) => {
           setSubmitting(false);
    
           if (!response || !response.data || response.data.length === 0) {
             console.error("No data available for CSV export.");
             return;
           }
    
           // ✅ Ensure numeric values & proper column headers
          const csvData = response?.data?.map((wallet) => {
            const targetAmount = wallet?.targetAmount || 0; // ✅ Defined correctly
            const balance = wallet?.balance || 0; // ✅ Defined correctly
            const investedAmount = wallet?.investedAmount || 0;
            const progress =
              targetAmount > 0
                ? ((investedAmount / targetAmount) * 100).toFixed(2)
                : "0"; // ✅ No more undefined error
    
            // Ensure merchants exist before accessing businessName
            const businessName = wallet["merchants.businessName"]; 
    
            return {
              Id: wallet?.id || "",
              "Goal Amount": Number(targetAmount),
              "Deposited Amount": Number(balance),
              "Progress (%)": progress, // ✅ Matches UI calculation
              "Remaining Amount": wallet?.remainingAmount
                ? Number(wallet?.remainingAmount)
                : 0,
              "Created At": wallet?.createdAt || "",
              "Last Transaction": wallet?.updatedAt || "",
            };
          });
    
    
           // ✅ Convert JSON data to CSV format
           const csv = Papa.unparse(csvData, {
             header: true, // Ensures correct column headers
           });
    
           // ✅ Create & download CSV file
           const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
           const link = document.createElement("a");
           const url = URL.createObjectURL(blob);
           link.href = url;
           link.setAttribute("download", "wallets_data.csv");
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
        <h1 className="text-3xl font-bold">Wallets</h1>
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
        <MerchantWalletTable
          data={wallets}
          onView={handleView}
          onAddVoucher={handleVoucher}
          onUser={handleNavigateUser}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        title="Add Voucher Code"
        open={isAddVoucherModalVisible}
        onCancel={() => setIsAddVoucherModalVisible(false)}
        footer={[
          <Button
            key="cancel"
            onClick={() => setIsAddVoucherModalVisible(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>,
          !viewWalletData?.voucherCode && ( // ✅ Hide button only if voucher is prefilled
            <Button
              key="submit"
              type="primary"
              onClick={handleAddVoucher}
              loading={isSubmitting}
              disabled={!!voucherError || newVoucher.length < 6} // Prevent adding if validation fails
            >
              Add Voucher
            </Button>
          ),
        ]}
      >
        <Input
          placeholder="Enter voucher code (6 chars min)"
          value={newVoucher}
          onChange={handleVoucherChange}
          maxLength={12}
          disabled={!!viewWalletData?.voucherCode}
        />
        {/* ✅ Show error message if validation fails */}
        {voucherError && <p className="text-red-500 mt-2">{voucherError}</p>}
      </Modal>
    </>
  );
};
