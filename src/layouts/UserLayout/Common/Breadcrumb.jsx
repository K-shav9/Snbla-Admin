import React from 'react'

const Breadcrumb = () => {
  return (
    <>
      <div className="flex gap-1 items-center mb-4">
        <p className='w-[20px] h-[20px] flex items-center justify-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.33317 17.0832V12.0832H11.6665V17.0832H15.8332V10.4165H18.3332L9.99984 2.9165L1.6665 10.4165H4.1665V17.0832H8.33317Z"
              fill="#686E7D"
            />
          </svg>
        </p>
        <p className='w-[20px] h-[20px] flex items-center justify-center'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6.46979 4L5.52979 4.94L8.58312 8L5.52979 11.06L6.46979 12L10.4698 8L6.46979 4Z"
              fill="#686E7D"
            />
          </svg>
        </p>
        <p className='text-sm text-black '>Wallets</p>
      </div>
    </>
  );
}

export default Breadcrumb
