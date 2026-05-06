import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import UserTable from "./UserTable";
import CommonModal from "../../components/Comman/Modal/CommonModal"; // Reusable modal
import { useDispatch } from "react-redux";
import {
  deleteMerchantAndUser,
  getAllUsers,
  updateUserDetails,
} from "../../actions/admin";
import "../../styles/MerchantTable.css";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../actions/notification";
import UserNotificationModal from "./UserNotificationModal";

const UserList = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [viewUserData, setViewUserData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationData, setNotificationData] = useState<any>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State for Delete Confirmation Modal
  const [isSendNotificationModal, setIsSendNotificationModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null); // Store user data for editing
  const [userToDelete, setUserToDelete] = useState<any>(null); // Store user data for deletion
  const [sortField, setSortField] = useState<string>("createdAt"); // Default sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default so
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });

  useEffect(() => {
    document.title = "Users | Snbla";
  }, []);
  const [filters, setFilters] = useState({
    search: "",
  });
  const [searchInput, setSearchInput] = useState("");

  // USER LISTING API
  const fetchUsersList = (roleId: number) => {
    setLoading(true);

    // Define the data (without roleId) that will be passed to the API
    const data = {
      page: pagination?.currentPage,
      limit: pagination?.pageSize,
      search: filters.search,
      sort: sortField, //sort
      order: sortOrder, // order
    };

    // Directly call the API and handle response using .then and .catch
    dispatch(getAllUsers({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          // Set the users with the fetched data
          setUsers(response?.data);

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
          setUsers([]); // Clear users on error
        }
        setLoading(false); // Stop loading after the response
      })
      .catch((error: any) => {
        console.error("Error fetching users", error);
        setUsers([]); // Clear users on error
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    fetchUsersList(3);
  }, [dispatch, filters, pagination?.currentPage, pagination.pageSize, sortField, sortOrder]);

  const handleStatusChange = (record: any, newStatus: boolean) => {
    const updatedStatus = {
      id: record.id,
      isActive: newStatus,
      isAdmin: true,
    };

    dispatch(
      updateUserDetails(updatedStatus, (response: any) => {
        if (response.status === 200 || response.status === 201) {
          // Handle success
          console.log("Successfully updated status", response.data);
          fetchUsersList(3);
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
    setViewUserData(record);
    navigate("/admin/user/details", { state: { userData: record } }); // Passing data via state
  };

  const handleEdit = (record: any) => {
    setUserToEdit(record); // Set the user to be edited
    navigate("/admin/user/edit", { state: { user: record } });
  };

  const handleDelete = (record: any) => {
    setUserToDelete(record); // Set the user to be deleted
    setIsDeleteModalVisible(true); // Open the Delete Confirmation modal
  };

  const handleOpenNotificationModal = (record: any) => {
    setNotificationData(record); // Set the notification data
    setIsSendNotificationModal(true); // Open the Send Notification modal
  };

  // DELETE USER API
  const confirmDelete = () => {
    setIsDeleteModalVisible(false);
    if (userToDelete && userToDelete.id) {
      // Dispatch the delete action
      dispatch(
        deleteMerchantAndUser(userToDelete.id, (response: any) => {
          if (response.status === 200 || response.status === 204) {
            console.log("Merchant deleted successfully:", response.message);
            fetchUsersList(3);
          } else {
            console.error(
              "Failed to delete merchant:",
              response.message || "Unknown error"
            );
          }
          // Close the delete modal and reset state
          setIsDeleteModalVisible(false);
          setUserToDelete(null); // Clear selected merchant
        })
      );
    } else {
      console.error("Merchant to delete not found.");
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsSendNotificationModal(false);
    setUserToDelete(null);
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
    }
  };

  const handleSearchSubmit = () => {
    setFilters((prev) => ({ ...prev, search: searchInput })); // ✅ Apply search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchUsersList(3); // ✅ Fetch merchants only on button click
  };

  const handleClearSearch = () => {
    setSearchInput(""); // ✅ Clear input
    setFilters((prev) => ({ ...prev, search: "" })); // ✅ Reset search filter
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 1, // ✅ Reset to first page
    }));
    fetchUsersList(3); // ✅ Fetch default listing
  };

  const [formData, setFormData] = useState({
    platform: "",
    appVersion: "",
    description_en: "",
  });

  const [form] = Form.useForm();

  const handleSendNotification = async () => {
    setIsSubmitting(true);
    try {

      await form.validateFields();
      const formValues = form.getFieldsValue(true);

      const data = new FormData();
      data.append(
        "platform",
        notificationData?.deviceInfo?.platform || formValues.platform
      );
      data.append(
        "appVersion",
        notificationData?.deviceInfo?.app_version || formValues.appVersion
      );
      data.append("description_en", formValues.description_en || "");

      dispatch(
        createNotification(data, (response: any) => {
          setIsSubmitting(false);
          if (response?.success === true) {
            fetchUsersList(3);
          } else {
            console.error("Failed to create notification:", response);
          }
          setIsSendNotificationModal(false);
        })
      );
    } catch (error) {
      console.error("Please fill out all required fields!");
      setIsSendNotificationModal(false);
    }
  };


   const removePaymentId = localStorage.removeItem("paymentId");


  return (
    <div>
      <div className="flex justify-between items-center mt-3 mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        {/* <Button className="btn-primary">Download CSV</Button> */}
        {/* <Button type="primary" onClick={showCreateUserModal}>
          Create User
        </Button> */}
      </div>

      <div className="d-flex gap-2 justify-content-end w-100 pb-3">
        <div className="relative sm:w-auto w-full">
          <input
            type="text"
            placeholder="Search by name & email"
            value={searchInput} // ✅ Controlled input
            onChange={handleSearchChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearchSubmit(); // ✅ Trigger search when Enter is pressed
              }
            }}
            className="grow border border-bordercolor rounded-lg px-4 pl-8 py-3 text-sm h-[40px] w-full"
            style={{ maxWidth: "300px" }}
          />
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
        <UserTable
          data={users}
          loading={loading}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSendNotification={handleOpenNotificationModal}
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
        <div className="text-center">
          <p>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.firstName || "this user"}</strong>?
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

      <UserNotificationModal
        data={notificationData}
        isVisible={isSendNotificationModal}
        onClose={handleCancel}
        onSubmit={handleSendNotification}
        loading={isSubmitting}
        form={form}
      />
    </div>
  );
};

export default UserList;
