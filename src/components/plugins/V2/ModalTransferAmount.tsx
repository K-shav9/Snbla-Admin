import React from 'react'
import { Link } from 'react-router-dom'

const ModalTransferAmount = ()=> {
  return (
    <div className="container">
      <div className="row">
        <div className="plugin modal-divs">
          <div className="plugin-body">
            <div className="powered-by">
              <svg xmlns="http://www.w3.org/2000/svg" width={13} height={12} viewBox="0 0 13 12" fill="none">
                <rect x="0.5" y="0.00537109" width={12} height={12} rx={3} fill="#474DF4" />
                <path d="M10.7313 4.60404V8.61712L8.43946 8.11669V4.40535C8.43946 4.15354 8.32683 3.92191 8.12921 3.76678C7.93052 3.61378 7.67977 3.56066 7.43645 3.62122L3.85156 4.52223V3.00497L7.50233 2.08483C8.28221 1.88827 9.09608 2.0604 9.73252 2.55659C10.3679 3.05172 10.7313 3.7976 10.7313 4.6051V4.60404Z" fill="white" />
                <path d="M8.43868 8.11643V10.0587L4.15254 9.12369C3.03903 8.88038 2.23047 7.8763 2.23047 6.73836V4.93104L3.85079 4.52197V6.28892C3.85079 6.76811 4.19185 7.18993 4.66042 7.29193L8.43868 8.11537V8.11643Z" fill="white" />
              </svg>
              Powered by Snbla
            </div>
            <div className="setforget">
              <div className="icon">
                <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 16C0 7.16344 7.16344 0 16 0H44C52.8366 0 60 7.16344 60 16V44C60 52.8366 52.8366 60 44 60H16C7.16344 60 0 52.8366 0 44V16Z" fill="#E9EBF0" />
                  <path d="M18.6667 28.0001C18.6667 31.2667 21.0133 33.9601 24.1067 34.5467L22.12 32.5601L24 30.6667L29.3333 36.0134L24 41.3334L22.12 39.4534L24.2267 37.3467V37.2668C19.6 36.7201 16 32.7734 16 28.0001C16 22.8401 20.1733 18.6667 25.3333 18.6667H29.3333V21.3334H25.3333C21.6533 21.3334 18.6667 24.3201 18.6667 28.0001Z" fill="#4E5663" />
                  <path d="M44 28.0001V18.6667H32V28.0001H44ZM41.3333 25.3334H34.6667V21.3334H41.3333V25.3334Z" fill="#4E5663" />
                  <path d="M44 30.6667H32V40.0001H44V30.6667Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="cont font24">
                <h5>Transfer to another wallet</h5>
                <p>Step 1 of 2</p>
              </div>
            </div>
            <form  className="three-steps withpadding">
              <div className="form-group">
                <label>Enter Amount</label>
                <input type="text" placeholder="SAR 800.00" />
              </div>
              <p className="available"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                <path d="M8.00065 1.33325C4.32065 1.33325 1.33398 4.31992 1.33398 7.99992C1.33398 11.6799 4.32065 14.6666 8.00065 14.6666C11.6807 14.6666 14.6673 11.6799 14.6673 7.99992C14.6673 4.31992 11.6807 1.33325 8.00065 1.33325ZM8.66732 11.3333H7.33398V9.99992H8.66732V11.3333ZM8.66732 8.66659H7.33398V4.66659H8.66732V8.66659Z" fill="#9FA5B2" />
              </svg> Available to transfer: <span>SAR 1,050.00</span> </p>
            </form>
          </div>
          <div className="plugin-footer">
            <div className="footer-btns">
              <a className="submitbtn cancel">Cancel</a>
              <Link to="#transfer-goal-select" className="submitbtn delete">Continue</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalTransferAmount