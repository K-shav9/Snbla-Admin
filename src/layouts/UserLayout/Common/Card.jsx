import React from 'react'
import { Link } from 'react-router-dom';

// const card = ({ image,logoimage, title, amount, cashback, progress ,button}) => {
//   return (
//     <>
//       <div className="bg-white shadow-md rounded-2xl overflow-hidden">
//         <div className="relative">
//           <img src={image} alt={title} className="w-full h-auto object-cover" />
//           <div className="absolute left-5 bottom-5 p-2 bg-white rounded-lg">
//             <img src={logoimage} alt={title} className="" />
//           </div>
//         </div>
//         <div className="tab:p-5 p-3">
//           <h3 className="font-semibold tab:text-xl text-base text-black tab:mb-4 mb-2 flex justify-between">
//             {title}
//             <span className="ml-auto text-gray font-medium">{amount} SAR</span>
//           </h3>
//           <div className="relative w-full flex gap-2 items-center ">
//             <div className="h-[16px] w-full bg-[#F1F3F7] rounded-[4px] relative">
//               <span
//                 style={{ width: `${progress}%` }}
//                 className="absolute left-0 h-full bg-[#474DF4] rounded-tl-md rounded-bl-md border-r-4 border-[#10B981]"
//               ></span>
//             </div>
//             <p
//               className="ml-auto text-xs
//             "
//             >
//               {progress}%
//             </p>
//           </div>
//           <div className="flex justify-between items-center mt-5 ">
//             <span className="text-[#047857] text-xs text-medium flex items-center gap-1 bg-[#ECFDF5] rounded px-2 py-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="12"
//                 height="12"
//                 viewBox="0 0 12 12"
//                 fill="none"
//               >
//                 <path
//                   d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
//                   fill="#047857"
//                 />
//               </svg>
//               <span>{cashback}% Cashback</span>
//             </span>
//             <button className="text-black text-sm flex gap-1"
//             >
//               View wallet
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//               >
//                 <path
//                   d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
//                   fill="#1F242E"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


const card = ({ image, logoimage, title, amount, cashback, progress, merchant }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
          <div className="absolute left-5 bottom-5 p-2 bg-white rounded-lg">
            <img src={logoimage} alt={title} className="h-[48px]" />
          </div>
        </div>
        <div className="tab:p-5 p-3">
          <h3 className="font-semibold tab:text-xl text-base text-black tab:mb-4 mb-2 flex justify-between">
            {title}
            <span className="ml-auto text-gray font-medium">{amount} SAR</span>
          </h3>
          <div className="relative w-full flex gap-2 items-center ">
            <div className="h-[16px] w-full bg-[#F1F3F7] rounded-[4px] relative">
              <span
                style={{ width: `${progress}%` }}
                className="absolute left-0 h-full bg-[#474DF4] rounded-tl-md rounded-bl-md border-r-4 border-[#10B981]"
              ></span>
            </div>
            <p
              className="ml-auto text-xs
            "
            >
              {progress}%
            </p>
          </div>
          <div className="flex justify-between items-center mt-5 ">
            <span className="text-[#047857] text-xs text-medium flex items-center gap-1 bg-[#ECFDF5] rounded px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                  fill="#047857"
                />
              </svg>
              <span>{cashback}% Cashback</span>
            </span>
            <Link
              to="/dashboard/wallet-details"
              state={{ merchant }}
              className="text-black text-sm flex gap-1 items-center"
            >
              View Wallet
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.0876 5L6.9126 6.175L10.7293 10L6.9126 13.825L8.0876 15L13.0876 10L8.0876 5Z"
                  fill="#1F242E"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default card

