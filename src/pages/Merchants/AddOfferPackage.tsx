import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Select, Tooltip, InputNumber, Switch } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createPlan, getMerchantPlan, updatePlan } from "../../actions/merchant";
import aeroPlane from "../../images/logo/flight_takeoff.png";
import luggage from "../../images/logo/luggage.png";
import radar from "../../images/logo/radar.png";
import hotel from "../../images/logo/Vector.png";
import { ViewOffer } from "./ViewOffer";
import { ViewPackage } from "./ViewPackage";
import { getPackagesByMerchandId } from "../../actions/admin";

const iconOptions = [
    { value: hotel, img: hotel },
    { value: luggage, img: luggage },
    { value: radar, img: radar },
    { value: aeroPlane, img: aeroPlane },
];

interface PackageType {
    id?: number; // Optional during creation
    title?: string;
    totalAmount?: number;
    offerPercentage?: number;
    saveOnEveryDepo?: number;
    recurringOff?: number;
    icon?: string;
    category?: string;
    merchant?: {
        id?: number;
        businessName?: string;
        website?: string | null;
        description?: string;
    };
}
export const AddOfferPackage = ({ merchantPData }: any) => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
     const [plans, setPlans] = useState<any[]>([]);
    const user = useSelector((state: any) => state?.Auth);
    const [form] = Form.useForm();
    const [promoPicture, setPromoPicture] = useState(null);
    const [demoVideo, setDemoVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [isRecurring, setIsRecurring] = useState(false);
    const [showButton, setShowButton] = useState<boolean>(false)
    const [packages, setPackages] = useState<PackageType[]>([]);
    const [wallet, setwallet] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10,
    });

    const location = useLocation();
    const { merchantData, planData } = location.state || {};
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

    const planId = planData?.plan?.id;

    useEffect(() => {
        document.title = planData ? "Edit Offer | Snbla" : "Add Offer | Snbla";

        if (planData?.plan) {
            form.setFieldsValue({
              pageTitle: plans?.[0]?.pageTitle,
              offerEarning: plans?.[0]?.offerEarning,
              offOnRecurring: plans?.[0]?.offOnRecurring,
              category: plans?.[0]?.category,
              groupBy: plans?.[0]?.groupBy,
            });
            // Set the initial file data for the file upload fields
            setPromoPicture(plans?.[0]?.promoPicture || null);
            setThumbnail(plans?.[0]?.thumbNailImage || null);
            setDemoVideo(plans?.[0]?.demoVideo || null);
        } else {
            // If there's no planData, set default values for a new offer
            form.setFieldsValue({
                pageTitle: "",
                offerEarning: "",
                offOnRecurring: "",
                category: "", // Default to "Other"
                groupBy: "", // Default to "Discount"
            });
        }
    }, [planData, form]);

    const handleFileChange = (info, setFile) => {
        if (info.file) {
            setFile(info.file);
        }
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination((prevState) => ({
            ...prevState,
            currentPage: page,
            pageSize: pageSize,
        }));
    };


    useEffect(() => {
        if (merchantData?.merchant?.plan) {
            const { id, ...rest } = merchantData.merchant.plan;

            const isEmpty = Object.values(rest).every(value => value === "" || value === null || value === undefined);

            if (isEmpty) {
                setShowButton(true);
            }
        } else {
            setShowButton(true);
        }
    }, [merchantData]);

    const merchantId = planId ? planData?.id : merchantData?.id;
    const merchantIdforPackage = merchantData?.merchant?.id
    const packageMerchantId = localStorage.getItem("merchantId")


    const handleSubmit = (values: any) => {
        const formData = new FormData();
        formData.append("pageTitle", values.pageTitle);
        formData.append("offerEarning", values.offerEarning);
        formData.append("promoPicture", promoPicture);
        formData.append("thumbNail", thumbnail);
        formData.append("demoVideo", demoVideo);
        formData.append("category", values.category || "");
        formData.append("groupBy", values.groupBy || "");

        if (merchantId) {
            formData.append("merchantId", merchantId);
        } else {
            message.error("Merchant ID is missing");
            return;
        }

        setIsSubmitting(true);

        if (planId) {
            // If it's an edit, update the plan
            dispatch(
                updatePlan(formData, planId, (response: any) => {
                    setIsSubmitting(false);
                    if (response.status === 200 || response.status === 201) {
                        navigate("/admin/merchants");
                    } else {
                        message.error("Failed to update plan.");
                    }
                })
            );
        } else {
            // If it's a new offer, create the plan
            dispatch(
                createPlan(formData, (response: any) => {
                    setIsSubmitting(false);
                    if (response.status === 200 || response.status === 201) {
                        navigate("/admin/merchants");
                    } else {
                        message.error("Failed to create plan.");
                    }
                })
            );
        }
    };


    const fetchPackages = (
        merchantId: string,
        page: number = pagination.currentPage,
        pageSize: number = pagination.pageSize,
    ) => {
        dispatch(
            getPackagesByMerchandId(
                { page, pageSize, merchantId: packageMerchantId },
                (response: any) => {
                    if (response.status === 200 || response.status === 201) {
                        setPackages(response?.data);

                        const paginationData = response.pagination || {};
                        setPagination({
                            totalItems: paginationData.totalItems || 0,
                            currentPage: paginationData.currentPage || 1,
                            totalPages: paginationData.totalPages || 1,
                            pageSize: paginationData.pageSize || 10,
                        });
                    } else {
                        console.error("Failed to fetch packages:", response);
                    }
                }
            )
        );
    };

    useEffect(() => {
        fetchPackages(merchantIdforPackage, pagination.currentPage, pagination.pageSize);
    }, [pagination.currentPage]);

    const planMerchantId = Number(localStorage.getItem("merchantId"));
    
      const fetchOffers = async () => {
          dispatch(
            getMerchantPlan({ merchantId: planMerchantId }, (response: any) => {
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
          fetchOffers();
        }, []);
    

    return (
      <div className="container mt-5">
        <ViewOffer
          merchantData={merchantData}
          plans={plans}
          loading={loading}
          fetchOffers={fetchOffers}
          showButton={showButton}
        />
        <ViewPackage
          merchantData={merchantData}
          packages={packages}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          fetchPackages={fetchPackages}
        />
      </div>
    );
};

export default AddOfferPackage;
