// WalletDetails.tsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserWalletsByUserId, WalletCsvDownload } from "../../actions/admin";
import UserWalletTable from "./UserWalletTable";
import { Button, Input, Modal, Select } from "antd";
import { addVoucherToWallet } from "../../actions/merchant";
import Papa from "papaparse";

interface WalletDetailsProps {
  wallet: any[];
  loading: boolean;
  pagination: any;
  onPageChange: (page: number, pageSize: number) => void;
}

export const ViewUserWallet: React.FC<WalletDetailsProps> = ({
  wallet,
  loading,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const [wallets, setWallets] = useState<any>([]);
  const [viewWalletData, setViewWalletData] = useState<any>([]);
  const { userData } = location.state;
  const [filters, setFilters] = useState({
      search: "",
    });
  const [searchInput, setSearchInput] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const [newVoucher, setNewVoucher] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [isAddVoucherModalVisible, setIsAddVoucherModalVisible] =
    useState(false);
  const [voucherError, setVoucherError] = useState(""); // State for error message
  const [submitting, setSubmitting] = useState(false);
  const [csvLimit, setCsvLimit] = useState(10); // ✅ Default limit

  const userId = userData?.id || localStorage.getItem("userId");

  const fetchWalletsList = (
    page: number,
    pageSize: number,
    search: string = filters.search
  ) => {
    const data = { userId, page, pageSize, search };

    dispatch(getUserWalletsByUserId(data))
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
    fetchWalletsList(pagination.currentPage, pagination.pageSize, searchInput);
  }, [filters, pagination.currentPage, pagination.pageSize]);


  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleView = (record: any) => {
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/user/Wallet/details", { state: { walletData: record } }); // Passing data via state
  };

  const handleMerchantNavigate = (record: any) => {
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    localStorage.setItem("merchantId", record?.merchantId);
    navigate("/admin/merchant/details", { state: { tab: "4" } }); // Passing data via state
  };
   const handleSearchChange = (event) => {
     const value = event.target.value;
     setSearchInput(value);

     // ✅ If input is cleared, reset listing
     if (value === "") {
       setFilters((prev) => ({ ...prev, search: "" }));
       setPagination((prevState) => ({
         ...prevState,
         currentPage: 1, // Reset to first page
       }));
     }
   };

   const handleSearchSubmit = () => {
     setFilters((prev) => ({ ...prev, search: searchInput })); // ✅ Apply search filter
     setPagination((prevState) => ({
       ...prevState,
       currentPage: 1, // ✅ Reset to first page
     }));
     fetchWalletsList(pagination.currentPage, pagination.pageSize); // ✅ Fetch merchants only on button click
   };

   const handleClearSearch = () => {
     setSearchInput(""); // ✅ Clear input
     setFilters((prev) => ({ ...prev, search: "" })); // ✅ Reset search filter
     setPagination((prevState) => ({
       ...prevState,
       currentPage: 1, // ✅ Reset to first page
     }));
     fetchWalletsList(pagination.currentPage, pagination.pageSize); // ✅ Fetch default listing
   };

  const handleVoucherChange = (e) => {
    const value = e.target.value;
    const isOnlyNumbers = /^[0-9]+$/.test(value);
    const isOnlyLetters = /^[A-Za-z]+$/.test(value);

    if (/^[A-Za-z0-9!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]{0,6}$/.test(value)) {
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
      walletId: viewWalletData.id, // Get selected wallet ID
      merchantId: viewWalletData.merchantId,
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
       userId,
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
          const investedAmount = wallet?.balance || 0;
          const progress =
            targetAmount > 0
              ? ((investedAmount / targetAmount) * 100).toFixed(2)
              : "0"; // ✅ No more undefined error
  
          // Ensure merchants exist before accessing businessName
          const businessName = wallet["merchants.businessName"]; 
  
          return {
            Id: wallet?.id || "",
            "Merchant": businessName,
            "Goal Amount": Number(targetAmount),
            "Deposited Amount": Number(investedAmount),
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
      <UserWalletTable
        data={wallets}
        onView={handleView}
        onAddVoucher={handleVoucher}
        onMerchant={handleMerchantNavigate}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

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
          placeholder="Enter voucher code (6 chars max)"
          value={newVoucher}
          onChange={handleVoucherChange}
          maxLength={6}
          disabled={!!viewWalletData?.voucherCode}
        />
        {/* ✅ Show error message if validation fails */}
        {voucherError && <p className="text-red-500 mt-2">{voucherError}</p>}
      </Modal>
    </>
  );
};
