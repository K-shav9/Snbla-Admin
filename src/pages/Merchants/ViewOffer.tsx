// OfferDetails.tsx
import React, { useEffect, useState } from "react";
import { Button, Form, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { capitalizeFirstLetter } from "../../utils/comman";
import userLogo from "../../images/user/userProfile.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "../../actions/merchant";
import CommonModal from "../../components/Comman/Modal/CommonModal";

interface OfferDetailsProps {
  merchantData: any;
  showButton: boolean;
  plans: any;
  loading: boolean;
  fetchOffers: any;
}

interface PlanType {
  id?: number;
  businessName?: string;
  website?: string | null;
  description?: string;
  brandLogo?: string | null;
  plan?: {
    id?: number; // Optional during creation
    pageTitle?: string; // Title from API
    everyTimeDeposit?: number; // Matches API response
    everyDepositEarn?: number; // Matches API response
    offerEarning?: number; // Matches API response
    promoPicture?: string | null; // URL instead of File
    demoVideo?: string | null; // URL instead of File
    category?: string; // Added 'category'
    groupBy?: string; // Added 'groupBy'
  };
}

export const ViewOffer: React.FC<OfferDetailsProps> = ({
  merchantData,
  showButton,
  plans,
  fetchOffers,
  loading,
}) => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.General);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<any | null>(null); // Store selected plan to delete
  const plan = merchantData?.merchant;

  const planMerchantId = Number(localStorage.getItem("merchantId"));

  const handleEdit = (plan: PlanType) => {
    navigate("/admin/merchant/add-offer", { state: { planData: plan } }); // Navigate to the edit offer page with the plan data
  };

  // Handle Delete functionality
  const handleDelete = (plans: PlanType) => {
    setPlanToDelete(plans?.[0]?.plan); // Set the plan to be deleted
    setIsDeleteModalVisible(true); // Open the modal for delete confirmation
  };

  // Confirm deletion API call
  const confirmDelete = () => {
    if (plans?.[0]?.id) {
      dispatch(
        deletePlan(plans?.[0]?.id, (response: any) => {
          if (response.status === 200 || response.status === 204) {
            fetchOffers(planMerchantId);
            navigate("/admin/merchant/details", { state: { tab: "5" } });
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
    <>
      {!plans?.[0]?.id && (
        <div className="text-end mb-2">
          <Button
            className="btn-primary"
            onClick={() =>
              navigate("/admin/merchant/add-offer", {
                state: { merchantData: merchantData?.merchant },
              })
            }
          >
            Add Offer
          </Button>
        </div>
      )}
      <Form
        layout="vertical"
        className="form-wrapper"
        initialValues={{
          pageTitle: plans?.[0]?.pageTitle || "",
          everyTimeDeposit: plans?.[0]?.everyTimeDeposit || "",
          everyDepositEarn: plans?.[0]?.everyDepositEarn || "",
          offerEarning: plans?.[0]?.offerEarning || "",
          category: plans?.[0]?.category || "",
          groupBy: plans?.[0]?.groupBy || "",
          thumbNail: plans?.[0]?.thumbNailImage || "",
          promoPicture: plans?.[0]?.promoPicture || "",
          demoVideo: plans?.[0]?.demoVideo || "",
        }}
      >
        {/* Offer Name, Cashback, Category in One Row */}
        <>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spin />
            </div>
          ) : plans?.[0]?.id ? (
            <>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                <div>
                  <p>
                    <strong>Offer Name:</strong>{" "}
                    {plans?.[0]?.pageTitle || "N/A"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Percentage:</strong>{" "}
                    {plans?.[0]?.offerEarning
                      ? `${plans?.[0]?.offerEarning}%`
                      : "N/A"}
                  </p>
                </div>
                {/* <div>
                  <p>
                    <strong>Category:</strong>{" "}
                    {capitalizeFirstLetter(plans?.[0]?.category || "N/A")}
                  </p>
                </div> */}
              </div>

              {/* Promo Picture, Thumbnail, Demo Video in One Row */}
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
                {/* Promo Picture */}
                <div className="flex flex-col items-start gap-3 p-4 box-shadow shadow-md rounded-lg">
                  <h4 className="font-bold text-lg">Promo Picture:</h4>
                  <div className="w-full h-full">
                    <img
                      src={plans?.[0]?.promoPicture || userLogo}
                      alt="Promo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Preview Image */}
                <div className="flex flex-col items-start gap-3 p-4 box-shadow shadow-md rounded-lg">
                  <p className="font-bold text-lg">Preview Image:</p>
                  <div className="w-full h-full">
                    <img
                      src={plans?.[0]?.thumbNailImage || userLogo}
                      alt="Thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Demo Video */}
                {plans?.[0]?.demoVideo && (
                  <div className="flex flex-col items-start gap-3 p-4 box-shadow shadow-md rounded-lg">
                    <p className="font-bold text-lg">Demo Video:</p>
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <ReactPlayer
                        url={plans?.[0]?.demoVideo}
                        playing
                        controls
                        width="100%"
                        height="100%"
                        className="rounded-lg object-cover"
                        onError={(e) => console.error("Video Error:", e)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Edit and Delete Icons */}
              <div className="flex justify-end space-x-4">
                <div className="flex my-3 items-center gap-4 iconssizefix">
                  <EditOutlined onClick={() => handleEdit(plan)} />
                  <DeleteOutlined onClick={() => handleDelete(plan)} />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                No Offer Available
              </h2>
            </div>
          )}
        </>
      </Form>

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
            <strong>{plans?.[0]?.pageTitle || "this plan"}</strong>?
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

