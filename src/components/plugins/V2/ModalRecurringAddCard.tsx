import React from 'react'
import { Link } from 'react-router-dom'

const ModalRecurringAddCard = ()=> {
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
                  <path d="M39.334 18.0049H18.0007C16.5207 18.0049 15.3473 19.1915 15.3473 20.6715L15.334 36.6716C15.334 38.1516 16.5207 39.3382 18.0007 39.3382H31.334V36.6716H18.0007V28.6715H42.0006V20.6715C42.0006 19.1915 40.814 18.0049 39.334 18.0049ZM39.334 23.3382H18.0007V20.6715H39.334V23.3382ZM44.6673 35.3382V38.0049H40.6673V42.0049H38.0007V38.0049H34.0007V35.3382H38.0007V31.3382H40.6673V35.3382H44.6673Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="cont font24">
                <h5>Add Debit Card Details</h5>
              </div>
            </div>
            <form  className="three-steps withpadding">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Name on card" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <div className="date-picker">
                  <svg xmlns="http://www.w3.org/2000/svg" width={29} height={20} viewBox="0 0 29 20" fill="none">
                    <rect y="0.00488281" width="28.3333" height={20} rx={4} fill="#D1D5DE" />
                    <path d="M21.2006 2.90479H7.13167C6.15563 2.90479 5.38184 3.70579 5.38184 4.70479L5.37305 15.5048C5.37305 16.5038 6.15563 17.3048 7.13167 17.3048H21.2006C22.1767 17.3048 22.9593 16.5038 22.9593 15.5048V4.70479C22.9593 3.70579 22.1767 2.90479 21.2006 2.90479ZM21.2006 15.5048H7.13167V10.1048H21.2006V15.5048ZM21.2006 6.50479H7.13167V4.70479H21.2006V6.50479Z" fill="url(#paint0_linear_1621_778)" />
                    <defs>
                      <linearGradient id="paint0_linear_1621_778" x1="14.1662" y1="2.90479" x2="14.1662" y2="17.3048" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white" />
                        <stop offset={1} stopColor="white" stopOpacity="0.68" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <input type="text" placeholder="5399 9174 4620 6669" />
                </div>
              </div>
              <div className="half-divs">
                <div className="form-group">
                  <label htmlFor="starting-date">Expiry Date</label>
                  <div className="date-picker">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <g clipPath="url(#clip0_1586_6725)">
                        <path d="M16.666 2.50553H15.8327V0.838867H14.166V2.50553H5.83268V0.838867H4.16602V2.50553H3.33268C2.41602 2.50553 1.66602 3.25553 1.66602 4.1722V17.5055C1.66602 18.4222 2.41602 19.1722 3.33268 19.1722H16.666C17.5827 19.1722 18.3327 18.4222 18.3327 17.5055V4.1722C18.3327 3.25553 17.5827 2.50553 16.666 2.50553ZM16.666 17.5055H3.33268V6.6722H16.666V17.5055Z" fill="#686E7D" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1586_6725">
                          <rect width={20} height={20} fill="white" transform="translate(0 0.00537109)" />
                        </clipPath>
                      </defs>
                    </svg> <input type="date" id="starting-date" name="starting-date" placeholder="MM / YYYY" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="starting-date">CVV</label>
                  <div className="date-picker">
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <path d="M15.0007 7.0887H14.1673V5.42204C14.1673 3.12204 12.3007 1.25537 10.0007 1.25537C7.70065 1.25537 5.83398 3.12204 5.83398 5.42204V7.0887H5.00065C4.08398 7.0887 3.33398 7.8387 3.33398 8.75537V17.0887C3.33398 18.0054 4.08398 18.7554 5.00065 18.7554H15.0007C15.9173 18.7554 16.6673 18.0054 16.6673 17.0887V8.75537C16.6673 7.8387 15.9173 7.0887 15.0007 7.0887ZM10.0007 14.5887C9.08398 14.5887 8.33398 13.8387 8.33398 12.922C8.33398 12.0054 9.08398 11.2554 10.0007 11.2554C10.9173 11.2554 11.6673 12.0054 11.6673 12.922C11.6673 13.8387 10.9173 14.5887 10.0007 14.5887ZM12.584 7.0887H7.41732V5.42204C7.41732 3.99704 8.57565 2.8387 10.0007 2.8387C11.4257 2.8387 12.584 3.99704 12.584 5.42204V7.0887Z" fill="#686E7D" />
                    </svg> <input type="text" id="CVV" name="CVV" placeholder="" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Your billing address" />
              </div>
            </form>
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
              <Link to="#recurring-setup-complete" className="submitbtn" id="openPopupButton">Continue</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalRecurringAddCard