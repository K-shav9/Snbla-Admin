import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import WalletTable from "./WalletTable";
import { useNavigate } from "react-router-dom";
import { getAllWallets, WalletCsvDownload } from "../../actions/admin";
import { useDispatch } from "react-redux";
import { addVoucherToWallet } from "../../actions/merchant";
import Papa from "papaparse";

const Wallet = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<any>([]);
  const [viewWalletData, setViewWalletData] = useState<any>([]);
  const [newVoucher, setNewVoucher] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button
  const [isAddVoucherModalVisible, setIsAddVoucherModalVisible] =
    useState(false);
  const [voucherError, setVoucherError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // const [csvLimit, setCsvLimit] = useState(10); // ✅ Default limit
  const [sortField, setSortField] = useState<string>("createdAt"); // Default sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default sort order
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

  useEffect(() => {
    document.title = "Wallets | Snbla";
  }, []);

  const fetchWalletsList = (
    page: number,
    pageSize: number,
    search: string = filters.search,

  ) => {
    setLoading(true);

    const data = { page, pageSize, search, sort: sortField, order: sortOrder };

    dispatch(getAllWallets(data))
      .then((response: any) => {
        setWallets(response?.data || []);

        console.log(response?.data?.length, "....len")
        setPagination({
          currentPage: response?.pagination?.currentPage || page, // ✅ Use API response or fallback to local
          totalItems: response?.pagination?.total || 0, // ✅ Ensure correct total count
          totalPages: response?.pagination?.totalPages || 1, // ✅ Ensure correct total pages
          pageSize, // ✅ Preserve pageSize
        });
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error fetching wallets", error);
        setWallets([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWalletsList(pagination.currentPage, pagination.pageSize, searchInput);
  }, [
    filters,
    pagination.currentPage,
    pagination.pageSize,
    sortField,
    sortOrder,
  ]);

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize, "123");
    
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
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

  const handleSort = (field: string) => {
    let newOrder: "asc" | "desc" | null = null;
    let newField = field;

    if (sortField === field) {
      if (sortOrder === "asc") {
        newOrder = "desc"; // Second click -> descending
      } else if (sortOrder === "desc") {
        newOrder = "desc"; // Third click -> reset sorting to default
        newField = "createdAt";
      } else {
        newOrder = "asc"; // First click -> ascending
      }
    } else {
      newOrder = "asc"; // New column clicked, default to ascending
    }
    setSortField(newField);
    setSortOrder(newOrder);
  };

  const handleView = (record: any) => {
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/Wallet/details", { state: { walletData: record } }); // Passing data via state
  };

  const handleNavigateUser = (record: any) => {
    localStorage.setItem("userId", record?.userId);
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/user/details", { state: { tab: "1" } }); // Passing data via state
  };

  const handleNavigateMerchant = (record: any) => {
    localStorage.setItem("merchantUserId", record?.merchants?.userId);
    localStorage.setItem("merchantId", record?.merchantId);
    setViewWalletData(record); // Optionally set the state here if you still need it locally
    navigate("/admin/merchant/details", { state: { tab: "1" } }); // Passing data via state
  };

  const removeMerchantUserId = localStorage.removeItem("merchantUserId");
  const removeMerchantId = localStorage.removeItem("merchantId");
  const userId = localStorage.removeItem("userId");

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
    } else if (isOnlyLetters) {
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
            "User ID": wallet?.userId || "",
            "Merchant ID": wallet?.merchantId || "",
            "Business Name": businessName,
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
      <div className="d-flex gap-2 justify-content-end w-100 pb-3">
        <div className="relative sm:w-auto w-full">
          <input
            type="text"
            placeholder="Search by goal name"
            value={searchInput} // ✅ Controlled input
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit(); // ✅ Trigger search when Enter is pressed
              }
            }}
            className="grow border border-bordercolor rounded-lg px-4 pl-8 pr-10 py-3 text-sm h-[40px] w-full"
            style={{ maxWidth: "300px", height: "40px" }}
          />

          {/* Search Icon */}
          <svg
            className="absolute left-2 top-[11px]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.1291 11.8791H12.4707L12.2374 11.6541C13.0541 10.7041 13.5457 9.47074 13.5457 8.12907C13.5457 5.1374 11.1207 2.7124 8.12907 2.7124C5.1374 2.7124 2.7124 5.1374 2.7124 8.12907C2.7124 11.1207 5.1374 13.5457 8.12907 13.5457C9.47074 13.5457 10.7041 13.0541 11.6541 12.2374L11.8791 12.4707V13.1291L16.0457 17.2874L17.2874 16.0457L13.1291 11.8791ZM8.12907 11.8791C6.05407 11.8791 4.37907 10.2041 4.37907 8.12907C4.37907 6.05407 6.05407 4.37907 8.12907 4.37907C10.2041 4.37907 11.8791 6.05407 11.8791 8.12907C11.8791 10.2041 10.2041 11.8791 8.12907 11.8791Z"
              fill="#686E7D"
            />
          </svg>

          {/* Clear (✖) Icon - Only visible when input is not empty */}
          {searchInput && (
            <svg
              className="absolute right-3 top-[12px] cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={handleClearSearch} // ✅ Handle clear click
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </div>

        <Button
          className="btn-primary py-0"
          onClick={handleSearchSubmit}
          style={{ height: "40px" }}
        >
          Search
        </Button>
      </div>
      <div className="mb-12">
        <WalletTable
          data={wallets}
          onView={handleView}
          onAddVoucher={handleVoucher}
          onUser={handleNavigateUser}
          onMerchant={handleNavigateMerchant}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange} // Pass page change handler
          onSort={handleSort}
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

export default Wallet;
