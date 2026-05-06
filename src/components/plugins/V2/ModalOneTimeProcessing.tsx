import React from 'react'

const ModalOneTimeProcessing = ()=> {
  return (
    <div className="plugin-body">
      <div className="processing">
        <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C0 7.16344 7.16344 0 16 0H44C52.8366 0 60 7.16344 60 16V44C60 52.8366 52.8366 60 44 60H16C7.16344 60 0 52.8366 0 44V16Z" fill="#E9EBF0" />
          <path d="M22 16.6667V24.6667H22.0133L22 24.6801L27.3333 30.0001L22 35.3334L22.0133 35.3467H22V43.3334H38V35.3467H37.9867L38 35.3334L32.6667 30.0001L38 24.6801L37.9867 24.6667H38V16.6667H22ZM35.3333 36.0001V40.6667H24.6667V36.0001L30 30.6667L35.3333 36.0001ZM30 29.3334L24.6667 24.0001V19.3334H35.3333V24.0001L30 29.3334Z" fill="#4E5663" />
        </svg>
        <div className="processing-info">
          <h2>Processing deposit</h2>
          <h4>This might take few seconds</h4>
        </div>
      </div>
    </div>
  )
}

export default ModalOneTimeProcessing