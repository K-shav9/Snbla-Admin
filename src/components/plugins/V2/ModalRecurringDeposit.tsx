import React from 'react'
import { Link } from 'react-router-dom'

const ModalRecurringDeposit = ()=> {
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
                  <path d="M0 16.0049C0 7.16833 7.16344 0.00488281 16 0.00488281H44C52.8366 0.00488281 60 7.16833 60 16.0049V44.0049C60 52.8414 52.8366 60.0049 44 60.0049H16C7.16344 60.0049 0 52.8414 0 44.0049V16.0049Z" fill="#E9EBF0" />
                  <path d="M40.666 19.3381H19.3327C17.8527 19.3381 16.6793 20.5248 16.6793 22.0048L16.666 38.0048C16.666 39.4848 17.8527 40.6715 19.3327 40.6715H40.666C42.146 40.6715 43.3327 39.4848 43.3327 38.0048V22.0048C43.3327 20.5248 42.146 19.3381 40.666 19.3381ZM40.666 38.0048H19.3327V30.0048H40.666V38.0048ZM40.666 24.6715H19.3327V22.0048H40.666V24.6715Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="cont font24">
                <h5>Complete Deposit</h5>
                <p>Step 2 of 2</p>
              </div>
            </div>
            <p className="schedule-cont">
              <b>Your schedule</b><br />
              <b>SAR 500.00,</b> every month, starts on November 18, 2024. Each time you<br />
              deposit, you’ll get <span className="goal-badge">SAR 35</span>
            </p>
            <label className="goal-card formodal">
              <div className="goal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={46} height={32} viewBox="0 0 46 32" fill="none">
                  <path d="M0.5 4.00488C0.5 2.07189 2.067 0.504883 4 0.504883H42C43.933 0.504883 45.5 2.07189 45.5 4.00488V28.0049C45.5 29.9379 43.933 31.5049 42 31.5049H4C2.067 31.5049 0.5 29.9379 0.5 28.0049V4.00488Z" fill="white" />
                  <path d="M0.5 4.00488C0.5 2.07189 2.067 0.504883 4 0.504883H42C43.933 0.504883 45.5 2.07189 45.5 4.00488V28.0049C45.5 29.9379 43.933 31.5049 42 31.5049H4C2.067 31.5049 0.5 29.9379 0.5 28.0049V4.00488Z" stroke="#F1F3F7" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.2416 22.4441C21.6396 23.7748 19.5617 24.5781 17.2911 24.5781C12.2245 24.5781 8.11719 20.5785 8.11719 15.6448C8.11719 10.711 12.2245 6.71143 17.2911 6.71143C19.5617 6.71143 21.6396 7.51471 23.2416 8.84538C24.8435 7.51471 26.9214 6.71143 29.1921 6.71143C34.2586 6.71143 38.3659 10.711 38.3659 15.6448C38.3659 20.5785 34.2586 24.5781 29.1921 24.5781C26.9214 24.5781 24.8435 23.7748 23.2416 22.4441Z" fill="#ED0006" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.2422 22.4438C25.2146 20.8053 26.4652 18.3673 26.4652 15.6448C26.4652 12.9223 25.2146 10.4842 23.2422 8.84567C24.8442 7.51483 26.9223 6.71143 29.193 6.71143C34.2596 6.71143 38.3669 10.711 38.3669 15.6448C38.3669 20.5785 34.2596 24.5781 29.193 24.5781C26.9223 24.5781 24.8442 23.7747 23.2422 22.4438Z" fill="#F9A000" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M23.2429 22.4442C25.2155 20.8057 26.4663 18.3675 26.4663 15.6448C26.4663 12.9222 25.2155 10.484 23.2429 8.84546C21.2703 10.484 20.0195 12.9222 20.0195 15.6448C20.0195 18.3675 21.2703 20.8057 23.2429 22.4442Z" fill="#FF5E00" />
                </svg>
              </div>
              <div className="goal-info">
                <div className="goal-text">
                  <h3>Mastercard ****3065</h3>
                  <p>Expires 07/2028</p>
                </div>
              </div>
              <div className="input-radio">
                <input type="radio" name="goal" />
              </div>
            </label>
            <div className="goal-card formodal">
              <div className="goal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M19 3.00488H3C1.89 3.00488 1.01 3.89488 1.01 5.00488L1 17.0049C1 18.1149 1.89 19.0049 3 19.0049H13V17.0049H3V11.0049H21V5.00488C21 3.89488 20.11 3.00488 19 3.00488ZM19 7.00488H3V5.00488H19V7.00488ZM23 16.0049V18.0049H20V21.0049H18V18.0049H15V16.0049H18V13.0049H20V16.0049H23Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="goal-info">
                <div className="goal-text">
                  <h3>Add new debit card</h3>
                </div>
              </div>
              <div className="input-radio">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <path d="M15.8327 10.8383H10.8327V15.8383H9.16602V10.8383H4.16602V9.17163H9.16602V4.17163H10.8327V9.17163H15.8327V10.8383Z" fill="#1F242E" />
                </svg>
              </div>
            </div>
          </div>
          <div className="plugin-footer">
            <div className="iconwithtext withborder">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                  <path d="M16 1.33887L4 6.6722V14.6722C4 22.0722 9.12 28.9922 16 30.6722C22.88 28.9922 28 22.0722 28 14.6722V6.6722L16 1.33887ZM13.3333 22.6722L8 17.3389L9.88 15.4589L13.3333 18.8989L22.12 10.1122L24 12.0055L13.3333 22.6722Z" fill="#10B981" />
                </svg>
              </p>
              <p>We don’t store your banking information. Change or remove your funding method anytime.
              </p>
            </div>
            <div className="footer-btns">
              <a className="submitbtn" id="openPopupButton">Cancel</a>
              <Link className="submitbtn" to="#recurring-add-card" id="openPopupButton">Continue</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalRecurringDeposit