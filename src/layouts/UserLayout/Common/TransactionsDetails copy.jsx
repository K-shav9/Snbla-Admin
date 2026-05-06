import React from "react";

const TransactionsDetails = () => {
  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Transactions Details
          </h1>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">
                Upcoming
              </h2>
              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="size-10 bg-[#F1F3F7]  flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">
                      Monthly deposit
                      <span className="ml-2 px-2 py-1 text-xs font-medium text-[#A27607] border border-[#FEF08A] bg-[#FEFCE8] rounded">
                        Scheduled
                      </span>
                    </h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#3A424D] text-xs text-medium flex items-center gap-1 bg-[#F1F3F7] border border-[#E9EBF0] rounded px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                        fill="#3A424D"
                      />
                    </svg>
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-black mb-3">
                October 8, 2024
              </h2>

              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-[#F1F3F7] flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.89 11.1C11.11 10.51 10.25 10.14 10.25 9.2C10.25 8.18 11.36 7.81 12.06 7.81C13.37 7.81 13.85 8.8 13.96 9.15L15.54 8.48C15.39 8.03 14.72 6.56 13 6.24V5H11V6.26C8.52 6.82 8.51 9.12 8.51 9.22C8.51 11.49 10.76 12.13 11.86 12.53C13.44 13.09 14.14 13.6 14.14 14.56C14.14 15.69 13.09 16.17 12.16 16.17C10.34 16.17 9.82 14.3 9.76 14.08L8.1 14.75C8.73 16.94 10.38 17.53 11 17.71V19H13V17.76C13.4 17.67 15.9 17.17 15.9 14.54C15.9 13.15 15.29 11.93 12.89 11.1ZM3 21H1V15H7V17H4.52C6.13 19.41 8.88 21 12 21C16.97 21 21 16.97 21 12H23C23 18.08 18.08 23 12 23C8.28 23 4.99 21.15 3 18.33V21ZM1 12C1 5.92 5.92 1 12 1C15.72 1 19.01 2.85 21 5.67V3H23V9H17V7H19.48C17.87 4.59 15.12 3 12 3C7.03 3 3 7.03 3 12H1Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">
                      One-time deposit
                    </h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#047857] text-xs text-medium flex items-center gap-1 bg-[#ECFDF5] rounded px-2 py-1 border border-[#A7F3D0]">
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
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-[#F1F3F7] flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8ZM12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">
                      One-time deposit
                      <span className="ml-2 px-2 py-1 text-xs font-medium text-[#B91C1C] border border-[#FECACA] bg-[#FEF2F2] rounded">
                        Cancelled
                      </span>
                    </h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#3A424D] text-xs text-medium flex items-center gap-1 bg-[#F1F3F7] border border-[#E9EBF0] rounded px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                        fill="#3A424D"
                      />
                    </svg>
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-black mb-3 ">
                October 5, 2024
              </h2>

              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-[#F1F3F7] flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 4C10.58 4 7 7.58 7 12C7 16.42 10.58 20 15 20C19.42 20 23 16.42 23 12C23 7.58 19.42 4 15 4ZM15 18C11.69 18 9 15.31 9 12C9 8.69 11.69 6 15 6C18.31 6 21 8.69 21 12C21 15.31 18.31 18 15 18Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M3 12C3 9.39 4.67 7.17 7 6.35V4.26C3.55 5.15 1 8.27 1 12C1 15.73 3.55 18.85 7 19.74V17.65C4.67 16.83 3 14.61 3 12Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">Round-ups</h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#047857] text-xs text-medium flex items-center gap-1 bg-[#ECFDF5] rounded px-2 py-1 border border-[#A7F3D0]">
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
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-[#F1F3F7] flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 16.5C5.10457 16.5 6 15.6046 6 14.5C6 13.3954 5.10457 12.5 4 12.5C2.89543 12.5 2 13.3954 2 14.5C2 15.6046 2.89543 16.5 4 16.5Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M1.22 18.08C0.48 18.4 0 19.12 0 19.93V21.5H4.5V19.89C4.5 19.06 4.73 18.28 5.13 17.6C4.76 17.54 4.39 17.5 4 17.5C3.01 17.5 2.07 17.71 1.22 18.08Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M20 16.5C21.1046 16.5 22 15.6046 22 14.5C22 13.3954 21.1046 12.5 20 12.5C18.8954 12.5 18 13.3954 18 14.5C18 15.6046 18.8954 16.5 20 16.5Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M22.78 18.08C21.93 17.71 20.99 17.5 20 17.5C19.61 17.5 19.24 17.54 18.87 17.6C19.27 18.28 19.5 19.06 19.5 19.89V21.5H24V19.93C24 19.12 23.52 18.4 22.78 18.08Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M16.24 17.15C15.07 16.63 13.63 16.25 12 16.25C10.37 16.25 8.93 16.64 7.76 17.15C6.68 17.63 6 18.71 6 19.89V21.5H18V19.89C18 18.71 17.32 17.63 16.24 17.15Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5C10.34 9.5 9 10.84 9 12.5Z"
                        fill="#686E7D"
                      />
                      <path
                        d="M2.48 11.36C2.17 10.6 2 9.86 2 9.1C2 6.52 4.02 4.5 6.6 4.5C9.28 4.5 10.42 6.24 12 8.09C13.57 6.26 14.7 4.5 17.4 4.5C19.98 4.5 22 6.52 22 9.1C22 9.86 21.83 10.6 21.52 11.36C22.17 11.67 22.7 12.18 23.05 12.8C23.65 11.6 24 10.38 24 9.1C24 5.4 21.1 2.5 17.4 2.5C15.31 2.5 13.31 3.47 12 5.01C10.69 3.47 8.69 2.5 6.6 2.5C2.9 2.5 0 5.4 0 9.1C0 10.38 0.35 11.6 0.96 12.8C1.31 12.18 1.84 11.67 2.48 11.36Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">Crowdfunds</h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#3A424D] text-xs text-medium flex items-center gap-1 bg-[#F1F3F7] border border-[#E9EBF0] rounded px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                        fill="#3A424D"
                      />
                    </svg>
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>

              <div className="flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3flex sm:items-center justify-between py-4 bg-white border-y border-[#E9EBF0] sm:flex-row flex-col items-start gap-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-[#F1F3F7] flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M7 10.5H4V17.5H7V10.5Z" fill="#686E7D" />
                      <path
                        d="M13.5 10.5H10.5V17.5H13.5V10.5Z"
                        fill="#686E7D"
                      />
                      <path d="M22 19.5H2V22.5H22V19.5Z" fill="#686E7D" />
                      <path d="M20 10.5H17V17.5H20V10.5Z" fill="#686E7D" />
                      <path
                        d="M12 1.5L2 6.5V8.5H22V6.5L12 1.5Z"
                        fill="#686E7D"
                      />
                    </svg>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <h3 className="font-medium text-black ">Withdraw</h3>
                    <p className="text-xs text-[#9FA5B2]">Visa **** 8311</p>
                    <p className="text-xs text-black ">Reward earned!</p>
                  </div>
                </div>
                <div className="sm:text-right text-left flex gap-1 flex-col">
                  <p className="text-lg font-semibold text-black">SAR 125.00</p>
                  <p className="text-xs text-[#9FA5B2]">+ SAR 25.00</p>
                  <p className="text-[#B91C1C] text-xs text-medium flex items-center gap-1 bg-[#FEF2F2] border border-[#FECACA] rounded px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M10 3.25H8.91C8.965 3.095 9 2.925 9 2.75C9 1.92 8.33 1.25 7.5 1.25C6.975 1.25 6.52 1.52 6.25 1.925L6 2.26L5.75 1.92C5.48 1.52 5.025 1.25 4.5 1.25C3.67 1.25 3 1.92 3 2.75C3 2.925 3.035 3.095 3.09 3.25H2C1.445 3.25 1.005 3.695 1.005 4.25L1 9.75C1 10.305 1.445 10.75 2 10.75H10C10.555 10.75 11 10.305 11 9.75V4.25C11 3.695 10.555 3.25 10 3.25ZM7.5 2.25C7.775 2.25 8 2.475 8 2.75C8 3.025 7.775 3.25 7.5 3.25C7.225 3.25 7 3.025 7 2.75C7 2.475 7.225 2.25 7.5 2.25ZM4.5 2.25C4.775 2.25 5 2.475 5 2.75C5 3.025 4.775 3.25 4.5 3.25C4.225 3.25 4 3.025 4 2.75C4 2.475 4.225 2.25 4.5 2.25ZM10 9.75H2V8.75H10V9.75ZM10 7.25H2V4.25H4.54L3.5 5.665L4.31 6.25L6 3.95L7.69 6.25L8.5 5.665L7.46 4.25H10V7.25Z"
                        fill="#B91C1C"
                      />
                    </svg>
                    <span>+SAR 5.00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionsDetails;
