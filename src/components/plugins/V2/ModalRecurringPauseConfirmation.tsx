import React from 'react'

const ModalRecurringPauseConfirmation = ()=> {
  return (
    <div className="plugin-body">
      <div className="processing">
        <svg width={76} height={76} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4C12.9543 4 4 12.9543 4 24V52C4 63.0457 12.9543 72 24 72H52C63.0457 72 72 63.0457 72 52V24C72 12.9543 63.0457 4 52 4H24Z" stroke="#FEFCE8" strokeWidth={8} />
          <path d="M8 24C8 15.1634 15.1634 8 24 8H52C60.8366 8 68 15.1634 68 24V52C68 60.8366 60.8366 68 52 68H24C15.1634 68 8 60.8366 8 52V24Z" fill="#FEF3C7" />
          <path d="M30 47.3334H35.3333V28.6667H30V47.3334ZM40.6667 28.6667V47.3334H46V28.6667H40.6667Z" fill="#4E5663" />
        </svg>
        <div className="processing-info">
          <h2>Recurring Rule Paused</h2>
        </div>
      </div>
    </div>

  )
}

export default ModalRecurringPauseConfirmation