import React from 'react'


const ModalWithDrawSuccess = () => {
  return (
    <div className="plugin-body">
      <div className="processing">
        <svg width={76} height={76} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 4.00537H24C12.9543 4.00537 4 12.9597 4 24.0054V52.0054C4 63.0511 12.9543 72.0054 24 72.0054H52C63.0457 72.0054 72 63.0511 72 52.0054V24.0054C72 12.9597 63.0457 4.00537 52 4.00537Z" stroke="#ECFDF5" strokeWidth={8} />
          <path d="M8 24.0054C8 15.1688 15.1634 8.00537 24 8.00537H52C60.8366 8.00537 68 15.1688 68 24.0054V52.0054C68 60.8419 60.8366 68.0054 52 68.0054H24C15.1634 68.0054 8 60.8419 8 52.0054V24.0054Z" fill="#D1FAE5" />
          <path d="M33.7342 43.2056L28.1342 37.6056L26.2676 39.4723L33.7342 46.9389L49.7342 30.9389L47.8676 29.0723L33.7342 43.2056Z" fill="#4E5663" />
        </svg>
        <div className="processing-info">
          <h2>Withdraw successful</h2>
          <h4>You will now return to your wallet</h4>
        </div>
      </div>
    </div>

  )
}

export default ModalWithDrawSuccess