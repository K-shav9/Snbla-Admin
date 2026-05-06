import React, { useEffect } from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "Forget Password | Snbla";
  }, []);
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPassword
