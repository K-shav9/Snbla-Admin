import React from 'react'


const ModalTransferProcessing = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="plugin modal-divs">
          <div className="plugin-body">
            <div className="processing">
              <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16C0 7.16344 7.16344 0 16 0H44C52.8366 0 60 7.16344 60 16V44C60 52.8366 52.8366 60 44 60H16C7.16344 60 0 52.8366 0 44V16Z" fill="#E9EBF0" />
                <path d="M22 16.6667V24.6667H22.0133L22 24.6801L27.3333 30.0001L22 35.3334L22.0133 35.3467H22V43.3334H38V35.3467H37.9867L38 35.3334L32.6667 30.0001L38 24.6801L37.9867 24.6667H38V16.6667H22ZM35.3333 36.0001V40.6667H24.6667V36.0001L30 30.6667L35.3333 36.0001ZM30 29.3334L24.6667 24.0001V19.3334H35.3333V24.0001L30 29.3334Z" fill="#4E5663" />
              </svg>
              <div className="processing-info">
                <h2>Processing transfer</h2>
                <h4>This might take few seconds</h4>
              </div>
            </div>
          </div>
          <div className="plugin-footer withoutpadding">
            <div className="powered-by">
              <svg xmlns="http://www.w3.org/2000/svg" width={13} height={12} viewBox="0 0 13 12" fill="none">
                <rect x="0.5" y="0.00537109" width={12} height={12} rx={3} fill="#474DF4" />
                <path d="M10.7313 4.60404V8.61712L8.43946 8.11669V4.40535C8.43946 4.15354 8.32683 3.92191 8.12921 3.76678C7.93052 3.61378 7.67977 3.56066 7.43645 3.62122L3.85156 4.52223V3.00497L7.50233 2.08483C8.28221 1.88827 9.09608 2.0604 9.73252 2.55659C10.3679 3.05172 10.7313 3.7976 10.7313 4.6051V4.60404Z" fill="white" />
                <path d="M8.43868 8.11643V10.0587L4.15254 9.12369C3.03903 8.88038 2.23047 7.8763 2.23047 6.73836V4.93104L3.85079 4.52197V6.28892C3.85079 6.76811 4.19185 7.18993 4.66042 7.29193L8.43868 8.11537V8.11643Z" fill="white" />
              </svg>
              Powered by Snbla
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalTransferProcessing