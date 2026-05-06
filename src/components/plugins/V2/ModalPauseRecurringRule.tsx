import React from 'react'
import { Link } from 'react-router-dom'

const ModalPauseRecurringRule = ()=> {
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
                <svg width={76} height={76} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4C12.9543 4 4 12.9543 4 24V52C4 63.0457 12.9543 72 24 72H52C63.0457 72 72 63.0457 72 52V24C72 12.9543 63.0457 4 52 4H24Z" stroke="#FEFCE8" strokeWidth={8} />
                  <path d="M8 24C8 15.1634 15.1634 8 24 8H52C60.8366 8 68 15.1634 68 24V52C68 60.8366 60.8366 68 52 68H24C15.1634 68 8 60.8366 8 52V24Z" fill="#FEF3C7" />
                  <path d="M30 47.3334H35.3333V28.6667H30V47.3334ZM40.6667 28.6667V47.3334H46V28.6667H40.6667Z" fill="#4E5663" />
                </svg>
              </div>
              <div className="cont font24">
                <h5>Pause recurring deposits rule?</h5>
              </div>
            </div>
            <p className="black text-left">Are you sure you want to pause the recurring deposit rule for your
              savings goal wallet?</p>
            <div className="bgwithicon text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                <path d="M16.666 5.41659H14.8493C14.941 5.15825 14.9993 4.87492 14.9993 4.58325C14.9993 3.19992 13.8827 2.08325 12.4993 2.08325C11.6243 2.08325 10.866 2.53325 10.416 3.20825L9.99935 3.76659L9.58268 3.19992C9.13268 2.53325 8.37435 2.08325 7.49935 2.08325C6.11602 2.08325 4.99935 3.19992 4.99935 4.58325C4.99935 4.87492 5.05768 5.15825 5.14935 5.41659H3.33268C2.40768 5.41659 1.67435 6.15825 1.67435 7.08325L1.66602 16.2499C1.66602 17.1749 2.40768 17.9166 3.33268 17.9166H16.666C17.591 17.9166 18.3327 17.1749 18.3327 16.2499V7.08325C18.3327 6.15825 17.591 5.41659 16.666 5.41659ZM12.4993 3.74992C12.9577 3.74992 13.3327 4.12492 13.3327 4.58325C13.3327 5.04159 12.9577 5.41659 12.4993 5.41659C12.041 5.41659 11.666 5.04159 11.666 4.58325C11.666 4.12492 12.041 3.74992 12.4993 3.74992ZM7.49935 3.74992C7.95768 3.74992 8.33268 4.12492 8.33268 4.58325C8.33268 5.04159 7.95768 5.41659 7.49935 5.41659C7.04102 5.41659 6.66602 5.04159 6.66602 4.58325C6.66602 4.12492 7.04102 3.74992 7.49935 3.74992ZM16.666 16.2499H3.33268V14.5833H16.666V16.2499ZM16.666 12.0833H3.33268V7.08325H7.56602L5.83268 9.44159L7.18268 10.4166L9.99935 6.58325L12.816 10.4166L14.166 9.44159L12.4327 7.08325H16.666V12.0833Z" fill="#1F242E" />
              </svg>
              <p>You will forgo <span>SAR 105</span> in rewards every 3 months.</p>
            </div>
          </div>
          <div className="plugin-footer">
            <div className="footer-btns">
              <a className="submitbtn cancel">Cancel</a>
              <Link to="#recurring-Delete-Confirmation" className="submitbtn delete">Pause</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ModalPauseRecurringRule