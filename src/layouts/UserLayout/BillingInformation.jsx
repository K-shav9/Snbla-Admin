import React from 'react'
import Button from '../common-components/buttons/Button';
const BillingInformation = () => {
  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Billing Information
          </h1>
        </div>
        <div className="bg-white sm:p-6 p-4 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-black mb-3 flex justify-between items-center">
                Payment Methods
                <Button
                  type="primary"
                  onClick=""
                  className="border border-bordercolor w-[40px] p-0 h-[40px] !hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.8327 10.8332H10.8327V15.8332H9.16602V10.8332H4.16602V9.1665H9.16602V4.1665H10.8327V9.1665H15.8327V10.8332Z"
                      fill="#1F242E"
                    />
                  </svg>
                </Button>
              </h2>
              <div className="py-4 bg-white border-y border-borderlight tab:gap-4 gap-2 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
                <div className="flex flex-col gap-3 tab:p-6 p-3 border border-borderlight rounded-xl ">
                  <h3 className="font-medium text-black tab:text-lg text-base">
                    BSF Mada Card
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded">
                      Primary
                    </span>
                  </h3>
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="40"
                      viewBox="0 0 58 40"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        fill="white"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        stroke="#F1F3F7"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.3379 26.4304H14.8243L12.1894 16.3206C12.0644 15.8556 11.7988 15.4444 11.4082 15.2507C10.4334 14.7637 9.3593 14.3762 8.1875 14.1807V13.7915H13.8478C14.629 13.7915 15.2149 14.3762 15.3125 15.0552L16.6796 22.3477L20.1916 13.7915H23.6076L18.3379 26.4304ZM25.5602 26.4304H22.2419L24.9743 13.7914H28.2927L25.5602 26.4304ZM32.5859 17.2929C32.6836 16.6121 33.2695 16.2229 33.953 16.2229C35.0272 16.1252 36.1972 16.3206 37.1737 16.8059L37.7596 14.0847C36.7831 13.6955 35.709 13.5 34.7342 13.5C31.5135 13.5 29.1699 15.2507 29.1699 17.6804C29.1699 19.5288 30.8299 20.4993 32.0017 21.084C33.2695 21.667 33.7577 22.0563 33.6601 22.6392C33.6601 23.5137 32.6836 23.903 31.7088 23.903C30.537 23.903 29.3652 23.6115 28.2928 23.1245L27.7069 25.8474C28.8787 26.3327 30.1464 26.5281 31.3182 26.5281C34.9295 26.6242 37.1737 24.8752 37.1737 22.25C37.1737 18.9441 32.5859 18.7504 32.5859 17.2929ZM48.7878 26.4304L46.153 13.7914H43.3229C42.737 13.7914 42.1511 14.1807 41.9558 14.7637L37.0767 26.4304H40.4927L41.1746 24.5836H45.3718L45.7624 26.4304H48.7878ZM43.8105 17.1952L44.7852 21.9586H42.0528L43.8105 17.1952Z"
                        fill="#172B85"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold">Visa **** 8311</p>
                      <p className="text-sm text-[#686E7D] ">Reward earned!</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 tab:p-6 p-3 border border-borderlight rounded-xl ">
                  <h3 className="font-medium text-black tab:text-lg text-base">
                    Alahli Card
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-[#F1F3F7] border border-[#E9EBF0] text-[#3A424D] rounded">
                      Primary
                    </span>
                  </h3>
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="40"
                      viewBox="0 0 58 40"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        fill="white"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        stroke="#F1F3F7"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.3042 28.0492C27.2844 29.7125 24.6644 30.7166 21.8014 30.7166C15.4131 30.7166 10.2344 25.7171 10.2344 19.55C10.2344 13.3828 15.4131 8.3833 21.8014 8.3833C24.6644 8.3833 27.2844 9.38741 29.3042 11.0507C31.3241 9.38741 33.9441 8.3833 36.807 8.3833C43.1953 8.3833 48.3741 13.3828 48.3741 19.55C48.3741 25.7171 43.1953 30.7166 36.807 30.7166C33.9441 30.7166 31.3241 29.7125 29.3042 28.0492Z"
                        fill="#ED0006"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.3066 28.0488C31.7935 26.0007 33.3705 22.9531 33.3705 19.55C33.3705 16.1468 31.7935 13.0993 29.3066 11.0511C31.3265 9.38756 33.9467 8.3833 36.8099 8.3833C43.1982 8.3833 48.3769 13.3828 48.3769 19.55C48.3769 25.7171 43.1982 30.7166 36.8099 30.7166C33.9467 30.7166 31.3265 29.7124 29.3066 28.0488Z"
                        fill="#F9A000"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29.3045 28.0492C31.7917 26.0011 33.3688 22.9533 33.3688 19.55C33.3688 16.1467 31.7917 13.099 29.3045 11.0508C26.8173 13.099 25.2402 16.1467 25.2402 19.55C25.2402 22.9533 26.8173 26.0011 29.3045 28.0492Z"
                        fill="#FF5E00"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold">Mastercard *** 7845</p>
                      <p className="text-sm text-[#686E7D] ">Reward earned!</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 tab:p-6 p-3 border border-borderlight rounded-xl ">
                  <h3 className="font-medium text-black tab:text-lg text-base">
                    Emirates ENDB Credit Card
                  </h3>
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="40"
                      viewBox="0 0 58 40"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        fill="white"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="57"
                        height="39"
                        rx="3.5"
                        stroke="#F1F3F7"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.3379 26.4304H14.8243L12.1894 16.3206C12.0644 15.8556 11.7988 15.4444 11.4082 15.2507C10.4334 14.7637 9.3593 14.3762 8.1875 14.1807V13.7915H13.8478C14.629 13.7915 15.2149 14.3762 15.3125 15.0552L16.6796 22.3477L20.1916 13.7915H23.6076L18.3379 26.4304ZM25.5602 26.4304H22.2419L24.9743 13.7914H28.2927L25.5602 26.4304ZM32.5859 17.2929C32.6836 16.6121 33.2695 16.2229 33.953 16.2229C35.0272 16.1252 36.1972 16.3206 37.1737 16.8059L37.7596 14.0847C36.7831 13.6955 35.709 13.5 34.7342 13.5C31.5135 13.5 29.1699 15.2507 29.1699 17.6804C29.1699 19.5288 30.8299 20.4993 32.0017 21.084C33.2695 21.667 33.7577 22.0563 33.6601 22.6392C33.6601 23.5137 32.6836 23.903 31.7088 23.903C30.537 23.903 29.3652 23.6115 28.2928 23.1245L27.7069 25.8474C28.8787 26.3327 30.1464 26.5281 31.3182 26.5281C34.9295 26.6242 37.1737 24.8752 37.1737 22.25C37.1737 18.9441 32.5859 18.7504 32.5859 17.2929ZM48.7878 26.4304L46.153 13.7914H43.3229C42.737 13.7914 42.1511 14.1807 41.9558 14.7637L37.0767 26.4304H40.4927L41.1746 24.5836H45.3718L45.7624 26.4304H48.7878ZM43.8105 17.1952L44.7852 21.9586H42.0528L43.8105 17.1952Z"
                        fill="#172B85"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold">Visa **** 8311</p>
                      <p className="text-sm text-[#686E7D] ">Reward earned!</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Delete
                    </Button>
                    <Button
                      type="primary"
                      onClick=""
                      className="border border-bordercolor h-[40px]"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white sm:p-6 p-4 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-black mb-3 flex justify-between items-center">
                Billing Address
                <Button
                  type="primary"
                  onClick=""
                  className="border border-bordercolor w-[40px] p-0 h-[40px] !hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.8327 10.8332H10.8327V15.8332H9.16602V10.8332H4.16602V9.1665H9.16602V4.1665H10.8327V9.1665H15.8327V10.8332Z"
                      fill="#1F242E"
                    />
                  </svg>
                </Button>
              </h2>
              <div className="py-4 bg-white border-y border-borderlight tab:gap-4 gap-2 grid md:grid-cols-2 grid-cols-1 ">
                <div className="flex flex-col gap-3 tab:p-6 p-3 border border-borderlight rounded-xl ">
                  <h3 className="font-medium text-black tab:text-lg text-base">
                    Home
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] rounded">
                      Primary
                    </span>
                  </h3>
                  <div className="flex gap-3 flex-col">
                    <p className="text-sm text-[#686E7D] ">
                      8079 Anas Ibn Malik Rd, Al Yasmeen, Riyadh 13326, Saudi
                      Arabia
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        onClick=""
                        className="border border-bordercolor h-[40px]"
                      >
                        Delete
                      </Button>
                      <Button
                        type="primary"
                        onClick=""
                        className="border border-bordercolor h-[40px]"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 tab:p-6 p-3 border border-borderlight rounded-xl ">
                  <h3 className="font-medium text-black tab:text-lg text-base">
                    Work
                  </h3>
                  <div className="flex gap-3 flex-col">
                    <p className="text-sm text-[#686E7D] ">
                      Hisham Ibn Abd Al Malek, Al Mursalat,
                      <br /> Riyadh 11636, Saudi Arabia
                    </p>
                    <div className="flex gap-3">
                      <Button
                        type="primary"
                        onClick=""
                        className="border border-bordercolor h-[40px]"
                      >
                        Delete
                      </Button>
                      <Button
                        type="primary"
                        onClick=""
                        className="border border-bordercolor h-[40px]"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillingInformation
