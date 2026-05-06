import React from 'react'
import { Link } from 'react-router-dom'


const ModalWithDrawAccountSelect = () => {
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
                <h5>Select your Bank Account</h5>
                <p>Step 2 of 2</p>
              </div>
            </div>
            <p className="schedule-cont">
              Amount to deposit: <b> SAR 500.00</b><br />
              Reward: <span className="goal-badge">SAR 56</span>
            </p>
            <label className="goal-card formodal">
              <div className="goal-icon">
                <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <path d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H32C36.1421 0.5 39.5 3.85786 39.5 8V32C39.5 36.1421 36.1421 39.5 32 39.5H8C3.85786 39.5 0.5 36.1421 0.5 32V8Z" fill="url(#pattern0_1621_10543)" />
                  <path d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H32C36.1421 0.5 39.5 3.85786 39.5 8V32C39.5 36.1421 36.1421 39.5 32 39.5H8C3.85786 39.5 0.5 36.1421 0.5 32V8Z" stroke="#E9EBF0" />
                  <defs>
                    <pattern id="pattern0_1621_10543" patternContentUnits="objectBoundingBox" width={1} height={1}>
                      <use xlinkHref="#image0_1621_10543" transform="scale(0.00444444)" />
                    </pattern>
                    <image id="image0_1621_10543" width={225} height={225} xlinkHref="data:image/png;base64,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" />
                  </defs>
                </svg>
              </div>
              <div className="goal-info">
                <div className="goal-text">
                  <h3>Banque Saudi Fransi</h3>
                  <p>Account ****6908</p>
                </div>
              </div>
              <div className="input-radio">
                <input type="radio" name="goal" />
              </div>
            </label>
            <div className="goal-card formodal">
              <div className="goal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M7 10.5H4V17.5H7V10.5Z" fill="#4E5663" />
                  <path d="M13.5 10.5H10.5V17.5H13.5V10.5Z" fill="#4E5663" />
                  <path d="M22 19.5H2V22.5H22V19.5Z" fill="#4E5663" />
                  <path d="M20 10.5H17V17.5H20V10.5Z" fill="#4E5663" />
                  <path d="M12 1.5L2 6.5V8.5H22V6.5L12 1.5Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="goal-info">
                <div className="goal-text">
                  <h3>Connect account</h3>
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
            <div className="footer-btns">
              <a className="submitbtn" id="openPopupButton">Cancel</a>
              <Link className="submitbtn delete" to="#with-draw-processing">Transfer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalWithDrawAccountSelect