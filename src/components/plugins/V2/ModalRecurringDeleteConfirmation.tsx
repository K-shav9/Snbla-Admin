import React from 'react'

const ModalRecurringDeleteConfirmation = ()=> {
  return (
    <div className="plugin-body">
      <div className="processing">
        <svg width={76} height={76} viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4C12.9543 4 4 12.9543 4 24V52C4 63.0457 12.9543 72 24 72H52C63.0457 72 72 63.0457 72 52V24C72 12.9543 63.0457 4 52 4H24Z" stroke="#FEF2F2" strokeWidth={8} />
          <path d="M8 24C8 15.1634 15.1634 8 24 8H52C60.8366 8 68 15.1634 68 24V52C68 60.8366 60.8366 68 52 68H24C15.1634 68 8 60.8366 8 52V24Z" fill="#FEE2E2" />
          <path d="M29.9993 47.3333C29.9993 48.8 31.1993 50 32.666 50H43.3327C44.7993 50 45.9993 48.8 45.9993 47.3333V31.3333H29.9993V47.3333ZM32.666 34H43.3327V47.3333H32.666V34ZM42.666 27.3333L41.3327 26H34.666L33.3327 27.3333H28.666V30H47.3327V27.3333H42.666Z" fill="#4E5663" />
        </svg>
        <div className="processing-info">
          <h2>Recurring Rule Deleted</h2>
        </div>
      </div>
    </div>
  )
}

export default ModalRecurringDeleteConfirmation