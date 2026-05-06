// PackageDetails.tsx
import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PackageTable from "./AdminPackageTable";
import { useDispatch } from "react-redux";
import CommonModal from "../../components/Comman/Modal/CommonModal";
import { deletePackage } from "../../actions/merchant";

interface PackageDetailsProps {
  merchantData: any;
  packages: any;
  loading: boolean;
  pagination: any;
  fetchPackages: any;
  onPageChange: (page: number, pageSize: number) => void;
}

export const ViewPackage: React.FC<PackageDetailsProps> = ({
  merchantData,
  packages,
  fetchPackages,
  loading,
  pagination,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [packageToEdit, setPackageToEdit] = useState<any>({}); // Store Merchant data for editing
  const [packageToDelete, setPackageToDelete] = useState<any>({}); // Store Merchant data for deletion
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<any>(false); // State for Delete Confirmation Modal
  const merchantId = localStorage.getItem("merchantId");

  const handleEdit = (record: any) => {
    setPackageToEdit(record); // Set the merchant to be edited
    navigate("/admin/merchant/add-package", { state: { packageData: record } }); // Passing data via state
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
              fetchPackages(merchantId);
              console.log("Merchant deleted successfully:", response.message);
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
    <>
      <div className="text-end mb-2 mt-4">
        <Button
          className="btn-primary"
          onClick={() =>
            navigate("/admin/merchant/add-package", {
              state: { merchantData: merchantData?.merchant?.id },
            })
          }
        >
          Add Package
        </Button>
      </div>
      <div className="mb-12">
        <PackageTable
          data={packages}
          loading={loading}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={onPageChange}
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
    </>
  );
};
