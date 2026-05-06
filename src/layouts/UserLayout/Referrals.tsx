import React, { useEffect, useState } from 'react'
import Button from '../common-components/buttons/Button';

const Referrals = () => {
  useEffect(() => {
    document.title = "Referrals | Snbla";
  }, []);
    const faqs = [
      {
        question: "How do I qualify for the welcome bonus?",
        answer:
          "You can qualify for the welcome bonus by signing up and completing your profile.",
      },
      {
        question: "How do referral earnings work?",
        answer:
          "Refer friends to the platform. Once they sign up and meet requirements, you earn rewards.",
      },
      {
        question:
          "What is the limit for redeeming bonuses when setting a savings goal?",
        answer:
          "The limit depends on the terms outlined for the specific savings goal.",
      },
      {
        question: "When can I claim my welcome bonus and referral earnings?",
        answer:
          "You can claim them once the qualifying criteria are met, usually within 7 days.",
      },
      {
        question:
          "How long are my welcome bonuses and referral earnings valid?",
        answer:
          "They are valid for 30 days from the date they are credited to your account.",
      },
      {
        question: "Can I transfer or withdraw my bonuses and earnings?",
        answer:
          "Yes, you can transfer or withdraw them after meeting the terms and conditions.",
      },
    ];

  const [openIndex, setOpenIndex] = useState(null);
  const referralLink = "https://app.snbla.com/iavo9YH4KMb";
  const [copied, setCopied] = useState(false);
     const toggleFAQ = (index) => {
       setOpenIndex(openIndex === index ? null : index);
     };
  
   
    const copyToClipboard = () => {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 500); // Hide message after 2 seconds
        })
        .catch((err) => console.error("Failed to copy: ", err));
    };

  return (
    <>
      <div className="flex flex-col tab:gap-8 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="tab:text-[28px] text-xl font-semibold text-black ">
            Referrals Program
          </h1>
        </div>
        <div className="bg-white sm:p-6 p-4 rounded-2xl border border-[#E9EBF0] w-full">
          <div className="flex sm:gap-6 gap-3 items-start sm:flex-row flex-col">
            <div className="bg-[#ECF2FF] rounded-xl size-[64px] min-w-[64px] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M26.667 8.66683H23.7603C23.907 8.2535 24.0003 7.80016 24.0003 7.3335C24.0003 5.12016 22.2137 3.3335 20.0003 3.3335C18.6003 3.3335 17.387 4.0535 16.667 5.1335L16.0003 6.02683L15.3337 5.12016C14.6137 4.0535 13.4003 3.3335 12.0003 3.3335C9.78699 3.3335 8.00033 5.12016 8.00033 7.3335C8.00033 7.80016 8.09366 8.2535 8.24033 8.66683H5.33366C3.85366 8.66683 2.68033 9.8535 2.68033 11.3335L2.66699 26.0002C2.66699 27.4802 3.85366 28.6668 5.33366 28.6668H26.667C28.147 28.6668 29.3337 27.4802 29.3337 26.0002V11.3335C29.3337 9.8535 28.147 8.66683 26.667 8.66683ZM20.0003 6.00016C20.7337 6.00016 21.3337 6.60016 21.3337 7.3335C21.3337 8.06683 20.7337 8.66683 20.0003 8.66683C19.267 8.66683 18.667 8.06683 18.667 7.3335C18.667 6.60016 19.267 6.00016 20.0003 6.00016ZM12.0003 6.00016C12.7337 6.00016 13.3337 6.60016 13.3337 7.3335C13.3337 8.06683 12.7337 8.66683 12.0003 8.66683C11.267 8.66683 10.667 8.06683 10.667 7.3335C10.667 6.60016 11.267 6.00016 12.0003 6.00016ZM26.667 26.0002H5.33366V23.3335H26.667V26.0002ZM26.667 19.3335H5.33366V11.3335H12.107L9.33366 15.1068L11.4937 16.6668L16.0003 10.5335L20.507 16.6668L22.667 15.1068L19.8937 11.3335H26.667V19.3335Z"
                  fill="#474DF4"
                />
              </svg>
            </div>
            <div className="flex flex-col sm:gap-3 gap-2 ">
              <p className="text-black font-semibold text-xl">
                Share the Savings, Earn Together! 💸
              </p>
              <p className="text-black md:text-lg text-base flex items-center gap-1">
                Invite your friends to start their savings journey with Snbla.
                For every friend who makes their first deposit, you&apos;ll get
                25 SAR and they&apos;ll receive 50 SAR as a welcome bonus!
              </p>
              <p className="text-black md:text-lg text-base flex items-center">
                Copy your referral link below and start earning now!
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-center sm:w-[500px] w-full border-dashed border-2 rounded-xl mt-6 border-[#E9EBF0] p-3 mx-auto">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.7497 0.833496H3.74967C2.83301 0.833496 2.08301 1.5835 2.08301 2.50016V14.1668H3.74967V2.50016H13.7497V0.833496ZM16.2497 4.16683H7.08301C6.16634 4.16683 5.41634 4.91683 5.41634 5.8335V17.5002C5.41634 18.4168 6.16634 19.1668 7.08301 19.1668H16.2497C17.1663 19.1668 17.9163 18.4168 17.9163 17.5002V5.8335C17.9163 4.91683 17.1663 4.16683 16.2497 4.16683ZM16.2497 17.5002H7.08301V5.8335H16.2497V17.5002Z"
                fill="#1F242E"
              />
            </svg>

            {/* Referral Link */}
            <p className="sm:text-base text-sm">{referralLink}</p>

            {/* Button with Copied Message */}
            <div className="flex items-center gap-2 relative">
              <Button
                type="secondary"
                onClick={copyToClipboard}
                className="h-[36px] sm:px-3 px-2 flex items-center gap-2"
              >
                {copied ? (
                  "Copied!" // Show "Copied!" when clicked
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M3.25033 10.0002C3.25033 8.57516 4.40866 7.41683 5.83366 7.41683H9.16699V5.8335H5.83366C3.53366 5.8335 1.66699 7.70016 1.66699 10.0002C1.66699 12.3002 3.53366 14.1668 5.83366 14.1668H9.16699V12.5835H5.83366C4.40866 12.5835 3.25033 11.4252 3.25033 10.0002ZM6.66699 10.8335H13.3337V9.16683H6.66699V10.8335ZM14.167 5.8335H10.8337V7.41683H14.167C15.592 7.41683 16.7503 8.57516 16.7503 10.0002C16.7503 11.4252 15.592 12.5835 14.167 12.5835H10.8337V14.1668H14.167C16.467 14.1668 18.3337 12.3002 18.3337 10.0002C18.3337 7.70016 16.467 5.8335 14.167 5.8335Z"
                        fill="white"
                      />
                    </svg>
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white sm:p-6 p-4 rounded-2xl border border-[#E9EBF0] w-full">
          <h4 className="text-black font-semibold text-center md:text-2xl txt-xl mb-4 ">
            Share the Savings, Earn Together! 💸
          </h4>
          <p className="text-center">
            We know you have questions, and we have answers. Below you&apos;ll
            find responses to common inquiries about our referrals program.
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 mt-4">
            {faqs.map((faq, index) => (
              <div key={index} className=" border-t border-[#E9EBF0]">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between md:items-center items-start md:p-5 p-2 text-left font-semibold text-black focus:outline-none gap-3 hover:text-black hover:bg-transparent "
                >
                  {faq.question}
                  <span className="text-gray-600">
                    {openIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z"
                          fill="#686E7D"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7.41 15.7049L12 11.1249L16.59 15.7049L18 14.2949L12 8.29492L6 14.2949L7.41 15.7049Z"
                          fill="#686E7D"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="text-sm  md:px-5 px-2  md:pb-5 pb-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Referrals
