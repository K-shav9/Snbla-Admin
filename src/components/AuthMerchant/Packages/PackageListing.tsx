import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePackage, getPackagesByMerchantId } from "../../../actions/merchant";
import { useNavigate } from "react-router-dom";
import PackageTable from "./PackageTable";
import { Button, Spin } from "antd";
import CommonModal from "../../Comman/Modal/CommonModal";

interface PackageType {
  id?: number; // Optional during creation
  title?: string;
  totalAmount?: number;
  offerPercentage?: number;
  saveOnEveryDepo?: number;
  recurringOff?: number;
  isRecurring?: boolean;
  icon?: string;
  category?: string;
  merchant?: {
    id?: number;
    businessName?: string;
    website?: string | null;
    description?: string;
  };
}

const PackageListing = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [packageToEdit, setPackageToEdit] = useState<any>({}); // Store Merchant data for editing
  const [packageToDelete, setPackageToDelete] = useState<any>({}); // Store Merchant data for deletion
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<any>(false); // State for Delete Confirmation Modal
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
    pageSize: 10,
  });
  const user = useSelector((state: any) => state?.Auth);

  useEffect(() => {
    document.title = "Packages | Snbla";
  }, []);

  const merchantId = user?.user?.data?.merchant?.id;

  const fetchPackages = (page: number, pageSize: number) => {
    setLoading(true);
    dispatch(
      getPackagesByMerchantId(
        { page, pageSize },
        { merchantId: merchantId }, // Ensure merchantId is passed
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            setPackages(
              Array.isArray(response?.data) ? response.data : [response.data]
            );

            const paginationData = response?.pagination || {};
            setPagination({
              totalItems: paginationData.totalItems || 0,
              currentPage: paginationData.currentPage || 1,
              totalPages: paginationData.totalPages || 1,
              pageSize: paginationData.pageSize || 10,
            });
          } else {
            console.error("Failed to fetch packages:", response);
          }
          setLoading(false);
        }
      )
    );
  };

  useEffect(() => {
    fetchPackages(pagination.currentPage, pagination.pageSize);
  }, [pagination.currentPage]);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleEdit = (record: any) => {
    navigate("/merchant/add-package", { state: { packageData: record } }); // Passing data via state
  };

  const handleDelete = (record: any) => {
    setPackageToDelete(record); // Set the merchant to be deleted
    setIsDeleteModalVisible(true); // Open the Delete Confirmation modal
  };

  // DELETE MERCHANT API
      const confirmDelete = () => {
        setIsDeleteModalVisible(false);
        if (packageToDelete && packageToDelete.id) {
          // Dispatch the delete action
          dispatch(
            deletePackage(packageToDelete?.id, (response: any) => {
              if (response.status === 200 || response.status === 204) {
                console.log("Merchant deleted successfully:", response.message);
                fetchPackages(pagination.currentPage, pagination.pageSize);
              } else {
                console.error(
                  "Failed to delete merchant:",
                  response.message || "Unknown error"
                );
              }
              // Close the delete modal and reset state
              setIsDeleteModalVisible(false);
              setPackageToDelete(null); // Clear selected merchant
            })
          );
        } else {
          console.error("Merchant to delete not found.");
          setIsDeleteModalVisible(false);
        }
      };
  
   const handleCancel = () => {
     setIsDeleteModalVisible(false); // Close Delete Confirmation modal
     setPackageToEdit(null); // Clear Merchant data for editing
     setPackageToDelete(null); // Clear Merchant data for deletion
   };

  return (
    <div className="py-12 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-start mb-8 text-black">
          Your Packages
        </h2>
        <button
          className="absolute top-4 right-4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={() => navigate("/merchant/add-package")}
        >
          Add Package
        </button>

        {/* Check if packages length is 0 or if loading */}
        {isLoading ? (
          <div className="text-center text-lg text-gray-600 mt-4">
            <div
              className="flex justify-center items-center"
              style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            >
              <Spin size="large" />
            </div>
          </div>
        ) : packages?.length === 0 ? (
          <div className="text-center text-lg text-gray-600 mt-4">
            No data available.
          </div>
        ) : (
          <PackageTable
            data={packages}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

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
              <strong>{packageToDelete?.title || "this package"}</strong>?
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
      </div>
    </div>
  );
};

export default PackageListing;
