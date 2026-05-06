import React, { useEffect, useState } from "react";
import userLogo from "../../images/user/userProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantByUserId, updateMerchantDetails } from "../../actions/admin";
import { message, Spin, Upload } from "antd";
import businessLogo from "../../assets/img/business.png";
import { UploadOutlined } from "@ant-design/icons";
import { formatGulfNumber } from "../../utils/constants";

const RenderPersonalDetails = ({ merchantData }: any) => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const { isLoading } = useSelector((state: any) => state.General);
   const [imageFile, setImageFile] = useState<File | null>(null);


  const merchantCreateData = useSelector(
    (state: any) => state?.Merchant?.createMerchantData
  );

  // MERCHANT LISTING API
  const fetchUsersList = (roleId: number) => {
    setLoading(true);

    // Define the data (without roleId) that will be passed to the API
    const data = {
      userId: localStorage.getItem("merchantUserId"),
    };

    // Directly call the API and handle response using .then and .catch
    dispatch(getMerchantByUserId({ roleId, ...data }))
      .then((response: any) => {
        if (response.status === 200) {
          // Set the users with the fetched data
          // setUsers(response?.data);
          setUsers(response?.data?.length > 0 ? response.data[0] : null);
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
    fetchUsersList(2);
  }, []);
  
  const documentTypeMap: { [key: string]: string } = {
    crCertificate: "crCertificate",
    bankCertificate: "bankCertificate",
    vatCertificate: "vatCertificate",
    delegationLetter: "delegationLetter",
  };

  const handleFileUpload = (file: File, documentKey: string) => {
    const merchantId = localStorage.getItem("merchantUserId") || "";
    if (!merchantId) {
      message.error("Merchant ID not found!");
      return false;
    }

    const formData = new FormData();
    formData.append("merchantId", merchantId);

    // Ensure correct mapping of document type
    const formField = documentTypeMap[documentKey];
    if (!formField) {
      message.error("Invalid document type.");
      return false;
    }

    formData.append(formField, file);

    dispatch(
      updateMerchantDetails(formData, merchantId, (response: any) => {
        if (response.status === 200 || response.status === 201) {
          // message.success(`${documentKey} uploaded successfully!`);
          fetchUsersList(2); // Refresh merchant data
        } else {
          message.error(`Failed to upload ${documentKey}.`);
        }
      })
    );

    return false; // Prevent default upload behavior
  };




  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Spin />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Business Details Section */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Business Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="business_logo_details">
              <img
                src={
                  merchantCreateData?.brandLogo ||
                  users?.merchant?.brandLogo ||
                  businessLogo
                }
                alt="Business Logo"
                className="business_logo_admin"
              />
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">
                  Business Name:
                </span>{" "}
                {merchantCreateData?.businessName ||
                  users?.merchant?.businessName ||
                  "N/A"}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">
                  Business Email:
                </span>{" "}
                {merchantCreateData?.email || users?.email ? (
                  <a
                    href={`mailto:${merchantCreateData?.email || users?.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {merchantCreateData?.email || users?.email}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">
                  Business Website:
                </span>{" "}
                {merchantCreateData?.website || users?.merchant?.website ? (
                  <a
                    href={
                      merchantCreateData?.website || users?.merchant?.website
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {merchantCreateData?.website || users?.merchant?.website}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">
                  Business Address:
                </span>{" "}
                {merchantCreateData?.businessAddress ||
                  users?.merchant?.businessAddress ||
                  "N/A"}
              </p>
            </div>
          </div>
          {/* Contact Details Section */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Contact Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">First Name:</span>{" "}
                {merchantCreateData?.firstName || users?.firstName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Last Name:</span>{" "}
                {merchantCreateData?.lastName || users?.lastName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {merchantCreateData?.email || users?.firstName || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Phone Number:</span>{" "}
                {merchantCreateData?.mobileNumber || users?.mobileNumber ? (
                  <a
                    href={`tel:+${
                      merchantCreateData?.mobileNumber || users?.mobileNumber
                    }`}
                    className="text-blue-500 hover:underline"
                  >
                    {formatGulfNumber(
                      merchantCreateData?.mobileNumber || users?.mobileNumber
                    )}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Industry:</span>{" "}
                {merchantCreateData?.category ||
                  users?.merchant?.category ||
                  "N/A"}
              </p>
            </div>
          </div>

          {/* KYB and Documents Sections in a Row */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            KYB Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">
                Commercial Registration Number:
              </span>{" "}
              {merchantCreateData?.commercialRegistrationNumber ||
                users?.merchant?.commercialRegistrationNumber ||
                "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">IBAN Number:</span>{" "}
              {merchantCreateData?.ibanNumber ||
                users?.merchant?.ibanNumber ||
                "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Unified Number:</span>{" "}
              {merchantCreateData?.unifiedNumber ||
                users?.merchant?.unifiedNumber ||
                "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">VAT Number:</span>{" "}
              {merchantCreateData?.vatNumber ||
                users?.merchant?.vatNumber ||
                "N/A"}
            </p>
          </div>

          {/* <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className="text-gray-700">
              <span className="font-medium">CR Certificate:</span>{" "}
              {merchantCreateData?.crCertificate ||
              users?.merchant?.crCertificate ? (
                <a
                  href={
                    merchantCreateData?.crCertificate ||
                    users?.merchant?.crCertificate
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View CR Certificate
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Bank Certificate:</span>{" "}
              {merchantCreateData?.bankCertificate ||
              users?.merchant?.bankCertificate ? (
                <a
                  href={
                    merchantCreateData?.bankCertificate ||
                    users?.merchant?.bankCertificate
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Bank Certificate
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">VAT Certificate:</span>{" "}
              {merchantCreateData?.vatCertificate ||
              users?.merchant?.vatCertificate ? (
                <a
                  href={
                    merchantCreateData?.vatCertificate ||
                    users?.merchant?.vatCertificate
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View VAT Certificate
                </a>
              ) : (
                "N/A"
              )}
            </p>

            <p className="text-gray-700">
              <span className="font-medium">Delegation Letter:</span>{" "}
              {merchantCreateData?.delegationLetter ||
              users?.merchant?.delegationLetter ? (
                <a
                  href={
                    merchantCreateData?.delegationLetter ||
                    users?.merchant?.delegationLetter
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Delegation Letter
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div> */}
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Documents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: "CR Certificate", key: "crCertificate" },
              { label: "Bank Certificate", key: "bankCertificate" },
              { label: "VAT Certificate", key: "vatCertificate" },
              { label: "Delegation Letter", key: "delegationLetter" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center space-x-2">
                <p className="text-gray-700">
                  <span className="font-semibold">{label}:</span>{" "}
                  {merchantCreateData?.[key] || users?.merchant?.[key] ? (
                    <a
                      href={merchantCreateData?.[key] || users?.merchant?.[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View {label}
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
                <Upload
                  beforeUpload={(file) => handleFileUpload(file, key)}
                  showUploadList={false}
                >
                  <button className="bg-blue-500 text-black p-2 rounded-lg">
                    <UploadOutlined /> Upload
                  </button>
                </Upload>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RenderPersonalDetails;
