// import React from 'react'
// import { Link } from 'react-router-dom'


// const StepTwoRecurring = () => {
//   return (
//     <div className="plugin-body">
//       <Link to="#step-two-schedule" className="bgwithicon">
//         <p>SAR 250 every month, starts on November 18 2024.</p>
//         <p>
//           <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
//             <path d="M2 11.5065V14.0066H4.5L11.8733 6.63322L9.37333 4.13322L2 11.5065ZM13.8067 4.69988C14.0667 4.43988 14.0667 4.01988 13.8067 3.75988L12.2467 2.19988C11.9867 1.93988 11.5667 1.93988 11.3067 2.19988L10.0867 3.41988L12.5867 5.91988L13.8067 4.69988Z" fill="#4E5663" />
//           </svg>
//         </p>
//       </Link>
//       <div className="iconwithtext">
//         <p>
//           <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
//             <path d="M9.99935 1.67188C5.39935 1.67188 1.66602 5.40521 1.66602 10.0052C1.66602 14.6052 5.39935 18.3385 9.99935 18.3385C14.5993 18.3385 18.3327 14.6052 18.3327 10.0052C18.3327 5.40521 14.5993 1.67188 9.99935 1.67188ZM10.8327 14.1719H9.16602V9.17188H10.8327V14.1719ZM10.8327 7.50521H9.16602V5.83854H10.8327V7.50521Z" fill="#0284C7" />
//           </svg>
//         </p>
//         <p>You can adjust your goal or recurring amount anytime</p>
//       </div>
//       {/* <Link to="#step-three" className="submitbtn">Continue
//       </Link> */}
//       <button  className="submitbtn">
//         Continue
//       </button>
//     </div>

//   )
// }

// export default StepTwoRecurring

import React from 'react';
import { Input, Button } from 'antd';
import { formatDateToMonthDDYYYY } from '../../../utils/constants';

const StepTwoRecurring = ({ onEdit, scheduleValues, amount, setAmount, navigate, merchantPlan }: any) => {
  const earning = Number(merchantPlan?.offerEarning) || 0;
  console.log("scheduleValues :::::::::::", scheduleValues);
  const baseEarnings = (Number(amount) * Number(earning)) / 100;
  const extraEarnings = (Number(amount) * 1) / 100; // +1% for recurring
  const totalEarnings = baseEarnings + extraEarnings;

  // const handleContinue = () => {
  //   navigate('#step-three', { state: { merchantPlan } });
  // };

  // console.log("scheduledValues---", scheduleValues)


  return (
    <>
      <div className="bgwithicon" onClick={onEdit}>
        <p>
          SAR {amount}{" "}
          {scheduleValues?.frequency === "monthly"
            ? "every month"
            : scheduleValues?.frequency === "weekly"
              ? "every week"
              : "daily"}{" "}
          starts on {formatDateToMonthDDYYYY(scheduleValues?.date)}.
        </p>

        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2 11.5065V14.0066H4.5L11.8733 6.63322L9.37333 4.13322L2 11.5065ZM13.8067 4.69988C14.0667 4.43988 14.0667 4.01988 13.8067 3.75988L12.2467 2.19988C11.9867 1.93988 11.5667 1.93988 11.3067 2.19988L10.0867 3.41988L12.5867 5.91988L13.8067 4.69988Z"
              fill="#4E5663"
            />
          </svg>
        </p>
      </div>
      <div className="iconwithtext mb-[-20px]">
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9.99935 1.67188C5.39935 1.67188 1.66602 5.40521 1.66602 10.0052C1.66602 14.6052 5.39935 18.3385 9.99935 18.3385C14.5993 18.3385 18.3327 14.6052 18.3327 10.0052C18.3327 5.40521 14.5993 1.67188 9.99935 1.67188ZM10.8327 14.1719H9.16602V9.17188H10.8327V14.1719ZM10.8327 7.50521H9.16602V5.83854H10.8327V7.50521Z"
              fill="#0284C7"
            />
          </svg>
        </p>
        <p>You can adjust your goal or recurring amount anytime</p>
      </div>
    </>
  );
};

export default StepTwoRecurring;