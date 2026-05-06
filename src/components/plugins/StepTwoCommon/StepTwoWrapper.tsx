import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Switch, Button, Form, InputNumber, message } from 'antd';
import StepTwoSchedule from './StepTwoSchedule';
import StepTwoRecurring from './StepTwoRecurring';
import { nextDepositDate } from '../../../utils/constants';
import { updateUserOffer } from '../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { storeAmount, storeScheduleValues } from '../../../store/Auth/payment';

const StepTwo = () => {
  const [form] = Form.useForm(); // Form instance for validation
  const [amount, setAmount] = useState(100); // Default amount
  const [isRecurring, setIsRecurring] = useState(false);
  const [schedule, setSchedule] = useState(false); // Initially, schedule is not saved
  const [edit, setEdit] = useState(false); // Initially, not in edit mode
  const [scheduleValues, setScheduleValues] = useState(null); // Store schedule values

  const [isAmountValid, setIsAmountValid] = useState(true);
  const dispatch: any = useDispatch();
  // Handler to update validation status
  const handleAmountChange = (value: any) => {
    console.log("value", value)
    setAmount(value);

    if (value > MIN_AMOUNT) {
      setIsAmountValid(true);
    } else {
      setIsAmountValid(false);
    }
  };

  // const merchantId = Number(localStorage.getItem("merchantId")); // Convert to number
  // const userId = Number(localStorage.getItem("userId")); // Convert to number

  const merchantPlan = useSelector((state: any) => state?.Merchant?.merchantPlan);
  // const user = useSelector((state: any) => state?.Auth);
  const merchantId = useSelector((state: any) => state?.Merchant?.merchantPlan?.merchant?.id);
  const userId = useSelector((state: any) => state?.Auth?.user?.data?.id);
  const pack = useSelector((state: any) => state?.Payment?.payData?.pack);



  const location = useLocation();
  // const { merchantPlan, pack, selectedGoal } = location?.state || {};
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to manage loading button

  // Minimum amount allowed
  const MIN_AMOUNT = 0;
  // console.log("pack ::::::::", isRecurring, pack)
  const earning = Number(pack?.offerPercentage ?? 0) + (isRecurring ? Number(pack?.recurringOff ?? 1) : 0);

  const baseEarnings = (Number(amount) * Number(earning)) / 100;

  // console.log("baseearnings---", baseEarnings)
  // console.log("amount---", amount)

  // Function to handle navigation
  const handleNavigation = () => {
    // Set submitting state to true when API is called
    setIsSubmitting(true);
    let payload: any;
    // if (!isRecurring || (isRecurring && schedule)) {
    if (isRecurring && schedule) {

      const depositDate = nextDepositDate(scheduleValues);

      payload = {
        userId: userId,
        merchantId: merchantId,
        goalId: pack?.id,
        plan: {
          totalAmount: pack?.totalAmount,
          offerPercentage: pack?.offerPercentage,
          isRecurring: isRecurring,
          recurringOff: pack?.saveOnEveryDepo,
          category: pack?.category || pack?.name,
          goalName: pack?.title
        },
        isActive: isRecurring,
        isRecurring: isRecurring,
        isRecurringStatus: isRecurring,
        paymentStartDate: scheduleValues?.date,
        nextPaymentOnDate: depositDate,
        frequency: scheduleValues?.frequency,
      };

    }
    else {
      payload = {
        userId: userId,
        merchantId: merchantId,
        goalId: pack?.id,
        plan: {
          totalAmount: pack?.totalAmount,
          offerPercentage: pack?.offerPercentage,
          isRecurring: isRecurring,
          recurringOff: pack?.recurringOff,
          category: pack?.category || pack?.name,
          goalName: pack?.title
        },
        isActive: isRecurring,
        isRecurring: isRecurring,
        isRecurringStatus: isRecurring,
        paymentStartDate: scheduleValues?.date,
        nextPaymentOnDate: "",
        frequency: scheduleValues?.frequency,
      };

    }

    dispatch(
      updateUserOffer(payload, (response: any) => {
        setIsSubmitting(false); // Set submitting state back to false after API response
        console.log("payload--", payload)
        if (response.status === 200 || response.status === 201) {
          // navigate('#step-three', { state: { merchantPlan, pack: payload, selectedGoal, amount, baseEarnings, scheduleValues } });
          navigate('#step-three');
        } else {
          console.error("Failed to update Plan:", response);
        }
      })
    );
  };

  // Function to handle saving the schedule
  const handleSaveSchedule = (values) => {
    setScheduleValues(values); // Save schedule values
    setSchedule(true); // Set schedule to true
    setEdit(false); // Exit edit mode
  };

  // Function to handle editing the schedule
  const handleEdit = () => {
    setEdit(true); // Enter edit mode
    setSchedule(false); // Reset schedule state
  };

  // Calculate earnings
  // const earning = merchantPlan?.offerEarning + (isRecurring && 1);

  // const extraEarnings = isRecurring ? (amount * earning) / 100 : 0;
  // const totalExtraEarnings = baseEarnings ;
  // const finalEarning = totalEarnings + amount;

  // localStorage.setItem("scheduleValues", JSON.stringify(scheduleValues))
  const amounts = {
    amount, baseEarnings
  }
  // localStorage.setItem("baseEarnings", String(baseEarnings));
  // localStorage.setItem("amount", String(amount));
  dispatch(storeScheduleValues(scheduleValues))
  dispatch(storeAmount(amounts))





  return (
    <div className="plugin-body">
      <div className="step_div">
        <p className="step">Step 2 of 3</p>
        <h4>Make a one-time deposit</h4>
      </div>

      {/* Form for amount input */}
      <Form
        form={form}
        initialValues={{ amount }}
        requiredMark={false} // 👈 This will hide the required asterisk (*)
      >
        <div className="anyammount-outer">
          <div className="anyammount">
            <p>Enter any amount</p>
            <div className="ammount">
              SAR
              <Form.Item name="amount" style={{ marginBottom: 0 }}>
                <InputNumber
                  min={0}
                  value={amount}
                  onChange={handleAmountChange}
                  style={{
                    width: "120px",
                    borderColor: isAmountValid ? "#d9d9d9" : "red", // Change border color based on validity
                  }}
                />
              </Form.Item>
            </div>
            {!isAmountValid && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Amount should be greater than {MIN_AMOUNT} SAR.
              </p>
            )}
          </div>
          <div className="anyammount">
            <p>
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
              You earn <span className="goal-badge green">+{earning}%</span>
            </p>
            <div className="ammount green">
              SAR{" "}
              <span>
                {typeof baseEarnings !== "string" ? baseEarnings.toFixed(2) : 0}
              </span>
            </div>
          </div>
        </div>
      </Form>

      {/* Recurring Switch */}
      <div className="switchdiv">
        <div className="anyammount">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_1569_2224)">
                <path
                  d="M7.49423 6.50564C6.50534 6.17786 6.02756 5.97231 6.02756 5.45009C6.02756 4.88342 6.64423 4.67786 7.03312 4.67786C7.76089 4.67786 8.02756 5.22786 8.08867 5.42231L8.96645 5.05009C8.88312 4.80009 8.51089 3.98342 7.55534 3.80564V3.11675H6.44423V3.81675C5.06645 4.12786 5.06089 5.40564 5.06089 5.4612C5.06089 6.72231 6.31089 7.07786 6.922 7.30009C7.79978 7.6112 8.18867 7.89453 8.18867 8.42786C8.18867 9.05564 7.60534 9.32231 7.08867 9.32231C6.07756 9.32231 5.78867 8.28342 5.75534 8.1612L4.83312 8.53342C5.18312 9.75009 6.09978 10.0779 6.44423 10.1779V10.8945H7.55534V10.2056C7.77756 10.1556 9.16645 9.87786 9.16645 8.41675C9.16645 7.64453 8.82756 6.96675 7.49423 6.50564ZM1.99978 12.0056H0.888672V8.67231H4.22201V9.78342H2.84423C3.73867 11.1223 5.26645 12.0056 6.99978 12.0056C9.76089 12.0056 11.9998 9.76675 11.9998 7.00564H13.1109C13.1109 10.3834 10.3776 13.1168 6.99978 13.1168C4.93312 13.1168 3.10534 12.089 1.99978 10.5223V12.0056ZM0.888672 7.00564C0.888672 3.62786 3.62201 0.894531 6.99978 0.894531C9.06645 0.894531 10.8942 1.92231 11.9998 3.48898V2.00564H13.1109V5.33898H9.77756V4.22786H11.1553C10.2609 2.88898 8.73312 2.00564 6.99978 2.00564C4.23867 2.00564 1.99978 4.24453 1.99978 7.00564H0.888672Z"
                  fill="#1F242E"
                />
              </g>
              <defs>
                <clipPath id="clip0_1569_2224">
                  <rect
                    width="13.3333"
                    height="13.3333"
                    fill="white"
                    transform="translate(0.333984 0.338867)"
                  />
                </clipPath>
              </defs>
            </svg>
            Make it recurring
            <span className="goal-badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M10 3.25537H8.91C8.965 3.10037 9 2.93037 9 2.75537C9 1.92537 8.33 1.25537 7.5 1.25537C6.975 1.25537 6.52 1.52537 6.25 1.93037L6 2.26537L5.75 1.92537C5.48 1.52537 5.025 1.25537 4.5 1.25537C3.67 1.25537 3 1.92537 3 2.75537C3 2.93037 3.035 3.10037 3.09 3.25537H2C1.445 3.25537 1.005 3.70037 1.005 4.25537L1 9.75537C1 10.3104 1.445 10.7554 2 10.7554H10C10.555 10.7554 11 10.3104 11 9.75537V4.25537C11 3.70037 10.555 3.25537 10 3.25537ZM7.5 2.25537C7.775 2.25537 8 2.48037 8 2.75537C8 3.03037 7.775 3.25537 7.5 3.25537C7.225 3.25537 7 3.03037 7 2.75537C7 2.48037 7.225 2.25537 7.5 2.25537ZM4.5 2.25537C4.775 2.25537 5 2.48037 5 2.75537C5 3.03037 4.775 3.25537 4.5 3.25537C4.225 3.25537 4 3.03037 4 2.75537C4 2.48037 4.225 2.25537 4.5 2.25537ZM10 9.75537H2V8.75537H10V9.75537ZM10 7.25537H2V4.25537H4.54L3.5 5.67037L4.31 6.25537L6 3.95537L7.69 6.25537L8.5 5.67037L7.46 4.25537H10V7.25537Z"
                  fill="#047857"
                />
              </svg>{" "}
              +{pack?.recurringOff ?? 1}% more
            </span>
          </p>
        </div>
        <div className="switchinput">
          <Switch
            checked={isRecurring}
            onChange={(checked) => setIsRecurring(checked)}
          />
        </div>
      </div>

      {/* Render StepTwoSchedule or StepTwoRecurring based on state */}
      {isRecurring ? (
        edit || !schedule ? (
          <StepTwoSchedule onSave={handleSaveSchedule} />
        ) : (
          <StepTwoRecurring
            onEdit={handleEdit}
            scheduleValues={scheduleValues}
            amount={amount}
            setAmount={setAmount}
            navigate={navigate}
            merchantPlan={merchantPlan}
          />
        )
      ) : null}

      {/* Dynamic Button */}
      {isRecurring ? (
        schedule ? (
          <Button
            type="primary"
            onClick={handleNavigation}
            className="submitbtn"
            disabled={!isAmountValid} // Disable if amount is invalid
            loading={isSubmitting}
          >
            Continue
          </Button>
        ) : null
      ) : (
        <Button
          type="primary"
          onClick={handleNavigation}
          className="submitbtn"
          disabled={!isAmountValid} // Disable if amount is invalid
          loading={isSubmitting}
        >
          Continue
        </Button>
      )}
    </div>
  );
};

export default StepTwo;