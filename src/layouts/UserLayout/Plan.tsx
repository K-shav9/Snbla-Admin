import React, { useEffect, useState } from "react";
import { deletePlan, getMerchantPlan, getPlans } from "../../actions/merchant";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/comman";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import Ant Design icons
import CommonModal from "../../components/Comman/Modal/CommonModal";

interface PlanType {
  id?: number; // Optional during creation
  pageTitle?: string; // Title from API
  everyTimeDeposit?: number; // Matches API response
  everyDepositEarn?: number; // Matches API response
  offerEarning?: number; // Matches API response
  promoPicture?: string | null; // URL instead of File
  demoVideo?: string | null; // URL instead of File
  category?: string; // Added 'category'
  groupBy?: string; // Added 'groupBy'
  merchant?: {
    id?: number;
    businessName?: string;
    website?: string | null;
    description?: string;
    brandLogo?: string | null;
  };
}

const Plan: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0, // Set totalItems dynamically based on API response
  });
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<PlanType | null>(null); // Store selected plan to delete
  const { isLoading } = useSelector((state: any) => state.General);
  const dispatch: any = useDispatch();
  const user = useSelector((state: any) => state?.Auth);

  useEffect(() => {
    document.title = "Offers | Snbla";
  }, []);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    // Fetch new data based on the updated page number
  };

  const merchantId = user?.user?.data?.merchant?.id;

  const fetchPlanByMerchantId = async () => {
    dispatch(
      getMerchantPlan({ merchantId }, (response: any) => {
        // merchant?.merchant?.id
        if (response.status === 200 || response?.status === 201) {
          setPlans(
            Array.isArray(response?.data) ? response.data : [response.data]
          );
        } else {
          console.error("Failed to fetch plans:", response);
        }
      })
    );
  };

  useEffect(() => {
    fetchPlanByMerchantId();
  }, []);


  // Handle Edit functionality
  const handleEdit = (plan: PlanType) => {
    navigate("/merchant/add-offer", { state: { planData: plan } });// Navigate to the edit offer page with the plan data
  };

  // Handle Delete functionality
  const handleDelete = (plan: PlanType) => {
    setPlanToDelete(plan);
    setIsDeleteModalVisible(true); // Open the modal for delete confirmation
  };

  // Confirm deletion API call
  const confirmDelete = () => {
    if (planToDelete?.id) {
      dispatch(
        deletePlan(planToDelete.id, (response: any) => {
          if (response.status === 200 || response.status === 204) {
            fetchPlanByMerchantId(); // Re-fetch plans after deletion
            console.log("Plan deleted successfully:", response.message);
          } else {
            console.error(
              "Failed to delete plan:",
              response.message || "Unknown error"
            );
          }
        })
      );
      setIsDeleteModalVisible(false);
      setPlanToDelete(null); // Clear selected plan after deletion
    }
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setPlanToDelete(null); // Clear selected plan if the modal is canceled
  };

  return (
    <section className="py-12 bg-gray-100 relative">
      <div className="relative">
        <h2 className="text-3xl font-semibold text-start mb-8 text-black">
          Your Offers
        </h2>
        {!plans.some((plan) => plan?.merchant?.id) && (
          <button
            className="absolute top-4 right-4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            onClick={() => navigate("/merchant/add-offer", {state: {}})}
          >
            Add Offer
          </button>
        )}
        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Spin size="large" />
          </div>
        )}
        <div className={`${isLoading ? "opacity-50" : ""}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left text-sm font-semibold text-gray-700 py-3 px-4">
                    Title
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 py-3 px-4">
                    Cashback Offer
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 py-3 px-4">
                    Category
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 py-3 px-4">
                    Group By
                  </th>
                  <th className="text-left text-sm font-semibold text-gray-700 py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans && plans.length > 0 && plans.some((plan) => plan?.id) ? (
                  plans.map((plan, index) =>
                    plan?.id ? (
                      <tr
                        key={plan.id}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <td className="text-sm text-gray-700 py-3 px-4">
                          {plan?.pageTitle || "N/A"}
                        </td>
                        <td className="text-sm text-gray-500 py-3 px-4">
                          {plan?.offerEarning || "N/A"} SAR
                        </td>
                        <td className="text-sm text-gray-500 py-3 px-4 capitalize">
                          {plan?.category || "-"}
                        </td>
                        <td className="text-sm text-gray-500 py-3 px-4">
                          {plan?.groupBy || "-"}
                        </td>
                        <td className="text-sm text-gray-500 py-3 px-4">
                          <div className="flex space-x-4">
                            <div className="flex my-3 items-center gap-4 iconssizefix">
                              <EditOutlined
                                onClick={() => handleEdit(plan)}
                              />
                              <DeleteOutlined
                                onClick={() => handleDelete(plan)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={5} // Ensure the colSpan matches the number of columns
                      className="px-6 py-4 text-center text-sm text-gray-500 font-medium"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {plans?.length < pagination?.totalItems && (
            <div className="mt-4 flex justify-end">
              <Pagination
                current={pagination.currentPage}
                pageSize={pagination.pageSize}
                total={pagination.totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
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
            <strong>{planToDelete?.pageTitle || "this plan"}</strong>?
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
    </section>
  );
};

export default Plan;
