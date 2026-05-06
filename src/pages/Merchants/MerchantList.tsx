import React, { useEffect, useState } from "react";
import MerchantTable from "../Merchants/MerchantTable";
import { Button } from "antd";
import CommonModal from "../../components/Comman/Modal/CommonModal"; // Reusable modal
import { useDispatch } from "react-redux";
import {
  adminResetPasswordMerchantFromList,
  deleteMerchantAndUser,
  getAllAdminMerchants,
  updateMerchantDetails,
} from "../../actions/admin";
import "../../styles/MerchantTable.css";
import { useNavigate } from "react-router-dom";

const MerchantList = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState<any>([]);
  const [viewMerchantData, setViewMerchantData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for Delete Confirmation Modal
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [merchantToEdit, setMerchantToEdit] = useState<any>({}); // Store Merchant data for editing
  const [merchantToDelete, setMerchantToDelete] = useState<any>({}); // Store Merchant data for deletion
  const [merchantToReset, setMerchantToReset] = useState<any>({}); // Store Merchant data for deletion
  const [sortField, setSortField] = useState<string>("createdAt"); // Default sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default so
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  useEffect(() => {
    document.title = "Merchants | Snbla";
  }, []);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [searchInput, setSearchInput] = useState("");

  // MERCHANT LISTING API
  const fetchMerchantsList = (roleId: number) => {
    setLoading(true);

    // Define the data (without roleId) that will be passed to the API
    const data = {
      page: pagination?.currentPage,
      limit: pagination?.pageSize,
      search: filters.search,
      sort: sortField,   //sort
      order: sortOrder, // order
    };

    // Directly call the API and handle response using .then and .catch
    dispatch(getAllAdminMerchants({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          // Set the users with the fetched data
          setMerchants(response?.data);

          // Handle pagination
          const paginationData = response?.pagination || {};
          setPagination({
            totalItems: paginationData?.totalItems,
            currentPage: paginationData?.currentPage,
            totalPages: paginationData?.totalPages,
            pageSize: paginationData?.pageSize,
          });
        } else {
          console.error("Error fetching users", response);
          setMerchants([]); // Clear users on error
        }
        setLoading(false); // Stop loading after the response
      })
      .catch((error: any) => {
        console.error("Error fetching users", error);
        setMerchants([]); // Clear users on error
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    fetchMerchantsList(2);
  }, [dispatch, filters, pagination?.currentPage, pagination.pageSize, sortOrder, sortOrder]);

  const handleStatusChange = (record: any, newStatus: boolean) => {
    const updatedStatus = {
      isActive: newStatus,
    };
    const merchantId = record?.id;

    dispatch(
      updateMerchantDetails(updatedStatus, merchantId, (response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Handle success
          console.log("Successfully updated status", response.data);
          fetchMerchantsList(2);
        } else {
          // Handle failure
          console.error("Failed to update user status", response);
        }
      })
    );
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
    setViewMerchantData(record); // Optionally set the state here if you still need it locally
    localStorage.setItem("merchantId", record?.merchant?.id);
    navigate("/admin/merchant/details", { state: { merchantData: record } }); // Passing data via state
  };

  const handleWalletTab = (record: any) => {
    setViewMerchantData(record); // Optionally set the state here if you still need it locally
    localStorage.setItem("merchantId", record?.merchant?.id);
    navigate("/admin/merchant/details", { state: { tab: "4" } }); // Passing data via state
  };

  const handleEdit = (record: any) => {
    setMerchantToEdit(record); // Set the merchant to be edited
    navigate("/admin/merchant/edit", { state: { merchantData: record } }); // Passing data via state
  };

  const handleDelete = (record: any) => {
    setMerchantToDelete(record); // Set the merchant to be deleted
    setIsDeleteModalVisible(true); // Open the Delete Confirmation modal
  };

  const handleReset = (record: any) => {
    setMerchantToReset({
      ...record,
      email: record?.email || "", // Extract email properly
    });
    setIsResetPasswordModalVisible(true);
  };

  // DELETE MERCHANT API
  const confirmDelete = () => {
    setIsDeleteModalVisible(false);
    if (merchantToDelete && merchantToDelete.id) {
      // Dispatch the delete action
      dispatch(
        deleteMerchantAndUser(merchantToDelete.id, (response: any) => {
          if (response.status === 200 || response.status === 204) {
            console.log("Merchant deleted successfully:", response.message);
            fetchMerchantsList(2);
          } else {
            console.error(
              "Failed to delete merchant:",
              response.message || "Unknown error"
            );
          }
          // Close the delete modal and reset state
          setIsDeleteModalVisible(false);
          setMerchantToDelete(null); // Clear selected merchant
        })
      );
    } else {
      console.error("Merchant to delete not found.");
      setIsDeleteModalVisible(false);
    }
  };

  // DELETE MERCHANT API
  const confirmResetPassword = () => {
    setIsResetPasswordModalVisible(false);
    if (merchantToReset && merchantToReset.id) {
      // Dispatch the delete action
      dispatch(
        adminResetPasswordMerchantFromList(
          { email: merchantToReset.email },
          (response: any) => {
            if (response?.status === 200 || response?.status === 204) {
              console.log("Merchant deleted successfully:", response.message);
              fetchMerchantsList(2);
            } else {
              console.error(
                "Failed to delete merchant:",
                response.message || "Unknown error"
              );
            }
            // Close the delete modal and reset state
            setIsResetPasswordModalVisible(false);
            setMerchantToReset(null); // Clear selected merchant
          }
        )
      );
    } else {
      console.error("Merchant to Reset not found.");
      setIsResetPasswordModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false); // Close Delete Confirmation modal
    setIsResetPasswordModalVisible(false); // Close Delete Confirmation modal
    setMerchantToEdit(null); // Clear Merchant data for editing
    setMerchantToDelete(null); // Clear Merchant data for deletion
  };

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
      pageSize: pageSize,
    }));
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
      // fetchMerchantsList(2);
    }
  };

  const handleSearchSubmit = () => {
    setFilters((prev) => ({ ...prev, search: searchInput })); // ✅ Apply search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchMerchantsList(2); // ✅ Fetch merchants only on button click
  };

  const handleClearSearch = () => {
    setSearchInput(""); // ✅ Clear input
    setFilters((prev) => ({ ...prev, search: "" })); // ✅ Reset search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchMerchantsList(2); // ✅ Fetch default listing
  };

  const removeMerchantId = localStorage.removeItem("merchantId");
  const removeMerchantUserId = localStorage.removeItem("merchantUserId");
  const removePaymentId = localStorage.removeItem("paymentId");

  return (
    <>
      <div className="flex justify-between items-center mt-3 mb-6">
        <h1 className="text-3xl font-bold">Merchants</h1>
        <div className="flex gap-3">
          <Button
            className="btn-primary"
            onClick={() => navigate("/admin/merchant/create")}
          >
            Create Merchant
          </Button>
          {/* <Button className="btn-primary">Download CSV</Button> */}
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end w-100 pb-3">
        <div className="relative sm:w-auto w-full">
          <input
            type="text"
            placeholder="Search by contact name & email"
            value={searchInput} // ✅ Controlled input
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit(); // ✅ Trigger search when Enter is pressed
              }
            }}
            className="flex-grow border border-bordercolor rounded-lg px-4 pl-8 pr-10 py-3 text-sm h-[40px] w-full"
            style={{ maxWidth: "300px" }}
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
          className="btn-primary py-2"
          onClick={handleSearchSubmit}
          style={{ height: "40px" }}
        >
          Search
        </Button>
      </div>
      <div className="mb-12">
        <MerchantTable
          data={merchants}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReset={handleReset}
          onWallet={handleWalletTab}
          onStatusChange={handleStatusChange}
          pagination={pagination}
          onPageChange={handlePageChange} // Pass page change handler
          onSort={handleSort}
        />
      </div>
      {/* Delete Confirmation Modal */}
      <CommonModal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onClose={handleCancel}
        width={400}
      >
        <div className="text-left mr-10">
          <p>
            Are you sure you want to delete{" "}
            <strong>
              {merchantToDelete?.merchant?.businessName || "this merchant"}
            </strong>
            ?
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={handleCancel}
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} type="primary" danger>
              Confirm
            </Button>
          </div>
        </div>
      </CommonModal>

      <CommonModal
        title="Confirm Reset Password"
        open={isResetPasswordModalVisible}
        onClose={handleCancel}
        width={400}
      >
        <div className="text-left mr-10">
          <p>
            You are about to reset the password for{" "}
            <strong>{merchantToReset?.email || "this merchant"}</strong>?
          </p>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              onClick={handleCancel}
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button onClick={confirmResetPassword} type="primary" danger>
              Confirm
            </Button>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default MerchantList;
