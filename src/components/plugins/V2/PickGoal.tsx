import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkuser, getPackageByMerchant, updateUserOffer } from '../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import radar from "../../../assets/img/radar.png"
import luggageIcon from "../../../assets/img/luggage.png"
import CustomGoal from './CustomGoal';
import { getCategoryIcon } from '../../../icons/categoryIcons';
import { storePack } from '../../../store/Auth/payment';

const PickGoal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { isLoading } = useSelector((state: any) => state.General);
  useEffect(() => {
    dispatch(
      checkuser((res: any) => {
        ""
      })
    );
  }, []);

  // const merchantPlan = JSON.parse(localStorage.getItem("merchantPlan"));
  // localStorage.setItem("merchantId", merchantPlan?.merchant?.id)
  const userId = Number(localStorage.getItem("u_id"));

  const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);
  // const user = useSelector((state: any) => state?.Auth);
  const merchantId = useSelector((state: any) => state?.Merchant?.merchantPlan?.merchant?.id);
  // const userId = useSelector((state: any) => state?.Auth?.user?.data?.id);
  // const storedPack = useSelector((state: any) => state?.Payment?.payData?.pack);




  const [selectedGoal, setSelectedGoal] = useState({});
  const [packages, setPackages] = useState<any>([]);
  const [pack, setPack] = useState<any>(null);
  const [isCustomGoal, setIsCustomGoal] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const fetchPackage = async () => {
    setLoading(true); // Start loading
    dispatch(
      getPackageByMerchant({ userId, merchantId }, (response: any) => {
        if (response.status === 200 || response?.status === 201) {
          setPackages(response?.data);
        } else {
          console.error("Failed to fetch plans:", response);
        }
        setLoading(false); // Stop loading after API call completes
      })
    );
  };

  useEffect(() => {
    fetchPackage();
    // setPack(storedPack ?? null)
    // console.log(packages?.customGoal.length, "length")
  }, []);

  // Function to handle goal selection
  const handleGoalSelection = (goalItem: any) => {
    // console.log("goalitem-----", goalItem)
    setSelectedGoal(goalItem?.title);
    setPack(goalItem); // Set the entire selected package
    setIsCustomGoal(false); // Ensure custom goal is not selected
  };

  // Function to handle custom goal selection
  const handleCustomGoalSelection = () => {
    setSelectedGoal("Custom Goal");
    setPack({ title: "Custom Goal", totalAmount: "Custom", offerPercentage: pack?.recurr }); // Set custom goal details
    setIsCustomGoal(true); // Mark as custom goal
  };

  // Function to handle continue button click
  const handleContinue = () => {
    console.log("pack-----", pack)

    console.log("lengths ::::::::::::", isCustomGoal, packages);

    // Case 1: If custom goal is selected but no custom goal exists, go to the custom goal setup page
    if (
      isCustomGoal &&
      (!packages?.customGoal || packages.customGoal.length === 0)
    ) {
      console.log("Navigating to Custom Goal Setup Page");
      // navigate("#custom-goal", { state: { merchantPlan, selectedGoal, pack } });
      navigate("#custom-goal");
      return; // Ensure no further execution
    }

    // Case 2: If a custom goal exists, store data and navigate to step two
    if (packages?.customGoal?.length > 0) {
      console.log("Adding Custom Goal and navigating to Step Two");
      dispatch(storePack(pack))
      // localStorage.setItem("snbla_g_data", JSON.stringify(pack));
      navigate("#step-two", { state: { merchantPlan, selectedGoal, pack } });
      return;
    }

    // Case 3: If merchant goal exists, store data and navigate to step two
    if (packages?.merchantGoal?.length > 0) {
      console.log("Merchant goal exists, navigating to Step Two");
      dispatch(storePack(pack))
      // localStorage.setItem("snbla_g_data", JSON.stringify(pack));
      navigate("#step-two", { state: { merchantPlan, selectedGoal, pack } });
      return;
    }
  };



  return (
    <div className="plugin-body">
      <div className="step_div">
        <p className="step">Step 1 of 3</p>
        <h4>Pick a goal to start saving</h4>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin tip="Updating Password..." />
          </div>
        ) : (
          <div className="goalcard-main">
            <p className="text-withsmall">
              Choose an {merchantPlan?.merchant?.businessName} offer to start
              saving for today!
              <br />
              <span>You can change your goal anytime</span>
            </p>
            {/* render both custom and merchant goal from saved */}
            {(packages?.merchantGoal?.length > 0 && packages?.customGoal?.length) > 0 ? // Show packages when available
              <>
                {packages?.merchantGoal?.map((packItem: any, index: number) => (
                  <>
                    <label
                      key={index}
                      className={`goal-card ${pack?.title === packItem?.title ? "active" : ""
                        }`}
                      onClick={() => handleGoalSelection(packItem)}
                    >
                      <div className="goal-icon">
                        {getCategoryIcon(packItem?.iconKey) || (
                          <img
                            src={packItem?.icon || luggageIcon}
                            alt="Icon"
                            width={24}
                            height={24}
                          />
                        )}
                      </div>
                      <div className="goal-info">
                        <div className="goal-text">
                          <h3>
                            {packItem?.totalAmount} SAR
                            <span className="goal-badge">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M13.334 4.33854H11.8807C11.954 4.13187 12.0007 3.90521 12.0007 3.67187C12.0007 2.56521 11.1073 1.67188 10.0007 1.67188C9.30065 1.67188 8.69398 2.03187 8.33398 2.57187L8.00065 3.01854L7.66732 2.56521C7.30732 2.03187 6.70065 1.67188 6.00065 1.67188C4.89398 1.67188 4.00065 2.56521 4.00065 3.67187C4.00065 3.90521 4.04732 4.13187 4.12065 4.33854H2.66732C1.92732 4.33854 1.34065 4.93187 1.34065 5.67187L1.33398 13.0052C1.33398 13.7452 1.92732 14.3385 2.66732 14.3385H13.334C14.074 14.3385 14.6673 13.7452 14.6673 13.0052V5.67187C14.6673 4.93187 14.074 4.33854 13.334 4.33854ZM10.0007 3.00521C10.3673 3.00521 10.6673 3.30521 10.6673 3.67187C10.6673 4.03854 10.3673 4.33854 10.0007 4.33854C9.63398 4.33854 9.33398 4.03854 9.33398 3.67187C9.33398 3.30521 9.63398 3.00521 10.0007 3.00521ZM6.00065 3.00521C6.36732 3.00521 6.66732 3.30521 6.66732 3.67187C6.66732 4.03854 6.36732 4.33854 6.00065 4.33854C5.63398 4.33854 5.33398 4.03854 5.33398 3.67187C5.33398 3.30521 5.63398 3.00521 6.00065 3.00521ZM13.334 13.0052H2.66732V11.6719H13.334V13.0052ZM13.334 9.67187H2.66732V5.67187H6.05398L4.66732 7.55854L5.74732 8.33854L8.00065 5.27187L10.254 8.33854L11.334 7.55854L9.94732 5.67187H13.334V9.67187Z"
                                  fill="#059669"
                                />
                              </svg>
                              +{packItem?.offerPercentage}%
                            </span>
                          </h3>
                          <p>{packItem?.title}</p>
                        </div>
                      </div>
                      <div className="input-radio">
                        <input
                          type="radio"
                          name="goal"
                          checked={selectedGoal === packItem?.title}
                          readOnly
                        />
                      </div>
                    </label>
                  </>
                ))}
                <>
                  {packages?.customGoal?.map((packItem: any, index: number) => <label
                    className={`goal-card ${pack?.title === "Custom Goal" ? "active" : ""
                      }`}
                    onClick={() => handleGoalSelection(packItem)}
                    key={index}
                  >
                    <div className="goal-icon">
                      {getCategoryIcon(packItem?.iconKey) || (
                        <img
                          src={packItem?.icon || luggageIcon}
                          alt="Icon"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                    <div className="goal-info">
                      <div className="goal-text">
                        <h3>
                          Custom Goal
                          <span className="goal-badge">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M13.334 4.33854H11.8807C11.954 4.13187 12.0007 3.90521 12.0007 3.67187C12.0007 2.56521 11.1073 1.67188 10.0007 1.67188C9.30065 1.67188 8.69398 2.03187 8.33398 2.57187L8.00065 3.01854L7.66732 2.56521C7.30732 2.03187 6.70065 1.67188 6.00065 1.67188C4.89398 1.67188 4.00065 2.56521 4.00065 3.67187C4.00065 3.90521 4.04732 4.13187 4.12065 4.33854H2.66732C1.92732 4.33854 1.34065 4.93187 1.34065 5.67187L1.33398 13.0052C1.33398 13.7452 1.92732 14.3385 2.66732 14.3385H13.334C14.074 14.3385 14.6673 13.7452 14.6673 13.0052V5.67187C14.6673 4.93187 14.074 4.33854 13.334 4.33854ZM10.0007 3.00521C10.3673 3.00521 10.6673 3.30521 10.6673 3.67187C10.6673 4.03854 10.3673 4.33854 10.0007 4.33854C9.63398 4.33854 9.33398 4.03854 9.33398 3.67187C9.33398 3.30521 9.63398 3.00521 10.0007 3.00521ZM6.00065 3.00521C6.36732 3.00521 6.66732 3.30521 6.66732 3.67187C6.66732 4.03854 6.36732 4.33854 6.00065 4.33854C5.63398 4.33854 5.33398 4.03854 5.33398 3.67187C5.33398 3.30521 5.63398 3.00521 6.00065 3.00521ZM13.334 13.0052H2.66732V11.6719H13.334V13.0052ZM13.334 9.67187H2.66732V5.67187H6.05398L4.66732 7.55854L5.74732 8.33854L8.00065 5.27187L10.254 8.33854L11.334 7.55854L9.94732 5.67187H13.334V9.67187Z"
                                fill="#059669"
                              />
                            </svg>
                            +{packItem?.offerPercentage}%
                          </span>
                        </h3>
                        <p>{packItem?.title}</p>
                      </div>
                    </div>
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="goal"
                        checked={selectedGoal === packItem?.title}
                        readOnly
                      />
                    </div>
                  </label>
                  )}
                </>
              </>
              :
              ""}

            {/* render customgoal button and merchant goal list */}
            {(packages?.merchantGoal?.length > 0 && packages?.customGoal?.length) === 0 ? // Show packages when available
              <>
                {packages?.merchantGoal?.map((packItem: any, index: number) => (
                  <>
                    <label
                      key={index}
                      className={`goal-card ${pack?.title === packItem?.title ? "active" : ""
                        }`}
                      onClick={() => handleGoalSelection(packItem)}
                    >
                      <div className="goal-icon">
                        <img
                          src={packItem?.icon || luggageIcon}
                          alt="Icon"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="goal-info">
                        <div className="goal-text">
                          <h3>
                            {packItem?.totalAmount} SAR
                            <span className="goal-badge">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M13.334 4.33854H11.8807C11.954 4.13187 12.0007 3.90521 12.0007 3.67187C12.0007 2.56521 11.1073 1.67188 10.0007 1.67188C9.30065 1.67188 8.69398 2.03187 8.33398 2.57187L8.00065 3.01854L7.66732 2.56521C7.30732 2.03187 6.70065 1.67188 6.00065 1.67188C4.89398 1.67188 4.00065 2.56521 4.00065 3.67187C4.00065 3.90521 4.04732 4.13187 4.12065 4.33854H2.66732C1.92732 4.33854 1.34065 4.93187 1.34065 5.67187L1.33398 13.0052C1.33398 13.7452 1.92732 14.3385 2.66732 14.3385H13.334C14.074 14.3385 14.6673 13.7452 14.6673 13.0052V5.67187C14.6673 4.93187 14.074 4.33854 13.334 4.33854ZM10.0007 3.00521C10.3673 3.00521 10.6673 3.30521 10.6673 3.67187C10.6673 4.03854 10.3673 4.33854 10.0007 4.33854C9.63398 4.33854 9.33398 4.03854 9.33398 3.67187C9.33398 3.30521 9.63398 3.00521 10.0007 3.00521ZM6.00065 3.00521C6.36732 3.00521 6.66732 3.30521 6.66732 3.67187C6.66732 4.03854 6.36732 4.33854 6.00065 4.33854C5.63398 4.33854 5.33398 4.03854 5.33398 3.67187C5.33398 3.30521 5.63398 3.00521 6.00065 3.00521ZM13.334 13.0052H2.66732V11.6719H13.334V13.0052ZM13.334 9.67187H2.66732V5.67187H6.05398L4.66732 7.55854L5.74732 8.33854L8.00065 5.27187L10.254 8.33854L11.334 7.55854L9.94732 5.67187H13.334V9.67187Z"
                                  fill="#059669"
                                />
                              </svg>
                              +{packItem?.offerPercentage}%
                            </span>
                          </h3>
                          <p>{packItem?.title}</p>
                        </div>
                      </div>
                      <div className="input-radio">
                        <input
                          type="radio"
                          name="goal"
                          checked={selectedGoal === packItem?.title}
                          readOnly
                        />
                      </div>
                    </label>

                  </>
                ))}
                <label
                  className={`goal-card ${pack?.title === "Custom Goal" ? "active" : ""
                    }`}
                  onClick={handleCustomGoalSelection}
                >
                  <div className="goal-icon">
                    <img src={radar} alt="Icon" width={24} height={24} />
                  </div>
                  <div className="goal-info">
                    <div className="goal-text">
                      <h3>
                        Custom Goal
                        <span className="goal-badge">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.334 4.33854H11.8807C11.954 4.13187 12.0007 3.90521 12.0007 3.67187C12.0007 2.56521 11.1073 1.67188 10.0007 1.67188C9.30065 1.67188 8.69398 2.03187 8.33398 2.57187L8.00065 3.01854L7.66732 2.56521C7.30732 2.03187 6.70065 1.67188 6.00065 1.67188C4.89398 1.67188 4.00065 2.56521 4.00065 3.67187C4.00065 3.90521 4.04732 4.13187 4.12065 4.33854H2.66732C1.92732 4.33854 1.34065 4.93187 1.34065 5.67187L1.33398 13.0052C1.33398 13.7452 1.92732 14.3385 2.66732 14.3385H13.334C14.074 14.3385 14.6673 13.7452 14.6673 13.0052V5.67187C14.6673 4.93187 14.074 4.33854 13.334 4.33854ZM10.0007 3.00521C10.3673 3.00521 10.6673 3.30521 10.6673 3.67187C10.6673 4.03854 10.3673 4.33854 10.0007 4.33854C9.63398 4.33854 9.33398 4.03854 9.33398 3.67187C9.33398 3.30521 9.63398 3.00521 10.0007 3.00521ZM6.00065 3.00521C6.36732 3.00521 6.66732 3.30521 6.66732 3.67187C6.66732 4.03854 6.36732 4.33854 6.00065 4.33854C5.63398 4.33854 5.33398 4.03854 5.33398 3.67187C5.33398 3.30521 5.63398 3.00521 6.00065 3.00521ZM13.334 13.0052H2.66732V11.6719H13.334V13.0052ZM13.334 9.67187H2.66732V5.67187H6.05398L4.66732 7.55854L5.74732 8.33854L8.00065 5.27187L10.254 8.33854L11.334 7.55854L9.94732 5.67187H13.334V9.67187Z"
                              fill="#059669"
                            />
                          </svg>
                          up to {0}%
                        </span>
                      </h3>
                      <p>Save for personalized goal</p>
                    </div>
                  </div>
                  <div className="input-radio">
                    <input type="radio" name="goal" checked={isCustomGoal} readOnly />
                  </div>
                </label>
              </>
              : ""}
            <div>
              {/* Only custom goal in case all empty */}
              {(packages?.merchantGoal?.length === 0 && packages?.customGoal?.length) ? (
                <label
                  className={`goal-card ${pack?.title === "Custom Goal" ? "active" : ""
                    }`}
                  onClick={handleCustomGoalSelection}
                >
                  <div className="goal-icon">
                    <img src={radar} alt="Icon" width={24} height={24} />
                  </div>
                  <div className="goal-info">
                    <div className="goal-text">
                      <h3>
                        Custom Goal
                        <span className="goal-badge">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.334 4.33854H11.8807C11.954 4.13187 12.0007 3.90521 12.0007 3.67187C12.0007 2.56521 11.1073 1.67188 10.0007 1.67188C9.30065 1.67188 8.69398 2.03187 8.33398 2.57187L8.00065 3.01854L7.66732 2.56521C7.30732 2.03187 6.70065 1.67188 6.00065 1.67188C4.89398 1.67188 4.00065 2.56521 4.00065 3.67187C4.00065 3.90521 4.04732 4.13187 4.12065 4.33854H2.66732C1.92732 4.33854 1.34065 4.93187 1.34065 5.67187L1.33398 13.0052C1.33398 13.7452 1.92732 14.3385 2.66732 14.3385H13.334C14.074 14.3385 14.6673 13.7452 14.6673 13.0052V5.67187C14.6673 4.93187 14.074 4.33854 13.334 4.33854ZM10.0007 3.00521C10.3673 3.00521 10.6673 3.30521 10.6673 3.67187C10.6673 4.03854 10.3673 4.33854 10.0007 4.33854C9.63398 4.33854 9.33398 4.03854 9.33398 3.67187C9.33398 3.30521 9.63398 3.00521 10.0007 3.00521ZM6.00065 3.00521C6.36732 3.00521 6.66732 3.30521 6.66732 3.67187C6.66732 4.03854 6.36732 4.33854 6.00065 4.33854C5.63398 4.33854 5.33398 4.03854 5.33398 3.67187C5.33398 3.30521 5.63398 3.00521 6.00065 3.00521ZM13.334 13.0052H2.66732V11.6719H13.334V13.0052ZM13.334 9.67187H2.66732V5.67187H6.05398L4.66732 7.55854L5.74732 8.33854L8.00065 5.27187L10.254 8.33854L11.334 7.55854L9.94732 5.67187H13.334V9.67187Z"
                              fill="#059669"
                            />
                          </svg>
                          up to {0}%
                        </span>
                      </h3>
                      <p>Save for personalized goal</p>
                    </div>
                  </div>
                  <div className="input-radio">
                    <input type="radio" name="goal" checked={isCustomGoal} readOnly />
                  </div>
                </label>
              ) : ""}

            </div>

            <Button onClick={handleContinue} className="submitbtn">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickGoal;